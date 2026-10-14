"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { track, trackConversion } from "@/lib/analytics";
import { useMarket } from "@/components/market/MarketProvider";

/** `typing`: created in this session and still being typed out on screen. */
type Msg = { role: "user" | "assistant"; content: string; typing?: boolean };

const STORE_KEY = "scx_chat";
const TEASER_KEY = "scx_chat_teaser";
const TEASER_DELAY_MS = 6000;

const GREETING =
  "Hi, I'm Nox from Scenox Commerce. I can price your catalog, explain how a store move works, or book a call with the team. What are you working on?";

const STARTERS = [
  { label: "Price my catalog", text: "I'd like a price for listing my products" },
  { label: "Move my store to Shopify", text: "I want to move my store to Shopify" },
  { label: "Fix my product feed", text: "My Google Merchant Center feed has errors" },
  { label: "Book a call", text: "I'd like to book a call with the team" },
];

/* ------------------------------------------------------------------ */
/* Minimal, safe rendering of the assistant's markdown subset          */
/* ------------------------------------------------------------------ */

function safeHref(href: string): { kind: "internal" | "external"; href: string } | null {
  if (href.startsWith("/") && !href.startsWith("//")) return { kind: "internal", href };
  if (href.startsWith("mailto:")) return { kind: "external", href };
  try {
    const u = new URL(href);
    // links back to this site become client-side navigations
    if (u.protocol === "https:" && u.host === new URL(site.url).host) return { kind: "internal", href: u.pathname + u.search + u.hash };
  } catch {}
  return null;
}

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[4]) {
      out.push(<code key={`${key}-${i++}`} className="rounded-[4px] bg-bg px-1 py-px font-mono text-[0.85em] text-ink">{m[4]}</code>);
    } else if (m[1]) {
      out.push(<strong key={`${key}-${i++}`} className="font-semibold text-ink">{m[1]}</strong>);
    } else {
      const link = safeHref(m[3]);
      const cls = "font-medium text-ink underline decoration-accent/60 underline-offset-[3px] hover:decoration-accent";
      if (!link) out.push(m[2]);
      else if (link.kind === "internal")
        out.push(<Link key={`${key}-${i++}`} href={link.href} className={cls}>{m[2]}</Link>);
      else
        out.push(<a key={`${key}-${i++}`} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{m[2]}</a>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** While text is still arriving, hide half-written markdown so no stray ** or [ ]( flashes up. */
function tidyPartial(t: string) {
  let s = t.replace(/\[([^\]\n]*)(\](\([^)\s]*)?)?$/, "$1");
  if ((s.match(/\*\*/g) ?? []).length % 2) s = s.slice(0, s.lastIndexOf("**")) + s.slice(s.lastIndexOf("**") + 2);
  if ((s.match(/`/g) ?? []).length % 2) s = s.slice(0, s.lastIndexOf("`")) + s.slice(s.lastIndexOf("`") + 1);
  return s.replace(/\*+$/, "");
}

function Rich({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];
  const flushPara = () => {
    if (para.length) blocks.push(<p key={`p${blocks.length}`}>{inline(para.join(" "), `p${blocks.length}`)}</p>);
    para = [];
  };
  const flushList = () => {
    if (list.length)
      blocks.push(
        <ul key={`l${blocks.length}`} className="flex flex-col gap-1.5">
          {list.map((li, j) => (
            <li key={j} className="relative pl-4 before:absolute before:left-0 before:top-[0.62em] before:size-[5px] before:rounded-full before:bg-accent/70">
              {inline(li, `l${blocks.length}-${j}`)}
            </li>
          ))}
        </ul>,
      );
    list = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = /^[-*•]\s+(.*)$/.exec(line) ?? /^\d+\.\s+(.*)$/.exec(line);
    if (bullet) {
      flushPara();
      list.push(bullet[1]);
    } else if (!line) {
      flushPara();
      flushList();
    } else {
      flushList();
      para.push(line.replace(/^#+\s*/, ""));
    }
  }
  flushPara();
  flushList();
  return <div className="flex flex-col gap-2.5">{blocks.map((b, i) => <Fragment key={i}>{b}</Fragment>)}</div>;
}

/**
 * Types the reply out at a steady pace. Speeds up when a lot of text is
 * waiting, so long answers don't drag. Calls onDone once it has caught up
 * with a finished reply.
 */
function Typed({ text, finished, onTick, onDone }: { text: string; finished: boolean; onTick: () => void; onDone: () => void }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const target = useRef(text);
  useEffect(() => {
    target.current = text;
  }, [text]);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setN((cur) => {
        const total = target.current.length;
        if (cur >= total) return total;
        // characters per second: about 80, faster when a long reply is waiting (a long answer still finishes in ~3s)
        const speed = Math.max(80, (total - cur) / 3);
        return Math.min(total, cur + Math.max(1, Math.round((speed * dt) / 1000)));
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const shown = reduce ? text.length : Math.min(n, text.length);
  useEffect(() => {
    onTick();
    if (finished && shown >= text.length) onDone();
  }, [shown, finished, text.length, onTick, onDone]);
  return <Rich text={tidyPartial(text.slice(0, shown))} />;
}

function Avatar({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full bg-ink font-semibold tracking-[-0.02em] text-paper",
        size === "md" ? "size-9 text-[0.95rem]" : "size-7 text-[0.8rem]",
      )}
    >
      N
      <span className={cn("absolute -bottom-px -right-px rounded-full border-2 border-bg-elevated bg-success", size === "md" ? "size-3" : "size-2.5")} />
    </span>
  );
}

function Thinking({ status }: { status: string | null }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[0.85rem] text-ink-3">
      <span className="inline-flex items-center gap-1" aria-hidden>
        <span className="chat-dot" />
        <span className="chat-dot [animation-delay:120ms]" />
        <span className="chat-dot [animation-delay:240ms]" />
      </span>
      {status ? <span>{status}…</span> : <span className="sr-only">Nox is typing</span>}
    </span>
  );
}

/* ------------------------------------------------------------------ */

export function ChatWidget() {
  const market = useMarket();
  const pathname = usePathname();
  const router = useRouter();
  const path = (pathname ?? "/").replace(/^\/(in|us|uk|au)(?=\/|$)/, "") || "/";
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [streamDone, setStreamDone] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);
  const pinned = useRef(true); // keep the log scrolled to the newest text unless the reader scrolled up

  // a short greeting pops up once per visit, a few seconds after landing
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1" || !!sessionStorage.getItem(STORE_KEY);
    } catch {}
    if (seen) return;
    const t = setTimeout(() => {
      setTeaser(true);
      track("chat_teaser_shown", { page: path });
    }, TEASER_DELAY_MS);
    return () => clearTimeout(t);
    // only on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideTeaser = useCallback(() => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  }, []);

  const openChat = useCallback(
    (from: string) => {
      if (!restored.current) {
        restored.current = true;
        try {
          const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? "[]");
          if (Array.isArray(saved) && saved.length) setMsgs(saved.slice(-24));
        } catch {}
      }
      hideTeaser();
      setOpen(true);
      track("chat_opened", { page: path, from });
    },
    [path, hideTeaser],
  );

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    // on phones the panel is full screen: stop the page scrolling behind it
    const mq = window.matchMedia("(max-width: 639px)");
    const prev = document.documentElement.style.overflow;
    if (mq.matches) document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.chatOpen = "";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      delete document.documentElement.dataset.chatOpen;
    };
  }, [open, close]);

  const scrollToEnd = useCallback(() => {
    const el = logRef.current;
    if (el && pinned.current) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    try {
      if (msgs.length && !busy) sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs.slice(-24).map(({ role, content }) => ({ role, content }))));
    } catch {}
    scrollToEnd();
  }, [msgs, busy, scrollToEnd]);

  const typingDone = useCallback(() => {
    setMsgs((cur) => (cur.some((m) => m.typing) ? cur.map((m) => (m.typing ? { ...m, typing: false } : m)) : cur));
  }, []);

  const send = async (text: string) => {
    const q = text.trim().slice(0, 1500);
    if (!q || busy) return;
    setError(null);
    setInput("");
    pinned.current = true;
    const history: Msg[] = [...msgs.map(({ role, content }) => ({ role, content })), { role: "user" as const, content: q }].slice(-23);
    // the API expects user-first, alternating turns
    while (history.length && history[0].role !== "user") history.shift();
    setMsgs([...history, { role: "assistant", content: "", typing: true }]);
    setBusy(true);
    setStreamDone(false);
    setStatus(null);
    track("chat_message_sent", { page: path, turn: history.length });

    let answer = "";
    const paint = () =>
      setMsgs((cur) => {
        const next = cur.slice();
        next[next.length - 1] = { role: "assistant", content: answer, typing: true };
        return next;
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          market: market.id,
          path,
          tz: (() => {
            try {
              return Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch {
              return undefined;
            }
          })(),
        }),
      });
      if (!res.ok || !res.body) {
        let msg = "Nox isn't available right now.";
        try {
          msg = (await res.json()).error ?? msg;
        } catch {}
        throw new Error(msg);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const l of lines) {
          if (!l) continue;
          const ev = JSON.parse(l) as { t: "d" | "s" | "reset" | "end" | "err" | "nav" | "lead" | "booked"; v?: string };
          if (ev.t === "d") {
            answer += ev.v ?? "";
            setStatus(null);
          } else if (ev.t === "s") setStatus(ev.v ?? null);
          else if (ev.t === "reset") answer = "";
          else if (ev.t === "nav" && ev.v?.startsWith("/")) {
            // Nox opened a page: go there; on phones the chat covers the page, so step aside
            router.push(ev.v);
            if (window.matchMedia("(max-width: 639px)").matches) setTimeout(() => setOpen(false), 400);
          } else if (ev.t === "booked") {
            track("book_call_click", { from: "chat_booked" });
          } else if (ev.t === "lead") {
            track("form_submitted", { form: "chat" });
            trackConversion("lead", { source: "chat" });
          } else if (ev.t === "err") throw new Error(ev.v);
        }
        paint();
      }
      if (!answer.trim()) throw new Error("No answer came back. Try asking again.");
    } catch (e) {
      // no answer: drop the question and its empty reply, and put the question back in the box to retry
      if (!answer.trim()) {
        setMsgs((cur) => cur.slice(0, -2));
        setInput(q);
      }
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
      setStreamDone(true);
      setStatus(null);
    }
  };

  const reset = () => {
    if (busy) return;
    setMsgs([]);
    setError(null);
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {}
    track("chat_reset", { page: path });
    inputRef.current?.focus();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  const ease = [0.23, 1, 0.32, 1] as const;

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            key="launcher"
            data-chat-launcher
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-5 sm:right-5"
          >
            <AnimatePresence>
              {teaser && (
                <motion.div
                  key="teaser"
                  role="dialog"
                  aria-label="Message from Nox"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(10px) scale(0.97)" }}
                  animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(6px) scale(0.98)" }}
                  transition={{ duration: 0.28, ease }}
                  style={{ transformOrigin: "bottom right" }}
                  className="relative w-[min(20rem,calc(100vw-2rem))] rounded-[16px] border border-line bg-bg-elevated p-4 shadow-[0_18px_48px_-20px_rgba(16,17,18,0.35)]"
                >
                  <button
                    type="button"
                    onClick={hideTeaser}
                    aria-label="Dismiss"
                    className="absolute right-2 top-2 grid size-8 place-items-center rounded-full text-ink-3 transition-colors duration-[160ms] hover:bg-bg-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <X aria-hidden className="size-4" strokeWidth={2} />
                  </button>
                  <button type="button" onClick={() => openChat("teaser")} className="flex w-full items-start gap-3 pr-6 text-left focus-visible:outline-none">
                    <Avatar size="sm" />
                    <span className="min-w-0">
                      <span className="block text-[0.9rem] font-semibold text-ink">Nox</span>
                      <span className="mt-1 block text-[0.9rem] leading-snug text-ink-2">
                        Hi there. Need a price for your catalog or help moving your store? I can help right here.
                      </span>
                    </span>
                  </button>
                  <div className="mt-3.5 flex flex-wrap gap-2 pl-10">
                    {[STARTERS[0], STARTERS[3]].map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => {
                          openChat("teaser_chip");
                          send(s.text);
                        }}
                        className="inline-flex min-h-8 items-center rounded-full border border-line-strong px-3 text-[0.82rem] font-medium text-ink transition-colors duration-[160ms] hover:border-ink hover:bg-bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              ref={launcherRef}
              type="button"
              onClick={() => openChat("launcher")}
              aria-haspopup="dialog"
              className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ink pl-1.5 pr-5 text-[0.95rem] font-medium text-paper shadow-[0_10px_28px_-12px_rgba(16,17,18,0.55)] transition-[background-color,transform] duration-[160ms] hover:bg-[#232527] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]"
            >
              <span aria-hidden className="relative grid size-9 place-items-center rounded-full bg-paper text-[0.9rem] font-semibold text-ink">
                N
                <span className="absolute -bottom-px -right-px size-2.5 rounded-full border-2 border-ink bg-success" />
              </span>
              Ask Nox
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Chat with Nox, the Scenox Commerce assistant"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px) scale(0.98)" }}
            transition={{ duration: 0.22, ease }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 z-[65] flex flex-col bg-bg-elevated sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(42rem,calc(100dvh-2.5rem))] sm:w-[25.5rem] sm:overflow-hidden sm:rounded-[18px] sm:border sm:border-line sm:shadow-[0_28px_70px_-28px_rgba(16,17,18,0.4)]"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-line px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3.5">
              <Avatar />
              <div className="min-w-0 flex-1">
                <p className="text-[1rem] font-semibold leading-tight tracking-[-0.015em] text-ink">Nox</p>
                <p className="mt-0.5 text-[0.8rem] leading-tight text-ink-3">Scenox Commerce · Online</p>
              </div>
              {msgs.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  disabled={busy}
                  aria-label="Start a new chat"
                  title="New chat"
                  className="grid size-10 shrink-0 place-items-center rounded-full text-ink-2 transition-colors duration-[160ms] hover:bg-bg-muted hover:text-ink disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <RotateCcw aria-hidden className="size-[1.05rem]" strokeWidth={2} />
                </button>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="grid size-10 shrink-0 place-items-center rounded-full text-ink-2 transition-colors duration-[160ms] hover:bg-bg-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X aria-hidden className="size-5" strokeWidth={2} />
              </button>
            </div>

            {/* conversation */}
            <div
              ref={logRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
              }}
              className="flex-1 overflow-y-auto overscroll-contain bg-bg px-4 py-5"
              aria-live="polite"
              aria-busy={busy}
            >
              <ol className="flex flex-col gap-4">
                <li className="flex justify-start">
                  <div className="max-w-[88%] rounded-[16px] rounded-tl-[5px] border border-line bg-bg-elevated px-3.5 py-2.5 text-[0.94rem] leading-[1.55] text-ink-2">
                    {GREETING}
                  </div>
                </li>
                {msgs.length === 0 && (
                  <li className="flex flex-wrap gap-2 pt-1" aria-label="Suggestions">
                    {STARTERS.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => send(s.text)}
                        className="inline-flex min-h-9 items-center rounded-full border border-line-strong bg-bg-elevated px-3.5 text-[0.87rem] font-medium text-ink transition-colors duration-[160ms] hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {s.label}
                      </button>
                    ))}
                  </li>
                )}
                {msgs.map((m, i) => (
                  <li key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    {m.role === "user" ? (
                      <p className="max-w-[85%] whitespace-pre-wrap rounded-[16px] rounded-br-[5px] bg-ink px-3.5 py-2.5 text-[0.93rem] leading-snug text-paper">
                        <span className="sr-only">You: </span>
                        {m.content}
                      </p>
                    ) : (
                      <div className="max-w-[88%] rounded-[16px] rounded-tl-[5px] border border-line bg-bg-elevated px-3.5 py-2.5 text-[0.94rem] leading-[1.55] text-ink-2">
                        <span className="sr-only">Nox: </span>
                        {!m.content ? (
                          <Thinking status={i === msgs.length - 1 ? status : null} />
                        ) : m.typing ? (
                          <Typed text={m.content} finished={streamDone && i === msgs.length - 1} onTick={scrollToEnd} onDone={typingDone} />
                        ) : (
                          <Rich text={m.content} />
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              {error && (
                <p role="alert" className="mt-4 rounded-[10px] border border-warning/30 bg-warning-soft px-3 py-2.5 text-[0.875rem] text-warning">
                  {error}
                </p>
              )}
            </div>

            {/* composer */}
            <div className="border-t border-line bg-bg-elevated px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
              <form onSubmit={onSubmit} className="flex items-end gap-2 rounded-[14px] border border-line-strong bg-bg p-1.5 pl-3.5 transition-colors duration-[160ms] focus-within:border-ink">
                <label htmlFor="chat-input" className="sr-only">
                  Message Nox
                </label>
                <textarea
                  id="chat-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={1500}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your message…"
                  className="field-sizing-content max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[1rem] text-ink placeholder:text-ink-3 focus:outline-none sm:text-[0.95rem]"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-accent text-white transition-[background-color,opacity] duration-[160ms] hover:bg-accent-hover disabled:bg-ink disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <ArrowUp aria-hidden className="size-4" strokeWidth={2.25} />
                </button>
              </form>
              <p className="mt-2 text-center text-[0.72rem] text-ink-3">Nox is an AI assistant and can make mistakes.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

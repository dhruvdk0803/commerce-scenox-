"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { track, trackConversion } from "@/lib/analytics";
import { useMarket } from "@/components/market/MarketProvider";

type Msg = { role: "user" | "assistant"; content: string };

const STORE_KEY = "scx_chat";
const STARTERS = [
  "What would 500 products cost?",
  "Can you move my store from Magento to Shopify?",
  "Book a call with the team",
  "I need a quote for my store",
  "Show me your Shopify services",
];

/* ------------------------------------------------------------------ */
/* Minimal, safe rendering of the assistant's markdown subset          */
/* ------------------------------------------------------------------ */

function safeHref(href: string): { kind: "internal" | "external"; href: string } | null {
  if (href.startsWith("/") && !href.startsWith("//")) return { kind: "internal", href };
  if (href.startsWith("mailto:")) return { kind: "external", href };
  try {
    const u = new URL(href);
    const allowed = [new URL(site.url).host];
    if (u.protocol === "https:" && allowed.includes(u.host)) {
      // links back to this site become client-side navigations
      return u.host === new URL(site.url).host ? { kind: "internal", href: u.pathname + u.search + u.hash } : { kind: "external", href };
    }
  } catch {}
  return null;
}

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(<strong key={`${key}-${i++}`} className="font-semibold text-ink">{m[1]}</strong>);
    } else {
      const link = safeHref(m[3]);
      const cls = "font-medium text-ink underline decoration-line-strong underline-offset-[3px] hover:decoration-ink";
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
            <li key={j} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-ink-3">
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

/* ------------------------------------------------------------------ */

export function ChatWidget() {
  const market = useMarket();
  const pathname = usePathname();
  const router = useRouter();
  const path = (pathname ?? "/").replace(/^\/(in|us|uk|au)(?=\/|$)/, "") || "/";
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  // restore this tab's conversation once, when first opened
  const openChat = useCallback(() => {
    if (!restored.current) {
      restored.current = true;
      try {
        const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? "[]");
        if (Array.isArray(saved) && saved.length) setMsgs(saved.slice(-24));
      } catch {}
    }
    setOpen(true);
    track("chat_opened", { page: path });
  }, [path]);

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

  useEffect(() => {
    try {
      if (msgs.length && !busy) sessionStorage.setItem(STORE_KEY, JSON.stringify(msgs.slice(-24)));
    } catch {}
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs, busy]);

  const send = async (text: string) => {
    const q = text.trim().slice(0, 1500);
    if (!q || busy) return;
    setError(null);
    setInput("");
    const history: Msg[] = [...msgs, { role: "user" as const, content: q }].slice(-23);
    // the API expects user-first, alternating turns
    while (history.length && history[0].role !== "user") history.shift();
    setMsgs([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    track("chat_message_sent", { page: path, turn: history.length });

    let answer = "";
    const paint = () =>
      setMsgs((cur) => {
        const next = cur.slice();
        next[next.length - 1] = { role: "assistant", content: answer };
        return next;
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, market: market.id, path, tz: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return undefined; } })() }),
      });
      if (!res.ok || !res.body) {
        let msg = "The assistant isn't available right now.";
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
          const ev = JSON.parse(l) as { t: "d" | "reset" | "end" | "err" | "nav" | "lead" | "booked"; v?: string };
          if (ev.t === "d") answer += ev.v ?? "";
          else if (ev.t === "nav" && ev.v?.startsWith("/")) {
            // the assistant opened a page: go there; on phones the chat covers the page, so step aside
            router.push(ev.v);
            if (window.matchMedia("(max-width: 639px)").matches) setTimeout(() => setOpen(false), 400);
          } else if (ev.t === "booked") {
            track("book_call_click", { from: "chat_booked" });
          } else if (ev.t === "lead") {
            track("form_submitted", { form: "chat" });
            trackConversion("lead", { source: "chat" });
          }
          else if (ev.t === "reset") answer = "";
          else if (ev.t === "err") throw new Error(ev.v);
        }
        paint();
      }
      if (!answer.trim()) throw new Error("No answer came back. Try asking again.");
    } catch (e) {
      // no answer: drop the question and its empty reply, and put the question back in the box to retry
      if (!answer.trim()) setMsgs((cur) => cur.slice(0, -2));
      setError(e instanceof Error ? e.message : "Something went wrong.");
      if (!answer.trim()) setInput(q);
    } finally {
      setBusy(false);
    }
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

  const empty = msgs.length === 0;

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            key="launcher"
            type="button"
            data-chat-launcher
            onClick={openChat}
            aria-haspopup="dialog"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-4 right-4 z-[60] inline-flex h-12 items-center gap-2 rounded-full bg-ink pl-4 pr-5 text-[0.95rem] font-medium text-paper shadow-[0_8px_24px_-10px_rgba(16,17,18,0.45)] transition-colors duration-[160ms] hover:bg-[#232527] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] sm:bottom-5 sm:right-5"
          >
            <MessageCircle aria-hidden className="size-[1.15rem]" strokeWidth={2} />
            Ask Nox
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Nox, Scenox AI assistant"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px) scale(0.98)" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 z-[65] flex flex-col bg-bg sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(40rem,calc(100dvh-2.5rem))] sm:w-[25rem] sm:overflow-hidden sm:rounded-[14px] sm:border sm:border-line sm:shadow-[0_24px_60px_-24px_rgba(16,17,18,0.35)]"
          >
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3">
              <div className="min-w-0">
                <p className="text-[1rem] font-semibold tracking-[-0.015em] text-ink">Nox</p>
                <p className="mono-micro mt-0.5 text-ink-3">AI ASSISTANT · PRICES IN {market.currency}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="grid size-10 shrink-0 place-items-center rounded-[8px] text-ink-2 transition-colors duration-[160ms] hover:bg-bg-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X aria-hidden className="size-5" strokeWidth={2} />
              </button>
            </div>

            {/* conversation */}
            <div ref={logRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite" aria-busy={busy}>
              {empty ? (
                <div>
                  <p className="text-[0.95rem] leading-relaxed text-ink-2">
                    Hi, I&apos;m Nox. Ask about services, prices or platforms, get a quote, or book a call with the team in
                    your time zone. I&apos;m the same kind of AI assistant we set up for online stores.
                  </p>
                  <p className="mono-micro mt-6 text-ink-3">TRY ASKING</p>
                  <ul className="mt-2.5 flex flex-col gap-2">
                    {STARTERS.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => send(s)}
                          className="w-full rounded-[8px] border border-line px-3.5 py-2.5 text-left text-[0.925rem] text-ink transition-colors duration-[160ms] hover:border-line-strong hover:bg-bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ol className="flex flex-col gap-5">
                  {msgs.map((m, i) => (
                    <li key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                      {m.role === "user" ? (
                        <p className="max-w-[85%] whitespace-pre-wrap rounded-[12px] rounded-br-[4px] bg-ink px-3.5 py-2.5 text-[0.925rem] leading-snug text-paper">
                          <span className="sr-only">You: </span>
                          {m.content}
                        </p>
                      ) : (
                        <div className="max-w-[92%] text-[0.94rem] leading-[1.55] text-ink-2">
                          <span className="sr-only">Assistant: </span>
                          {m.content ? (
                            <Rich text={m.content} />
                          ) : (
                            <span className="mono-micro inline-flex items-center gap-2 text-ink-3">
                              <span className="chat-dot" />
                              <span className="chat-dot [animation-delay:120ms]" />
                              <span className="chat-dot [animation-delay:240ms]" />
                              <span className="sr-only">Writing an answer</span>
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              )}
              {error && (
                <p role="alert" className="mt-4 rounded-[8px] border border-warning/30 bg-warning-soft px-3 py-2.5 text-[0.875rem] text-warning">
                  {error}
                </p>
              )}
            </div>

            {/* composer */}
            <div className="border-t border-line px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
              <form onSubmit={onSubmit} className="flex items-end gap-2 rounded-[10px] border border-line-strong bg-bg-elevated p-1.5 pl-3 focus-within:border-ink">
                <label htmlFor="chat-input" className="sr-only">
                  Your question
                </label>
                <textarea
                  id="chat-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={1500}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about pricing, platforms, timelines…"
                  className="field-sizing-content max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[1rem] text-ink placeholder:text-ink-3 focus:outline-none sm:text-[0.95rem]"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-ink text-paper transition-[background-color,opacity] duration-[160ms] hover:bg-[#232527] disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <ArrowUp aria-hidden className="size-4" strokeWidth={2.25} />
                </button>
              </form>
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1">
                <p className="text-[0.75rem] text-ink-3">AI can make mistakes. Your quote confirms the price.</p>
                <div className="flex items-center gap-3 text-[0.8rem]">
                  {site.bookingUrl && (
                    <Link
                      href={site.bookingUrl}
                      onClick={() => track("book_call_click", { from: "chat" })}
                      className="inline-flex min-h-8 items-center font-medium text-ink hover:underline"
                    >
                      Book a call
                    </Link>
                  )}
                  <Link href="/contact" className="inline-flex min-h-8 items-center font-medium text-ink hover:underline">
                    Talk to a person
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

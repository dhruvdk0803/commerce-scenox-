import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { MARKETS, isMarket } from "@/lib/markets";
import { knowledgeLines } from "@/lib/knowledge";
import { forwardLead, sendVisitorEmail, validatePayload } from "@/lib/leads";
import { isKnownPath, searchSite } from "@/lib/site-index";
import { clients, clientClaim } from "@/content/clients";
import { bookSlot, calendarConfigured, formatSlot, freeSlots, validTz } from "@/lib/calendar";

export const runtime = "nodejs";
export const maxDuration = 60;

/*
 * Provider-agnostic website assistant. Talks to any OpenAI-compatible
 * Chat Completions endpoint (OpenAI, Azure OpenAI v1, Gemini's OpenAI
 * endpoint, Groq, OpenRouter, DeepSeek, Mistral, Together...).
 *   CHAT_API_KEY   provider key (required)
 *   CHAT_MODEL     model or deployment name (required)
 *   CHAT_BASE_URL  e.g. https://api.openai.com/v1 (default)
 */
const BASE_URL = (process.env.CHAT_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
const MAX_TURNS = 30;
const MAX_CHARS = 1500;
const MAX_TOOL_STEPS = 5;

const SYSTEM = `You are Nox, the website assistant for ${site.name}. You help visitors understand Scenox Commerce's services, find the right page, get a quote and book a call.

Answering:
- Use only the facts in the knowledge below and results from search_site. If something isn't covered (a custom requirement, a specific integration, a delivery date for their project), say you're not certain and offer to pass their question to the team.
- Never invent prices, discounts, timelines, client names, results or statistics. Quote prices only in the visitor's currency, always as starting prices ("from"), and say the final figure is confirmed after the team sees their files.
- Any mention of 48 hours must carry the condition: for eligible projects, depending on scope and data quality.
- Keep answers short: 2 to 5 sentences or a short list. Plain, direct language, like a helpful person on the team typing a reply. No hype words ("seamless", "elevate", "unlock", "robust", "game-changer"), no "Great question", no exclamation marks, no emoji. Never use em dashes or en dashes; use commas, full stops or brackets instead.
- Reply in the visitor's language (Hindi or Hinglish if they write that way).
- Format: plain text with occasional **bold**, "- " bullet lists and markdown links to site pages using relative paths like [Pricing](/pricing). No headings, no tables.

Guiding visitors:
- When a visitor asks about a platform, country, industry, migration, error or topic, call search_site and link the best one or two pages.
- Only call open_page when the visitor asks to go to or see a page, or says yes after you offer to take them there. Never open pages unprompted.

Collecting leads:
- If the visitor wants a quote, a sample, or wants the team to contact them, offer to take their details here.
Booking calls:
- If they'd rather talk, offer to book a 30-minute video call right here. Call get_available_slots (optionally for a day they name, as YYYY-MM-DD in their time zone) and offer three to five times. Times are already in the visitor's time zone; say so.
- Once they pick a time, collect name, email, mobile number with country code, company and what they want to discuss (skip anything they've already given), confirm everything in one line, then call book_meeting with the slot id.
- After booking, tell them the invite with the Google Meet link is on its way to their email.
- If booking tools report the calendar isn't available, offer the booking page [Book a call](/book) instead and open it if they agree.
- Ask naturally, one or two items per message, for: full name, email, mobile or WhatsApp number with country code, company or store name, and what they need (platform and rough product count if relevant).
- Before calling save_lead, repeat the details back in one short line and ask them to confirm. Only call save_lead after they confirm.
- Tell them they'll get a confirmation email and the team replies by email. Do not promise a reply time.
- Never ask for or accept store passwords, card numbers or other credentials. If a visitor offers one, tell them not to share it.

Other:
- Your name is Nox. If asked who you are: you're Nox, an AI assistant on the Scenox Commerce website, the same kind of AI support Scenox sets up for online stores. A person on the team takes over by email. If asked which AI model you run on, say you're built by Scenox on top of a third-party language model, and don't name or deny any model.
- Clients: Scenox has worked with ${clientClaim.headline}. Named clients you may mention: ${clients.map((c) => c.name).join(", ")}. Don't describe what was done for any of them or quote results; point to [Case studies](/case-studies). The workflow write-ups on that page are representative samples, not client results.
- Stay on topic: Scenox Commerce and running an online store. Politely decline anything unrelated.

<knowledge>
${knowledgeLines({ detailed: true }).join("\n")}
</knowledge>`;

const TOOLS = [
  {
    type: "function",
    function: {
      name: "search_site",
      description: "Search every page on the Scenox Commerce site (services, platform, country, industry and migration pages, guides and error fixes). Returns titles, paths and one-line summaries.",
      parameters: { type: "object", properties: { query: { type: "string", description: "What the visitor is looking for, in a few words." } }, required: ["query"] },
    },
  },
  {
    type: "function",
    function: {
      name: "open_page",
      description: "Open a page on this site in the visitor's browser. Only use when the visitor asks to go to a page or agrees to be taken there.",
      parameters: { type: "object", properties: { path: { type: "string", description: "Relative path, e.g. /pricing or /guides/shopify-csv-import-errors" } }, required: ["path"] },
    },
  },
  {
    type: "function",
    function: {
      name: "get_available_slots",
      description: "List open 30-minute call slots on the Scenox team's calendar, already converted to the visitor's time zone. Returns slot ids to use with book_meeting.",
      parameters: { type: "object", properties: { day: { type: "string", description: "Optional day in the visitor's time zone, YYYY-MM-DD" } } },
    },
  },
  {
    type: "function",
    function: {
      name: "book_meeting",
      description: "Book a call in a slot from get_available_slots and send the visitor a Google Calendar invite with a Meet link. Only call after the visitor has confirmed the time and their details.",
      parameters: {
        type: "object",
        properties: {
          slotId: { type: "string", description: "Slot id from get_available_slots" },
          fullName: { type: "string" },
          email: { type: "string" },
          phone: { type: "string", description: "Mobile number including country code" },
          company: { type: "string" },
          need: { type: "string", description: "What they want to discuss" },
        },
        required: ["slotId", "fullName", "email", "phone", "company", "need"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "save_lead",
      description: "Send the visitor's details to the Scenox team and email the visitor a confirmation. Only call after the visitor has confirmed the details.",
      parameters: {
        type: "object",
        properties: {
          fullName: { type: "string" },
          email: { type: "string" },
          phone: { type: "string", description: "Mobile or WhatsApp number including country code, e.g. +44 7700 900123" },
          company: { type: "string", description: "Company or store name" },
          need: { type: "string", description: "What they need, in their words" },
          platform: { type: "string", description: "Store platform if known" },
          productCount: { type: "string", description: "Rough number of products if known" },
        },
        required: ["fullName", "email", "phone", "company", "need"],
      },
    },
  },
] as const;

// naive in-memory rate limit per instance: 40 messages / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 40;
}

type Turn = { role: "user" | "assistant"; content: string };
type Msg = { role: "system" | "user" | "assistant" | "tool"; content: string | null; tool_calls?: ToolCall[]; tool_call_id?: string };
type ToolCall = { id: string; type: "function"; function: { name: string; arguments: string } };

function parse(body: unknown): { turns: Turn[]; market: keyof typeof MARKETS; path: string; tz: string } | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.messages) || b.messages.length === 0 || b.messages.length > MAX_TURNS) return null;
  const turns: Turn[] = [];
  for (const [i, m] of b.messages.entries()) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    const expected: Turn["role"] = i % 2 === 0 ? "user" : "assistant";
    if (role !== expected || typeof content !== "string") return null;
    const text = content.trim().slice(0, role === "user" ? MAX_CHARS : 6000);
    if (!text) return null;
    turns.push({ role: expected, content: text });
  }
  if (turns.at(-1)!.role !== "user") return null;
  const market = typeof b.market === "string" && isMarket(b.market) ? b.market : "us";
  const path = typeof b.path === "string" ? b.path.slice(0, 120).replace(/[^\w\-/#?=&.]/g, "") : "/";
  const tz = validTz(b.tz) ? b.tz : MARKETS[market].id === "in" ? "Asia/Kolkata" : "UTC";
  return { turns, market, path, tz };
}

async function complete(messages: Msg[]) {
  const key = process.env.CHAT_API_KEY!;
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
      // Azure OpenAI accepts its key in this header
      ...(BASE_URL.includes("azure.com") ? { "api-key": key } : {}),
    },
    body: JSON.stringify({ model: process.env.CHAT_MODEL, messages, tools: TOOLS, tool_choice: "auto", temperature: 0.3, max_tokens: 700 }),
    signal: AbortSignal.timeout(45000),
  });
  if (!res.ok) throw new Error(`provider ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return data.choices?.[0]?.message as { content: string | null; tool_calls?: ToolCall[] };
}

// short progress lines shown in the chat while a tool runs
const STATUS: Record<string, string> = {
  search_site: "Looking through the site",
  open_page: "Opening the page",
  get_available_slots: "Checking the calendar",
  book_meeting: "Booking your call",
  save_lead: "Sending your details",
};

const line = (o: object) => JSON.stringify(o) + "\n";

export async function POST(req: Request) {
  if (!process.env.CHAT_API_KEY || !process.env.CHAT_MODEL) {
    return NextResponse.json({ error: "The assistant isn't available right now." }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "That's a lot of questions at once. Try again in a few minutes." }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = parse(body);
  if (!parsed) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const m = MARKETS[parsed.market];
  const messages: Msg[] = [
    { role: "system", content: SYSTEM },
    { role: "system", content: `Visitor market: ${m.label}. Quote prices in ${m.currency} (${m.symbol}) only. They are on the page ${parsed.path}. Their time zone: ${parsed.tz}. Today in their time zone: ${new Intl.DateTimeFormat("en-CA", { timeZone: parsed.tz }).format(new Date())}.` },
    ...parsed.turns,
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (o: object) => controller.enqueue(encoder.encode(line(o)));
      try {
        let reply = "";
        for (let step = 0; step <= MAX_TOOL_STEPS; step++) {
          const msg = await complete(messages);
          if (!msg) throw new Error("empty response");
          const calls = msg.tool_calls ?? [];
          if (!calls.length || step === MAX_TOOL_STEPS) {
            reply = (msg.content ?? "").trim();
            break;
          }
          messages.push({ role: "assistant", content: msg.content ?? null, tool_calls: calls });
          for (const call of calls) {
            const status = STATUS[call.function.name];
            if (status) send({ t: "s", v: status });
            let args: Record<string, string> = {};
            try {
              args = JSON.parse(call.function.arguments || "{}");
            } catch {}
            let result: unknown;
            if (call.function.name === "search_site") {
              result = searchSite(String(args.query || ""));
            } else if (call.function.name === "open_page") {
              const path = String(args.path || "");
              if (path.startsWith("/") && isKnownPath(path)) {
                send({ t: "nav", v: path });
                result = { ok: true, opened: path };
              } else result = { ok: false, error: "Unknown page. Use search_site to find the right path." };
            } else if (call.function.name === "get_available_slots") {
              if (!calendarConfigured()) result = { ok: false, calendarAvailable: false, bookingPage: "/book" };
              else {
                const day = /^\d{4}-\d{2}-\d{2}$/.test(String(args.day || "")) ? String(args.day) : undefined;
                const slots = (await freeSlots(parsed.tz, day)).slice(0, 12);
                result = { ok: true, timeZone: parsed.tz, slots: slots.map((t) => ({ id: String(t), when: formatSlot(t, parsed.tz) })), note: slots.length ? undefined : "No open slots for that day; offer another day." };
              }
            } else if (call.function.name === "book_meeting") {
              if (!calendarConfigured()) result = { ok: false, calendarAvailable: false, bookingPage: "/book" };
              else {
                const v = validatePayload({ kind: "contact", topic: "Call booked", fullName: args.fullName, email: args.email, phone: args.phone, company: args.company, message: `Call booked via Nox. ${args.need || ""}` });
                const start = Number(args.slotId);
                if (!v.ok) result = { ok: false, error: v.error };
                else if (!Number.isFinite(start)) result = { ok: false, error: "Invalid slot id. Ask for available slots again." };
                else {
                  const b = await bookSlot(start, { fullName: v.data.fullName, email: v.data.email, phone: v.data.phone, company: v.data.company, need: String(args.need || "") });
                  if (b.ok) {
                    await forwardLead({ ...v.data, kind: "contact", topic: "Call booked", message: `Call booked for ${formatSlot(start, "UTC")} UTC (${formatSlot(start, parsed.tz)} ${parsed.tz}).
${args.need || ""}` }, { ip, ua: req.headers.get("user-agent") ?? undefined });
                    send({ t: "lead" });
                    send({ t: "booked" });
                    result = { ok: true, when: formatSlot(start, parsed.tz), timeZone: parsed.tz, inviteSentTo: v.data.email, meetLink: b.meetLink };
                  } else result = b;
                }
              }
            } else if (call.function.name === "save_lead") {
              const message = [args.need, args.platform && `Platform: ${args.platform}`, args.productCount && `Products: ${args.productCount}`, `Via website assistant, page ${parsed.path}, market ${m.label}`].filter(Boolean).join("\n");
              const v = validatePayload({ kind: "contact", topic: "Website assistant", fullName: args.fullName, email: args.email, phone: args.phone, company: args.company, message: message.length >= 10 ? message : `${message} (via chat)` });
              if (!v.ok) {
                result = { ok: false, error: v.error };
              } else {
                const r = await forwardLead(v.data, { ip, ua: req.headers.get("user-agent") ?? undefined });
                let confirmed = false;
                try {
                  confirmed = await sendVisitorEmail(v.data.email, v.data.fullName, [
                    `Name: ${v.data.fullName}`,
                    `Company: ${v.data.company}`,
                    `Phone: ${v.data.phone}`,
                    `Need: ${args.need}`,
                    args.platform ? `Platform: ${args.platform}` : "",
                    args.productCount ? `Products: ${args.productCount}` : "",
                  ]);
                } catch (e) {
                  console.error("[chat] visitor email failed", e);
                }
                send({ t: "lead" });
                result = { ok: true, teamNotified: r.emailed || r.forwarded, confirmationEmailSent: confirmed };
              }
            } else result = { ok: false, error: "Unknown tool." };
            messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(result) });
          }
        }
        // house style: no em/en dashes, which read as machine-written
        reply = reply.replace(/\s*[—–]\s*/g, ", ").replace(/, ([.,;:!?])/g, "$1");
        send({ t: "d", v: reply || `Sorry, I couldn't put an answer together. The team is at ${site.email} or [the contact page](/contact).` });
        send({ t: "end" });
      } catch (err) {
        console.error("[chat]", err);
        send({ t: "err", v: `Something went wrong on our side. You can reach the team at ${site.email}.` });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" } });
}

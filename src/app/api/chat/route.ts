import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { MARKETS, isMarket } from "@/lib/markets";
import { knowledgeLines } from "@/lib/knowledge";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-opus-5-5";
const MAX_TURNS = 24;
const MAX_CHARS = 1500;

/*
 * The system prompt is identical for every visitor so it caches; the
 * visitor's market and page go in a system message after their question.
 */
const SYSTEM = `You are the website assistant for ${site.name}. You answer visitors' questions about Scenox Commerce's services, prices, process and platforms, and help them pick the right next step.

How to answer:
- Use only the facts in the knowledge below. If something isn't covered (a custom requirement, a specific integration, a delivery date for their project), say you're not certain and point them to the team: the contact page (/contact) or ${site.email}${site.bookingUrl ? `, or booking a call (${site.bookingUrl})` : ""}.
- Never invent prices, discounts, timelines, client names, results or statistics. Quote prices only in the visitor's currency, always as starting prices ("from"), and say the final figure is confirmed after we see their files.
- Any mention of 48 hours must carry the condition: for eligible projects, depending on scope and data quality.
- Keep answers short: 2 to 5 sentences or a short list. Plain, direct language. No hype words (seamless, unlock, revolutionize, empower, cutting-edge, next-generation).
- When it helps, end with one relevant next step as a markdown link to a page on this site, e.g. [Get started](/get-started), [Send 10 products free](/free-sample), [Pricing](/pricing), [Store migration](/store-migration). Use relative paths for site pages.
- Never ask for or accept store passwords, card numbers or other credentials. If a visitor offers one, tell them not to share it.
- If asked who you are: you're an AI assistant on the Scenox Commerce website, the same kind of AI support Scenox sets up for online stores. A person on the team can take over by email or the contact form.
- Stay on topic: Scenox Commerce and running an online store. Politely decline anything unrelated.
- Format: plain text with occasional **bold**, "- " bullet lists and markdown links. No headings, no tables.

<knowledge>
${knowledgeLines({ detailed: true }).join("\n")}
</knowledge>`;

// naive in-memory rate limit per instance: 30 messages / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 30;
}

type Turn = { role: "user" | "assistant"; content: string };

function parse(body: unknown): { turns: Turn[]; market: keyof typeof MARKETS; path: string } | null {
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
  return { turns, market, path };
}

const line = (o: object) => JSON.stringify(o) + "\n";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "The assistant isn't available right now." }, { status: 503 });
  }
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
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
  const client = new Anthropic();

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 4096,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low" },
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [
      ...parsed.turns,
      {
        role: "system",
        content: `Visitor market: ${m.label}. Quote prices in ${m.currency} (${m.symbol}) only. They are on the page ${parsed.path}.`,
      },
    ],
  });

  const encoder = new TextEncoder();
  const body$ = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (o: object) => controller.enqueue(encoder.encode(line(o)));
      try {
        for await (const event of stream) {
          if (event.type === "content_block_start" && event.content_block.type === "fallback") {
            // the first model declined mid-answer; the fallback model starts over
            send({ t: "reset" });
          } else if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            send({ t: "d", v: event.delta.text });
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          send({ t: "reset" });
          send({ t: "d", v: `I can't help with that one. For anything about your store, the team is at ${site.email} or [the contact page](/contact).` });
        } else if (final.stop_reason === "max_tokens") {
          send({ t: "d", v: "\n\n(That answer was cut short. Ask me to continue, or [contact the team](/contact).)" });
        }
        send({ t: "end" });
      } catch (err) {
        console.error("[chat]", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
        send({ t: "err", v: `Something went wrong on our side. You can reach the team at ${site.email}.` });
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body$, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

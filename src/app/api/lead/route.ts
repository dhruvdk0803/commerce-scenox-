import { NextResponse } from "next/server";
import { forwardLead, validatePayload } from "@/lib/leads";

export const runtime = "nodejs";

// naive in-memory rate limit per instance: 10 submissions / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 10;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const v = validatePayload(body);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 422 });

  // Delivery failures are logged server-side and never fail the visitor.
  const r = await forwardLead(v.data, { ip, ua: req.headers.get("user-agent") ?? undefined });
  return NextResponse.json({ ok: true, emailed: r.emailed, forwarded: r.forwarded });
}

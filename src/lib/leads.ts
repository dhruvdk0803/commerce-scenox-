/**
 * Lead / sample / contact submission handling.
 *
 * Delivery (all optional, all can run together):
 *  - Email via SMTP (Google Workspace app password) when SMTP_* + LEAD_TO_EMAIL are set,
 *    else via Resend REST API when RESEND_API_KEY + LEAD_TO_EMAIL are set.
 *  - Webhook (CRM, Zapier, Make, Slack, Sheets) when LEAD_WEBHOOK_URL is set.
 *  - Always logged server-side so nothing is lost while integrations are configured.
 *
 * Nothing here ever accepts or stores store passwords.
 */

export type SampleFile = { name: string; type: string; size: number; base64: string };

type Base = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  notes?: string;
  utm?: Record<string, string>;
  sampleFileName?: string;
  sampleFile?: SampleFile;
};

export type LeadPayload = Base & {
  kind: "lead";
  country: string;
  platform: string;
  productCount: string;
  sources: string[];
  needs: string[];
  timeline: string;
};

export type SamplePayload = Base & {
  kind: "sample";
  platform: string;
  productCount: string;
  sourceFormat: string;
};

export type ContactPayload = Base & {
  kind: "contact";
  topic: string;
  message: string;
};

export type Payload = LeadPayload | SamplePayload | ContactPayload;

import { isValidEmail, isValidPhone, looksLikeCredentials, normaliseUrl } from "./validation";
export { isValidEmail, isValidPhone, isWorkEmail, looksLikeCredentials, normaliseUrl } from "./validation";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const SAFE_EXT = /\.(csv|xlsx|xls|pdf|zip|json|txt)$/i;

function pickFile(o: Record<string, unknown>): { ok: true; file?: SampleFile } | { ok: false; error: string } {
  const f = o.sampleFile;
  if (!f || typeof f !== "object") return { ok: true };
  const r = f as Record<string, unknown>;
  const name = typeof r.name === "string" ? r.name.slice(0, 200) : "";
  const base64 = typeof r.base64 === "string" ? r.base64 : "";
  const size = typeof r.size === "number" ? r.size : 0;
  if (!name || !base64) return { ok: true };
  if (!SAFE_EXT.test(name)) return { ok: false, error: "Send a CSV, Excel, PDF, ZIP, JSON or text file." };
  if (size > MAX_FILE_BYTES || base64.length > MAX_FILE_BYTES * 1.4) {
    return { ok: false, error: "That file is over 5 MB. Send a smaller sample." };
  }
  return { ok: true, file: { name, type: typeof r.type === "string" ? r.type.slice(0, 100) : "", size, base64 } };
}

export function validatePayload(p: unknown): { ok: true; data: Payload } | { ok: false; error: string } {
  if (!p || typeof p !== "object") return { ok: false, error: "Invalid submission." };
  const o = p as Record<string, unknown>;
  const str = (k: string) => (typeof o[k] === "string" ? (o[k] as string).trim() : "");
  const arr = (k: string) =>
    Array.isArray(o[k]) ? (o[k] as unknown[]).filter((x) => typeof x === "string").map(String) : [];

  const kind = o.kind;
  if (kind !== "lead" && kind !== "sample" && kind !== "contact") {
    return { ok: false, error: "Invalid submission type." };
  }
  if (str("fullName").length < 2) return { ok: false, error: "Enter your name." };
  if (!isValidEmail(str("email"))) return { ok: false, error: "Enter a valid work email." };
  if (!isValidPhone(str("phone"))) return { ok: false, error: "Enter a valid phone number." };
  if (str("company").length < 2) return { ok: false, error: "Enter your company name." };
  if (looksLikeCredentials(str("notes")) || looksLikeCredentials(str("message"))) {
    return { ok: false, error: "Please don't include passwords or keys. We arrange access securely after approval." };
  }
  // honeypot
  if (str("website_confirm")) return { ok: false, error: "Submission rejected." };

  const utm =
    o.utm && typeof o.utm === "object"
      ? Object.fromEntries(
          Object.entries(o.utm as Record<string, unknown>)
            .filter(([, v]) => typeof v === "string")
            .map(([k, v]) => [k.slice(0, 40), String(v).slice(0, 200)]),
        )
      : undefined;

  const filePick = pickFile(o);
  if (!filePick.ok) return filePick;

  const base: Base = {
    fullName: str("fullName").slice(0, 120),
    email: str("email").slice(0, 200),
    phone: str("phone").slice(0, 40),
    company: str("company").slice(0, 160),
    website: normaliseUrl(str("website")).slice(0, 300) || undefined,
    notes: str("notes").slice(0, 2000) || undefined,
    utm,
    sampleFileName: str("sampleFileName").slice(0, 200) || undefined,
    sampleFile: filePick.file,
  };

  if (kind === "lead") {
    if (!str("platform")) return { ok: false, error: "Select a platform." };
    if (!str("productCount")) return { ok: false, error: "Select a product count." };
    if (!str("country")) return { ok: false, error: "Select your country." };
    if (!str("timeline")) return { ok: false, error: "Select a timeline." };
    return {
      ok: true,
      data: {
        ...base,
        kind: "lead",
        country: str("country").slice(0, 80),
        platform: str("platform").slice(0, 40),
        productCount: str("productCount").slice(0, 40),
        sources: arr("sources").slice(0, 12),
        needs: arr("needs").slice(0, 20),
        timeline: str("timeline").slice(0, 40),
      },
    };
  }

  if (kind === "sample") {
    if (!str("platform")) return { ok: false, error: "Select a platform." };
    if (!str("productCount")) return { ok: false, error: "Select a product count." };
    if (!str("sourceFormat")) return { ok: false, error: "Select your current source format." };
    return {
      ok: true,
      data: {
        ...base,
        kind: "sample",
        platform: str("platform").slice(0, 40),
        productCount: str("productCount").slice(0, 40),
        sourceFormat: str("sourceFormat").slice(0, 60),
      },
    };
  }

  if (str("message").length < 10) return { ok: false, error: "Tell us a little more about what you need." };
  return {
    ok: true,
    data: {
      ...base,
      kind: "contact",
      topic: str("topic").slice(0, 60) || "General",
      message: str("message").slice(0, 4000),
    },
  };
}

/* ------------------------------------------------------------------ */
/* delivery                                                             */
/* ------------------------------------------------------------------ */

const LABELS: Record<Payload["kind"], string> = {
  lead: "New project enquiry",
  sample: "10-product sample request",
  contact: "Contact message",
};

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function rows(data: Payload): [string, string][] {
  const r: [string, string][] = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company],
  ];
  if (data.website) r.push(["Website", data.website]);
  if (data.kind === "lead") {
    r.push(
      ["Country", data.country],
      ["Platform", data.platform],
      ["Products", data.productCount],
      ["Sources", data.sources.join(", ") || "—"],
      ["Needs", data.needs.join(", ") || "—"],
      ["Timeline", data.timeline],
    );
  } else if (data.kind === "sample") {
    r.push(["Platform", data.platform], ["Products", data.productCount], ["Source format", data.sourceFormat]);
  } else {
    r.push(["Topic", data.topic]);
  }
  if (data.notes) r.push(["Notes", data.notes]);
  if (data.kind === "contact") r.push(["Message", data.message]);
  if (data.sampleFile) r.push(["Attachment", `${data.sampleFile.name} (${Math.ceil(data.sampleFile.size / 1024)} KB)`]);
  if (data.utm) r.push(["Source / UTM", Object.entries(data.utm).map(([k, v]) => `${k}=${v}`).join("  ")]);
  return r;
}

export function renderEmail(data: Payload, meta: { ip?: string; ua?: string }) {
  const subject = `[Scenox Commerce] ${LABELS[data.kind]} — ${data.company} (${data.fullName})`;
  const body = rows(data);
  const text = body.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nReceived: ${new Date().toISOString()}\nIP: ${meta.ip ?? "-"}`;
  const html = `<!doctype html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#101112;background:#f5f4ef;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fbfbf8;border:1px solid #d9dad5;border-radius:12px;overflow:hidden">
    <div style="padding:14px 20px;border-bottom:1px solid #d9dad5;font:600 12px ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#686b6d">SCENOX / COMMERCE · ${esc(LABELS[data.kind]).toUpperCase()}</div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${body
        .map(
          ([k, v]) =>
            `<tr><td style="padding:10px 20px;border-bottom:1px solid #ecede8;color:#686b6d;width:140px;vertical-align:top;font:500 11px ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase">${esc(k)}</td><td style="padding:10px 20px;border-bottom:1px solid #ecede8;white-space:pre-wrap">${esc(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <div style="padding:12px 20px;font-size:12px;color:#9a9d9b">Received ${new Date().toUTCString()} · reply directly to this email to answer ${esc(data.fullName)}.</div>
  </div></body>`;
  return { subject, text, html };
}

async function sendViaSmtp(data: Payload, meta: { ip?: string; ua?: string }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_TO_EMAIL;
  if (!host || !user || !pass || !to) return false;
  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  const { subject, text, html } = renderEmail(data, meta);
  await transport.sendMail({
    from: process.env.LEAD_FROM_EMAIL || `Scenox Commerce <${user}>`,
    to: to.split(",").map((s) => s.trim()).filter(Boolean),
    replyTo: data.email,
    subject,
    text,
    html,
    attachments: data.sampleFile
      ? [{ filename: data.sampleFile.name, content: data.sampleFile.base64, encoding: "base64" }]
      : undefined,
  });
  return true;
}

async function sendViaResend(data: Payload, meta: { ip?: string; ua?: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!key || !to) return false;
  const from = process.env.LEAD_FROM_EMAIL || "Scenox Commerce <onboarding@resend.dev>";
  const { subject, text, html } = renderEmail(data, meta);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: data.email,
      subject,
      text,
      html,
      attachments: data.sampleFile ? [{ filename: data.sampleFile.name, content: data.sampleFile.base64 }] : undefined,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return true;
}

/** SMTP (e.g. Google Workspace) takes priority when configured; otherwise Resend. */
async function sendEmail(data: Payload, meta: { ip?: string; ua?: string }) {
  if (process.env.SMTP_HOST) return sendViaSmtp(data, meta);
  return sendViaResend(data, meta);
}

async function sendWebhook(record: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.LEAD_WEBHOOK_SECRET ? { "x-scenox-secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
    },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}

export async function forwardLead(data: Payload, meta: { ip?: string; ua?: string }) {
  const record = { ...data, receivedAt: new Date().toISOString(), meta };

  // Always log (without file bytes) so nothing is lost while integrations are configured.
  const { sampleFile, ...loggable } = record;
  console.info(
    `[${data.kind}]`,
    JSON.stringify({ ...loggable, sampleFile: sampleFile ? { name: sampleFile.name, size: sampleFile.size } : undefined }),
  );

  const [email, webhook] = await Promise.allSettled([sendEmail(data, meta), sendWebhook(record)]);
  const emailed = email.status === "fulfilled" && email.value;
  const forwarded = webhook.status === "fulfilled" && webhook.value;
  if (email.status === "rejected") console.error("[lead] email failed", email.reason);
  if (webhook.status === "rejected") console.error("[lead] webhook failed", webhook.reason);
  return { emailed, forwarded };
}

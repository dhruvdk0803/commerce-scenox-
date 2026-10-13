/**
 * Direct meeting booking on the owner's Google Calendar (used by the website
 * assistant). Server-only: credentials come from environment variables and
 * never reach the browser.
 *
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN  (scripts/google-calendar-auth.mjs)
 *   GOOGLE_CALENDAR_ID     default "primary"
 *   BOOKING_TIMEZONE       owner's time zone, default Asia/Kolkata
 *   BOOKING_WEEKDAYS       1=Mon … 7=Sun, default 1,2,3,4,5
 *   BOOKING_HOURS          default 10:00-18:00 (owner's time)
 *   BOOKING_SLOT_MINUTES   default 30
 *   BOOKING_NOTICE_HOURS   earliest bookable slot from now, default 12
 *   BOOKING_DAYS_AHEAD     default 14
 *   BOOKING_VISITOR_HOURS  only offer slots inside this window in the visitor's own time, default 08-21
 */

const env = (k: string, d = "") => process.env[k]?.trim() || d;

export const calendarConfigured = () =>
  Boolean(env("GOOGLE_CLIENT_ID") && env("GOOGLE_CLIENT_SECRET") && env("GOOGLE_REFRESH_TOKEN"));

const cfg = () => {
  const [start, end] = env("BOOKING_HOURS", "10:00-18:00").split("-");
  return {
    calendarId: env("GOOGLE_CALENDAR_ID", "primary"),
    tz: env("BOOKING_TIMEZONE", "Asia/Kolkata"),
    weekdays: env("BOOKING_WEEKDAYS", "1,2,3,4,5").split(",").map(Number),
    start,
    end,
    slot: Number(env("BOOKING_SLOT_MINUTES", "30")),
    noticeH: Number(env("BOOKING_NOTICE_HOURS", "12")),
    daysAhead: Number(env("BOOKING_DAYS_AHEAD", "14")),
  };
};

let token: { value: string; exp: number } | null = null;
async function accessToken() {
  if (token && token.exp > Date.now() + 60_000) return token.value;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env("GOOGLE_CLIENT_ID"),
      client_secret: env("GOOGLE_CLIENT_SECRET"),
      refresh_token: env("GOOGLE_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`google token ${res.status}`);
  const j = await res.json();
  token = { value: j.access_token, exp: Date.now() + (j.expires_in ?? 3600) * 1000 };
  return token.value;
}

/** Offset (ms) of `tz` from UTC at instant `utcMs`. */
function tzOffset(utcMs: number, tz: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      .formatToParts(new Date(utcMs))
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour % 24, +parts.minute, +parts.second);
  return asUtc - utcMs;
}

/** Wall-clock date and time in `tz` → UTC instant. */
function zonedToUtc(y: number, m: number, d: number, hh: number, mm: number, tz: string) {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const first = guess - tzOffset(guess, tz);
  return first - (tzOffset(first, tz) - tzOffset(guess, tz));
}

function ownerDayParts(utcMs: number, tz: string) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" })
      .formatToParts(new Date(utcMs))
      .map((x) => [x.type, x.value]),
  );
  const wd = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }[p.weekday as string] ?? 0;
  return { y: +p.year, m: +p.month, d: +p.day, wd };
}

/** Every slot in the booking window, before removing busy times. */
function candidateSlots() {
  const c = cfg();
  const [sh, sm] = c.start.split(":").map(Number);
  const [eh, em] = c.end.split(":").map(Number);
  const earliest = Date.now() + c.noticeH * 3600_000;
  const out: number[] = [];
  for (let i = 0; i <= c.daysAhead; i++) {
    const { y, m, d, wd } = ownerDayParts(Date.now() + i * 86_400_000, c.tz);
    if (!c.weekdays.includes(wd)) continue;
    const dayStart = zonedToUtc(y, m, d, sh, sm, c.tz);
    const dayEnd = zonedToUtc(y, m, d, eh, em, c.tz);
    for (let t = dayStart; t + c.slot * 60_000 <= dayEnd; t += c.slot * 60_000) if (t >= earliest) out.push(t);
  }
  return out;
}

async function busy(fromMs: number, toMs: number) {
  const c = cfg();
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { authorization: `Bearer ${await accessToken()}`, "content-type": "application/json" },
    body: JSON.stringify({ timeMin: new Date(fromMs).toISOString(), timeMax: new Date(toMs).toISOString(), items: [{ id: c.calendarId }] }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`google freebusy ${res.status}`);
  const j = await res.json();
  return ((j.calendars?.[c.calendarId]?.busy ?? []) as { start: string; end: string }[]).map((b) => [Date.parse(b.start), Date.parse(b.end)] as const);
}

/** Free slots (UTC ms), optionally only those on `day` (YYYY-MM-DD) in the visitor's time zone. */
export async function freeSlots(visitorTz: string, day?: string) {
  const c = cfg();
  let slots = candidateSlots();
  if (!slots.length) return [];
  // never offer a 3 am slot: keep times that fall in reasonable hours for the visitor
  const [vFrom, vTo] = env("BOOKING_VISITOR_HOURS", "08-21").split("-").map(Number);
  slots = slots.filter((t) => {
    const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: visitorTz, hour: "2-digit", hourCycle: "h23" }).format(new Date(t)));
    return h >= vFrom && h < vTo;
  });
  if (day) slots = slots.filter((t) => new Intl.DateTimeFormat("en-CA", { timeZone: visitorTz }).format(new Date(t)) === day);
  if (!slots.length) return [];
  const blocks = await busy(slots[0], slots[slots.length - 1] + c.slot * 60_000);
  return slots.filter((t) => !blocks.some(([s, e]) => t < e && t + c.slot * 60_000 > s));
}

export const formatSlot = (t: number, tz: string) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(t));

/** Books a slot after re-checking it is valid and still free. Google emails the invite. */
export async function bookSlot(startMs: number, who: { fullName: string; email: string; phone: string; company: string; need: string }) {
  const c = cfg();
  if (!candidateSlots().includes(startMs)) return { ok: false as const, error: "That time isn't bookable. Ask for available slots again." };
  const end = startMs + c.slot * 60_000;
  const blocks = await busy(startMs, end);
  if (blocks.some(([s, e]) => startMs < e && end > s)) return { ok: false as const, error: "That slot was just taken. Offer other times." };
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(c.calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`, {
    method: "POST",
    headers: { authorization: `Bearer ${await accessToken()}`, "content-type": "application/json" },
    body: JSON.stringify({
      summary: `Scenox Commerce call · ${who.company}`,
      description: `Booked through the website assistant.\n\nName: ${who.fullName}\nCompany: ${who.company}\nEmail: ${who.email}\nPhone: ${who.phone}\n\nWhat they need:\n${who.need}`,
      start: { dateTime: new Date(startMs).toISOString() },
      end: { dateTime: new Date(end).toISOString() },
      attendees: [{ email: who.email, displayName: who.fullName }],
      conferenceData: { createRequest: { requestId: `scx-${startMs}-${Math.random().toString(36).slice(2, 8)}`, conferenceSolutionKey: { type: "hangoutsMeet" } } },
      reminders: { useDefault: true },
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`google insert ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const ev = await res.json();
  return { ok: true as const, meetLink: (ev.hangoutLink as string) || null };
}

export const validTz = (tz: unknown): tz is string => {
  if (typeof tz !== "string" || tz.length > 64) return false;
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

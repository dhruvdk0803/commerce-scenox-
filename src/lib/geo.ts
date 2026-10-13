import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Reader } from "mmdb-lib";

/**
 * Visitor country for market pricing when self-hosted (no CDN country header).
 * Offline lookup in the DB-IP Lite country database (CC BY 4.0, credited in
 * the footer). Loaded once per process, ~8 MB.
 */
// DB-IP records are { country_code }, not MaxMind's shape, so read them untyped
let reader: Reader<never> | null | undefined;

function db() {
  if (reader === undefined) {
    try {
      reader = new Reader(readFileSync(join(process.cwd(), "node_modules/@ip-location-db/dbip-country-mmdb/dbip-country.mmdb")));
    } catch (e) {
      console.error("[geo] country database not loaded", e);
      reader = null;
    }
  }
  return reader;
}

/** ISO country code for the request, from a CDN header if present, else the client IP. */
export function requestCountry(headers: Headers): string | null {
  const header = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry");
  if (header && /^[A-Z]{2}$/i.test(header)) return header.toUpperCase();
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip")?.trim();
  if (!ip) return null;
  const local = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1$|fc|fd)/i.test(ip);
  if (local) return null;
  try {
    // unknown public address: "ZZ" falls through to the default market
    const rec = db()?.get(ip.replace(/^::ffff:/, "")) as { country_code?: string } | null | undefined;
    return rec?.country_code ?? "ZZ";
  } catch {
    return "ZZ";
  }
}

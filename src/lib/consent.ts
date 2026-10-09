/**
 * Cookie consent. Nothing optional (analytics, advertising) loads until the
 * visitor opts in. The choice lives in a first-party cookie for 12 months.
 */

export type Consent = {
  /** GA4: page and event measurement */
  analytics: boolean;
  /** Meta Pixel: ad measurement and audiences */
  advertising: boolean;
  /** when the choice was made (ISO) */
  at: string;
  /** bump to re-ask everyone when the categories change */
  v: 1;
};

export const CONSENT_COOKIE = "scx_consent";
export const CONSENT_EVENT = "scx:consent";
export const OPEN_SETTINGS_EVENT = "scx:consent-open";
const MAX_AGE = 60 * 60 * 24 * 365;

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  try {
    const raw = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
      ?.slice(CONSENT_COOKIE.length + 1);
    if (!raw) return null;
    const c = JSON.parse(decodeURIComponent(raw)) as Consent;
    return c.v === 1 ? c : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; advertising: boolean }) {
  const c: Consent = { ...choice, at: new Date().toISOString(), v: 1 };
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(c))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${
    location.protocol === "https:" ? "; Secure" : ""
  }`;
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: c }));
  return c;
}

/** Re-open the consent panel (footer "Cookie settings" link). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

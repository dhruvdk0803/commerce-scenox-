/**
 * Analytics integration points.
 *
 * Wire GA4 / Meta Pixel / CRM here. Nothing fires unless the corresponding
 * global exists, so this file is safe in development and in tests.
 *
 * IMPORTANT: `Lead` (Meta) and `generate_lead` (GA4) are ONLY emitted from
 * `trackConversion()` which is called after a genuine successful submission.
 * Page views never fire Lead.
 */

export type AnalyticsEvent =
  | "hero_get_started_click"
  | "nav_get_started_click"
  | "sticky_get_started_click"
  | "form_started"
  | "form_step_completed"
  | "form_submitted"
  | "sample_started"
  | "sample_submitted"
  | "pricing_viewed"
  | "whatsapp_clicked"
  | "case_study_viewed"
  | "cta_click"
  | "chat_opened"
  | "chat_teaser_shown"
  | "chat_reset"
  | "chat_message_sent"
  | "book_call_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });

    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", event, params);
    }
    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics]", event, params);
    }
  } catch {
    /* analytics must never break the UI */
  }
}

/** Fire ONLY after a confirmed successful lead/sample submission. */
export function trackConversion(
  kind: "lead" | "sample",
  params: Params = {},
) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", { lead_type: kind, ...params });
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", { content_name: kind, ...params });
    }
    window.dataLayer?.push({ event: "conversion", kind, ...params });
  } catch {
    /* noop */
  }
}

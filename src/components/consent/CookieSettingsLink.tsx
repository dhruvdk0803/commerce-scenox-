"use client";

import { openConsentSettings } from "@/lib/consent";

/** Footer link that reopens the consent panel so visitors can change their choice any time. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      <span className="link-underline">Cookie settings</span>
    </button>
  );
}

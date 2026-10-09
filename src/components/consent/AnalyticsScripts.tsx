"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const subscribe = (cb: () => void) => {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
};
// a stable string snapshot: "analytics,advertising" flags
const snapshot = () => {
  const c = readConsent();
  return `${c?.analytics ? 1 : 0}${c?.advertising ? 1 : 0}`;
};
const serverSnapshot = () => "00";

/**
 * Loads GA4 and the Meta Pixel only after the visitor opts in, and only when
 * their IDs are configured (NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID).
 * Withdrawing consent switches both to denied/revoked immediately.
 */
export function AnalyticsScripts() {
  const flags = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const analytics = flags[0] === "1";
  const advertising = flags[1] === "1";

  // consent withdrawn after the tags loaded: tell them straight away
  useEffect(() => {
    if (!analytics) window.gtag?.("consent", "update", { analytics_storage: "denied" });
    if (!advertising) window.fbq?.("consent", "revoke");
  }, [analytics, advertising]);

  return (
    <>
      {GA_ID && analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {PIXEL_ID && advertising && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('consent','grant');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}

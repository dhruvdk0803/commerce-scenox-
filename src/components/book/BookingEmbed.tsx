"use client";

import { useState, useSyncExternalStore } from "react";
import { Globe } from "lucide-react";

/**
 * Google Calendar appointment schedule in a branded frame. Google shows the
 * slots in the visitor's own time zone; the header says which one so nobody
 * has to convert. A soft placeholder covers the frame until it loads.
 */
let cachedTz: string | null | undefined;
function readTz() {
  if (cachedTz !== undefined) return cachedTz;
  try {
    // "India Standard Time · 11:48 PM": the name people recognise, plus their local time now
    const d = new Date();
    const name = new Intl.DateTimeFormat("en-GB", { timeZoneName: "long" }).formatToParts(d).find((p) => p.type === "timeZoneName")?.value;
    const now = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(d);
    cachedTz = name ? `${name} · ${now}` : null;
  } catch {
    cachedTz = null;
  }
  return cachedTz;
}
const noSubscribe = () => () => {};

export function BookingEmbed({ src }: { src: string }) {
  // read on the client only; the server render shows the generic line
  const tz = useSyncExternalStore(noSubscribe, readTz, () => null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-3 md:px-5">
        <span className="mono-label text-ink-2">PICK A TIME</span>
        <span className="mono-micro flex items-center gap-1.5 text-ink-3" aria-live="polite">
          <Globe className="size-3.5" strokeWidth={2} aria-hidden />
          {tz ? <>TIMES SHOWN IN YOUR TIME ZONE: {tz.toUpperCase()}</> : "TIMES SHOWN IN YOUR TIME ZONE"}
        </span>
      </div>
      <div className="relative bg-white">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col gap-3 p-6" aria-hidden>
            <div className="h-5 w-48 animate-pulse rounded bg-bg-muted" />
            <div className="h-4 w-72 max-w-full animate-pulse rounded bg-bg-muted" />
            <div className="mt-4 grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-full bg-bg-muted/70" />
              ))}
            </div>
          </div>
        )}
        <iframe
          src={src}
          title="Book a call with Scenox Commerce"
          onLoad={() => setLoaded(true)}
          className="block h-[1100px] w-full border-0 sm:h-[760px]"
        />
      </div>
    </div>
  );
}

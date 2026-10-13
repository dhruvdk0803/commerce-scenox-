import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { site } from "@/lib/site";

/** Shown on form thank-you screens: the fastest next step is a call. */
export function BookCallPrompt() {
  if (!site.bookingUrl) return null;
  return (
    <div className="mt-7 flex flex-col gap-3 rounded-[12px] border border-line bg-bg p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[0.95rem] leading-snug text-ink-2">
        <span className="font-medium text-ink">Rather talk it through now?</span> Pick a 30-minute slot in your time zone.
      </p>
      <Link
        href={site.bookingUrl}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[8px] bg-ink px-4 text-[0.95rem] font-medium text-paper transition-colors duration-[160ms] hover:bg-[#232527]"
      >
        <CalendarDays className="size-4" strokeWidth={2} aria-hidden />
        Book a call
      </Link>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

/**
 * The lead form restores drafts from sessionStorage and prefills from the
 * query string, so it renders client-only. The skeleton mirrors the form's
 * height to avoid layout shift.
 */
const LeadForm = dynamic(() => import("./LeadForm").then((m) => m.LeadForm), {
  ssr: false,
  loading: () => (
    <div aria-busy="true" aria-label="Loading form" className="grid animate-pulse gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-3 w-24 rounded bg-bg-muted" />
            <div className="mt-2 h-12 rounded-[8px] border border-line bg-bg-elevated" />
          </div>
        ))}
      </div>
      <div className="h-36 rounded-[8px] bg-bg-muted/60" />
      <div className="h-12 rounded-[8px] border border-line" />
      <div className="ml-auto h-[52px] w-48 rounded-[8px] bg-bg-muted" />
    </div>
  ),
});

export function LeadFormLoader() {
  return <LeadForm />;
}

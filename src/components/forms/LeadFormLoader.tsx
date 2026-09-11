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
    <div aria-busy="true" aria-label="Loading form" className="animate-pulse">
      <div className="h-3 w-40 rounded bg-bg-muted" />
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[3px] rounded-full bg-line" />
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className="h-3 w-24 rounded bg-bg-muted" />
            <div className="mt-2 h-12 rounded-[8px] border border-line bg-bg-elevated" />
          </div>
        ))}
      </div>
      <div className="mt-10 h-px bg-line" />
      <div className="mt-6 ml-auto h-[52px] w-40 rounded-[8px] bg-bg-muted" />
    </div>
  ),
});

export function LeadFormLoader() {
  return <LeadForm />;
}

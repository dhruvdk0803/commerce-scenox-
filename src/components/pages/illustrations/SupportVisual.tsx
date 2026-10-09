import { Status, type StatusKind } from "@/components/ui/Status";

const THREADS: { q: string; a: string; source: string; status: StatusKind; label: string }[] = [
  {
    q: "Where is my order #1042?",
    a: "It shipped yesterday and is out for delivery today. Tracking: yourstore.com/t/1042",
    source: "ORDER DATA",
    status: "published",
    label: "ANSWERED · 4s",
  },
  {
    q: "Does the AX-442 chair come in blue?",
    a: "Yes. Blue is in stock, and it ships in 1–2 days. Here's the blue version.",
    source: "CATALOG",
    status: "published",
    label: "ANSWERED · 3s",
  },
  {
    q: "Can I return it if it doesn't fit my desk?",
    a: "Yes, within 14 days of delivery if it's unused. I can start the return for you.",
    source: "RETURNS POLICY",
    status: "published",
    label: "ANSWERED · 5s",
  },
  {
    q: "My parcel arrived damaged. I want a refund.",
    a: "I'm sorry. I've passed this to the team with your order and photos; they'll reply within the hour.",
    source: "HANDED TO TEAM · SUMMARY ATTACHED",
    status: "missing",
    label: "ESCALATED",
  },
];

export function SupportVisual() {
  return (
    <figure aria-label="Customer questions answered by the AI agent from store data, with one escalated to the team" className="overflow-hidden rounded-[12px] border border-line bg-bg">
      <div className="flex h-11 items-center justify-between border-b border-line px-4 md:px-5">
        <span className="mono-label text-ink-2">SUPPORT INBOX · TODAY</span>
        <span className="mono-micro text-ink-3">ILLUSTRATIVE</span>
      </div>
      <ul className="divide-y divide-line">
        {THREADS.map((t) => (
          <li key={t.q} className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_1.2fr_auto] md:items-start md:gap-6 md:px-5">
            <div>
              <p className="mono-micro text-ink-3">CUSTOMER</p>
              <p className="mt-1 text-[0.95rem] text-ink">“{t.q}”</p>
            </div>
            <div className="border-l-2 border-line pl-3 md:border-l-0 md:pl-0">
              <p className="mono-micro text-ink-3">AI AGENT · FROM {t.source}</p>
              <p className="mt-1 text-[0.925rem] leading-snug text-ink-2">{t.a}</p>
            </div>
            <Status kind={t.status} label={t.label} className="md:justify-self-end md:pt-0.5" />
          </li>
        ))}
      </ul>
      <figcaption className="border-t border-line px-4 py-3 text-[0.85rem] text-ink-2 md:px-5">
        Every answer comes from your store data or policies. Anything sensitive goes to a person.
      </figcaption>
    </figure>
  );
}

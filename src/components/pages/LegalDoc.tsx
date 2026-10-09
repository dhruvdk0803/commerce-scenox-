import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

/**
 * Shared layout for legal / trust pages (privacy, terms, data-handling).
 * Sticky clause index on the left, numbered clauses on the right.
 */
export function LegalDoc({
  sections,
  updated,
  contactEmail,
  intro,
}: {
  sections: LegalSection[];
  updated: string;
  contactEmail: string;
  /** optional content rendered above the numbered clauses, e.g. a callout */
  intro?: ReactNode;
}) {
  return (
    <div className="container-x pb-20 md:pb-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <nav
          aria-label="Contents"
          className="min-w-0 lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
        >
          <span className="mono-label text-ink-3">CONTENTS</span>
          <ol className="mt-4 flex gap-4 overflow-x-auto scrollbar-none pb-2 lg:block lg:gap-0 lg:space-y-3 lg:overflow-visible lg:pb-0">
            {sections.map((s, i) => (
              <li key={s.id} className="shrink-0 lg:shrink">
                <a
                  href={`#${s.id}`}
                  className="flex items-baseline gap-2.5 whitespace-nowrap lg:whitespace-normal"
                >
                  <span className="mono-micro tabular text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9rem] text-ink-2 transition-colors hover:text-ink">
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <div className="mt-8 hidden rounded-[10px] border border-line bg-bg-elevated p-4 lg:block">
            <div>
              <span className="mono-micro text-ink-3">LAST UPDATED</span>
              <p className="mt-1 text-[0.9rem] text-ink">{updated}</p>
            </div>
            <div className="mt-4">
              <span className="mono-micro text-ink-3">QUESTIONS</span>
              <p className="mt-1 text-[0.9rem]">
                <a
                  href={`mailto:${contactEmail}`}
                  className="link-underline text-ink"
                >
                  {contactEmail}
                </a>
              </p>
            </div>
          </div>
        </nav>

        <div className="lg:col-span-8 lg:col-start-5">
          {intro && <div className="pb-8 md:pb-10">{intro}</div>}
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-28 border-t border-line py-8 md:py-10"
            >
              <div className="grid grid-cols-[3rem_1fr]">
                <span className="mono-label tabular text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-h3 text-ink">{s.title}</h2>
              </div>
              <div
                className="mt-4 grid grid-cols-[3rem_1fr]
                  [&_p]:text-[1rem] [&_p]:leading-[1.65] [&_p]:text-ink-2 [&_p]:max-w-[62ch]
                  [&_p+p]:mt-3
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-[1rem] [&_ul]:leading-[1.65] [&_ul]:text-ink-2 [&_ul]:max-w-[62ch]
                  [&_strong]:text-ink"
              >
                <span aria-hidden />
                <div>{s.body}</div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

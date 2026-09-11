import type { CaseStudy } from "@/components/home/ProofModule";
import { Tag } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CaseStudyTemplate({ cs }: { cs: CaseStudy }) {
  return (
    <article className="border-t border-line py-14 first:border-t-0 md:py-20">
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-h3 text-ink">{cs.customer}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Tag>{cs.industry}</Tag>
              <Tag>{cs.platform}</Tag>
              <Tag>{cs.catalogSize}</Tag>
            </div>
          </div>
          {cs.isDemo && (
            <Tag tone="warning" className="h-7 px-2.5">
              DEMONSTRATION / SAMPLE WORKFLOW
            </Tag>
          )}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 md:mt-12">
          {/* LEFT: definition list */}
          <div className="lg:col-span-4">
            <dl className="divide-y divide-line border-y border-line">
              <div className="py-4">
                <dt className="mono-label text-ink-3">PROBLEM</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink">{cs.problem}</dd>
              </div>
              <div className="py-4">
                <dt className="mono-label text-ink-3">TURNAROUND</dt>
                <dd className="mt-2 text-[0.95rem] text-ink">{cs.turnaround}</dd>
              </div>
              <div className="py-4">
                <dt className="mono-label text-ink-3">RESULT</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink">{cs.result}</dd>
              </div>
            </dl>
          </div>

          {/* RIGHT: workflow blocks */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="rounded-[12px] border border-line bg-bg-elevated">
              <div className="flex h-11 items-center border-b border-line px-4">
                <span className="mono-label text-ink-2">INPUT</span>
              </div>
              <ul className="p-4">
                {cs.input.map((it) => (
                  <li key={it} className="py-1.5 text-[0.9rem] text-ink">
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[12px] border border-line bg-bg-elevated">
              <div className="flex h-11 items-center border-b border-line px-4">
                <span className="mono-label text-ink-2">WORKFLOW</span>
              </div>
              <ol className="p-4">
                {cs.workflow.map((it, i) => (
                  <li key={it} className="flex items-baseline gap-3 py-1.5 text-[0.9rem] text-ink">
                    <span className="mono-micro tabular text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {it}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[12px] border border-line bg-bg-elevated">
              <div className="flex h-11 items-center border-b border-line px-4">
                <span className="mono-label text-ink-2">WHAT SCENOX HANDLED</span>
              </div>
              <ul className="p-4">
                {cs.handled.map((it) => (
                  <li key={it} className="flex items-baseline gap-3 py-1.5 text-[0.9rem] text-ink">
                    <span aria-hidden className="size-1.5 shrink-0 translate-y-[-1px] rounded-full bg-success" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            {cs.before && cs.after && (
              <div className="overflow-hidden rounded-[12px] border border-line">
                <div className="grid grid-cols-2">
                  <div className="flex h-11 items-center border-b border-r border-line bg-bg-elevated px-4">
                    <span className="mono-label text-ink-2">BEFORE</span>
                  </div>
                  <div className="flex h-11 items-center border-b border-line bg-bg-elevated px-4">
                    <span className="mono-label text-ink-2">AFTER</span>
                  </div>
                </div>
                {cs.before.map((b, i) => (
                  <div key={b} className={cn("grid grid-cols-2", i < cs.before!.length - 1 && "border-b border-line")}>
                    <div className="border-r border-line px-4 py-2.5 font-mono text-[0.8rem] text-warning">
                      {b}
                    </div>
                    <div className="px-4 py-2.5 font-mono text-[0.8rem] text-ink">{cs.after![i]}</div>
                  </div>
                ))}
              </div>
            )}

            {cs.quote && (
              <blockquote className="border-l-2 border-accent pl-5">
                <p className="text-[1.05rem] leading-relaxed text-ink">&ldquo;{cs.quote.text}&rdquo;</p>
                <cite className="mt-2 block text-[0.85rem] not-italic text-ink-3">{cs.quote.author}</cite>
              </blockquote>
            )}

            <div>
              <Button href="/get-started" variant="outline" arrow>
                Start a project like this
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

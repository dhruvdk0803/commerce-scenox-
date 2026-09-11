import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, Stagger, staggerChild } from "@/components/ui/Reveal";

export function ServiceGrid({
  heading = ["Not just uploading.", "Everything before the upload too."],
}: {
  heading?: [string, string];
}) {
  return (
    <section className="section-y border-t border-line" aria-labelledby="services-heading">
      <div className="container-x">
        <SectionHeader
          id="services-heading"
          eyebrow="WHAT WE HANDLE"
          title={
            <>
              {heading[0]}
              <br />
              <span className="text-ink-2">{heading[1]}</span>
            </>
          }
          description="Ten kinds of work, each shown as a real before and after. This is what a finished catalog is made of."
        />

        <Stagger
          as="ul"
          className="mt-12 grid overflow-hidden rounded-[12px] border border-line md:mt-16 lg:grid-cols-2"
          amount={0.08}
        >
          {services.map((s, i) => (
            <MotionItem
              key={s.id}
              variants={staggerChild}
              className={cn(
                "grid gap-4 border-b border-line bg-bg p-5 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6 md:p-6",
                "last:border-b-0 lg:[&:nth-last-child(2)]:border-b-0",
                i % 2 === 0 && "lg:border-r",
              )}
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="mono-micro tabular text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em] text-ink">{s.title}</h3>
                </div>
                <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-2 sm:pl-[calc(2ch+0.75rem)]">{s.desc}</p>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="min-w-0">
                  <p className="mono-micro text-ink-3">{s.beforeLabel ?? "BEFORE"}</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {s.before.map((b) => (
                      <li
                        key={b}
                        className={cn(
                          "truncate font-mono text-[0.75rem] leading-snug text-ink-2",
                          (b === "NULL" || b === "—") && "text-danger",
                        )}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowRight className="size-3.5 text-ink-3" strokeWidth={2} aria-hidden />
                <div className="min-w-0">
                  <p className="mono-micro text-ink-3">{s.afterLabel ?? "AFTER"}</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {s.after.map((a) => (
                      <li key={a} className="truncate font-mono text-[0.75rem] leading-snug text-ink">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </MotionItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

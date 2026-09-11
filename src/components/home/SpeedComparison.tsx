"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn, pad } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

const TICKS = [1, 48, 217, 562, 894, 1000];

export function SpeedComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(reduce ? TICKS.length - 1 : -1);

  useEffect(() => {
    if (!inView || reduce) return;
    let i = -1;
    const id = setInterval(() => {
      i += 1;
      if (i >= TICKS.length) {
        clearInterval(id);
        return;
      }
      setTick(i);
    }, 420);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const value = tick >= 0 ? TICKS[tick] : 0;
  const done = tick === TICKS.length - 1;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-bg-dark text-paper"
      aria-labelledby="speed-heading"
    >
      <div className="container-x relative section-y">
        <h2 id="speed-heading" className="sr-only">
          Manual catalog work compared with Scenox Commerce
        </h2>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          {/* MANUAL */}
          <div className="relative border-b border-line-dark pb-12 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
            <Eyebrow inverse>THE MANUAL WAY</Eyebrow>
            <p className="mt-6 text-[clamp(2.25rem,1rem+3.3vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-paper">1,000 PRODUCTS</p>
            <ul className="mt-8 flex flex-col gap-3 text-[1.05rem] text-paper-2 md:text-[1.15rem]">
              <li className="flex items-baseline gap-3">
                <span className="mono-micro mt-1 w-4 shrink-0 text-paper-2/60">—</span>
                5–15 minutes each
              </li>
              <li className="flex items-baseline gap-3">
                <ArrowRight className="mt-1 size-4 shrink-0 text-paper-2/60" strokeWidth={1.75} aria-hidden />
                repetitive manual work
              </li>
              <li className="flex items-baseline gap-3">
                <ArrowRight className="mt-1 size-4 shrink-0 text-paper-2/60" strokeWidth={1.75} aria-hidden />
                days or weeks
              </li>
            </ul>
          </div>

          {/* SCENOX */}
          <div className="relative">
            <Eyebrow inverse>SCENOX COMMERCE</Eyebrow>
            <p className="mt-6 text-[clamp(2.25rem,1rem+3.3vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-paper">1,000 PRODUCTS</p>

            <div className="mt-8 flex items-center gap-4">
              <motion.span
                aria-hidden
                className="block h-px flex-1 origin-left bg-accent"
                initial={reduce ? false : { transform: "scaleX(0)" }}
                animate={inView ? { transform: "scaleX(1)" } : {}}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
              />
              <ArrowRight className="size-5 text-accent" strokeWidth={2} aria-hidden />
            </div>

            <p className="mt-6 text-[clamp(1.75rem,0.8rem+2.4vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-paper">
              AS FAST AS 48 HOURS<span className="text-accent">*</span>
            </p>

            {/* processing counter */}
            <div className="mt-10 flex items-end justify-between border-t border-line-dark pt-6">
              <div>
                <p className="mono-micro text-paper-2">PROCESSING SIMULATION</p>
                <p
                  className={cn(
                    "mt-2 font-mono text-[3rem] font-medium leading-none tracking-[-0.03em] tabular transition-colors duration-[400ms] md:text-[4rem]",
                    done ? "text-success" : "text-paper",
                  )}
                >
                  {pad(value)}
                </p>
              </div>
              <p
                className={cn(
                  "mono-label pb-2 transition-colors duration-[400ms]",
                  done ? "text-success" : "text-paper-2",
                )}
              >
                {done ? "CATALOG READY" : tick >= 0 ? "PROCESSING" : "QUEUED"}
              </p>
            </div>
            <div aria-hidden className="relative mt-4 h-px w-full bg-white/10">
              <span
                className="absolute inset-y-0 left-0 bg-success transition-[width] duration-[400ms] ease-[var(--ease-out)]"
                style={{ width: `${(value / 1000) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-[64ch] text-[0.8rem] leading-relaxed text-paper-2/80">
          *For eligible catalogs. Turnaround varies based on catalog complexity
          and source-data quality. The counter above is a visual simulation of
          processing, not historical client volume.
        </p>
      </div>
    </section>
  );
}

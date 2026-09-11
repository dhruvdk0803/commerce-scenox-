"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";
import { MotionLi, Stagger } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Send your data",
    items: ["Excel · CSV", "Supplier data", "Catalog exports", "Images", "Supported documents"],
    note: "Any format. Any number of sources.",
  },
  {
    n: "02",
    title: "We inspect the catalog",
    items: ["Source structure", "SKU count", "Variants", "Missing data", "Images", "Target platform"],
    note: "You get a fixed quote and a realistic turnaround.",
  },
  {
    n: "03",
    title: "We build it",
    items: ["Cleanup", "Mapping", "Enrichment", "Formatting", "Validation"],
    note: "Automation for speed. Human review where it matters.",
  },
  {
    n: "04",
    title: "You go live",
    items: ["Approval", "Upload", "Publishing", "QA"],
    note: "Nothing publishes without your sign-off.",
  },
];

export function ProcessSteps({ showLink = true }: { showLink?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <section className="section-y border-t border-line" aria-labelledby="process-heading">
      <div className="container-x">
        <SectionHeader
          id="process-heading"
          eyebrow="HOW IT WORKS"
          title="From supplier file to storefront."
          description="Four steps. You are involved in the first and the last. We handle everything in between."
          action={showLink ? <TextLink href="/how-it-works">See the full process</TextLink> : undefined}
        />

        <div className="relative mt-12 md:mt-16">
          {/* connected progress line, desktop */}
          <div aria-hidden className="absolute left-0 right-0 top-[11px] hidden h-px bg-line lg:block" />
          <motion.div
            aria-hidden
            className="absolute left-0 top-[11px] hidden h-px origin-left bg-accent lg:block"
            style={{ width: "100%" }}
            initial={reduce ? false : { transform: "scaleX(0)" }}
            whileInView={{ transform: "scaleX(1)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
          />

          <Stagger as="ol" className="grid gap-10 lg:grid-cols-4 lg:gap-8" amount={0.2}>
            {STEPS.map((s, i) => (
              <MotionLi key={s.n} className="relative flex gap-5 lg:block">
                {/* vertical connector for mobile */}
                {i < STEPS.length - 1 && (
                  <span aria-hidden className="absolute left-[11px] top-7 bottom-[-2.5rem] w-px bg-line lg:hidden" />
                )}
                <span className="relative z-10 grid size-6 shrink-0 place-items-center rounded-full border border-accent bg-bg">
                  <span className="size-2 rounded-full bg-accent" />
                </span>
                <div className="lg:mt-6">
                  <span className="mono-label tabular text-ink-3">{s.n}</span>
                  <h3 className="mt-2 text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
                    {s.title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
                    {s.items.map((it) => (
                      <li key={it} className="font-mono text-[0.78rem] text-ink-2">
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-[28ch] text-[0.9rem] leading-snug text-ink-2">{s.note}</p>
                </div>
              </MotionLi>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

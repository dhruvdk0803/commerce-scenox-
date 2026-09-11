"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MotionLi, Reveal, Stagger } from "@/components/ui/Reveal";
import { CheckBox } from "@/components/ui/Status";

const RAW_ROWS = [
  "AX-442,blk office chr,furniture?,NULL",
  "KT-1180,steel bottle 750,kitchen/home,",
  "LG-77,LED desk lamp wht,lighting,see pdf",
  "GR-09,garden hose 20m,outdoor?,NULL",
  "TX-310,cotton tshirt,apparel,NULL",
  "BK-201,bkshelf 5 tier oak,furniture,NULL",
  "SP-88,speaker bt mini,electronics?,NULL",
  "MG-14,mug ceramic 350,kitchen,NULL",
  "RG-550,rug wool 5x8,home,NULL",
  "CL-07,wall clock 30cm,decor,NULL",
];

const CLEAN = [
  ["Black Ergonomic Office Chair", "Office Furniture › Chairs"],
  ["Insulated Steel Bottle 750 ml", "Kitchen › Drinkware"],
  ["White LED Desk Lamp", "Lighting › Desk Lamps"],
  ["Garden Hose 20 m", "Garden › Watering"],
  ["Cotton Crew T-Shirt", "Apparel › T-Shirts"],
  ["5-Tier Oak Bookshelf", "Furniture › Shelving"],
  ["Mini Bluetooth Speaker", "Electronics › Audio"],
  ["Ceramic Mug 350 ml", "Kitchen › Tableware"],
  ["Wool Rug 5 × 8 ft", "Home › Rugs"],
  ["Wall Clock 30 cm", "Decor › Clocks"],
];

export function SampleOffer() {
  const reduce = useReducedMotion();
  const ease = [0.23, 1, 0.32, 1] as const;

  return (
    <section
      className="relative overflow-hidden border-y border-line bg-bg-elevated"
      aria-labelledby="sample-heading"
    >
      <div className="container-x relative section-y">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>RISK-FREE START</Eyebrow>
              <p className="mt-5 text-h4 font-medium text-ink-2">
                Not sure what we&apos;ll do with your data?
              </p>
              <h2 id="sample-heading" className="mt-3 text-[clamp(2.75rem,1rem+4.2vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-ink">
                SEND US
                <br />
                10 PRODUCTS.
              </h2>
              <p className="mt-6 max-w-[42ch] text-lead text-ink-2">
                We&apos;ll show you what your catalog can look like before you
                commit to a larger project.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Button href="/sample" size="lg" arrow event="cta_click" eventParams={{ cta: "send_10_products" }}>
                  Send 10 Products
                </Button>
                <p className="text-[0.8rem] text-ink-3">Sample eligibility depends on project fit.</p>
              </div>
            </Reveal>
          </div>

          {/* 10 rows → 10 cards */}
          <div className="lg:col-span-6">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              {/* raw */}
              <Reveal className="overflow-hidden rounded-[10px] border border-line bg-bg" amount={0.2}>
                <div className="flex h-9 items-center justify-between border-b border-line px-3">
                  <span className="mono-micro text-ink-2">sample.csv</span>
                  <span className="mono-micro text-ink-3 tabular">10 ROWS</span>
                </div>
                <ol className="p-2">
                  {RAW_ROWS.map((r, i) => (
                    <li key={r} className="flex gap-2 px-1 py-[3px] font-mono text-[0.68rem] leading-tight">
                      <span className="w-[2ch] text-ink-3 tabular">{i + 1}</span>
                      <span className="truncate text-ink-2">
                        {r.split(",").map((c, ci) => (
                          <span key={ci} className={cn(c === "NULL" && "text-danger", c.endsWith("?") && "text-warning")}>
                            {c}
                            {ci < 3 && <span className="text-ink-3">,</span>}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              {/* rail */}
              <div className="flex items-center justify-center sm:flex-col sm:gap-1.5">
                <motion.span
                  aria-hidden
                  className="block h-px w-10 bg-accent sm:h-10 sm:w-px"
                  initial={reduce ? false : { transform: "scale(0)" }}
                  whileInView={{ transform: "scale(1)" }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.3, ease }}
                />
                <span className="mono-micro mx-2 text-accent sm:mx-0">PROCESS</span>
                <motion.span
                  aria-hidden
                  className="block h-px w-10 bg-accent sm:h-10 sm:w-px"
                  initial={reduce ? false : { transform: "scale(0)" }}
                  whileInView={{ transform: "scale(1)" }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.5, ease }}
                />
              </div>

              {/* clean */}
              <Stagger as="ol" className="grid gap-1.5" amount={0.2}>
                {CLEAN.map(([t, c], i) => (
                  <MotionLi
                    key={t}
                    className="flex items-center gap-2.5 rounded-[6px] border border-line bg-bg px-2.5 py-1.5"
                  >
                    <span className="mono-micro w-[2ch] shrink-0 tabular text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.72rem] font-medium leading-tight text-ink">{t}</p>
                      <p className="truncate font-mono text-[0.6rem] text-ink-3">{c}</p>
                    </div>
                    <CheckBox done size="sm" />
                  </MotionLi>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Armchair } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckBox } from "@/components/ui/Status";
import { useMarket, usePrice } from "@/components/market/MarketProvider";

const DEMO_PRICE = { in: 4999, us: 89, uk: 69, au: 129 };

const RAW: [string, string, "null" | "warn" | "ok" | "muted" | undefined][] = [
  ["SKU", "AX-442", undefined],
  ["name", "blk office chr", undefined],
  ["desc", "NULL", "null"],
  ["category", "furniture?", "warn"],
  ["image", "IMG_99283.jpg", "muted"],
  ["attributes", "—", "muted"],
  ["price", "4999", undefined],
  ["variant", "blk / blu / wht", "warn"],
];

const TABS = ["Description", "Specifications", "Variants", "SEO", "Metafields"] as const;
type TabKey = (typeof TABS)[number];

const RAIL = ["CLEAN", "MAP", "ENRICH", "VALIDATE"];

export function BeforeAfter() {
  const [tab, setTab] = useState<TabKey>("Description");
  const reduce = useReducedMotion();
  const price = usePrice();
  const market = useMarket();

  return (
    <section className="section-y border-t border-line" aria-labelledby="ba-heading">
      <div className="container-x">
        <SectionHeader
          id="ba-heading"
          eyebrow="INPUT → OUTPUT"
          title="One row in. One product page out."
          description="The same record, before and after. Use the tabs to see every field a finished product carries."
        />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[5fr_auto_7fr] lg:items-stretch lg:gap-0 md:mt-16">
          {/* WHAT YOU SEND */}
          <Reveal className="flex flex-col rounded-[12px] border border-line bg-bg-elevated lg:rounded-r-none">
            <div className="flex h-11 items-center justify-between border-b border-line px-4">
              <span className="mono-label text-ink-2">WHAT YOU SEND</span>
              <span className="mono-micro text-ink-3">ROW 0412</span>
            </div>
            <dl className="flex-1 divide-y divide-line">
              {RAW.map(([k, raw, tone]) => {
                const v = k === "price" ? String(DEMO_PRICE[market.id]) : raw;
                return (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] items-baseline px-4 py-3">
                  <dt className="mono-micro text-ink-3">{k}</dt>
                  <dd
                    className={cn(
                      "font-mono text-[0.85rem]",
                      tone === "null" && "text-danger",
                      tone === "warn" && "text-warning",
                      tone === "muted" && "text-ink-3",
                      !tone && "text-ink",
                    )}
                  >
                    {v}
                  </dd>
                </div>
                );
              })}
            </dl>
            <div className="border-t border-line px-4 py-3">
              <span className="mono-micro text-danger">3 FIELDS INVALID · 2 MISSING</span>
            </div>
          </Reveal>

          {/* RAIL */}
          <div className="relative flex items-center justify-center lg:w-[8.5rem]">
            <div
              aria-hidden
              className="absolute inset-x-0 top-1/2 hidden h-px bg-line lg:block"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-1/2 w-px bg-line lg:hidden"
            />
            <motion.ol
              className="relative flex gap-2 bg-bg px-2 py-2 max-sm:gap-1.5 max-sm:px-1 lg:flex-col lg:gap-3 lg:px-0 lg:py-0"
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
            >
              {RAIL.map((r, i) => (
                <motion.li
                  key={r}
                  variants={{
                    hidden: { opacity: 0.35, transform: "translateY(4px)" },
                    show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
                  }}
                  className="relative mx-auto flex items-center gap-2 rounded-[6px] border border-line bg-bg-elevated px-2.5 py-1.5 max-sm:gap-1.5 max-sm:px-2 lg:w-[7rem] lg:justify-between"
                >
                  <span className="mono-micro text-ink">{r}</span>
                  <span
                    aria-hidden
                    className={cn("size-1.5 rounded-full", i === RAIL.length - 1 ? "bg-success" : "bg-accent")}
                  />
                </motion.li>
              ))}
            </motion.ol>
          </div>

          {/* WHAT GOES LIVE */}
          <Reveal delay={0.12} className="flex flex-col overflow-hidden rounded-[12px] border border-line bg-bg-elevated lg:rounded-l-none">
            <div className="flex h-11 items-center justify-between border-b border-line px-4">
              <span className="mono-label text-ink-2">WHAT GOES LIVE</span>
              <span className="mono-micro flex items-center gap-1.5 text-success">
                <span className="size-1.5 rounded-full bg-success" />
                PUBLISHED
              </span>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-[9rem_1fr] md:p-6">
              {/* image */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-[8px] border border-line bg-bg-muted p-3 max-sm:h-36 sm:aspect-square">
                <span className="mono-micro text-ink-3">IMAGE 1 / 4</span>
                {/* stand-in for the product photo: a simple line icon, not a fake image */}
                <Armchair aria-hidden className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-ink-3/70" strokeWidth={1.25} />
                <div className="relative">
                  <p className="truncate font-mono text-[0.75rem] text-ink">ax-442-black-01.jpg</p>
                  <p className="mono-micro mt-1 text-success">2048 × 2048 · MATCHED</p>
                </div>
              </div>

              {/* details */}
              <div className="min-w-0">
                <p className="mono-micro text-ink-3">
                  Office Furniture <span className="mx-1">→</span> Chairs{" "}
                  <span className="mx-1">→</span> Ergonomic Chairs
                </p>
                <h3 className="mt-2 text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
                  Premium Black Ergonomic Office Chair
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="mono-micro text-ink-3">SKU AX-442</span>
                  <span className="text-[0.95rem] font-medium text-ink tabular">{price(DEMO_PRICE)}</span>
                  <span className="mono-micro text-success">IN STOCK</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Black", "Blue", "White"].map((c, i) => (
                    <span
                      key={c}
                      className={cn(
                        "rounded-[5px] border px-2 py-1 text-[0.75rem]",
                        i === 0 ? "border-ink bg-ink text-paper" : "border-line text-ink-2",
                      )}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* tabs */}
            <div className="mt-auto border-t border-line">
              <div role="tablist" aria-label="Product data" className="flex overflow-x-auto scrollbar-none border-b border-line">
                {TABS.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    type="button"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "relative shrink-0 px-4 py-3 text-[0.85rem] font-medium tracking-[-0.01em] transition-colors duration-[160ms]",
                      tab === t ? "text-ink" : "text-ink-3 hover:text-ink-2",
                    )}
                  >
                    {t}
                    {tab === t && (
                      <motion.span
                        layoutId="ba-tab"
                        className="absolute inset-x-3 -bottom-px h-px bg-ink"
                        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="min-h-[9.5rem] p-5 md:p-6" role="tabpanel">
                <TabContent tab={tab} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TabContent({ tab }: { tab: TabKey }) {
  const reduce = useReducedMotion();
  const wrap = (children: React.ReactNode) => (
    <motion.div
      key={tab}
      initial={reduce ? false : { opacity: 0, transform: "translateY(4px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );

  switch (tab) {
    case "Description":
      return wrap(
        <p className="max-w-[56ch] text-[0.95rem] leading-relaxed text-ink-2">
          Built for long working days. Adjustable lumbar support, a breathable
          mesh back and a 120 kg rated five-star base. Height, tilt and
          armrests adjust independently so the chair fits the desk, not the
          other way around.
        </p>,
      );
    case "Specifications":
      return wrap(
        <dl className="grid gap-x-8 gap-y-2 text-[0.9rem] sm:grid-cols-2">
          {[
            ["Material", "Mesh · Nylon"],
            ["Weight capacity", "120 kg"],
            ["Seat height", "44–54 cm"],
            ["Warranty", "5 years"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-line py-1.5">
              <dt className="text-ink-3">{k}</dt>
              <dd className="font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>,
      );
    case "Variants":
      return wrap(
        <div className="grid gap-4 text-[0.9rem] sm:grid-cols-2">
          <div>
            <p className="mono-micro text-ink-3">COLOR</p>
            <p className="mt-1.5 text-ink">Black · Blue · White</p>
          </div>
          <div>
            <p className="mono-micro text-ink-3">SIZE</p>
            <p className="mt-1.5 text-ink">S · M · L</p>
          </div>
          <p className="mono-micro text-success sm:col-span-2">9 VARIANTS · 9 SKUS · 9 PRICES MAPPED</p>
        </div>,
      );
    case "SEO":
      return wrap(
        <div className="text-[0.9rem]">
          <p className="font-medium text-ink">Black Ergonomic Office Chair | Adjustable Mesh Desk Chair</p>
          <p className="mt-1 font-mono text-[0.8rem] text-success">/products/black-ergonomic-office-chair</p>
          <p className="mt-2 max-w-[60ch] text-ink-2">
            Ergonomic mesh office chair with adjustable lumbar support and a 120 kg rated base. Available in black, blue and white.
          </p>
        </div>,
      );
    case "Metafields":
      return wrap(
        <ul className="grid gap-1.5 font-mono text-[0.8rem] sm:grid-cols-2">
          {[
            ["specs.weight_capacity", "120 kg"],
            ["specs.material", "Mesh"],
            ["specs.warranty_years", "5"],
            ["logistics.assembly_required", "true"],
          ].map(([k, v]) => (
            <li key={k} className="flex items-center gap-2">
              <CheckBox done size="sm" />
              <span className="text-ink-3">{k}</span>
              <span className="text-ink">{v}</span>
            </li>
          ))}
        </ul>,
      );
  }
}

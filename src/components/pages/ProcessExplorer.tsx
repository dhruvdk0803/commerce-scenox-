"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Status, type StatusKind } from "@/components/ui/Status";

type Stage = {
  id: string;
  label: string;
  mode: "AUTOMATED" | "AUTOMATED + REVIEW" | "HUMAN" | "YOU";
  summary: string;
  detail: string[];
  inp: string;
  out: string;
  status: StatusKind;
};

const STAGES: Stage[] = [
  {
    id: "input",
    label: "INPUT",
    mode: "YOU",
    summary: "You send whatever you have.",
    detail: ["Excel, CSV, PDFs, ERP exports, image folders, store exports.", "Multiple sources are normal. We consolidate them.", "No formatting or template required."],
    inp: "supplier_catalog.xlsx · pricing.csv · images.zip",
    out: "Job created",
    status: "queued",
  },
  {
    id: "ingest",
    label: "INGEST",
    mode: "AUTOMATED",
    summary: "Every source is parsed into one working dataset.",
    detail: ["Sheets, columns and encodings are detected.", "Rows are keyed by SKU across files.", "Images are indexed by filename and folder."],
    inp: "4 files · 3 formats",
    out: "4,832 rows · 1,247 images · 1 dataset",
    status: "processing",
  },
  {
    id: "normalize",
    label: "NORMALIZE",
    mode: "AUTOMATED + REVIEW",
    summary: "Inconsistent values become canonical values.",
    detail: ["Titles, colours, sizes and units standardized.", "Duplicate SKUs merged into variants.", "Categories mapped to one taxonomy."],
    inp: "blk / Blk / BLACK / black",
    out: "Black",
    status: "processing",
  },
  {
    id: "enrich",
    label: "ENRICH",
    mode: "AUTOMATED + REVIEW",
    summary: "Missing fields are prepared from what exists.",
    detail: ["Descriptions written from specifications and category context.", "SEO titles, handles and meta descriptions generated per product.", "Specifications structured into typed metafields."],
    inp: "desc: NULL",
    out: "84-word description · SEO fields · 6 metafields",
    status: "processing",
  },
  {
    id: "validate",
    label: "VALIDATE",
    mode: "AUTOMATED",
    summary: "Every product is checked against platform rules.",
    detail: ["Required fields, option limits, image formats, price and inventory integrity.", "Unresolved rows are flagged, never silently dropped.", "A validation report is produced."],
    inp: "4,832 rows",
    out: "4,790 valid · 42 flagged for review",
    status: "validating",
  },
  {
    id: "approval",
    label: "APPROVAL",
    mode: "YOU",
    summary: "You review a sample and sign off.",
    detail: ["A representative set of products is shared for review.", "Category tree and naming conventions are confirmed.", "Flagged rows are resolved with you."],
    inp: "Review set · 25 products",
    out: "Approved",
    status: "ready",
  },
  {
    id: "publish",
    label: "PUBLISH",
    mode: "AUTOMATED",
    summary: "The catalog goes live in controlled batches.",
    detail: ["Formatted for Shopify, WooCommerce, Magento, BigCommerce or your custom import.", "Published via import or scoped access, in batches for large catalogs.", "Draft or live state, as agreed."],
    inp: "4,790 products",
    out: "4,790 published",
    status: "published",
  },
  {
    id: "qa",
    label: "QA",
    mode: "HUMAN",
    summary: "Live products are checked on the store.",
    detail: ["Spot-checks on the storefront: titles, images, variants, prices.", "Broken links, missing images and mis-mapped categories fixed.", "A completion report is delivered."],
    inp: "Live store",
    out: "Catalog ready",
    status: "ready",
  },
];

export function ProcessExplorer() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 3600);
    return () => clearInterval(id);
  }, [auto, inView, reduce]);

  const stage = STAGES[active];

  return (
    <div ref={ref} className="grid gap-4 overflow-hidden rounded-[14px] border border-line bg-bg-elevated lg:grid-cols-[17rem_1fr] lg:gap-0">
      {/* stage list */}
      <ol className="flex overflow-x-auto scrollbar-none border-b border-line lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r" role="tablist" aria-label="Process stages">
        {STAGES.map((s, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <li key={s.id} className="shrink-0 lg:shrink">
              <button
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className={cn(
                  "relative flex h-12 w-full items-center gap-3 px-4 text-left transition-colors duration-[160ms] lg:h-[3.25rem] lg:border-b lg:border-line",
                  on ? "bg-bg" : "hover:bg-bg/60",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-[7px] rounded-full border transition-colors duration-[280ms]",
                    on ? "border-accent bg-accent" : done ? "border-accent bg-accent/40" : "border-line-strong",
                  )}
                />
                <span className={cn("mono-label", on ? "text-ink" : "text-ink-3")}>{s.label}</span>
                <span className="mono-micro ml-auto hidden text-ink-3 tabular lg:inline">{String(i + 1).padStart(2, "0")}</span>
                {on && (
                  <motion.span
                    layoutId="pe-indicator"
                    className="absolute inset-x-0 bottom-0 h-px bg-accent lg:inset-y-0 lg:left-0 lg:h-auto lg:w-px"
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* detail */}
      <div className="relative min-h-[22rem] p-6 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(6px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-4px)" }}
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="mono-label text-ink-3">
                <span className="text-ink tabular">{String(active + 1).padStart(2, "0")}</span> / {String(STAGES.length).padStart(2, "0")} · {stage.label}
              </span>
              <span
                className={cn(
                  "mono-micro rounded-[4px] border px-2 py-1.5",
                  stage.mode === "YOU"
                    ? "border-ink/20 bg-bg-muted text-ink"
                    : stage.mode === "HUMAN"
                      ? "border-success/30 bg-success-soft text-success"
                      : "border-accent/30 bg-accent-soft text-accent-hover",
                )}
              >
                {stage.mode}
              </span>
            </div>
            <h2 className="mt-4 text-h3 text-ink">{stage.summary}</h2>
            <ul className="mt-5 flex flex-col gap-2">
              {stage.detail.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-ink-3" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] border border-line bg-bg p-3.5">
                <p className="mono-micro text-ink-3">IN</p>
                <p className="mt-2 font-mono text-[0.8rem] leading-snug text-ink-2">{stage.inp}</p>
              </div>
              <div className="rounded-[8px] border border-line bg-bg p-3.5">
                <div className="flex items-center justify-between">
                  <p className="mono-micro text-ink-3">OUT</p>
                  <Status kind={stage.status} />
                </div>
                <p className="mt-2 font-mono text-[0.8rem] leading-snug text-ink">{stage.out}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* auto-advance indicator */}
        <div className="absolute bottom-4 right-6 hidden items-center gap-2 lg:flex">
          <span className="mono-micro text-ink-3">{auto ? "AUTO" : "MANUAL"}</span>
          <span aria-hidden className={cn("size-1.5 rounded-full", auto ? "bg-accent anim-pulse-dot" : "bg-ink-3")} />
        </div>
      </div>
    </div>
  );
}

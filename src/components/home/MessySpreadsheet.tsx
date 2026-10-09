"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Swap } from "./pipeline/Swap";

type Cell = { v: string; tone?: "null" | "warn" | "muted" | "ok" | "strike" };
type Row = { messy: Cell[]; clean: Cell[]; merged?: boolean };

const COLS = ["SKU", "NAME", "CATEGORY", "DESCRIPTION", "IMAGE", "VARIANT"];
// column visibility by breakpoint
const COL_CLASS = ["", "", "", "hidden md:table-cell", "hidden lg:table-cell", "hidden sm:table-cell"];

const ROWS: Row[] = [
  {
    messy: [
      { v: "AX-442" },
      { v: "blk office chr" },
      { v: "furniture?", tone: "warn" },
      { v: "NULL", tone: "null" },
      { v: "IMG_99283.jpg", tone: "muted" },
      { v: "—", tone: "muted" },
    ],
    clean: [
      { v: "AX-442" },
      { v: "Black Ergonomic Office Chair" },
      { v: "Office Furniture › Chairs" },
      { v: "84 words", tone: "ok" },
      { v: "ax-442-black-01.jpg" },
      { v: "Color: Black" },
    ],
  },
  {
    messy: [
      { v: "ax-442-blu" },
      { v: "Blk office chr BLUE" },
      { v: "Furniture" },
      { v: "NULL", tone: "null" },
      { v: "—", tone: "null" },
      { v: "blue", tone: "muted" },
    ],
    clean: [
      { v: "AX-442", tone: "muted" },
      { v: "↳ variant", tone: "muted" },
      { v: "Office Furniture › Chairs", tone: "muted" },
      { v: "inherited", tone: "muted" },
      { v: "ax-442-blue-01.jpg" },
      { v: "Color: Blue" },
    ],
  },
  {
    messy: [
      { v: "KT-1180" },
      { v: "steel bottle 750" },
      { v: "kitchen/home", tone: "warn" },
      { v: "750ml, steel" },
      { v: "DSC0041 (2).JPG", tone: "muted" },
      { v: "750", tone: "muted" },
    ],
    clean: [
      { v: "KT-1180" },
      { v: "Insulated Steel Bottle 750 ml" },
      { v: "Home › Kitchen › Drinkware" },
      { v: "62 words", tone: "ok" },
      { v: "kt-1180-01.jpg" },
      { v: "Size: 750 ml" },
    ],
  },
  {
    messy: [
      { v: "KT-1180" },
      { v: "Steel Bottle 750ml" },
      { v: "homeware", tone: "warn" },
      { v: "NULL", tone: "null" },
      { v: "DSC0041.JPG", tone: "muted" },
      { v: "—", tone: "muted" },
    ],
    clean: [
      { v: "KT-1180", tone: "strike" },
      { v: "duplicate · merged", tone: "strike" },
      { v: "", tone: "strike" },
      { v: "", tone: "strike" },
      { v: "", tone: "strike" },
      { v: "", tone: "strike" },
    ],
    merged: true,
  },
  {
    messy: [
      { v: "LG-77" },
      { v: "LED desk lamp wht" },
      { v: "lighting" },
      { v: "see pdf", tone: "warn" },
      { v: "lamp_final_v2.png", tone: "muted" },
      { v: "—", tone: "muted" },
    ],
    clean: [
      { v: "LG-77" },
      { v: "White LED Desk Lamp" },
      { v: "Home › Lighting › Desk Lamps" },
      { v: "71 words", tone: "ok" },
      { v: "lg-77-white-01.jpg" },
      { v: "Color: White" },
    ],
  },
  {
    messy: [
      { v: "GR-09" },
      { v: "garden hose 20m" },
      { v: "outdoor?", tone: "warn" },
      { v: "NULL", tone: "null" },
      { v: "IMG_20211.jpg", tone: "muted" },
      { v: "20m", tone: "muted" },
    ],
    clean: [
      { v: "GR-09" },
      { v: "Garden Hose 20 m" },
      { v: "Outdoor › Garden › Watering" },
      { v: "58 words", tone: "ok" },
      { v: "gr-09-01.jpg" },
      { v: "Length: 20 m" },
    ],
  },
  {
    messy: [
      { v: "TX-310" },
      { v: "cotton tshirt" },
      { v: "apparel" },
      { v: "NULL", tone: "null" },
      { v: "tee.jpg", tone: "muted" },
      { v: "S,M,L,XL", tone: "muted" },
    ],
    clean: [
      { v: "TX-310" },
      { v: "Cotton Crew T-Shirt" },
      { v: "Apparel › Tops › T-Shirts" },
      { v: "66 words", tone: "ok" },
      { v: "tx-310-01.jpg" },
      { v: "Size: S · M · L · XL" },
    ],
  },
  {
    messy: [
      { v: "TX-310-M" },
      { v: "cotton tshirt M" },
      { v: "Apparel" },
      { v: "NULL", tone: "null" },
      { v: "—", tone: "null" },
      { v: "M", tone: "muted" },
    ],
    clean: [
      { v: "TX-310", tone: "strike" },
      { v: "duplicate · merged", tone: "strike" },
      { v: "", tone: "strike" },
      { v: "", tone: "strike" },
      { v: "", tone: "strike" },
      { v: "", tone: "strike" },
    ],
    merged: true,
  },
];

const ISSUES = [
  { n: 46, label: "missing descriptions", tone: "warning" as const },
  { n: 128, label: "inconsistent categories", tone: "warning" as const },
  { n: 73, label: "unmatched images", tone: "warning" as const },
  { n: 19, label: "duplicate SKUs", tone: "danger" as const },
  { n: 41, label: "broken variants", tone: "danger" as const },
  { n: 12, label: "missing prices", tone: "danger" as const },
];

function toneClass(t?: Cell["tone"], clean?: boolean) {
  switch (t) {
    case "null":
      return "text-danger";
    case "warn":
      return "text-warning";
    case "muted":
      return "text-ink-3";
    case "ok":
      return "text-success";
    case "strike":
      return "text-ink-3 line-through decoration-ink-3/60";
    default:
      return clean ? "text-ink" : "text-ink-2";
  }
}

export function MessySpreadsheet() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // quantized so the table re-renders at most ~24 times across the scroll range
  const [progress, setProgress] = useState(reduce ? 1 : 0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 62%", "end 78%"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const q = Math.round(v * 24) / 24;
    setProgress((p) => (p === q ? p : q));
  });

  // rows clean sequentially across the middle 70% of progress
  const cleanedCount = Math.min(
    ROWS.length,
    Math.floor(Math.max(0, progress - 0.1) / 0.7 * (ROWS.length + 1)),
  );
  const done = cleanedCount >= ROWS.length;
  const issueFactor = Math.max(0, 1 - Math.max(0, progress - 0.15) / 0.65);

  return (
    <section className="section-y" aria-labelledby="problem-heading">
      <div className="container-x">
        <SectionHeader
          id="problem-heading"
          eyebrow="THE PROBLEM"
          title={
            <>
              Your supplier sent you 4,000 products.
              <br className="hidden sm:block" /> Now someone has to upload them.
            </>
          }
          description="Your team shouldn't spend days copying information between spreadsheets, supplier catalogs and ecommerce admin panels."
        />

        {/* scroll-driven transformation: tall wrapper, sticky sheet on lg */}
        <div ref={wrapRef} className="relative mt-12 md:mt-16 lg:h-[135vh]">
          <div className="lg:sticky lg:top-[12vh]">
            <div className="overflow-hidden rounded-[12px] border border-line bg-bg-elevated">
              {/* title bar */}
              <div className="flex h-11 items-center justify-between border-b border-line px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="mono-micro grid h-5 w-9 shrink-0 place-items-center rounded-[4px] border border-line bg-bg-muted text-ink-2">
                    XLSX
                  </span>
                  <span className="truncate font-mono text-[0.8rem] text-ink">
                    <Swap id={done ? "clean" : "messy"} y={4}>
                      {done ? "catalog.structured.csv" : "product-data-final-v7.xlsx"}
                    </Swap>
                  </span>
                </div>
                <div className="mono-micro flex shrink-0 items-center gap-4 pl-3 text-ink-3 tabular">
                  <span className="hidden sm:inline">4,000 ROWS</span>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 transition-colors duration-[400ms]",
                      done ? "text-success" : cleanedCount > 0 ? "text-accent" : "text-ink-3",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        done ? "bg-success" : cleanedCount > 0 ? "bg-accent anim-pulse-dot" : "bg-ink-3",
                      )}
                    />
                    {done ? "VALIDATED" : cleanedCount > 0 ? "NORMALIZING" : "UNPROCESSED"}
                  </span>
                </div>
              </div>

              {/* progress hairline */}
              <div className="relative h-px w-full bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: `${Math.round((cleanedCount / ROWS.length) * 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* table */}
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="border-b border-line bg-bg">
                    <th className="w-10 py-2.5 pl-4 text-left">
                      <span className="mono-micro text-ink-3">#</span>
                    </th>
                    {COLS.map((c, i) => (
                      <th
                        key={c}
                        className={cn(
                          "py-2.5 pr-3 text-left",
                          COL_CLASS[i],
                          i === 0 && "w-[6.5rem] sm:w-[7.5rem]",
                          i === 5 && "w-[8rem] lg:w-[9.5rem]",
                          i === 3 && "w-[6.5rem]",
                          i === 4 && "w-[11rem]",
                        )}
                      >
                        <span className="mono-micro text-ink-3">{c}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, ri) => {
                    const isClean = ri < cleanedCount;
                    const cells = isClean ? row.clean : row.messy;
                    return (
                      <tr
                        key={ri}
                        className={cn(
                          "border-b border-line transition-colors duration-[400ms] last:border-b-0",
                          isClean && row.merged && "bg-bg-muted/50",
                        )}
                      >
                        <td className="py-2.5 pl-4 align-top">
                          <span className="mono-micro tabular text-ink-3">
                            {String(ri + 1).padStart(2, "0")}
                          </span>
                        </td>
                        {cells.map((cell, ci) => (
                          <td
                            key={ci}
                            className={cn(
                              "py-2.5 pr-3 align-top font-mono text-[0.78rem] leading-tight",
                              COL_CLASS[ci],
                            )}
                          >
                            <span className={cn("block truncate", toneClass(cell.tone, isClean))}>
                              <Swap id={isClean ? "c" : "m"} y={4} plain className="max-w-full">
                                <span className="block truncate">{cell.v || " "}</span>
                              </Swap>
                            </span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* issue strip */}
              <div className="flex flex-wrap items-center gap-1.5 border-t border-line bg-bg px-4 py-3">
                {ISSUES.map((iss) => {
                  const n = Math.round(iss.n * issueFactor);
                  const resolved = n === 0;
                  return (
                    <Tag
                      key={iss.label}
                      tone={resolved ? "success" : iss.tone}
                      className="transition-[color,border-color,background-color] duration-[400ms]"
                    >
                      <span className="w-[3ch] text-right">{n}</span> {iss.label}
                    </Tag>
                  );
                })}
                <span className="mono-micro ml-auto hidden text-ink-3 md:inline">
                  {done ? "0 ISSUES · READY TO PUBLISH" : "6 ISSUE TYPES DETECTED"}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="text-h3 text-ink">That&apos;s where we come in.</p>
              <p className="mono-micro hidden text-ink-3 lg:block">KEEP SCROLLING · ROWS NORMALIZE IN PLACE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

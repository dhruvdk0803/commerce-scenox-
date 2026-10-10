"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { img, type ImgKey } from "@/lib/images";
import { cn, pad } from "@/lib/utils";
import { Status } from "@/components/ui/Status";
import { useCounter, useTimeline } from "./useTimeline";
import { Swap } from "./Swap";

/* ------------------------------------------------------------------ */
/* data                                                                 */
/* ------------------------------------------------------------------ */

type Row = {
  sku: string;
  title: [string, string];
  category: [string, string];
  image: [string, string];
  photo: ImgKey;
};

const ROWS: Row[] = [
  { sku: "AX-442", title: ["blk office chr", "Black Ergonomic Office Chair"], category: ["furniture?", "Office › Chairs"], image: ["IMG_99283.jpg", "ax-442-01.jpg"], photo: "chair" },
  { sku: "KT-1180", title: ["steel bottle 750", "Insulated Steel Bottle 750 ml"], category: ["kitchen/home", "Kitchen › Drinkware"], image: ["—", "kt-1180-01.jpg"], photo: "bottle" },
  { sku: "LG-77", title: ["LED desk lamp wht", "White LED Desk Lamp"], category: ["lighting", "Lighting › Desk Lamps"], image: ["lamp_v2 (1).png", "lg-77-01.jpg"], photo: "lamp" },
  { sku: "TX-310", title: ["cotton tshirt S,M,L", "Cotton Crew T-Shirt · 4 sizes"], category: ["apparel", "Apparel › T-Shirts"], image: ["tee.jpg", "tx-310-01.jpg"], photo: "tshirt" },
  { sku: "GR-09", title: ["garden hose 20m", "Garden Hose 20 m"], category: ["outdoor?", "Garden › Watering"], image: ["IMG_20211.jpg", "gr-09-01.jpg"], photo: "hose" },
  { sku: "SP-88", title: ["speaker bt mini", "Mini Bluetooth Speaker"], category: ["electronics?", "Electronics › Audio"], image: ["NULL", "sp-88-01.jpg"], photo: "speaker" },
];

const STAGES = ["INGEST", "NORMALIZE", "ENRICH", "VALIDATE", "PUBLISH"] as const;

// step 0 idle · steps 1..6 row i-1 processes · step 7 published hold
const DURATIONS = [1600, 950, 950, 950, 950, 950, 950, 3200];
const STAGE_AT = [-1, 0, 1, 1, 2, 2, 3, 4]; // active stage per step
const TOTAL_MS = DURATIONS.slice(1, 7).reduce((a, b) => a + b, 0);

function tone(v: string) {
  if (v === "NULL" || v === "—") return "text-danger";
  if (v.endsWith("?") || v.includes("/")) return "text-warning";
  return "text-ink-2";
}

/* ------------------------------------------------------------------ */

export function CatalogPipeline({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const durations = useMemo(() => DURATIONS, []);
  const step = useTimeline(durations, { ref });

  const published = step === 7;
  const processing = step >= 1 && step <= 6;
  const activeRow = processing ? step - 1 : -1;
  const doneRows = published ? ROWS.length : Math.max(0, step - 1);
  const stage = STAGE_AT[step];
  const count = useCounter(1000, step >= 1, TOTAL_MS + 300);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Animated demonstration of a supplier spreadsheet being cleaned row by row into store-ready products"
      className={cn(
        "select-none overflow-hidden rounded-[12px] border border-line bg-bg-elevated text-ink",
        className,
      )}
    >
      {/* title bar */}
      <div className="flex h-11 items-center justify-between gap-3 border-b border-line px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="mono-micro grid h-5 w-9 shrink-0 place-items-center rounded-[4px] border border-line bg-bg-muted text-ink-2">
            XLSX
          </span>
          <span className="truncate font-mono text-[0.8rem] text-ink">
            <Swap id={published ? "out" : "in"} y={4}>
              {published ? "catalog.store-ready.csv" : "supplier_catalog.xlsx"}
            </Swap>
          </span>
          <span className="mono-micro hidden shrink-0 text-ink-3 tabular sm:inline">1,000 ROWS</span>
        </div>
        <Status kind={published ? "published" : processing ? "processing" : "queued"} />
      </div>

      {/* ledger */}
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-line">
            <th className="w-9 py-2 pl-4 text-left"><span className="mono-micro text-ink-3">#</span></th>
            <th className="hidden w-[5.5rem] py-2 pr-3 text-left sm:table-cell"><span className="mono-micro text-ink-3">SKU</span></th>
            <th className="py-2 pr-3 text-left"><span className="mono-micro text-ink-3">TITLE</span></th>
            <th className="hidden w-[11.5rem] py-2 pr-3 text-left md:table-cell"><span className="mono-micro text-ink-3">CATEGORY</span></th>
            <th className="hidden w-[8.5rem] py-2 pr-3 text-left lg:table-cell"><span className="mono-micro text-ink-3">IMAGE</span></th>
            <th className="w-[6.5rem] py-2 pr-4 text-right"><span className="mono-micro text-ink-3">STATUS</span></th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => {
            const clean = i < doneRows;
            const active = i === activeRow;
            const k = clean ? 1 : 0;
            return (
              <tr
                key={r.sku}
                className={cn(
                  "relative border-b border-line transition-colors duration-[280ms] last:border-b-0",
                  active && "bg-accent-soft",
                )}
              >
                <td className="py-[7px] pl-4 align-middle">
                  <span className="relative block">
                    {active && (
                      <span aria-hidden className="absolute -left-4 top-1/2 h-[18px] w-[2px] -translate-y-1/2 bg-accent" />
                    )}
                    <span className="mono-micro tabular text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                </td>
                <td className="hidden py-[7px] pr-3 align-middle sm:table-cell">
                  <span className="font-mono text-[0.78rem] text-ink">{r.sku}</span>
                </td>
                <td className="py-[7px] pr-3 align-middle">
                  <span className="flex min-w-0 items-center gap-2.5">
                    {/* the photo arrives with the clean row; before that, an empty slot */}
                    <span className="relative size-[30px] shrink-0 overflow-hidden rounded-[6px] border border-line bg-bg-muted">
                      <Image
                        src={img[r.photo]}
                        alt=""
                        sizes="30px"
                        className={cn(
                          "size-full object-cover transition-[opacity,transform] duration-[420ms] ease-[var(--ease-out)]",
                          clean ? "scale-100 opacity-100" : "scale-90 opacity-0",
                        )}
                      />
                    </span>
                    <span className="block min-w-0 truncate font-mono text-[0.78rem]">
                      <Swap id={k} y={4} className="max-w-full">
                        <span className={cn("block truncate", clean ? "text-ink" : "text-ink-2")}>{r.title[k]}</span>
                      </Swap>
                    </span>
                  </span>
                </td>
                <td className="hidden py-[7px] pr-3 align-middle md:table-cell">
                  <span className="block truncate font-mono text-[0.78rem]">
                    <Swap id={k} y={4} className="max-w-full">
                      <span className={cn("block truncate", clean ? "text-ink" : tone(r.category[0]))}>{r.category[k]}</span>
                    </Swap>
                  </span>
                </td>
                <td className="hidden py-[7px] pr-3 align-middle lg:table-cell">
                  <span className="block truncate font-mono text-[0.78rem]">
                    <Swap id={k} y={4} className="max-w-full">
                      <span className={cn("block truncate", clean ? "text-ink" : tone(r.image[0]))}>{r.image[k]}</span>
                    </Swap>
                  </span>
                </td>
                <td className="py-[7px] pr-4 text-right align-middle">
                  <Status kind={clean ? "ready" : active ? "processing" : "queued"} className="justify-end" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* stage rail + counter */}
      <div className="flex flex-col gap-3 border-t border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <ol className="flex items-center gap-2 sm:gap-3" aria-label="Processing stages">
          {STAGES.map((s, i) => {
            const state = published || i < stage ? "done" : i === stage ? "active" : "idle";
            return (
              <li key={s} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={cn(
                    "mono-micro transition-colors duration-[280ms]",
                    state === "idle" ? "text-ink-3" : state === "active" ? "text-accent" : "text-ink",
                  )}
                >
                  {s}
                </span>
                {i < STAGES.length - 1 && (
                  <span aria-hidden className="relative h-px w-3 overflow-hidden bg-line sm:w-5">
                    <motion.span
                      className="absolute inset-0 origin-left bg-ink"
                      initial={false}
                      animate={{ transform: `scaleX(${published || i < stage ? 1 : 0})` }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <p className="flex items-baseline gap-2">
          <span
            className={cn(
              "font-mono text-[1.05rem] font-medium leading-none tracking-[-0.02em] tabular transition-colors duration-[400ms]",
              published ? "text-success" : "text-ink",
            )}
          >
            {pad(count)}
            <span className="text-ink-3"> / 1000</span>
          </span>
          <span className={cn("mono-micro transition-colors duration-[400ms]", published ? "text-success" : "text-ink-3")}>
            {published ? "CATALOG READY" : processing ? "PROCESSING" : "QUEUED"}
          </span>
        </p>
      </div>
    </div>
  );
}

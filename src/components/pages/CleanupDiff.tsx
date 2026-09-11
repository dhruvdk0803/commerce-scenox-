import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Row = {
  field: string;
  before: string;
  after: string;
  tone?: "danger" | "warning";
};

const ROWS: Row[] = [
  { field: "TITLE", before: "blk chair ergo BLACK", after: "Black Ergonomic Office Chair", tone: "warning" },
  { field: "DESCRIPTION", before: "(empty)", after: "84-word description", tone: "danger" },
  { field: "CATEGORY", before: "Furniture / furniture / FURNITURE", after: "Office Furniture › Chairs › Ergonomic", tone: "warning" },
  { field: "TAGS", before: "chair, chairs, Chair, office-chair", after: "office-chair · ergonomic · mesh", tone: "warning" },
  { field: "IMAGE", before: "IMG_2231.jpg · 4000×3000 · 8.2 MB", after: "ax-442-black-01.jpg · 2048×2048 · 240 KB", tone: "warning" },
  { field: "VARIANTS", before: "3 separate products", after: "1 product · 9 variants", tone: "warning" },
  { field: "SEO", before: "/products/copy-of-copy-of-chair-1", after: "/products/black-ergonomic-office-chair", tone: "warning" },
  { field: "METAFIELDS", before: "—", after: "specs.weight_capacity · specs.material · specs.warranty", tone: "danger" },
];

/** One record, three columns: field · as it is today · after cleanup. */
export function CleanupDiff() {
  return (
    <Reveal className="overflow-hidden rounded-[12px] border border-line bg-bg-elevated" amount={0.1}>
      {/* header */}
      <div className="grid grid-cols-[1fr_1fr] border-b border-line md:grid-cols-[8rem_1fr_2.5rem_1fr]">
        <div className="hidden h-11 items-center px-4 md:flex">
          <span className="mono-label text-ink-2">FIELD</span>
        </div>
        <div className="flex h-11 items-center justify-between border-r border-line px-4 md:border-r-0">
          <span className="mono-label text-ink-2">CURRENT CATALOG</span>
          <span className="mono-micro hidden text-ink-3 lg:inline">LIVE STOREFRONT</span>
        </div>
        <div aria-hidden className="hidden md:block" />
        <div className="flex h-11 items-center justify-between px-4">
          <span className="mono-label text-ink-2">CLEAN CATALOG</span>
          <span className="mono-micro flex items-center gap-1.5 text-success">
            <span aria-hidden className="size-1.5 rounded-full bg-success" />
            <span className="hidden lg:inline">READY TO PUBLISH</span>
            <span className="lg:hidden">READY</span>
          </span>
        </div>
      </div>

      {/* rows */}
      <dl className="divide-y divide-line">
        {ROWS.map((r) => (
          <div key={r.field} className="grid grid-cols-[1fr_1fr] md:grid-cols-[8rem_1fr_2.5rem_1fr]">
            <dt className="mono-micro col-span-2 px-4 pt-3 text-ink-3 md:col-span-1 md:py-3.5">{r.field}</dt>
            <dd
              className={cn(
                "min-w-0 truncate border-r border-line px-4 pb-3 font-mono text-[0.8rem] md:border-r-0 md:py-3.5",
                r.tone === "danger" ? "text-danger" : "text-warning",
              )}
            >
              {r.before}
            </dd>
            <span aria-hidden className="hidden items-center justify-center text-ink-3 md:flex">
              <ArrowRight className="size-3.5" strokeWidth={2} />
            </span>
            <dd className="min-w-0 truncate px-4 pb-3 font-mono text-[0.8rem] text-ink md:py-3.5">{r.after}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line px-4 py-3">
        <span className="mono-micro text-ink-3">ONE RECORD · SKU AX-442</span>
        <span className="mono-micro text-danger">2 MISSING</span>
        <span className="mono-micro text-warning">6 INCONSISTENT</span>
        <span className="mono-micro ml-auto text-success">8 / 8 RESOLVED</span>
      </div>
    </Reveal>
  );
}

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
      <div className="hidden border-b border-line md:grid md:grid-cols-[8rem_1fr_2.5rem_1fr]">
        <div className="hidden h-11 items-center px-4 md:flex">
          <span className="mono-label text-ink-2">FIELD</span>
        </div>
        <div className="flex h-11 items-center justify-between px-4">
          <span className="mono-label text-ink-2">CURRENT CATALOG</span>
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
          <div key={r.field} className="grid md:grid-cols-[8rem_1fr_2.5rem_1fr]">
            <dt className="mono-micro px-4 pt-3 text-ink-3 md:py-3.5">{r.field}</dt>
            <dd
              className={cn(
                // mobile: before stacked above after, wrapping; desktop: side by side, truncated
                "min-w-0 break-words px-4 pt-1.5 font-mono text-[0.8rem] md:truncate md:py-3.5",
                r.tone === "danger" ? "text-danger" : "text-warning",
              )}
            >
              <span className="mono-micro mr-2 text-ink-3 md:hidden">BEFORE</span>
              {r.before}
            </dd>
            <span aria-hidden className="hidden items-center justify-center text-ink-3 md:flex">
              <ArrowRight className="size-3.5" strokeWidth={2} />
            </span>
            <dd className="min-w-0 break-words px-4 pb-3 pt-1 font-mono text-[0.8rem] text-ink md:truncate md:py-3.5">
              <span className="mono-micro mr-2 text-success md:hidden">AFTER</span>
              {r.after}
            </dd>
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

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CHANNELS = ["Google", "Meta", "Amazon", "Flipkart"] as const;
type Cell = "ok" | "fixing" | "na";

const ROWS: { field: string; cells: Cell[]; note: string }[] = [
  { field: "Title", cells: ["ok", "ok", "ok", "ok"], note: "Channel title rules applied" },
  { field: "GTIN / barcode", cells: ["ok", "ok", "fixing", "ok"], note: "38 items missing on Amazon" },
  { field: "Price", cells: ["ok", "ok", "ok", "ok"], note: "Matches store" },
  { field: "Availability", cells: ["ok", "ok", "ok", "ok"], note: "Synced with stock" },
  { field: "Main image", cells: ["ok", "ok", "ok", "fixing"], note: "Pure-white main image" },
  { field: "Category", cells: ["ok", "na", "ok", "fixing"], note: "Mapped to each taxonomy" },
  { field: "Attributes", cells: ["ok", "ok", "ok", "ok"], note: "Size · colour · material" },
];

function Mark({ c }: { c: Cell }) {
  if (c === "ok")
    return (
      <span className="inline-grid size-6 place-items-center rounded-full bg-success-soft text-success" aria-label="Approved">
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
      </span>
    );
  if (c === "fixing")
    return (
      <span className="mono-micro rounded-[4px] border border-warning/30 bg-warning-soft px-1 py-1 text-warning md:px-1.5">
        <span className="md:hidden">FIX</span>
        <span className="max-md:hidden">FIXING</span>
      </span>
    );
  return <span className="mono-micro text-ink-3" aria-label="Not used">—</span>;
}

export function FeedsVisual() {
  return (
    <figure aria-label="Feed status by field and channel" className="overflow-hidden rounded-[12px] border border-line bg-bg">
      <div className="flex h-11 items-center justify-between border-b border-line px-4 md:px-5">
        <span className="mono-label text-ink-2">FEED HEALTH · 1,204 PRODUCTS</span>
        <span className="mono-micro text-ink-3">ILLUSTRATIVE</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left md:min-w-[36rem]">
          <thead>
            <tr className="border-b border-line bg-bg-muted/50">
              <th scope="col" className="mono-micro py-3 pl-4 pr-2 font-normal text-ink-3 md:px-5">FIELD</th>
              {CHANNELS.map((c) => (
                <th key={c} scope="col" className="px-1 py-3 text-center text-[0.8rem] font-medium text-ink md:px-3 md:text-[0.875rem]">
                  {c}
                </th>
              ))}
              <th scope="col" className="mono-micro hidden px-4 py-3 font-normal text-ink-3 lg:table-cell">NOTE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {ROWS.map((r) => (
              <tr key={r.field}>
                <th scope="row" className="py-3 pl-4 pr-2 text-[0.875rem] font-normal text-ink md:px-5 md:text-[0.925rem]">
                  {r.field}
                </th>
                {r.cells.map((c, i) => (
                  <td key={CHANNELS[i]} className={cn("px-1 py-3 text-center md:px-3", c === "fixing" && "bg-warning-soft/40")}>
                    <Mark c={c} />
                  </td>
                ))}
                <td className="hidden px-4 py-3 text-[0.85rem] text-ink-2 lg:table-cell">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line px-4 py-3 md:px-5">
        <span className="mono-micro text-success">25 APPROVED</span>
        <span className="mono-micro text-warning">3 BEING FIXED</span>
        <span className="text-[0.85rem] text-ink-2">Every fix is made in the catalog, so it reaches all four channels.</span>
      </figcaption>
    </figure>
  );
}

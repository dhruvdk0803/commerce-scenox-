import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const STAGES = [
  { label: "SOURCE PLATFORM", lines: ["WooCommerce export", "2,140 products", "6,300 variations", "9,800 images"] },
  { label: "CATALOG EXTRACTION", lines: ["products.csv", "variations.csv", "media manifest", "category tree"] },
  { label: "NORMALIZATION", lines: ["duplicate SKUs merged", "attributes → options", "categories → collections", "redirects mapped"] },
  { label: "TARGET PLATFORM", lines: ["Shopify", "2,088 products", "6,110 variants", "301 redirects"], success: true },
];

const PATHS = ["WooCommerce → Shopify", "Legacy ecommerce → Shopify", "Structured source → WooCommerce"];

/** Four stages in one bordered row. Figures are illustrative. */
export function MigrationFlow() {
  return (
    <div>
      <Reveal className="overflow-hidden rounded-[12px] border border-line bg-bg-elevated" amount={0.1}>
        <ol className="grid gap-px bg-line lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <li key={s.label} className="relative bg-bg-elevated">
              <div className="flex h-11 items-center justify-between border-b border-line px-4">
                <span className="mono-label text-ink-2">{s.label}</span>
                <span className={`mono-micro tabular ${s.success ? "text-success" : "text-ink-3"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5 p-4">
                {s.lines.map((l) => (
                  <li key={l} className="font-mono text-[0.78rem] leading-snug text-ink">
                    {l}
                  </li>
                ))}
              </ul>
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-[22px] z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg-elevated text-ink-3 lg:grid"
                >
                  <ArrowRight className="size-3" strokeWidth={2} />
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line px-4 py-3">
          <span className="mono-micro text-ink-3">TYPICAL PATHS</span>
          {PATHS.map((p) => (
            <span key={p} className="font-mono text-[0.78rem] text-ink-2">
              {p}
            </span>
          ))}
          <span className="mono-micro ml-auto hidden text-ink-3 md:inline">FIGURES ILLUSTRATIVE</span>
        </div>
      </Reveal>
    </div>
  );
}

import { ArrowDown } from "lucide-react";
import { Tag } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";

export type CaseStudy = {
  slug: string;
  isDemo: boolean;
  customer: string;
  industry: string;
  platform: string;
  catalogSize: string;
  problem: string;
  input: string[];
  workflow: string[];
  handled: string[];
  turnaround: string;
  result: string;
  before?: string[];
  after?: string[];
  quote?: { text: string; author: string };
};

export const demoCase: CaseStudy = {
  slug: "sample-catalog-transformation",
  isDemo: true,
  customer: "Sample: furniture catalog",
  industry: "Home & office furniture",
  platform: "Shopify",
  catalogSize: "500 products",
  problem:
    "One supplier spreadsheet with inconsistent naming, no descriptions, loose categories and a folder of unnamed images.",
  input: ["1 supplier spreadsheet", "500 rows", "1 image folder (640 files)"],
  workflow: ["Cleanup", "Category mapping", "Descriptions", "Variants", "Image matching"],
  handled: [
    "Titles rewritten",
    "3-level category tree",
    "Descriptions prepared",
    "Variants consolidated",
    "Images matched by SKU",
    "SEO fields written",
  ],
  turnaround: "Illustrative",
  result: "Structured ecommerce catalog, validated and formatted for Shopify import.",
  before: ["blk office chr", "furniture?", "NULL", "IMG_99283.jpg"],
  after: ["Black Ergonomic Office Chair", "Office Furniture › Chairs", "84-word description", "ax-442-black-01.jpg"],
};

export function ProofModule({ cs = demoCase, showLink = true }: { cs?: CaseStudy; showLink?: boolean }) {
  return (
    <section className="section-y" aria-labelledby="proof-heading">
      <div className="container-x">
        <SectionHeader
          id="proof-heading"
          eyebrow="SAMPLE WORKFLOW"
          title={cs.isDemo ? "Sample catalog transformation." : cs.customer}
          description={
            cs.isDemo
              ? "A representative workflow, not a named client. Real case studies replace this with the same structure."
              : cs.problem
          }
          action={cs.isDemo ? <Tag tone="neutral" className="h-7 px-2.5">DEMONSTRATION / SAMPLE WORKFLOW</Tag> : undefined}
        />

        <Reveal className="mt-12 grid overflow-hidden rounded-[12px] border border-line bg-bg-elevated lg:grid-cols-3 md:mt-16" amount={0.15}>
          <Stage
            label="SOURCE"
            meta={cs.catalogSize}
            items={cs.input}
            footnote={`${cs.industry} · ${cs.platform}`}
          />
          <Stage label="WORK" meta={`${cs.workflow.length} STAGES`} items={cs.workflow} footnote={cs.problem} numbered />
          <Stage
            label="OUTPUT"
            meta="STORE READY"
            items={cs.handled}
            footnote={cs.result}
            success
          />
        </Reveal>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[60ch] text-[0.85rem] leading-relaxed text-ink-3">
            {cs.isDemo ? "Figures are illustrative." : `Turnaround: ${cs.turnaround}`}
          </p>
          {showLink && <TextLink href="/case-studies">View case studies</TextLink>}
        </div>
      </div>
    </section>
  );
}

function Stage({
  label,
  meta,
  items,
  footnote,
  numbered,
  success,
}: {
  label: string;
  meta: string;
  items: string[];
  footnote: string;
  numbered?: boolean;
  success?: boolean;
}) {
  return (
    <div className="relative flex flex-col border-b border-line last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="flex h-11 items-center justify-between border-b border-line px-5">
        <span className="mono-label text-ink-2">{label}</span>
        <span className={`mono-micro tabular ${success ? "text-success" : "text-ink-3"}`}>{meta}</span>
      </div>
      <ul className="flex-1 p-5">
        {items.map((it, i) => (
          <li key={it} className="flex items-baseline gap-3 py-1.5 text-[0.95rem] text-ink">
            {numbered ? (
              <span className="mono-micro tabular text-accent">{String(i + 1).padStart(2, "0")}</span>
            ) : (
              <span aria-hidden className={`size-1.5 shrink-0 translate-y-[-1px] rounded-full ${success ? "bg-success" : "bg-ink-3"}`} />
            )}
            {it}
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-5 py-4 text-[0.85rem] leading-snug text-ink-2">{footnote}</p>
      {/* down arrow between stages on mobile */}
      <span aria-hidden className="absolute -bottom-3 left-1/2 z-10 grid size-6 -translate-x-1/2 place-items-center rounded-full border border-line bg-bg-elevated text-ink-3 last:hidden lg:hidden">
        <ArrowDown className="size-3" strokeWidth={2} />
      </span>
    </div>
  );
}

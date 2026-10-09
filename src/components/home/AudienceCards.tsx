import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, Stagger, staggerChild } from "@/components/ui/Reveal";

const AUDIENCES = [
  {
    label: "Growing brands",
    range: "100–500 products",
    copy: "New collection? Store launch? Old listings that need rebuilding? Send the files and skip the weeks of admin.",
    href: "/bulk-product-upload",
    bars: 2,
  },
  {
    label: "Retailers",
    range: "500–2,000 products",
    copy: "Large multi-category catalogs, structured and live without weeks of manual entry.",
    href: "/bulk-product-upload",
    bars: 3,
  },
  {
    label: "Wholesalers & distributors",
    range: "1,000–50,000+ SKUs",
    copy: "Turn supplier and ERP catalog data into ecommerce listings. SKU normalization, variant structure, specifications, bulk publishing.",
    href: "/wholesale-catalog",
    bars: 6,
    featured: true,
  },
  {
    label: "Manufacturers",
    range: "Any catalog size",
    copy: "Move existing product information online with specifications, documents and images mapped correctly.",
    href: "/bulk-product-upload",
    bars: 4,
  },
  {
    label: "Ecommerce agencies",
    range: "Client launches",
    copy: "Use Scenox Commerce as white-label ecommerce operations. You own the client. We handle catalogs, feeds and retention flows.",
    href: "/get-started?need=agency",
    bars: 3,
  },
];

export function AudienceCards({ title = "Built for catalogs that don't belong in someone's to-do list." }: { title?: string }) {
  return (
    <section className="section-y" aria-labelledby="audience-heading">
      <div className="container-x">
        <SectionHeader
          id="audience-heading"
          eyebrow="WHO IT'S FOR"
          title={title}
          description="From a first collection to a distributor's full price list. The wider the catalog, the more the system earns its keep."
        />

        <Stagger as="ul" className="mt-12 border-t border-line md:mt-16" amount={0.1}>
          {AUDIENCES.map((a, i) => (
            <MotionItem key={a.label} variants={staggerChild} className="border-b border-line">
              <Link
                href={a.href}
                className={cn(
                  "group grid gap-4 py-6 transition-colors duration-[200ms] md:grid-cols-12 md:items-center md:gap-6 md:py-7",
                  a.featured && "lg:bg-bg-muted/40",
                )}
              >
                <div className="flex items-center gap-4 md:col-span-1">
                  <span className="mono-label tabular text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="md:col-span-4">
                  <h3
                    className={cn(
                      "font-semibold leading-tight tracking-[-0.025em] text-ink",
                      a.featured ? "text-[1.5rem] md:text-[1.75rem] lg:text-[2.1rem]" : "text-[1.5rem] md:text-[1.75rem]",
                    )}
                  >
                    {a.label}
                  </h3>
                  <p className="mono-label mt-2 text-accent tabular">{a.range}</p>
                </div>
                <p className="text-[0.95rem] leading-[1.55] text-ink-2 md:col-span-5">{a.copy}</p>
                <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  {/* catalog-size glyph */}
                  <span aria-hidden className="flex items-end gap-[3px]">
                    {Array.from({ length: 6 }).map((_, b) => (
                      <span
                        key={b}
                        className={cn(
                          "w-1 rounded-[1px] transition-colors duration-[200ms]",
                          b < a.bars ? "bg-ink group-hover:bg-accent" : "bg-line",
                        )}
                        style={{ height: `${8 + b * 3}px` }}
                      />
                    ))}
                  </span>
                  <ArrowRight
                    className="size-5 text-ink-3 transition-[transform,color] duration-[240ms] ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:text-ink"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
              </Link>
            </MotionItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

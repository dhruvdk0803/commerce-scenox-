import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { groups, productsByGroup, type ProductGroup } from "@/content/products";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Price } from "@/components/market/Price";
import { site } from "@/lib/site";

const ORDER: ProductGroup[] = ["catalog", "channels", "retention"];

/**
 * The productised menu across the whole ecommerce cycle: list, sell
 * everywhere, recover and retain. One ledger per stage, every row a
 * product with a starting price in the visitor's currency.
 */
export function ProductMenu({
  eyebrow = "THE FULL CYCLE",
  title = (
    <>
      Every stage after the store is built.
      <br />
      <span className="text-ink-2">One team. Fixed prices.</span>
    </>
  ),
  description = "Pick a single product or run the whole cycle. Each one has a set scope, a delivery time and a public starting price.",
  tone = "light",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  tone?: "light" | "muted";
}) {
  return (
    <section
      id="services"
      className={cn("section-y border-t border-line", tone === "muted" && "bg-bg-muted/40")}
      aria-labelledby="menu-heading"
    >
      <div className="container-x">
        <SectionHeader id="menu-heading" eyebrow={eyebrow} title={title} description={description} />

        <Reveal className="mt-12 overflow-hidden rounded-[12px] border border-line bg-bg md:mt-16">
          <div className="hidden h-11 grid-cols-[15rem_1fr_13rem] items-center border-b border-line bg-bg-muted/50 px-6 lg:grid">
            <span className="mono-micro text-ink-3">STAGE</span>
            <span className="mono-micro text-ink-3">SERVICE</span>
            <span className="mono-micro text-right text-ink-3">STARTS FROM</span>
          </div>
          {ORDER.map((g) => {
            const meta = groups[g];
            return (
              <div key={g} className="grid border-b border-line last:border-b-0 lg:grid-cols-[15rem_1fr]">
                <div className="border-b border-line bg-bg-muted/30 px-5 py-4 md:px-6 lg:border-b-0 lg:border-r lg:py-6">
                  <p className="mono-micro text-ink-3 tabular">{meta.stage}</p>
                  <h3 className="mt-2 text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">{meta.label}</h3>
                  <p className="mt-1 max-w-[30ch] text-[0.875rem] leading-snug text-ink-2">{meta.desc}</p>
                </div>
                <ul className="divide-y divide-line">
                  {productsByGroup(g).map((p) => (
                    <li key={p.id}>
                      <Link
                        href={p.href}
                        className="group grid gap-x-6 gap-y-2 px-5 py-4 transition-colors duration-[160ms] hover:bg-bg-muted/50 md:grid-cols-[1fr_13rem] md:items-center md:px-6 md:py-5"
                      >
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2 text-[1rem] font-medium tracking-[-0.01em] text-ink">
                            {p.name}
                            {p.isNew && (
                              <span className="mono-micro rounded-[4px] border border-accent/30 bg-accent-soft px-1.5 py-0.5 text-accent">
                                NEW
                              </span>
                            )}
                            <ArrowUpRight
                              aria-hidden
                              className="size-3.5 shrink-0 text-ink-3 opacity-0 transition-[opacity,transform] duration-[200ms] ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                              strokeWidth={2}
                            />
                          </span>
                          <span className="mt-1 block text-[0.9rem] leading-snug text-ink-2">{p.desc}</span>
                        </span>
                        <span className="flex items-baseline gap-2 md:flex-col md:items-end md:gap-0.5">
                          <span className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink tabular">
                            <Price set={p.price} />
                          </span>
                          <span className="mono-micro text-ink-3 md:text-right">{p.unit.toUpperCase()}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Reveal>
        <p className="mt-5 text-[0.85rem] text-ink-3">Every service starts from 48 hours. {site.qualifier}</p>
      </div>
    </section>
  );
}

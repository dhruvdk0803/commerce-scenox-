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

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-3 lg:gap-5">
          {ORDER.map((g, gi) => {
            const meta = groups[g];
            return (
              <Reveal key={g} delay={gi * 0.06} className="flex flex-col overflow-hidden rounded-[12px] border border-line bg-bg">
                <div className="border-b border-line px-5 py-4">
                  <p className="mono-micro text-ink-3 tabular">{meta.stage}</p>
                  <h3 className="mt-2 text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">{meta.label}</h3>
                  <p className="mt-1 text-[0.9rem] leading-snug text-ink-2">{meta.desc}</p>
                </div>
                <ul className="flex-1 divide-y divide-line">
                  {productsByGroup(g).map((p) => (
                    <li key={p.id}>
                      <Link
                        href={p.href}
                        className="group grid gap-1 px-5 py-4 transition-colors duration-[160ms] hover:bg-bg-muted/60"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2 text-[0.975rem] font-medium tracking-[-0.01em] text-ink">
                            {p.name}
                            {p.isNew && (
                              <span className="mono-micro rounded-[4px] border border-accent/30 bg-accent-soft px-1.5 py-0.5 text-accent">
                                NEW
                              </span>
                            )}
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            className="size-4 shrink-0 text-ink-3 transition-transform duration-[200ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                            strokeWidth={1.75}
                          />
                        </span>
                        <span className="text-[0.875rem] leading-snug text-ink-2">{p.desc}</span>
                        <span className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="text-[0.95rem] font-semibold text-ink tabular">
                            from <Price set={p.price} />
                          </span>
                          <span className="mono-micro text-ink-3">{p.unit.toUpperCase()}</span>
                        </span>
                        <span className="mono-micro text-ink-3">DELIVERY · {p.turnaround.toUpperCase()}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-[0.85rem] text-ink-3">{site.qualifier}</p>
      </div>
    </section>
  );
}

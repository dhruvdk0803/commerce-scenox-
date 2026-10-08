"use client";

import Link from "next/link";
import { bundles, separatePrice } from "@/content/bundles";
import { formatPrice } from "@/lib/markets";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionLi, Stagger } from "@/components/ui/Reveal";
import { useMarket, usePrice } from "@/components/market/MarketProvider";

export function BundleCards({ tone = "light", bare = false }: { tone?: "light" | "muted"; bare?: boolean }) {
  const market = useMarket();
  const price = usePrice();

  const grid = (
        <Stagger as="ul" className={cn("grid gap-4 lg:grid-cols-3", !bare && "mt-12 md:mt-16")} amount={0.1}>
          {bundles.map((b) => {
            const own = b.price[market.id];
            const parts = separatePrice(b)[market.id];
            const saving = own != null && parts != null ? parts - own : null;
            return (
              <MotionLi
                key={b.id}
                className={cn(
                  "relative flex flex-col rounded-[12px] border bg-bg",
                  b.popular ? "border-ink" : "border-line",
                )}
              >
                {b.popular && (
                  <span className="mono-micro absolute -top-3 left-5 rounded-[4px] bg-ink px-2 py-1.5 text-paper">
                    MOST COMPLETE
                  </span>
                )}

                <div className="p-6 pb-5 md:p-7 md:pb-5">
                  <p className="mono-micro text-ink-3">{b.forWho.toUpperCase()}</p>
                  <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.025em] text-ink">{b.name}</h3>
                  <p className="mt-1 text-[0.95rem] text-ink-2">{b.tagline}</p>

                  <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.035em] text-ink tabular">
                      {price(b.price)}
                    </span>
                    {parts != null && (
                      <span className="text-[0.95rem] text-ink-3 line-through tabular">
                        {formatPrice(parts, market.id)}
                      </span>
                    )}
                  </div>
                  {saving != null && saving > 0 && (
                    <p className="mono-micro mt-2 text-success">
                      SAVE {formatPrice(saving, market.id)} VS. BUYING SEPARATELY
                    </p>
                  )}
                </div>

                <ul className="divide-y divide-line border-y border-line">
                  {b.parts.map((p) => (
                    <li key={p.label}>
                      <Link
                        href={p.href}
                        className="flex items-baseline justify-between gap-3 px-6 py-2.5 text-[0.9rem] text-ink transition-colors duration-[160ms] hover:bg-bg-muted/60 md:px-7"
                      >
                        <span>{p.label}</span>
                        <span className="mono-micro shrink-0 text-ink-3 tabular">
                          {formatPrice((p.price[market.id] ?? 0) * p.qty, market.id)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-1 flex-col p-6 pt-5 md:p-7 md:pt-5">
                  <p className="flex-1 text-[0.9rem] leading-snug text-ink-2">{b.outcome}</p>
                  <Button
                    href={`/get-started?bundle=${b.id}`}
                    variant={b.popular ? "primary" : "outline"}
                    className="mt-6 w-full"
                    arrow
                    event="cta_click"
                    eventParams={{ cta: "bundle", bundle: b.id }}
                  >
                    Get the {b.name}
                  </Button>
                </div>
              </MotionLi>
            );
          })}
        </Stagger>
  );
  if (bare) return grid;

  return (
    <section
      id="bundles"
      className={cn("section-y border-t border-line", tone === "muted" && "bg-bg-muted/40")}
      aria-labelledby="bundles-heading"
    >
      <div className="container-x">
        <SectionHeader
          id="bundles-heading"
          eyebrow="BUNDLES"
          title={
            <>
              Don&apos;t build a stack.
              <br />
              <span className="text-ink-2">Pick a kit.</span>
            </>
          }
          description={`Three fixed kits that cover the jobs stores ask for most, priced below buying the parts. Prices in ${market.currency}, one-time.`}
        />

        {grid}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { Check } from "lucide-react";
import { tiers, pricingFactors } from "@/content/pricing";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, Stagger, staggerChild } from "@/components/ui/Reveal";
import { useMarket, usePrice } from "@/components/market/MarketProvider";

export function PricingCards({
  preview = false,
  bare = false,
  heading = ["Simple projects.", "Simple pricing."],
  eyebrow = "CATALOG LISTING",
}: {
  eyebrow?: string;
  preview?: boolean;
  /** grid + footnote only, for use inside PricingTabs */
  bare?: boolean;
  heading?: [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const market = useMarket();
  const price = usePrice();
  useEffect(() => {
    if (inView) track("pricing_viewed", { preview });
  }, [inView, preview]);

  const content = (
      <>
        <Stagger as="ul" className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", !bare && "mt-12 md:mt-16")} amount={0.1}>
          {tiers.map((t) => {
            const p = price(t.price);
            const fixed = t.price[market.id] != null;
            return (
            <MotionItem
              key={t.id}
              variants={staggerChild}
              className={cn(
                "relative flex flex-col rounded-[12px] border bg-bg p-6",
                t.popular ? "border-ink" : "border-line",
              )}
            >
              {t.popular && (
                <span className="mono-micro absolute -top-3 left-5 rounded-[4px] bg-ink px-2 py-1.5 text-paper">
                  MOST POPULAR
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">{t.name}</h3>
              </div>
              <p className="mono-label mt-2 text-ink-3 tabular">{t.range}</p>

              <div className="mt-6 border-t border-line pt-5">
                <p className="mono-micro text-ink-3">{t.priceNote}</p>
                <p
                  className={cn(
                    "mt-2 font-semibold leading-none tracking-[-0.035em] text-ink tabular",
                    fixed ? "text-[2.5rem]" : "text-[1.75rem] pt-1.5",
                  )}
                >
                  {p}
                </p>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {t.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-ink-2">
                    <Check className="mt-[3px] size-3.5 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>

              <Button
                href={t.href}
                variant={t.popular ? "primary" : "outline"}
                className="mt-8 w-full"
                arrow
                event="cta_click"
                eventParams={{ cta: "pricing", tier: t.id }}
              >
                {t.cta}
              </Button>
            </MotionItem>
            );
          })}
        </Stagger>

        {/* footnote always renders: the Catalog Launch card's asterisk points here */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.85rem] text-ink-3">
            *48-hour turnaround applies to eligible catalogs. Final pricing depends on source-data quality, complexity, variants, images, enrichment and platform.
          </p>
          {(preview || bare) && <TextLink href="/pricing">Full pricing details</TextLink>}
        </div>
        {preview || bare ? null : (
          <div className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>WHAT AFFECTS PRICING</Eyebrow>
              <h3 className="mt-4 max-w-[30ch] text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-ink">
                Two catalogs with the same product count can be very different projects.
              </h3>
            </div>
            <dl className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
              {pricingFactors.map((f) => (
                <div key={f.label} className="border-b border-line py-3.5">
                  <dt className="text-[0.95rem] font-medium text-ink">{f.label}</dt>
                  <dd className="mt-1 text-[0.875rem] leading-snug text-ink-2">{f.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </>
  );
  if (bare) return <div ref={ref}>{content}</div>;

  return (
    <section ref={ref} className="section-y border-t border-line" aria-labelledby="pricing-heading" id="pricing">
      <div className="container-x">
        <SectionHeader
          id="pricing-heading"
          eyebrow={eyebrow}
          title={
            <>
              {heading[0]}
              <span className="block text-balance text-ink-2">{heading[1]}</span>
            </>
          }
          description={`Starting prices in ${market.currency} for completed catalog operations, not per-row data entry. We confirm a fixed quote after inspecting your files.`}
        />

        {content}
      </div>
    </section>
  );
}

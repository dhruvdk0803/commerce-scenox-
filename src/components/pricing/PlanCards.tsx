"use client";

import { Check } from "lucide-react";
import { plans, planNote } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionLi, Stagger, staggerChild } from "@/components/ui/Reveal";
import { useMarket, usePrice } from "@/components/market/MarketProvider";

export function PlanCards({ tone = "muted", bare = false }: { tone?: "light" | "muted"; bare?: boolean }) {
  const market = useMarket();
  const price = usePrice();

  const content = (
      <>
        <Stagger as="ul" className={cn("grid gap-4 lg:grid-cols-3", !bare && "mt-12 md:mt-16")} amount={0.1}>
          {plans.map((p) => (
            <MotionLi
              key={p.id}
              variants={staggerChild}
              className={cn(
                "relative flex flex-col rounded-[12px] border bg-bg p-6 md:p-7",
                p.popular ? "border-ink" : "border-line",
              )}
            >
              {p.popular && (
                <span className="mono-micro absolute -top-3 left-5 rounded-[4px] bg-ink px-2 py-1.5 text-paper">
                  BEST VALUE
                </span>
              )}
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">{p.name}</h3>
              <p className="mt-2 max-w-[30ch] text-[0.9rem] leading-snug text-ink-2">{p.forWho}</p>

              <div className="mt-6 flex items-baseline gap-2 border-t border-line pt-5">
                <span className="text-[2.5rem] font-semibold leading-none tracking-[-0.035em] text-ink tabular">
                  {price(p.price)}
                </span>
                <span className="mono-micro text-ink-3">/ MONTH</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {p.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-ink-2">
                    <Check className="mt-[3px] size-3.5 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>

              <Button
                href={p.href}
                variant={p.popular ? "primary" : "outline"}
                className="mt-8 w-full"
                arrow
                event="cta_click"
                eventParams={{ cta: "plan", plan: p.id }}
              >
                Start {p.name}
              </Button>
            </MotionLi>
          ))}
        </Stagger>

        <p className="mt-8 text-[0.85rem] text-ink-3">{planNote}</p>
      </>
  );
  if (bare) return content;

  return (
    <section
      id="plans"
      className={cn("section-y border-t border-line", tone === "muted" && "bg-bg-muted/40")}
      aria-labelledby="plans-heading"
    >
      <div className="container-x">
        <SectionHeader
          id="plans-heading"
          eyebrow="MONTHLY PLANS"
          title={
            <>
              Launch once.
              <br />
              <span className="text-ink-2">Then let us run it.</span>
            </>
          }
          description={`After setup, one monthly plan keeps the catalog, channels and retention running. Prices in ${market.currency}, per month.`}
        />

        {content}
      </div>
    </section>
  );
}

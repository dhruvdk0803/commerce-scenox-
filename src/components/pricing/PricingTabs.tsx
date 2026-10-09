"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { TextLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useMarket } from "@/components/market/MarketProvider";
import { BundleCards } from "./BundleCards";
import { PlanCards } from "./PlanCards";
import { PricingCards } from "@/components/home/PricingCards";

const TABS = [
  { id: "kits", label: "Kits", hint: "One-time bundles" },
  { id: "catalog", label: "Catalog upload", hint: "From 48 hours" },
  { id: "plans", label: "Monthly plans", hint: "We run it for you" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/**
 * All pricing in one section. Every panel stays in the HTML (inactive ones
 * are `hidden`) so crawlers and AI answer engines can read all prices.
 */
export function PricingTabs() {
  const market = useMarket();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<TabId>("kits");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = TABS.findIndex((t) => t.id === active);
    const next =
      e.key === "ArrowRight" ? (i + 1) % TABS.length
      : e.key === "ArrowLeft" ? (i - 1 + TABS.length) % TABS.length
      : e.key === "Home" ? 0
      : e.key === "End" ? TABS.length - 1
      : null;
    if (next == null) return;
    e.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="pricing" className="section-y border-t border-line" aria-labelledby="pricing-heading">
      <div className="container-x">
        <SectionHeader
          id="pricing-heading"
          eyebrow="PRICING"
          title={
            <>Fixed products. Public prices.</>
          }
          description={`Every price is a starting price in ${market.currency} for a fixed scope. We confirm the final figure after seeing your store and data.`}
          action={<TextLink href="/pricing">Full pricing</TextLink>}
        />

        <div
          role="tablist"
          aria-label="Pricing type"
          onKeyDown={onKey}
          className="mt-12 grid grid-cols-3 rounded-[10px] border border-line bg-bg-muted/60 p-1 md:mt-16 md:inline-grid md:w-auto"
        >
          {TABS.map((t, i) => {
            const selected = t.id === active;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative rounded-[7px] px-3 py-2.5 text-left transition-colors duration-[160ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-w-[11.5rem] md:px-4",
                  selected ? "text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="pricing-tab"
                    aria-hidden
                    className="absolute inset-0 rounded-[7px] border border-line bg-bg shadow-[0_1px_2px_rgba(16,17,18,0.06)]"
                    transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.32, bounce: 0 }}
                  />
                )}
                <span className="relative block text-[0.925rem] font-medium tracking-[-0.01em]">{t.label}</span>
                <span className="mono-micro relative mt-0.5 block text-ink-3 max-sm:hidden">{t.hint.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {TABS.map((t) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={t.id !== active}
            className="mt-8 md:mt-10"
          >
            {/* remount on open so the reveal check runs once the panel is visible */}
            {t.id === "kits" && <BundleCards bare key={`kits-${active === "kits"}`} />}
            {t.id === "catalog" && <PricingCards bare key={`catalog-${active === "catalog"}`} />}
            {t.id === "plans" && <PlanCards bare key={`plans-${active === "plans"}`} />}
          </div>
        ))}
      </div>
    </section>
  );
}

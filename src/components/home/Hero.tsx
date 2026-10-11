"use client";

import type { CSSProperties } from "react";
import { Button, TextLink } from "@/components/ui/Button";
import { CatalogPipeline } from "./pipeline/CatalogPipeline";

export function Hero({ compact = false }: { compact?: boolean }) {
  // CSS-driven entrance: runs off the main thread and respects reduced motion via globals.css
  const item = (i: number) => ({
    className: "anim-fade-up",
    style: { animationDelay: `${60 + i * 80}ms`, animationDuration: "700ms" } as CSSProperties,
  });

  return (
    <section
      data-hero
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-x pt-8 pb-12 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24">
        <h1
          id="hero-heading"
          className="anim-rise text-display text-ink lg:max-w-[16ch]"
          style={{ animationDelay: "60ms" }}
        >
          {compact ? (
            // service page: its own keyword headline so it doesn't compete with the homepage
            <>
              <span className="block">BULK PRODUCT</span>
              <span className="block">UPLOAD.</span>
              <span className="block">1000+ IN 48 HOURS.*</span>
            </>
          ) : (
            <>
              <span className="block">1000+ PRODUCTS.</span>
              <span className="block">48 HOURS.</span>
              <span className="block">
                LIVE ON YOUR STORE.
              </span>
            </>
          )}
        </h1>

        {/* row beneath: copy + system */}
        <div className="mt-10 grid items-center gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:col-span-4">
            <p
              className={`max-w-[36ch] text-[1.125rem] leading-[1.5] text-ink-2 ${item(3).className}`}
              style={item(3).style}
            >
              {compact
                ? "Spreadsheets and supplier files, cleaned and published by our AI engine and checked by people."
                : "Send spreadsheets, supplier files or photos. We clean, enrich and publish every product on Shopify, WooCommerce, Magento or BigCommerce."}
            </p>

            <div
              className={`mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 ${item(5).className}`}
              style={item(5).style}
            >
              <Button
                href="/get-started"
                size="lg"
                arrow
                event="hero_get_started_click"
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
              <TextLink href="/free-sample" className="max-sm:self-center" event="cta_click" eventParams={{ cta: "hero_free_sample" }}>
                Try 10 products free
              </TextLink>
            </div>

            <p
              className={`mt-6 max-w-[44ch] text-[0.8rem] leading-relaxed text-ink-3 ${item(6).className}`}
              style={item(6).style}
            >
              Free 10-product sample · fixed quote before work · no store passwords. 48 hours is for eligible
              projects; turnaround depends on scope and your data.
            </p>
          </div>

          <div
            className="anim-fade-up relative min-w-0 lg:col-span-8"
            style={{ animationDelay: "320ms", animationDuration: "900ms" }}
          >
            <CatalogPipeline />
          </div>
        </div>


      </div>
    </section>
  );
}

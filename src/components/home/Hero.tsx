"use client";

import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import { Button, TextLink } from "@/components/ui/Button";
import { CatalogPipeline } from "./pipeline/CatalogPipeline";

export function Hero({
  headline = ["1000 PRODUCTS.", "48 HOURS.", "LIVE ON YOUR STORE."],
  mobileHeadline = ["1000 PRODUCTS.", "48 HOURS.", "LIVE."],
  compact = false,
}: {
  headline?: string[];
  mobileHeadline?: string[];
  compact?: boolean;
}) {
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
          className={`text-display text-ink lg:max-w-[16ch] ${item(1).className}`}
          style={item(1).style}
        >
          <span className="sm:hidden">
            {mobileHeadline.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </span>
          <span className="hidden sm:block">
            {headline.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </span>
        </h1>

        {/* row beneath: copy + system */}
        <div className="mt-8 grid items-start gap-8 md:mt-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="min-w-0 lg:col-span-4">
            <p className={`mono-label text-ink-2 ${item(2).className}`} style={item(2).style}>
              <span className="sm:hidden">Shopify • WooCommerce • Custom</span>
              <span className="hidden sm:inline">
                {site.platforms.join(" • ")}
              </span>
            </p>

            {!compact && (
              <p
                className={`mt-5 hidden max-w-[38ch] text-[1.05rem] leading-[1.5] text-ink-2 sm:block ${item(3).className}`}
                style={item(3).style}
              >
                Send us your spreadsheets, supplier catalogs, images or existing
                product data. Our AI-powered catalog engine cleans, structures and
                enriches it. Our team checks it and takes it live.
              </p>
            )}

            <p
              className={`mt-4 text-[1.2rem] font-medium leading-snug tracking-[-0.02em] text-ink sm:mt-5 sm:text-[1.3rem] ${item(4).className}`}
              style={item(4).style}
            >
              You send the data.
              <br /> We handle the rest.
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
              <TextLink href="/how-it-works" className="max-sm:hidden">
                See How It Works
              </TextLink>
            </div>

            <p
              className={`mt-5 max-w-[42ch] text-[0.8rem] leading-relaxed text-ink-3 md:mt-6 ${item(6).className}`}
              style={item(6).style}
            >
              {site.qualifier}
            </p>
          </div>

          <div
            className="anim-fade-up relative min-w-0 lg:col-span-8"
            style={{ animationDelay: "320ms", animationDuration: "900ms" }}
          >
            <CatalogPipeline />
          </div>
        </div>

        {/* mobile capability checklist, directly under first viewport */}
        <ul
          aria-label="What is handled"
          className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-line pt-6 sm:hidden"
        >
          {["Cleanup", "Descriptions", "Variants", "Images", "Categories", "Upload", "QA"].map(
            (c) => (
              <li key={c} className="flex items-center gap-2 text-[0.95rem] text-ink">
                <span aria-hidden className="text-success">
                  ✓
                </span>
                {c}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

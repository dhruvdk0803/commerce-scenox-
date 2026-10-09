"use client";

import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, TextLink } from "@/components/ui/Button";
import { CatalogPipeline } from "./pipeline/CatalogPipeline";

/** Services beyond the catalog, surfaced in the hero so the full offer is visible above the fold. */
const AFTER_LAUNCH = [
  { label: "Product photos", note: "Clean, consistent sets", href: "/ai-product-photos" },
  { label: "Google & marketplaces", note: "Shopping, Meta, Amazon", href: "/product-feed-management" },
  { label: "Email & carts", note: "Recovery and win-back", href: "/ecommerce-email-marketing" },
  { label: "WhatsApp", note: "COD, carts, order updates", href: "/whatsapp-automation" },
  { label: "AI support", note: "Questions answered 24/7", href: "/ai-customer-support" },
];

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
              <span className="block">1,000 IN 48 HOURS.*</span>
            </>
          ) : (
            <>
              <span className="block">1000 PRODUCTS.</span>
              <span className="block">48 HOURS.</span>
              <span className="block">
                LIVE ON YOUR STORE.
              </span>
            </>
          )}
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
                className={`mt-5 max-w-[38ch] text-[1.05rem] leading-[1.5] text-ink-2 ${item(3).className}`}
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
              <TextLink href="/how-it-works" className="max-sm:self-center">
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

        {!compact && (
          <nav
            aria-label="After launch"
            className={`mt-10 grid overflow-hidden rounded-[12px] border border-line bg-bg-elevated md:mt-14 lg:grid-cols-[14rem_1fr] ${item(7).className}`}
            style={item(7).style}
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 lg:flex-col lg:items-start lg:justify-center lg:border-b-0 lg:border-r">
              <p className="mono-micro text-ink-3">AFTER LAUNCH</p>
              <p className="text-[0.95rem] font-medium tracking-[-0.01em] text-ink lg:mt-1">We keep it selling.</p>
            </div>
            <ul className="grid grid-cols-2 gap-px bg-line md:grid-cols-5">
              {AFTER_LAUNCH.map((a, i) => (
                <li key={a.href} className="bg-bg-elevated last:col-span-2 md:last:col-span-1">
                  <Link
                    href={a.href}
                    className="group flex h-full flex-col gap-1 px-5 py-4 transition-colors duration-[160ms] hover:bg-bg-muted/60"
                  >
                    <span className="flex items-center justify-between">
                      <span className="mono-micro text-ink-3 tabular">{String(i + 1).padStart(2, "0")}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 text-ink-3 transition-[transform,color] duration-[200ms] ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="mt-1 text-[0.95rem] font-medium tracking-[-0.01em] text-ink">{a.label}</span>
                    <span className="text-[0.825rem] leading-snug text-ink-3">{a.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

      </div>
    </section>
  );
}

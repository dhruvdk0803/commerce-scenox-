"use client";

import type { CSSProperties } from "react";
import { PlatformList } from "@/components/ui/PlatformList";
import { site } from "@/lib/site";
import Link from "next/link";
import { Camera, Check, Headset, Mail, MessageCircle, Mic, Store } from "lucide-react";
import { Button, TextLink } from "@/components/ui/Button";
import { CatalogPipeline } from "./pipeline/CatalogPipeline";

/** Services beyond the catalog, surfaced in the hero so the full offer is visible above the fold. */
const AFTER_LAUNCH = [
  { label: "Photos", href: "/ai-product-photos", icon: Camera },
  { label: "Marketplaces", href: "/product-feed-management", icon: Store },
  { label: "Email & carts", href: "/ecommerce-email-marketing", icon: Mail },
  { label: "WhatsApp", href: "/whatsapp-automation", icon: MessageCircle },
  { label: "AI support", href: "/ai-customer-support", icon: Headset },
  { label: "Voice & chat", href: "/ai-voice-shopping-assistant", icon: Mic },
];

const PROMISES = ["Free 10-product sample", "Fixed quote before work", "No store passwords"];

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
              <span className="block text-accent">48 HOURS.</span>
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
              <PlatformList />
            </p>

            {!compact && (
              <p
                className={`mt-5 max-w-[38ch] text-[1.05rem] leading-[1.5] text-ink-2 ${item(3).className}`}
                style={item(3).style}
              >
                Send spreadsheets, supplier files or photos. Our AI engine cleans,
                structures and enriches every product. Our team checks it and
                takes it live.
              </p>
            )}

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

            <ul
              className={`mt-6 flex flex-wrap gap-x-5 gap-y-2 ${item(6).className}`}
              style={item(6).style}
              aria-label="What you can count on"
            >
              {PROMISES.map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-[0.875rem] text-ink">
                  <Check aria-hidden className="size-3.5 text-success" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>

            <p
              className={`mt-4 max-w-[44ch] text-[0.75rem] leading-relaxed text-ink-3 ${item(6).className}`}
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
            className={`mt-10 flex flex-col gap-4 border-t border-line pt-6 md:mt-14 lg:flex-row lg:items-center lg:gap-8 ${item(7).className}`}
            style={item(7).style}
          >
            <p className="shrink-0 text-[1rem] font-medium tracking-[-0.01em] text-ink">
              Live is day one. <span className="text-ink-3">Then we run:</span>
            </p>
            <ul className="flex flex-wrap gap-2">
              {AFTER_LAUNCH.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex h-10 items-center gap-2 rounded-full border border-line bg-bg-elevated pl-2 pr-3.5 text-[0.9rem] text-ink transition-[border-color,background-color] duration-[160ms] hover:border-accent hover:bg-bg-tint"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-bg-tint text-accent transition-colors duration-[160ms] group-hover:bg-accent group-hover:text-white">
                      <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                    </span>
                    {label}
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

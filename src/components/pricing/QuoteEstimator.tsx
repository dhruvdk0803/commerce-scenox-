"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/markets";
import { useMarket } from "@/components/market/MarketProvider";
import { Button, TextLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { tiers } from "@/content/pricing";
import { products } from "@/content/products";
import { site } from "@/lib/site";

const SIZES = [
  { tier: "starter", label: "Up to 250", n: 250 },
  { tier: "growth", label: "Up to 500", n: 500 },
  { tier: "launch", label: "Up to 1,000", n: 1000 },
  { tier: "scale", label: "1,000+", n: 0 },
] as const;

const product = (id: string) => products.find((p) => p.id === id)!;

/** Add-ons, priced from the same product data as every other page. */
const ADDONS = [
  { id: "imagery", label: "Product photos", note: "per 50 products", qty: (n: number) => Math.max(1, Math.ceil(n / 50)) },
  { id: "feeds", label: "Google + Meta feeds", note: "2 channels", qty: () => 2 },
  { id: "email", label: "Email & cart recovery", note: "8 flows", qty: () => 1 },
  { id: "whatsapp", label: "WhatsApp automation", note: "setup", qty: () => 1 },
  { id: "support", label: "AI customer support", note: "setup", qty: () => 1 },
  { id: "voice", label: "Voice & chat shopping", note: "setup", qty: () => 1 },
] as const;

type AddonId = (typeof ADDONS)[number]["id"];

export function QuoteEstimator({ tone = "default" }: { tone?: "default" | "muted" }) {
  const market = useMarket();
  const reduce = useReducedMotion();
  const [size, setSize] = useState<(typeof SIZES)[number]["tier"]>("launch");
  const [picked, setPicked] = useState<AddonId[]>([]);

  const s = SIZES.find((x) => x.tier === size)!;
  const tier = tiers.find((t) => t.id === size)!;
  const catalogPrice = tier.price[market.id];

  const lines = useMemo(() => {
    // Scale has no list price; estimate add-ons at the 1,000-product level and say so
    const n = s.n || 1000;
    return [
      { label: `${tier.name} catalog listing`, amount: catalogPrice },
      ...ADDONS.filter((a) => picked.includes(a.id)).map((a) => {
        const unit = product(a.id).price[market.id];
        const q = a.qty(n);
        return { label: q > 1 ? `${a.label} × ${q}` : a.label, amount: unit == null ? null : unit * q };
      }),
    ];
  }, [s.n, tier.name, catalogPrice, picked, market.id]);

  const known = lines.filter((l) => l.amount != null).reduce((sum, l) => sum + (l.amount ?? 0), 0);
  const custom = catalogPrice == null;
  const total = formatPrice(known, market.id);

  const href = useMemo(() => {
    const q = new URLSearchParams({ tier: size });
    const needs = ["upload", ...picked];
    q.set("need", needs.join(","));
    q.set("est", `${custom ? `${total} + catalog quote` : total} · ${lines.map((l) => l.label).join(", ")}`);
    return `/get-started?${q.toString()}`;
  }, [size, picked, total, custom, lines]);

  const toggle = (id: AddonId) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <section
      id="estimate"
      className={cn("section-y scroll-mt-20", tone === "muted" && "border-t border-line bg-bg-muted/40")}
      aria-labelledby="estimate-heading"
    >
      <div className="container-x">
        <SectionHeader
          id="estimate-heading"
          eyebrow="ESTIMATE IN 20 SECONDS"
          title={
            <>
              What would your
              <span className="block text-ink-2">project cost?</span>
            </>
          }
          description={`Starting prices in ${market.currency}. Your fixed quote follows once we've seen your files, before any work starts.`}
          action={<TextLink href="/pricing">Full pricing, kits and monthly plans</TextLink>}
        />

        <Reveal delay={0.06} className="mt-12 grid overflow-hidden rounded-[14px] border border-line bg-bg-elevated md:mt-16 lg:grid-cols-[minmax(0,1fr)_24rem]">
          {/* inputs */}
          <div className="p-5 md:p-8">
            <fieldset>
              <legend className="mono-label text-ink-2">01 · HOW MANY PRODUCTS?</legend>
              <div role="radiogroup" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SIZES.map((x) => {
                  const on = x.tier === size;
                  return (
                    <button
                      key={x.tier}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setSize(x.tier)}
                      className={cn(
                        "flex h-14 flex-col items-start justify-center rounded-[10px] border px-3.5 text-left transition-[border-color,background-color,transform] duration-[160ms] active:scale-[0.98]",
                        on ? "border-ink bg-ink text-paper" : "border-line bg-bg hover:border-line-strong",
                      )}
                    >
                      <span className="text-[0.975rem] font-medium tracking-[-0.01em]">{x.label}</span>
                      <span className={cn("mono-micro mt-0.5", on ? "text-paper-2" : "text-ink-3")}>PRODUCTS</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend className="mono-label text-ink-2">02 · ADD WHAT ELSE YOU NEED</legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {ADDONS.map((a) => {
                  const on = picked.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle(a.id)}
                      className={cn(
                        "flex min-h-[3.25rem] items-center justify-between gap-3 rounded-[10px] border px-3.5 py-2 text-left transition-[border-color,background-color,transform] duration-[160ms] active:scale-[0.99]",
                        on ? "border-ink bg-bg" : "border-line bg-bg hover:border-line-strong",
                      )}
                    >
                      <span className="flex flex-col">
                        <span className="text-[0.95rem] font-medium tracking-[-0.01em] text-ink">{a.label}</span>
                        <span className="mono-micro mt-0.5 text-ink-3">
                          {formatPrice(product(a.id).price[market.id] ?? 0, market.id)} · {a.note.toUpperCase()}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-[5px] border transition-colors duration-[160ms]",
                          on ? "border-ink bg-ink text-paper" : "border-line-strong",
                        )}
                      >
                        <Check className={cn("size-3.5", on ? "opacity-100" : "opacity-0")} strokeWidth={3} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* result */}
          <div className="flex flex-col border-t border-line bg-bg-dark p-5 text-paper md:p-8 lg:border-l lg:border-t-0">
            <p className="mono-label text-paper-2">ESTIMATED STARTING PRICE</p>
            <p className="mt-3 text-[clamp(2.4rem,1.6rem+2.4vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] tabular" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={total + custom}
                  className="inline-block"
                  initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={{ opacity: 0, transform: "translateY(-8px)" }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                >
                  {total}
                  {custom && <span className="text-[0.45em] font-medium tracking-[-0.02em] text-paper-2"> + catalog quote</span>}
                </motion.span>
              </AnimatePresence>
            </p>
            <p className="mono-micro mt-2 text-paper-2">ONE-TIME · {market.currency}</p>

            <ul className="mt-6 flex flex-col divide-y divide-line-dark border-y border-line-dark">
              {lines.map((l) => (
                <li key={l.label} className="flex items-baseline justify-between gap-4 py-2.5 text-[0.9rem]">
                  <span className="min-w-0 text-paper-2">{l.label}</span>
                  <span className="shrink-0 tabular text-paper">{l.amount == null ? "Quoted" : formatPrice(l.amount, market.id)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <Button href={href} size="lg" arrow className="w-full" event="cta_click" eventParams={{ cta: "estimator", tier: size, addons: picked.length }}>
                Get my fixed quote
              </Button>
              <p className="mt-3 text-[0.75rem] leading-relaxed text-paper-2">
                Estimate only. Final price depends on your data, variants and platform. {site.qualifier}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

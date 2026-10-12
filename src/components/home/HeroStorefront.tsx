"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { img } from "@/lib/images";
import { formatPrice } from "@/lib/markets";
import { useMarket } from "@/components/market/MarketProvider";
import { cn } from "@/lib/utils";

/*
 * The hero shows the outcome, not the input: a finished product page and a
 * few more products from the same catalog, all live. Photos are generated
 * examples (illustrative), never presented as client work.
 */
const DRESS_PRICE = { in: 3499, us: 89, uk: 72, au: 139 };

const MORE = [
  { photo: img.modelMan, name: "Olive Cotton Bomber Jacket", path: "Men › Jackets", portrait: true },
  { photo: img.tote, name: "Tan Leather Tote", path: "Women › Bags" },
  { photo: img.kurta, name: "Ivory Block-Print Kurta", path: "Women › Ethnic" },
] as const;

const SWATCHES = ["bg-[#9caf88]", "bg-[#ede6d8]", "bg-[#c2410c]"];
const SIZES = ["XS", "S", "M", "L", "XL"];

function LiveBadge({ className }: { className?: string }) {
  return (
    <span className={cn("mono-micro inline-flex items-center gap-1.5 rounded-full bg-bg-elevated px-2.5 py-1 text-success", className)}>
      <span className="size-1.5 rounded-full bg-success" />
      LIVE
    </span>
  );
}

export function HeroStorefront() {
  const market = useMarket();

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-4">
      {/* the finished product page */}
      <div className="flex flex-col overflow-hidden rounded-[18px] border border-line bg-bg-elevated">
        <div className="flex h-10 items-center justify-between border-b border-line px-4">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
          </span>
          <span className="mono-micro truncate px-3 text-ink-3">yourstore.com/products/sage-linen-wrap-dress</span>
          <span className="mono-micro hidden text-success sm:inline">● PUBLISHED</span>
        </div>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)] sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="relative aspect-square bg-[#e9e3d8] sm:aspect-auto sm:min-h-[22rem]">
            <Image
              src={img.modelWoman}
              alt="Model wearing a sage green linen wrap midi dress with a tan leather tote"
              fill
              priority
              sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover object-top"
            />
            <span className="mono-micro absolute left-3 top-3 rounded-full bg-bg-elevated px-2.5 py-1 text-ink-2">1 / 6</span>
          </div>

          <div className="flex flex-col justify-center p-5 md:p-6">
            <p className="mono-micro text-ink-3">WOMEN › DRESSES › MIDI</p>
            <p className="mt-2 text-[1.35rem] font-semibold leading-tight tracking-[-0.025em] text-ink">Sage Linen Wrap Midi Dress</p>
            <p className="mt-2 flex items-baseline gap-3">
              <span className="text-[1.1rem] font-semibold tabular text-ink">{formatPrice(DRESS_PRICE[market.id], market.id)}</span>
              <span className="mono-micro text-success">IN STOCK</span>
            </p>

            <div className="mt-5">
              <p className="mono-micro text-ink-3">COLOUR · SAGE</p>
              <div className="mt-2 flex gap-2">
                {SWATCHES.map((c, i) => (
                  <span key={c} aria-hidden className={cn("size-6 rounded-full border border-black/10", c, i === 0 && "ring-2 ring-ink ring-offset-2 ring-offset-bg-elevated")} />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mono-micro text-ink-3">SIZE</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SIZES.map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "grid h-8 min-w-9 place-items-center rounded-[8px] border px-2 text-[0.8rem] font-medium",
                      s === "M" ? "border-ink bg-ink text-paper" : "border-line text-ink-2",
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-5 flex flex-col gap-1.5 border-t max-sm:hidden border-line pt-4 text-[0.85rem] text-ink-2">
              {["Description, fabric & care written", "Size chart and variants mapped", "SEO title and Google category set"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* more of the same catalog, already live */}
      <div className="grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-4">
        {MORE.map((p) => (
          <div key={p.name} className="relative min-h-[8.5rem] overflow-hidden rounded-[14px] border border-line bg-[#efebe4]">
            <Image
              src={p.photo}
              alt={p.name}
              fill
              sizes="(min-width: 768px) 208px, 30vw"
              className={cn("object-cover", "portrait" in p ? "object-top" : "mix-blend-multiply")}
            />
            <LiveBadge className="absolute right-2 top-2 max-sm:hidden" />
            <div className="absolute inset-x-2 bottom-2 rounded-[10px] bg-bg-elevated px-2.5 py-1.5 max-sm:hidden">
              <p className="truncate text-[0.8rem] font-medium text-ink">{p.name}</p>
              <p className="mono-micro truncate text-ink-3">{p.path.toUpperCase()}</p>
            </div>
          </div>
        ))}
        <div className="col-span-3 flex items-center justify-between gap-2 whitespace-nowrap rounded-[14px] bg-bg-dark px-4 py-3 text-paper md:col-span-1">
          <span className="font-mono text-[0.8rem] tabular">
            1,000 <span className="text-paper-2">/ 1,000</span>
          </span>
          <span className="mono-micro text-[#5fd39b]">PUBLISHED</span>
        </div>
      </div>
    </div>
  );
}

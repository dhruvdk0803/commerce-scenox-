"use client";

import { usePathname } from "next/navigation";
import { MARKETS, MARKET_IDS } from "@/lib/markets";
import { cn } from "@/lib/utils";
import { useMarket } from "./MarketProvider";

/**
 * Low-key region switcher. Links go to `/{market}{path}`, which the proxy
 * turns into a saved preference and a redirect back to the same page.
 * Plain anchors on purpose: the choice has to pass through the proxy.
 */
export function MarketSwitcher({ className }: { className?: string }) {
  const current = useMarket();
  const pathname = usePathname() ?? "/";
  const path = pathname === "/" ? "" : pathname;

  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      <span className="mono-micro text-ink-3">
        PRICES IN {current.currency} · {current.label.toUpperCase()}
      </span>
      <span aria-hidden className="h-3 w-px bg-line-strong" />
      <nav aria-label="Change region" className="flex items-center gap-1">
        {MARKET_IDS.map((id) => {
          const m = MARKETS[id];
          const active = id === current.id;
          return active ? (
            <span
              key={id}
              aria-current="true"
              className="mono-micro inline-flex h-6 items-center rounded-[4px] border border-ink px-1.5 text-ink"
            >
              {m.short}
            </span>
          ) : (
            <a
              key={id}
              href={`/${id}${path}`}
              hrefLang={m.locale}
              className="mono-micro inline-flex h-6 items-center rounded-[4px] border border-transparent px-1.5 text-ink-3 transition-colors duration-[160ms] hover:border-line hover:text-ink"
              aria-label={`Show prices for ${m.label}`}
            >
              {m.short}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

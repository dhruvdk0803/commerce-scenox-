"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEV_MARKET, MARKETS, formatPrice, type MarketId, type PriceSet } from "@/lib/markets";

const MarketContext = createContext<MarketId>(DEV_MARKET);

export function MarketProvider({ market, children }: { market: MarketId; children: ReactNode }) {
  return <MarketContext.Provider value={market}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const id = useContext(MarketContext);
  return MARKETS[id];
}

/** Formats a PriceSet for the current market; `fallback` when the market has no fixed price. */
export function usePrice() {
  const id = useContext(MarketContext);
  return (set: PriceSet, fallback = "Custom quote") => {
    const amount = set[id];
    return amount == null ? fallback : formatPrice(amount, id);
  };
}

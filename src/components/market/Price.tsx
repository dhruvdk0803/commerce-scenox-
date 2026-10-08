"use client";

import type { PriceSet } from "@/lib/markets";
import { usePrice } from "./MarketProvider";

/** Renders a PriceSet in the visitor's market. Usable from Server Components. */
export function Price({ set, fallback }: { set: PriceSet; fallback?: string }) {
  const price = usePrice();
  return <>{price(set, fallback)}</>;
}

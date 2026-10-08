import { market as marketParam } from "next/root-params";
import { DEV_MARKET, MARKETS, formatPrice, isMarket, type MarketId, type PriceSet } from "./markets";

/** Current market for Server Components (from the `[market]` root segment). */
export async function getMarketId(): Promise<MarketId> {
  const m = await marketParam();
  return isMarket(m) ? m : DEV_MARKET;
}

export async function getMarket() {
  return MARKETS[await getMarketId()];
}

export async function getPrice(set: PriceSet, fallback = "Custom quote") {
  const id = await getMarketId();
  const amount = set[id];
  return amount == null ? fallback : formatPrice(amount, id);
}

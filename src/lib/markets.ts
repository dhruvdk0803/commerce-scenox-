/**
 * Pricing markets. Each visitor is served exactly one market (chosen by the
 * proxy from a saved choice or their IP country) and only ever sees that
 * market's prices. URLs stay the same for every market.
 */
export const MARKETS = {
  in: { id: "in", label: "India", short: "IN", currency: "INR", locale: "en-IN", symbol: "₹", dial: "+91" },
  us: { id: "us", label: "United States", short: "US", currency: "USD", locale: "en-US", symbol: "$", dial: "+1" },
  uk: { id: "uk", label: "United Kingdom", short: "UK", currency: "GBP", locale: "en-GB", symbol: "£", dial: "+44" },
  au: { id: "au", label: "Australia", short: "AU", currency: "AUD", locale: "en-AU", symbol: "A$", dial: "+61" },
} as const;

export type MarketId = keyof typeof MARKETS;
export type Market = (typeof MARKETS)[MarketId];

export const MARKET_IDS = Object.keys(MARKETS) as MarketId[];

/** Market used when the visitor's country isn't one of ours. */
export const FALLBACK_MARKET: MarketId = "us";
/** Market used when no country information exists at all (local dev). */
export const DEV_MARKET: MarketId = "in";

export const MARKET_COOKIE = "scx_market";

/** ISO 3166 country code → market. Unlisted countries use FALLBACK_MARKET. */
const COUNTRY_TO_MARKET: Record<string, MarketId> = {
  IN: "in",
  US: "us",
  GB: "uk",
  IE: "uk",
  AU: "au",
  NZ: "au",
};

export function isMarket(v: string | undefined | null): v is MarketId {
  return !!v && v in MARKETS;
}

export function marketForCountry(country: string | null | undefined): MarketId {
  if (!country) return DEV_MARKET;
  return COUNTRY_TO_MARKET[country.toUpperCase()] ?? FALLBACK_MARKET;
}

/** Per-market amount. `null` means "custom quote". */
export type PriceSet = Record<MarketId, number | null>;

export function formatPrice(amount: number, marketId: MarketId) {
  const m = MARKETS[marketId];
  const n = new Intl.NumberFormat(m.locale, { maximumFractionDigits: 0 }).format(amount);
  return `${m.symbol}${n}`;
}

import { MARKET_IDS, type MarketId, type PriceSet } from "@/lib/markets";
import { tiers } from "./pricing";
import { products } from "./products";

/**
 * Bundles: fixed combinations of products at one price. The "bought
 * separately" figure is computed from the real product prices, so the
 * saving shown is always accurate. PROPOSED prices, pending sign-off.
 */

export type BundlePart = { label: string; price: PriceSet; qty: number; href: string };

export type Bundle = {
  id: string;
  name: string;
  tagline: string;
  forWho: string;
  price: PriceSet;
  parts: BundlePart[];
  outcome: string;
  popular?: boolean;
};

const product = (id: string) => {
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown product ${id}`);
  return p;
};

const launchTier = tiers.find((t) => t.id === "launch")!;

const launchParts: BundlePart[] = [
  { label: "Catalog Launch · up to 1,000 products", price: launchTier.price, qty: 1, href: "/catalog" },
  { label: "AI Product Imagery · 200 products", price: product("imagery").price, qty: 4, href: "/product-imagery" },
  { label: "Google Shopping + Meta catalog feeds", price: product("feeds").price, qty: 2, href: "/feeds-marketplaces" },
];

const revenueParts: BundlePart[] = [
  { label: "Email & abandoned cart · 8 flows", price: product("email").price, qty: 1, href: "/email-marketing" },
  { label: "WhatsApp automation", price: product("whatsapp").price, qty: 1, href: "/whatsapp-automation" },
  { label: "AI customer support", price: product("support").price, qty: 1, href: "/ai-customer-support" },
];

export const bundles: Bundle[] = [
  {
    id: "launch-kit",
    name: "Launch Kit",
    tagline: "Get the store selling.",
    forWho: "New stores and new product lines",
    price: { in: 34999, us: 899, uk: 719, au: 1349 },
    parts: launchParts,
    outcome: "Every product live with clean photos, and showing on Google Shopping and Meta.",
  },
  {
    id: "revenue-kit",
    name: "Revenue Kit",
    tagline: "Keep the customers you paid for.",
    forWho: "Live stores with traffic but leaky carts",
    price: { in: 24999, us: 699, uk: 579, au: 1049 },
    parts: revenueParts,
    outcome: "Abandoned carts followed up, COD orders confirmed and every question answered, around the clock.",
  },
  {
    id: "complete-kit",
    name: "Complete Kit",
    tagline: "The whole cycle, in one go.",
    forWho: "Brands launching or relaunching properly",
    price: { in: 54999, us: 1499, uk: 1199, au: 2249 },
    parts: [...launchParts, ...revenueParts],
    outcome: "Catalog, channels and retention set up together, by one team, on one timeline.",
    popular: true,
  },
];

/** What the parts would cost bought one by one, per market. */
export function separatePrice(b: Bundle): PriceSet {
  return Object.fromEntries(
    MARKET_IDS.map((m: MarketId) => [
      m,
      b.parts.reduce((sum, p) => (sum == null || p.price[m] == null ? null : sum + p.price[m]! * p.qty), 0 as number | null),
    ]),
  ) as PriceSet;
}

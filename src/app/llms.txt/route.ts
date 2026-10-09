import { site } from "@/lib/site";
import { MARKETS, MARKET_IDS, formatPrice, type PriceSet } from "@/lib/markets";
import { products } from "@/content/products";
import { bundles } from "@/content/bundles";
import { plans, tiers } from "@/content/pricing";
import { faqs } from "@/content/faqs";

export const dynamic = "force-static";

const prices = (p: PriceSet) =>
  MARKET_IDS.map((m) => (p[m] == null ? null : `${formatPrice(p[m]!, m)} (${MARKETS[m].label})`))
    .filter(Boolean)
    .join(", ");

/** llms.txt: a plain-text brief for AI assistants and answer engines. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Website: ${site.url}`,
    `Contact: ${site.email}`,
    `Part of: ${site.parent} (${site.parentUrl})`,
    `Platforms: ${site.platforms.join(", ")}`,
    `Markets and currencies: ${MARKET_IDS.map((m) => `${MARKETS[m].label} (${MARKETS[m].currency})`).join(", ")}`,
    `Delivery: from 48 hours. ${site.qualifier}`,
    "",
    "## Services",
    ...products.map((p) => `- [${p.name}](${site.url}${p.href}): ${p.desc} Starting from ${prices(p.price)}, ${p.unit}.`),
    "",
    "## Catalog upload tiers",
    ...tiers.map((t) => `- ${t.name} (${t.range}): ${t.price.in == null ? "custom quote" : `from ${prices(t.price)}`}`),
    "",
    "## Kits (one-time bundles)",
    ...bundles.map((b) => `- ${b.name}: ${b.outcome} ${prices(b.price)}. Includes: ${b.parts.map((x) => x.label).join("; ")}.`),
    "",
    "## Monthly plans",
    ...plans.map((p) => `- ${p.name}: ${p.forWho}. ${prices(p.price)} per month. Includes: ${p.includes.join("; ")}.`),
    "",
    "## How it works",
    "An AI engine does the repetitive work (parsing files, mapping categories, drafting descriptions, matching images, building flows). A person reviews every flagged item and the client approves before anything goes live. Data is used only for the client's project and never to train third-party models.",
    "",
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Key pages",
    `- [All services](${site.url}/services)`,
    `- [Pricing](${site.url}/pricing)`,
    `- [How it works](${site.url}/how-it-works)`,
    `- [Free 10-product sample](${site.url}/free-sample)`,
    `- [Get started](${site.url}/get-started)`,
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

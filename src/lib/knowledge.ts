import { site } from "@/lib/site";
import { MARKETS, MARKET_IDS, formatPrice, type PriceSet } from "@/lib/markets";
import { productPages, products } from "@/content/products";
import { bundles } from "@/content/bundles";
import { plans, pricingFactors, tiers } from "@/content/pricing";
import { faqs, pricingFaqs } from "@/content/faqs";

const prices = (p: PriceSet) =>
  MARKET_IDS.map((m) => (p[m] == null ? null : `${formatPrice(p[m]!, m)} (${MARKETS[m].label})`))
    .filter(Boolean)
    .join(", ");

/**
 * Everything the site says about the offer, as plain text. One source for
 * llms.txt and the website assistant, so neither can drift from the pages.
 */
export function knowledgeLines({ detailed = false }: { detailed?: boolean } = {}): string[] {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Website: ${site.url}`,
    `Contact: ${site.email}`,
    `Part of: ${site.parent} (${site.parentUrl})`,
    `Platforms: Shopify, WooCommerce, Magento (Adobe Commerce), BigCommerce, Wix, plus Squarespace, PrestaShop, OpenCart and custom-built stores (custom platforms reviewed before approval)`,
    `Markets and currencies: ${MARKET_IDS.map((m) => `${MARKETS[m].label} (${MARKETS[m].currency})`).join(", ")}`,
    `Delivery: from 48 hours. ${site.qualifier}`,
    "",
    "## Services",
    ...products.map((p) => `- [${p.name}](${site.url}${p.href}): ${p.desc} Starting from ${prices(p.price)}, ${p.unit}.`),
    "",
    "## Catalog listing tiers",
    ...tiers.map((t) => `- ${t.name} (${t.range}): ${t.price.in == null ? "custom quote after a catalog audit" : `from ${prices(t.price)}`}. Includes: ${t.includes.join("; ")}.`),
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
  ];

  if (detailed) {
    lines.push(
      "## What changes a quote",
      ...pricingFactors.map((f) => `- ${f.label}: ${f.desc}`),
      "",
      "## Before you pay",
      "- Every project starts with a free inspection of the files and a fixed quote. Work starts only after the client accepts it.",
      "- Nothing is published without the client's approval. Revisions included are set out on the quote.",
      "- A free 10-product sample is available before committing: /free-sample",
      "- The client owns their data and the finished work.",
      "- We never ask for store admin passwords. Access is a scoped, revocable staff or collaborator account.",
      "",
      "## Service details",
      ...productPages.flatMap((p) => [
        `### ${p.name} (${p.href})`,
        p.lead,
        `${p.deliverables.title}: ${p.deliverables.items.join("; ")}.`,
        ...p.edges.map((e) => `- ${e.title}: ${e.body}`),
        ...p.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]),
        "",
      ]),
      "## Pricing questions",
      ...pricingFaqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]),
      "",
    );
  }

  lines.push(
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Key pages",
    `- [All services](${site.url}/services)`,
    `- [Pricing](${site.url}/pricing)`,
    `- [How it works](${site.url}/how-it-works)`,
    `- [Free 10-product sample](${site.url}/free-sample)`,
    `- [Get started](${site.url}/get-started)`,
    `- [Contact](${site.url}/contact)`,
  );
  if (site.bookingUrl) lines.push(`- [Book a call](${site.url}${site.bookingUrl})`);
  return lines;
}

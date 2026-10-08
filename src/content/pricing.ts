import type { PriceSet } from "@/lib/markets";

/*
 * All public prices live here, per market. Each visitor only sees their own
 * market's column. PROPOSED figures, pending sign-off from Scenox.
 *            India     USA     UK      Australia
 */

export type Tier = {
  id: string;
  name: string;
  range: string;
  price: PriceSet;
  priceNote: string;
  popular?: boolean;
  cta: string;
  href: string;
  includes: string[];
};

export const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    range: "Up to 250 products",
    price: { in: 6999, us: 149, uk: 119, au: 229 },
    priceNote: "Starting from",
    cta: "Get Started",
    href: "/get-started?tier=starter",
    includes: [
      "Data cleanup & normalization",
      "Titles, categories, tags",
      "Variant structuring",
      "Image matching",
      "Platform upload & QA",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    range: "Up to 500 products",
    price: { in: 9999, us: 249, uk: 199, au: 379 },
    priceNote: "Starting from",
    cta: "Get Started",
    href: "/get-started?tier=growth",
    includes: [
      "Everything in Starter",
      "AI-written descriptions, reviewed",
      "Collections & attributes",
      "SEO title & meta fields",
      "Approval round before publish",
    ],
  },
  {
    id: "launch",
    name: "Catalog Launch",
    range: "Up to 1,000 products",
    price: { in: 14999, us: 399, uk: 319, au: 599 },
    priceNote: "Starting from",
    popular: true,
    cta: "Get Started",
    href: "/get-started?tier=launch",
    includes: [
      "Everything in Growth",
      "Metafields & specifications",
      "Image preparation",
      "48-hour eligible turnaround*",
      "Post-publish QA report",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    range: "1,000+ products",
    price: { in: null, us: null, uk: null, au: null },
    priceNote: "Assessed per catalog",
    cta: "Request Assessment",
    href: "/get-started?tier=scale",
    includes: [
      "Multi-source consolidation",
      "ERP / supplier data mapping",
      "Batch publishing schedule",
      "Ongoing operations option",
      "Dedicated project review",
    ],
  },
];

export const pricingFactors = [
  { label: "Source-data quality", desc: "Clean exports cost less than fragmented files." },
  { label: "Catalog complexity", desc: "Deep category trees and many attributes take longer." },
  { label: "Number of variants", desc: "Size × colour × material multiplies the work." },
  { label: "Image work", desc: "Matching, renaming, resizing and background cleanup." },
  { label: "Enrichment", desc: "Descriptions, specifications and SEO fields." },
  { label: "Target platform", desc: "Shopify, WooCommerce or a custom import format." },
  { label: "Custom requirements", desc: "Approval flows, metafield schemas, staged publishing." },
];

/* ------------------------------------------------------------------ */
/* Monthly plans                                                       */
/* ------------------------------------------------------------------ */

export type Plan = {
  id: string;
  name: string;
  forWho: string;
  price: PriceSet;
  popular?: boolean;
  href: string;
  includes: string[];
};

export const plans: Plan[] = [
  {
    id: "catalog-ops",
    name: "Catalog Ops",
    forWho: "Stores adding and changing products every month",
    price: { in: 7999, us: 199, uk: 159, au: 299 },
    href: "/get-started?plan=catalog-ops",
    includes: [
      "Up to 300 new or updated SKUs a month",
      "Supplier price & stock file processing",
      "Weekly catalog health scan, issues fixed",
      "Feed sync to Google & Meta",
      "Monthly change report",
    ],
  },
  {
    id: "retention",
    name: "Retention",
    forWho: "Stores that want repeat buyers and fewer lost carts",
    price: { in: 14999, us: 449, uk: 359, au: 679 },
    href: "/get-started?plan=retention",
    includes: [
      "Email + WhatsApp flows running and tuned",
      "4 campaigns a month, written and sent",
      "Abandoned cart & checkout recovery",
      "Recovered-revenue reporting",
      "Sending on our infrastructure",
    ],
  },
  {
    id: "growth-stack",
    name: "Growth Stack",
    forWho: "One team for the catalog, channels and retention",
    price: { in: 29999, us: 899, uk: 719, au: 1349 },
    popular: true,
    href: "/get-started?plan=growth-stack",
    includes: [
      "Everything in Catalog Ops and Retention",
      "Marketplace listings kept in sync",
      "AI imagery for new products",
      "8 campaigns a month",
      "Priority turnaround, one point of contact",
    ],
  },
];

export const planNote =
  "Monthly, cancel with 30 days' notice. WhatsApp conversation fees charged by Meta are passed through at cost.";

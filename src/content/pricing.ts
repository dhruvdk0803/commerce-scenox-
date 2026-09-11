export type Tier = {
  id: string;
  name: string;
  range: string;
  price: string;
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
    price: "₹6,999",
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
    price: "₹9,999",
    priceNote: "Starting from",
    cta: "Get Started",
    href: "/get-started?tier=growth",
    includes: [
      "Everything in Starter",
      "Description preparation",
      "Collections & attributes",
      "SEO title & meta fields",
      "Approval round before publish",
    ],
  },
  {
    id: "launch",
    name: "Catalog Launch",
    range: "Up to 1,000 products",
    price: "₹14,999",
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
    price: "Custom quote",
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

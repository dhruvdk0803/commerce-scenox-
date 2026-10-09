export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: "Can you really upload 1,000 products in 48 hours?",
    a: "For eligible catalogs, yes. Eligibility depends on how clean the source data is, how many variants and images are involved, and whether the target platform is ready. We confirm the realistic turnaround after inspecting your files, before any work starts. It is a target we plan for, not an unconditional guarantee.",
  },
  {
    q: "What data can I send?",
    a: "Excel and CSV files, supplier or manufacturer catalogs, ERP exports, product PDFs, existing Shopify or WooCommerce exports, image folders, and links to supplier websites. Multiple fragmented sources are normal. We consolidate them.",
  },
  {
    q: "What if my catalog is messy?",
    a: "Most catalogs we receive are. Inconsistent naming, missing descriptions, duplicate SKUs and unmatched images are the standard starting point. Cleanup and normalization are core parts of the work, not extras.",
  },
  {
    q: "Do you use AI?",
    a: "Yes, as part of an engineered pipeline. Classification models map categories, language models draft descriptions and SEO fields, and matching models pair images with products. Every model output is reviewed by a person before it publishes, uncertain rows are flagged rather than guessed, and your data is never used to train third-party models.",
  },
  {
    q: "Do I need to prepare a Shopify CSV?",
    a: "No. Send what you have in whatever format you have it. Formatting for the target platform is our job.",
  },
  {
    q: "Can you write missing descriptions?",
    a: "Yes. We prepare product descriptions from the specifications, attributes and category context available in your data. You review and approve before anything is published.",
  },
  {
    q: "Can you handle variants?",
    a: "Yes. We consolidate duplicate rows into proper option structures such as colour, size and material, map them to the correct SKUs, prices and images, and validate them against platform limits.",
  },
  {
    q: "Can you process images?",
    a: "Yes. We match image files to products by SKU or name, rename them consistently, resize to platform requirements and flag products with missing images so nothing goes live incomplete.",
  },
  {
    q: "Do you support custom websites?",
    a: "Often. Custom platforms are reviewed before project approval to confirm an import path exists, whether that is a CSV/JSON import, an API or a structured handoff to your developers.",
  },
  {
    q: "Do you work with smaller catalogs?",
    a: "Yes. Projects start at around 50 products. The Starter tier covers catalogs up to 250 products.",
  },
  {
    q: "What about 10,000+ products?",
    a: "High-SKU catalogs are a strong fit. Large projects are assessed first, then scheduled in batches with a publishing plan. Wholesalers and distributors with 10,000 to 50,000+ SKUs are typical.",
  },
  {
    q: "Do you only do catalogs?",
    a: "The catalog is where we start, because every other channel depends on it. From the same clean product data we also run AI product imagery, Google Shopping and marketplace feeds, email marketing with abandoned cart recovery, WhatsApp automation and AI customer support.",
  },
  {
    q: "Do I need Klaviyo or a separate WhatsApp tool?",
    a: "No. Email and WhatsApp run on Scenox's own sending and messaging infrastructure, connected to your store. If you already use Klaviyo or Shopify Email, we can build there instead.",
  },
  {
    q: "Why do you cost less than an agency?",
    a: "An AI engine does the repetitive work agencies bill by the hour, and our team reviews the output instead of typing it. That's what makes us faster and cheaper without cutting corners on accuracy.",
  },
  {
    q: "Do you offer ongoing catalog management?",
    a: "Yes. Monthly plans cover new SKU onboarding, price and stock updates, a weekly catalog health scan, feed sync and, on the Retention and Growth Stack plans, your email and WhatsApp flows.",
  },
];

/** Homepage: the questions buyers ask first, across the whole offer. */
export const homeFaqs: FAQ[] = [
  "Can you really upload 1,000 products in 48 hours?",
  "Do you only do catalogs?",
  "Do you use AI?",
  "Why do you cost less than an agency?",
  "Do I need Klaviyo or a separate WhatsApp tool?",
  "What data can I send?",
  "What about 10,000+ products?",
  "Do you offer ongoing catalog management?",
].map((q) => {
  const f = faqs.find((x) => x.q === q);
  if (!f) throw new Error(`Missing FAQ: ${q}`);
  return f;
});

export const catalogPageFaqs: FAQ[] = faqs.filter((f) =>
  [
    "Can you really upload 1,000 products in 48 hours?",
    "What data can I send?",
    "What if my catalog is messy?",
    "Do I need to prepare a Shopify CSV?",
    "Can you handle variants?",
    "Do you support custom websites?",
  ].includes(f.q),
);

export const pricingFaqs: FAQ[] = [
  {
    q: "Why does pricing start from, rather than a fixed number?",
    a: "Because two 500-product catalogs can be very different. One arrives as a clean export with images named by SKU. Another arrives as four spreadsheets, a PDF and a folder of unnamed photos. We quote after inspecting the files so the number is accurate.",
  },
  {
    q: "Is this priced per product?",
    a: "No. We price completed catalog operations, not data-entry rows. The tiers reflect the scope of work required to get a catalog of that size live and checked.",
  },
  {
    q: "What happens after I submit the form?",
    a: "We review the scope, ask for a small sample of your data if needed, and reply with a fixed quote, a realistic turnaround and what we need from you to begin.",
  },
  {
    q: "Do you charge for the 10-product sample?",
    a: "The sample is free for projects that are a reasonable fit. It shows you exactly what your catalog will look like before you commit.",
  },
  {
    q: "Why are prices different in each country?",
    a: "We price each market for that market: India in INR, the US in USD, the UK in GBP and Australia in AUD. You see the prices for your region and you're invoiced in that currency. The scope of every product is the same everywhere.",
  },
];

export const site = {
  name: "Scenox Commerce",
  shortName: "SCENOX / COMMERCE",
  parent: "Scenox Studios",
  parentUrl: "https://scenoxstudios.com",
  url: "https://commerce.scenoxstudios.com",
  tagline: "Ecommerce operations, run by AI.",
  description:
    "Scenox Commerce runs the operations behind online stores: catalog upload and cleanup, product imagery, Google Shopping and marketplace feeds, email and abandoned cart recovery, and WhatsApp automation. An AI engine does the volume, a person reviews every output. Shopify, WooCommerce and custom platforms.",
  email: "commerce@scenoxstudios.com",
  /** Set to a full international number (e.g. "919999999999") to enable WhatsApp CTAs. Leave empty to hide. */
  whatsapp: "",
  platforms: ["Shopify", "WooCommerce", "Custom Websites"],
  qualifier:
    "For eligible catalogs. Turnaround varies based on catalog complexity and source-data quality.",
} as const;

export const nav = {
  services: [
    { label: "Catalog Upload", href: "/catalog", desc: "Spreadsheets and supplier data, live on your store.", group: "Catalog" },
    { label: "Catalog Cleanup & Enrichment", href: "/catalog-cleanup", desc: "Fix what is already online, in bulk.", group: "Catalog" },
    { label: "Platform Migration", href: "/migration", desc: "Move the store. Not the mess.", group: "Catalog" },
    { label: "AI Product Imagery", href: "/product-imagery", desc: "Consistent, marketplace-ready photos.", group: "Catalog" },
    { label: "Feeds & Marketplaces", href: "/feeds-marketplaces", desc: "Google Shopping, Meta, Amazon, Flipkart.", group: "Sell & Retain" },
    { label: "Email & Abandoned Cart", href: "/email-marketing", desc: "Recovery, welcome and win-back flows.", group: "Sell & Retain" },
    { label: "WhatsApp Automation", href: "/whatsapp-automation", desc: "Cart recovery, COD confirmation, updates.", group: "Sell & Retain" },
  ],
  more: [
    { label: "Monthly Plans", href: "/pricing#plans", desc: "Catalog, channels and retention, run for you." },
    { label: "For Wholesalers & Distributors", href: "/wholesale-catalog", desc: "Thousands of SKUs from ERP and supplier files." },
  ],
  primary: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  footer: {
    services: [
      { label: "Catalog Upload", href: "/catalog" },
      { label: "Catalog Cleanup", href: "/catalog-cleanup" },
      { label: "Migration", href: "/migration" },
      { label: "AI Product Imagery", href: "/product-imagery" },
      { label: "Feeds & Marketplaces", href: "/feeds-marketplaces" },
      { label: "Email & Abandoned Cart", href: "/email-marketing" },
      { label: "WhatsApp Automation", href: "/whatsapp-automation" },
      { label: "Wholesalers & Distributors", href: "/wholesale-catalog" },
    ],
    company: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing & Plans", href: "/pricing" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Get Started", href: "/get-started" },
      { label: "Scenox Studios", href: "https://scenoxstudios.com", external: true },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Data Handling / Security", href: "/data-handling" },
    ],
  },
} as const;

export const site = {
  name: "Scenox Commerce",
  shortName: "SCENOX / COMMERCE",
  parent: "Scenox Studios",
  parentUrl: "https://scenoxstudios.com",
  url: "https://commerce.scenoxstudios.com",
  tagline: "Catalog operations, automated.",
  description:
    "Scenox Commerce turns spreadsheets, supplier catalogs and product exports into clean, structured, store-ready catalogs on Shopify, WooCommerce and custom ecommerce platforms. An AI-powered catalog engine with human review on every output.",
  email: "commerce@scenoxstudios.com",
  /** Set to a full international number (e.g. "919999999999") to enable WhatsApp CTAs. Leave empty to hide. */
  whatsapp: "",
  platforms: ["Shopify", "WooCommerce", "Custom Websites"],
  qualifier:
    "For eligible catalogs. Turnaround varies based on catalog complexity and source-data quality.",
} as const;

export const nav = {
  services: [
    {
      label: "Catalog Upload",
      href: "/catalog",
      desc: "Spreadsheets and supplier data, live on your store.",
    },
    {
      label: "Catalog Cleanup & Enrichment",
      href: "/catalog-cleanup",
      desc: "Fix what is already online, in bulk.",
    },
    {
      label: "Platform Migration",
      href: "/migration",
      desc: "Move the store. Not the mess.",
    },
    {
      label: "For Wholesalers & Distributors",
      href: "/wholesale-catalog",
      desc: "Thousands of SKUs from ERP and supplier files.",
    },
    {
      label: "Ongoing Catalog Operations",
      href: "/get-started?need=ongoing",
      desc: "New SKUs, price updates and maintenance.",
    },
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
      { label: "Wholesalers & Distributors", href: "/wholesale-catalog" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Get Started", href: "/get-started" },
    ],
    company: [
      { label: "Scenox Studios", href: "https://scenoxstudios.com", external: true },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Data Handling / Security", href: "/data-handling" },
    ],
  },
} as const;

export const site = {
  name: "Scenox Commerce",
  shortName: "SCENOX / COMMERCE",
  parent: "Scenox Studios",
  parentUrl: "https://scenoxstudios.com",
  url: "https://commerce.scenoxstudios.com",
  tagline: "Ecommerce operations, run by AI.",
  description:
    "Scenox Commerce runs the operations behind online stores: catalog upload and cleanup, product imagery, Google Shopping and marketplace feeds, email and abandoned cart recovery, WhatsApp automation, AI customer support and AI voice and chat shopping assistants. An AI engine does the volume, a person reviews every output. Shopify, WooCommerce, Magento (Adobe Commerce), BigCommerce, Wix and custom platforms.",
  email: "commerce@scenoxstudios.com",
  /** Set to a full international number (e.g. "919999999999") to enable WhatsApp CTAs. Leave empty to hide. */
  whatsapp: "",
  /** Our booking page. Leave empty to hide every "Book a call" button. */
  bookingUrl: "/book",
  /** Google Calendar appointment schedule embedded on /book */
  bookingEmbed:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0UyY7hH4ObhaLK2fO4VTNt0-yH0v6fFeVjLv0X0he_jPTocGTqPtTymKDHhnUXg-6WG6jHptsg?gv=true",
  platforms: ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Wix", "Custom"],
  qualifier:
    "For eligible projects. Turnaround depends on scope, catalog complexity and the quality of the data and access we receive.",
} as const;

export const nav = {
  services: [
    { label: "Catalog Listing", href: "/bulk-product-upload", desc: "Spreadsheets and supplier data, live on your store.", group: "Catalog" },
    { label: "Catalog Cleanup & Enrichment", href: "/catalog-cleanup", desc: "Fix what is already online, in bulk.", group: "Catalog" },
    { label: "Platform Migration", href: "/store-migration", desc: "Move the store. Not the mess.", group: "Catalog" },
    { label: "AI Product Imagery", href: "/ai-product-photos", desc: "Consistent, marketplace-ready photos.", group: "Catalog" },
    { label: "Feeds & Marketplaces", href: "/product-feed-management", desc: "Google Shopping, Meta, Amazon, Flipkart.", group: "Sell & Retain" },
    { label: "Email & Abandoned Cart", href: "/ecommerce-email-marketing", desc: "Recovery, welcome and win-back flows.", group: "Sell & Retain" },
    { label: "WhatsApp Automation", href: "/whatsapp-automation", desc: "Cart recovery, COD confirmation, updates.", group: "Sell & Retain" },
    { label: "AI Customer Support", href: "/ai-customer-support", desc: "Order and product questions answered 24/7.", group: "Sell & Retain" },
    { label: "AI Voice & Chat Shopping", href: "/ai-voice-shopping-assistant", desc: "Shoppers buy in chat. Voice agents confirm orders.", group: "Sell & Retain" },
  ],
  more: [
    { label: "All Services", href: "/services", desc: "Every product, kit and plan on one page." },
    { label: "Monthly Plans", href: "/pricing#plans", desc: "Catalog, channels and retention, run for you." },
    { label: "For Wholesalers & Distributors", href: "/wholesale-catalog", desc: "Thousands of SKUs from ERP and supplier files." },
    { label: "By Platform, Industry & Country", href: "/solutions", desc: "Shopify, WooCommerce, fashion, India, UK and more." },
  ],
  primary: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Guides", href: "/guides" },
  ],
  footer: {
    services: [
      { label: "All Services", href: "/services" },
      { label: "Catalog Listing", href: "/bulk-product-upload" },
      { label: "Catalog Cleanup", href: "/catalog-cleanup" },
      { label: "Migration", href: "/store-migration" },
      { label: "AI Product Imagery", href: "/ai-product-photos" },
      { label: "Feeds & Marketplaces", href: "/product-feed-management" },
      { label: "Email & Abandoned Cart", href: "/ecommerce-email-marketing" },
      { label: "WhatsApp Automation", href: "/whatsapp-automation" },
      { label: "AI Customer Support", href: "/ai-customer-support" },
      { label: "AI Voice & Chat Shopping", href: "/ai-voice-shopping-assistant" },
      { label: "Wholesalers & Distributors", href: "/wholesale-catalog" },
      { label: "By Platform, Industry & Country", href: "/solutions" },
    ],
    company: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing & Plans", href: "/pricing" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Guides", href: "/guides" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Call", href: "/book" },
      { label: "Get a Quote", href: "/get-started" },
      { label: "Scenox Studios", href: "https://scenoxstudios.com", external: true },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Data Handling / Security", href: "/data-handling" },
    ],
  },
} as const;

export const PLATFORMS = ["Shopify", "WooCommerce", "Custom", "Not launched yet", "Other"] as const;

export const PRODUCT_COUNTS = [
  "1–50",
  "51–100",
  "101–250",
  "251–500",
  "501–1,000",
  "1,001–5,000",
  "5,001–10,000",
  "10,000+",
] as const;

export const SOURCES = [
  "CSV",
  "Excel",
  "PDF catalog",
  "Supplier data",
  "Existing store",
  "Images",
  "Multiple sources",
  "Other",
] as const;

export const NEEDS = [
  "New upload",
  "Catalog cleanup",
  "Migration",
  "Descriptions / content",
  "Images",
  "Categories",
  "Variants",
  "SEO",
  "Product imagery",
  "Google Shopping / marketplaces",
  "Email & abandoned cart",
  "WhatsApp automation",
  "Ongoing management",
  "Monthly plan",
  "Other",
] as const;

export const TIMELINES = [
  { value: "ASAP", label: "ASAP", meta: "THIS WEEK" },
  { value: "Within 1 week", label: "Within 1 week" },
  { value: "Within 1 month", label: "Within 1 month" },
  { value: "Exploring", label: "Exploring", meta: "NO DATE YET" },
] as const;

export const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Australia",
  "Canada",
  "Singapore",
  "Germany",
  "Netherlands",
  "Other",
] as const;

/** Map ?need=… query values to the NEEDS option label. */
export const NEED_QUERY_MAP: Record<string, (typeof NEEDS)[number]> = {
  ongoing: "Ongoing management",
  cleanup: "Catalog cleanup",
  migration: "Migration",
  wholesale: "New upload",
  agency: "New upload",
  upload: "New upload",
  imagery: "Product imagery",
  feeds: "Google Shopping / marketplaces",
  email: "Email & abandoned cart",
  whatsapp: "WhatsApp automation",
};

export const TIER_COUNT_MAP: Record<string, (typeof PRODUCT_COUNTS)[number]> = {
  starter: "101–250",
  growth: "251–500",
  launch: "501–1,000",
  scale: "1,001–5,000",
};

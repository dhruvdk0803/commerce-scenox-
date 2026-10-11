export const PLATFORMS = ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Wix / Squarespace", "Custom", "Not launched yet", "Other"] as const;

export const PRODUCT_COUNTS = [
  "1–50",
  "51–100",
  "101–250",
  "251–500",
  "501–1,000",
  "1,001–5,000",
  "5,001–10,000",
  "10,000+",
  "Not catalog work",
] as const;

export const SOURCES = [
  "CSV",
  "Excel",
  "PDF catalog",
  "Supplier data",
  "Existing store",
  "Multiple sources",
  "No files needed",
  "Other",
] as const;

export const NEEDS = [
  "Catalog listing",
  "Catalog cleanup",
  "Migration",
  "Product photos",
  "Google & marketplaces",
  "Email & carts",
  "WhatsApp",
  "AI support",
  "Voice & chat shopping",
  "Monthly plan",
  "Not sure yet",
] as const;

export const TIMELINES = [
  { value: "ASAP", label: "ASAP", meta: "THIS WEEK" },
  { value: "Within 1 week", label: "Within 1 week" },
  { value: "Within 1 month", label: "Within 1 month" },
  { value: "Exploring", label: "Exploring", meta: "NO DATE YET" },
] as const;

/** Phone country codes. Our four markets first, then alphabetical. */
export const DIAL_CODES = [
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "BD", name: "Bangladesh", dial: "+880" },
  { iso: "BE", name: "Belgium", dial: "+32" },
  { iso: "BR", name: "Brazil", dial: "+55" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "DK", name: "Denmark", dial: "+45" },
  { iso: "EG", name: "Egypt", dial: "+20" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "HK", name: "Hong Kong", dial: "+852" },
  { iso: "ID", name: "Indonesia", dial: "+62" },
  { iso: "IE", name: "Ireland", dial: "+353" },
  { iso: "IL", name: "Israel", dial: "+972" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "KE", name: "Kenya", dial: "+254" },
  { iso: "KW", name: "Kuwait", dial: "+965" },
  { iso: "MY", name: "Malaysia", dial: "+60" },
  { iso: "MX", name: "Mexico", dial: "+52" },
  { iso: "NP", name: "Nepal", dial: "+977" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "NZ", name: "New Zealand", dial: "+64" },
  { iso: "NG", name: "Nigeria", dial: "+234" },
  { iso: "NO", name: "Norway", dial: "+47" },
  { iso: "OM", name: "Oman", dial: "+968" },
  { iso: "PK", name: "Pakistan", dial: "+92" },
  { iso: "PH", name: "Philippines", dial: "+63" },
  { iso: "PL", name: "Poland", dial: "+48" },
  { iso: "PT", name: "Portugal", dial: "+351" },
  { iso: "QA", name: "Qatar", dial: "+974" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "SG", name: "Singapore", dial: "+65" },
  { iso: "ZA", name: "South Africa", dial: "+27" },
  { iso: "KR", name: "South Korea", dial: "+82" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "LK", name: "Sri Lanka", dial: "+94" },
  { iso: "SE", name: "Sweden", dial: "+46" },
  { iso: "CH", name: "Switzerland", dial: "+41" },
  { iso: "TH", name: "Thailand", dial: "+66" },
  { iso: "TR", name: "Türkiye", dial: "+90" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "VN", name: "Vietnam", dial: "+84" },
] as const;

export type DialIso = (typeof DIAL_CODES)[number]["iso"];

export const MARKET_ISO: Record<string, DialIso> = { in: "IN", us: "US", uk: "GB", au: "AU" };

export const COUNTRIES = [...DIAL_CODES.map((d) => d.name), "Other"] as const;

/** Map ?need=… query values to the NEEDS option label. */
export const NEED_QUERY_MAP: Record<string, (typeof NEEDS)[number]> = {
  upload: "Catalog listing",
  wholesale: "Catalog listing",
  agency: "Catalog listing",
  cleanup: "Catalog cleanup",
  migration: "Migration",
  imagery: "Product photos",
  feeds: "Google & marketplaces",
  email: "Email & carts",
  whatsapp: "WhatsApp",
  support: "AI support",
  voice: "Voice & chat shopping",
  ongoing: "Monthly plan",
};

export const TIER_COUNT_MAP: Record<string, (typeof PRODUCT_COUNTS)[number]> = {
  starter: "101–250",
  growth: "251–500",
  launch: "501–1,000",
  scale: "1,001–5,000",
};

import type { NextConfig } from "next";

/** Old URLs → keyword URLs (renamed Oct 2026). Permanent, so search engines move any signals across. */
const RENAMED: Record<string, string> = {
  "/catalog": "/bulk-product-upload",
  "/migration": "/store-migration",
  "/product-imagery": "/ai-product-photos",
  "/feeds-marketplaces": "/product-feed-management",
  "/email-marketing": "/ecommerce-email-marketing",
  "/sample": "/free-sample",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(RENAMED).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;

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
  // Root layout lives under [market], so unmatched URLs need a global 404 (see app/global-not-found.tsx).
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return Object.entries(RENAMED).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;

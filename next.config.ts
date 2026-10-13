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
  // Only a yes/no reaches the bundle, never the key. The chat button shows when a key exists at build
  // time, or when CHAT_ENABLED=1 (Docker builds, where the key is only given at runtime).
  env: {
    CHAT_ENABLED: process.env.CHAT_ENABLED === "1" || (process.env.CHAT_API_KEY && process.env.CHAT_MODEL) ? "1" : "",
  },
  // Root layout lives under [market], so unmatched URLs need a global 404 (see app/global-not-found.tsx).
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return Object.entries(RENAMED).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;

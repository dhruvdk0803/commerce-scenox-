import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/catalog", priority: 0.9, freq: "weekly" },
  { path: "/sample", priority: 0.8, freq: "monthly" },
  { path: "/catalog-cleanup", priority: 0.8, freq: "monthly" },
  { path: "/migration", priority: 0.8, freq: "monthly" },
  { path: "/wholesale-catalog", priority: 0.9, freq: "monthly" },
  { path: "/product-imagery", priority: 0.8, freq: "monthly" },
  { path: "/feeds-marketplaces", priority: 0.8, freq: "monthly" },
  { path: "/email-marketing", priority: 0.8, freq: "monthly" },
  { path: "/whatsapp-automation", priority: 0.8, freq: "monthly" },
  { path: "/ai-customer-support", priority: 0.8, freq: "monthly" },
  { path: "/how-it-works", priority: 0.8, freq: "monthly" },
  { path: "/pricing", priority: 0.9, freq: "monthly" },
  { path: "/case-studies", priority: 0.6, freq: "monthly" },
  { path: "/about", priority: 0.5, freq: "yearly" },
  { path: "/contact", priority: 0.6, freq: "yearly" },
  { path: "/get-started", priority: 0.9, freq: "monthly" },
  { path: "/data-handling", priority: 0.4, freq: "yearly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
  { path: "/terms", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}

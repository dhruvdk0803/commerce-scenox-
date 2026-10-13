import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getGuides } from "@/lib/guides";
import { getLandings } from "@/lib/landing";

const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/bulk-product-upload", priority: 0.9, freq: "weekly" },
  { path: "/free-sample", priority: 0.8, freq: "monthly" },
  { path: "/catalog-cleanup", priority: 0.8, freq: "monthly" },
  { path: "/store-migration", priority: 0.8, freq: "monthly" },
  { path: "/wholesale-catalog", priority: 0.9, freq: "monthly" },
  { path: "/ai-product-photos", priority: 0.8, freq: "monthly" },
  { path: "/product-feed-management", priority: 0.8, freq: "monthly" },
  { path: "/ecommerce-email-marketing", priority: 0.8, freq: "monthly" },
  { path: "/whatsapp-automation", priority: 0.8, freq: "monthly" },
  { path: "/ai-customer-support", priority: 0.8, freq: "monthly" },
  { path: "/ai-voice-shopping-assistant", priority: 0.8, freq: "monthly" },
  { path: "/how-it-works", priority: 0.8, freq: "monthly" },
  { path: "/pricing", priority: 0.9, freq: "monthly" },
  { path: "/guides", priority: 0.7, freq: "weekly" },
  { path: "/solutions", priority: 0.8, freq: "weekly" },
  { path: "/case-studies", priority: 0.6, freq: "monthly" },
  { path: "/about", priority: 0.5, freq: "yearly" },
  { path: "/contact", priority: 0.6, freq: "yearly" },
  { path: "/book", priority: 0.6, freq: "yearly" },
  { path: "/get-started", priority: 0.9, freq: "monthly" },
  { path: "/data-handling", priority: 0.4, freq: "yearly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
  { path: "/terms", priority: 0.2, freq: "yearly" },
];

/** Bump when page content meaningfully changes (not on every build). */
const LAST_UPDATED = new Date("2026-10-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map((r) => ({
    url: `${site.url}${r.path === "/" ? "" : r.path}`,
    lastModified: LAST_UPDATED,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
  const guides = getGuides().map((g) => ({
    url: `${site.url}/guides/${g.slug}`,
    lastModified: new Date(g.updated),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const landings = getLandings().map((l) => ({
    url: `${site.url}/${l.slug}`,
    lastModified: new Date(l.updated),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...pages, ...landings, ...guides];
}

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { MarketId } from "@/lib/markets";
import { renderMarkdown, type GuideFaq } from "@/lib/guides";

/**
 * Landing pages (platform, country, industry, migration, audience) live as
 * Markdown in src/content/landing/<slug>.md and render at /<slug>.
 */
export type LandingArt =
  | "mosaic" | "row" | "cleanup" | "migration" | "imagery" | "feeds" | "email" | "whatsapp" | "support" | "voice" | "storefront";

export type LandingKind = "platform" | "marketplace" | "country" | "migration" | "industry" | "audience" | "service" | "choose";

export type Landing = {
  slug: string;
  kind: LandingKind;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  service: string;
  /** forces prices on the page into one market's currency (country pages) */
  market?: MarketId;
  art: LandingArt;
  cta: string;
  facts: { k: string; v: string }[];
  faqs: GuideFaq[];
  related: string[];
  html: string;
  toc: { id: string; text: string }[];
  updated: string;
};

const DIR = join(process.cwd(), "src/content/landing");

let cache: Landing[] | null = null;

export function getLandings(): Landing[] {
  if (cache) return cache;
  let files: string[] = [];
  try {
    files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
  } catch {
    files = [];
  }
  cache = files.map((f) => {
    const { data, content } = matter(readFileSync(join(DIR, f), "utf8"));
    const { html, toc } = renderMarkdown(content);
    return {
      slug: f.replace(/\.md$/, ""),
      kind: data.kind ?? "service",
      title: data.title,
      description: data.description,
      eyebrow: data.eyebrow,
      heading: data.heading ?? data.title,
      lead: data.lead,
      service: data.service ?? "upload",
      market: data.market,
      art: data.art ?? "mosaic",
      cta: data.cta ?? "Get a Quote",
      facts: data.facts ?? [],
      faqs: data.faqs ?? [],
      related: data.related ?? [],
      html,
      toc,
      updated: String(data.updated ?? "2026-10-12"),
    } satisfies Landing;
  });
  return cache;
}

export const getLanding = (slug: string) => getLandings().find((l) => l.slug === slug);

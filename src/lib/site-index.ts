import { products } from "@/content/products";
import { getLandings } from "@/lib/landing";
import { getGuides } from "@/lib/guides";

/**
 * Every page the website assistant can point to or open: core service pages,
 * landing pages and guides, with a one-line summary for the model.
 */
export type IndexedPage = { path: string; title: string; summary: string; type: "service" | "page" | "guide" };

const CORE: IndexedPage[] = [
  { path: "/", title: "Home", summary: "Overview of Scenox Commerce and every service.", type: "page" },
  { path: "/services", title: "All services", summary: "Every service, kit and monthly plan on one page.", type: "page" },
  { path: "/pricing", title: "Pricing", summary: "Starting prices, kits and monthly plans in the visitor's currency.", type: "page" },
  { path: "/how-it-works", title: "How it works", summary: "The AI engine plus human review process, step by step.", type: "page" },
  { path: "/get-started", title: "Get a fixed quote", summary: "The one-step quote form.", type: "page" },
  { path: "/free-sample", title: "Free 10-product sample", summary: "Send 10 products and get them back store-ready, free if the project is a fit.", type: "page" },
  { path: "/book", title: "Book a call", summary: "Pick a time for a video call with the founder; slots show in the visitor's own time zone.", type: "page" },
  { path: "/contact", title: "Contact", summary: "Contact form and email.", type: "page" },
  { path: "/solutions", title: "Solutions by platform, industry and country", summary: "Hub of every specialist page.", type: "page" },
  { path: "/guides", title: "Guides", summary: "All how-to guides and error fixes.", type: "page" },
  { path: "/case-studies", title: "Case studies", summary: "Client work.", type: "page" },
  { path: "/about", title: "About", summary: "Who runs Scenox Commerce.", type: "page" },
  { path: "/data-handling", title: "Data handling and security", summary: "How files and store access are handled.", type: "page" },
  { path: "/wholesale-catalog", title: "Wholesale and distributor catalogs", summary: "High-SKU catalogs from ERP and supplier files.", type: "service" },
];

let cache: IndexedPage[] | null = null;

export function siteIndex(): IndexedPage[] {
  if (cache) return cache;
  const seen = new Set<string>();
  const all: IndexedPage[] = [
    ...CORE,
    ...products.map((p) => ({ path: p.href, title: p.name, summary: p.desc, type: "service" as const })),
    ...getLandings().map((l) => ({ path: `/${l.slug}`, title: l.heading.replace(/\.$/, ""), summary: l.description, type: "page" as const })),
    ...getGuides().map((g) => ({ path: `/guides/${g.slug}`, title: g.heading, summary: g.description, type: "guide" as const })),
  ].filter((p) => (seen.has(p.path) ? false : (seen.add(p.path), true)));
  cache = all;
  return all;
}

const STOP = new Set("the a an of for to and in on with my your is are how what do does can i we you me it best service services page".split(" "));
const toks = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 1 && !STOP.has(w));

/** Simple keyword search: title matches weigh more than summary matches. */
export function searchSite(query: string, limit = 6): IndexedPage[] {
  const q = toks(query);
  if (!q.length) return [];
  return siteIndex()
    .map((p) => {
      const t = toks(p.title + " " + p.path.replace(/[/-]/g, " "));
      const s = toks(p.summary);
      const score = q.reduce((n, w) => n + (t.some((x) => x.startsWith(w)) ? 3 : 0) + (s.some((x) => x.startsWith(w)) ? 1 : 0), 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export const isKnownPath = (path: string) => siteIndex().some((p) => p.path === path.split("#")[0].split("?")[0]);

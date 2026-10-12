import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

/**
 * Guides live as Markdown in src/content/guides/<slug>.md with frontmatter.
 * Parsed at build time; every page is statically generated.
 */
export type GuideCategory = "catalog" | "migration" | "feeds" | "content" | "imagery" | "retention" | "costs" | "fixes";

export const GUIDE_CATEGORIES: Record<GuideCategory, { label: string; desc: string }> = {
  costs: { label: "Costs & outsourcing", desc: "What catalog work costs and when to hand it off." },
  catalog: { label: "Product upload", desc: "Bulk imports for Shopify, WooCommerce, Magento and BigCommerce." },
  migration: { label: "Migration", desc: "Moving platforms without losing data or rankings." },
  content: { label: "Product content", desc: "Titles, descriptions, attributes and taxonomy." },
  feeds: { label: "Feeds & marketplaces", desc: "Google Merchant Center, Meta, Amazon and Flipkart." },
  imagery: { label: "Product images", desc: "Specs, backgrounds and AI imagery." },
  retention: { label: "Email & WhatsApp", desc: "Abandoned carts, COD confirmation and repeat orders." },
  fixes: { label: "Error fixes", desc: "One page per Shopify CSV error and Merchant Center issue, with the fix." },
};

export type GuideFaq = { q: string; a: string };

export type Guide = {
  slug: string;
  title: string;
  /** H1 when it should differ from the <title> */
  heading: string;
  description: string;
  category: GuideCategory;
  /** short direct answer shown at the top (answer engines quote this) */
  summary: string;
  /** product id from content/products for the CTA */
  service: string;
  published: string;
  updated: string;
  faqs: GuideFaq[];
  html: string;
  toc: { id: string; text: string }[];
  readMinutes: number;
};

const DIR = join(process.cwd(), "src/content/guides");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function renderMarkdown(md: string) {
  const toc: { id: string; text: string }[] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      table(token) {
        // wide tables scroll inside their own box on phones
        const head = token.header.map((c) => `<th>${this.parser.parseInline(c.tokens)}</th>`).join("");
        const rows = token.rows
          .map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
          .join("");
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  const html = marked.parse(md, { async: false }) as string;
  return { html, toc };
}

let cache: Guide[] | null = null;

export function getGuides(): Guide[] {
  if (cache) return cache;
  const files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
  cache = files
    .map((f) => {
      const { data, content } = matter(readFileSync(join(DIR, f), "utf8"));
      const { html, toc } = renderMarkdown(content);
      const words = content.split(/\s+/).length;
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title,
        heading: data.heading ?? data.title,
        description: data.description,
        category: data.category,
        summary: data.summary,
        service: data.service ?? "upload",
        published: String(data.published),
        updated: String(data.updated ?? data.published),
        faqs: data.faqs ?? [],
        html,
        toc,
        readMinutes: Math.max(3, Math.round(words / 220)),
      } satisfies Guide;
    })
    .sort((a, b) => b.updated.localeCompare(a.updated));
  return cache;
}

export function getGuide(slug: string) {
  return getGuides().find((g) => g.slug === slug);
}

export function relatedGuides(g: Guide, n = 3) {
  const all = getGuides().filter((x) => x.slug !== g.slug);
  return [...all.filter((x) => x.category === g.category), ...all.filter((x) => x.category !== g.category)].slice(0, n);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

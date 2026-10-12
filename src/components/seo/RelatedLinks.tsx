import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLandings, type LandingKind } from "@/lib/landing";
import { getGuides, GUIDE_CATEGORIES, type GuideCategory } from "@/lib/guides";
import { cn } from "@/lib/utils";

/**
 * Internal links to specialist landing pages and guides for a service.
 * Keeps every content page reachable from the pages that rank for the
 * broader term, and gives readers the next step.
 */
export function RelatedLinks({
  services = [],
  kinds = [],
  categories = [],
  exclude,
  title = "Go deeper",
  maxPages = 12,
  maxGuides = 8,
  tone = "muted",
}: {
  /** product ids (content/products) the pages are for */
  services?: string[];
  /** also include every landing page of these kinds */
  kinds?: LandingKind[];
  /** also include guides in these categories */
  categories?: GuideCategory[];
  /** path to leave out (the current page) */
  exclude?: string;
  title?: string;
  maxPages?: number;
  maxGuides?: number;
  tone?: "light" | "muted";
}) {
  const pages = getLandings()
    .filter((l) => `/${l.slug}` !== exclude && (services.includes(l.service) || kinds.includes(l.kind)))
    .sort((a, b) => Number(!kinds.includes(a.kind)) - Number(!kinds.includes(b.kind)))
    .slice(0, maxPages);
  const guides = getGuides()
    .filter((g) => `/guides/${g.slug}` !== exclude && g.category !== "fixes" && (services.includes(g.service) || categories.includes(g.category)))
    .slice(0, maxGuides);
  if (!pages.length && !guides.length) return null;

  return (
    <section className={cn("border-t border-line", tone === "muted" && "bg-bg-muted/40")} aria-labelledby="related-links-heading">
      <div className="container-x grid gap-10 py-14 md:py-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <h2 id="related-links-heading" className="text-h3 text-ink">{title}</h2>
          <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-2">Specialist pages and practical guides for this work.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:col-span-9">
          {pages.length > 0 && (
            <div>
              <p className="mono-label text-ink-3">SPECIALIST SERVICES</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {pages.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/${l.slug}`} className="group flex items-center justify-between gap-3 py-3 text-[0.95rem] text-ink">
                      <span className="group-hover:underline group-hover:underline-offset-4">{l.heading.replace(/\.$/, "")}</span>
                      <ArrowUpRight className="size-3.5 shrink-0 text-ink-3" strokeWidth={2} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {guides.length > 0 && (
            <div>
              <p className="mono-label text-ink-3">GUIDES</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="group flex items-center justify-between gap-3 py-3 text-[0.95rem] text-ink">
                      <span>
                        <span className="mono-micro block text-ink-3">{GUIDE_CATEGORIES[g.category].label.toUpperCase()}</span>
                        <span className="group-hover:underline group-hover:underline-offset-4">{g.heading}</span>
                      </span>
                      <ArrowUpRight className="size-3.5 shrink-0 text-ink-3" strokeWidth={2} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMeta, servicesItemListJsonLd } from "@/lib/seo";
import { getLandings, type LandingKind } from "@/lib/landing";

export const metadata = pageMeta({
  title: "Catalog Services by Platform, Industry and Country",
  description:
    "Product upload, migration and catalog services for Shopify, WooCommerce, Magento and BigCommerce, by industry and for India, the US, UK and Australia.",
  path: "/solutions",
});

const GROUPS: { kind: LandingKind; label: string; desc: string }[] = [
  { kind: "platform", label: "By platform", desc: "Product upload built around how each platform structures products." },
  { kind: "country", label: "By country", desc: "Local currency, tax fields, marketplaces and spelling." },
  { kind: "industry", label: "By industry", desc: "The attributes, variants and images each category needs." },
  { kind: "migration", label: "Migrations to Shopify", desc: "Products, customers and URLs moved, rankings protected." },
  { kind: "marketplace", label: "Marketplaces", desc: "Listings for Amazon, Flipkart and Meesho." },
  { kind: "service", label: "By service", desc: "Catalog management, data entry, descriptions, feeds and more." },
  { kind: "audience", label: "Who we work with", desc: "Agencies, D2C brands and marketplace sellers." },
  { kind: "choose", label: "Choosing a provider", desc: "What to check before you hire anyone." },
];

export default function SolutionsPage() {
  const all = getLandings();
  const groups = GROUPS.map((g) => ({ ...g, items: all.filter((l) => l.kind === g.kind) })).filter((g) => g.items.length);

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="container-x pt-10 pb-12 md:pt-14 md:pb-16">
          <Eyebrow>SOLUTIONS</Eyebrow>
          <h1 className="mt-5 max-w-[18ch] text-balance text-h1 text-ink">Find the service for your store.</h1>
          <p className="mt-6 max-w-[54ch] text-lead text-ink-2">
            Pick your platform, industry or country. Every page has a starting price, how it works and a free 10-product sample.
          </p>
          <nav aria-label="Solution groups" className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g.kind} href={`#${g.kind}`} className="rounded-full border border-line px-3.5 py-1.5 text-[0.875rem] text-ink-2 transition-colors hover:border-ink hover:text-ink">
                {g.label}
              </a>
            ))}
          </nav>
        </section>

        {groups.map((g) => (
          <section key={g.kind} id={g.kind} className="scroll-mt-20 border-t border-line" aria-labelledby={`${g.kind}-heading`}>
            <div className="container-x grid gap-6 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h2 id={`${g.kind}-heading`} className="text-h3 text-ink">{g.label}</h2>
                <p className="mt-2 max-w-[32ch] text-[0.95rem] leading-relaxed text-ink-2">{g.desc}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
                {g.items.map((it) => (
                  <li key={it.slug}>
                    <Link href={`/${it.slug}`} className="group flex h-full items-start justify-between gap-4 rounded-[14px] border border-line bg-bg-elevated p-5 transition-colors hover:border-line-strong">
                      <span>
                        <span className="mono-micro block text-ink-3">{it.eyebrow}</span>
                        <span className="mt-1.5 block text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-ink">{it.heading}</span>
                      </span>
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-ink-3 transition-colors group-hover:text-ink" strokeWidth={2} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
          servicesItemListJsonLd(all.map((l) => ({ name: l.heading, path: `/${l.slug}` }))),
        ]}
      />
    </>
  );
}

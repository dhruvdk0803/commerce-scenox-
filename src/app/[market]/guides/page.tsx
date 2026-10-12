import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getGuides, GUIDE_CATEGORIES, type GuideCategory } from "@/lib/guides";

export const metadata = pageMeta({
  title: "Ecommerce Catalog Guides: Upload, Migration, Feeds",
  description:
    "Practical guides to bulk product upload, CSV import errors, platform migration, Merchant Center fixes, product content and costs. Written by catalog operators.",
  path: "/guides",
});

const ORDER: GuideCategory[] = ["costs", "catalog", "migration", "feeds", "content", "imagery", "retention"];

export default function GuidesPage() {
  const guides = getGuides();
  const groups = ORDER.map((c) => ({ id: c, ...GUIDE_CATEGORIES[c], items: guides.filter((g) => g.category === c) })).filter((g) => g.items.length);

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="container-x pt-10 pb-12 md:pt-14 md:pb-16">
          <Eyebrow>GUIDES</Eyebrow>
          <h1 className="mt-5 max-w-[18ch] text-balance text-h1 text-ink">How catalog work actually gets done.</h1>
          <p className="mt-6 max-w-[54ch] text-lead text-ink-2">
            Step-by-step guides to product uploads, CSV errors, migrations, feeds and product content. Do it yourself with these,
            or hand it to us.
          </p>
          <nav aria-label="Guide topics" className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="rounded-full border border-line px-3.5 py-1.5 text-[0.875rem] text-ink-2 transition-colors hover:border-ink hover:text-ink">
                {g.label}
              </a>
            ))}
          </nav>
        </section>

        {groups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-20 border-t border-line" aria-labelledby={`${g.id}-heading`}>
            <div className="container-x grid gap-6 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h2 id={`${g.id}-heading`} className="text-h3 text-ink">{g.label}</h2>
                <p className="mt-2 max-w-[32ch] text-[0.95rem] leading-relaxed text-ink-2">{g.desc}</p>
              </div>
              <ul className="divide-y divide-line border-y border-line lg:col-span-8">
                {g.items.map((it) => (
                  <li key={it.slug}>
                    <Link href={`/guides/${it.slug}`} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 transition-colors">
                      <span>
                        <span className="block text-[1.075rem] font-semibold leading-snug tracking-[-0.015em] text-ink group-hover:underline group-hover:underline-offset-4">
                          {it.heading}
                        </span>
                        <span className="mt-1 block text-[0.925rem] leading-snug text-ink-2">{it.description}</span>
                        <span className="mono-micro mt-2 block text-ink-3">{it.readMinutes} MIN READ</span>
                      </span>
                      <span aria-hidden className="grid size-8 place-items-center rounded-full border border-line text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                        <ArrowUpRight className="size-4" strokeWidth={2} />
                      </span>
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
            { name: "Guides", path: "/guides" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Ecommerce catalog guides",
            url: `${site.url}/guides`,
            hasPart: guides.map((g) => ({ "@type": "Article", headline: g.heading, url: `${site.url}/guides/${g.slug}` })),
          },
        ]}
      />
    </>
  );
}

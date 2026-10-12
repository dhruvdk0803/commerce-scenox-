import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Button, TextLink } from "@/components/ui/Button";
import { Price } from "@/components/market/Price";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { formatDate, getGuide, getGuides, GUIDE_CATEGORIES, relatedGuides } from "@/lib/guides";
import { products } from "@/content/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  const meta = pageMeta({ title: g.title, description: g.description, path: `/guides/${g.slug}` });
  const images = g.image ? [{ url: g.image.src, width: 1536, height: 1024, alt: g.image.alt }] : undefined;
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: g.published, modifiedTime: g.updated, ...(images ? { images } : {}) },
    ...(images ? { twitter: { ...meta.twitter, images: [g.image!.src] } } : {}),
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const service = products.find((p) => p.id === g.service) ?? products[0];
  const cat = GUIDE_CATEGORIES[g.category];
  const related = relatedGuides(g);
  // topic cluster: the hub guides link down to every error page, error pages link to their siblings
  const family = g.slug.startsWith("shopify-csv-error-") || g.slug === "shopify-csv-import-errors" ? "shopify-csv-error-" : g.slug.startsWith("merchant-center-") || g.slug === "google-merchant-center-disapprovals" ? "merchant-center-" : null;
  const cluster = getGuides().filter((x) => x.slug !== g.slug && (family ? x.slug.startsWith(family) : x.category === g.category));
  const clusterLabel = family === "shopify-csv-error-" ? "Every Shopify CSV error" : family === "merchant-center-" ? "Every Merchant Center issue" : `More in ${cat.label.toLowerCase()}`;
  const path = `/guides/${g.slug}`;

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <article>
          <header className="container-x pt-10 pb-10 md:pt-14 md:pb-14">
            <nav aria-label="Breadcrumb" className="mono-micro flex flex-wrap items-center gap-2 text-ink-3">
              <Link href="/guides" className="hover:text-ink">GUIDES</Link>
              <span aria-hidden>/</span>
              <Link href={`/guides#${g.category}`} className="hover:text-ink">{cat.label.toUpperCase()}</Link>
            </nav>
            <h1 className="mt-5 max-w-[22ch] text-balance text-h1 text-ink">{g.heading}</h1>
            <p className="mono-micro mt-6 flex flex-wrap gap-x-4 gap-y-1 text-ink-3">
              <span>
                UPDATED <time dateTime={g.updated}>{formatDate(g.updated).toUpperCase()}</time>
              </span>
              <span>{g.readMinutes} MIN READ</span>
              <span>BY THE SCENOX COMMERCE TEAM</span>
            </p>
            <div className="mt-8 max-w-[46rem] rounded-[14px] border border-line bg-bg-elevated p-5 md:p-6">
              <p className="mono-label text-accent-hover">SHORT ANSWER</p>
              <p className="mt-2.5 text-[1.075rem] leading-[1.6] text-ink">{g.summary}</p>
            </div>
          </header>

          {g.image && (
            <div className="container-x pb-10 md:pb-14">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[18px] bg-bg-muted sm:aspect-[21/9]">
                <Image src={g.image.src} alt={g.image.alt} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
              </div>
            </div>
          )}

          <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 pt-2 pb-16 md:pt-4 lg:grid-cols-12 lg:gap-12">
            <aside className="order-2 lg:col-span-4">
              <div className="flex flex-col gap-5 lg:sticky lg:top-24">
                {g.toc.length > 2 && (
                  <details className="group rounded-[14px] border border-line bg-bg-elevated max-lg:hidden" open>
                    <summary className="mono-label flex cursor-pointer list-none items-center justify-between px-5 py-4 text-ink-2">
                      ON THIS PAGE
                      <span aria-hidden className="text-ink-3 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <ol className="flex flex-col gap-0.5 px-3 pb-3">
                      {g.toc.map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`} className="block rounded-[8px] px-2 py-1.5 text-[0.9rem] leading-snug text-ink-2 transition-colors hover:bg-bg-muted hover:text-ink">
                            {t.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </details>
                )}

                <div className="rounded-[14px] bg-bg-dark p-5 text-paper md:p-6">
                  <p className="mono-micro text-paper-2">DONE FOR YOU</p>
                  <p className="mt-2 text-[1.2rem] font-semibold leading-tight tracking-[-0.02em]">{service.name}</p>
                  <p className="mt-1.5 text-[0.9rem] leading-snug text-paper-2">{service.desc}</p>
                  <p className="mt-4 text-[0.9rem] text-paper-2">
                    From <span className="font-semibold text-paper tabular"><Price set={service.price} /></span> · {service.unit}
                  </p>
                  <ul className="mt-4 flex flex-col gap-1.5 text-[0.85rem] text-paper-2">
                    {["Fixed quote before work starts", "Checked by a person, approved by you", "No store passwords"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Check className="size-3.5 shrink-0 text-[#5fd39b]" strokeWidth={2.5} aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Button href={`/get-started?need=${service.id}`} variant="inverse" arrow className="mt-5 w-full" event="cta_click" eventParams={{ cta: "guide_sidebar", guide: g.slug }}>
                    Get a Quote
                  </Button>
                  <TextLink href="/free-sample" inverse className="mt-3 text-[0.9rem]" event="cta_click" eventParams={{ cta: "guide_sample", guide: g.slug }}>
                    Or try 10 products free
                  </TextLink>
                </div>
              </div>
            </aside>

            <div className="order-1 min-w-0 lg:col-span-8">
              {/* phones: contents start collapsed so the article comes first */}
              {g.toc.length > 2 && (
                <details className="group mb-8 rounded-[14px] border border-line bg-bg-elevated lg:hidden">
                  <summary className="mono-label flex cursor-pointer list-none items-center justify-between px-5 py-4 text-ink-2">
                    ON THIS PAGE
                    <span aria-hidden className="text-ink-3 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ol className="flex flex-col gap-0.5 px-3 pb-3">
                    {g.toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="block rounded-[8px] px-2 py-1.5 text-[0.9rem] leading-snug text-ink-2">
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
              <div className="prose-guide" dangerouslySetInnerHTML={{ __html: g.html }} />
            </div>
          </div>
        </article>

        {cluster.length > 0 && (
          <section className="border-t border-line" aria-labelledby="cluster-heading">
            <div className="container-x py-12 md:py-14">
              <h2 id="cluster-heading" className="text-h3 text-ink">{clusterLabel}</h2>
              <ul className="mt-6 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
                {cluster.map((c) => (
                  <li key={c.slug} className="border-b border-line">
                    <Link href={`/guides/${c.slug}`} className="block py-3 text-[0.95rem] leading-snug text-ink hover:underline hover:underline-offset-4">
                      {c.heading}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {g.faqs.length > 0 && <FAQ items={g.faqs} heading="Common questions." eyebrow="FAQ" />}

        {related.length > 0 && (
          <section className="section-y border-t border-line" aria-labelledby="related-heading">
            <div className="container-x">
              <h2 id="related-heading" className="text-h3 text-ink">Keep reading</h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/guides/${r.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-bg-elevated transition-colors hover:border-line-strong">
                      {r.image && (
                        <span className="relative block aspect-[3/2] bg-bg-muted">
                          <Image src={r.image.src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                        </span>
                      )}
                      <span className="flex flex-1 flex-col p-5">
                      <span className="mono-micro text-ink-3">{GUIDE_CATEGORIES[r.category].label.toUpperCase()}</span>
                      <span className="mt-2 text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-ink">{r.heading}</span>
                      <span className="mt-auto flex items-center gap-1 pt-4 text-[0.85rem] text-ink-2 group-hover:text-ink">
                        Read guide <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                      </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <JsonLd
        data={[
          articleJsonLd({ title: g.heading, description: g.description, path, published: g.published, updated: g.updated, image: g.image?.src }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: g.heading, path },
          ]),
          ...(g.faqs.length ? [faqJsonLd(g.faqs)] : []),
        ]}
      />
    </>
  );
}

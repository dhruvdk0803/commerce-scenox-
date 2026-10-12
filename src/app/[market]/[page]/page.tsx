import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { PageHero, type Fact } from "@/components/ui/PageHero";
import { Button, TextLink } from "@/components/ui/Button";
import { PlatformStrip } from "@/components/home/PlatformStrip";
import { SampleOffer } from "@/components/home/SampleOffer";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroStorefront } from "@/components/home/HeroStorefront";
import { Price } from "@/components/market/Price";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  CatalogMosaicArt,
  CleanupArt,
  EmailArt,
  FeedsArt,
  ImageryArt,
  MigrationArt,
  RowToProductArt,
  SupportArt,
  VoiceArt,
  WhatsAppArt,
} from "@/components/pages/HeroArt";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import { getLanding, getLandings, type LandingArt } from "@/lib/landing";
import { getGuide } from "@/lib/guides";
import { formatPrice } from "@/lib/markets";
import { site } from "@/lib/site";
import { products } from "@/content/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLandings().map((l) => ({ page: l.slug }));
}

const ART: Record<LandingArt, ComponentType> = {
  mosaic: () => <CatalogMosaicArt />,
  row: RowToProductArt,
  cleanup: CleanupArt,
  migration: MigrationArt,
  imagery: ImageryArt,
  feeds: FeedsArt,
  email: EmailArt,
  whatsapp: WhatsAppArt,
  support: SupportArt,
  voice: VoiceArt,
  storefront: HeroStorefront,
};

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const l = getLanding((await params).page);
  if (!l) return {};
  return pageMeta({ title: l.title, description: l.description, path: `/${l.slug}` });
}

export default async function LandingPage({ params }: { params: Promise<{ page: string }> }) {
  const l = getLanding((await params).page);
  if (!l) notFound();
  const service = products.find((p) => p.id === l.service) ?? products[0];
  const Art = ART[l.art] ?? ART.mosaic;
  const path = `/${l.slug}`;
  const quoteHref = `/get-started?need=${service.id}`;

  // country pages show their own currency; everything else follows the visitor's market
  const fixed = l.market && service.price[l.market] != null ? formatPrice(service.price[l.market]!, l.market) : null;
  const facts: Fact[] = [
    { k: "STARTS FROM", v: <>{fixed ?? <Price set={service.price} />} · {service.unit}</> },
    { k: "DELIVERY", v: "From 48 hours*" },
    ...l.facts.map((f) => ({ k: f.k.toUpperCase(), v: f.v })),
  ];

  const related = l.related
    .map((slug) => {
      const g = getGuide(slug.replace(/^guides\//, ""));
      if (g) return { href: `/guides/${g.slug}`, label: g.heading, kind: "GUIDE" };
      const x = getLanding(slug);
      if (x) return { href: `/${x.slug}`, label: x.heading, kind: "SERVICE" };
      const p = products.find((pr) => pr.href === `/${slug}`);
      if (p) return { href: p.href, label: p.name, kind: "SERVICE" };
      return null;
    })
    .filter((x): x is { href: string; label: string; kind: string } => x !== null)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow={l.eyebrow}
          title={l.heading}
          lead={l.lead}
          art={<Art />}
          facts={facts}
          actions={
            <>
              <Button href={quoteHref} size="lg" arrow event="cta_click" eventParams={{ cta: "landing_hero", page: l.slug }}>
                {l.cta}
              </Button>
              <TextLink href="/free-sample" event="cta_click" eventParams={{ cta: "landing_sample", page: l.slug }}>
                Try 10 products free
              </TextLink>
            </>
          }
        />

        {(l.kind === "platform" || l.kind === "country" || l.kind === "industry") && <PlatformStrip />}

        <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <div className="prose-guide" dangerouslySetInnerHTML={{ __html: l.html }} />
          </div>
          <aside className="lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              <div className="rounded-[14px] bg-bg-dark p-5 text-paper md:p-6">
                <p className="mono-micro text-paper-2">FIXED QUOTE IN ONE STEP</p>
                <p className="mt-2 text-[1.2rem] font-semibold leading-tight tracking-[-0.02em]">{service.name}</p>
                <p className="mt-3 text-[0.9rem] text-paper-2">
                  From <span className="font-semibold text-paper tabular">{fixed ?? <Price set={service.price} />}</span> · {service.unit}
                </p>
                <ul className="mt-4 flex flex-col gap-1.5 text-[0.85rem] text-paper-2">
                  {["Fixed quote before work starts", "Checked by a person, approved by you", "No store passwords, ever"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="size-3.5 shrink-0 text-[#5fd39b]" strokeWidth={2.5} aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <Button href={quoteHref} variant="inverse" arrow className="mt-5 w-full" event="cta_click" eventParams={{ cta: "landing_sidebar", page: l.slug }}>
                  {l.cta}
                </Button>
              </div>
              {related.length > 0 && (
                <div className="rounded-[14px] border border-line bg-bg-elevated p-5">
                  <p className="mono-label text-ink-2">RELATED</p>
                  <ul className="mt-3 flex flex-col divide-y divide-line">
                    {related.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="group flex items-start justify-between gap-3 py-3 text-[0.925rem] leading-snug text-ink">
                          <span>
                            <span className="mono-micro block text-ink-3">{r.kind}</span>
                            <span className="group-hover:underline group-hover:underline-offset-4">{r.label}</span>
                          </span>
                          <ArrowUpRight className="mt-4 size-3.5 shrink-0 text-ink-3" strokeWidth={2} aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        <p className="container-x -mt-8 pb-12 text-[0.8rem] text-ink-3">*{site.qualifier}</p>

        <SampleOffer />
        {l.faqs.length > 0 && <FAQ items={l.faqs} />}
        <FinalCTA primary={{ label: l.cta, href: quoteHref }} />
      </main>
      <Footer />
      <StickyMobileCTA />
      <JsonLd
        data={[
          serviceJsonLd({ name: l.heading, description: l.description, path, price: service.price }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: l.heading, path },
          ]),
          ...(l.faqs.length ? [faqJsonLd(l.faqs)] : []),
        ]}
      />
    </>
  );
}

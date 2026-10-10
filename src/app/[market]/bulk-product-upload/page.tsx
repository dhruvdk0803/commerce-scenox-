import type { Metadata } from "next";
import { SpeedComparison } from "@/components/home/SpeedComparison";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Hero } from "@/components/home/Hero";
import { ClientStrip } from "@/components/home/ClientStrip";
import { PlatformStrip } from "@/components/home/PlatformStrip";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { SystemSpec } from "@/components/home/SystemSpec";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { PricingCards } from "@/components/home/PricingCards";
import { SampleOffer } from "@/components/home/SampleOffer";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Eyebrow, Tag } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import { catalogPageFaqs } from "@/content/faqs";
import { tiers } from "@/content/pricing";

export const metadata: Metadata = pageMeta({
  title: "Bulk Product Upload for Shopify, WooCommerce & Magento",
  description:
    "Send spreadsheets, supplier files and images. We clean, structure and upload 1,000+ products to Shopify, WooCommerce, Magento or BigCommerce, from 48 hours.",
  path: "/bulk-product-upload",
});

const SEND = ["Excel / CSV", "Supplier catalogs", "ERP or catalog exports", "Product PDFs", "Existing store exports", "Image folders", "Supplier websites", "Multiple fragmented sources"];
const HANDLE = ["Data cleanup", "SKU structure", "Titles & descriptions", "Categories & collections", "Variants & options", "Image matching & prep", "SEO fields", "Tags & metafields", "Platform formatting", "Upload & publishing", "Quality assurance"];
const SIZES = [
  ["50–250", "Launches and collections"],
  ["250–1,000", "Full store catalogs"],
  ["1,000–10,000", "Retail and distribution"],
  ["10,000+", "Assessed and batched"],
];

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd
          data={[
            serviceJsonLd({
              name: "Bulk product upload for Shopify, WooCommerce, Magento, BigCommerce and custom stores",
              description: "Catalog cleanup, structuring, enrichment, upload and QA for ecommerce stores.",
              path: "/bulk-product-upload",
              price: tiers[0].price,
            }),
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Catalog Listing", path: "/bulk-product-upload" }]),
            faqJsonLd(catalogPageFaqs),
          ]}
        />

        <Hero compact />
        <PlatformStrip />
        <ClientStrip />

        {/* what you send / what we handle / sizes */}
        <section className="section-y" aria-labelledby="scope-heading">
          <div className="container-x">
            <Reveal>
              <Eyebrow>SCOPE</Eyebrow>
              <h2 id="scope-heading" className="mt-5 max-w-[20ch] text-h2 text-ink">
                Send what you have. Get a finished catalog.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-line bg-line lg:grid-cols-3 md:mt-16">
              <div className="bg-bg p-6">
                <p className="mono-label text-ink-2">WHAT YOU SEND</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {SEND.map((s) => (
                    <li key={s}>
                      <Tag className="h-7 px-2.5 normal-case tracking-normal font-sans text-[0.8rem]">{s}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg p-6">
                <p className="mono-label text-ink-2">WHAT WE HANDLE</p>
                <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  {HANDLE.map((h) => (
                    <li key={h} className="flex items-baseline gap-2 text-[0.9rem] text-ink">
                      <span aria-hidden className="size-1.5 rounded-full bg-success" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg p-6">
                <p className="mono-label text-ink-2">CATALOG SIZES</p>
                <ul className="mt-5 divide-y divide-line">
                  {SIZES.map(([n, d]) => (
                    <li key={n} className="flex items-baseline justify-between py-2.5">
                      <span className="font-mono text-[0.95rem] text-ink tabular">{n}</span>
                      <span className="text-[0.85rem] text-ink-2">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ServiceGrid />
        <SystemSpec compact />
        <SpeedComparison />
        <ProcessSteps showLink={false} />
        <PricingCards preview />
        <SampleOffer />
        <FAQ items={catalogPageFaqs} heading="Before you send the catalog." />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

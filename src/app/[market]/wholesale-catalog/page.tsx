import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PlatformStrip } from "@/components/home/PlatformStrip";
import { SampleOffer } from "@/components/home/SampleOffer";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { CatalogMosaicArt } from "@/components/pages/HeroArt";

export const metadata: Metadata = pageMeta({
  title: "Wholesale & Distributor Catalog Upload",
  description:
    "Turn ERP exports and supplier files with 10,000+ SKUs into a structured Shopify or WooCommerce catalog, published in batches with a clear plan.",
  path: "/wholesale-catalog",
});

const ROWS = [
  {
    n: "01",
    title: "Batch publishing plan",
    body: "Catalogs over roughly 2,000 SKUs are published in scheduled batches with QA between batches, so problems surface early instead of at 10,000 products in.",
  },
  {
    n: "02",
    title: "Supplier-file processing",
    body: "Recurring supplier updates — new SKUs, price changes, discontinued items — are processed into the store on a schedule, not re-uploaded from scratch each time.",
  },
  {
    n: "03",
    title: "Specification depth",
    body: "Technical products get structured metafields and attributes, not a single paragraph of specs pasted into a description field.",
  },
  {
    n: "04",
    title: "Assessment first",
    body: "Large projects are assessed before a fixed quote. We review a sample of your data and the target platform before committing to a number.",
  },
];

const wholesaleFaqs = [
  {
    q: "What ERP export formats can you work with?",
    a: "Most structured exports: CSV, XML and flat-file exports from common ERP and PIM systems. Send a sample and we confirm compatibility before quoting.",
  },
  {
    q: "Can you handle a catalog with 10,000+ SKUs?",
    a: "Yes. High-SKU catalogs are a strong fit. Large projects are assessed first, then scheduled in batches with a publishing plan.",
  },
  {
    q: "How do batches actually work?",
    a: "The catalog is split into scheduled batches based on category or priority. Each batch is cleaned, mapped, validated and published, then checked before the next batch starts.",
  },
  {
    q: "How do ongoing supplier updates work?",
    a: "You send updated supplier files on whatever cadence you receive them. We process new SKUs, price and stock changes, and discontinued items into the live store.",
  },
  {
    q: "Can you handle images at scale?",
    a: "Yes. Images are matched to SKUs, renamed consistently and resized to platform requirements, and products with missing images are flagged rather than published incomplete.",
  },
];

export default function WholesaleCatalogPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          art={<CatalogMosaicArt />}
          eyebrow="FOR WHOLESALERS & DISTRIBUTORS"
          title={
            <>
              Your supplier catalog belongs online.
              <br />
              Not buried in spreadsheets.
            </>
          }
          lead="Thousands of SKUs shouldn't mean thousands of manual product entries. We turn ERP exports, supplier files and image folders into structured ecommerce listings, published in batches."
          actions={
            <Button href="/get-started?need=wholesale" size="lg" arrow>
              Send Us Your Catalog
            </Button>
          }
          facts={[
            { k: "CATALOG SIZE", v: "1,000 – 50,000+ SKUs" },
            { k: "SOURCES", v: "ERP exports · supplier files · PDF · images" },
            { k: "PUBLISHING", v: "Scheduled batches with QA between batches" },
            { k: "ONGOING", v: "Recurring supplier updates processed into the store" },
          ]}
        />


        <Section aria-labelledby="highsku-heading">
          <Container>
            <SectionHeader
              id="highsku-heading"
              eyebrow="BUILT FOR HIGH-SKU CATALOGS"
              title="Scale changes the process."
              description="A 20,000-SKU catalog is not a 200-SKU catalog run a hundred times. Four things change."
            />
            <ul className="mt-12 grid gap-x-10 md:mt-16 lg:grid-cols-2">
              {ROWS.map((r) => (
                <li key={r.n} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7">
                  <span className="mono-label tabular pt-1.5 text-ink-3">{r.n}</span>
                  <div>
                    <h3 className="text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{r.title}</h3>
                    <p className="mt-2 max-w-[48ch] text-[1rem] leading-[1.6] text-ink-2">{r.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <PlatformStrip />
        <SampleOffer />


        <FAQ items={wholesaleFaqs} heading="High-SKU questions." />
        <FinalCTA
          heading={["SEND THE SUPPLIER FILE.", "WE'LL BUILD THE CATALOG."]}
          primary={{ label: "Send Us Your Catalog", href: "/get-started?need=wholesale" }}
        />
      </main>
      <Footer />
      <StickyMobileCTA href="/get-started?need=wholesale" label="Send Us Your Catalog" />
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Wholesale & Distributor Catalog Upload",
            description:
              "Wholesale ecommerce catalog management for large ecommerce catalog uploads from ERP exports and supplier files, published in batches.",
            path: "/wholesale-catalog",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Wholesalers & Distributors", path: "/wholesale-catalog" },
          ]),
          faqJsonLd(wholesaleFaqs),
        ]}
      />
    </>
  );
}

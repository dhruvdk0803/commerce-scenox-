import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingCards } from "@/components/home/PricingCards";
import { SampleOffer } from "@/components/home/SampleOffer";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CheckBox } from "@/components/ui/Status";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { pricingFaqs } from "@/content/faqs";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Pricing — Catalog upload from ₹6,999",
  description:
    "Transparent starting prices for ecommerce catalog operations. Starter, Growth, Catalog Launch and Scale tiers. Final quote confirmed after inspecting your files.",
  path: "/pricing",
});

const INCLUDED = [
  "Source-file inspection and a fixed quote",
  "Cleanup and normalization of every field",
  "Titles, categories, variants and images structured",
  "Formatting for your platform",
  "An approval round before anything publishes",
  "Upload, publishing and a QA pass",
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]), faqJsonLd(pricingFaqs)]} />

        <PageHero
          eyebrow="PRICING"
          title="Simple projects. Simple pricing."
          lead="Starting prices are public because they should be. Complex projects are assessed before a final quote, and nothing hides behind “contact sales”."
          className="pb-2 md:pb-4"
          facts={[
            { k: "STARTS FROM", v: "₹6,999 (up to 250 products)" },
            { k: "MOST POPULAR", v: "Catalog Launch · up to 1,000 · from ₹14,999" },
            { k: "1,000+", v: "Assessed, then a fixed quote" },
            { k: "INTERNATIONAL", v: "USD quotes on request" },
          ]}
        />

        <PricingCards heading={["Four tiers.", "One completed catalog."]} />

        {/* included + large catalogs */}
        <section className="section-y border-t border-line bg-bg-muted/40" aria-labelledby="included-heading">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>INCLUDED IN EVERY PROJECT</Eyebrow>
              <h2 id="included-heading" className="mt-5 text-h2 text-ink">
                What every tier includes.
              </h2>
              <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
                {INCLUDED.map((i) => (
                  <li key={i} className="flex items-center gap-3 py-3.5 text-[1rem] text-ink">
                    <CheckBox done />
                    {i}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-[12px] border border-line bg-bg p-6 md:p-8">
                <Eyebrow>LARGE-CATALOG ASSESSMENT</Eyebrow>
                <h3 className="mt-4 text-h3 text-ink">1,000+ products? We assess first.</h3>
                <p className="mt-4 text-[1rem] leading-[1.55] text-ink-2">
                  High-SKU catalogs are quoted after a structured review of your source files: SKU count, variant
                  depth, category tree, image coverage and target platform. You get a fixed price, a batch plan and a
                  realistic timeline before committing.
                </p>
                <ul className="mt-6 grid gap-2 font-mono text-[0.8rem] text-ink-2 sm:grid-cols-2">
                  {["SKU & variant audit", "Category-tree mapping", "Image coverage report", "Batch publishing plan"].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/get-started?tier=scale" variant="dark" arrow>
                    Request Assessment
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <SampleOffer />
        <FAQ items={pricingFaqs} heading="Pricing questions." />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingCards } from "@/components/home/PricingCards";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CheckBox } from "@/components/ui/Status";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { pricingFaqs } from "@/content/faqs";
import { PageHero } from "@/components/ui/PageHero";
import { ProductMenu } from "@/components/pricing/ProductMenu";
import { PlanCards } from "@/components/pricing/PlanCards";
import { BundleCards } from "@/components/pricing/BundleCards";
import { BeforeYouPay } from "@/components/pricing/BeforeYouPay";
import { QuoteEstimator } from "@/components/pricing/QuoteEstimator";
import { Price } from "@/components/market/Price";
import { plans, tiers } from "@/content/pricing";
import { products } from "@/content/products";
import { bundles } from "@/content/bundles";
import { MARKET_IDS, type PriceSet } from "@/lib/markets";
import { getMarket, getPrice } from "@/lib/market-server";

export async function generateMetadata(): Promise<Metadata> {
  const from = await getPrice(tiers[0].price);
  return pageMeta({
    title: `Pricing & Plans — Catalog listing from ${from}`,
    description:
      "Public starting prices for catalog listing, cleanup, imagery, feeds, email, WhatsApp, AI support and voice shopping, plus monthly plans. Fixed scope for every product.",
    path: "/pricing",
  });
}

const INCLUDED = [
  "Source-file inspection and a fixed quote",
  "Cleanup and normalization of every field",
  "Titles, categories, variants and images structured",
  "Formatting for your platform",
  "An approval round before anything publishes",
  "Upload, publishing and a QA pass",
];

const lowest = (sets: PriceSet[]): PriceSet =>
  Object.fromEntries(
    MARKET_IDS.map((m) => {
      const vals = sets.map((x) => x[m]).filter((v): v is number => v != null);
      return [m, vals.length ? Math.min(...vals) : null];
    }),
  ) as PriceSet;

const cheapestService = lowest(products.filter((p) => p.id !== "upload").map((p) => p.price));
const cheapestKit = lowest(bundles.map((b) => b.price));

export default async function PricingPage() {
  const market = await getMarket();
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]), faqJsonLd(pricingFaqs)]} />

        <PageHero
          eyebrow="PRICING"
          title="Every price, before you call."
          lead="Every service is a product with a set scope, a delivery time and a starting price in your currency. Run one, combine them in a kit, or let a monthly plan keep it all running."
          className="pb-2 md:pb-4"
          factsLabel="FOUR WAYS TO BUY"
          facts={[
            { k: "01 · CATALOG", v: <>Listing tiers from <Price set={tiers[0].price} /></> },
            { k: "02 · SERVICES", v: <>Single services from <Price set={cheapestService} /></> },
            { k: "03 · KITS", v: <>Bundles from <Price set={cheapestKit} /></> },
            { k: "04 · PLANS", v: <>Monthly from <Price set={plans[0].price} /> · {market.currency}</> },
          ]}
        />

        <PricingCards eyebrow="01 / CATALOG LISTING" heading={["Catalog listing.", "Four tiers by product count."]} />

        <section className="section-y-sm border-t border-line bg-bg-muted/40" aria-labelledby="included-heading">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <Eyebrow>IN EVERY TIER</Eyebrow>
              <h2 id="included-heading" className="mt-4 text-h3 text-ink">
                What every catalog project includes.
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                {INCLUDED.map((i) => (
                  <li key={i} className="flex items-center gap-3 border-b border-line py-3.5 text-[1rem] text-ink">
                    <CheckBox done />
                    {i}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <ProductMenu
          exclude={["upload"]}
          eyebrow="02 / SINGLE SERVICES"
          title={<>Single services.</>}
          description="Each one is a fixed scope with a starting price. We confirm the final figure after seeing your store and data."
        />
        <BundleCards tone="muted" eyebrow="03 / KITS" />
        <PlanCards tone="light" eyebrow="04 / MONTHLY PLANS" />
        <QuoteEstimator tone="muted" />
        <BeforeYouPay />

        <FAQ items={pricingFaqs} heading="Pricing questions." />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { products } from "@/content/products";
import { MigrationFlow } from "@/components/pages/MigrationFlow";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Shopify & WooCommerce Store Migration Service",
  description:
    "Move your catalog to Shopify or WooCommerce with products, variants, images, SEO handles and 301 redirects mapped. No downtime, cleaner than before.",
  path: "/store-migration",
});

const COVERAGE = [
  "Products & variants",
  "Categories → collections",
  "Images & alt text",
  "SEO handles & 301 redirects",
  "Metafields & attributes",
  "Inventory & pricing",
  "Validation on the target",
];

const migrationFaqs = [
  {
    q: "Does the migration cause downtime on my current store?",
    a: "No. We extract and rebuild the catalog on the source and target separately. Your current store stays live until the new one is reviewed and you decide to switch over.",
  },
  {
    q: "Do our SEO rankings survive the move?",
    a: "URL structures rarely match exactly between platforms. We map old product and category URLs to their new equivalents and set up 301 redirects so search rankings and existing links carry over as closely as possible.",
  },
  {
    q: "We use a custom or less common platform. Can you still migrate it?",
    a: "Custom platforms are reviewed before project approval to confirm an export or API path exists on the source and an import path exists on the target. We tell you plainly if a platform is not a fit.",
  },
  {
    q: "What about orders and customer accounts?",
    a: "We focus on the product catalog: products, variants, categories, images, SEO and metafields. Orders and customer accounts are a separate migration concern, and we can advise on the right approach for those if needed.",
  },
  {
    q: "How long does a migration take?",
    a: "It depends on catalog size and how consistent the source data is. We confirm a realistic timeline after reviewing both platforms and a sample of the data.",
  },
];

export default function MigrationPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="PLATFORM MIGRATION"
          title={
            <>
              Move the store.
              <br />
              Not the mess.
            </>
          }
          lead="WooCommerce to Shopify. Legacy platforms to Shopify. Structured sources to WooCommerce. We extract, normalize and rebuild the catalog so the new store launches cleaner than the old one."
          actions={
            <Button href="/get-started?need=migration" size="lg" arrow>
              Plan My Migration
            </Button>
          }
          facts={[
            { k: "TYPICAL PATHS", v: "WooCommerce → Shopify · Legacy → Shopify · Structured source → WooCommerce" },
            { k: "CARRIES OVER", v: "Products, variants, categories, images, SEO handles, redirects" },
            { k: "REVIEWED FIRST", v: "Both platforms, before quoting" },
            { k: "DOWNTIME", v: "None on the catalog side; you switch when ready" },
          ]}
        />

        <Section tone="muted" aria-labelledby="flow-heading">
          <Container>
            <SectionHeader
              id="flow-heading"
              eyebrow="HOW A MIGRATION MOVES"
              title="Source to target. Fully mapped."
              description="Extraction, normalization and a target-ready catalog with redirects in place. Figures shown are illustrative."
            />
            <div className="mt-12 md:mt-16">
              <MigrationFlow />
            </div>
          </Container>
        </Section>

        <Section aria-labelledby="coverage-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal>
                  <Eyebrow>SCOPE</Eyebrow>
                  <h2 id="coverage-heading" className="mt-5 max-w-[18ch] text-h2 text-ink">
                    What a migration covers
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <Reveal delay={0.08}>
                  <ul className="divide-y divide-line border-y border-line">
                    {COVERAGE.map((c) => (
                      <li key={c} className="py-4 text-[1.0625rem] text-ink">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 rounded-[12px] border border-line bg-bg-elevated p-5 text-[0.95rem] leading-relaxed text-ink-2">
                    Compatibility and migration scope depend on the platforms
                    involved. We review both ends before quoting, and we tell
                    you what can and cannot carry over.
                  </p>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>

        <ProcessSteps showLink={false} />
        <FAQ items={migrationFaqs} heading="Migration questions." />
        <FinalCTA
          heading={["MOVE THE CATALOG.", "LAUNCH CLEANER."]}
          primary={{ label: "Plan My Migration", href: "/get-started?need=migration" }}
        />
      </main>
      <Footer />
      <StickyMobileCTA href="/get-started?need=migration" label="Plan My Migration" />
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Platform Migration",
            description:
              "Ecommerce catalog migration between Shopify, WooCommerce and custom platforms: extraction, normalization, redirects and validation.",
            path: "/store-migration",
            price: products.find((x) => x.id === "migration")!.price,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Platform Migration", path: "/store-migration" },
          ]),
          faqJsonLd(migrationFaqs),
        ]}
      />
    </>
  );
}

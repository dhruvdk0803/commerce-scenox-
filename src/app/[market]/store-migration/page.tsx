import { Price } from "@/components/market/Price";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessSteps, type ProcessStep } from "@/components/home/ProcessSteps";
import { CheckBox } from "@/components/ui/Status";
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

const MIGRATION_STEPS: ProcessStep[] = [
  { n: "01", title: "Connect both stores", items: ["Source export", "Target access", "URL list", "Apps & integrations"], note: "Your current store stays live throughout." },
  { n: "02", title: "Audit and map", items: ["Products & variants", "Categories → collections", "SEO handles", "Metafields"], note: "You get a fixed quote and a mapping plan." },
  { n: "03", title: "Rebuild and redirect", items: ["Cleanup", "Rebuild on target", "301 redirects", "Validation"], note: "Automation for speed. Human review where it matters." },
  { n: "04", title: "Review and switch", items: ["Approval", "Final sync", "Go-live", "QA"], note: "You switch over when you're ready." },
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
            { k: "STARTS FROM", v: <><Price set={products.find((x) => x.id === "migration")!.price} /> · per store</> },
            { k: "TYPICAL PATHS", v: "WooCommerce → Shopify · Legacy → Shopify · Structured source → WooCommerce" },
            { k: "CARRIES OVER", v: "Products, variants, categories, images, SEO handles, redirects" },
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
            <SectionHeader
              id="coverage-heading"
              eyebrow="SCOPE"
              title={<>What a migration covers.</>}
              description="Compatibility depends on the platforms involved. We review both ends before quoting and tell you what can and cannot carry over."
            />
            <Reveal delay={0.08}>
              <ul className="mt-12 grid border-t border-line md:mt-16 md:grid-cols-2 md:gap-x-10">
                {COVERAGE.map((c) => (
                  <li key={c} className="flex items-center gap-3 border-b border-line py-4 text-[1.0625rem] text-ink">
                    <CheckBox done />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>

        <ProcessSteps
          showLink={false}
          title="From old store to new store."
          description="Four steps. Your current store stays live the whole time; you switch over when the new one is approved."
          steps={MIGRATION_STEPS}
        />
        <FAQ items={migrationFaqs} heading="Migration questions." />
        <FinalCTA
          heading={["MOVE THE CATALOG.", "LAUNCH CLEANER."]}
          primary={{ label: "Plan My Migration", href: "/get-started?need=migration" }}
          body="Tell us where your store is now, where it needs to go, and roughly how many products it has."
          secondary={null}
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

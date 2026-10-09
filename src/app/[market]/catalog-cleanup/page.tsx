import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Section, Container } from "@/components/ui/Section";
import { Button, TextLink } from "@/components/ui/Button";
import { Stagger, MotionItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { products } from "@/content/products";
import { CleanupDiff } from "@/components/pages/CleanupDiff";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Product Catalog Cleanup & Enrichment Service",
  description:
    "Fix messy titles, missing descriptions, duplicate categories and unmatched images across your live Shopify or WooCommerce store, in bulk, with no downtime.",
  path: "/catalog-cleanup",
});

const CLEAN_CATEGORIES = [
  { title: "Titles", desc: "Abbreviations and inconsistent casing rewritten into clear, searchable names." },
  { title: "Descriptions", desc: "Missing copy prepared from specifications and category context." },
  { title: "Categories", desc: "Loose or duplicated labels merged into one consistent taxonomy." },
  { title: "Tags", desc: "Variant spellings and casing consolidated into a single canonical set." },
  { title: "Images", desc: "Files matched to SKUs, renamed and resized to platform requirements." },
  { title: "Variants", desc: "Duplicate product rows consolidated into proper option structures." },
  { title: "Attributes", desc: "Specifications structured into typed fields instead of free text." },
  { title: "SEO", desc: "Handles, titles and meta descriptions written per product." },
  { title: "Metafields", desc: "Technical details captured as queryable, filterable data." },
];

const cleanupFaqs = [
  {
    q: "Do you need admin access to clean my catalog?",
    a: "Not to audit it. We work from an export first. Publishing changes uses scoped collaborator or staff access arranged after approval — never your master password.",
  },
  {
    q: "Will this change how my store looks to customers?",
    a: "The theme and layout are untouched. We work on the product data behind it: titles, descriptions, categories, tags, images and metafields.",
  },
  {
    q: "Can you clean a catalog without taking it offline?",
    a: "Yes. Cleanup happens on exported data and staged changes. Nothing publishes to your live store until you review and approve it.",
  },
  {
    q: "What if only some products need fixing?",
    a: "We inspect the full catalog and flag exactly which products and fields need work. You are not paying to touch what already meets the bar.",
  },
  {
    q: "How is this different from a one-time bulk edit tool?",
    a: "Bulk edit tools apply one rule at a time. We review the catalog as a whole — titles, categories, images and metafields together — so the fixes are consistent across the store, not just per field.",
  },
];

export default function CatalogCleanupPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="CATALOG CLEANUP & ENRICHMENT"
          title={
            <>
              Your products are already online.
              <br />
              Your catalog is the problem.
            </>
          }
          lead="Inconsistent titles, missing descriptions, duplicate categories and unmatched images cost you search rankings and conversions. We fix them in bulk."
          actions={
            <>
              <Button href="/get-started?need=cleanup" size="lg" arrow>
                Get Your Catalog Audited
              </Button>
              <TextLink href="/free-sample">Or send 10 products first</TextLink>
            </>
          }
          facts={[
            { k: "SCOPE", v: "Titles · descriptions · categories · tags · images · variants · SEO · metafields" },
            { k: "WORKS FROM", v: "A store export. No admin access needed to audit." },
            { k: "PLATFORMS", v: "Shopify · WooCommerce · Custom" },
            { k: "OUTPUT", v: "Bulk-corrected catalog, approved before publish" },
          ]}
        />

        <Section tone="muted" aria-labelledby="diff-heading">
          <Container>
            <SectionHeader
              id="diff-heading"
              eyebrow="CURRENT CATALOG → CLEAN CATALOG"
              title="Same store. Same URLs. Structured data."
              description="One product record as it sits on a live storefront today, and the same record after a cleanup pass."
            />
            <div className="mt-12 md:mt-16">
              <CleanupDiff />
            </div>
          </Container>
        </Section>

        <Section aria-labelledby="what-heading">
          <Container>
            <SectionHeader
              id="what-heading"
              eyebrow="WHAT GETS CLEANED"
              title="Nine categories. One pass."
              description="We review the catalog as a whole so fixes are consistent across the store, not applied one field at a time."
            />
            <Stagger
              as="ul"
              className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-line bg-line sm:grid-cols-3 md:mt-16"
              amount={0.1}
            >
              {CLEAN_CATEGORIES.map((c) => (
                <MotionItem key={c.title} className="bg-bg p-5">
                  <h3 className="text-[1rem] font-semibold tracking-[-0.015em] text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] leading-snug text-ink-2">{c.desc}</p>
                </MotionItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        <ServiceGrid heading={["Bulk cleanup.", "Not row by row."]} />
        <FAQ items={cleanupFaqs} heading="Cleanup questions." />
        <FinalCTA
          heading={["FIX THE CATALOG.", "KEEP THE STORE."]}
          primary={{ label: "Get Your Catalog Audited", href: "/get-started?need=cleanup" }}
        />
      </main>
      <Footer />
      <StickyMobileCTA href="/get-started?need=cleanup" label="Get Your Catalog Audited" />
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Catalog Cleanup & Enrichment",
            description:
              "Bulk cleanup of product titles, descriptions, categories, tags, images, variants and metafields for live ecommerce catalogs.",
            path: "/catalog-cleanup",
            price: products.find((x) => x.id === "cleanup")!.price,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Catalog Cleanup & Enrichment", path: "/catalog-cleanup" },
          ]),
          faqJsonLd(cleanupFaqs),
        ]}
      />
    </>
  );
}

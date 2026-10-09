import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Button, TextLink } from "@/components/ui/Button";
import { ProductMenu } from "@/components/pricing/ProductMenu";
import { BundleCards } from "@/components/pricing/BundleCards";
import { PlanCards } from "@/components/pricing/PlanCards";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, servicesItemListJsonLd } from "@/lib/seo";
import { faqs } from "@/content/faqs";
import { products } from "@/content/products";

export const metadata: Metadata = pageMeta({
  title: "Ecommerce Services: Catalog, Feeds, Email & WhatsApp",
  description:
    "Every Scenox Commerce service in one place: product upload, catalog cleanup, AI product photos, Google Shopping feeds, email, WhatsApp and AI customer support.",
  path: "/services",
});

const SERVICE_FAQS = faqs.filter((f) =>
  ["Do you only do catalogs?", "Do I need Klaviyo or a separate WhatsApp tool?", "Why do you cost less than an agency?", "Do you offer ongoing catalog management?"].includes(f.q),
);

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="SERVICES"
          title="Everything a store needs after it's built."
          lead="Eight fixed products across the ecommerce cycle: get every product listed, sell it on every channel, then recover carts and keep customers coming back. Each one starts from 48 hours."
          actions={
            <>
              <Button href="/get-started" size="lg" arrow>
                Get Started
              </Button>
              <TextLink href="#bundles">See the kits</TextLink>
            </>
          }
          facts={[
            { k: "LIST", v: "Product upload, cleanup, migration, AI product photos" },
            { k: "SELL", v: "Google Shopping, Meta, Amazon and Flipkart feeds" },
            { k: "RETAIN", v: "Email, abandoned cart, WhatsApp, AI customer support" },
            { k: "PLATFORMS", v: "Shopify · WooCommerce · Custom" },
          ]}
        />
        <ProductMenu tone="muted" eyebrow="ALL SERVICES" />
        <BundleCards />
        <PlanCards />
        <FAQ items={SERVICE_FAQS} heading="About our services." />
        <FinalCTA />
      </main>
      <Footer />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          servicesItemListJsonLd(products.map((p) => ({ name: p.name, path: p.href }))),
          faqJsonLd(SERVICE_FAQS),
        ]}
      />
    </>
  );
}

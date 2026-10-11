import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesArt } from "@/components/pages/HeroArt";
import { Button, TextLink } from "@/components/ui/Button";
import { ProductMenu } from "@/components/pricing/ProductMenu";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Price } from "@/components/market/Price";
import { plans } from "@/content/pricing";
import { bundles } from "@/content/bundles";
import { MARKET_IDS, type PriceSet } from "@/lib/markets";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, servicesItemListJsonLd } from "@/lib/seo";
import { faqs } from "@/content/faqs";
import { products } from "@/content/products";

export const metadata: Metadata = pageMeta({
  title: "Ecommerce Services: Catalog, Feeds, Email & WhatsApp",
  description:
    "Every Scenox Commerce service in one place: product upload, catalog cleanup, AI product photos, Google Shopping feeds, email, WhatsApp, AI customer support and AI voice and chat shopping.",
  path: "/services",
});

const cheapestKit = Object.fromEntries(
  MARKET_IDS.map((m) => {
    const vals = bundles.map((b) => b.price[m]).filter((v): v is number => v != null);
    return [m, vals.length ? Math.min(...vals) : null];
  }),
) as PriceSet;

const SERVICE_FAQS = faqs.filter((f) =>
  ["Do you only do catalogs?", "Do I need Klaviyo or a separate WhatsApp tool?", "Why do you cost less than an agency?", "Do you offer ongoing catalog management?"].includes(f.q),
);

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          art={<ServicesArt />}
          eyebrow="SERVICES"
          title="Everything a store needs after it's built."
          lead="Eight fixed products across the ecommerce cycle: get every product listed, sell it on every channel, then recover carts and keep customers coming back. Most can go live in as little as 48 hours for eligible projects."
          actions={
            <>
              <Button href="/get-started" size="lg" arrow>
                Get a Quote
              </Button>
              <TextLink href="#bundles">See the kits</TextLink>
            </>
          }
          facts={[
            { k: "LIST", v: "Product upload, cleanup, migration, AI product photos" },
            { k: "SELL", v: "Google Shopping, Meta, Amazon and Flipkart feeds" },
            { k: "RETAIN", v: "Email, abandoned cart, WhatsApp, AI support, voice & chat shopping" },
            { k: "PLATFORMS", v: "Shopify · WooCommerce · Magento · BigCommerce · Wix · Custom" },
          ]}
        />
        <ProductMenu
          tone="muted"
          eyebrow="ALL SERVICES"
          title={<>Eight services. Pick one or several.</>}
          description="Every row opens the full service page: what's included, how the first 48 hours run, and the questions people ask."
        />

        {/* kits and plans live on /pricing; here, just point to them */}
        <section className="section-y-sm border-t border-line" aria-label="Kits and monthly plans">
          <div className="container-x">
          <div className="grid gap-px overflow-hidden rounded-[12px] border border-line bg-line md:grid-cols-2">
            {[
              { k: "PREFER A BUNDLE?", t: <>Three kits from <Price set={cheapestKit} /></>, d: "Launch, Revenue and Complete kits, priced below buying the parts.", href: "/pricing#bundles" },
              { k: "WANT IT RUN MONTHLY?", t: <>Plans from <Price set={plans[0].price} /> a month</>, d: "Catalog upkeep, feeds, email and WhatsApp kept running by us.", href: "/pricing#plans" },
            ].map((x) => (
              <Link key={x.href} href={x.href} className="group flex flex-col gap-2 bg-bg p-6 transition-colors duration-[160ms] hover:bg-bg-muted/50 md:p-8">
                <span className="mono-micro text-ink-3">{x.k}</span>
                <span className="flex items-center gap-2 text-[1.35rem] font-semibold tracking-[-0.02em] text-ink tabular">
                  {x.t}
                  <ArrowRight aria-hidden className="size-5 transition-transform duration-[200ms] ease-[var(--ease-out)] group-hover:translate-x-0.5" strokeWidth={2} />
                </span>
                <span className="text-[0.95rem] text-ink-2">{x.d}</span>
              </Link>
            ))}
          </div>
          </div>
        </section>
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

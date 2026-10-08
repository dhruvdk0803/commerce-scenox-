import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Hero } from "@/components/home/Hero";
import { ClientStrip } from "@/components/home/ClientStrip";
import { PlatformStrip, Statement } from "@/components/home/PlatformStrip";
import { MessySpreadsheet } from "@/components/home/MessySpreadsheet";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { SystemSpec } from "@/components/home/SystemSpec";
import { SampleOffer } from "@/components/home/SampleOffer";
import { Advantages } from "@/components/home/Advantages";
import { ProductMenu } from "@/components/pricing/ProductMenu";
import { PricingTabs } from "@/components/pricing/PricingTabs";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import { homeFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "1000 Products. 48 Hours. Live on Your Store",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <PlatformStrip />
        <ClientStrip />
        <Statement />
        <MessySpreadsheet />
        <BeforeAfter />
        <ProductMenu />
        <SystemSpec />
        <Advantages />
        <PricingTabs />
        <SampleOffer />
        <FAQ items={homeFaqs} />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Ecommerce catalog upload and catalog operations",
            description: site.description,
            path: "/",
          }),
          faqJsonLd(homeFaqs),
        ]}
      />
    </>
  );
}

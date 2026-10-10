import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Hero } from "@/components/home/Hero";
import { ClientStrip } from "@/components/home/ClientStrip";
import { PlatformStrip } from "@/components/home/PlatformStrip";
import { Showcase } from "@/components/home/Showcase";
import { PhotoStudio } from "@/components/home/PhotoStudio";
import { QuoteEstimator } from "@/components/pricing/QuoteEstimator";
import { BeforeYouPay } from "@/components/pricing/BeforeYouPay";
import { MessySpreadsheet } from "@/components/home/MessySpreadsheet";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { SampleOffer } from "@/components/home/SampleOffer";
import { Advantages } from "@/components/home/Advantages";
import { ServiceBento } from "@/components/home/ServiceBento";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import { homeFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Bulk Product Upload in 48 Hours, Run by AI",
  description:
    "1000+ products live on Shopify, WooCommerce, Magento or BigCommerce from 48 hours, plus feeds, email, WhatsApp and AI support. AI engine, checked by people.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <ClientStrip />
        <Showcase />
        <PlatformStrip />
        <MessySpreadsheet />
        <BeforeAfter />
        <PhotoStudio />
        <ServiceBento />
        <Advantages />
        <QuoteEstimator />
        <BeforeYouPay tone="muted" />
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

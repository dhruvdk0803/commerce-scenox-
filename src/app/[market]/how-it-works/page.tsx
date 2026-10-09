import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProcessExplorer } from "@/components/pages/ProcessExplorer";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { SystemSpec } from "@/components/home/SystemSpec";
import { Advantages } from "@/components/home/Advantages";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { SampleOffer } from "@/components/home/SampleOffer";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { faqs } from "@/content/faqs";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "How It Works — From raw catalog to live storefront",
  description:
    "Input, ingest, normalize, enrich, validate, approval, publish, QA. How Scenox Commerce turns messy product data into a live ecommerce catalog. Automation for speed, human review where it matters.",
  path: "/how-it-works",
});


export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }])} />

        <PageHero
          eyebrow="HOW IT WORKS"
          title={
            <>
              From raw catalog.
              <br />
              To live storefront.
            </>
          }
          lead="Eight stages. Most run as software. The ones that need judgement run through people. Select a stage to see what happens inside it."
          className="pb-12 md:pb-16"
          facts={[
            { k: "STAGES", v: "8 · Input → QA" },
            { k: "AUTOMATED", v: "Ingest · normalize · enrich · validate · publish" },
            { k: "HUMAN", v: "Approval · flagged rows · storefront QA" },
            { k: "YOU DECIDE", v: "Nothing publishes without sign-off" },
          ]}
        />

        <section className="container-x pb-20 md:pb-28" aria-label="Interactive process">
          <Reveal amount={0.15}>
            <ProcessExplorer />
          </Reveal>
        </section>

        <SystemSpec />
        <Advantages />


        <BeforeAfter />
        <ProcessSteps showLink={false} />
        <SampleOffer />
        <FAQ items={faqs.slice(0, 6)} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

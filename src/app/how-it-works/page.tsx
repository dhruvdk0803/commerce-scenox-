import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProcessExplorer } from "@/components/pages/ProcessExplorer";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { SystemSpec } from "@/components/home/SystemSpec";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { SampleOffer } from "@/components/home/SampleOffer";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
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

const PRINCIPLES = [
  ["Automation for speed.", "Parsing, normalization, validation and formatting run as software. That's what makes 48-hour turnarounds possible."],
  ["Human review where it matters.", "Category trees, naming conventions, flagged rows and the final storefront are checked by people."],
  ["Nothing is silently dropped.", "Rows that can't be resolved are flagged and resolved with you, not deleted to make the numbers look clean."],
  ["You approve before publish.", "A representative sample is reviewed with you before anything goes live."],
];

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

        <section className="section-y border-t border-line" aria-labelledby="principles-heading">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>PRINCIPLES</Eyebrow>
              <h2 id="principles-heading" className="mt-5 text-h2 text-ink">
                Automation for speed.
                <br />
                <span className="text-ink-2">Human review where it matters.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
              <ol className="divide-y divide-line border-y border-line">
                {PRINCIPLES.map(([t, d], i) => (
                  <li key={t} className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr]">
                    <span className="mono-label tabular pt-1.5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{t}</h3>
                      <p className="mt-2 max-w-[56ch] text-[0.975rem] leading-relaxed text-ink-2">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

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

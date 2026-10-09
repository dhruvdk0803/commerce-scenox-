import type { Metadata } from "next";
import { Button, TextLink } from "@/components/ui/Button";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProcessExplorer } from "@/components/pages/ProcessExplorer";
import { SystemSpec } from "@/components/home/SystemSpec";
import { Advantages } from "@/components/home/Advantages";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { SampleOffer } from "@/components/home/SampleOffer";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { faqs } from "@/content/faqs";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMeta({
  title: "How It Works: AI Catalog Engine, Checked by People",
  description:
    "How Scenox turns raw spreadsheets and supplier files into a live, store-ready catalog: ingestion, AI enrichment, human review, validation and publishing.",
  path: "/how-it-works",
});


const BUYING: [string, string][] = [
  ["Pick what you need", "A single service, a kit, or a monthly plan. Not sure? Send us 10 products first."],
  ["Send files and access", "Spreadsheets, supplier files, photos. Store access is scoped staff access, never your password."],
  ["Get a fixed quote", "We inspect what you sent and confirm the scope, the final price and a realistic timeline."],
  ["Approve the scope", "Work starts only when you agree to the quote and the plan."],
  ["We deliver, you review", "AI does the volume, our team checks it, and you approve before anything goes live."],
  ["Keep it running", "Optionally, a monthly plan keeps the catalog, channels and retention flows up to date."],
];

const HOW_FAQS = faqs.slice(0, 6);

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }]), faqJsonLd(HOW_FAQS)]} />

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
          actions={
            <>
              <Button href="/get-started" size="lg" arrow>
                Get Started
              </Button>
              <TextLink href="/pricing">See prices</TextLink>
            </>
          }
          facts={[
            { k: "STAGES", v: "8 · Input → QA" },
            { k: "AUTOMATED", v: "Ingest · normalize · validate · publish" },
            { k: "AI + REVIEW", v: "Category mapping · enrichment" },
            { k: "HUMAN", v: "Approval · flagged rows · storefront QA" },
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

        <Section aria-labelledby="buying-heading">
          <Container>
            <SectionHeader
              id="buying-heading"
              eyebrow="HOW BUYING WORKS"
              title={<>Six steps, no surprises.</>}
              description="The same path for a single service, a kit or a monthly plan. Nothing goes live on your store without your sign-off."
            />
            <ol className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-line bg-line md:mt-16 md:grid-cols-3">
              {BUYING.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={(i % 3) * 0.05} className="bg-bg p-5 md:p-6">
                  <span className="mono-micro text-ink-3 tabular">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-[1.05rem] font-semibold tracking-[-0.015em] text-ink">{t}</h3>
                  <p className="mt-1.5 text-[0.925rem] leading-snug text-ink-2">{d}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
        <SampleOffer />
        <FAQ items={HOW_FAQS} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

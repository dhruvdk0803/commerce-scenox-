import type { Metadata } from "next";
import { ProofModule } from "@/components/home/ProofModule";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { demoCase, type CaseStudy } from "@/components/home/ProofModule";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { CaseStudyTemplate } from "@/components/pages/CaseStudyTemplate";
import { PageHero } from "@/components/ui/PageHero";
import { clients, clientClaim } from "@/content/clients";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = pageMeta({
  title: "Case Studies",
  description:
    "Clients and catalog workflows from Scenox Commerce: 250+ companies and enterprises worldwide, including Om Shanti Enterprises, Compliments Boutique, Katta Interior and Hardware and All Home Living.",
  path: "/case-studies",
});

const distributorCase: CaseStudy = {
  slug: "sample-distributor-catalog",
  isDemo: true,
  customer: "Sample: distributor catalog",
  industry: "Industrial supplies",
  platform: "WooCommerce",
  catalogSize: "12,400 SKUs",
  problem:
    "An ERP export with inconsistent part numbers, PDF spec sheets for half the range and roughly 40 overlapping categories built up over several years.",
  input: ["1 ERP export (CSV)", "PDF spec sheets, ~1,900 products", "Legacy WooCommerce category tree"],
  workflow: [
    "SKU and category audit",
    "Category tree rebuilt",
    "Spec sheets parsed into attributes",
    "Batch cleanup and enrichment",
    "Staged publish with QA",
  ],
  handled: [
    "Part numbers normalized",
    "40 categories consolidated to 14",
    "Specifications extracted into metafields",
    "Duplicate listings merged",
    "Images matched by part number",
    "Published in 6 scheduled batches",
  ],
  turnaround: "Illustrative",
  result:
    "A 12,400-SKU catalog restructured into a consistent category tree with structured specifications, published in batches with QA between each.",
  before: ["blk-04-M8x40", "Hardware / Fasteners / misc", "spec: steel, M8, zinc", "no image on file"],
  after: [
    "Hex Bolt M8x40, Zinc-Plated Steel",
    "Fasteners › Bolts › Hex Bolts",
    "material: Steel · coating: Zinc · thread: M8",
    "hex-bolt-m8x40-zinc-01.jpg",
  ],
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow="CASE STUDIES"
          title="Real work. Real catalogs."
          lead={`Catalog operations for ${clientClaim.headline}, from boutiques to manufacturers and distributors. Named clients below; the workflow write-ups are representative samples until each client clears a full case study for publication.`}
          facts={[
            { k: "WORKED WITH", v: clientClaim.headline },
            { k: "SECTORS", v: "Retail · interiors & hardware · manufacturing · home living" },
            { k: "STRUCTURE", v: "Input · workflow · output · before/after" },
          ]}
        />

        <Section compact tone="muted" aria-labelledby="clients-heading">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <Eyebrow>CLIENTS</Eyebrow>
                <h2 id="clients-heading" className="mt-5 text-h2 text-ink">
                  Companies we&apos;ve worked with.
                </h2>
                <p className="mt-4 max-w-[36ch] text-[1rem] leading-[1.55] text-ink-2">
                  {clientClaim.headline}. A selection of named clients:
                </p>
              </div>
              <ul className="grid gap-px overflow-hidden rounded-[12px] border border-line bg-line sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
                {clients.map((c, i) => (
                  <li key={c.name} className="flex min-h-[6.5rem] flex-col justify-between bg-bg p-5">
                    <span className="mono-micro tabular text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        <ProofModule />
        <CaseStudyTemplate cs={demoCase} />
        <CaseStudyTemplate cs={distributorCase} />

        <Section compact aria-labelledby="note-heading">
          <Container>
            <Reveal className="flex flex-col items-start gap-5 rounded-[12px] border border-line bg-bg-elevated p-6 sm:flex-row sm:items-center sm:justify-between">
              <p id="note-heading" className="max-w-[52ch] text-[1rem] text-ink-2">
                Full write-ups with figures are published as each client clears
                them. The sample workflows above show the structure every case
                study follows.
              </p>
              <Button href="/get-started" arrow>
                Get Started
              </Button>
            </Reveal>
          </Container>
        </Section>

        <FinalCTA />
      </main>
      <Footer />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />
    </>
  );
}

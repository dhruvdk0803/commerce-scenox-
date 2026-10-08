import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button, TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero, Facts } from "@/components/ui/PageHero";
import { CheckBox, Status } from "@/components/ui/Status";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PlanCards } from "@/components/pricing/PlanCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { Price } from "@/components/market/Price";
import { productPages, type ProductPage } from "@/content/products";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

function get(id: string): ProductPage {
  const p = productPages.find((x) => x.id === id);
  if (!p) notFound();
  return p;
}

export function productMeta(id: string): Metadata {
  const p = get(id);
  return pageMeta({ title: p.metaTitle, description: p.metaDescription, path: p.href });
}

function PriceBox({ p }: { p: ProductPage }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-[10px] border border-ink bg-bg-elevated p-5">
        <p className="mono-micro text-ink-3">STARTS FROM</p>
        <p className="mt-2 text-[2.5rem] font-semibold leading-none tracking-[-0.035em] text-ink tabular">
          <Price set={p.price} />
        </p>
        <p className="mono-micro mt-2 text-ink-2">{p.unit.toUpperCase()}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <span className="mono-micro text-ink-3">DELIVERY</span>
          <span className="text-[0.9rem] text-ink">{p.turnaround}</span>
        </div>
      </div>
      <Facts label="WHAT YOU GET" facts={p.facts} />
    </div>
  );
}

export function ProductTemplate({ id }: { id: string }) {
  const p = get(id);
  const cta = `/get-started?need=${p.need}`;

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          eyebrow={p.eyebrow}
          title={
            <>
              {p.headline[0]}
              <br />
              <span className="text-ink-2">{p.headline[1]}</span>
            </>
          }
          lead={p.lead}
          actions={
            <>
              <Button href={cta} size="lg" arrow event="cta_click" eventParams={{ cta: "product_hero", product: p.id }}>
                {p.cta}
              </Button>
              <TextLink href="#plans">Or run it monthly</TextLink>
            </>
          }
          aside={<PriceBox p={p} />}
        />

        <Section tone="muted" aria-labelledby="ledger-heading">
          <Container>
            <SectionHeader
              id="ledger-heading"
              eyebrow="HOW IT RUNS"
              title={p.ledger.heading}
              description="AI does the volume. A person reviews anything uncertain before it reaches your store or your customers. Figures shown are illustrative."
            />
            <Reveal delay={0.06} className="mt-12 md:mt-16">
              <div className="overflow-hidden rounded-[12px] border border-line bg-bg">
                <div className="flex h-11 items-center justify-between border-b border-line px-4 md:px-5">
                  <span className="mono-label text-ink-2">{p.ledger.title}</span>
                  <span className="mono-micro text-ink-3">{p.ledger.note}</span>
                </div>
                <ul className="divide-y divide-line">
                  {p.ledger.rows.map((r) => (
                    <li
                      key={r.label}
                      className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3.5 md:grid-cols-[1fr_10rem_8rem] md:px-5"
                    >
                      <span className="min-w-0 text-[0.95rem] text-ink">{r.label}</span>
                      <span className="mono-micro hidden text-ink-3 tabular md:inline">{r.meta}</span>
                      <Status kind={r.status} label={r.statusLabel} className="justify-self-end" />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </Section>

        <Section aria-labelledby="scope-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-5">
                <Eyebrow>FIXED SCOPE</Eyebrow>
                <h2 id="scope-heading" className="mt-5 max-w-[16ch] text-h2 text-ink">
                  {p.deliverables.title}.
                </h2>
                <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
                  {p.deliverables.items.map((i) => (
                    <li key={i} className="flex items-center gap-3 py-3.5 text-[1rem] text-ink">
                      <CheckBox done />
                      {i}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal delay={0.08}>
                  <Eyebrow>WHAT OTHERS SKIP</Eyebrow>
                </Reveal>
                <ol className="mt-5 flex flex-col divide-y divide-line border-y border-line">
                  {p.edges.map((e, i) => (
                    <Reveal as="li" key={e.title} delay={0.1 + i * 0.05} className="flex gap-5 py-6">
                      <span className="mono-label pt-1 text-ink-3 tabular">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="text-h4 text-ink">{e.title}</h3>
                        <p className="mt-2 max-w-[52ch] text-[1rem] leading-[1.6] text-ink-2">{e.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </Section>

        <PlanCards />
        <FAQ items={p.faqs} heading={`${p.name.split(" ")[0]} questions.`} />
        <FinalCTA heading={p.finalHeading} body={p.desc} primary={{ label: p.cta, href: cta }} />
      </main>
      <Footer />
      <StickyMobileCTA href={cta} label={p.cta} />
      <JsonLd
        data={[
          serviceJsonLd({ name: p.name, description: p.metaDescription, path: p.href }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: p.name, path: p.href },
          ]),
          faqJsonLd(p.faqs),
        ]}
      />
    </>
  );
}

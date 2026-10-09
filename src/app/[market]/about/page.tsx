import { AudienceCards } from "@/components/home/AudienceCards";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = pageMeta({
  title: "About Scenox Commerce",
  description:
    "Scenox Commerce is the ecommerce operations arm of Scenox Studios: an AI engine and a review team running catalogs, channels and retention for stores.",
  path: "/about",
});

const principles = [
  {
    index: "01",
    title: "Automation for speed. Human review where it matters.",
    body: "Repetitive extraction, mapping and formatting is automated. Pricing, categorization and edge cases get a person's attention before anything goes live.",
  },
  {
    index: "02",
    title: "The completed catalog is the product.",
    body: "Not a dashboard, not a tool license. What we deliver is a working, store-ready catalog — reviewed and ready to publish.",
  },
  {
    index: "03",
    title: "Structure before scale.",
    body: "A catalog that isn't structured consistently breaks the moment you try to grow it, migrate it or hand it to someone else. We fix the structure first.",
  },
  {
    index: "04",
    title: "Plain communication, no black boxes.",
    body: "You should be able to see exactly what was done to your data, and why, at every step of the project.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ])}
        />

        <PageHero
          eyebrow="COMPANY"
          title="Commerce operations shouldn't scale with headcount."
          lead="Scenox Commerce is part of Scenox Studios. Scenox Studios builds automation systems for repetitive operational work. Scenox Commerce applies the same engineering philosophy to ecommerce catalog operations."
          facts={[
            { k: "PARENT", v: site.parent },
            { k: "FOCUS", v: "Ecommerce catalog operations" },
            { k: "PLATFORMS", v: "Shopify · WooCommerce · Custom" },
            { k: "CONTACT", v: site.email },
          ]}
        />

        <Section tone="muted">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow index="§">HOW WE WORK</Eyebrow>
                <h2 className="text-h3 text-ink mt-4 max-w-[20ch]">
                  How we think about the work
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <ul className="divide-y divide-line border-y border-line">
                  {principles.map((p) => (
                    <li key={p.index} className="flex gap-6 py-7">
                      <span className="mono-label tabular text-ink-3 pt-1">
                        {p.index}
                      </span>
                      <div>
                        <h3 className="text-h4 text-ink">{p.title}</h3>
                        <p className="mt-2 text-[1.0625rem] leading-[1.6] text-ink-2 max-w-[62ch]">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>COMPANY FACTS</Eyebrow>
                <h2 className="text-h3 text-ink mt-4 max-w-[20ch]">
                  Who we are
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <dl className="divide-y divide-line border-y border-line">
                  <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                    <dt className="mono-label text-ink-3 sm:w-40 sm:shrink-0">
                      Parent company
                    </dt>
                    <dd className="text-[1.0625rem] text-ink">
                      <a
                        href={site.parentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-1"
                      >
                        {site.parent}
                        <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                    <dt className="mono-label text-ink-3 sm:w-40 sm:shrink-0">
                      Focus
                    </dt>
                    <dd className="text-[1.0625rem] text-ink">
                      Ecommerce catalog operations
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                    <dt className="mono-label text-ink-3 sm:w-40 sm:shrink-0">
                      Platforms
                    </dt>
                    <dd className="text-[1.0625rem] text-ink">
                      Shopify · WooCommerce · Custom
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                    <dt className="mono-label text-ink-3 sm:w-40 sm:shrink-0">
                      Contact
                    </dt>
                    <dd className="text-[1.0625rem] text-ink">
                      <a href={`mailto:${site.email}`} className="link-underline">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Container>
        </Section>

        <AudienceCards />

        <Section tone="dark">
          <Container>
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="text-h2 text-paper max-w-[16ch]">
                Ready to see what your catalog could look like?
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button href="/get-started" variant="inverse" arrow>
                  Get Started
                </Button>
                <Button
                  href="/free-sample"
                  variant="outline"
                  className="border-line-dark-strong text-paper hover:bg-white/5 hover:border-paper"
                >
                  Send 10 Products
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

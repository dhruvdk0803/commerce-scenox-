import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, Container } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Talk to Scenox Commerce about your product catalog. Send a message, or start a project directly. No store passwords are ever needed to start.",
  path: "/contact",
});

const ROUTES = [
  { n: "01", label: "Start a project", desc: "Tell us about your catalog and we'll scope it.", href: "/get-started", cta: "Get Started" },
  { n: "02", label: "Send 10 products", desc: "See what your catalog could look like first.", href: "/sample", cta: "Send 10 Products" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1" data-hide-sticky>
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />

        <section data-hero className="container-x pt-10 pb-20 md:pt-16 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* left: copy + direct routes */}
            <div className="lg:col-span-4">
              <Eyebrow>CONTACT</Eyebrow>
              <h1 className="mt-5 text-h1 text-ink">Talk to us about your catalog.</h1>
              <p className="mt-6 max-w-[40ch] text-lead text-ink-2">
                Scenox Commerce is part of Scenox Studios. We reply to every enquiry.
              </p>

              <div className="mt-10 overflow-hidden rounded-[10px] border border-line bg-bg-elevated">
                <div className="flex h-10 items-center border-b border-line px-4">
                  <span className="mono-label text-ink-2">WRITE TO US</span>
                </div>
                <div className="p-4">
                  <a href={`mailto:${site.email}`} className="link-underline inline-flex items-center gap-2 text-[1.1rem] font-medium text-ink">
                    {site.email}
                    <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
                  </a>
                  <p className="mt-3 text-[0.875rem] leading-snug text-ink-2">No store passwords are ever needed to start.</p>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-line border-y border-line">
                {ROUTES.map((r) => (
                  <li key={r.n} className="flex items-center justify-between gap-4 py-4">
                    <div className="flex gap-3">
                      <span className="mono-micro tabular pt-1 text-ink-3">{r.n}</span>
                      <div>
                        <p className="text-[0.95rem] font-medium text-ink">{r.label}</p>
                        <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-2">{r.desc}</p>
                      </div>
                    </div>
                    <Button href={r.href} variant="outline" size="sm" arrow className="shrink-0">
                      {r.cta}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* right: form */}
            <div className="lg:col-span-8">
              <div className="rounded-[14px] border border-line bg-bg p-5 sm:p-8 md:p-10">
                <ContactForm />
              </div>
              <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-3">
                By sending you agree to our{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
                  privacy policy
                </Link>
                . We use your details only to reply and scope your project.
              </p>
            </div>
          </div>
        </section>

        <Section tone="dark">
          <Container>
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[16ch] text-h2 text-paper">No store passwords. Just your catalog.</h2>
              <div className="flex flex-wrap gap-3">
                <Button href="/get-started" variant="inverse" arrow>
                  Get Started
                </Button>
                <Button href="/sample" variant="outline" className="border-line-dark-strong text-paper hover:border-paper hover:bg-white/5">
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

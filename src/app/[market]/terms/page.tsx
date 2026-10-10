import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { LegalDoc, type LegalSection } from "@/components/pages/LegalDoc";

export const metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms that apply when you engage Scenox Commerce for a catalog operations project.",
  path: "/terms",
});

const UPDATED = "October 2026";

const sections: LegalSection[] = [
  {
    id: "service-description",
    title: "Service description",
    body: (
      <p>
        Scenox Commerce provides ecommerce catalog operations services,
        including catalog upload, cleanup, enrichment and platform
        migration, for Shopify, WooCommerce, Magento (Adobe Commerce),
        BigCommerce, Wix and custom platforms.
      </p>
    ),
  },
  {
    id: "quotes-and-scope",
    title: "Quotes and scope",
    body: (
      <p>
        Starting prices shown on this website are indicative. A final quote
        is provided after we inspect your catalog and confirm scope.
        Turnaround targets, including any 48-hour target mentioned on this
        website, apply only to eligible catalogs and are not unconditional
        guarantees.
      </p>
    ),
  },
  {
    id: "client-responsibilities",
    title: "Client responsibilities",
    body: (
      <p>
        You confirm that you hold the necessary rights to the data and
        images you supply to us, and that you are authorized to share them
        for the purpose of this project. Where platform access is needed to
        complete the work, you agree to provide it in a scoped, revocable
        form.
      </p>
    ),
  },
  {
    id: "approval-and-publishing",
    title: "Approval and publishing",
    body: (
      <p>
        Where agreed as part of the project scope, you will review and
        approve the completed catalog before it is published to your store.
      </p>
    ),
  },
  {
    id: "payment",
    title: "Payment",
    body: (
      <p>
        Payment terms are agreed before a project begins and set out in the
        project quote or invoice.
      </p>
    ),
  },
  {
    id: "revisions",
    title: "Revisions",
    body: (
      <p>
        The scope of revisions included in a project is set out at the time
        of quoting. Work outside that scope may be quoted separately.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: (
      <p>
        We take reasonable care in performing our services, but we are not
        liable for indirect or consequential losses. Our total liability for
        any project is limited to the amount paid for that project.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        You own your catalog data and the delivered catalog. We do not claim
        ownership of any content you supply or of the finished work product.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <p>
        Either party may end an engagement in line with the terms agreed in
        the project quote. Work completed up to that point remains payable.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: <p>These terms are governed by the laws of India.</p>,
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${site.email}`} className="link-underline text-ink">
          {site.email}
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Terms of Service", path: "/terms" },
          ])}
        />

        <PageHero
          eyebrow="LEGAL"
          title="Terms of Service"
          lead="These terms apply when you engage Scenox Commerce for a catalog operations project."
          facts={[
            { k: "LAST UPDATED", v: UPDATED },
            { k: "APPLIES TO", v: "commerce.scenoxstudios.com" },
            { k: "CONTACT", v: site.email },
            { k: "GOVERNING LAW", v: "India" },
          ]}
        />

        <LegalDoc sections={sections} updated={UPDATED} contactEmail={site.email} />
      </main>
      <Footer />
    </>
  );
}

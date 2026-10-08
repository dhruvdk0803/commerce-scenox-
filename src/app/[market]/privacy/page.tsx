import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { LegalDoc, type LegalSection } from "@/components/pages/LegalDoc";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Scenox Commerce collects, uses and stores information submitted through this website.",
  path: "/privacy",
});

const UPDATED = "September 2026";

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <p>
        When you submit a form on this website, we may collect your name,
        work email address, phone number, company name, website URL, details
        about your product catalog, and any sample files you choose to
        upload.
      </p>
    ),
  },
  {
    id: "analytics",
    title: "Analytics",
    body: (
      <p>
        We may use analytics tools such as Google Analytics or Meta Pixel to
        understand how visitors use this website. These tools may set
        cookies or similar technologies in your browser.
      </p>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    body: (
      <p>
        We use the information you submit to respond to enquiries, scope
        catalog projects, and deliver the services you request. We do not
        use it for unrelated marketing without your consent.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Sharing",
    body: (
      <p>
        We do not sell your information. We may share it with service
        providers who help us operate this website or deliver services (for
        example, hosting or email providers), under obligations to keep it
        confidential.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    body: (
      <p>
        We retain information for as long as needed to respond to your
        enquiry or complete an active project, or until you ask us to delete
        it.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <p>
        You can ask us to access, correct or delete the information we hold
        about you by emailing{" "}
        <a href={`mailto:${site.email}`} className="link-underline text-ink">
          {site.email}
        </a>
        .
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        This website may use cookies for basic functionality and analytics.
        You can control cookies through your browser settings.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The date at the top of
        this page reflects the most recent update.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${site.email}`} className="link-underline text-ink">
          {site.email}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ])}
        />

        <PageHero
          eyebrow="LEGAL"
          title="Privacy Policy"
          lead="This policy describes how Scenox Commerce collects and uses information submitted through this website."
          facts={[
            { k: "LAST UPDATED", v: UPDATED },
            { k: "APPLIES TO", v: "commerce.scenoxstudios.com" },
            { k: "CONTACT", v: site.email },
          ]}
        />

        <LegalDoc sections={sections} updated={UPDATED} contactEmail={site.email} />
      </main>
      <Footer />
    </>
  );
}

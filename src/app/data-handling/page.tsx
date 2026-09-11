import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { LegalDoc, type LegalSection } from "@/components/pages/LegalDoc";

export const metadata = pageMeta({
  title: "Data Handling",
  description:
    "How Scenox Commerce receives, stores and handles the files and platform access you share for a catalog project.",
  path: "/data-handling",
});

const UPDATED = "September 2026";

const sections: LegalSection[] = [
  {
    id: "what-we-typically-receive",
    title: "What we typically receive",
    body: (
      <ul>
        <li>Spreadsheets and CSV files</li>
        <li>Supplier catalogs and price lists</li>
        <li>PDFs and scanned documents</li>
        <li>ERP exports</li>
        <li>Product image folders</li>
        <li>Exports from an existing store</li>
      </ul>
    ),
  },
  {
    id: "why-its-required",
    title: "Why it's required",
    body: (
      <p>
        Building a structured, store-ready catalog means working directly
        with your source data. We can only map, clean and format what you
        give us access to.
      </p>
    ),
  },
  {
    id: "how-files-are-handled",
    title: "How files are handled",
    body: (
      <ul>
        <li>Files are used only for the project they were submitted for.</li>
        <li>Files are stored in access-controlled project folders.</li>
        <li>Files are shared only with the people working on the project.</li>
      </ul>
    ),
  },
  {
    id: "automated-processing",
    title: "How automated systems process your data",
    body: (
      <>
        <p>
          Catalog files are processed by Scenox&rsquo;s own pipeline. That
          pipeline includes machine-learning classification and language
          models used to draft product descriptions and map categories.
          Outputs are reviewed by a person before anything is published to
          your store.
        </p>
        <p>
          Your files are used only to deliver your project. They are not
          used to train third-party models. Where third-party model
          providers are used as part of the pipeline, only the specific
          product data needed for that task is sent to them.
        </p>
      </>
    ),
  },
  {
    id: "when-platform-access-may-be-required",
    title: "When platform access may be required",
    body: (
      <p>
        Some projects require access to your Shopify, WooCommerce or other
        platform to publish the finished catalog. This is only requested
        after a project is approved, and only through scoped collaborator or
        staff accounts, or platform-native import tools where supported. We
        never ask for a master password.
      </p>
    ),
  },
  {
    id: "what-not-to-submit",
    title: "What not to submit through public forms",
    body: (
      <ul>
        <li>Store admin passwords</li>
        <li>Payment credentials</li>
        <li>Customer personal data</li>
      </ul>
    ),
  },
  {
    id: "how-to-request-deletion",
    title: "How to request deletion",
    body: (
      <p>
        Email{" "}
        <a href={`mailto:${site.email}`} className="link-underline text-ink">
          {site.email}
        </a>{" "}
        to request deletion. Files are removed after project completion on
        request.
      </p>
    ),
  },
];

export default function DataHandlingPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Data Handling", path: "/data-handling" },
          ])}
        />

        <PageHero
          eyebrow="DATA HANDLING"
          title="How we handle your data."
          lead="A plain description of what we ask for, why, and how it is stored and shared while your catalog project is underway."
          facts={[
            { k: "WE RECEIVE", v: "Spreadsheets, catalogs, exports, images" },
            { k: "WE NEVER ASK FOR", v: "Store or admin passwords" },
            { k: "ACCESS", v: "Scoped collaborator/staff accounts, after approval" },
            { k: "DELETION", v: "On request, after project completion" },
          ]}
        />

        <LegalDoc
          sections={sections}
          updated={UPDATED}
          contactEmail={site.email}
          intro={
            <div className="rounded-[10px] border border-line bg-bg-elevated p-5">
              <span className="mono-micro text-ink-3">ACCESS</span>
              <p className="mt-2 text-[1rem] leading-[1.65] text-ink">
                We never ask for your Shopify or WooCommerce admin password.
              </p>
            </div>
          }
        />
      </main>
      <Footer />
    </>
  );
}

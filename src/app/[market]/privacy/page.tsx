import Link from "next/link";
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
    "How Scenox Commerce handles personal information on this website and for clients: cookies, client customer data, sharing, transfers and your rights.",
  path: "/privacy",
});

const UPDATED = "October 2026";

const mail = (
  <a href={`mailto:${site.email}`} className="link-underline text-ink">
    {site.email}
  </a>
);

const COOKIES: [string, string, string, string][] = [
  ["scx_market", "Necessary", "Remembers your region so you see prices in your currency.", "12 months"],
  ["scx_consent", "Necessary", "Remembers your cookie choices.", "12 months"],
  ["Form drafts (session storage)", "Necessary", "Keeps a form you are filling in if you reload the page.", "Until you close the tab"],
  ["_ga, _ga_*", "Analytics (only with consent)", "Google Analytics: counts visits and how pages are used.", "Up to 2 years"],
  ["_fbp", "Advertising (only with consent)", "Meta Pixel: measures and improves our ads.", "Up to 90 days"],
];

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        Scenox Commerce is an ecommerce operations service run by Scenox Studios. This policy explains how we
        handle personal information on this website and when we deliver services to our clients. Questions go
        to {mail}.
      </p>
    ),
  },
  {
    id: "two-roles",
    title: "Our two roles",
    body: (
      <>
        <p>
          <strong className="font-medium text-ink">For website visitors and enquiries</strong>, we decide how
          your information is used (we are the &ldquo;controller&rdquo; or &ldquo;data fiduciary&rdquo;).
        </p>
        <p>
          <strong className="font-medium text-ink">For our clients&rsquo; customer data</strong> (for example
          email subscribers, WhatsApp contacts, order details and support conversations), we act on the
          client&rsquo;s instructions as their service provider (a &ldquo;processor&rdquo;). The client remains
          responsible for having a lawful basis and, where required, consent to contact their customers. If you
          are a customer of one of our clients, please contact that store first; we will help them respond.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect on this website",
    body: (
      <ul>
        <li>
          What you send us through forms: name, work email, phone, company, website, details about your store and
          catalog, and any files you upload.
        </li>
        <li>
          Basic technical data our hosting provider records to run and protect the site, such as IP address,
          browser and pages requested.
        </li>
        <li>Your region choice, and, only if you allow it, analytics and advertising data (see Cookies below).</li>
      </ul>
    ),
  },
  {
    id: "client-data",
    title: "Data we process for clients",
    body: (
      <>
        <p>To deliver our services we may process, on a client&rsquo;s behalf:</p>
        <ul>
          <li>Product and store data: catalogs, prices, stock, images and store exports.</li>
          <li>
            Customer contact details, such as email addresses and WhatsApp numbers, for flows and campaigns the
            client has asked us to run.
          </li>
          <li>Order and delivery details, for order updates, cash-on-delivery confirmation and order-status answers.</li>
          <li>Support conversations handled by the AI support agent, including messages handed to the client&rsquo;s team.</li>
        </ul>
        <p>
          We use this data only to provide the client&rsquo;s services. We do not sell it, use it for our own
          marketing, or use it to train third-party AI models. Marketing messages go only to people the client
          tells us have opted in; every email includes an unsubscribe link and WhatsApp messages honour
          opt-outs. At the end of an engagement we delete or return the client&rsquo;s data on request.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    body: (
      <ul>
        <li>To reply to enquiries, scope projects, prepare quotes and deliver the services you buy.</li>
        <li>To run, secure and improve this website.</li>
        <li>With your consent only: to measure site usage (analytics) and our advertising.</li>
      </ul>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases",
    body: (
      <p>
        Where laws such as the UK and EU GDPR apply, we rely on: steps you ask us to take before a contract, and
        performing that contract (enquiries and projects); our legitimate interest in running and securing the
        site; and your consent for analytics and advertising cookies, which you can withdraw at any time.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>
          Necessary cookies keep the site working. Analytics and advertising cookies are off until you allow them
          in the cookie banner, and you can change your choice any time with &ldquo;Cookie settings&rdquo; in the
          footer.
        </p>
        {/* phones: one entry per cookie; larger screens: table */}
        <dl className="mt-4 divide-y divide-line rounded-[10px] border border-line sm:hidden">
          {COOKIES.map(([n, t, p, k]) => (
            <div key={n} className="px-3 py-3">
              <dt className="font-mono text-[0.8rem] text-ink">{n}</dt>
              <dd className="mono-micro mt-1 text-ink-3">
                {t.toUpperCase()} · {k.toUpperCase()}
              </dd>
              <dd className="mt-1 text-[0.875rem] leading-snug text-ink-2">{p}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 hidden max-w-[62ch] overflow-x-auto rounded-[10px] border border-line sm:block">
          <table className="w-full min-w-[34rem] text-left text-[0.875rem]">
            <thead className="bg-bg-muted/60">
              <tr>
                {["Name", "Type", "Purpose", "Kept for"].map((h) => (
                  <th key={h} scope="col" className="mono-micro px-3 py-2.5 font-normal text-ink-3">
                    {h.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {COOKIES.map(([n, t, p, k]) => (
                <tr key={n}>
                  <td className="px-3 py-2.5 font-mono text-[0.8rem] text-ink">{n}</td>
                  <td className="px-3 py-2.5 text-ink-2">{t}</td>
                  <td className="px-3 py-2.5 text-ink-2">{p}</td>
                  <td className="px-3 py-2.5 text-ink-2">{k}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Service providers and sharing",
    body: (
      <>
        <p>
          We do not sell personal information. We share it only with providers who help us run the site or deliver
          services, under confidentiality and data-protection terms:
        </p>
        <ul>
          <li>Website hosting and delivery (Vercel).</li>
          <li>Email delivery, for enquiries and for client email flows.</li>
          <li>
            Meta, for the WhatsApp Business Platform used in client messaging, and for the Meta Pixel if you allow
            advertising cookies.
          </li>
          <li>Google, for Google Analytics if you allow analytics cookies.</li>
          <li>AI model providers used in our pipeline, which process data only to return results to us.</li>
        </ul>
        <p>We may also disclose information where the law requires it.</p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <p>
        Our providers may process data outside your country, including in the United States and India. Where the
        law requires it, we rely on recognised safeguards such as standard contractual clauses.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    body: (
      <p>
        Enquiries and project information are kept for as long as needed to respond, deliver and support the
        project, and to meet legal and accounting obligations, then deleted. Client data is kept for the
        engagement and deleted or returned on request when it ends. Cookie durations are listed above.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We use access controls, encrypted connections and scoped, least-privilege store access. We never ask for
        store passwords through public forms. See{" "}
        <Link href="/data-handling" className="link-underline text-ink">
          Data Handling
        </Link>{" "}
        for how project files are handled.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you can ask to access, correct, delete or receive a copy of your
          information, object to or restrict some uses, and withdraw consent. This includes rights under
          India&rsquo;s Digital Personal Data Protection Act 2023, the UK and EU GDPR, Australia&rsquo;s Privacy Act
          1988 and US state privacy laws such as California&rsquo;s. Email {mail} and we will respond within the
          time the law allows.
        </p>
        <p>
          You can also complain to your regulator, for example the Data Protection Board of India, the UK
          Information Commissioner&rsquo;s Office, or the Office of the Australian Information Commissioner.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>This website and our services are for businesses and are not intended for children.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this policy when our services or the law change. The date at the top shows the latest
        version.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <p>Questions or requests about privacy: {mail}.</p>,
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
          lead="How we handle personal information on this website, and when we run catalogs, email, WhatsApp and support for our clients."
          facts={[
            { k: "LAST UPDATED", v: UPDATED },
            { k: "APPLIES TO", v: "This website and our client services" },
            { k: "CONTACT", v: site.email },
          ]}
        />

        <LegalDoc sections={sections} updated={UPDATED} contactEmail={site.email} />
      </main>
      <Footer />
    </>
  );
}

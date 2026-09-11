import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadFormLoader } from "@/components/forms/LeadFormLoader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Get Started — Tell us about your catalog",
  description:
    "Tell us what you have, where it needs to go and how many products you're working with. We'll review the scope and reply with what's possible, how long it should take and what it will cost.",
  path: "/get-started",
});

const REASSURANCE = [
  ["01", "Fixed quote after inspection", "Starting prices are public. The final number is confirmed once we've seen your files."],
  ["02", "No store passwords", "Access is arranged after approval using scoped collaborator or staff accounts where supported."],
  ["03", "You approve before publish", "Nothing goes live on your store without your sign-off."],
];

export default function GetStartedPage() {
  return (
    <>
      <Header minimal />
      <main id="main" className="flex-1" data-hide-sticky>
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Get Started", path: "/get-started" }])} />
        <section className="container-x pt-10 pb-20 md:pt-16 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>GET STARTED</Eyebrow>
              <h1 className="mt-5 text-h1 text-ink">Tell us about your catalog.</h1>
              <p className="mt-6 max-w-[40ch] text-lead text-ink-2">
                We&apos;ll review the scope and tell you what&apos;s possible, how long it should take and what it will
                cost.
              </p>

              <ul className="mt-10 hidden flex-col divide-y divide-line border-y border-line lg:flex">
                {REASSURANCE.map(([n, t, d]) => (
                  <li key={n} className="flex gap-4 py-4">
                    <span className="mono-label tabular pt-1 text-ink-3">{n}</span>
                    <div>
                      <p className="text-[0.95rem] font-medium text-ink">{t}</p>
                      <p className="mt-1 text-[0.875rem] leading-snug text-ink-2">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mono-micro mt-8 hidden text-ink-3 lg:block">{site.platforms.join(" • ")}</p>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-[14px] border border-line bg-bg p-5 sm:p-8 md:p-10">
                <Suspense fallback={<div className="h-[32rem]" aria-busy="true" />}>
                  <LeadFormLoader />
                </Suspense>
              </div>
              <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-3">
                By submitting you agree to our{" "}
                <a href="/terms" className="underline underline-offset-2 hover:text-ink">
                  terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
                  privacy policy
                </a>
                . We use your details only to scope and deliver your project.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SampleForm } from "@/components/forms/SampleForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Wordmark } from "@/components/ui/Wordmark";
import { CheckBox } from "@/components/ui/Status";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Free Sample: Send Us 10 Products",
  description:
    "Send 10 products in any format and see exactly how your catalog will look once cleaned, structured and enriched, before you commit.",
  path: "/free-sample",
});

const WHAT_YOU_GET = [
  "Titles rewritten and normalized",
  "Categories mapped to a clean tree",
  "Variants consolidated where they belong",
  "Missing descriptions prepared",
  "Images matched to SKUs",
  "A note on how we'd run the full catalog",
];

export default function SamplePage() {
  return (
    <>
      {/* focused header: no navigation distractions for cold traffic */}
      <header className="border-b border-line">
        <div className="container-x flex h-16 items-center justify-between">
          <Wordmark />
          <Link href="/" className="text-[0.875rem] text-ink-2 hover:text-ink">
            <span className="link-underline">Full website</span>
          </Link>
        </div>
      </header>

      <main id="main" className="flex-1" data-hide-sticky>
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Send 10 Products", path: "/free-sample" }])} />
        <section className="container-x pt-10 pb-20 md:pt-16 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>FREE SAMPLE</Eyebrow>
              <h1 className="mt-5 text-h1 text-ink">Send us 10 products.</h1>
              <p className="mt-6 text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-ink">
                We&apos;ll show you what your catalog could look like.
              </p>
              <p className="mt-4 max-w-[44ch] text-[1.05rem] leading-[1.55] text-ink-2">
                Share a small sample of the catalog you&apos;re working with. We&apos;ll review the structure and show
                you how Scenox Commerce would approach it.
              </p>

              <div className="mt-10 rounded-[12px] border border-line bg-bg-elevated">
                <div className="flex h-11 items-center justify-between border-b border-line px-4">
                  <span className="mono-label text-ink-2">WHAT YOU GET BACK</span>
                </div>
                <ul className="p-4">
                  {WHAT_YOU_GET.map((w) => (
                    <li key={w} className="flex items-center gap-3 py-1.5 text-[0.95rem] text-ink">
                      <CheckBox done size="sm" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mono-micro mt-8 text-ink-3">{site.platforms.join(" • ")}</p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[14px] border border-line bg-bg p-5 sm:p-8 md:p-10">
                <SampleForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.8rem] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Scenox Commerce is part of{" "}
            <a href={site.parentUrl} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">
              Scenox Studios
            </a>
            .
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-ink">
              Privacy
            </Link>
            <Link href="/data-handling" className="inline-flex min-h-11 items-center hover:text-ink">
              Data handling
            </Link>
            <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

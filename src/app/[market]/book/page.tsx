import Link from "next/link";
import { Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookingEmbed } from "@/components/book/BookingEmbed";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Book a Call with Scenox Commerce",
  description:
    "Pick a time for a video call about your store: catalog, migration, feeds, email or WhatsApp. Slots show in your own time zone. Free, no obligation.",
  path: "/book",
});

const COVER = [
  "Your store, platform and where the catalog stands today",
  "What you need done and a rough product count",
  "How we'd run it, the timeline and what it would cost",
  "Whether the free 10-product sample makes sense first",
];

const BRING = ["Your store URL, if it's live", "A sample of your product file or supplier sheet", "Any deadline you're working to"];

export default function BookPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1" data-hide-sticky>
        <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Book a call", path: "/book" }])} />

        <section data-hero className="container-x pt-10 pb-20 md:pt-16 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Eyebrow>BOOK A CALL</Eyebrow>
              <h1 className="mt-5 text-h1 text-ink">
                Talk it through
                <span className="block text-ink-2">with the founder.</span>
              </h1>
              <p className="mt-6 max-w-[40ch] text-lead text-ink-2">
                A short video call about your store. No pitch deck, no obligation. Pick any open slot; it shows in your own time zone.
              </p>

              <div className="mt-10 overflow-hidden rounded-[10px] border border-line bg-bg-elevated">
                <div className="flex h-10 items-center border-b border-line px-4">
                  <span className="mono-label text-ink-2">WHAT WE&apos;LL COVER</span>
                </div>
                <ul className="flex flex-col gap-2.5 p-4">
                  {COVER.map((c) => (
                    <li key={c} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 overflow-hidden rounded-[10px] border border-line bg-bg-elevated">
                <div className="flex h-10 items-center border-b border-line px-4">
                  <span className="mono-label text-ink-2">HANDY TO HAVE</span>
                </div>
                <ul className="flex flex-col gap-2 p-4">
                  {BRING.map((c) => (
                    <li key={c} className="text-[0.95rem] leading-snug text-ink-2">{c}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-[0.9rem] leading-relaxed text-ink-3">
                Prefer writing? <Link href="/get-started" className="font-medium text-ink underline underline-offset-4">Get a fixed quote</Link> or email{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-ink underline underline-offset-4">{site.email}</a>.
              </p>
            </div>

            <div className="min-w-0 lg:col-span-8">
              <BookingEmbed src={site.bookingEmbed} />
              <p className="mt-4 text-[0.85rem] text-ink-3">
                Scheduling runs on Google Calendar. You&apos;ll get an invite with the video link straight away.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

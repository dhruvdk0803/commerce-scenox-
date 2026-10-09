import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="container-x section-y">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-5 max-w-[20ch] text-h1 text-ink">This page doesn&apos;t exist.</h1>
          <p className="mt-6 max-w-[44ch] text-lead text-ink-2">
            The link may be old or mistyped. These are the pages most people are looking for.
          </p>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <Button href="/" arrow>
              Back to home
            </Button>
            <nav aria-label="Popular pages" className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                ["Services", "/services"],
                ["Pricing", "/pricing"],
                ["Contact", "/contact"],
              ].map(([l, h]) => (
                <TextLink key={h} href={h}>
                  {l}
                </TextLink>
              ))}
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

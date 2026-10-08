import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="container-x section-y">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-5 max-w-[20ch] text-h1 text-ink">This page isn&apos;t in the catalog.</h1>
          <p className="mt-6 max-w-[44ch] text-lead text-ink-2">
            The link may be old or mistyped. Everything we offer starts from the homepage.
          </p>
          <div className="mt-8">
            <Button href="/" arrow>
              Back to home
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

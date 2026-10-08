import { Reveal } from "@/components/ui/Reveal";

export function PlatformStrip() {
  return (
    <section aria-label="Platforms" className="border-y border-line bg-bg-muted/60">
      <div className="container-x flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between md:py-6">
        <span className="mono-label text-ink-3">Built for</span>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 sm:gap-x-12">
          {[
            ["Shopify", "Products · Variants · Metafields"],
            ["WooCommerce", "Products · Attributes · Categories"],
            ["Custom Ecommerce", "CSV · JSON · API import"],
          ].map(([name, meta]) => (
            <li key={name} className="flex flex-col">
              <span className="text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
                {name}
              </span>
              <span className="mono-micro mt-1 text-ink-3">{meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Statement() {
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-9">
            <h2 className="text-h1 text-ink">
              50 products or 50,000.
              <br />
              <span className="text-ink-2">The workflow shouldn&apos;t be manual.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3 lg:pt-3">
            <p className="text-[1rem] leading-[1.55] text-ink-2">
              The 48-hour launch is where most stores start. From 50 to
              50,000+ SKUs, then on to Google Shopping, marketplaces, email
              and WhatsApp. One AI-powered engine, reviewed by people, from
              the first upload to the repeat order.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

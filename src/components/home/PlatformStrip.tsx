import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function PlatformStrip({ className }: { className?: string }) {
  return (
    <section aria-label="Platforms" className={cn("border-y border-line bg-bg-muted/60", className)}>
      <div className="container-x grid gap-5 py-6 md:py-7 lg:grid-cols-[7rem_minmax(0,1fr)] lg:items-center lg:gap-8">
        <span className="mono-label text-ink-3">Built for</span>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {[
            ["Shopify", "Variants · Metafields"],
            ["WooCommerce", "Attributes · Categories"],
            ["Magento", "Configurable · Attribute sets"],
            ["BigCommerce", "Variants · Custom fields"],
            ["Wix & custom", "CSV · JSON · API import"],
          ].map(([name, meta]) => (
            <li key={name} className="flex min-w-0 flex-col">
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
    <section className="pt-16 md:pt-[5.5rem] lg:pt-28">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-9">
            <h2 className="text-h1 text-ink">
              50 products or 50,000.
              <span className="block text-balance text-ink-2">The workflow shouldn&apos;t be manual.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3 lg:pt-3">
            <p className="text-[1rem] leading-[1.55] text-ink-2">
              A 48-hour launch (for eligible catalogs) is where most stores start. From 50 to
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

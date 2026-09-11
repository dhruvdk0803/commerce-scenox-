import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Status } from "@/components/ui/Status";

const OPS = [
  { label: "New SKU onboarding", status: "ready" as const, meta: "+128 SKUS" },
  { label: "Catalog updates", status: "processing" as const, meta: "412 ROWS" },
  { label: "Price updates", status: "ready" as const, meta: "2,204 CHANGES" },
  { label: "Product-content changes", status: "queued" as const, meta: "36 PRODUCTS" },
  { label: "Category restructuring", status: "ready" as const, meta: "3 LEVELS" },
  { label: "Image processing", status: "processing" as const, meta: "890 FILES" },
  { label: "Supplier data processing", status: "queued" as const, meta: "WEEKLY" },
  { label: "Recurring catalog maintenance", status: "ready" as const, meta: "MONTHLY" },
];

export function OngoingOps() {
  return (
    <section className="section-y border-t border-line bg-bg-muted/40" aria-labelledby="ops-heading">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <Eyebrow>ONGOING OPERATIONS</Eyebrow>
          <h2 id="ops-heading" className="mt-5 text-[clamp(1.75rem,1rem+2.3vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            YOUR CATALOG DOESN&apos;T STOP CHANGING.
            <br />
            <span className="text-ink-2">NEITHER SHOULD YOUR SYSTEM.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-[1rem] leading-[1.55] text-ink-2">
            After the initial upload, Scenox Commerce can run as the operations
            layer behind your catalog: new supplier files in, updated products
            out. Store synchronization only where genuinely supported by your
            platform.
          </p>
          <div className="mt-8">
            <Button href="/get-started?need=ongoing" variant="dark" arrow event="cta_click" eventParams={{ cta: "ongoing_ops" }}>
              Talk to Us About Catalog Operations
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="overflow-hidden rounded-[12px] border border-line bg-bg">
            <div className="flex h-11 items-center justify-between border-b border-line px-4">
              <span className="mono-label text-ink-2">OPERATIONS QUEUE</span>
              <span className="mono-micro text-ink-3">ILLUSTRATIVE</span>
            </div>
            <ul className="divide-y divide-line">
              {OPS.map((o) => (
                <li key={o.label} className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[1fr_7rem_7.5rem]">
                  <span className="text-[0.95rem] text-ink">{o.label}</span>
                  <span className="mono-micro hidden text-ink-3 tabular sm:inline">{o.meta}</span>
                  <Status kind={o.status} className="justify-self-end" />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

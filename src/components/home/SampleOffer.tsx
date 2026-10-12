import Image from "next/image";
import { img } from "@/lib/images";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const PHOTOS = [img.sneaker, img.bottle, img.speaker, img.clock, img.tshirt] as const;

/** The no-risk first step. One message, one button, the outcome shown as photos. */
export function SampleOffer() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-elevated" aria-labelledby="sample-heading">
      <div className="container-x section-y grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <Eyebrow>RISK-FREE START</Eyebrow>
          <h2 id="sample-heading" className="mt-5 text-[clamp(2.75rem,1rem+4.2vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-ink">
            SEND US
            <br />
            10 PRODUCTS.
          </h2>
          <p className="mt-6 max-w-[36ch] text-lead text-ink-2">See what your catalog can look like before you commit to anything.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button href="/free-sample" size="lg" arrow event="cta_click" eventParams={{ cta: "send_10_products" }}>
              Send 10 Products
            </Button>
            <p className="text-[0.8rem] text-ink-3">Free if your project is a fit.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="grid grid-cols-6 gap-3">
            {PHOTOS.map((src, i) => (
              <div
                key={i}
                className={
                  i < 2
                    ? "relative col-span-3 aspect-square overflow-hidden rounded-[18px] bg-[#f5f4ef]"
                    : "relative col-span-2 aspect-square overflow-hidden rounded-[18px] bg-[#f5f4ef]"
                }
              >
                <Image src={src} alt="" sizes="(min-width: 1024px) 300px, 50vw" className="size-full object-cover" />
              </div>
            ))}
          </div>
          <p className="mono-micro mt-3 text-ink-3">ILLUSTRATIVE · 10 ROWS IN, 10 STORE-READY PRODUCTS BACK</p>
        </Reveal>
      </div>
    </section>
  );
}

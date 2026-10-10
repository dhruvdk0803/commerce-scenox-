import Image from "next/image";
import type { PriceSet } from "@/lib/markets";
import { img, type ImgKey } from "@/lib/images";
import { Price } from "@/components/market/Price";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";
import { MotionLi, Stagger, staggerChild } from "@/components/ui/Reveal";

type Card = { photo: ImgKey; title: string; path: string; price: PriceSet; options: string };

/** Example storefront output. Prices are demo retail prices, not our service prices. */
const CARDS: Card[] = [
  { photo: "chair", title: "Black Ergonomic Office Chair", path: "Office › Chairs", price: { in: 8499, us: 229, uk: 189, au: 349 }, options: "3 colours" },
  { photo: "bottle", title: "Insulated Steel Bottle 750 ml", path: "Kitchen › Drinkware", price: { in: 1299, us: 34, uk: 28, au: 49 }, options: "4 finishes" },
  { photo: "sneaker", title: "White Leather Low-Top Sneaker", path: "Footwear › Sneakers", price: { in: 5999, us: 129, uk: 109, au: 189 }, options: "9 sizes" },
  { photo: "lamp", title: "White LED Desk Lamp", path: "Lighting › Desk Lamps", price: { in: 2499, us: 59, uk: 49, au: 89 }, options: "3 colour temps" },
  { photo: "serum", title: "Vitamin C Face Serum 30 ml", path: "Beauty › Serums", price: { in: 1499, us: 38, uk: 32, au: 55 }, options: "2 sizes" },
  { photo: "speaker", title: "Mini Bluetooth Speaker", path: "Electronics › Audio", price: { in: 2999, us: 69, uk: 59, au: 99 }, options: "2 colours" },
  { photo: "mug", title: "Stoneware Coffee Mug 350 ml", path: "Kitchen › Tableware", price: { in: 799, us: 22, uk: 18, au: 32 }, options: "5 glazes" },
  { photo: "clock", title: "Oak Frame Wall Clock 30 cm", path: "Decor › Clocks", price: { in: 1899, us: 45, uk: 38, au: 69 }, options: "2 frames" },
];

export function Showcase() {
  return (
    <section className="section-y" aria-labelledby="showcase-heading">
      <div className="container-x">
        <SectionHeader
          id="showcase-heading"
          eyebrow="WHAT GOES LIVE"
          title={
            <>
              50 products or 50,000.
              <span className="block text-balance text-ink-2">Every one store-ready.</span>
            </>
          }
          description="Clear titles, real categories, matched photos and variants. Every product, not just the first page."
          action={<TextLink href="/free-sample">See it on 10 of yours, free</TextLink>}
        />

        <Stagger
          as="ul"
          amount={0.1}
          className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 min-[30rem]:-mx-6 min-[30rem]:scroll-px-6 min-[30rem]:px-6 [scrollbar-width:none] md:mx-0 md:mt-16 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((c, i) => (
            <MotionLi
              key={c.photo}
              variants={staggerChild}
              className="group w-[68%] shrink-0 snap-start sm:w-[42%] md:w-auto"
            >
              <div className="relative aspect-square overflow-hidden rounded-[12px] border border-line bg-[#f5f4ef]">
                <Image
                  src={img[c.photo]}
                  alt={c.title}
                  placeholder="blur"
                  sizes="(min-width: 768px) 25vw, 68vw"
                  className="size-full object-cover transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
                <span className="mono-micro absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-line bg-bg-elevated/90 px-2 py-1 text-success backdrop-blur-sm">
                  <span className="size-1.5 rounded-full bg-success" />
                  LIVE
                </span>
                <span className="mono-micro absolute right-3 top-3 text-ink-3 tabular">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-3 px-0.5">
                <p className="mono-micro truncate text-ink-3">{c.path}</p>
                <p className="mt-1 truncate text-[0.975rem] font-medium tracking-[-0.01em] text-ink">{c.title}</p>
                <p className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="text-[0.95rem] text-ink tabular">
                    <Price set={c.price} />
                  </span>
                  <span className="mono-micro text-ink-3">{c.options}</span>
                </p>
              </div>
            </MotionLi>
          ))}
        </Stagger>
        <p className="mono-micro mt-6 text-ink-3">EXAMPLE OUTPUT · ILLUSTRATIVE PRODUCTS AND PRICES</p>
      </div>
    </section>
  );
}

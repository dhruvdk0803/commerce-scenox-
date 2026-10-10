import Image from "next/image";
import { img, type ImgKey } from "@/lib/images";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Tile = { photo: ImgKey; title: string; path: string };

const ROW_A: Tile[] = [
  { photo: "chair", title: "Black Ergonomic Office Chair", path: "Office › Chairs" },
  { photo: "bottle", title: "Insulated Steel Bottle 750 ml", path: "Kitchen › Drinkware" },
  { photo: "sneaker", title: "White Leather Low-Top Sneaker", path: "Footwear › Sneakers" },
  { photo: "lamp", title: "White LED Desk Lamp", path: "Lighting › Desk Lamps" },
  { photo: "serum", title: "Vitamin C Face Serum 30 ml", path: "Beauty › Serums" },
  { photo: "shelf", title: "5-Tier Oak Bookshelf", path: "Furniture › Shelving" },
];
const ROW_B: Tile[] = [
  { photo: "speaker", title: "Mini Bluetooth Speaker", path: "Electronics › Audio" },
  { photo: "mug", title: "Stoneware Coffee Mug 350 ml", path: "Kitchen › Tableware" },
  { photo: "clock", title: "Oak Frame Wall Clock 30 cm", path: "Decor › Clocks" },
  { photo: "tshirt", title: "Cotton Crew T-Shirt", path: "Apparel › T-Shirts" },
  { photo: "rug", title: "Wool Rug 5 × 8 ft", path: "Home › Rugs" },
  { photo: "hose", title: "Garden Hose 20 m", path: "Garden › Watering" },
];

/** Photos are shot on porcelain; multiply lets each tile take its own surface colour. */
const SURFACES = ["bg-bg-elevated", "bg-bg-muted", "bg-[#ebe8e1]", "bg-bg-elevated"];

function Row({ tiles, reverse, offset = 0 }: { tiles: Tile[]; reverse?: boolean; offset?: number }) {
  // the list is rendered twice so the loop is seamless; the copy is hidden from assistive tech
  return (
    <div className="marquee group/row flex overflow-hidden">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className={cn("marquee-track flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4", reverse && "marquee-reverse")}
        >
          {tiles.map((t, i) => (
            <li key={t.photo} className="w-[10.5rem] shrink-0 md:w-[13rem]">
              <div className={cn("relative aspect-square overflow-hidden rounded-[14px]", SURFACES[(i + offset) % SURFACES.length])}>
                <Image
                  src={img[t.photo]}
                  alt={copy === 0 ? t.title : ""}
                  sizes="(min-width: 768px) 208px, 168px"
                  className="size-full object-cover mix-blend-multiply"
                />
                <span className="mono-micro absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-bg-elevated/90 px-2 py-0.5 text-success">
                  <span className="size-1.5 rounded-full bg-success" />
                  LIVE
                </span>
              </div>
              <p className="mono-micro mt-2.5 truncate text-ink-3">{t.path}</p>
              <p className="mt-0.5 truncate text-[0.9rem] font-medium tracking-[-0.01em] text-ink">{t.title}</p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function Showcase() {
  return (
    <section className="overflow-hidden py-16 md:py-24" aria-labelledby="showcase-heading">
      <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <Reveal className="lg:col-span-7">
          <Eyebrow>WHAT GOES LIVE</Eyebrow>
          <h2 id="showcase-heading" className="mt-5 text-h2 text-ink">
            50 products or 50,000.
            <span className="block text-balance text-ink-2">Every one store-ready.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-[38ch] text-[1rem] leading-[1.55] text-ink-2">
            Clear titles, real categories, matched photos and variants. Every product, not just the first page.
          </p>
          <div className="mt-5">
            <TextLink href="/free-sample">See it on 10 of yours, free</TextLink>
          </div>
        </Reveal>
      </div>

      <div className="marquee-mask mt-10 flex flex-col gap-5 md:mt-14 md:gap-6">
        <Row tiles={ROW_A} />
        <Row tiles={ROW_B} reverse offset={2} />
      </div>
      <p className="container-x mono-micro mt-6 text-ink-3">EXAMPLE OUTPUT · ILLUSTRATIVE PRODUCTS</p>
    </section>
  );
}

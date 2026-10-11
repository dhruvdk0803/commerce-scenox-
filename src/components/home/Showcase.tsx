import Image from "next/image";
import { img, type ImgKey } from "@/lib/images";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Tile = { photo: ImgKey; title: string; path: string };

const ROW: Tile[] = [
  { photo: "chair", title: "Black Ergonomic Office Chair", path: "Office › Chairs" },
  { photo: "bottle", title: "Insulated Steel Bottle 750 ml", path: "Kitchen › Drinkware" },
  { photo: "sneaker", title: "White Leather Low-Top Sneaker", path: "Footwear › Sneakers" },
  { photo: "lamp", title: "White LED Desk Lamp", path: "Lighting › Desk Lamps" },
  { photo: "serum", title: "Vitamin C Face Serum 30 ml", path: "Beauty › Serums" },
  { photo: "shelf", title: "5-Tier Oak Bookshelf", path: "Furniture › Shelving" },
  { photo: "speaker", title: "Mini Bluetooth Speaker", path: "Electronics › Audio" },
  { photo: "mug", title: "Stoneware Coffee Mug 350 ml", path: "Kitchen › Tableware" },
  { photo: "clock", title: "Oak Frame Wall Clock 30 cm", path: "Decor › Clocks" },
  { photo: "tshirt", title: "Cotton Crew T-Shirt", path: "Apparel › T-Shirts" },
];

/** Photos are shot on porcelain; multiply lets each tile take its own surface colour. */
const SURFACES = ["bg-bg-elevated", "bg-bg-muted", "bg-[#ebe8e1]", "bg-bg-elevated"];

function Row({ tiles, offset = 0 }: { tiles: Tile[]; offset?: number }) {
  // the list is rendered twice so the loop is seamless; the copy is hidden from assistive tech
  return (
    <div className="marquee group/row flex overflow-hidden">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className="marquee-track flex shrink-0 gap-4 pr-4 md:gap-5 md:pr-5"
        >
          {tiles.map((t, i) => (
            <li key={t.photo} className="w-[12.5rem] shrink-0 md:w-[16rem]">
              <div className={cn("relative aspect-square overflow-hidden rounded-[18px]", SURFACES[(i + offset) % SURFACES.length])}>
                <Image
                  src={img[t.photo]}
                  alt={copy === 0 ? t.title : ""}
                  sizes="(min-width: 768px) 208px, 168px"
                  className="size-full object-cover mix-blend-multiply"
                />
              </div>
              <p className="mt-3 truncate text-[0.9rem] font-medium tracking-[-0.01em] text-ink">{t.title}</p>
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
          <TextLink href="/free-sample">See it on 10 of yours, free</TextLink>
        </Reveal>
      </div>

      <div className="marquee-mask mt-12 md:mt-16">
        <Row tiles={ROW} />
      </div>
      <p className="container-x mono-micro mt-6 text-ink-3">ILLUSTRATIVE</p>
    </section>
  );
}

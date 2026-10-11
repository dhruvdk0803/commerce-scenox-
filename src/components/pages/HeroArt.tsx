import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, Check, Mail, Phone, ShoppingBag } from "lucide-react";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Status } from "@/components/ui/Status";

/**
 * Hero visuals for inner pages. Each one shows what the page's service
 * produces, built from the same product photos and UI language as the
 * homepage. All illustrative.
 */

function Frame({ label, note = "ILLUSTRATIVE", children, className }: { label: string; note?: string; children: ReactNode; className?: string }) {
  return (
    <figure className={cn("overflow-hidden rounded-[16px] border border-line bg-bg-elevated", className)}>
      <div className="flex h-10 items-center justify-between gap-3 border-b border-line px-4">
        <span className="mono-label truncate text-ink-2">{label}</span>
        <span className="mono-micro shrink-0 text-ink-3">{note}</span>
      </div>
      {children}
    </figure>
  );
}

function Photo({ src, alt = "", className, sizes = "200px", contain }: { src: StaticImageData; alt?: string; className?: string; sizes?: string; contain?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden bg-[#f5f4ef]", className)}>
      <Image src={src} alt={alt} sizes={sizes} placeholder="blur" className={cn("size-full", contain ? "object-contain" : "object-cover")} />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* services                                                          */
/* ---------------------------------------------------------------- */

export function ImageryArt() {
  const OUT = [
    { src: img.serum, t: "Store set", note: "CONSISTENT" },
    { src: img.serumLife, t: "Lifestyle", note: "NO PHOTOSHOOT" },
    { src: img.serumWhite, t: "Marketplace", note: "PURE WHITE", contain: true },
  ];
  return (
    <Frame label="ONE PHOTO · THREE OUTPUTS">
      <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
        <div className="relative bg-bg">
          <Photo src={img.serumRaw} alt="Original phone photo of a serum bottle on a bathroom counter" className="aspect-[16/9] h-full sm:aspect-auto sm:min-h-[12rem]" sizes="(min-width: 1024px) 180px, 100vw" />
          <span className="mono-micro absolute left-2.5 top-2.5 rounded-full bg-ink/80 px-2 py-0.5 text-paper">SOURCE</span>
        </div>
        <div className="grid grid-cols-3 gap-px bg-line">
          {OUT.map((o) => (
            <div key={o.t} className="bg-bg-elevated">
              <Photo src={o.src} alt={`Serum, ${o.t.toLowerCase()} output`} className={cn("aspect-[3/4]", o.contain && "bg-white")} sizes="(min-width: 1024px) 150px, 22vw" contain={o.contain} />
              <div className="px-2.5 py-2">
                <p className="truncate text-[0.85rem] font-medium text-ink">{o.t}</p>
                <p className="mono-micro truncate text-success">{o.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="border-t border-line px-4 py-3 text-[0.85rem] text-ink-2">Checked against the original before it reaches your store.</p>
    </Frame>
  );
}

export function FeedsArt() {
  const CHANNELS: { name: string; label: string }[] = [
    { name: "Google Shopping", label: "APPROVED" },
    { name: "Meta catalog", label: "SYNCED" },
    { name: "Amazon", label: "LISTED" },
    { name: "Flipkart", label: "LISTED" },
  ];
  return (
    <Frame label="ONE PRODUCT · FOUR CHANNELS">
      <div className="grid gap-4 p-4 sm:grid-cols-[11rem_minmax(0,1fr)] md:p-5">
        <div className="overflow-hidden rounded-[12px] border border-line bg-bg">
          <Photo src={img.sneaker} alt="White leather sneaker" className="aspect-square" sizes="176px" />
          <div className="p-3">
            <p className="mono-micro text-ink-3">SN-200 · SOURCE</p>
            <p className="mt-1 text-[0.875rem] font-medium leading-snug text-ink">White Leather Low-Top Sneaker</p>
          </div>
        </div>
        <ul className="flex flex-col divide-y divide-line self-center rounded-[12px] border border-line bg-bg">
          {CHANNELS.map((c) => (
            <li key={c.name} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="flex min-w-0 items-center gap-2.5">
                <ArrowRight className="size-3.5 shrink-0 text-accent" strokeWidth={2} aria-hidden />
                <span className="truncate text-[0.9rem] text-ink">{c.name}</span>
              </span>
              <Status kind="published" label={c.label} />
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-line px-4 py-3 text-[0.85rem] text-ink-2 md:px-5">Price and stock matched on every channel.</p>
    </Frame>
  );
}

export function EmailArt() {
  return (
    <Frame label="ABANDONED CART · EMAIL 1 OF 3">
      <div className="border-b border-line px-4 py-3 md:px-5">
        <p className="text-[0.8rem] text-ink-3">
          From <span className="text-ink">Northwind Home</span> · 1 hour after exit
        </p>
        <p className="mt-0.5 text-[0.95rem] font-medium text-ink">You left something behind</p>
      </div>
      <div className="grid gap-5 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center md:p-5">
        <Photo src={img.sneaker} alt="Sneaker left in the cart" className="aspect-square rounded-[12px]" sizes="(min-width: 640px) 260px, 100vw" />
        <div>
          <p className="text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] text-ink">Still thinking it over?</p>
          <p className="mt-2 text-[0.9rem] leading-snug text-ink-2">Your White Leather Low-Top Sneaker is saved in your cart, in size 9.</p>
          <span className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-[8px] bg-ink px-4 text-[0.9rem] font-medium text-paper">
            Complete my order <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 md:px-5">
        <span className="flex items-center gap-2 text-[0.85rem] text-ink-2">
          <Mail className="size-4" strokeWidth={1.75} aria-hidden /> Then 24h and 72h, if needed
        </span>
        <Status kind="published" label="RECOVERED" />
      </div>
    </Frame>
  );
}

export function WhatsAppArt() {
  return (
    <Frame label="WHATSAPP · COD CONFIRMATION">
      <div className="flex flex-col gap-3 bg-[#efeae2] p-4 md:p-5">
        <div className="max-w-[85%] overflow-hidden rounded-[12px] rounded-tl-[4px] bg-white">
          <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 p-2.5">
            <Photo src={img.serum} className="aspect-square rounded-[8px]" sizes="72px" />
            <div className="min-w-0">
              <p className="mono-micro text-ink-3">ORDER #2231 · CASH ON DELIVERY</p>
              <p className="mt-1 text-[0.875rem] leading-snug text-ink">Vitamin C Face Serum 30 ml. Shall we send it today?</p>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-line text-center text-[0.85rem] font-medium text-[#0061c9]">
            <span className="py-2.5">Confirm order</span>
            <span className="border-l border-line py-2.5">Cancel</span>
          </div>
        </div>
        <p className="self-end rounded-[12px] rounded-tr-[4px] bg-[#d9fdd3] px-3.5 py-2 text-[0.875rem] text-ink">Confirm order</p>
        <p className="max-w-[85%] rounded-[12px] rounded-tl-[4px] bg-white px-3.5 py-2 text-[0.875rem] text-ink">
          Confirmed. It ships today and arrives Thursday.
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 md:px-5">
        <span className="text-[0.85rem] text-ink-2">Unconfirmed orders are held, not shipped.</span>
        <Status kind="published" label="CONFIRMED" />
      </div>
    </Frame>
  );
}

export function SupportArt() {
  return (
    <Frame label="SITE CHAT · AI AGENT">
      <div className="flex flex-col gap-3 p-4 md:p-5">
        <p className="max-w-[80%] self-end rounded-[12px] rounded-br-[4px] bg-ink px-3.5 py-2.5 text-[0.9rem] text-paper">
          Does the AX-442 chair come in blue?
        </p>
        <div className="max-w-[88%]">
          <p className="rounded-[12px] rounded-bl-[4px] border border-line bg-bg px-3.5 py-2.5 text-[0.9rem] text-ink">
            Yes. Blue is in stock and ships in 1–2 days.
          </p>
          <div className="mt-2 grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 rounded-[12px] border border-line bg-bg p-2">
            <Photo src={img.chair} className="aspect-square rounded-[8px]" sizes="64px" />
            <div className="min-w-0">
              <p className="truncate text-[0.875rem] font-medium text-ink">Black Ergonomic Office Chair</p>
              <p className="mono-micro mt-0.5 text-success">BLUE · IN STOCK</p>
            </div>
          </div>
        </div>
        <p className="max-w-[80%] self-end rounded-[12px] rounded-br-[4px] bg-ink px-3.5 py-2.5 text-[0.9rem] text-paper">And where is order #1042?</p>
        <p className="max-w-[88%] rounded-[12px] rounded-bl-[4px] border border-line bg-bg px-3.5 py-2.5 text-[0.9rem] text-ink">
          Out for delivery today. Here&apos;s your tracking link.
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 md:px-5">
        <span className="text-[0.85rem] text-ink-2">Answered from your catalog and orders.</span>
        <Status kind="published" label="4S REPLY" />
      </div>
    </Frame>
  );
}

const BARS = [8, 16, 26, 12, 30, 18, 10, 24, 14, 28, 12, 20, 9, 26, 15, 19, 10, 22, 7, 16];

export function VoiceArt() {
  return (
    <div className="grid gap-3">
      <figure className="overflow-hidden rounded-[16px] bg-bg-dark text-paper">
        <div className="flex h-10 items-center justify-between border-b border-line-dark px-4">
          <span className="mono-label flex items-center gap-2 text-paper-2">
            <Phone className="size-3.5" strokeWidth={2} aria-hidden /> VOICE AGENT · OUTBOUND
          </span>
          <span className="mono-micro text-paper-2 tabular">0:48</span>
        </div>
        <div aria-hidden className="flex h-16 items-center justify-center gap-[3px]">
          {BARS.map((h, i) => (
            <span key={i} className="wave-bar w-[3px] rounded-full bg-paper/80" style={{ height: h, animationDelay: `${(i % 8) * 90}ms` }} />
          ))}
        </div>
        <ol className="flex flex-col gap-2.5 border-t border-line-dark px-4 py-4 text-[0.875rem] leading-snug">
          <li className="grid grid-cols-[5rem_1fr] gap-3">
            <span className="mono-micro pt-0.5 text-accent-on-dark">AI</span>
            <span>It&apos;s cash on delivery, arriving Thursday. Shall I confirm it for dispatch?</span>
          </li>
          <li className="grid grid-cols-[5rem_1fr] gap-3 text-paper-2">
            <span className="mono-micro pt-0.5">CUSTOMER</span>
            <span>Yes, please.</span>
          </li>
        </ol>
      </figure>
      <figure className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-[16px] border border-line bg-bg-elevated p-2.5 pr-4">
        <Photo src={img.speaker} className="aspect-square rounded-[10px]" sizes="72px" />
        <div className="min-w-0">
          <p className="mono-micro text-ink-3">SITE CHAT · “A SMALL SPEAKER?”</p>
          <p className="mt-1 truncate text-[0.9rem] font-medium text-ink">Mini Bluetooth Speaker</p>
        </div>
        <span className="mono-micro flex items-center gap-1 rounded-[6px] bg-success px-2 py-1.5 text-white">
          <ShoppingBag className="size-3" strokeWidth={2.5} aria-hidden /> ADDED
        </span>
      </figure>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* catalog                                                           */
/* ---------------------------------------------------------------- */

export function CleanupArt() {
  return (
    <Frame label="LIVE LISTING · BEFORE → AFTER">
      <div className="grid sm:grid-cols-2">
        <div className="border-b border-line p-4 sm:border-b-0 sm:border-r md:p-5">
          <p className="mono-micro text-danger">BEFORE · 4 ISSUES</p>
          <div className="mt-3 grid aspect-[4/3] place-items-center rounded-[10px] border border-dashed border-line-strong bg-bg">
            <span className="mono-micro text-ink-3">IMAGE MISSING</span>
          </div>
          <p className="mt-3 font-mono text-[0.85rem] text-ink-2">blk office chr ergo</p>
          <p className="font-mono text-[0.8rem] text-warning">furniture?</p>
          <p className="font-mono text-[0.8rem] text-danger">description: NULL</p>
        </div>
        <div className="p-4 md:p-5">
          <p className="mono-micro text-success">AFTER · LIVE</p>
          <Photo src={img.chair} alt="Black ergonomic office chair" className="mt-3 aspect-[4/3] rounded-[10px]" sizes="(min-width: 1024px) 280px, 50vw" />
          <p className="mt-3 text-[0.95rem] font-medium leading-snug text-ink">Black Ergonomic Office Chair</p>
          <p className="mono-micro mt-0.5 text-ink-3">OFFICE › CHAIRS › ERGONOMIC</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Black", "Blue", "White"].map((c, i) => (
              <span key={c} className={cn("rounded-[5px] border px-2 py-0.5 text-[0.75rem]", i === 0 ? "border-ink bg-ink text-paper" : "border-line text-ink-2")}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function MigrationArt() {
  const ROWS = [
    { src: img.chair, t: "Black Ergonomic Office Chair", url: "/black-ergonomic-office-chair" },
    { src: img.lamp, t: "White LED Desk Lamp", url: "/white-led-desk-lamp" },
    { src: img.shelf, t: "5-Tier Oak Bookshelf", url: "/5-tier-oak-bookshelf" },
  ];
  return (
    <Frame label="MAGENTO → SHOPIFY" note="1,204 PRODUCTS">
      <ul className="divide-y divide-line">
        {ROWS.map((r) => (
          <li key={r.t} className="grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 md:px-5">
            <Photo src={r.src} className="aspect-square rounded-[8px]" sizes="52px" />
            <div className="min-w-0">
              <p className="truncate text-[0.9rem] font-medium text-ink">{r.t}</p>
              <p className="mono-micro truncate text-ink-3">301 · {r.url}</p>
            </div>
            <Status kind="published" label="MOVED" />
          </li>
        ))}
      </ul>
      <dl className="grid grid-cols-3 border-t border-line text-center">
        {[
          ["PRODUCTS", "1,204"],
          ["REDIRECTS", "1,204"],
          ["CUSTOMERS", "8,930"],
        ].map(([k, v], i) => (
          <div key={k} className={cn("px-2 py-3", i > 0 && "border-l border-line")}>
            <dt className="mono-micro text-ink-3">{k}</dt>
            <dd className="mt-1 font-mono text-[0.95rem] text-ink tabular">{v}</dd>
          </div>
        ))}
      </dl>
    </Frame>
  );
}

const MOSAIC = [img.chair, img.bottle, img.lamp, img.mug, img.speaker, img.shelf, img.clock, img.tshirt, img.rug, img.hose, img.sneaker, img.serum] as const;

export function CatalogMosaicArt({ label = "SUPPLIER FILE → STORE", note = "12,480 SKUS", footer }: { label?: string; note?: string; footer?: ReactNode }) {
  return (
    <Frame label={label} note={note}>
      <div className="grid grid-cols-4 gap-px bg-line">
        {MOSAIC.map((src, i) => (
          <Photo key={i} src={src} className="aspect-square" sizes="(min-width: 1024px) 150px, 25vw" />
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
        {footer ?? (
          <>
            <span className="font-mono text-[0.85rem] text-ink tabular">
              Batch 7 <span className="text-ink-3">/ 12</span>
            </span>
            <Status kind="processing" label="PUBLISHING" />
          </>
        )}
      </div>
    </Frame>
  );
}

/** Raw row in, product page out. For how-it-works. */
export function RowToProductArt() {
  return (
    <Frame label="ONE ROW → ONE PRODUCT">
      <div className="border-b border-line bg-bg px-4 py-3 font-mono text-[0.8rem] md:px-5">
        <span className="text-ink-3">AX-442,</span>
        <span className="text-ink-2">blk office chr,</span>
        <span className="text-warning">furniture?,</span>
        <span className="text-danger">NULL,</span>
        <span className="text-ink-2">IMG_99283.jpg</span>
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:items-center md:p-5">
        <Photo src={img.chair} alt="Finished office chair product photo" className="aspect-square rounded-[12px]" sizes="(min-width: 640px) 260px, 100vw" />
        <div>
          <p className="mono-micro text-ink-3">OFFICE › CHAIRS › ERGONOMIC</p>
          <p className="mt-1.5 text-[1.2rem] font-semibold leading-tight tracking-[-0.02em] text-ink">Premium Black Ergonomic Office Chair</p>
          <ul className="mt-4 flex flex-col gap-2 text-[0.875rem] text-ink">
            {["Description and specs written", "3 colour variants", "SEO title and handle", "Image matched by SKU"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="size-3.5 text-success" strokeWidth={3} aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

/** Services hub: a small grid of what the services produce. */
export function ServicesArt() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="relative col-span-2 overflow-hidden rounded-[16px] sm:col-span-1 sm:row-span-2">
        <Image src={img.chairLife} alt="Office chair in a home office scene" placeholder="blur" sizes="(min-width: 1024px) 300px, 100vw" className="size-full min-h-[14rem] object-cover" />
        <span className="mono-micro absolute bottom-3 left-3 rounded-full bg-bg-elevated/95 px-2.5 py-1 text-ink">AI PRODUCT IMAGERY</span>
      </div>
      <div className="rounded-[16px] border border-line bg-bg-elevated p-4">
        <p className="mono-micro text-ink-3">CATALOG</p>
        <p className="mt-2 font-mono text-[1.4rem] text-ink tabular">
          1,000<span className="text-ink-3">/1,000</span>
        </p>
        <Status kind="published" label="PUBLISHED" className="mt-1" />
      </div>
      <div className="rounded-[16px] border border-line bg-bg-elevated p-4">
        <p className="mono-micro text-ink-3">WHATSAPP</p>
        <p className="mt-2 rounded-[10px] bg-[#d9fdd3] px-3 py-2 text-[0.825rem] text-ink">Confirm order</p>
        <Status kind="published" label="COD CONFIRMED" className="mt-2" />
      </div>
      <div className="col-span-2 flex items-center justify-between gap-3 rounded-[16px] bg-bg-dark px-4 py-3.5 text-paper">
        <span className="text-[0.9rem]">Google · Meta · Amazon · Flipkart</span>
        <span className="mono-micro text-[#5fd39b]">SYNCED</span>
      </div>
    </div>
  );
}

/** About: the work, shown as finished imagery rather than a grid of cells. */
export function AboutArt() {
  return (
    <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-3">
      <div className="relative row-span-2 min-h-[18rem] overflow-hidden rounded-[16px]">
        <Image src={img.chairLife} alt="Office chair in a bright home office" placeholder="blur" sizes="(min-width: 1024px) 340px, 55vw" className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="relative overflow-hidden rounded-[16px]">
        <Image src={img.sneakerLife} alt="Sneaker on a sunlit step" placeholder="blur" sizes="(min-width: 1024px) 260px, 40vw" className="aspect-square size-full object-cover" />
      </div>
      <div className="relative overflow-hidden rounded-[16px]">
        <Image src={img.serumLife} alt="Serum bottle on a stone ledge" placeholder="blur" sizes="(min-width: 1024px) 260px, 40vw" className="aspect-square size-full object-cover" />
      </div>
      <p className="mono-micro col-span-2 text-ink-3">FROM ONE PRODUCT PHOTO EACH · ILLUSTRATIVE</p>
    </div>
  );
}

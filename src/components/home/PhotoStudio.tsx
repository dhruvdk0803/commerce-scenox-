"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Output = "studio" | "lifestyle" | "marketplace";

const PRODUCTS: {
  id: string;
  label: string;
  raw: StaticImageData;
  out: Record<Output, StaticImageData>;
  file: string;
}[] = [
  { id: "dress", label: "Linen dress", raw: img.dressRaw, out: { studio: img.dress, lifestyle: img.dressLife, marketplace: img.dressWhite }, file: "wd-118-sage" },
  { id: "chair", label: "Office chair", raw: img.chairRaw, out: { studio: img.chair, lifestyle: img.chairLife, marketplace: img.chairWhite }, file: "ax-442-black" },
  { id: "serum", label: "Serum", raw: img.serumRaw, out: { studio: img.serum, lifestyle: img.serumLife, marketplace: img.serumWhite }, file: "vc-30-amber" },
];

const OUTPUTS: { id: Output; label: string; note: string }[] = [
  { id: "studio", label: "Studio set", note: "One consistent look across the catalog" },
  { id: "lifestyle", label: "Lifestyle scene", note: "In context, without a photoshoot" },
  { id: "marketplace", label: "Marketplace main", note: "Pure white, Amazon and Google ready" },
];


export function PhotoStudio({ showLink = true, start = 0 }: { showLink?: boolean; /** which product opens first */ start?: number }) {
  const [p, setP] = useState(start);
  const [o, setO] = useState<Output>("studio");
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const seen = useInView(frame, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const prod = PRODUCTS[p];

  // a short sweep on first view shows the frame can be dragged
  useEffect(() => {
    if (!seen || reduce) return;
    const a = setTimeout(() => setPos(14), 400);
    const b = setTimeout(() => setPos(50), 1400);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [seen, reduce]);

  const ease = !dragging && "duration-[900ms] ease-[var(--ease-in-out)]";

  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-bg-dark text-paper" aria-labelledby="studio-heading">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <Eyebrow inverse>AI PRODUCT IMAGERY</Eyebrow>
          <h2 id="studio-heading" className="mt-4 text-h2 text-paper">
            Phone photo in.
            <span className="block text-accent-on-dark">Studio set out.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[1rem] leading-[1.55] text-paper-2">
            Drag across the photo. One snapshot from your supplier becomes every image your store and marketplaces need.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[64rem] grid-cols-[minmax(0,1fr)] gap-6 md:mt-12 lg:grid-cols-12 lg:gap-8">
          {/* compare frame */}
          <Reveal delay={0.06} className="min-w-0 lg:col-span-7">
            <div ref={frame} className="relative aspect-square select-none overflow-hidden rounded-[20px] bg-[#f5f4ef] sm:aspect-[5/4]">
              <Image src={prod.raw} alt={`${prod.label}: original phone photo`} placeholder="blur" sizes="(min-width: 1024px) 60vw, 100vw" className="absolute inset-0 size-full object-cover" />
              <div className={cn("absolute inset-0 bg-white transition-[clip-path]", ease)} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
                <Image
                  key={`${prod.id}-${o}`}
                  src={prod.out[o]}
                  alt={`${prod.label}: ${OUTPUTS.find((x) => x.id === o)!.label.toLowerCase()}`}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cn("anim-fade-up size-full", o === "marketplace" ? "object-contain" : "object-cover")}
                  style={{ animationDuration: "500ms" }}
                />
              </div>

              <span className="mono-micro absolute left-4 top-4 rounded-full bg-ink/80 px-2.5 py-1 text-paper backdrop-blur-sm">BEFORE</span>
              <span className="mono-micro absolute right-4 top-4 rounded-full bg-accent px-2.5 py-1 text-white">AFTER</span>


              <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 w-0.5 bg-white transition-[left]", ease)} style={{ left: `${pos}%` }}>
                <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-white">
                  <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 5 2 10l5 5M13 5l5 5-5 5" />
                  </svg>
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                aria-label="Compare the original photo with the finished photo"
                onChange={(e) => setPos(Number(e.target.value))}
                onPointerDown={() => setDragging(true)}
                onPointerUp={() => setDragging(false)}
                onBlur={() => setDragging(false)}
                className="absolute inset-0 size-full cursor-ew-resize opacity-0"
              />
            </div>
            <p className="mono-micro mt-3 flex justify-between gap-3 text-paper-2">
              <span className="truncate">IMG_{4031 + p * 377}.jpg → {prod.file}-01.jpg</span>
              <span className="shrink-0">ILLUSTRATIVE</span>
            </p>
          </Reveal>

          {/* controls */}
          <Reveal delay={0.12} className="flex min-w-0 flex-col gap-6 lg:col-span-5">
            <div>
              <p className="mono-label text-paper-2">01 · PICK A PRODUCT</p>
              <div role="radiogroup" aria-label="Example product" className="mt-3 grid grid-cols-3 gap-2">
                {PRODUCTS.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    role="radio"
                    aria-checked={i === p}
                    onClick={() => {
                      setP(i);
                      setPos(50);
                    }}
                    className={cn(
                      "overflow-hidden rounded-[12px] border-2 text-left transition-[border-color,transform] duration-[160ms] active:scale-[0.98]",
                      i === p ? "border-accent" : "border-transparent hover:border-white/25",
                    )}
                  >
                    <span className="relative block aspect-square bg-[#f5f4ef]">
                      <Image src={x.raw} alt="" sizes="120px" className="size-full object-cover" />
                    </span>
                    <span className="block bg-bg-dark-2 px-2 py-1.5 text-[0.8rem] text-paper">{x.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mono-label text-paper-2">02 · PICK AN OUTPUT</p>
              <div role="radiogroup" aria-label="Output type" className="mt-3 flex flex-col gap-2">
                {OUTPUTS.map((x) => {
                  const on = x.id === o;
                  return (
                    <button
                      key={x.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => {
                        setO(x.id);
                        setPos(reduce ? 50 : 30);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-[12px] border p-2 pr-3 text-left transition-[border-color,background-color] duration-[160ms]",
                        on ? "border-accent bg-accent/15" : "border-line-dark hover:border-line-dark-strong",
                      )}
                    >
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-[8px] bg-white">
                        <Image src={prod.out[x.id]} alt="" sizes="48px" className={cn("size-full", x.id === "marketplace" ? "object-contain" : "object-cover")} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.95rem] font-medium text-paper">{x.label}</span>
                        <span className="block truncate text-[0.8rem] text-paper-2">{x.note}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {showLink && (
              <div className="mt-auto">
                <TextLink href="/ai-product-photos" inverse>
                  See AI Product Imagery
                </TextLink>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

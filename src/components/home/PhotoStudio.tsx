"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CheckBox } from "@/components/ui/Status";

const PAIRS = [
  { id: "chair", label: "Office chair", before: img.chairRaw, after: img.chair, life: img.chairLife, file: "IMG_99283.jpg → ax-442-black-01.jpg" },
  { id: "sneaker", label: "Sneaker", before: img.sneakerRaw, after: img.sneaker, life: null, file: "IMG_4471.HEIC → sn-200-white-01.jpg" },
  { id: "serum", label: "Serum", before: img.serumRaw, after: img.serum, life: img.serumLife, file: "photo (3).jpg → vc-30-01.jpg" },
] as const;

const POINTS = ["Background, light and framing fixed", "Product kept exactly as photographed", "Named by SKU, sized for every channel"];

export function PhotoStudio({ showLink = true }: { showLink?: boolean }) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const seen = useInView(frame, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const pair = PAIRS[active];

  // a short sweep on first view shows the frame is interactive
  useEffect(() => {
    if (!seen || reduce) return;
    const a = setTimeout(() => setPos(18), 350);
    const b = setTimeout(() => setPos(50), 1300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [seen, reduce]);

  return (
    <section className="section-y border-t border-line bg-bg-muted/40" aria-labelledby="studio-heading">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <Eyebrow>AI PRODUCT IMAGERY</Eyebrow>
          <h2 id="studio-heading" className="mt-5 text-h2 text-ink">
            Phone photo in.
            <span className="block text-ink-2">Studio set out.</span>
          </h2>
          <p className="mt-5 max-w-[40ch] text-[1rem] leading-[1.55] text-ink-2">
            Drag across the photo. Whatever your supplier sent becomes one consistent, marketplace-ready set.
          </p>

          <div role="tablist" aria-label="Example products" className="mt-7 inline-flex rounded-[10px] border border-line bg-bg p-1">
            {PAIRS.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={i === active}
                onClick={() => {
                  setActive(i);
                  setPos(50);
                }}
                className={cn(
                  "h-9 rounded-[7px] px-3.5 text-[0.9rem] font-medium transition-colors duration-[160ms]",
                  i === active ? "bg-ink text-paper" : "text-ink-2 hover:text-ink",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <ul className="mt-7 flex flex-col gap-3">
            {POINTS.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[0.975rem] text-ink">
                <CheckBox done size="sm" />
                {t}
              </li>
            ))}
          </ul>
          {showLink && (
            <div className="mt-8">
              <TextLink href="/ai-product-photos">See AI Product Imagery</TextLink>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div
            ref={frame}
            className="relative aspect-square select-none overflow-hidden rounded-[14px] border border-line bg-bg md:aspect-[5/4]"
          >
            <Image
              src={pair.before}
              alt={`${pair.label}: original phone photo`}
              placeholder="blur"
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="absolute inset-0 size-full object-cover"
            />
            <div
              className={cn("absolute inset-0", !dragging && "transition-[clip-path] duration-[900ms] ease-[var(--ease-in-out)]")}
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <Image
                src={pair.after}
                alt={`${pair.label}: finished studio photo`}
                placeholder="blur"
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="size-full object-cover"
              />
            </div>

            <span className="mono-micro absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-paper backdrop-blur-sm">
              BEFORE<span className="max-sm:hidden"> · PHONE PHOTO</span>
            </span>
            <span className="mono-micro absolute right-3 top-3 rounded-full bg-bg-elevated/90 px-2.5 py-1 text-ink backdrop-blur-sm">
              AFTER<span className="max-sm:hidden"> · STUDIO SET</span>
            </span>

            {/* handle */}
            <div
              aria-hidden
              className={cn("pointer-events-none absolute inset-y-0 w-px bg-bg-elevated", !dragging && "transition-[left] duration-[900ms] ease-[var(--ease-in-out)]")}
              style={{ left: `${pos}%` }}
            >
              <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg-elevated text-ink">
                <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
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

            <p className="mono-micro absolute bottom-3 left-3 right-3 truncate rounded-[6px] bg-bg-elevated/90 px-2.5 py-1.5 text-ink-2 backdrop-blur-sm">
              {pair.file}
            </p>
          </div>

          {pair.life && (
            <div className="mt-3 grid grid-cols-[5rem_1fr] items-center gap-4 rounded-[12px] border border-line bg-bg p-2 pr-4">
              <div className="relative aspect-square overflow-hidden rounded-[8px]">
                <Image src={pair.life} alt={`${pair.label} in a lifestyle scene`} placeholder="blur" sizes="80px" className="size-full object-cover" />
              </div>
              <p className="text-[0.9rem] leading-snug text-ink-2">
                <span className="font-medium text-ink">Plus lifestyle scenes</span> from the same photo, without a photoshoot.
              </p>
            </div>
          )}
          <p className="mono-micro mt-3 text-ink-3">ILLUSTRATIVE EXAMPLE</p>
        </Reveal>
      </div>
    </section>
  );
}

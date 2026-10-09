import { ArrowRight, Armchair, Lamp, Shirt, Headphones, type LucideIcon } from "lucide-react";
import { Status } from "@/components/ui/Status";

const ROWS: { icon: LucideIcon; src: string; out: string; fix: string }[] = [
  { icon: Armchair, src: "DSC0041 (2).JPG", out: "ax-442-black-01.jpg", fix: "BG REMOVED · CENTRED" },
  { icon: Lamp, src: "IMG_99283.jpg", out: "lg-77-white-01.jpg", fix: "SQUARED · 2048 PX" },
  { icon: Shirt, src: "tee_final_v2.png", out: "tx-310-navy-01.jpg", fix: "BG REMOVED · COLOUR CHECKED" },
  { icon: Headphones, src: "photo (14).jpeg", out: "sp-88-black-01.jpg", fix: "MARKETPLACE MAIN IMAGE" },
];

/** A supplier shot: off-centre, tilted, busy background. Purely illustrative. */
function BeforeTile({ icon: Icon, i }: { icon: LucideIcon; i: number }) {
  return (
    <div
      aria-hidden
      className="relative aspect-square overflow-hidden rounded-[8px] border border-line"
      style={{
        backgroundColor: ["#d9d4c7", "#c9cfd2", "#d6cdc3", "#cfd0c8"][i % 4],
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(16,17,18,0.07) 0 2px, transparent 2px 9px), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.45), transparent 45%)",
      }}
    >
      <Icon
        className="absolute size-[42%] text-ink-2/80"
        style={{ left: `${18 + (i % 2) * 22}%`, top: `${26 + (i % 3) * 8}%`, transform: `rotate(${[-9, 7, -4, 11][i % 4]}deg)` }}
        strokeWidth={1.25}
      />
    </div>
  );
}

/** The output: centred, white background, consistent padding and a soft ground line. */
function AfterTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div aria-hidden className="relative grid aspect-square place-items-center rounded-[8px] border border-line bg-white">
      <Icon className="size-[46%] text-ink" strokeWidth={1.25} />
      <span className="absolute bottom-[18%] h-px w-[38%] bg-ink/15" />
    </div>
  );
}

export function ImageryVisual() {
  return (
    <figure aria-label="Supplier photos turned into a consistent, store-ready image set" className="overflow-hidden rounded-[12px] border border-line bg-bg">
      <div className="flex h-11 items-center justify-between border-b border-line px-4 md:px-5">
        <span className="mono-label text-ink-2">IMAGE SET · BEFORE → AFTER</span>
        <span className="mono-micro text-ink-3">ILLUSTRATIVE</span>
      </div>
      <ul className="grid gap-px bg-line sm:grid-cols-2">
        {ROWS.map((r, i) => (
          <li key={r.out} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 bg-bg p-4 md:p-5">
            <div className="min-w-0">
              <BeforeTile icon={r.icon} i={i} />
              <p className="mt-2 truncate font-mono text-[0.75rem] text-ink-3">{r.src}</p>
            </div>
            <ArrowRight aria-hidden className="size-4 text-ink-3" strokeWidth={2} />
            <div className="min-w-0">
              <AfterTile icon={r.icon} />
              <p className="mt-2 truncate font-mono text-[0.75rem] text-ink">{r.out}</p>
            </div>
            <div className="col-span-3 flex items-center justify-between border-t border-line pt-3">
              <span className="mono-micro text-ink-3">{r.fix}</span>
              <Status kind="published" label="CHECKED" />
            </div>
          </li>
        ))}
      </ul>
      <figcaption className="border-t border-line px-4 py-3 text-[0.85rem] text-ink-2 md:px-5">
        Product shape, colour and details stay exactly as photographed. Only background, framing and size change.
      </figcaption>
    </figure>
  );
}

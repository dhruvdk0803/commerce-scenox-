import Image from "next/image";
import { Check, Phone, ShoppingBag } from "lucide-react";
import { img } from "@/lib/images";
import { Price } from "@/components/market/Price";
import { Status } from "@/components/ui/Status";

const BARS = [6, 14, 22, 12, 28, 18, 9, 24, 16, 30, 12, 20, 8, 26, 14, 18, 10, 22, 6, 16, 24, 11, 19, 8];

const CALL: { who: "AI" | "CUSTOMER"; text: string }[] = [
  { who: "AI", text: "Hi, I'm calling from Northwind Home about your order of the black office chair. Is now a good time?" },
  { who: "CUSTOMER", text: "Yes, that's mine." },
  { who: "AI", text: "It's cash on delivery and arrives Thursday. Shall I confirm it for dispatch?" },
  { who: "CUSTOMER", text: "Yes, please." },
];

export function VoiceVisual() {
  return (
    <figure
      aria-label="An AI shopping assistant recommending products and adding one to the cart in chat, next to a voice agent confirming a cash-on-delivery order"
      className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
    >
      {/* chat */}
      <div className="flex flex-col overflow-hidden rounded-[12px] border border-line bg-bg">
        <div className="flex h-11 items-center justify-between border-b border-line px-4">
          <span className="mono-label text-ink-2">SITE CHAT · SHOPPING ASSISTANT</span>
          <span className="mono-micro text-ink-3">ILLUSTRATIVE</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
          <p className="max-w-[80%] self-end rounded-[12px] rounded-br-[4px] bg-ink px-3.5 py-2.5 text-[0.925rem] leading-snug text-paper">
            I need a desk chair for long workdays. Mesh back, nothing too expensive.
          </p>
          <div className="max-w-[92%]">
            <p className="rounded-[12px] rounded-bl-[4px] border border-line bg-bg-elevated px-3.5 py-2.5 text-[0.925rem] leading-snug text-ink">
              This one fits: adjustable lumbar support and a 120 kg rated base. People often pair it with this lamp.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                { src: img.chair, name: "Black Ergonomic Office Chair", price: { in: 8499, us: 229, uk: 189, au: 349 }, added: true },
                { src: img.lamp, name: "White LED Desk Lamp", price: { in: 2499, us: 59, uk: 49, au: 89 }, added: false },
              ].map((p) => (
                <div key={p.name} className="overflow-hidden rounded-[10px] border border-line bg-bg-elevated">
                  <div className="relative aspect-[4/3] bg-[#f5f4ef]">
                    <Image src={p.src} alt={p.name} placeholder="blur" sizes="200px" className="size-full object-contain p-1.5" />
                  </div>
                  <div className="p-2.5">
                    <p className="truncate text-[0.825rem] font-medium text-ink">{p.name}</p>
                    <p className="mt-0.5 text-[0.825rem] text-ink-2 tabular">
                      <Price set={p.price} />
                    </p>
                    <span
                      className={
                        p.added
                          ? "mono-micro mt-2 flex h-7 items-center justify-center gap-1 rounded-[6px] bg-success text-white"
                          : "mono-micro mt-2 flex h-7 items-center justify-center rounded-[6px] border border-line text-ink"
                      }
                    >
                      {p.added ? (
                        <>
                          <Check className="size-3" strokeWidth={3} aria-hidden /> ADDED
                        </>
                      ) : (
                        "ADD TO CART"
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="max-w-[80%] self-end rounded-[12px] rounded-br-[4px] bg-ink px-3.5 py-2.5 text-[0.925rem] leading-snug text-paper">
            Just the chair, in black.
          </p>
          <p className="max-w-[92%] rounded-[12px] rounded-bl-[4px] border border-line bg-bg-elevated px-3.5 py-2.5 text-[0.925rem] leading-snug text-ink">
            Done, it&apos;s in your cart. Here&apos;s your checkout link, and I&apos;ve sent it to WhatsApp too.
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line bg-bg-elevated px-4 py-3">
          <span className="flex items-center gap-2 text-[0.875rem] text-ink">
            <ShoppingBag className="size-4" strokeWidth={1.75} aria-hidden />
            Cart · 1 item
          </span>
          <span className="mono-micro rounded-[6px] bg-accent px-2.5 py-1.5 text-white">CHECKOUT →</span>
        </div>
      </div>

      {/* voice */}
      <div className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-[12px] border border-line-dark bg-bg-dark text-paper">
          <div className="flex h-11 items-center justify-between border-b border-line-dark px-4">
            <span className="mono-label flex items-center gap-2 text-paper-2">
              <Phone className="size-3.5" strokeWidth={2} aria-hidden />
              VOICE AGENT · COD CONFIRMATION
            </span>
            <span className="mono-micro text-paper-2 tabular">0:48</span>
          </div>
          <div aria-hidden className="flex h-16 items-center justify-center gap-[3px] px-4">
            {BARS.map((h, i) => (
              <span key={i} className="wave-bar w-[3px] rounded-full bg-paper/80" style={{ height: h, animationDelay: `${(i % 8) * 90}ms` }} />
            ))}
          </div>
          <ol className="flex flex-col gap-3 border-t border-line-dark px-4 py-4">
            {CALL.map((l) => (
              <li key={l.text} className="grid grid-cols-[5.5rem_1fr] gap-3 text-[0.875rem] leading-snug">
                <span className={l.who === "AI" ? "mono-micro pt-0.5 text-accent-on-dark" : "mono-micro pt-0.5 text-paper-2"}>{l.who}</span>
                <span className={l.who === "AI" ? "text-paper" : "text-paper-2"}>{l.text}</span>
              </li>
            ))}
          </ol>
          <div className="flex items-center justify-between border-t border-line-dark px-4 py-3">
            <span className="mono-micro text-paper-2">OUTCOME</span>
            <span className="mono-micro flex items-center gap-1.5 text-[#5fd39b]">
              <span className="size-1.5 rounded-full bg-[#5fd39b]" />
              CONFIRMED · SENT TO DISPATCH
            </span>
          </div>
        </div>

        <ul className="divide-y divide-line overflow-hidden rounded-[12px] border border-line bg-bg">
          {[
            { t: "Cart callback · 2 items left at checkout", m: "VOICE · 1:12", k: "validating" as const, l: "LINK SENT" },
            { t: "Inbound: “Where is my order?”", m: "VOICE · 0:31", k: "published" as const, l: "ANSWERED" },
            { t: "Caller asks for a refund", m: "TO YOUR TEAM", k: "missing" as const, l: "HANDED OFF" },
          ].map((r) => (
            <li key={r.t} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="min-w-0">
                <span className="block truncate text-[0.9rem] text-ink">{r.t}</span>
                <span className="mono-micro text-ink-3">{r.m}</span>
              </span>
              <Status kind={r.k} label={r.l} />
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="text-[0.85rem] text-ink-2 lg:col-span-2">
        Recommendations come from your live catalog and stock. Payment always happens on your own checkout.
      </figcaption>
    </figure>
  );
}

import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Price } from "@/components/market/Price";

const DEMO_PRICE = { in: 4999, us: 89, uk: 69, au: 129 };

function Bubble({
  from,
  time,
  children,
}: {
  from: "store" | "customer";
  time: string;
  children: React.ReactNode;
}) {
  const store = from === "store";
  return (
    <div className={cn("flex", store ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] rounded-[12px] px-3.5 py-2.5 text-[0.9rem] leading-snug",
          store ? "rounded-tl-[4px] border border-line bg-white text-ink" : "rounded-tr-[4px] bg-ink text-paper",
        )}
      >
        {children}
        <span className={cn("mt-1 flex items-center justify-end gap-1 font-mono text-[0.7rem]", store ? "text-ink-3" : "text-paper-2")}>
          {time}
          {!store && <CheckCheck aria-hidden className="size-3.5" strokeWidth={2} />}
        </span>
      </div>
    </div>
  );
}

const FLOW: [string, string][] = [
  ["COD confirmation", "Before dispatch"],
  ["Order shipped", "With tracking link"],
  ["Out for delivery", "Same day"],
  ["Review request", "5 days after delivery"],
];

export function WhatsAppVisual() {
  return (
    <figure
      aria-label="A cash-on-delivery order confirmed on WhatsApp, then shipping updates"
      className="grid overflow-hidden rounded-[12px] border border-line bg-bg lg:grid-cols-[1fr_20rem]"
    >
      {/* the conversation */}
      <div className="min-w-0 border-b border-line lg:border-b-0 lg:border-r">
        <div className="flex h-11 items-center justify-between border-b border-line px-4 md:px-5">
          <span className="mono-label text-ink-2">WHATSAPP · VERIFIED BUSINESS</span>
          <span className="mono-micro text-ink-3">ILLUSTRATIVE</span>
        </div>
        <div className="flex flex-col gap-3 bg-bg-muted/50 p-4 md:p-6">
          <Bubble from="store" time="10:02">
            Hi Alex, thanks for your order #1042: Black Ergonomic Office Chair, <Price set={DEMO_PRICE} />, cash on
            delivery. Please confirm so we can ship it today.
            <span className="mt-2.5 grid grid-cols-2 gap-1.5">
              <span className="flex h-8 items-center justify-center rounded-[6px] border border-line text-[0.85rem] font-medium text-ink">
                Confirm order
              </span>
              <span className="flex h-8 items-center justify-center rounded-[6px] border border-line text-[0.85rem] text-ink-2">
                Cancel
              </span>
            </span>
          </Bubble>
          <Bubble from="customer" time="10:04">
            Confirm order
          </Bubble>
          <Bubble from="store" time="10:04">
            Confirmed. It ships today, and we&apos;ll send tracking here.
          </Bubble>
          <Bubble from="store" time="16:30">
            Shipped. Track it: yourstore.com/t/1042
          </Bubble>
        </div>
      </div>

      {/* what runs automatically */}
      <div className="p-4 md:p-5">
        <p className="mono-label text-ink-2">RUNS AUTOMATICALLY</p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {FLOW.map(([t, d]) => (
            <li key={t} className="flex items-baseline justify-between gap-3 py-3">
              <span className="text-[0.925rem] text-ink">{t}</span>
              <span className="mono-micro text-right text-ink-3">{d.toUpperCase()}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.85rem] leading-snug text-ink-2">
          Unconfirmed COD orders are held, not shipped. Any reply that needs a person goes straight to your team.
        </p>
      </div>
    </figure>
  );
}

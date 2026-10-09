import { Armchair } from "lucide-react";
import { Status } from "@/components/ui/Status";
import { Price } from "@/components/market/Price";

const DEMO_PRICE = { in: 4999, us: 89, uk: 69, au: 129 };

const SCHEDULE: { at: string; what: string; status: "published" | "queued" | "ready"; label: string }[] = [
  { at: "T+0", what: "Cart left at checkout", status: "ready", label: "TRIGGER" },
  { at: "T+1h", what: "“You left something behind”", status: "published", label: "SENT" },
  { at: "T+24h", what: "“Still thinking it over?” + reviews", status: "published", label: "SENT" },
  { at: "T+26h", what: "Order placed: flow stops automatically", status: "published", label: "RECOVERED" },
  { at: "T+72h", what: "“Last reminder” (not sent: they bought)", status: "queued", label: "SKIPPED" },
];

export function EmailVisual() {
  return (
    <figure
      aria-label="Abandoned checkout flow schedule and the recovery email it sends"
      className="grid overflow-hidden rounded-[12px] border border-line bg-bg lg:grid-cols-[1fr_22rem]"
    >
      <div className="min-w-0">
        <div className="flex h-11 items-center justify-between border-b border-line px-4 md:px-5">
          <span className="mono-label text-ink-2">ABANDONED CHECKOUT · SEND SCHEDULE</span>
          <span className="mono-micro text-ink-3">ILLUSTRATIVE</span>
        </div>
        <ol className="divide-y divide-line">
          {SCHEDULE.map((s) => (
            <li key={s.at + s.what} className="grid grid-cols-[4rem_1fr_auto] items-center gap-3 px-4 py-3.5 md:px-5">
              <span className="font-mono text-[0.85rem] text-ink tabular">{s.at}</span>
              <span className="min-w-0 text-[0.925rem] text-ink">{s.what}</span>
              <Status kind={s.status} label={s.label} />
            </li>
          ))}
        </ol>
      </div>

      {/* the email itself */}
      <div className="border-t border-line bg-bg-muted/50 p-4 md:p-5 lg:border-l lg:border-t-0">
        <div className="overflow-hidden rounded-[10px] border border-line bg-white">
          <div className="border-b border-line px-4 py-3">
            <p className="mono-micro text-ink-3">FROM YOUR STORE · T+1H</p>
            <p className="mt-1 text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">You left something behind</p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-[4rem_1fr] items-center gap-3">
              <div aria-hidden className="grid aspect-square place-items-center rounded-[6px] border border-line bg-white">
                <Armchair className="size-8 text-ink" strokeWidth={1.25} />
              </div>
              <div className="min-w-0">
                <p className="text-[0.875rem] font-medium leading-snug text-ink">Black Ergonomic Office Chair</p>
                <p className="mt-0.5 text-[0.85rem] text-ink-2 tabular">
                  <Price set={DEMO_PRICE} /> · Black
                </p>
              </div>
            </div>
            <span className="mt-4 flex h-9 items-center justify-center rounded-[6px] bg-ink text-[0.85rem] font-medium text-paper">
              Complete your order
            </span>
            <p className="mt-3 text-center text-[0.75rem] text-ink-3">Unsubscribe · Sent from your own domain</p>
          </div>
        </div>
      </div>
    </figure>
  );
}

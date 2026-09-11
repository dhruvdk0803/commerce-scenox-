import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const INPUTS = [
  { label: "ERP export", fmt: "XML · CSV", note: "Item master, pricing, stock" },
  { label: "Supplier spreadsheets", fmt: "XLSX", note: "One file per supplier is normal" },
  { label: "PDF catalog", fmt: "PDF", note: "Specifications and line drawings" },
  { label: "Image folders", fmt: "JPG · PNG · ZIP", note: "Named by SKU, or not at all" },
  { label: "Existing store export", fmt: "CSV · JSON", note: "Shopify, WooCommerce, legacy" },
];

const CAPABILITIES = [
  ["SKU normalization", "One canonical SKU per sellable item"],
  ["Category mapping", "Supplier trees mapped to your taxonomy"],
  ["Variant structure", "Size, colour, pack size as real options"],
  ["Specifications", "Typed attributes, not pasted paragraphs"],
  ["Metafields", "Filterable technical data per product"],
  ["Descriptions", "Prepared from specs and category context"],
  ["Image mapping", "Files matched, renamed, resized"],
  ["Bulk publishing", "Scheduled batches with QA between"],
  ["QA", "Storefront checks before sign-off"],
];

const OUTPUTS = [
  { label: "Shopify", via: "Import · staff access" },
  { label: "WooCommerce", via: "CSV · REST API" },
  { label: "Custom", via: "Schema reviewed per project" },
];

/** Three stacked bands in one bordered ledger: inputs → system → outputs. */
export function WholesaleFlow() {
  return (
    <Reveal className="overflow-hidden rounded-[12px] border border-line bg-bg-elevated" amount={0.1}>
      {/* INPUTS */}
      <Band label="INPUTS" meta={`${INPUTS.length} SOURCE TYPES`}>
        <ul className="divide-y divide-line">
          {INPUTS.map((s, i) => (
            <li
              key={s.label}
              className="grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-3 px-4 py-3 sm:grid-cols-[2.25rem_13rem_1fr_auto] md:px-5"
            >
              <span className="mono-micro tabular text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[0.95rem] font-medium text-ink">{s.label}</span>
              <span className="hidden text-[0.875rem] text-ink-2 sm:block">{s.note}</span>
              <span className="mono-micro text-ink-3">{s.fmt}</span>
            </li>
          ))}
        </ul>
      </Band>

      <Joint />

      {/* SYSTEM */}
      <Band label="SCENOX COMMERCE" meta="9 OPERATIONS" dark>
        <ul className="grid gap-px bg-line-dark sm:grid-cols-3">
          {CAPABILITIES.map(([t, d], i) => (
            <li key={t} className="bg-bg-dark px-4 py-4 md:px-5">
              <div className="flex items-baseline gap-3">
                <span className="mono-micro tabular text-paper-2">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] font-medium text-paper">{t}</span>
              </div>
              <p className="mt-1.5 pl-[calc(2ch+0.75rem)] text-[0.85rem] leading-snug text-paper-2">{d}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Joint />

      {/* OUTPUTS */}
      <Band label="OUTPUTS" meta="PUBLISHED IN BATCHES" success>
        <ul className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {OUTPUTS.map((o) => (
            <li key={o.label} className="flex items-baseline justify-between gap-3 px-4 py-4 md:px-5">
              <span className="text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">{o.label}</span>
              <span className="mono-micro text-right text-ink-3">{o.via}</span>
            </li>
          ))}
        </ul>
      </Band>
    </Reveal>
  );
}

function Band({
  label,
  meta,
  dark,
  success,
  children,
}: {
  label: string;
  meta: string;
  dark?: boolean;
  success?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(dark && "bg-bg-dark text-paper")} aria-label={label}>
      <div
        className={cn(
          "flex h-11 items-center justify-between border-b px-4 md:px-5",
          dark ? "border-line-dark" : "border-line",
        )}
      >
        <span className={cn("mono-label", dark ? "text-paper-2" : "text-ink-2")}>{label}</span>
        <span className={cn("mono-micro", success ? "text-success" : dark ? "text-paper-2" : "text-ink-3")}>
          {meta}
        </span>
      </div>
      {children}
    </section>
  );
}

function Joint() {
  return (
    <div aria-hidden className="flex h-9 items-center justify-center border-y border-line bg-bg">
      <ArrowDown className="size-3.5 text-ink-3" strokeWidth={2} />
    </div>
  );
}

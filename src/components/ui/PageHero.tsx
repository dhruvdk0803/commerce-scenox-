import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export type Fact = { k: string; v: ReactNode };

/**
 * Inner-page opener. Copy on the left, a compact facts ledger on the right
 * so wide screens never show a lone column of text.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  facts,
  factsLabel = "AT A GLANCE",
  aside,
  size = "h1",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  facts?: Fact[];
  factsLabel?: string;
  /** custom right-hand content instead of facts */
  aside?: ReactNode;
  size?: "h1" | "display";
  className?: string;
}) {
  const right = aside ?? (facts && facts.length > 0 ? <Facts label={factsLabel} facts={facts} /> : null);
  return (
    <section data-hero className={cn("container-x pt-10 pb-14 md:pt-16 md:pb-20", className)}>
      <div className={cn("grid gap-10 lg:gap-12", right ? "grid-cols-[minmax(0,1fr)] lg:grid-cols-12 lg:items-start" : "")}>
        <Reveal className={cn(right ? "lg:col-span-7" : "max-w-[60rem]")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className={cn("mt-5 text-balance text-ink", size === "display" ? "text-display" : "text-h1", "max-w-[22ch]")}>
            {title}
          </h1>
          {lead && <p className="mt-6 max-w-[50ch] text-lead text-ink-2">{lead}</p>}
          {actions && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">{actions}</div>
          )}
        </Reveal>
        {right && (
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-10">
            {right}
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function Facts({ label, facts }: { label: string; facts: Fact[] }) {
  return (
    <dl className="overflow-hidden rounded-[10px] border border-line bg-bg-elevated">
      <div className="flex h-10 items-center border-b border-line px-4">
        <span className="mono-label text-ink-2">{label}</span>
      </div>
      {facts.map((f) => (
        <div key={f.k} className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-3 border-b border-line px-4 py-3 last:border-b-0">
          <dt className="mono-micro text-ink-3">{f.k}</dt>
          <dd className="min-w-0 text-[0.9rem] leading-snug text-ink [overflow-wrap:anywhere]">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

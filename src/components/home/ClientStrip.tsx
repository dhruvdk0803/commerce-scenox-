import { clients, clientClaim } from "@/content/clients";
import { cn } from "@/lib/utils";

/**
 * Typographic client roll: static count on the left, a slow continuous
 * line of names on the right. CSS-only, pauses on hover, static under
 * prefers-reduced-motion. No logos, no ratings.
 */
export function ClientStrip({ tone = "light" }: { tone?: "light" | "muted" }) {
  const names = clients.filter((c) => c.homepage !== false).map((c) => c.name);
  const loop = [...names, ...names];

  return (
    <section
      aria-label="Clients"
      className={cn("border-b border-line", tone === "muted" ? "bg-bg-muted/40" : "bg-bg")}
    >
      <div className="container-x grid gap-5 py-7 md:py-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-3">
          <p className="mono-label text-ink-3">WORKED WITH</p>
          <p className="mt-2 text-[1.25rem] font-semibold leading-tight tracking-[-0.025em] text-ink">
            {clientClaim.headline}
          </p>
        </div>

        <div
          className="marquee relative overflow-hidden lg:col-span-9 lg:col-start-4"
          style={{ maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}
        >
          {/* visually-hidden static list for screen readers */}
          <ul className="sr-only">
            {names.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <ul aria-hidden className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
            {loop.map((n, i) => (
              <li key={`${n}-${i}`} className="flex items-center gap-10">
                <span className="text-[1rem] font-medium tracking-[-0.01em] text-ink-2">{n}</span>
                <span className="size-1 rounded-full bg-line-strong" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

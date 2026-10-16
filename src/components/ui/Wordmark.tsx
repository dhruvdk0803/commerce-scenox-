import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Slash mark: a terracotta slash and a product block on a solid tile.
 * The slash is every product URL and the "/" in scenox/commerce. On dark
 * backgrounds the tile turns paper so it doesn't disappear.
 */
export function BrandMark({ inverse, className }: { inverse?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("shrink-0", className)}>
      <rect width="48" height="48" rx="11" fill={inverse ? "#F5F4EF" : "#101112"} />
      <path d="M26.8 9h7.8L21.2 39h-7.8z" fill="#C2410C" />
      <rect x="31" y="31.5" width="7.5" height="7.5" rx="1.5" fill={inverse ? "#101112" : "#F5F4EF"} />
    </svg>
  );
}

export function Wordmark({
  inverse,
  className,
  byline,
  href = "/",
}: {
  inverse?: boolean;
  className?: string;
  byline?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Scenox Commerce home"
      className={cn("inline-flex flex-col leading-none", inverse ? "text-paper" : "text-ink", className)}
    >
      <span className="inline-flex items-center gap-2.5">
        <BrandMark inverse={inverse} className="size-[1.85rem]" />
        <span className="text-[1.2rem] font-semibold tracking-[-0.035em]">
          scenox
          <span className="mx-[0.06em] font-medium text-accent">/</span>
          <span className={cn("font-medium", inverse ? "text-paper-2" : "text-ink-2")}>commerce</span>
        </span>
      </span>
      {byline && <span className={cn("mono-micro mt-2.5", inverse ? "text-paper-2" : "text-ink-3")}>by Scenox Studios</span>}
    </Link>
  );
}

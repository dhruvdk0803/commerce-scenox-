import Link from "next/link";
import { cn } from "@/lib/utils";

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
      className={cn(
        "inline-flex flex-col leading-none",
        inverse ? "text-paper" : "text-ink",
        className,
      )}
    >
      <span className="inline-flex items-baseline gap-[0.45em] text-[0.95rem] font-semibold tracking-[0.12em]">
        <span>SCENOX</span>
        <span
          aria-hidden
          className={cn(
            "inline-block h-[0.95em] w-px translate-y-[0.1em] rotate-[18deg]",
            inverse ? "bg-paper/60" : "bg-ink/60",
          )}
        />
        <span className={cn("font-medium tracking-[0.12em]", inverse ? "text-paper-2" : "text-ink-2")}>
          COMMERCE
        </span>
      </span>
      {byline && (
        <span
          className={cn(
            "mono-micro mt-2",
            inverse ? "text-paper-2" : "text-ink-3",
          )}
        >
          by Scenox Studios
        </span>
      )}
    </Link>
  );
}

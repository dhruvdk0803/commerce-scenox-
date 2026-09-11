import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small monospace system label. `SOURCE_DATA`, `01 / SEND`, etc.
 * Plain text, no decoration. Optional numeric index.
 */
export function Eyebrow({
  children,
  className,
  index,
  inverse,
}: {
  children: ReactNode;
  className?: string;
  index?: string;
  /** kept for API compatibility; intentionally not rendered */
  dot?: "accent" | "success" | "warning" | "danger" | "muted";
  inverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "mono-label inline-flex items-center gap-3",
        inverse ? "text-paper-2" : "text-ink-2",
        className,
      )}
    >
      {index && (
        <span className={cn("tabular", inverse ? "text-paper" : "text-ink")}>{index}</span>
      )}
      <span>{children}</span>
    </div>
  );
}

/** Inline mono tag e.g. `4,832 SKUS` */
export function Tag({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "inverse";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mono-micro inline-flex h-6 items-center gap-1.5 rounded-[4px] border px-2 tabular",
        tone === "neutral" && "border-line bg-bg-elevated text-ink-2",
        tone === "accent" && "border-accent/30 bg-accent-soft text-accent",
        tone === "success" && "border-success/30 bg-success-soft text-success",
        tone === "warning" && "border-warning/30 bg-warning-soft text-warning",
        tone === "danger" && "border-danger/30 bg-danger-soft text-danger",
        tone === "inverse" && "border-line-dark bg-white/5 text-paper-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusKind =
  | "queued"
  | "processing"
  | "validating"
  | "ready"
  | "published"
  | "missing"
  | "invalid";

const map: Record<
  StatusKind,
  { label: string; dot: string; text: string; pulse?: boolean }
> = {
  queued: { label: "QUEUED", dot: "bg-ink-3", text: "text-ink-2" },
  processing: {
    label: "PROCESSING",
    dot: "bg-accent",
    text: "text-accent",
    pulse: true,
  },
  validating: {
    label: "VALIDATING",
    dot: "bg-accent",
    text: "text-accent",
    pulse: true,
  },
  ready: { label: "READY", dot: "bg-success", text: "text-success" },
  published: { label: "PUBLISHED", dot: "bg-success", text: "text-success" },
  missing: { label: "MISSING", dot: "bg-warning", text: "text-warning" },
  invalid: { label: "INVALID", dot: "bg-danger", text: "text-danger" },
};

export function Status({
  kind,
  className,
  label,
  inverse,
}: {
  kind: StatusKind;
  className?: string;
  label?: string;
  inverse?: boolean;
}) {
  const s = map[kind];
  return (
    <span
      className={cn(
        "mono-micro inline-flex items-center gap-1.5 tabular",
        inverse && kind === "queued" ? "text-paper-2" : s.text,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          inverse && kind === "queued" ? "bg-paper-2" : s.dot,
          s.pulse && "anim-pulse-dot",
        )}
      />
      {label ?? s.label}
    </span>
  );
}

/** Small square check used in "store ready" checklists. */
export function CheckBox({
  done,
  className,
  size = "md",
}: {
  done: boolean;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-[4px] border transition-[background-color,border-color] duration-[280ms] ease-[var(--ease-out)]",
        size === "sm" ? "size-3.5" : "size-4",
        done
          ? "border-success bg-success text-white"
          : "border-line-strong bg-transparent text-transparent",
        className,
      )}
    >
      <Check
        className={cn(
          size === "sm" ? "size-2.5" : "size-3",
          "transition-[transform,opacity] duration-[240ms] ease-[var(--ease-out)]",
          done ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
        strokeWidth={3}
      />
    </span>
  );
}

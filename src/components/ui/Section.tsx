import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "muted" | "dark";

export function Section({
  tone = "light",
  className,
  children,
  compact,
  id,
  ...rest
}: {
  tone?: Tone;
  compact?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        compact ? "section-y-sm" : "section-y",
        tone === "dark" && "bg-bg-dark text-paper",
        tone === "muted" && "bg-bg-muted",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "header" | "footer" | "nav";
}) {
  return <Tag className={cn("container-x", className)}>{children}</Tag>;
}

/** Thin full-bleed rule used as a section divider. */
export function Rule({ dark }: { dark?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full", dark ? "bg-line-dark" : "bg-line")}
    />
  );
}

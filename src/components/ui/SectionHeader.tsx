import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/**
 * Balanced section opener. Title on the left, supporting sentence and/or
 * action on the right, both sitting on the same baseline row. Avoids the
 * "everything crammed into one column" look on wide screens.
 */
export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  action,
  inverse,
  id,
  titleClassName,
  className,
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  inverse?: boolean;
  id?: string;
  titleClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <Reveal className="lg:col-span-7">
        <Eyebrow index={index} inverse={inverse}>
          {eyebrow}
        </Eyebrow>
        <h2
          id={id}
          className={cn(
            "mt-5 text-h2",
            inverse ? "text-paper" : "text-ink",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {(description || action) && (
        <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
          {description && (
            <p
              className={cn(
                "max-w-[38ch] text-[1rem] leading-[1.55]",
                inverse ? "text-paper-2" : "text-ink-2",
              )}
            >
              {description}
            </p>
          )}
          {action && <div className={cn(description && "mt-5")}>{action}</div>}
        </Reveal>
      )}
    </div>
  );
}

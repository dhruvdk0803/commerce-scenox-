"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  className,
  defaultOpen = 0,
  inverse,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
  inverse?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div
      className={cn(
        "divide-y border-y",
        inverse ? "divide-line-dark border-line-dark" : "divide-line border-line",
        className,
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "group flex w-full items-start justify-between gap-6 py-5 text-left md:py-6",
                  "transition-colors duration-[160ms]",
                  inverse ? "text-paper" : "text-ink",
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className={cn(
                      "mono-label tabular mt-[0.35em] hidden shrink-0 sm:inline",
                      inverse ? "text-paper-2" : "text-ink-3",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.05rem] font-medium tracking-[-0.015em] md:text-[1.15rem]">
                    {item.q}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-[280ms] ease-[var(--ease-out)]",
                    inverse
                      ? "border-line-dark-strong group-hover:bg-white/5"
                      : "border-line-strong group-hover:bg-bg-muted",
                    isOpen && "rotate-45",
                  )}
                >
                  <Plus className="size-3.5" strokeWidth={2} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  key="content"
                  initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.32, ease: [0.23, 1, 0.32, 1] },
                    opacity: { duration: 0.22 },
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-[64ch] pb-6 text-[1rem] leading-[1.6] sm:pl-[calc(1.5rem+1rem)] md:pb-7",
                      inverse ? "text-paper-2" : "text-ink-2",
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Crossfades content when `id` changes. Adds a 2px blur during the swap so
 * the eye reads one field transforming rather than two overlapping.
 */
export function Swap({
  id,
  children,
  className,
  y = 6,
  plain = false,
}: {
  id: string | number;
  children: ReactNode;
  className?: string;
  y?: number;
  /** skip the blur filter (cheaper when many cells swap at once) */
  plain?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("relative inline-grid", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={id}
          className="col-start-1 row-start-1 inline-block"
          initial={
            reduce
              ? { opacity: 0 }
              : plain
                ? { opacity: 0, transform: `translateY(${y}px)` }
                : { opacity: 0, transform: `translateY(${y}px)`, filter: "blur(2px)" }
          }
          animate={plain ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
          exit={
            reduce
              ? { opacity: 0 }
              : plain
                ? { opacity: 0, transform: `translateY(-${y}px)` }
                : { opacity: 0, transform: `translateY(-${y}px)`, filter: "blur(2px)" }
          }
          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

"use client";

import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * "Seen" detection that cannot strand content invisible:
 * IntersectionObserver + an immediate geometric check + a timed re-check.
 * Transitions themselves are CSS (see globals.css `.reveal` / `.stagger`),
 * so they run off the main thread and never stall under load.
 */
function useSeen(ref: React.RefObject<HTMLElement | null>, amount: number) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;

    const inViewport = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.96 && r.bottom > 0;
    };
    const mark = () => setSeen(true);

    const raf = requestAnimationFrame(() => {
      if (inViewport()) mark();
    });
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) mark();
      },
      { threshold: Math.min(amount, 0.4), rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    const t = window.setTimeout(() => {
      if (inViewport()) mark();
    }, 1200);
    const onScroll = () => {
      if (inViewport()) mark();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, amount, seen]);

  return seen;
}

/**
 * Restrained scroll reveal: opacity + 12px translate, ease-out, once.
 * Used sparingly for section openers. Not for every card.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "header" | "li" | "article" | "span" | "p";
  amount?: number;
  /** kept for API compatibility */
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, amount);
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      data-seen={seen ? "true" : "false"}
      style={delay ? ({ transitionDelay: `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its direct children (children use `MotionItem`/`MotionLi`). */
export function Stagger({
  children,
  className,
  as = "div",
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, amount);
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={cn("stagger", className)} data-seen={seen ? "true" : "false"}>
      {children}
    </Tag>
  );
}

/** Stagger child. `variants` accepted for compatibility; motion is CSS-driven. */
function makeItem(tag: "div" | "li") {
  return function Item({
    children,
    className,
    variants: _variants,
    ...rest
  }: {
    children?: ReactNode;
    className?: string;
    variants?: unknown;
  } & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className">) {
    void _variants;
    return createElement(tag, { className: cn("stagger-item", className), ...rest }, children);
  };
}

export const MotionItem = makeItem("div");
export const MotionLi = makeItem("li");

/** Exported for callers that still pass them; no-ops now. */
export const staggerParent = {};
export const staggerChild = {};

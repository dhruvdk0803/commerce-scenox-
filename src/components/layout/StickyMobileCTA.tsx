"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";

/**
 * Bottom action bar for acquisition pages. Appears only after the visitor
 * scrolls past the hero, hides when the final CTA / form is visible.
 */
export function StickyMobileCTA({
  href = "/get-started",
  label = "Get Started",
  hideNear = "[data-hide-sticky]",
}: {
  href?: string;
  label?: string;
  hideNear?: string;
}) {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const targets = Array.from(document.querySelectorAll(hideNear));
    let heroVisible = true;
    let ctaVisible = false;

    const update = () => setShow(!heroVisible && !ctaVisible);

    const heroObs = new IntersectionObserver(
      ([e]) => {
        heroVisible = e.isIntersecting;
        update();
      },
      { threshold: 0.1 },
    );
    if (hero) heroObs.observe(hero);
    else {
      heroVisible = false;
      update();
    }

    const ctaObs = new IntersectionObserver(
      (entries) => {
        ctaVisible = entries.some((e) => e.isIntersecting);
        update();
      },
      { threshold: 0.05 },
    );
    targets.forEach((t) => ctaObs.observe(t));

    return () => {
      heroObs.disconnect();
      ctaObs.disconnect();
    };
  }, [hideNear]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-sticky-cta
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(100%)" }}
          animate={{ opacity: 1, transform: "translateY(0%)" }}
          exit={{ opacity: 0, transform: "translateY(100%)" }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          <Button
            href={href}
            variant="primary"
            size="lg"
            arrow
            event="sticky_get_started_click"
            className="w-full"
          >
            {label}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Deterministic step orchestrator. `durations[i]` is how long step i holds
 * before advancing. Loops. Pauses when the element is offscreen or the tab
 * is hidden. Reduced motion renders the final step and never advances.
 */
export function useTimeline(
  durations: number[],
  opts: { loop?: boolean; ref?: React.RefObject<HTMLElement | null> } = {},
) {
  const { loop = true, ref } = opts;
  const reduce = useReducedMotion();
  const last = durations.length - 1;
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(true);

  // visibility gating (subscriptions only; state set in callbacks)
  useEffect(() => {
    const el = ref?.current;
    let inView = true;
    let tabVisible = document.visibilityState === "visible";
    const update = () => setActive(inView && tabVisible);

    const onVis = () => {
      tabVisible = document.visibilityState === "visible";
      update();
    };
    document.addEventListener("visibilitychange", onVis);

    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(
        ([e]) => {
          inView = e.isIntersecting;
          update();
        },
        { threshold: 0.15 },
      );
      io.observe(el);
    }
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    if (reduce || !active) return;
    const t = setTimeout(() => {
      setStep((s) => (s >= last ? (loop ? 0 : s) : s + 1));
    }, durations[step]);
    return () => clearTimeout(t);
  }, [step, active, reduce, last, loop, durations]);

  return reduce ? last : step;
}

/**
 * rAF counter from 0 to `target` over `ms`, eased. Restarts from 0 every time
 * `running` flips from false to true. Returns 0 while not running.
 */
export function useCounter(target: number, running: boolean, ms: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      if (start == null) start = now;
      const p = Math.min(1, (now - start) / ms);
      setValue(Math.round(target * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, target, ms]);

  return running ? value : 0;
}

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const ease = [0.32, 0.72, 0, 1] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{ opacity: 0, transform: "translateY(-6px)" }}
          transition={{ duration: 0.26, ease }}
        >
          <div className="container-x flex h-16 items-center justify-between border-b border-line">
            <Wordmark />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-[8px] text-ink hover:bg-bg-muted"
            >
              <X className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-x flex-1 overflow-y-auto pb-8 pt-6"
          >
            <p className="mono-label mb-3 text-ink-3">Services</p>
            <ul className="flex flex-col">
              {nav.services.map((s, i) => (
                <motion.li
                  key={s.href}
                  initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ duration: 0.36, delay: 0.04 + i * 0.035, ease }}
                >
                  <Link
                    href={s.href}
                    onClick={onClose}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                  >
                    <span className="text-[1.25rem] font-medium tracking-[-0.02em] text-ink">
                      {s.label}
                    </span>
                    <span className="mono-micro tabular text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-col">
              {nav.primary.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ duration: 0.36, delay: 0.22 + i * 0.035, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block border-b border-line py-3.5 text-[1.6rem] font-semibold tracking-[-0.03em] text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-8 flex flex-col gap-3"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.34 }}
            >
              <Button
                href="/get-started"
                variant="primary"
                size="lg"
                arrow
                event="nav_get_started_click"
                onClick={onClose}
                className="w-full"
              >
                Get Started
              </Button>
              <Button
                href="/sample"
                variant="outline"
                size="lg"
                onClick={onClose}
                className="w-full"
              >
                Send 10 Products
              </Button>
              <p className="mono-micro mt-3 text-center text-ink-3">
                {site.platforms.join(" • ")}
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

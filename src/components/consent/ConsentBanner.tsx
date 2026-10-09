"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { CONSENT_EVENT, OPEN_SETTINGS_EVENT, readConsent, saveConsent } from "@/lib/consent";

/* Consent state as an external store: no setState-in-effect, no hydration mismatch. */
const subscribe = (cb: () => void) => {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
};
const decidedSnapshot = () => (readConsent() ? "decided" : "undecided");
const serverSnapshot = () => "server";

function Toggle({
  label,
  desc,
  checked,
  onChange,
  locked,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  locked?: boolean;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 border-t border-line py-3">
      <div>
        <p id={id} className="text-[0.9rem] font-medium text-ink">
          {label}
        </p>
        <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-2">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        disabled={locked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative mt-0.5 h-6 w-10 shrink-0 rounded-full border transition-colors duration-[160ms]",
          checked ? "border-ink bg-ink" : "border-line-strong bg-bg",
          locked && "cursor-not-allowed opacity-60",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-1/2 size-4 -translate-y-1/2 rounded-full transition-transform duration-[200ms] ease-[var(--ease-out)]",
            checked ? "translate-x-[1.125rem] bg-paper" : "translate-x-[0.1875rem] bg-ink-3",
          )}
        />
      </button>
    </div>
  );
}

export function ConsentBanner() {
  const state = useSyncExternalStore(subscribe, decidedSnapshot, serverSnapshot);
  const reduce = useReducedMotion();
  const [reopened, setReopened] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const open = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setAdvertising(c?.advertising ?? false);
      setChoosing(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const open = state === "undecided" || reopened;

  // hide the mobile sticky CTA while this is on screen (see globals.css)
  useEffect(() => {
    document.documentElement.toggleAttribute("data-consent-open", open && state !== "server");
  }, [open, state]);

  const decide = (choice: { analytics: boolean; advertising: boolean }) => {
    saveConsent(choice);
    setReopened(false);
    setChoosing(false);
  };

  if (state === "server") return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="region"
          aria-label="Cookie consent"
          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{ opacity: 0, transform: reduce ? "translateY(0px)" : "translateY(6px)" }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-x-3 bottom-3 z-[70] rounded-[12px] border border-line bg-bg-elevated p-4 shadow-[0_12px_40px_-16px_rgba(16,17,18,0.25)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[24rem] sm:p-5"
        >
          <p className="mono-micro text-ink-3">COOKIES</p>
          <p className="mt-2 text-[0.9rem] leading-snug text-ink">
            We use optional analytics and advertising cookies to see which pages help and to measure our ads.
            Nothing optional runs until you choose.{" "}
            <Link href="/privacy#cookies" className="link-underline text-ink-2">
              Details
            </Link>
          </p>

          {choosing && (
            <div className="mt-3">
              <Toggle label="Necessary" desc="Your region and form progress. Always on." checked locked />
              <Toggle
                label="Analytics"
                desc="Google Analytics: anonymous page and event measurement."
                checked={analytics}
                onChange={setAnalytics}
              />
              <Toggle
                label="Advertising"
                desc="Meta Pixel: measures and improves our ads."
                checked={advertising}
                onChange={setAdvertising}
              />
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            {choosing ? (
              <>
                <button
                  type="button"
                  onClick={() => decide({ analytics: false, advertising: false })}
                  className="h-10 rounded-[8px] border border-line-strong text-[0.875rem] font-medium text-ink transition-[border-color,transform] duration-[160ms] hover:border-ink active:scale-[0.98]"
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={() => decide({ analytics, advertising })}
                  className="h-10 rounded-[8px] bg-ink text-[0.875rem] font-medium text-paper transition-transform duration-[160ms] active:scale-[0.98]"
                >
                  Save choices
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => decide({ analytics: false, advertising: false })}
                  className="h-10 rounded-[8px] border border-line-strong text-[0.875rem] font-medium text-ink transition-[border-color,transform] duration-[160ms] hover:border-ink active:scale-[0.98]"
                >
                  Reject non-essential
                </button>
                <button
                  type="button"
                  onClick={() => decide({ analytics: true, advertising: true })}
                  className="h-10 rounded-[8px] bg-ink text-[0.875rem] font-medium text-paper transition-transform duration-[160ms] active:scale-[0.98]"
                >
                  Accept all
                </button>
              </>
            )}
          </div>
          {!choosing && (
            <button
              type="button"
              onClick={() => setChoosing(true)}
              className="mt-2 inline-flex min-h-9 items-center text-[0.8125rem] text-ink-2 hover:text-ink"
            >
              <span className="link-underline">Choose what to allow</span>
            </button>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}

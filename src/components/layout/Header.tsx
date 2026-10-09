"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileNav } from "./MobileNav";

export function Header({ minimal = false }: { minimal?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const isActive = (href: string) =>
    href !== "/" && pathname?.startsWith(href.split("?")[0]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-[280ms] ease-[var(--ease-out)]",
          scrolled
            ? "border-b border-line bg-[rgba(245,244,239,0.86)] backdrop-blur-[6px]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between transition-[height] duration-[280ms] ease-[var(--ease-out)]",
            scrolled ? "h-14 md:h-[60px]" : "h-16 md:h-[76px]",
          )}
        >
          <Wordmark />

          {!minimal && (
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              <div
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                  onKeyDown={(e) => e.key === "Escape" && setServicesOpen(false)}
                  className={cn(
                    "inline-flex h-9 items-center gap-1 rounded-[6px] px-3 text-[0.925rem] font-medium tracking-[-0.01em] text-ink transition-colors duration-[160ms] hover:bg-bg-muted",
                    servicesOpen && "bg-bg-muted",
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "size-3.5 text-ink-2 transition-transform duration-[240ms] ease-[var(--ease-out)]",
                      servicesOpen && "rotate-180",
                    )}
                    strokeWidth={2}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={
                        reduce
                          ? { opacity: 0 }
                          : { opacity: 0, transform: "translateY(-4px) scale(0.985)" }
                      }
                      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                      exit={{ opacity: 0, transform: "translateY(-4px) scale(0.985)" }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      style={{ transformOrigin: "top left" }}
                      className="absolute left-0 top-[calc(100%+10px)] w-[680px] rounded-[12px] border border-line bg-bg-elevated p-2 shadow-[0_12px_40px_-16px_rgba(16,17,18,0.18)]"
                    >
                      <div className="grid grid-cols-2 gap-x-1">
                        {(["Catalog", "Sell & Retain"] as const).map((g) => (
                          <div key={g}>
                            <p className="mono-micro px-3.5 pb-1 pt-2.5 text-ink-3">{g.toUpperCase()}</p>
                            {nav.services
                              .filter((s) => s.group === g)
                              .map((s) => (
                                <Link
                                  key={s.href}
                                  href={s.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="block rounded-[8px] px-3.5 py-2.5 transition-colors duration-[160ms] hover:bg-bg-muted"
                                >
                                  <span className="text-[0.925rem] font-medium tracking-[-0.01em] text-ink">{s.label}</span>
                                  <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-2">{s.desc}</p>
                                </Link>
                              ))}
                          </div>
                        ))}
                      </div>
                      <div className="mt-1 grid grid-cols-3 gap-1 border-t border-line pt-1">
                        {nav.more.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setServicesOpen(false)}
                            className="rounded-[8px] px-3.5 py-2.5 transition-colors duration-[160ms] hover:bg-bg-muted"
                          >
                            <span className="text-[0.925rem] font-medium tracking-[-0.01em] text-ink">{s.label}</span>
                            <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-2">{s.desc}</p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {nav.primary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex h-9 items-center rounded-[6px] px-3 text-[0.925rem] font-medium tracking-[-0.01em] transition-colors duration-[160ms] hover:bg-bg-muted",
                    isActive(item.href) ? "text-ink" : "text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "link-underline",
                      isActive(item.href) && "after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <Button
              href="/get-started"
              variant="dark"
              size="sm"
              arrow
              event="nav_get_started_click"
              className={cn(!minimal && "max-sm:hidden")}
            >
              Get Started
            </Button>
            {!minimal && (
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                className="grid size-10 place-items-center rounded-[8px] text-ink transition-colors duration-[160ms] hover:bg-bg-muted lg:hidden"
              >
                <Menu className="size-5" strokeWidth={1.75} />
              </button>
            )}
          </div>
        </div>
      </header>

      {!minimal && (
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}

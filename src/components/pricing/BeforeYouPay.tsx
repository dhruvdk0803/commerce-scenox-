import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionLi, Stagger, staggerChild } from "@/components/ui/Reveal";

/*
 * Risk reversal. Every answer restates something the terms, the process or
 * the data-handling page already commits to. Don't add promises here that
 * the terms don't make.
 */
const ITEMS: { q: string; a: string; link?: { label: string; href: string } }[] = [
  {
    q: "Will the price change once you see my files?",
    a: "You get a fixed quote after we inspect your files, before any work starts. That is the price for that scope. If the scope changes later, we quote the change first.",
  },
  {
    q: "What if I don't like the result?",
    a: "Nothing goes live until you approve it. You review the finished work first, and the revisions included are written on your quote.",
  },
  {
    q: "What if it takes longer than 48 hours?",
    a: "Your turnaround is confirmed in writing on the quote, after we've seen your data. Larger or messier catalogs get a realistic date up front, not a promise we'd have to break.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes. Send 10 products and, if your project is a fit, we return them cleaned, structured and ready for your platform, free.",
    link: { label: "Send 10 products", href: "/free-sample" },
  },
  {
    q: "Who owns the work?",
    a: "You do. Your data and the finished catalog are yours, and they are never used to train third-party AI models.",
    link: { label: "How we handle data", href: "/data-handling" },
  },
  {
    q: "Do you need my store password?",
    a: "Never. We work through a scoped staff or collaborator account that you can remove at any time.",
  },
];

export function BeforeYouPay({ tone = "light", className }: { tone?: "light" | "muted"; className?: string }) {
  return (
    <section
      className={cn("section-y border-t border-line", tone === "muted" && "bg-bg-muted/40", className)}
      aria-labelledby="before-pay-heading"
    >
      <div className="container-x">
        <SectionHeader
          id="before-pay-heading"
          eyebrow="NO SURPRISES"
          title={<>Before you pay.</>}
          description="The questions worth asking any provider, answered up front."
        />
        <Stagger as="ul" className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-line bg-line md:mt-16 md:grid-cols-2 lg:grid-cols-3" amount={0.1}>
          {ITEMS.map((it) => (
            <MotionLi key={it.q} variants={staggerChild} className="flex flex-col bg-bg p-5 md:p-6">
              <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-ink">{it.q}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-[1.55] text-ink-2">{it.a}</p>
              {it.link && (
                <Link href={it.link.href} className="group mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-[0.9rem] font-medium text-ink">
                  <span className="link-underline">{it.link.label}</span>
                  <ArrowRight aria-hidden className="size-3.5 transition-transform duration-[200ms] group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
              )}
            </MotionLi>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

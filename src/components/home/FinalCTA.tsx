import Link from "next/link";
import Image from "next/image";
import { img } from "@/lib/images";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA({
  heading = ["SEND THE CATALOG.", "WE'LL TAKE IT FROM HERE."],
  body = "Tell us what you have, where it needs to go, and how many products you're working with.",
  primary = { label: "Get Started", href: "/get-started" },
  secondary = { label: "Send 10 Products", href: "/free-sample" },
}: {
  heading?: [string, string];
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section
      data-hide-sticky
      className="relative overflow-hidden bg-accent text-white"
      aria-labelledby="final-heading"
    >
      <div className="container-x relative section-y">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center xl:gap-12">
          <Reveal>
            <h2 id="final-heading" className="max-w-[26ch] text-h1 text-white">
              {heading[0]}
              <br />
              <span className="block text-balance text-white/70">{heading[1]}</span>
            </h2>
          </Reveal>
          {/* finished products, as a reminder of the outcome */}
          <Reveal delay={0.1} className="hidden grid-cols-3 gap-2 xl:grid">
            {([img.chair, img.sneaker, img.lamp, img.serum, img.bottle, img.clock] as const).map((src, i) => (
              <div key={i} className="relative size-[6.5rem] overflow-hidden rounded-[12px] bg-[#f5f4ef] ring-1 ring-white/20">
                <Image src={src} alt="" sizes="104px" className="size-full object-cover" />
              </div>
            ))}
          </Reveal>
        </div>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <Reveal delay={0.08} className="md:col-span-6">
            <p className="max-w-[40ch] text-lead text-white/80">{body}</p>
          </Reveal>
          <Reveal delay={0.14} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 md:col-span-6 md:justify-end">
            <Button href={primary.href} variant="inverse" size="lg" arrow event="cta_click" eventParams={{ cta: "final_primary" }} className="focus-visible:outline-white">
              {primary.label}
            </Button>
            {secondary && (
              <Link
                href={secondary.href}
                className="group inline-flex items-center gap-1.5 text-[1rem] font-medium text-white/80 transition-colors duration-[160ms] hover:text-white max-sm:self-center"
              >
                <span className="link-underline">Or {secondary.label.toLowerCase()}</span>
                <ArrowRight aria-hidden className="size-4 transition-transform duration-[200ms] ease-[var(--ease-out)] group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            )}
          </Reveal>
        </div>
        {site.bookingUrl && (
          <Reveal delay={0.2} className="mt-10 border-t border-white/20 pt-6 md:mt-14">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[0.95rem] text-white/80 transition-colors duration-[160ms] hover:text-white"
            >
              Prefer to talk it through? <span className="link-underline font-medium text-white">Book a call</span>
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}

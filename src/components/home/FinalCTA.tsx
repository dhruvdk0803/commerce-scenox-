import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      className="relative overflow-hidden bg-bg-dark text-paper"
      aria-labelledby="final-heading"
    >
      <div className="container-x relative section-y">
        <Reveal>
          <h2 id="final-heading" className="max-w-[26ch] text-h1 text-paper">
            {heading[0]}
            <br />
            <span className="text-paper-2">{heading[1]}</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <Reveal delay={0.08} className="md:col-span-6">
            <p className="max-w-[40ch] text-lead text-paper-2">{body}</p>
          </Reveal>
          <Reveal delay={0.14} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 md:col-span-6 md:justify-end">
            <Button href={primary.href} variant="inverse" size="lg" arrow event="cta_click" eventParams={{ cta: "final_primary" }}>
              {primary.label}
            </Button>
            {secondary && (
              <Link
                href={secondary.href}
                className="group inline-flex items-center gap-1.5 text-[1rem] font-medium text-paper-2 transition-colors duration-[160ms] hover:text-paper max-sm:self-center"
              >
                <span className="link-underline">Or {secondary.label.charAt(0).toLowerCase() + secondary.label.slice(1)}</span>
                <ArrowRight aria-hidden className="size-4 transition-transform duration-[200ms] ease-[var(--ease-out)] group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

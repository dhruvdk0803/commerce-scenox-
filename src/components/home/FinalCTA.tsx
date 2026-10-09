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
          <Reveal delay={0.14} className="flex flex-col gap-4 sm:flex-row sm:items-center md:col-span-6 md:justify-end">
            <Button href={primary.href} variant="inverse" size="lg" arrow event="cta_click" eventParams={{ cta: "final_primary" }}>
              {primary.label}
            </Button>
            {secondary && (
              <Button
                href={secondary.href}
                variant="outline"
                size="lg"
                className="border-line-dark-strong text-paper hover:border-paper hover:bg-white/5"
                event="cta_click"
                eventParams={{ cta: "final_secondary" }}
              >
                {secondary.label}
              </Button>
            )}
          </Reveal>
        </div>
        <p className="mono-label mt-12 text-paper-2/80">{site.platforms.join(" • ")}</p>
      </div>
    </section>
  );
}

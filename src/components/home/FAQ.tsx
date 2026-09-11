import { faqs as defaultFaqs, type FAQ as FAQItem } from "@/content/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";

export function FAQ({
  items = defaultFaqs,
  heading = "Questions we get asked.",
  eyebrow = "FAQ",
}: {
  items?: FAQItem[];
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <section className="section-y border-t border-line" aria-labelledby="faq-heading">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="faq-heading" className="mt-5 max-w-[14ch] text-h2 text-ink">
            {heading}
          </h2>
          <p className="mt-6 max-w-[32ch] text-[0.95rem] leading-relaxed text-ink-2">
            Something not covered here? Tell us about your catalog and we&apos;ll
            answer directly.
          </p>
          <div className="mt-5">
            <TextLink href="/contact">Contact us</TextLink>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-8">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}

import { advantages } from "@/content/products";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/** Why the full AI-run stack beats a row of point solutions. Dark section. */
export function Advantages() {
  return (
    <section className="section-y bg-bg-dark text-paper" aria-labelledby="adv-heading">
      <div className="container-x">
        <SectionHeader
          inverse
          id="adv-heading"
          eyebrow="WHY SCENOX"
          title={
            <>
              Faster because it&apos;s AI.
              <br />
              <span className="text-paper-2">Right because people check it.</span>
            </>
          }
          description="Agencies bill hours. Apps leave the work to you. We run an AI engine with a review team on top, so you get finished work in days at a fraction of a manual team's cost."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-line-dark bg-line-dark md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal
              as="li"
              key={a.n}
              delay={(i % 3) * 0.05}
              className="bg-bg-dark p-6 md:p-7"
            >
              <p className="mono-micro text-paper-2 tabular">{a.n}</p>
              <h3 className="mt-3 text-[1.15rem] font-semibold tracking-[-0.02em] text-paper">{a.title}</h3>
              <p className="mt-2 max-w-[40ch] text-[0.95rem] leading-[1.55] text-paper-2">{a.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

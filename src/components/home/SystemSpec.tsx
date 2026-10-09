import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, Reveal, Stagger } from "@/components/ui/Reveal";

type Mode = "AUTOMATED" | "AI + REVIEW" | "HUMAN";

const LAYERS: { n: string; name: string; does: string; mode: Mode }[] = [
  { n: "01", name: "Ingestion", does: "Parsers for XLSX, CSV, XML, PDF and image folders. Multiple sources keyed into one dataset by SKU.", mode: "AUTOMATED" },
  { n: "02", name: "Normalization engine", does: "Rules plus learned models standardize units, colours, sizes and naming, and detect duplicate SKUs.", mode: "AI + REVIEW" },
  { n: "03", name: "Category mapping", does: "Classification models map supplier categories onto your taxonomy. Low-confidence rows are flagged, never guessed.", mode: "AI + REVIEW" },
  { n: "04", name: "Enrichment", does: "Language models draft descriptions, SEO fields and typed specifications from the source data. Every draft is reviewed.", mode: "AI + REVIEW" },
  { n: "05", name: "Image matching", does: "Files matched to products by SKU and name, de-duplicated, renamed and resized to platform limits.", mode: "AUTOMATED" },
  { n: "06", name: "Validation", does: "Every product checked against platform rules: required fields, option limits, prices, inventory, image formats.", mode: "AUTOMATED" },
  { n: "07", name: "Approval", does: "You review a representative sample and the category tree before anything goes live.", mode: "HUMAN" },
  { n: "08", name: "Publishing & QA", does: "Batch publish through import or scoped access, then storefront checks by a person.", mode: "AUTOMATED" },
];

const FACTS = [
  ["FORMATS", "XLSX · CSV · XML · PDF · JPG · PNG · ZIP"],
  ["REVIEW", "Every model output checked before publish"],
  ["CONFIDENCE", "Uncertain rows flagged, not silently dropped"],
  ["YOUR DATA", "Used only for your project. Never for training."],
];

function ModeTag({ mode }: { mode: Mode }) {
  return (
    <span
      className={cn(
        "mono-micro inline-flex h-6 items-center rounded-[4px] border px-2 whitespace-nowrap",
        mode === "AUTOMATED" && "border-line bg-bg-muted text-ink-2",
        mode === "AI + REVIEW" && "border-line-strong bg-bg text-ink",
        mode === "HUMAN" && "border-success/30 bg-success-soft text-success",
      )}
    >
      {mode}
    </span>
  );
}

export function SystemSpec({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section-y border-t border-line bg-bg-muted/40" aria-labelledby="system-heading">
      <div className="container-x">
        <SectionHeader
          id="system-heading"
          eyebrow="THE SYSTEM"
          title={
            <>
              An AI-powered catalog engine.
              <br />
              <span className="text-ink-2">With people where it counts.</span>
            </>
          }
          description="Scenox Commerce runs on a purpose-built pipeline: parsers, a normalization engine, classification and language models, and a validation layer, operated by a team that reviews every flagged row. That is how a thousand products become store-ready in days, not weeks."
        />

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-12 lg:gap-6">
          {/* layers ledger */}
          <Stagger as="ol" className="overflow-hidden rounded-[12px] border border-line bg-bg-elevated lg:col-span-8" amount={0.1}>
            <li className="grid h-11 grid-cols-[3rem_1fr] items-center border-b border-line px-4 sm:grid-cols-[3rem_11rem_1fr_auto] md:px-5">
              <span className="mono-micro text-ink-3">#</span>
              <span className="mono-label text-ink-2">LAYER</span>
              <span className="mono-label hidden text-ink-2 sm:block">WHAT IT DOES</span>
              <span className="mono-label hidden text-ink-2 sm:block">MODE</span>
            </li>
            {LAYERS.slice(0, compact ? 6 : LAYERS.length).map((l) => (
              <MotionItem
                key={l.n}
                className="grid grid-cols-[3rem_1fr] items-start gap-x-3 border-b border-line px-4 py-3.5 last:border-b-0 sm:grid-cols-[3rem_11rem_1fr_auto] md:px-5"
              >
                <span className="mono-micro tabular pt-1 text-ink-3">{l.n}</span>
                <span className="text-[0.95rem] font-medium leading-snug text-ink">
                  {l.name}
                  <span className="mt-1 block text-[0.85rem] font-normal leading-snug text-ink-2 sm:hidden">{l.does}</span>
                  <span className="mt-2 block sm:hidden">
                    <ModeTag mode={l.mode} />
                  </span>
                </span>
                <span className="hidden pr-4 text-[0.875rem] leading-snug text-ink-2 sm:block">{l.does}</span>
                <span className="hidden sm:block">
                  <ModeTag mode={l.mode} />
                </span>
              </MotionItem>
            ))}
          </Stagger>

          {/* facts */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <dl className="overflow-hidden rounded-[12px] border border-line bg-bg-elevated">
              <div className="flex h-11 items-center border-b border-line px-4">
                <span className="mono-label text-ink-2">HOW WE USE MODELS</span>
              </div>
              {FACTS.map(([k, v]) => (
                <div key={k} className="border-b border-line px-4 py-3.5 last:border-b-0">
                  <dt className="mono-micro text-ink-3">{k}</dt>
                  <dd className="mt-1.5 text-[0.9rem] leading-snug text-ink">{v}</dd>
                </div>
              ))}
              <p className="border-t border-line px-4 py-4 text-[0.85rem] leading-relaxed text-ink-2">
                Models do the repetitive work at scale. People make the judgement calls, approve the output and check the
                live store. You get the speed of software with the accountability of a team.
              </p>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

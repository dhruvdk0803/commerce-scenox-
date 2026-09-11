import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionItem, Stagger, staggerChild } from "@/components/ui/Reveal";

const PLATFORMS = [
  {
    name: "Shopify",
    note: "Products, variants, collections, metafields and SEO fields mapped to Shopify's product model. Published via import or staff access.",
    map: [
      ["title", "product.title"],
      ["category path", "collections[]"],
      ["color / size", "options[] · variants[]"],
      ["specifications", "metafields.specs.*"],
      ["seo title", "seo.title"],
    ],
    tag: "IMPORT · STAFF ACCESS",
  },
  {
    name: "WooCommerce",
    note: "Simple and variable products, attributes, categories and tags formatted for WooCommerce, including variation pricing and stock.",
    map: [
      ["title", "post_title"],
      ["category path", "product_cat (hierarchical)"],
      ["color / size", "pa_color · pa_size"],
      ["specifications", "meta_data[]"],
      ["seo title", "yoast / rankmath fields"],
    ],
    tag: "CSV · REST API",
  },
  {
    name: "Custom",
    note: "Structured JSON or CSV in the exact schema your platform expects, or a handoff to your developers. Compatibility reviewed before project approval.",
    map: [
      ["title", "name"],
      ["category path", "category_ids[]"],
      ["color / size", "variants[].attributes"],
      ["specifications", "attributes{}"],
      ["seo title", "meta.title"],
    ],
    tag: "REVIEWED PER PROJECT",
  },
];

export function PlatformModules() {
  return (
    <section className="section-y border-t border-line bg-bg-muted/40" aria-labelledby="platform-heading">
      <div className="container-x">
        <SectionHeader
          id="platform-heading"
          eyebrow="PLATFORMS"
          title={
            <>
              Your catalog.
              <br />
              Your platform.
            </>
          }
          description="The same structured catalog maps into whichever platform you run. We don't advertise integrations we haven't reviewed."
        />

        <Stagger as="ul" className="mt-12 grid gap-4 lg:grid-cols-3 md:mt-16" amount={0.15}>
          {PLATFORMS.map((p) => (
            <MotionItem
              key={p.name}
              variants={staggerChild}
              className="flex flex-col rounded-[12px] border border-line bg-bg"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{p.name}</h3>
                <span className="mono-micro text-ink-3">{p.tag}</span>
              </div>
              <ul className="flex-1 divide-y divide-line">
                {p.map.map(([from, to]) => (
                  <li key={from} className="grid grid-cols-[1fr_auto_1.3fr] items-center gap-2 px-5 py-2.5 font-mono text-[0.75rem]">
                    <span className="truncate text-ink-2">{from}</span>
                    <ArrowRight className="size-3 text-accent" strokeWidth={2} aria-hidden />
                    <span className="truncate text-ink">{to}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-line px-5 py-4 text-[0.875rem] leading-snug text-ink-2">{p.note}</p>
            </MotionItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

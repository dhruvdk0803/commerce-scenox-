import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionLi, Stagger, staggerChild } from "@/components/ui/Reveal";

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
    name: "Magento",
    note: "Simple and configurable products, attribute sets, categories and SEO fields for Magento 2 and Adobe Commerce, including multi-store views.",
    map: [
      ["title", "name"],
      ["category path", "category_ids[]"],
      ["color / size", "configurable · super_attributes"],
      ["specifications", "attribute_set · custom attributes"],
      ["seo title", "meta_title"],
    ],
    tag: "IMPORT · REST API",
  },
  {
    name: "BigCommerce",
    note: "Products, variants, option sets, categories and custom fields formatted for BigCommerce, with price lists for B2B catalogs.",
    map: [
      ["title", "name"],
      ["category path", "categories[]"],
      ["color / size", "variants[].option_values"],
      ["specifications", "custom_fields[]"],
      ["seo title", "page_title"],
    ],
    tag: "CSV · API",
  },
  {
    name: "Custom & others",
    note: "Wix, Squarespace, PrestaShop, OpenCart or a custom build: structured JSON or CSV in the exact schema the platform expects, or a handoff to your developers. Reviewed before project approval.",
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

        <Stagger as="ul" className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 xl:grid-cols-3" amount={0.15}>
          {PLATFORMS.map((p) => (
            <MotionLi
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
                    <span className="min-w-0 break-words text-ink-2">{from}</span>
                    <ArrowRight className="size-3 text-accent" strokeWidth={2} aria-hidden />
                    <span className="min-w-0 break-words text-ink">{to}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-line px-5 py-4 text-[0.875rem] leading-snug text-ink-2">{p.note}</p>
            </MotionLi>
          ))}
          <MotionLi variants={staggerChild} className="flex flex-col justify-between gap-6 rounded-[12px] border border-dashed border-line-strong p-5 md:col-span-2 xl:col-span-1">
            <div>
              <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">Platform not listed?</h3>
              <p className="mt-2 text-[0.95rem] leading-snug text-ink-2">
                Tell us what you run. If it can import a file or take an API call, we can usually map your catalog to it,
                and we confirm before you pay.
              </p>
            </div>
            <Link href="/contact" className="group inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-ink">
              <span className="link-underline">Ask about your platform</span>
              <ArrowRight aria-hidden className="size-4 transition-transform duration-[200ms] group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </MotionLi>
        </Stagger>
      </div>
    </section>
  );
}

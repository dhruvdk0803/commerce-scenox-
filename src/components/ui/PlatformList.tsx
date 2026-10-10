import { site } from "@/lib/site";

/** "Shopify • WooCommerce • …" that only ever wraps between whole names. */
export function PlatformList({ items = site.platforms }: { items?: readonly string[] }) {
  return (
    <>
      {items.map((p, i) => (
        <span key={p} className="inline-block whitespace-nowrap">
          {p}
          {i < items.length - 1 && <>&nbsp;•&ensp;</>}
        </span>
      ))}
    </>
  );
}

import { ProductTemplate, productMeta } from "@/components/pages/ProductTemplate";

export const metadata = productMeta("feeds");

export default function Page() {
  return <ProductTemplate id="feeds" />;
}

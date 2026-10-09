import { ProductTemplate, productMeta } from "@/components/pages/ProductTemplate";

export const metadata = productMeta("imagery");

export default function Page() {
  return <ProductTemplate id="imagery" />;
}

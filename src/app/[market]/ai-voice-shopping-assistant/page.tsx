import { ProductTemplate, productMeta } from "@/components/pages/ProductTemplate";

export const metadata = productMeta("voice");

export default function Page() {
  return <ProductTemplate id="voice" />;
}

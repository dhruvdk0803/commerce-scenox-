import { ProductTemplate, productMeta } from "@/components/pages/ProductTemplate";

export const metadata = productMeta("support");

export default function Page() {
  return <ProductTemplate id="support" />;
}

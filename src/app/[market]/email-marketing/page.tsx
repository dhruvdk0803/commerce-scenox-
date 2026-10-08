import { ProductTemplate, productMeta } from "@/components/pages/ProductTemplate";

export const metadata = productMeta("email");

export default function Page() {
  return <ProductTemplate id="email" />;
}

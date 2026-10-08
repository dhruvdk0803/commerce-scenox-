import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { PlatformStrip, Statement } from "@/components/home/PlatformStrip";
import { MessySpreadsheet } from "@/components/home/MessySpreadsheet";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { SpeedComparison } from "@/components/home/SpeedComparison";
import { SystemSpec } from "@/components/home/SystemSpec";
import { AudienceCards } from "@/components/home/AudienceCards";
import { PlatformModules } from "@/components/home/PlatformModules";
import { SampleOffer } from "@/components/home/SampleOffer";
import { ProofModule } from "@/components/home/ProofModule";
import { PricingCards } from "@/components/home/PricingCards";
import { OngoingOps } from "@/components/home/OngoingOps";
import { Advantages } from "@/components/home/Advantages";
import { ProductMenu } from "@/components/pricing/ProductMenu";
import { PlanCards } from "@/components/pricing/PlanCards";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { WholesaleFlow } from "@/components/pages/WholesaleFlow";
import { MigrationFlow } from "@/components/pages/MigrationFlow";
import { CleanupDiff } from "@/components/pages/CleanupDiff";
import { ProcessExplorer } from "@/components/pages/ProcessExplorer";

/**
 * Development-only harness: renders a single homepage section at the top of
 * the viewport for visual QA. 404s in production.
 */
const MAP: Record<string, ComponentType> = {
  hero: Hero,
  strip: PlatformStrip,
  statement: Statement,
  spreadsheet: MessySpreadsheet,
  beforeafter: BeforeAfter,
  services: ServiceGrid,
  process: ProcessSteps,
  speed: SpeedComparison,
  system: SystemSpec,
  audience: AudienceCards,
  platforms: PlatformModules,
  sample: SampleOffer,
  proof: ProofModule,
  pricing: PricingCards,
  ops: OngoingOps,
  menu: ProductMenu,
  advantages: Advantages,
  plans: PlanCards,
  faq: FAQ,
  final: FinalCTA,
  header: Header,
  footer: Footer,
  wholesaleflow: () => <div className="container-x py-12"><WholesaleFlow /></div>,
  migrationflow: () => <div className="container-x py-12"><MigrationFlow /></div>,
  cleanupdiff: () => <div className="container-x py-12"><CleanupDiff /></div>,
  explorer: () => <div className="container-x py-12"><ProcessExplorer /></div>,
};

export const dynamicParams = true;

export default async function DevSection({ params }: { params: Promise<{ section: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { section } = await params;
  const Comp = MAP[section];
  if (!Comp) notFound();
  return (
    <main className="min-h-screen">
      <Comp />
    </main>
  );
}

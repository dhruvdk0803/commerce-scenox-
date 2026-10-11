import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The full service range as a bento. Each tile shows what the service
 * produces instead of describing it. No prices here: the estimator and
 * /pricing carry those.
 */
function Tile({
  href,
  eyebrow,
  title,
  desc,
  children,
  className,
  tone = "light",
  compactOnMobile = true,
}: {
  href: string;
  eyebrow: string;
  title: string;
  desc?: string;
  children?: ReactNode;
  className?: string;
  tone?: "light" | "tint" | "accent" | "dark";
  /** hide the mini visual on phones so small tiles stay short */
  compactOnMobile?: boolean;
}) {
  const dark = tone === "accent" || tone === "dark";
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col md:min-h-[15rem] overflow-hidden rounded-[18px] border p-5 transition-[transform,border-color] duration-[240ms] ease-[var(--ease-out)] hover:-translate-y-0.5 md:p-6",
        tone === "light" && "border-line bg-bg-elevated hover:border-line-strong",
        tone === "tint" && "border-transparent bg-bg-tint",
        tone === "accent" && "border-transparent bg-accent text-white",
        tone === "dark" && "border-transparent bg-bg-dark text-paper",
        className,
      )}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className={cn("mono-micro", dark ? "text-white" : "text-ink-3")}>{eyebrow}</p>
          <h3 className={cn("mt-2 text-[1.3rem] font-semibold leading-tight tracking-[-0.025em]", dark ? "text-white" : "text-ink")}>
            {title}
          </h3>
          {desc && <p className={cn("mt-1.5 max-w-[34ch] text-[0.925rem] leading-snug", dark ? "text-white" : "text-ink-2")}>{desc}</p>}
        </div>
        <span
          aria-hidden
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color] duration-[240ms] ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            dark ? "border-white/25 text-white" : "border-line bg-bg text-ink group-hover:bg-ink group-hover:text-paper",
          )}
        >
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      </div>
      {children && (
        <div className={cn("relative mt-5 flex flex-1 flex-col justify-end", compactOnMobile && "max-md:hidden")}>{children}</div>
      )}
    </Link>
  );
}

const MOSAIC = [img.chair, img.sneaker, img.serum, img.clock] as const;

export function ServiceBento() {
  return (
    <section id="services" className="section-y border-t border-line" aria-labelledby="bento-heading">
      <div className="container-x">
        <SectionHeader
          id="bento-heading"
          eyebrow="ONE TEAM, THE WHOLE STORE"
          title={
            <>
              From first upload
              <span className="block text-ink-2">to repeat order.</span>
            </>
          }
          description="One clean catalog feeds everything else: photos, ads, marketplaces, email, WhatsApp and AI that sells."
        />

        <Reveal delay={0.06} className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-3 md:auto-rows-[minmax(15rem,auto)] md:mt-16 md:grid-flow-row-dense md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {/* catalog: the headline service */}
          <Tile
            href="/bulk-product-upload"
            eyebrow="CATALOG LISTING"
            title="1000+ products, live in 48 hours.*"
            desc="Upload, cleanup and migration. Spreadsheets in, complete product pages out."
            tone="tint"
            compactOnMobile={false}
            className="md:col-span-2 lg:row-span-2"
          >
            <div className="grid grid-cols-4 gap-2">
              {MOSAIC.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-[10px] bg-bg-elevated">
                  <Image src={src} alt="" sizes="(min-width: 1024px) 120px, 22vw" className="size-full object-cover mix-blend-multiply" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-[10px] bg-bg-elevated px-3.5 py-2.5">
              <span className="font-mono text-[0.8rem] text-ink tabular">
                1,000 <span className="text-ink-3">/ 1,000</span>
              </span>
              <span className="mono-micro flex items-center gap-1.5 text-success">
                <span className="size-1.5 rounded-full bg-success" />
                PUBLISHED
              </span>
            </div>
          </Tile>

          {/* imagery: the photo is the pitch */}
          <Link
            href="/ai-product-photos"
            className="group relative min-h-[22rem] overflow-hidden rounded-[18px] lg:row-span-2"
          >
            <Image
              src={img.chairLife}
              alt="Office chair placed in a bright home office, generated from a single product photo"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 size-full object-cover transition-transform duration-[700ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-[12px] bg-bg-elevated/95 p-4 backdrop-blur-sm">
              <p className="mono-micro text-ink-3">AI PRODUCT IMAGERY</p>
              <p className="mt-1.5 text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] text-ink">One phone photo. Every shot you need.</p>
            </div>
            <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-bg-elevated text-ink">
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
            </span>
          </Link>

          {/* voice & chat: the new thing, so it gets the colour */}
          <Tile href="/ai-voice-shopping-assistant" eyebrow="NEW · VOICE & CHAT" title="AI that sells in chat and on calls." tone="accent" compactOnMobile={false}>
            <div className="flex items-center gap-3 rounded-[12px] bg-white/12 p-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-accent">
                <Phone className="size-4" strokeWidth={2} aria-hidden />
              </span>
              <span aria-hidden className="flex h-8 flex-1 items-center gap-[3px]">
                {[8, 16, 24, 12, 28, 18, 10, 22, 14, 26, 12, 20, 9, 18].map((h, i) => (
                  <span key={i} className="wave-bar w-[3px] rounded-full bg-white/85" style={{ height: h, animationDelay: `${(i % 7) * 100}ms` }} />
                ))}
              </span>
            </div>
            <p className="mono-micro mt-2.5 flex items-center gap-1.5 text-white">
              <Check className="size-3" strokeWidth={3} aria-hidden /> COD ORDER CONFIRMED · 0:48
            </p>
          </Tile>

          <Tile href="/whatsapp-automation" eyebrow="WHATSAPP" title="Carts and COD, recovered.">
            <div className="flex flex-col gap-1.5">
              <p className="max-w-[90%] self-start rounded-[10px] rounded-bl-[3px] bg-[#e7f6ec] px-3 py-2 text-[0.825rem] leading-snug text-ink">
                Confirm your cash-on-delivery order?
              </p>
              <p className="flex items-center gap-1 self-end rounded-[10px] rounded-br-[3px] bg-ink px-3 py-2 text-[0.825rem] text-paper">
                <MessageCircle className="size-3.5" strokeWidth={2} aria-hidden /> Yes, confirm
              </p>
            </div>
          </Tile>

          <Tile href="/product-feed-management" eyebrow="FEEDS & MARKETPLACES" title="One catalog. Every channel." className="md:col-span-2" tone="dark">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["Google Shopping", "Meta", "Amazon", "Flipkart"].map((c) => (
                <li key={c} className="flex items-center justify-between gap-2 rounded-[10px] border border-white/12 px-3 py-2.5">
                  <span className="truncate text-[0.85rem] text-paper">{c}</span>
                  <span className="size-1.5 shrink-0 rounded-full bg-[#5fd39b]" aria-label="synced" />
                </li>
              ))}
            </ul>
          </Tile>

          <Tile href="/ecommerce-email-marketing" eyebrow="EMAIL & CARTS" title="Most carts can be brought back.">
            <div className="flex items-center gap-3 rounded-[12px] border border-line bg-bg p-2.5">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-[8px] bg-bg-muted">
                <Image src={img.sneaker} alt="" sizes="48px" className="size-full object-cover mix-blend-multiply" />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[0.8rem] font-medium text-ink">
                  <Mail className="size-3.5" strokeWidth={2} aria-hidden /> You left this behind
                </p>
                <p className="mono-micro mt-0.5 text-ink-3">SENT 1H AFTER EXIT</p>
              </div>
            </div>
          </Tile>

          <Tile href="/ai-customer-support" eyebrow="AI SUPPORT" title="The same ten questions, answered 24/7.">
            <p className="rounded-[10px] border border-line bg-bg px-3 py-2 text-[0.825rem] leading-snug text-ink-2">
              “Where is my order?” <span className="text-ink">Out for delivery today.</span>
            </p>
          </Tile>

        </Reveal>
        <p className="mt-5 text-[0.8rem] text-ink-3">*{site.qualifier}</p>
      </div>
    </section>
  );
}

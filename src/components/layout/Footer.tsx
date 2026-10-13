import Link from "next/link";
import { PlatformList } from "@/components/ui/PlatformList";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { MarketSwitcher } from "@/components/market/MarketSwitcher";
import { CookieSettingsLink } from "@/components/consent/CookieSettingsLink";

function Col({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; href: string; external?: boolean }>;
}) {
  return (
    <div>
      <p className="mono-label text-ink-3">{title}</p>
      <ul className="mt-3 flex flex-col">
        {items.map((it) => (
          <li key={it.href}>
            {it.external ? (
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1 text-[0.95rem] text-ink-2 transition-colors duration-[160ms] hover:text-ink"
              >
                <span className="link-underline">{it.label}</span>
                <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
              </a>
            ) : (
              <Link
                href={it.href}
                className="inline-flex min-h-10 items-center text-[0.95rem] text-ink-2 transition-colors duration-[160ms] hover:text-ink"
              >
                <span className="link-underline">{it.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer data-hide-sticky className="border-t border-line bg-bg">
      <div className="container-x pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark byline />
            <p className="mt-6 max-w-[28ch] text-[1.35rem] font-medium leading-[1.2] tracking-[-0.025em] text-ink">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-relaxed text-ink-2">
              Catalog, channels, email and WhatsApp for Shopify, WooCommerce,
              Magento, BigCommerce and custom stores. AI does the volume. People check every output.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block font-mono text-[0.85rem] text-ink-2 hover:text-ink"
            >
              <span className="link-underline">{site.email}</span>
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
            <Col title="Services" items={nav.footer.services} />
            <Col title="Company" items={nav.footer.company} />
            <Col title="Legal" items={nav.footer.legal} />
          </div>
        </div>

        <MarketSwitcher className="mt-14" />

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 text-[0.85rem] text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            Scenox Commerce is part of{" "}
            <a
              href={site.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 hover:text-ink"
            >
              <span className="link-underline">Scenox Studios</span>
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <CookieSettingsLink className="inline-flex min-h-10 items-center text-[0.85rem] text-ink-2 hover:text-ink" />
            <span className="mono-micro">
              <PlatformList />
            </span>
            <span className="mono-micro tabular">
              © {new Date().getFullYear()} Scenox Studios
            </span>
            {/* required credit for the IP-to-country data used to pick each visitor's currency */}
            <a href="https://db-ip.com" target="_blank" rel="noopener" className="mono-micro text-ink-3 hover:text-ink">
              IP Geolocation by DB-IP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

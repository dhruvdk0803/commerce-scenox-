import { NextResponse, type NextRequest } from "next/server";
import { MARKET_COOKIE, isMarket, marketForCountry } from "@/lib/markets";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Serves each visitor one pricing market without changing the URL.
 *
 * - `/uk/pricing` (switcher links): save the choice, redirect to `/pricing`.
 * - `/pricing`: rewrite to `/{market}/pricing`, where market comes from the
 *   saved cookie, else the visitor's IP country (Vercel header).
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [, first, ...rest] = pathname.split("/");

  if (isMarket(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${rest.join("/")}`;
    url.search = search;
    const res = NextResponse.redirect(url, 307);
    res.cookies.set(MARKET_COOKIE, first, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    return res;
  }

  const saved = request.cookies.get(MARKET_COOKIE)?.value;
  const market = isMarket(saved)
    ? saved
    : marketForCountry(request.headers.get("x-vercel-ip-country"));

  const url = request.nextUrl.clone();
  url.pathname = `/${market}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Everything except API routes, Next internals, metadata files and static assets.
    "/((?!api|_next|robots\\.txt|sitemap\\.xml|icon\\.svg|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};

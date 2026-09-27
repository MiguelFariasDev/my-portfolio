import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, localeCookieName, locales } from "@/lib/routes";

/** Lê o Accept-Language e devolve o idioma suportado mais próximo. */
function localeFromHeader(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return null;

  for (const entry of header.split(",")) {
    const tag = entry.split(";")[0]?.trim().toLowerCase();
    if (!tag) continue;

    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return;

  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  const locale =
    (cookieLocale && isLocale(cookieLocale) ? cookieLocale : null) ??
    localeFromHeader(request) ??
    defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

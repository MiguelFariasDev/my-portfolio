// Rotas e locales — importável tanto no servidor quanto no cliente.
// ATENÇÃO: os slugs em PT abaixo precisam ter um rewrite correspondente em next.config.ts.

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

/** Código BCP-47 usado no atributo lang do <html> e nas meta tags. */
export const localeHtmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const routeKeys = [
  "home",
  "about",
  "projects",
  "resume",
  "contact",
] as const;

export type RouteKey = (typeof routeKeys)[number];

/**
 * Slug público de cada rota por idioma. A pasta física em src/app/[lang]/
 * usa sempre o slug em inglês; os slugs em português chegam lá via rewrite.
 */
export const routeSlugs: Record<RouteKey, Record<Locale, string>> = {
  home: { pt: "", en: "" },
  about: { pt: "sobre", en: "about" },
  projects: { pt: "projetos", en: "projects" },
  resume: { pt: "curriculo", en: "resume" },
  contact: { pt: "contato", en: "contact" },
};

/** Caminho público de uma rota num idioma. Ex.: pathFor("pt", "about") -> "/pt/sobre" */
export function pathFor(locale: Locale, key: RouteKey): string {
  const slug = routeSlugs[key][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

/** Descobre a rota a partir de um pathname, aceitando o slug de qualquer idioma. */
export function routeKeyFromPathname(pathname: string): RouteKey {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[1] ?? "";

  if (!slug) return "home";

  const match = routeKeys.find((key) =>
    locales.some((locale) => routeSlugs[key][locale] === slug),
  );

  return match ?? "home";
}

/** Equivalente do pathname atual no outro idioma. */
export function pathInLocale(pathname: string, locale: Locale): string {
  return pathFor(locale, routeKeyFromPathname(pathname));
}

export const localeCookieName = "NEXT_LOCALE";
export const localeStorageKey = "portfolio.locale";

/**
 * Tipo de transição de uma navegação.
 *
 * A home é a raiz: sair dela é descer um nível (`nav-forward`) e voltar para
 * ela é subir (`nav-back`). Entre seções irmãs não há profundidade a
 * comunicar, então a navegação fica sem tipo e cai no cross-fade padrão.
 */
export function navTransitionTypes(
  from: RouteKey,
  to: RouteKey,
): string[] | undefined {
  if (from === to) return undefined;
  if (from === "home") return ["nav-forward"];
  if (to === "home") return ["nav-back"];
  return undefined;
}

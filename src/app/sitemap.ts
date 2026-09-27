import type { MetadataRoute } from "next";

import { localeHtmlLang, locales, pathFor, routeKeys } from "@/lib/routes";
import { site } from "@/lib/site";

const absolute = (path: string) => new URL(path, site.url).toString();

/** Uma entrada por rota por idioma, sempre com o slug público correto. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routeKeys.flatMap((route) =>
    locales.map((locale) => ({
      url: absolute(pathFor(locale, route)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "home" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((option) => [
            localeHtmlLang[option],
            absolute(pathFor(option, route)),
          ]),
        ),
      },
    })),
  );
}

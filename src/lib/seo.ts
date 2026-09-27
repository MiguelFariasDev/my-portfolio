import type { Metadata } from "next";

import {
  defaultLocale,
  localeHtmlLang,
  locales,
  pathFor,
  type Locale,
  type RouteKey,
} from "@/lib/routes";
import { site } from "@/lib/site";

/**
 * Metadata de uma página, montada num só lugar.
 *
 * O motivo de existir: `alternates` e `openGraph` definidos no layout são
 * HERDADOS pelas páginas filhas quando elas não os declaram. Como o layout só
 * conhece a home, cada página interna acabava anunciando `canonical` e
 * `og:url` apontando para a home — ou seja, se declarando duplicata dela.
 * Passando toda página por aqui, o canonical é sempre o da própria rota.
 *
 * `title` sai como string simples para o `title.template` do layout aplicar
 * ("Sobre" -> "Sobre | Miguel Farias"). O template não alcança `og:title`,
 * então esse é composto à mão.
 */
export function buildMetadata({
  locale,
  route,
  title,
  description,
}: {
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
}): Metadata {
  const path = pathFor(locale, route);
  const socialTitle = route === "home" ? title : `${title} | ${site.name}`;

  /**
   * A imagem vem de src/app/[lang]/opengraph-image.tsx. O Next só a injeta
   * automaticamente no segmento onde o arquivo está — e como toda página aqui
   * declara o próprio `openGraph`, esse objeto substitui o herdado e levaria a
   * imagem com ele. Por isso a referência é explícita.
   */
  const image = {
    url: `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: site.name,
  };

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          locales.map((option) => [
            localeHtmlLang[option],
            pathFor(option, route),
          ]),
        ),
        "x-default": pathFor(defaultLocale, route),
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      // og:locale usa underscore (pt_BR), diferente do atributo lang (pt-BR).
      locale: localeHtmlLang[locale].replace("-", "_"),
      url: path,
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

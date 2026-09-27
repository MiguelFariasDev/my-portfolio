import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, type NavItem } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import {
  isLocale,
  localeHtmlLang,
  locales,
  pathFor,
  routeKeys,
} from "@/lib/routes";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { pages } = getDictionary(lang);

  return {
    ...buildMetadata({
      locale: lang,
      route: "home",
      title: pages.home.metaTitle,
      description: pages.home.metaDescription,
    }),
    metadataBase: new URL(site.url),
    // Só o layout declara o template; as páginas mandam o título cru.
    title: {
      default: pages.home.metaTitle,
      template: `%s | ${site.name}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { common } = getDictionary(lang);

  const navItems: NavItem[] = routeKeys.map((key) => ({
    key,
    href: pathFor(lang, key),
    label: common.nav[key],
  }));

  return (
    <html
      lang={localeHtmlLang[lang]}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader
            locale={lang}
            items={navItems}
            labels={{
              brand: site.name,
              openMenu: common.actions.openMenu,
              language: common.language.label,
              theme: common.theme,
            }}
          />
          <main className="flex-1">{children}</main>
          <SiteFooter
            name={site.name}
            builtWith={common.footer.builtWith}
            rights={common.footer.rights}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

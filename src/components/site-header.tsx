"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, ViewTransition } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { SectionNav } from "@/components/layout/section-nav";
import { useActiveSection } from "@/hooks/use-active-section";
import { sectionIds } from "@/lib/sections";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  navTransitionTypes,
  pathFor,
  routeKeyFromPathname,
  type Locale,
  type RouteKey,
} from "@/lib/routes";

export type NavItem = {
  key: RouteKey;
  href: string;
  label: string;
};

type HeaderLabels = {
  brand: string;
  openMenu: string;
  language: string;
  sectionNav: Record<string, string>;
  sectionNavLabel: string;
  theme: {
    label: string;
    light: string;
    dark: string;
    system: string;
  };
};

export function SiteHeader({
  locale,
  items,
  labels,
}: {
  locale: Locale;
  items: NavItem[];
  labels: HeaderLabels;
}) {
  const pathname = usePathname();
  const activeKey = routeKeyFromPathname(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * A home é uma experiência de página única: lá a navegação aponta para as
   * seções. Nas demais rotas ela continua apontando para as páginas, que
   * seguem existindo com canonical e entrada no sitemap.
   */
  const onHome = activeKey === "home";
  const activeSection = useActiveSection();

  return (
    <header className="site-chrome glass-chrome sticky top-0 z-50 w-full border-b">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-4 px-6">
        <Link
          href={pathFor(locale, "home")}
          transitionTypes={navTransitionTypes(activeKey, "home")}
          className="text-sm font-semibold"
        >
          {labels.brand}
        </Link>

        {onHome ? (
          <SectionNav
            labels={labels.sectionNav}
            ariaLabel={labels.sectionNavLabel}
          />
        ) : (
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {items.map((item) => {
            const active = item.key === activeKey;

            return (
              <Link
                key={item.key}
                href={item.href}
                transitionTypes={navTransitionTypes(activeKey, item.key)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.96]",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {/* A pílula desliza até o item ativo em vez de piscar de um
                    lugar para o outro — é sempre o mesmo indicador. */}
                {active ? (
                  <ViewTransition
                    name="nav-indicator"
                    share="nav-pill"
                    default="none"
                  >
                    <span
                      aria-hidden
                      className="bg-muted absolute inset-0 rounded-full"
                    />
                  </ViewTransition>
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        )}

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <LanguageSwitcher locale={locale} label={labels.language} />
          <ThemeToggle labels={labels.theme} />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label={labels.openMenu}
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>{labels.brand}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {onHome
                  ? sectionIds.map((id) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={() => setMenuOpen(false)}
                        aria-current={id === activeSection ? "true" : undefined}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]",
                          id === activeSection
                            ? "text-foreground bg-muted"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {labels.sectionNav[id]}
                      </a>
                    ))
                  : items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    transitionTypes={navTransitionTypes(activeKey, item.key)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={item.key === activeKey ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]",
                      item.key === activeKey
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                      {item.label}
                    </Link>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

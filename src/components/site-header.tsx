"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, ViewTransition } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
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

  return (
    <header className="site-chrome bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-4 px-6">
        <Link
          href={pathFor(locale, "home")}
          transitionTypes={navTransitionTypes(activeKey, "home")}
          className="text-sm font-semibold"
        >
          {labels.brand}
        </Link>

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
                  "relative rounded-full px-3 py-1.5 text-sm transition-colors active:translate-y-px",
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
                {items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    transitionTypes={navTransitionTypes(activeKey, item.key)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={item.key === activeKey ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm transition-colors active:translate-y-px",
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

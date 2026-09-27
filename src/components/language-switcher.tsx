"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition, ViewTransition } from "react";

import { rememberLocale } from "@/lib/locale-preference";
import { cn } from "@/lib/utils";
import { locales, pathInLocale, type Locale } from "@/lib/routes";

/**
 * Troca o idioma navegando para o caminho equivalente, sem recarregar a página,
 * e guarda a escolha em localStorage (preferência do usuário) e cookie (usado
 * pelo proxy para redirecionar a raiz do site no próximo acesso).
 *
 * A navegação vai sem tipo de transição: trocar de idioma não é ir a outro
 * lugar, então o conteúdo faz cross-fade no mesmo lugar enquanto a pílula
 * desliza entre PT e EN.
 */
export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function selectLocale(next: Locale) {
    if (next === locale) return;

    rememberLocale(next);
    startTransition(() => {
      router.push(pathInLocale(pathname, next), {
        transitionTypes: ["locale-switch"],
      });
    });
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="bg-muted/60 flex items-center rounded-full p-0.5 text-xs font-medium"
    >
      {locales.map((option) => {
        const active = option === locale;

        return (
          <button
            key={option}
            type="button"
            onClick={() => selectLocale(option)}
            aria-pressed={active}
            className={cn(
              "focus-visible:ring-ring relative cursor-pointer rounded-full px-2.5 py-1 uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active ? (
              <ViewTransition
                name="lang-indicator"
                share="lang-pill"
                default="none"
              >
                <span
                  aria-hidden
                  className="bg-background absolute inset-0 rounded-full shadow-sm"
                />
              </ViewTransition>
            ) : null}
            <span className="relative">{option}</span>
          </button>
        );
      })}
    </div>
  );
}

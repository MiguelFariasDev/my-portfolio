"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { sectionIds } from "@/lib/sections";
import { cn } from "@/lib/utils";

export type SectionNavLabels = Record<string, string>;

/**
 * Navegação horizontal por seção (desktop).
 *
 * Âncoras de verdade (<a href="#id">), não handlers de clique: o scroll suave
 * vem do `scroll-behavior` no CSS, o teclado funciona de graça, o link pode
 * ser copiado e aberto direto na seção, e o histórico do navegador registra a
 * navegação. Um onClick com scrollIntoView jogaria tudo isso fora.
 */
export function SectionNav({
  labels,
  ariaLabel,
}: {
  labels: SectionNavLabels;
  ariaLabel: string;
}) {
  const active = useActiveSection();

  return (
    <nav
      aria-label={ariaLabel}
      className="hidden flex-1 items-center justify-center gap-1 md:flex"
    >
      {sectionIds.map((id) => {
        const isActive = id === active;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "relative rounded-full px-3 py-1.5 text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.96]",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive ? (
              <span
                aria-hidden
                className="bg-muted absolute inset-0 rounded-full"
              />
            ) : null}
            <span className="relative">{labels[id]}</span>
          </a>
        );
      })}
    </nav>
  );
}

"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { sectionIds } from "@/lib/sections";
import { cn } from "@/lib/utils";

/**
 * Indicador vertical de posição na página.
 *
 * Some abaixo de `lg` e em telas baixas: no celular ele disputaria espaço com
 * o conteúdo e com a área de toque do polegar, e a navbar já responde "onde
 * estou".
 */
export function SectionIndicator({
  labels,
  ariaLabel,
  goToTemplate,
}: {
  labels: Record<string, string>;
  ariaLabel: string;
  goToTemplate: string;
}) {
  const active = useActiveSection();

  return (
    <nav
      aria-label={ariaLabel}
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-center gap-4">
        {sectionIds.map((id) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                aria-label={goToTemplate.replace("{section}", labels[id])}
                className="group focus-visible:ring-ring flex size-6 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
              >
                <span
                  aria-hidden
                  className={cn(
                    "rounded-full transition-all duration-300 ease-out",
                    isActive
                      ? "bg-brand size-2.5"
                      : "bg-muted-foreground/40 group-hover:bg-muted-foreground size-1.5",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

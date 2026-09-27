import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Revela o conteúdo conforme ele entra na viewport.
 *
 * Sem JS e sem IntersectionObserver: a animação é conduzida pelo próprio
 * scroll (`animation-timeline: view()`, definido em globals.css), então o
 * movimento acompanha a rolagem em vez de disparar num cronômetro próprio —
 * que é a diferença entre "reage a mim" e "toca um vídeo quando eu chego".
 *
 * `index` escalona a entrada de itens irmãos por posição de scroll, não por
 * delay em segundos: rolando rápido, nenhum item fica devendo animação.
 *
 * `as` existe porque o elemento precisa ser válido no contexto do pai — dentro
 * de uma <ul> isto tem que ser um <li>, não uma <div>.
 *
 * Onde `animation-timeline` não existir, ou com `prefers-reduced-motion`, o
 * conteúdo simplesmente nasce visível.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Component
      className={cn("reveal", className)}
      style={
        index ? ({ "--reveal-index": index } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Component>
  );
}

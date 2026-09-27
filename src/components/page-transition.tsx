import { ViewTransition, type ReactNode } from "react";

import type { RouteKey } from "@/lib/routes";

/**
 * Transição de página.
 *
 * - `nav-forward` / `nav-back`: navegação hierárquica (home → seção e volta),
 *   com deslocamento horizontal que comunica profundidade.
 * - `locale-switch`: trocar PT/EN não leva a lugar nenhum, então o conteúdo
 *   apenas se dissolve no lugar. O Next troca o segmento `[lang]` sem
 *   desmontar a página, então enter/exit não disparam nessa navegação — quem
 *   anima é o par `share`, formado porque a rota (e portanto o `name`) é a
 *   mesma dos dois lados.
 * - sem tipo (navegação lateral entre seções irmãs): cross-fade com uma subida
 *   discreta — nada de deslize, porque não há profundidade para comunicar.
 *
 * O `name` carrega a rota justamente para que páginas diferentes nunca formem
 * par: entre rotas distintas valem enter/exit, dentro da mesma rota vale share.
 *
 * Precisa ficar na página, não no layout: layouts persistem entre navegações
 * e nunca disparam enter/exit.
 */
export function PageTransition({
  route,
  children,
}: {
  route: RouteKey;
  children: ReactNode;
}) {
  return (
    <ViewTransition
      name={`page-${route}`}
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        "locale-switch": "none",
        default: "fade-in",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        "locale-switch": "none",
        default: "fade-out",
      }}
      share={{ "locale-switch": "page-fade", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

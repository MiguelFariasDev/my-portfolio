"use client";

import { useEffect, useState } from "react";

import { sectionIds, type SectionId } from "@/lib/sections";

/**
 * Descobre qual seção ocupa a viewport.
 *
 * IntersectionObserver em vez de listener de scroll: o navegador calcula as
 * interseções fora da main thread e só nos avisa quando algo muda, então não
 * há medição a cada frame nem leitura de layout durante a rolagem.
 *
 * `rootMargin` encolhe a área de detecção para uma faixa no meio da tela —
 * assim a seção ativa é a que está de fato sendo lida, não a que encostou na
 * borda inferior.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // A entrada mais visível vence: com seções de tela cheia normalmente
        // só uma cruza a faixa, mas em telas baixas duas podem cruzar juntas.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

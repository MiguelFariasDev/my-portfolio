/**
 * As seções da experiência de página única da home.
 *
 * Os ids são estáveis e independentes de idioma porque viram âncoras de URL
 * (/pt#projects). Traduzir a âncora quebraria links compartilhados ao trocar
 * de idioma.
 */
export const sectionIds = [
  "home",
  "about",
  "projects",
  "research",
  "experience",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

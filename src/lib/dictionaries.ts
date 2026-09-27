import type { Locale } from "@/lib/routes";

import ptCommon from "@/content/pt/common.json";
import ptPages from "@/content/pt/pages.json";
import ptProjects from "@/content/pt/projects.json";
import ptSections from "@/content/pt/sections.json";
import enCommon from "@/content/en/common.json";
import enPages from "@/content/en/pages.json";
import enProjects from "@/content/en/projects.json";
import enSections from "@/content/en/sections.json";

export type Dictionary = {
  common: typeof ptCommon;
  pages: typeof ptPages;
  projects: typeof ptProjects;
  sections: typeof ptSections;
};

const dictionaries: Record<Locale, Dictionary> = {
  pt: { common: ptCommon, pages: ptPages, projects: ptProjects, sections: ptSections },
  en: { common: enCommon, pages: enPages, projects: enProjects, sections: enSections },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

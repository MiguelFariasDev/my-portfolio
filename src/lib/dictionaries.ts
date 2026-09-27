import type { Locale } from "@/lib/routes";

import ptCommon from "@/content/pt/common.json";
import ptPages from "@/content/pt/pages.json";
import ptProjects from "@/content/pt/projects.json";
import enCommon from "@/content/en/common.json";
import enPages from "@/content/en/pages.json";
import enProjects from "@/content/en/projects.json";

export type Dictionary = {
  common: typeof ptCommon;
  pages: typeof ptPages;
  projects: typeof ptProjects;
};

const dictionaries: Record<Locale, Dictionary> = {
  pt: { common: ptCommon, pages: ptPages, projects: ptProjects },
  en: { common: enCommon, pages: enPages, projects: enProjects },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

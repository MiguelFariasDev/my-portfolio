import { notFound } from "next/navigation";

import { SectionIndicator } from "@/components/layout/section-indicator";
import { PageTransition } from "@/components/page-transition";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Research } from "@/components/sections/research";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/routes";

/**
 * Home como experiência vertical de seis painéis.
 *
 * As páginas internas (/pt/sobre, /pt/projetos, ...) continuam existindo: elas
 * carregam canonical, hreflang e entrada no sitemap. Esta página é a narrativa;
 * elas são o aprofundamento indexável de cada assunto.
 *
 * Tudo aqui é Server Component. Só o que precisa saber a seção ativa
 * (indicador e navbar) roda no cliente.
 */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const { sectionNav, a11y } = dict.common;

  return (
    <PageTransition route="home">
      <div className="section-stack">
        <SectionIndicator
          labels={sectionNav}
          ariaLabel={a11y.progressLabel}
          goToTemplate={a11y.goToSection}
        />

        <Hero locale={lang} dict={dict} />
        <About dict={dict} />
        <Projects locale={lang} dict={dict} />
        <Research dict={dict} />
        <Experience dict={dict} />
        <Contact locale={lang} dict={dict} />
      </div>
    </PageTransition>
  );
}

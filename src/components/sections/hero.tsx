import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";
import { pathFor, type Locale } from "@/lib/routes";
import { resumeFiles, site } from "@/lib/site";

export function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { hero } = dict.sections;
  const home = dict.pages.home;
  const { actions } = dict.common;

  return (
    <section id="home" className="section-panel">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col-reverse items-start gap-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-muted-foreground text-caption uppercase">
                {home.eyebrow}
              </p>
            </Reveal>

            <Reveal index={1}>
              <h1 className="text-display mt-5 text-balance">{site.name}</h1>
            </Reveal>

            <Reveal index={2}>
              <p className="text-lead text-muted-foreground mt-6 max-w-[46ch] text-pretty">
                {home.summary}
              </p>
            </Reveal>

            {/* Stack como uma linha respirada, não uma nuvem de etiquetas. */}
            <Reveal index={3}>
              <ul className="text-muted-foreground mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                {hero.stack.map((tech, index) => (
                  <li key={tech} className="flex items-center gap-3">
                    {index > 0 ? (
                      <span aria-hidden className="text-muted-foreground/40">
                        ·
                      </span>
                    ) : null}
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={4}>
              <div className="mt-10 flex flex-wrap gap-3">
                <ViewTransition name="resume-cta" share="morph" default="none">
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={<a href={resumeFiles[locale]} download />}
                  >
                    {actions.downloadResume}
                  </Button>
                </ViewTransition>
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  render={<a href="#contact" />}
                >
                  {actions.getInTouch}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* O retrato reaparece maior na página Sobre — é o mesmo objeto. */}
          <ViewTransition name="portrait" share="morph" default="none">
            <div className="ring-foreground/10 relative size-36 shrink-0 overflow-hidden rounded-[2rem] ring-1 sm:size-52">
              <Image
                src={site.photo}
                alt={site.name}
                fill
                priority
                sizes="(min-width: 640px) 13rem, 9rem"
                className="object-cover"
              />
            </div>
          </ViewTransition>
        </div>

        <Reveal index={5}>
          <p className="text-muted-foreground/70 text-caption mt-16 uppercase">
            {hero.scrollHint}
          </p>
        </Reveal>

        {/* Link para a página de projetos: mantém a rota indexável alcançável
            a partir da home, não só pelo menu. */}
        <span className="sr-only">
          <Link href={pathFor(locale, "projects")}>
            {actions.viewProjects}
          </Link>
        </span>
      </div>
    </section>
  );
}

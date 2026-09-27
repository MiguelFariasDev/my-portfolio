import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";
import { pathFor, type Locale } from "@/lib/routes";
import { projects } from "@/lib/site";

/**
 * Lista editorial em vez de grade de cards: numeração grande, nome, resumo e
 * stack numa linha. Um card com moldura por projeto empilharia quatro caixas
 * iguais — o visual de template que este portfólio não quer.
 */
export function Projects({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.pages.projects;
  const eyebrow = dict.sections.eyebrow.projects;
  const projectCopy = dict.projects;
  const { actions, projectStatus } = dict.common;

  return (
    <section id="projects" className="section-panel">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="text-muted-foreground text-caption uppercase">
            {eyebrow}
          </p>
        </Reveal>

        <Reveal index={1}>
          <h2 className="text-title mt-6 max-w-[26ch] text-balance">
            {copy.subtitle}
          </h2>
        </Reveal>

        <ol className="mt-10">
          {projects.map((project, index) => {
            const text = projectCopy[project.id as keyof typeof projectCopy];
            if (!text) return null;

            return (
              <Reveal
                as="li"
                key={project.id}
                index={index + 3}
                className="border-foreground/15 border-t py-5 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
                  <span
                    aria-hidden
                    className="text-muted-foreground/50 font-mono text-xs tabular-nums sm:w-10 sm:shrink-0"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-subhead">{text.name}</h3>
                      <span className="text-muted-foreground/70 text-xs">
                        {projectStatus[project.status]}
                      </span>
                    </div>

                    <p className="text-muted-foreground mt-2 max-w-[62ch] text-sm leading-relaxed text-pretty">
                      {text.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <ul className="text-muted-foreground/70 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        {project.stack.slice(0, 5).map((tech, i) => (
                          <li key={tech} className="flex items-center gap-2">
                            {i > 0 ? (
                              <span aria-hidden className="opacity-40">
                                ·
                              </span>
                            ) : null}
                            {tech}
                          </li>
                        ))}
                      </ul>

                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-brand inline-block text-xs underline-offset-4 transition-[color,transform] duration-150 ease-out hover:underline active:scale-[0.96]"
                        >
                          {actions.viewRepository}
                          <span className="sr-only">: {text.name}</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal index={4}>
          <div className="mt-8">
            <Button
              variant="link"
              className="px-0"
              nativeButton={false}
              render={
                <Link
                  href={pathFor(locale, "projects")}
                  transitionTypes={["nav-forward"]}
                />
              }
            >
              {actions.viewProjects} →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

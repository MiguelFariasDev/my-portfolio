import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { PageTransition } from "@/components/page-transition";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, pathFor } from "@/lib/routes";
import { projects, resumeFiles, site } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { common, pages, projects: projectCopy } = getDictionary(lang);
  const home = pages.home;
  const featured = projects.filter((project) => project.featured);

  return (
    <PageTransition route="home">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
        <section className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-6">
            <p className="text-muted-foreground text-sm font-medium tracking-wide">
              {home.eyebrow}
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-balance sm:text-5xl">
                {home.title}
              </h1>
              <p className="text-xl text-pretty sm:text-2xl">{home.role}</p>
              <p className="text-muted-foreground text-base text-pretty">
                {home.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* O mesmo botão é o assunto da página de currículo: ele viaja
                  até lá em vez de desaparecer. */}
              <ViewTransition name="resume-cta" share="morph" default="none">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<a href={resumeFiles[lang]} download />}
                >
                  {common.actions.downloadResume}
                </Button>
              </ViewTransition>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={
                  <Link
                    href={pathFor(lang, "contact")}
                    transitionTypes={["nav-forward"]}
                  />
                }
              >
                {common.actions.getInTouch}
              </Button>
            </div>
          </div>

          {/* O retrato reaparece maior na página Sobre — é o mesmo objeto. */}
          <ViewTransition name="portrait" share="morph" default="none">
            <div className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-3xl border sm:w-52">
              <Image
                src={site.photo}
                alt={site.name}
                fill
                priority
                sizes="(min-width: 640px) 13rem, 9rem"
                className="scale-[1.35] object-cover object-[50%_42%]"
              />
            </div>
          </ViewTransition>
        </section>

        <section className="mt-20 space-y-4 sm:mt-28">
          <h2 className="text-xl font-semibold">{home.highlightsTitle}</h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {home.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-muted-foreground rounded-xl border p-4 text-sm"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 space-y-6 sm:mt-28">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              {home.featuredProjectsTitle}
            </h2>
            <p className="text-muted-foreground text-sm">
              {home.featuredProjectsSubtitle}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                copy={projectCopy[project.id as keyof typeof projectCopy]}
                labels={{
                  repository: common.actions.viewRepository,
                  demo: common.actions.viewDemo,
                  status: common.projectStatus[project.status],
                }}
              />
            ))}
          </div>

          <Button
            variant="link"
            className="px-0"
            nativeButton={false}
            render={
              <Link
                href={pathFor(lang, "projects")}
                transitionTypes={["nav-forward"]}
              />
            }
          >
            {common.actions.viewProjects} →
          </Button>
        </section>
      </div>
    </PageTransition>
  );
}

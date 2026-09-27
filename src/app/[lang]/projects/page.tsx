import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageTransition } from "@/components/page-transition";
import { PageShell, PendingNote } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/routes";
import { projects } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { pages } = getDictionary(lang);
  return buildMetadata({
    locale: lang,
    route: "projects",
    title: pages.projects.metaTitle,
    description: pages.projects.metaDescription,
  });
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { common, pages, projects: projectCopy } = getDictionary(lang);

  return (
    <PageTransition route="projects">
      <PageShell
        title={pages.projects.title}
        subtitle={pages.projects.subtitle}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} index={index} className="h-full">
              <ProjectCard
                project={project}
                copy={projectCopy[project.id as keyof typeof projectCopy]}
                detailed
                labels={{
                  repository: common.actions.viewRepository,
                  demo: common.actions.viewDemo,
                  status: common.projectStatus[project.status],
                }}
              />
            </Reveal>
          ))}
        </div>

        <PendingNote className="mt-8">
          {pages.projects.emptyImagesNotice}
        </PendingNote>
      </PageShell>
    </PageTransition>
  );
}

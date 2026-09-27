import { ViewTransition } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Project } from "@/lib/site";

export type ProjectCopy = {
  name: string;
  summary: string;
  description: string;
};

export function ProjectCard({
  project,
  copy,
  labels,
  detailed = false,
}: {
  project: Project;
  copy: ProjectCopy;
  labels: { repository: string; demo: string; status: string };
  detailed?: boolean;
}) {
  return (
    // O mesmo projeto aparece em destaque na home e completo na página de
    // projetos: o card voa de um lugar para o outro em vez de sumir e reaparecer.
    <ViewTransition name={`project-${project.id}`} share="morph" default="none">
      <Card className="glass-panel h-full border-0 ring-0 transition-[box-shadow,transform] duration-200 ease-out">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-subhead">{copy.name}</h3>
            <Badge variant="secondary">{labels.status}</Badge>
          </div>
          <p className="text-muted-foreground text-sm text-pretty">
            {copy.summary}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {detailed ? (
            <p className="text-sm text-pretty">{copy.description}</p>
          ) : null}

          <ul className="flex flex-wrap gap-1.5">
            {(detailed ? project.stack : project.stack.slice(0, 5)).map(
              (tech) => (
                <li key={tech}>
                  <Badge variant="outline" className="font-normal">
                    {tech}
                  </Badge>
                </li>
              ),
            )}
          </ul>
        </CardContent>

        <CardFooter className="gap-4 text-sm">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-brand inline-block underline-offset-4 transition-[color,transform] duration-150 ease-out hover:underline active:scale-[0.96]"
            >
              {labels.repository}
            </a>
          ) : null}
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-brand inline-block underline-offset-4 transition-[color,transform] duration-150 ease-out hover:underline active:scale-[0.96]"
            >
              {labels.demo}
            </a>
          ) : null}
        </CardFooter>
      </Card>
    </ViewTransition>
  );
}

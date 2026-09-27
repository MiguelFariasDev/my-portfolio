import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { PageTransition } from "@/components/page-transition";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/routes";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { pages } = getDictionary(lang);
  return buildMetadata({
    locale: lang,
    route: "about",
    title: pages.about.metaTitle,
    description: pages.about.metaDescription,
  });
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages } = getDictionary(lang);
  const about = pages.about;

  return (
    <PageTransition route="about">
      <PageShell title={about.title} subtitle={about.subtitle}>
        <div className="grid gap-12 md:grid-cols-[1fr_16rem] md:items-start">
          <div className="space-y-10">
            {about.sections.map((section) => (
              <section key={section.id} className="space-y-2">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="text-muted-foreground text-base text-pretty">
                  {section.body}
                </p>
              </section>
            ))}

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">{about.interestsTitle}</h2>
              <ul className="flex flex-wrap gap-1.5">
                {about.interests.map((interest) => (
                  <li key={interest}>
                    <Badge variant="secondary" className="font-normal">
                      {interest}
                    </Badge>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            {/* Mesmo retrato do hero da home, agora em tamanho de leitura. */}
            <ViewTransition name="portrait" share="morph" default="none">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border">
                <Image
                  src={site.photo}
                  alt={site.name}
                  fill
                  priority
                  sizes="16rem"
                  className="scale-[1.15] object-cover object-[50%_45%]"
                />
              </div>
            </ViewTransition>

            <div className="space-y-3">
              <h2 className="text-sm font-medium tracking-wide">
                {about.stackTitle}
              </h2>
              <ul className="flex flex-wrap gap-1.5">
                {about.stack.map((tech) => (
                  <li key={tech}>
                    <Badge variant="outline" className="font-normal">
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </PageShell>
    </PageTransition>
  );
}

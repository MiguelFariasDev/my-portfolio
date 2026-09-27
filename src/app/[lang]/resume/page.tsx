import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { PageTransition } from "@/components/page-transition";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/routes";
import { resumeFiles } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/resume">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { pages } = getDictionary(lang);
  return buildMetadata({
    locale: lang,
    route: "resume",
    title: pages.resume.metaTitle,
    description: pages.resume.metaDescription,
  });
}

export default async function ResumePage({
  params,
}: PageProps<"/[lang]/resume">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { common, pages } = getDictionary(lang);
  const file = resumeFiles[lang];

  return (
    <PageTransition route="resume">
      <PageShell title={pages.resume.title} subtitle={pages.resume.subtitle}>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Mesma CTA que aparece no hero da home. */}
            <ViewTransition name="resume-cta" share="morph" default="none">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href={file} download />}
              >
                {common.actions.downloadResume}
              </Button>
            </ViewTransition>
            <p className="text-muted-foreground text-sm">
              {pages.resume.languageNotice}
            </p>
          </div>

          <div className="bg-muted/30 overflow-hidden rounded-xl border">
            <object
              data={`${file}#view=FitH`}
              type="application/pdf"
              className="h-[70vh] min-h-[480px] w-full"
              aria-label={pages.resume.title}
            >
              <p className="text-muted-foreground p-6 text-sm">
                {pages.resume.viewerFallback}
              </p>
            </object>
          </div>
        </div>
      </PageShell>
    </PageTransition>
  );
}

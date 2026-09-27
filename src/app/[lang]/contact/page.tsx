import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageTransition } from "@/components/page-transition";
import { PageShell } from "@/components/page-shell";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/routes";
import { site, socials } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { pages } = getDictionary(lang);
  return buildMetadata({
    locale: lang,
    route: "contact",
    title: pages.contact.metaTitle,
    description: pages.contact.metaDescription,
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages } = getDictionary(lang);
  const contact = pages.contact;

  return (
    <PageTransition route="contact">
      <PageShell title={contact.title} subtitle={contact.subtitle}>
        <dl className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-1">
            <dt className="text-muted-foreground text-sm">
              {contact.emailLabel}
            </dt>
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="text-brand text-lg underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </dd>
          </div>

          <div className="space-y-1">
            <dt className="text-muted-foreground text-sm">
              {contact.locationLabel}
            </dt>
            <dd className="text-lg">{site.location}</dd>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <dt className="text-muted-foreground text-sm">
              {contact.socialsLabel}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-4">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline-offset-4 hover:underline"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </PageShell>
    </PageTransition>
  );
}

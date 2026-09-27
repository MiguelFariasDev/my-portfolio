import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/routes";
import { resumeFiles, site, socials } from "@/lib/site";

export function Contact({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const contact = dict.sections.contact;
  const page = dict.pages.contact;
  const eyebrow = dict.sections.eyebrow.contact;
  const { actions } = dict.common;

  return (
    <section id="contact" className="section-panel">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="text-muted-foreground text-caption uppercase">
            {eyebrow}
          </p>
        </Reveal>

        <Reveal index={1}>
          <h2 className="text-title mt-6 max-w-[16ch] text-balance">
            {contact.title}
          </h2>
        </Reveal>

        <Reveal index={2}>
          <p className="text-lead text-muted-foreground mt-6 max-w-[48ch] text-pretty">
            {page.subtitle}
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="border-foreground/15 mt-14 border-t pt-8">
            <p className="text-muted-foreground text-caption uppercase">
              {contact.emailLabel}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="text-brand text-subhead sm:text-headline mt-2 inline-block max-w-full break-words underline-offset-[6px] transition-[color,transform] duration-150 ease-out hover:underline active:scale-[0.98]"
            >
              {site.email}
            </a>
          </div>
        </Reveal>

        <Reveal index={4}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-brand inline-block underline-offset-4 transition-[color,transform] duration-150 ease-out hover:underline active:scale-[0.96]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={resumeFiles[locale]} download />}
            >
              {actions.downloadResume}
            </Button>
          </div>
        </Reveal>

        <Reveal index={5}>
          <p className="text-muted-foreground/60 mt-16 text-sm">
            {site.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

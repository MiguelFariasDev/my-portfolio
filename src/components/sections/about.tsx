import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * Mesmo conteúdo da aba Sobre: a página e esta seção leem de pages.about, para
 * não existirem duas versões do mesmo texto podendo divergir com o tempo.
 */
export function About({ dict }: { dict: Dictionary }) {
  const about = dict.pages.about;
  const eyebrow = dict.sections.eyebrow.about;

  return (
    <section id="about" className="section-panel">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="text-muted-foreground text-caption uppercase">
            {eyebrow}
          </p>
        </Reveal>

        <Reveal index={1}>
          <h2 className="text-title mt-6 max-w-[34ch] text-balance">
            {about.subtitle}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {about.sections.map((item, index) => (
            <Reveal key={item.id} index={index + 2}>
              <div className="border-foreground/15 border-t pt-5">
                <h3 className="text-subhead">{item.title}</h3>
                <p className="text-muted-foreground mt-2 max-w-[48ch] text-sm leading-relaxed text-pretty">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal index={5}>
          <div className="mt-10">
            <h3 className="text-muted-foreground text-caption uppercase">
              {about.stackTitle}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {about.stack.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline" className="font-normal">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

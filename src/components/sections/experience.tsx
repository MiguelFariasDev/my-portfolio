import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/lib/dictionaries";
import { experience } from "@/lib/site";

export function Experience({ dict }: { dict: Dictionary }) {
  const copy = dict.sections.experience;
  const eyebrow = dict.sections.eyebrow.experience;

  return (
    <section id="experience" className="section-panel">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="text-muted-foreground text-caption uppercase">
            {eyebrow}
          </p>
        </Reveal>

        <Reveal index={1}>
          <h2 className="text-title mt-6 text-balance">{copy.title}</h2>
        </Reveal>

        <Reveal index={2}>
          <p className="text-muted-foreground mt-5 max-w-[56ch] text-base text-pretty">
            {copy.body}
          </p>
        </Reveal>

        <ol className="mt-14">
          {experience.map((entry, index) => {
            const text = copy.entries[entry.id as keyof typeof copy.entries];
            if (!text) return null;

            return (
              <Reveal
                as="li"
                key={entry.id}
                index={index + 3}
                className="relative flex gap-6 pb-9 last:pb-0"
              >
                {/* Régua da timeline: decorativa, a ordem já vem do <ol>. */}
                {index < experience.length - 1 ? (
                  <span
                    aria-hidden
                    className="bg-foreground/15 absolute top-3 left-[5px] h-full w-px"
                  />
                ) : null}
                <span
                  aria-hidden
                  className={
                    entry.kind === "work"
                      ? "bg-brand relative mt-2 size-[11px] shrink-0 rounded-full"
                      : "bg-muted-foreground/40 relative mt-2 size-[11px] shrink-0 rounded-full"
                  }
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-subhead">{text.org}</h3>
                    <span className="text-muted-foreground text-sm">
                      {text.role}
                    </span>
                    <span className="text-muted-foreground/60 text-xs">
                      {text.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground mt-2 max-w-[62ch] text-sm leading-relaxed text-pretty">
                    {text.body}
                  </p>

                  <ul className="text-muted-foreground/70 mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    {entry.stack.map((tech, i) => (
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
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

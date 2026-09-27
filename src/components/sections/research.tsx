import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/lib/dictionaries";

export function Research({ dict }: { dict: Dictionary }) {
  const { research } = dict.sections;
  const eyebrow = dict.sections.eyebrow.research;

  return (
    <section id="research" className="section-panel">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="text-muted-foreground text-caption uppercase">
            {eyebrow}
          </p>
        </Reveal>

        <Reveal index={1}>
          <h2 className="text-title mt-6 text-balance">{research.title}</h2>
        </Reveal>

        <Reveal index={2}>
          <p className="text-lead text-muted-foreground mt-6 max-w-[58ch] text-pretty">
            {research.body}
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-14">
            <h3 className="text-muted-foreground text-caption uppercase">
              {research.focusTitle}
            </h3>
            <dl className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {research.focus.map((item) => (
                <div
                  key={item.id}
                  className="border-foreground/15 border-t pt-5"
                >
                  <dt className="text-subhead">{item.label}</dt>
                  <dd className="text-muted-foreground mt-2 max-w-[44ch] text-sm leading-relaxed text-pretty">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { skills } from "@/lib/content";
import type { Skill } from "@/lib/content";
import { cn } from "@/lib/utils";
import { NextChapter } from "../next-chapter";
import { PageHero } from "../page-hero";
import { Reveal } from "../ui/reveal";

/* Placeholder styling shared with the toolbox pattern. */
const dashed = "rounded-2xl border border-dashed border-line px-6 py-6 text-center font-mono text-sm text-muted";

/* Legend for the chip colors, shown next to every area list. */
function Legend() {
  return (
    <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      <span aria-hidden className="text-accent">
        ●
      </span>{" "}
      learning now · unmarked: comfortable
    </p>
  );
}

/* One chip: ember-highlighted with a pulsing dot while learning, quiet otherwise. */
function SkillChip({ skill }: { skill: Skill }) {
  return (
    <li
      className={cn(
        "rounded-full border px-4 py-1.5 font-mono text-sm transition-colors duration-300",
        skill.learning ? "border-accent/70 bg-accent/10 text-accent" : "border-line bg-surface hover:border-accent hover:text-accent"
      )}
    >
      {skill.learning ? (
        <>
          <span aria-hidden className="animate-pulse-dot mr-2 inline-block size-1.5 rounded-[2px] bg-accent align-middle" />
          {skill.name}
          <span className="sr-only"> (currently learning)</span>
        </>
      ) : (
        skill.name
      )}
    </li>
  );
}

/* One discipline as its own full moment: title and blurb on the left,
 *  focus areas (or their placeholder) on the right. */
function Domain({ index, name, blurb, areas, flip }: { index: string; name: string; blurb: string; areas: Skill[]; flip?: boolean }) {
  return (
    <section aria-labelledby={`skills-${index}`} className={cn("relative overflow-hidden border-b border-line py-28 sm:py-40", flip ? "bg-bg-2" : "bg-bg")}>
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              02 · Discipline {index}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id={`skills-${index}`} className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              {name}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{blurb}</p>
          </Reveal>
        </div>

        <div className={cn("lg:col-span-7 lg:pt-10", flip && "lg:order-1")}>
          <Reveal delay={0.1}>
            {areas.length > 0 ? (
              <>
                <Legend />
                <ul className="flex flex-wrap gap-2.5">
                  {areas.map((a) => (
                    <SkillChip key={a.name} skill={a} />
                  ))}
                </ul>
              </>
            ) : (
              <p className={dashed}>
                [ADD AREAS] · the stacks, tools and specialties inside {name}, listed in{" "}
                <span className="text-accent">lib/content.ts → skills.domains → areas</span>
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** /skills: a framing statement, then each discipline explored as its own
 *  full section, closing on the shared toolbox. */
export default function SkillsPage() {
  return (
    <>
      <PageHero index="02" eyebrow="Skills" title={skills.title} intro={skills.pageIntro} ghost="02" />

      {skills.domains.map((d, i) => (
        <Domain key={d.name} index={d.index} name={d.name} blurb={d.blurb} areas={d.areas} flip={i % 2 === 1} />
      ))}

      {/* Toolbox: the shared kit across both disciplines */}
      <section aria-labelledby="skills-toolbox" className="relative overflow-hidden bg-bg-2 py-28 sm:py-40">
        <div className="shell">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              02 · Toolbox
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="skills-toolbox" className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              The shared kit.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            {skills.toolbox.length > 0 ? (
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {skills.toolbox.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-sm transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={cn(dashed, "mt-10 max-w-xl text-left")}>
                [ADD SKILLS] · list your languages, frameworks &amp; tools in{" "}
                <span className="text-accent">lib/content.ts → skills.toolbox</span>
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <NextChapter current="/skills" />
    </>
  );
}

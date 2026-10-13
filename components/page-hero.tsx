"use client";

import { GhostNumber } from "./ui/ghost-number";
import { Reveal } from "./ui/reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Big background number; defaults to `index`. */
  ghost?: string;
  ghostClass?: string;
};

/** Shared immersive page opener: a tall band, oversized display title and an
 *  editorial intro. Gives every page the same first breath before its
 *  sub-moments unfold on scroll. */
export function PageHero({ index, eyebrow, title, intro, ghost, ghostClass }: Props) {
  return (
    <section className="relative flex min-h-[72svh] items-end overflow-hidden border-b border-line pb-16 pt-40 sm:pb-24">
      <GhostNumber n={ghost ?? index} className={ghostClass ?? "right-2 top-10 sm:right-10"} />
      <div className="shell relative">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {index} · {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2rem,6.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-balance">
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={0.18}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

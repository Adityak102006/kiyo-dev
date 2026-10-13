"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/content";
import { cn } from "@/lib/utils";
import { NextChapter } from "../next-chapter";
import { PageHero } from "../page-hero";
import { Reveal } from "../ui/reveal";

/** /experience: the road so far on one ember rail. The rail draws itself as
 *  the timeline scrolls, entries alternate sides on large screens, and
 *  placeholder milestones stay clearly marked until filled in content.ts. */
export default function ExperiencePage() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <>
      <PageHero index="04" eyebrow="Experience" title={experience.title} intro={experience.pageIntro} ghost="04" />

      <section aria-label="Timeline" className="relative overflow-hidden bg-bg-2 py-28 sm:py-40">
        <div className="shell">
          <div ref={listRef} className="relative">
            {/* Rail: static hairline + scroll-drawn ember overlay (scaleY transform) */}
            <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line lg:left-1/2" />
            <motion.span
              aria-hidden
              style={reduce ? undefined : { scaleY: railScale }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent lg:left-1/2"
            />

            <ol className="space-y-20 sm:space-y-28">
              {experience.entries.map((entry, i) => {
                const placeholder = entry.role.includes("[ADD");
                const right = i % 2 === 1;
                return (
                  <li key={entry.role} className="relative lg:grid lg:grid-cols-2 lg:gap-20">
                    {/* Node */}
                    <span
                      aria-hidden
                      className="absolute -left-0 top-1.5 grid size-[15px] place-items-center lg:left-1/2 lg:-translate-x-1/2"
                    >
                      <span className="animate-pulse-dot pulse-origin absolute size-[15px] rounded-full bg-accent/25" />
                      <span className={cn("relative size-[9px] rounded-full", placeholder ? "border border-accent bg-transparent" : "bg-accent")} />
                    </span>

                    <div className={cn("pl-10 sm:pl-14 lg:pl-0", right ? "lg:col-start-2 lg:pl-14" : "lg:col-start-1 lg:pr-14 lg:text-right")}>
                      <Reveal>
                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{entry.period}</p>
                        <h2
                          className={cn(
                            "mt-2 font-display text-2xl font-semibold tracking-tight sm:text-4xl",
                            placeholder && "text-muted"
                          )}
                        >
                          {entry.role}
                        </h2>
                        <p className={cn("mt-1 text-sm font-medium text-muted", placeholder && "underline decoration-dashed decoration-line underline-offset-4")}>
                          {entry.org}
                        </p>
                        <ul className={cn("mt-5 space-y-2", right ? "" : "lg:ml-auto")}>
                          {entry.points.map((point) => (
                            <li
                              key={point}
                              className={cn(
                                "flex gap-3 text-muted",
                                right ? "" : "lg:flex-row-reverse lg:text-right",
                                placeholder && "italic"
                              )}
                            >
                              <span aria-hidden className={cn("mt-[0.55rem] size-1.5 shrink-0 rounded-[2px] bg-accent")} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Where the road heads next */}
      <section aria-labelledby="experience-next" className="relative overflow-hidden py-28 sm:py-40">
        <div className="shell text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">The next entry</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="experience-next" className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              The timeline is still being written.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted sm:text-lg">
              Open for freelance and client work. If your project is the next milestone, tell me about it.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-opacity duration-300 hover:opacity-85"
            >
              Start a project
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <NextChapter current="/experience" />
    </>
  );
}

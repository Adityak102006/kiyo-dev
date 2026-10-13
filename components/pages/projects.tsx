"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/anim";
import { projects, projectsPage } from "@/lib/content";
import { cn } from "@/lib/utils";
import { NextChapter } from "../next-chapter";
import { PageHero } from "../page-hero";
import { Reveal } from "../ui/reveal";
import { Tilt } from "../ui/tilt";

/* Literal class map so Tailwind can see every col-span variant.
   Tablets get a 2-up grid (flagship span-12 stays full width); the 7/5
   editorial split only applies from lg up. */
const SPAN_CLASS: Record<7 | 5 | 12, string> = {
  7: "md:col-span-1 lg:col-span-7",
  5: "md:col-span-1 lg:col-span-5",
  12: "md:col-span-2 lg:col-span-12",
};

/** Animated placeholder preview, shown until a real image is set in content.ts.
 *  Each project gets its own outlined ghost number on the blueprint grid. */
function Preview({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 bg-bg-2">
      <div className="blueprint absolute inset-0 opacity-60" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-2">
          <span className="ghost-text font-display text-[clamp(3.5rem,7vw,6rem)] font-bold leading-none tracking-tighter">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="animate-pulse-dot pulse-origin size-2.5 rounded-full bg-accent" />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Project preview</p>
        </div>
      </div>
    </div>
  );
}

/* Overview card: an anchor into the case study below. Short summary, tags,
 *  cursor sheen and tilt; the long-form story lives in the deep dive. */
function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const reduce = useReducedMotion();
  const sheenX = useSpring(useMotionValue(-240), { stiffness: 140, damping: 20 });
  const sheenY = useSpring(useMotionValue(-240), { stiffness: 140, damping: 20 });

  function onMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    sheenX.set(e.clientX - r.left - 140);
    sheenY.set(e.clientY - r.top - 140);
  }

  return (
    <Tilt className="h-full">
      <motion.a
        href={`#project-${index}`}
        onPointerMove={onMove}
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/60"
      >
        {/* Media: aspect ratio reserves space → no layout shift */}
        <div
          className={cn(
            "relative overflow-hidden border-b border-line",
            project.span === 12 ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[16/10]"
          )}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <Preview index={index} />
          )}
          {/* Cursor sheen (desktop pointers) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="glow absolute left-0 top-0 size-[280px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ x: sheenX, y: sheenY }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">P·{String(index + 1).padStart(2, "0")}</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight">{project.title}</h2>
          <p className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">{project.summary ?? project.description}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Open case study{" "}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </p>
        </div>
      </motion.a>
    </Tilt>
  );
}

/* Slim scrollspy rail for the case studies (large screens only). */
function DeepDiveNav({ active }: { active: number }) {
  return (
    <nav aria-label="Projects" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 xl:flex">
      {projects.map((p, i) => {
        const short = p.title.includes("·") ? p.title.split(" · ")[0] : p.title.split(" ")[0];
        const isActive = i === active;
        return (
          <a
            key={p.title}
            href={`#project-${i}`}
            aria-label={p.title}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "rounded-full bg-bg/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm transition-opacity duration-300",
                isActive ? "text-accent opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
              )}
            >
              {short}
            </span>
            <span
              aria-hidden
              className={cn("block rounded-full transition-all duration-300", isActive ? "size-2.5 bg-accent" : "size-1.5 bg-line group-hover:bg-accent")}
            />
          </a>
        );
      })}
    </nav>
  );
}

/* Full-width case study: oversized media, meta row (year / role / status),
 *  tags and the visit + source links. Alternating rhythm down the page. */
function DeepDive({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const flip = index % 2 === 1;
  const meta = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Status", value: project.status },
  ].filter((m) => m.value);

  return (
    <section
      id={`project-${index}`}
      aria-labelledby={`project-${index}-title`}
      data-deep={index}
      className={cn("relative scroll-mt-24 overflow-hidden border-b border-line py-24 sm:py-32", flip ? "bg-bg-2" : "bg-bg")}
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <Reveal>
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <Preview index={index} />
              )}
            </div>
          </Reveal>
        </div>

        <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
          <Reveal delay={0.08}>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {String(index + 1).padStart(2, "0")} · Case study
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <h2 id={`project-${index}-title`} className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-4xl">
              {project.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 leading-relaxed text-muted sm:text-lg">{project.description}</p>
          </Reveal>

          {meta.length > 0 ? (
            <Reveal delay={0.24}>
              <dl className="mt-8 grid grid-cols-2 gap-3 border-y border-line py-4 sm:grid-cols-3 sm:gap-4">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{m.label}</dt>
                    <dd className="mt-1 text-sm font-medium">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}

          <Reveal delay={0.28}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-opacity duration-300 hover:opacity-85"
                >
                  {project.status === "Live" ? "Visit live site" : "Visit project"}
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  <span className="underline decoration-dashed decoration-line underline-offset-4">[ADD LINK]</span>
                  <span aria-hidden>↗</span>
                </span>
              )}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
                >
                  View source ↗
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** /projects: overview grid at the top, then each project gets its own
 *  full-width case study as you scroll deeper. */
export default function ProjectsPage() {
  const [active, setActive] = useState(0);

  /* Which case study is in view (drives the dot rail). */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-deep]"));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setActive(Number((entry.target as HTMLElement).dataset.deep))),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageHero index="03" eyebrow="Projects" title="Selected work." intro={projectsPage.intro} ghost="03" />

      {/* Overview grid */}
      <section aria-label="Project overview" className="relative overflow-hidden py-24 sm:py-32">
        <div className="shell">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              {projectsPage.note} ·{" "}
              <a
                href="https://github.com/Adityak102006"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-line underline-offset-4 transition-colors duration-300 hover:decoration-accent"
              >
                Adityak102006 ↗
              </a>
            </p>
          </Reveal>
          {/* Asymmetric editorial grid: 7 / 5 columns (set per project in content.ts) */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            {projects.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} className={SPAN_CLASS[p.span]}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <DeepDiveNav active={active} />
      {projects.map((p, i) => (
        <DeepDive key={i} project={p} index={i} />
      ))}

      <NextChapter current="/projects" />
    </>
  );
}

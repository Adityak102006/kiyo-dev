"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about } from "@/lib/content";
import { cn } from "@/lib/utils";
import { NextChapter } from "../next-chapter";
import { PageHero } from "../page-hero";
import { Reveal } from "../ui/reveal";

/* Moment eyebrow: chapter number + moment label, same rhythm on every page. */
function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
      <span aria-hidden className="inline-block h-px w-8 bg-accent" />
      {index} · {label}
    </p>
  );
}

/** /about: an identity statement, current status and a personality closer,
 *  each as its own full-breath scroll moment. */
export default function AboutPage() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* Gentle parallax inside the frame; the image is oversized so edges never show. */
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const isPlaceholder = (s: string) => s.includes("[ADD");

  return (
    <>
      {/* 01 · Identity */}
      <PageHero index="01" eyebrow="About" title={about.statement} intro={about.paragraphs[0]} ghost="01" />

      {/* 02 · Right now */}
      <section aria-labelledby="about-status" className="relative overflow-hidden border-b border-line py-28 sm:py-40">
        <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-5">
            {/* Personal photo. Swap the file in /public/images (square crop fits best).
                aspect-ratio reserves the space → zero CLS. */}
            <Reveal>
              <div ref={imgRef} className="relative aspect-square overflow-hidden rounded-2xl border border-line">
                <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-x-0 -inset-y-[7%]">
                  <Image
                    src="/images/aditya.webp"
                    alt="Aditya Kumar"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    quality={75}
                    className="object-cover"
                  />
                </motion.div>
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/80">
                  Aditya Kumar · Developer
                </p>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-8">
            <Reveal>
              <Eyebrow index="02" label={about.status.heading} />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="about-status" className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
                {about.paragraphs[1]}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <ul className="mt-10 space-y-4">
                {about.status.lines.map((line) => (
                  <li key={line} className="flex items-center gap-4 border-b border-line pb-4 text-lg text-muted">
                    <span aria-hidden className="size-1.5 shrink-0 rounded-[2px] bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3 sm:gap-4">
                {about.facts.map((f) => (
                  <div key={f.label}>
                    <p className="font-display text-3xl font-semibold sm:text-5xl">
                      {f.value}
                      <span className="ml-1 align-middle font-mono text-xs font-normal uppercase tracking-widest text-accent">{f.unit}</span>
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{f.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 · Off the clock */}
      <section aria-labelledby="about-interests" className="relative overflow-hidden bg-bg-2 py-28 sm:py-40">
        <div className="shell">
          <Reveal>
            <Eyebrow index="03" label={about.interests.heading} />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="about-interests" className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              {about.paragraphs[2]}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className={cn(
                "mt-10 max-w-2xl",
                isPlaceholder(about.interests.body)
                  ? "rounded-2xl border border-dashed border-line px-6 py-6 font-mono text-sm leading-relaxed text-muted"
                  : "text-lg leading-relaxed text-muted"
              )}
            >
              {about.interests.body}
            </p>
          </Reveal>
        </div>
      </section>

      <NextChapter current="/about" />
    </>
  );
}

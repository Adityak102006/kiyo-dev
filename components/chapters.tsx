"use client";

import Link from "next/link";
import { chapters, homeCta } from "@/lib/content";
import { Reveal } from "./ui/reveal";
import { Spotlight } from "./ui/spotlight";

/** Home chapter index: the four immersive pages as one editorial table of
 *  contents, closing with a direct contact CTA. */
export function Chapters() {
  return (
    <section id="chapters" aria-labelledby="chapters-title" className="relative scroll-mt-20 py-24 sm:py-32">
      <Spotlight className="shell relative">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            The chapters
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="chapters-title" className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            One story, five chapters.
          </h2>
        </Reveal>

        <ol className="mt-14 border-t border-line">
          {chapters.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.06}>
              <li>
                <Link
                  href={c.href}
                  className="group flex items-center gap-6 border-b border-line py-8 sm:gap-10 sm:py-10"
                >
                  <span className="font-mono text-sm text-accent">{c.index}</span>
                  <span className="flex-1 font-display text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-5xl">
                    {c.label}
                  </span>
                  <span className="hidden max-w-xs text-right text-sm leading-relaxed text-muted lg:block">{c.teaser}</span>
                  <span aria-hidden className="inline-block shrink-0 transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Contact closes the story */}
        <Reveal delay={0.1} className="mt-20">
          <div className="rounded-2xl border border-line bg-bg-2 px-5 py-12 text-center sm:px-8 sm:py-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">05 · Contact</p>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {homeCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted sm:text-lg">{homeCta.blurb}</p>
            <Link
              href={homeCta.href}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-opacity duration-300 hover:opacity-85"
            >
              {homeCta.label}
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          </div>
        </Reveal>
      </Spotlight>
    </section>
  );
}

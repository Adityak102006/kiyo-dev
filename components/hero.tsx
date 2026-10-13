"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/anim";
import { hero } from "@/lib/content";
import { cn } from "@/lib/utils";

/* Local time (IST), a quiet "someone's home" signal. */
function Clock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>IST · {time}</span>;
}

/* Cursor-following ember glow (fine pointers, transform-only). */
function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(-400), { stiffness: 120, damping: 20 });
  const y = useSpring(useMotionValue(-400), { stiffness: 120, damping: 20 });

  function onMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left - 200);
    y.set(e.clientY - r.top - 200);
  }

  return (
    <section onPointerMove={onMove} aria-hidden className="absolute inset-0">
      <motion.div style={{ x, y }} className="glow pointer-events-none absolute left-0 top-0 size-[400px] rounded-full opacity-70" />
    </section>
  );
}

/* Concentric orbit rings with a pulsing ember core. */
function Orbit() {
  return (
    <div aria-hidden className="pointer-events-none absolute bottom-24 right-6 hidden lg:block lg:right-12">
      <svg width="216" height="216" viewBox="0 0 216 216" className="overflow-visible">
        <g className="spin-slow">
          <circle cx="108" cy="108" r="102" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 8" />
          <circle cx="108" cy="6" r="4" fill="var(--accent)" />
        </g>
        <g className="spin-slower">
          <circle cx="108" cy="108" r="70" fill="none" stroke="var(--line)" strokeWidth="1" />
          <circle cx="108" cy="38" r="3" fill="var(--accent)" />
          <circle cx="178" cy="108" r="2.5" fill="var(--line)" />
        </g>
        <circle cx="108" cy="108" r="30" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 5" />
        <circle cx="108" cy="108" r="13" fill="var(--accent)" className="animate-pulse-dot pulse-origin" />
      </svg>
    </div>
  );
}

/* Hero: oversized display type over a hairline blueprint grid, with a
   cursor glow, drifting ember blobs and the orbit visual anchoring the
   bottom right. Content parallaxes away on scroll → depth. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* Scroll-linked exit: content drifts down & fades, backdrop parallaxes up → depth. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  /* Shared load-in curve. */
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: reduce ? undefined : { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section ref={ref} aria-label="Introduction" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Backdrop: hairline blueprint grid (parallax layer) */}
      <motion.div aria-hidden style={reduce ? undefined : { y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 mx-auto grid w-full max-w-7xl grid-cols-2 px-5 sm:grid-cols-4 sm:px-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={cn("border-l border-line/70", i >= 2 && "hidden sm:block")} />
          ))}
        </div>
      </motion.div>

      {/* Ambient ember blobs + cursor glow */}
      <div aria-hidden className="glow pointer-events-none absolute -top-32 right-[8%] size-[560px] rounded-full opacity-60" />
      <div aria-hidden className="glow pointer-events-none absolute bottom-0 left-[-12%] size-[480px] rounded-full opacity-50" />
      <CursorGlow />

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-14 pt-32 sm:px-8"
      >
        <motion.p {...fade(0)} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span aria-hidden className="inline-block h-px w-8 bg-accent" />
          {hero.eyebrow}
        </motion.p>

        {/* Staggered line reveal: each line rises out of an overflow mask */}
        <h1 className="mt-5 max-w-5xl font-display text-[clamp(2rem,7vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
          {hero.headline.map((line, i) => (
            <span key={line} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
              <motion.span
                className={cn("block", line === hero.accentLine && "text-accent")}
                initial={reduce ? undefined : { y: "112%" }}
                animate={reduce ? undefined : { y: "0%" }}
                transition={reduce ? undefined : { duration: 0.8, delay: 0.15 + i * 0.1, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p {...fade(0.35)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
          {hero.sub}
        </motion.p>

        <motion.div {...fade(0.45)} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={hero.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-opacity duration-300 hover:opacity-85"
          >
            {hero.primaryCta.label}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <a
            href={hero.secondaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {hero.secondaryCta.label}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Orbit rings anchor the bottom right */}
      <Orbit />

      {/* Meta strip */}
      <div className="relative z-10 border-t border-line bg-bg/40 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-10 gap-y-2 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:px-8">
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Open for work
          </span>
          <span className="hidden sm:inline">Web & Software</span>
          <span className="hidden md:inline">BTech CSE · 2nd year</span>
          <span className="hidden sm:inline">
            <Clock />
          </span>
          <a href="#chapters" className="ml-auto flex items-center gap-2 py-2.5 transition-colors duration-300 hover:text-accent">
            Scroll
            <span aria-hidden className="animate-float-y inline-block">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

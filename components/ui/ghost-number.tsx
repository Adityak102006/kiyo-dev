"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  n: string;
  /** Positioning classes, e.g. "right-2 top-6". */
  className?: string;
};

/** Huge outlined section number drifting at its own scroll pace → parallax depth. */
export function GhostNumber({ n, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["16%", "-16%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "ghost-text pointer-events-none absolute select-none font-display text-[clamp(5rem,17vw,15rem)] font-bold leading-none tracking-tighter",
        className
      )}
    >
      <motion.span style={reduce ? undefined : { y }} className="block">
        {n}
      </motion.span>
    </div>
  );
}

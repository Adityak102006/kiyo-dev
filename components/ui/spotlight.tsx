"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Spotlight diameter in px. */
  size?: number;
};

/** Cursor-reactive glow across a whole section (fine pointers, transform-only). */
export function Spotlight({ children, className, size = 520 }: Props) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(-size), { stiffness: 140, damping: 20 });
  const y = useSpring(useMotionValue(-size), { stiffness: 140, damping: 20 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left - size / 2);
    y.set(e.clientY - r.top - size / 2);
  }

  return (
    <div onPointerMove={onMove} className={cn("relative", className)}>
      {children}
      {reduce ? null : (
        <motion.div
          aria-hidden
          style={{ x, y, width: size, height: size }}
          className="glow pointer-events-none absolute left-0 top-0 rounded-full opacity-70"
        />
      )}
    </div>
  );
}

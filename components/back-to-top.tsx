"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/anim";

export function BackToTop() {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="group inline-flex items-center gap-2 py-2.5 transition-colors duration-300 hover:text-accent"
    >
      Back to top
      <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
        ↑
      </span>
    </motion.button>
  );
}

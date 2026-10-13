"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { EASE } from "@/lib/anim";

/** Route transition: the incoming page mounts immediately (popLayout) while
 *  the outgoing one fades away → no blank flash. Reduced motion: plain swap. */
export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { EASE } from "@/lib/anim";

/**
 * Theme toggle: Tailwind class strategy on <html>.
 * • First load: inline script in app/layout.tsx applies stored theme or system
 *   preference before paint (no flash).
 * • Toggle: flips .dark, persists to localStorage, and briefly adds
 *   .theme-anim so every surface crossfades its colors (see globals.css).
 * • Also follows OS-level changes while no explicit choice is stored.
 */
export function ThemeToggle() {
  const reduce = useReducedMotion();

  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* private mode: theme still applies for this visit */
    }
    if (!reduce) {
      root.classList.add("theme-anim");
      window.setTimeout(() => root.classList.remove("theme-anim"), 550);
    }
  }

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        /* ignore */
      }
      if (!stored) document.documentElement.classList.toggle("dark", e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      {/* Both icons render; CSS picks per theme → zero hydration mismatch */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="hidden size-[18px] dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-[18px] dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.4 14.2A8.3 8.3 0 0 1 9.8 3.6a8.3 8.3 0 1 0 10.6 10.6Z" />
      </svg>
    </motion.button>
  );
}

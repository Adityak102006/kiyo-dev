"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/anim";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

/* Route nav: every item is its own page now, so the header is the same on
   every route. Active page gets a static ember underline + aria-current. */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  /* Lock body scroll while the mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Esc closes the menu. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Mobile menu items: staggered entrance. */
  const itemTransition = (i: number) =>
    reduce ? { duration: 0.15, delay: 0.04 + i * 0.05 } : { duration: 0.45, delay: 0.04 + i * 0.05, ease: EASE };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          Aditya<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-4 md:flex lg:gap-7">
          {nav.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-1 font-mono text-[13px] uppercase tracking-wider transition-colors duration-300",
                    active ? "text-accent" : "text-muted hover:text-fg"
                  )}
                >
                  {link.label}
                  {active ? (
                    <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full bg-accent" />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-fg transition-opacity duration-300 hover:opacity-85 sm:block"
          >
            Hire me
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-10 place-items-center md:hidden"
          >
            <span className={cn("absolute h-px w-5 bg-fg transition-transform duration-300", open ? "rotate-45" : "-translate-y-[3.5px]")} />
            <span className={cn("absolute h-px w-5 bg-fg transition-transform duration-300", open ? "-rotate-45" : "translate-y-[3.5px]")} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={reduce ? { duration: 0.15 } : { duration: 0.35, ease: EASE }}
            className="fixed inset-0 -z-10 flex h-svh flex-col justify-center overflow-y-auto bg-bg px-6 py-20 sm:px-8 md:hidden"
          >
            <ul className="flex flex-col gap-3">
              {nav.map((link, i) => (
                <motion.li key={link.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={itemTransition(i)}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-display text-[clamp(1.75rem,7vw,2.25rem)] font-semibold tracking-tight",
                      pathname === link.href && "text-accent"
                    )}
                  >
                    <span className="mr-3 font-mono text-sm text-accent">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduce ? { duration: 0.2 } : { duration: 0.4, delay: 0.35, ease: EASE }}
              className="mt-12 font-mono text-xs uppercase tracking-widest text-muted"
            >
              Web &amp; Software Developer · open for freelance &amp; client work
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

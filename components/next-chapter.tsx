"use client";

import Link from "next/link";
import { chapters } from "@/lib/content";
import { cn } from "@/lib/utils";

/* Full reading order: the four chapters, then contact. */
const ORDER = [...chapters, { index: "05", label: "Contact", href: "/contact" }];

/** Prev/next band that closes every immersive page, so each journey hands
 *  over to the next instead of ending in a dead stop. */
export function NextChapter({ current }: { current: string }) {
  const i = ORDER.findIndex((c) => c.href === current);
  if (i === -1) return null;
  const prev = ORDER[i - 1];
  const next = ORDER[i + 1];
  const twoCells = Boolean(prev && next);

  const cell = (
    href: string,
    meta: string,
    label: string,
    align: "left" | "right"
  ) => (
    <Link href={href} className={cn("group block py-10 sm:py-14", align === "right" && "sm:text-right")}>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{meta}</p>
      <p className="mt-2 inline-flex items-center gap-3 font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl">
        {align === "right" ? (
          <>
            {label}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </>
        ) : (
          <>
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
              ←
            </span>
            {label}
          </>
        )}
      </p>
    </Link>
  );

  return (
    <nav aria-label="Chapters" className="border-t border-line bg-bg-2">
      <div className={cn("shell grid", twoCells && "sm:grid-cols-2")}>
        {prev ? (
          <div className="border-b border-line sm:border-b-0 sm:border-r">{cell(prev.href, `← Previous · ${prev.index}`, prev.label, "left")}</div>
        ) : null}
        {next ? <div>{cell(next.href, `Next · ${next.index} →`, next.label, "right")}</div> : null}
      </div>
    </nav>
  );
}

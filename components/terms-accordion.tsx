"use client";

import { useEffect, useState } from "react";
import { terms } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Terms & Conditions as a collapsed-by-default accordion, so /contact stays
 * light on load. When the URL hash is #terms (footer link, the agreement line
 * under the form, or the old /terms redirect), every section expands and the
 * block scrolls into view.
 */
export function TermsAccordion() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const allOpen = terms.sections.every((s) => open[s.id]);

  useEffect(() => {
    const expandFromHash = () => {
      if (window.location.hash !== "#terms") return;
      setOpen(Object.fromEntries(terms.sections.map((s) => [s.id, true])));
      document.getElementById("terms")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    expandFromHash();
    window.addEventListener("hashchange", expandFromHash);
    return () => window.removeEventListener("hashchange", expandFromHash);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {terms.sections.length} sections · Last updated {terms.lastUpdated}
        </p>
        <button
          type="button"
          onClick={() => setOpen(Object.fromEntries(terms.sections.map((s) => [s.id, !allOpen])))}
                  className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="mt-6 border-t border-line">
        {terms.sections.map((s, i) => {
          const isOpen = Boolean(open[s.id]);
          return (
            <div key={s.id} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))}
                  aria-expanded={isOpen}
                  aria-controls={`terms-panel-${s.id}`}
                  id={`terms-button-${s.id}`}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-lg font-semibold tracking-tight sm:text-xl">{s.title}</span>
                  <span
                    aria-hidden
                    className={cn("grid size-7 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300", isOpen && "rotate-45")}
                  >
                    +
                  </span>
                </button>
              </h3>
              {isOpen ? (
                <div
                  id={`terms-panel-${s.id}`}
                  role="region"
                  aria-labelledby={`terms-button-${s.id}`}
                  className="space-y-4 pb-7 pl-8 pr-2 sm:pl-12"
                >
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                  {s.points ? (
                    <ul className="space-y-2">
                      {s.points.map((point) => (
                        <li key={point.slice(0, 24)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                          <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-[2px] bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

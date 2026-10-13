import { marqueeItems } from "@/lib/content";

/** Infinite marquee band with a duplicated track translated -50% (CSS, transform-only). */
export function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden border-y border-line bg-bg-2">
      <div className="marquee-track flex w-max items-center py-4">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {marqueeItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-8 px-8 font-display text-sm font-semibold uppercase tracking-[0.22em] text-muted"
              >
                {item}
                <span className="size-1.5 rounded-[2px] bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

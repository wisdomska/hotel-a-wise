import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import type { Amenity } from "@/types/content";

// Icon glyphs (line-art, neutral)
const icons: Record<string, React.ReactNode> = {
  default: (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="16" cy="16" r="10" />
      <path d="M11 16h10M16 11v10" strokeLinecap="round" />
    </svg>
  ),
};

const iconFor = (name: string): React.ReactNode => {
  // simple mapping based on name keyword
  const n = name.toLowerCase();
  if (n.includes("room") || n.includes("bed")) return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M4 22V12h24v10M4 26v-4h24v4M8 18v-4h6v4M18 18v-4h6v4" strokeLinejoin="round" />
    </svg>
  );
  if (n.includes("sheet")) return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M6 8h20l-3 18H9L6 8z" /><path d="M10 8V5h12v3" />
    </svg>
  );
  if (n.includes("conference") || n.includes("meeting")) return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="4" y="9" width="24" height="16" rx="2"/><path d="M10 25v3M22 25v3" strokeLinecap="round"/>
    </svg>
  );
  if (n.includes("porch") || n.includes("outdoor")) return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M4 22h24M6 22V13l10-6 10 6v9" /><path d="M13 22v-6h6v6" />
    </svg>
  );
  if (n.includes("hall")) return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M4 26V8l12-4 12 4v18M10 26V14h12v12" /><path d="M14 26v-6h4v6"/>
    </svg>
  );
  if (n.includes("bath")) return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M4 16h24v6a4 4 0 01-4 4H8a4 4 0 01-4-4v-6z" /><path d="M9 16v-6a3 3 0 016 0" />
    </svg>
  );
  if (n.includes("compound") || n.includes("event")) return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M16 4l12 6v12L16 28 4 22V10l12-6z" />
    </svg>
  );
  return icons.default;
};

export function AmenitiesMarquee({ items }: { items: Amenity[] }) {
  if (!items.length) return null;

  return (
    <section id="amenities" className="bg-[var(--color-bone)] section-y">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Our facilities</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 max-w-[20ch] text-[var(--color-ink)]"
            style={{ fontSize: "clamp(30px, 4.4vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
          >
            Everything we have curated for an effortless stay.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="article" delay={Math.min(i * 0.04, 0.32)} key={item.id}>
              <div className="group h-full rounded-[var(--radius-card)] border border-[var(--color-line-cool)] bg-[var(--color-paper)] p-7 transition-colors hover:border-[var(--color-navy)]">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--color-line-cool)] text-[var(--color-navy)] transition-colors group-hover:bg-[var(--color-navy)] group-hover:text-white group-hover:border-[var(--color-navy)]">
                  {iconFor(item.name)}
                </span>
                <h3 className="mt-7 font-display text-[24px] font-normal text-[var(--color-ink)] leading-snug">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="mt-2 text-[14px] text-[var(--color-ink-mute)] leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

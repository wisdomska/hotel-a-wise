import type { Amenity } from "@/types/content";

export function AmenitiesMarquee({ items }: { items: Amenity[] }) {
  if (!items.length) return null;
  const list = items.map((a) => a.name);
  const doubled = [...list, ...list];

  return (
    <section
      id="amenities"
      aria-label="Amenities"
      className="border-y border-[var(--color-border)] bg-ink-900 py-8 text-cream-50"
    >
      <div className="overflow-hidden scrollbar-none">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {doubled.map((label, i) => (
            <span key={i} className="flex items-center gap-10 px-6">
              <span className="font-display text-2xl md:text-3xl tracking-wide">{label}</span>
              <span aria-hidden className="text-gold-400">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

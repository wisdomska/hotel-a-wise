import Image from "next/image";
import type { Amenity } from "@/types/content";

export function ComingSoon({ items }: { items: Amenity[] }) {
  if (!items.length) return null;

  return (
    <section className="bg-cream-100 py-24 md:py-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-600">On the horizon</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink-900 md:text-5xl">
            Coming soon to Hotel A-Wise
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[var(--radius-card)] bg-cream-50"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-ink-950/10 to-transparent" />
                <span className="absolute left-6 top-6 rounded-full bg-cream-50/95 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ink-900">
                  Coming soon
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-display text-3xl text-cream-50 md:text-4xl">{item.name}</h3>
                  {item.description && (
                    <p className="mt-2 max-w-md text-sm text-cream-100/85">{item.description}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

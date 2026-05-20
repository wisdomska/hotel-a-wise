import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { Amenity } from "@/types/content";

export function ComingSoon({ items }: { items: Amenity[] }) {
  if (!items.length) return null;

  return (
    <section className="bg-[var(--color-cream-soft)] section-y">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">On the horizon</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 max-w-[24ch] text-[var(--color-ink)]"
            style={{ fontSize: "clamp(30px, 4.4vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
          >
            Coming soon to A-Wise.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {items.map((item, i) => (
            <Reveal as="article" delay={i * 0.08} key={item.id}>
              <div className="group relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)]">
                <div className="relative aspect-[5/4] overflow-hidden">
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(0,3,13,0.05) 30%, rgba(0,3,13,0.85) 100%)" }}
                  />
                  <span className="absolute left-7 top-7 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1 text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink)]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-navy)]" />
                    Coming soon
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                    <h3 className="font-display text-white text-[34px] md:text-[44px] font-light leading-tight">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="mt-2 max-w-md text-[14px] text-white/85 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

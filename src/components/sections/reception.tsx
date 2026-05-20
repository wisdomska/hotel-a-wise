import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { Testimonial } from "@/types/content";

export function Reception({ testimonial }: { testimonial: Testimonial | null }) {
  return (
    <section id="reception" className="bg-[var(--color-bone)] section-y">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Our reception</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            className="mt-6 max-w-[20ch] text-[var(--color-ink)]"
            style={{ fontSize: "clamp(30px, 4.4vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
          >
            A welcome that lingers long after check-out.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
          <Reveal>
            <div className="relative aspect-[5/6] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)]">
              <Image
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=85"
                alt="Hotel reception lobby"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {testimonial && (
            <Reveal delay={0.1}>
              <figure className="flex h-full flex-col justify-center rounded-[var(--radius-card)] border border-[var(--color-line-cool)] bg-[var(--color-paper)] p-10 md:p-14">
                <svg width="44" height="32" viewBox="0 0 64 48" fill="currentColor" aria-hidden className="text-[var(--color-navy)]">
                  <path d="M0 48V28C0 12.6 8.4 2.4 22.8 0l3.6 7.2C18 9.6 13.2 14.4 12 21.6h12V48H0Zm40 0V28c0-15.4 8.4-25.6 22.8-28L66.4 7.2C58 9.6 53.2 14.4 52 21.6h12V48H40Z" />
                </svg>
                <blockquote className="mt-6 font-display text-[24px] md:text-[30px] font-light leading-[1.3] text-[var(--color-ink)]">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-[var(--color-navy)]" />
                  <span className="text-[13px] tracking-[0.2em] uppercase text-[var(--color-ink-mute)]">
                    {testimonial.author}{testimonial.location ? ` · ${testimonial.location}` : null}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

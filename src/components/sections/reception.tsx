import Image from "next/image";
import type { Testimonial } from "@/types/content";

export function Reception({ testimonial }: { testimonial: Testimonial | null }) {
  return (
    <section
      id="reception"
      className="relative isolate overflow-hidden bg-ink-900 py-24 text-cream-50 md:py-32"
    >
      <Image
        src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=80"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/80 via-ink-950/85 to-ink-950" />

      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Our reception</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] md:text-5xl lg:text-[3.5rem]">
              A welcome that lingers long after check-out.
            </h2>
            <p className="mt-6 max-w-md text-cream-100/80">
              The first impression at A-Wise sets the tone for everything that follows — calm,
              composed, and unmistakably warm.
            </p>
          </div>

          {testimonial && (
            <figure className="relative max-w-2xl">
              <svg
                aria-hidden
                width="64"
                height="48"
                viewBox="0 0 64 48"
                className="text-gold-400/80"
                fill="currentColor"
              >
                <path d="M0 48V28C0 12.6 8.4 2.4 22.8 0l3.6 7.2C18 9.6 13.2 14.4 12 21.6h12V48H0Zm40 0V28c0-15.4 8.4-25.6 22.8-28L66.4 7.2C58 9.6 53.2 14.4 52 21.6h12V48H40Z" />
              </svg>
              <blockquote className="mt-6 font-display text-2xl leading-snug text-cream-50 md:text-3xl">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-gold-400" />
                <span className="text-sm tracking-wide text-cream-100/85">
                  {testimonial.author}
                  {testimonial.location ? ` — ${testimonial.location}` : null}
                </span>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

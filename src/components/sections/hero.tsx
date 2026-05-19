import Image from "next/image";
import type { Hero as HeroData } from "@/types/content";
import { Button } from "@/components/ui/button";

export function Hero({ data }: { data: HeroData }) {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden grain">
      <Image
        src={data.background_image_url}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/35 to-ink-950/80" />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex-1" />

        <div className="container-wide pb-24 pt-40 md:pb-32">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold-300">
              <span className="h-px w-12 bg-gold-300" />
              Affordable Luxury in Accra
            </p>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-cream-50 md:text-7xl lg:text-[5.5rem]">
              {data.headline}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream-100/90 md:text-lg">
              {data.subtext}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={data.cta_link} size="lg">
                {data.cta_text}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <Button href="#contact" variant="ghost" size="lg" className="text-cream-100 hover:text-gold-300">
                Get in touch
              </Button>
            </div>
          </div>
        </div>

        <div className="container-wide pb-10">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-cream-100/70">
            <span>Est. Accra</span>
            <span aria-hidden className="hidden h-px flex-1 mx-8 bg-cream-100/30 md:block" />
            <span>Scroll to explore ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

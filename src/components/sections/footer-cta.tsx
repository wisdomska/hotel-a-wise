import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function FooterCTA() {
  return (
    <section className="bg-[var(--color-night)] text-white section-y">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
          <Reveal>
            <h2
              className="max-w-[14ch] font-light"
              style={{ fontSize: "clamp(38px, 6vw, 96px)", letterSpacing: "-0.03em", lineHeight: 1.02 }}
            >
              Affordable luxury awaits.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="space-y-6 text-white/85">
              <p className="text-[16px] md:text-[18px] leading-relaxed">
                Plan a stay with us — tell us your dates and the kind of stay you're imagining.
                We'll reply within one business day with a curated recommendation.
              </p>
              <Button href="#contact" variant="outline-light">
                Book your stay
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

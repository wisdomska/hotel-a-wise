import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const images = [
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1100&q=85",
    alt: "Suite interior at Hotel A-Wise",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1100&q=85",
    alt: "Conference space",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=85",
    alt: "Bathroom finishes",
    aspect: "aspect-[3/4]",
  },
];

export function Welcome() {
  return (
    <section className="bg-[var(--color-cream)] section-y">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">A warm welcome</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            className="mt-6 max-w-[18ch] text-[var(--color-ink)]"
            style={{ fontSize: "clamp(34px, 5vw, 78px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            Welcome to the world of <em className="not-italic">affordable luxury</em> and comfort.
          </h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <Reveal delay={0.1}>
            <div className="max-w-md space-y-4 text-[var(--color-ink-soft)] text-[16px] md:text-[17px] leading-relaxed">
              <p>
                Experience a stay like no other, where indulgence knows no bounds and your every
                desire is our priority. Join us in redefining the art of hospitality.
              </p>
              <p>
                Let us pamper you in a world where luxury and comfort intertwine seamlessly —
                welcome to your extraordinary escape.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)] ${img.aspect}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const images = [
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1100&q=80",
    alt: "Elegant hotel room interior",
    className: "row-span-2 aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1100&q=80",
    alt: "Conference room",
    className: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=80",
    alt: "Premium bathroom finishes",
    className: "aspect-[4/3]",
  },
];

export function Welcome() {
  return (
    <section id="welcome" className="bg-cream-50 py-24 md:py-32">
      <div className="container-wide grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-600">A warm welcome</p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink-900 md:text-5xl lg:text-[3.5rem]">
            Welcome to the world of <em className="not-italic text-gold-600">affordable luxury</em> and comfort.
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ink-500 md:text-[17px]">
            Experience a stay where indulgence has no ceiling and your every wish is anticipated.
            Join us in redefining hospitality — a place where comfort and elegance are inseparable.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500 md:text-[17px]">
            Welcome to a journey of quiet elegance. Welcome to your extraordinary escape.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-[var(--radius-card)] bg-cream-200 ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

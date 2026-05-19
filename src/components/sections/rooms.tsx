import Image from "next/image";
import type { Room } from "@/types/content";
import { Button } from "@/components/ui/button";

export function Rooms({ rooms }: { rooms: Room[] }) {
  if (!rooms.length) return null;

  return (
    <section id="rooms" className="bg-cream-50 py-24 md:py-32">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-600">Our spaces</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink-900 md:text-5xl">
              Our luxury rooms
            </h2>
            <p className="mt-4 max-w-lg text-ink-500">
              Each room is designed with quiet intent — natural materials, soft light,
              and considered detailing that lets you settle into the city at your own pace.
            </p>
          </div>
          <Button href="#contact" variant="outline">
            View all rooms
          </Button>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:gap-12">
          {rooms.map((room) => (
            <article key={room.id} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-cream-200">
                <Image
                  src={room.hero_image_url}
                  alt={room.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                />
                {room.price_per_night && (
                  <span className="absolute right-5 top-5 rounded-full bg-cream-50/95 px-4 py-1.5 text-xs tracking-wide text-ink-900">
                    From ₵{room.price_per_night}/night
                  </span>
                )}
              </div>
              <div className="mt-6 flex flex-1 flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl text-ink-900">{room.name}</h3>
                  <ul className="flex shrink-0 items-center gap-4 text-xs uppercase tracking-[0.18em] text-ink-500">
                    <li>{room.bed_summary}</li>
                    <li aria-hidden>•</li>
                    <li>{room.capacity} guests</li>
                  </ul>
                </div>
                {room.description && (
                  <p className="mt-3 text-ink-500">{room.description}</p>
                )}
                <a
                  href={`#contact`}
                  className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-ink-900 transition-colors hover:text-gold-600"
                >
                  Enquire
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

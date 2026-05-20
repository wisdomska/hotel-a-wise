import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { Room } from "@/types/content";

function BedIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M4 22V12h24v10M4 26v-4h24v4M8 18v-4h6v4M18 18v-4h6v4" strokeLinejoin="round" />
    </svg>
  );
}
function PersonIcon() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="16" cy="11" r="5" /><path d="M6 26c0-5 4-9 10-9s10 4 10 9" strokeLinecap="round" />
    </svg>
  );
}

export function Rooms({ rooms }: { rooms: Room[] }) {
  if (!rooms.length) return null;

  return (
    <section id="rooms" className="bg-[var(--color-bone)] section-y">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Our spaces</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="max-w-[20ch] text-[var(--color-ink)]"
              style={{ fontSize: "clamp(30px, 4.4vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
            >
              Our luxury rooms.
            </h2>
            <Link
              href="#contact"
              className="btn-pill h-12 border border-[var(--color-navy)] px-6 text-[14px] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white"
            >
              View all rooms
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {rooms.map((room, i) => (
            <Reveal as="article" delay={i * 0.08} key={room.id}>
              <Link href={`/rooms/${room.slug}`} className="group block rounded-[var(--radius-card)] border border-[var(--color-line-cool)] bg-[var(--color-paper)] p-3 transition-colors hover:border-[var(--color-navy)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius-card)-4px)] bg-[var(--color-line)]">
                  <Image
                    src={room.hero_image_url}
                    alt={room.name}
                    fill
                    sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  />
                  {room.price_per_night && (
                    <span className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-[12px] tracking-wide text-[var(--color-ink)]">
                      From ₵{room.price_per_night}/night
                    </span>
                  )}
                </div>
                <div className="px-3 pt-6 pb-2">
                  <h3 className="font-display text-[30px] md:text-[38px] font-light leading-tight text-[var(--color-ink)]">
                    {room.name}
                  </h3>
                  {room.description && (
                    <p className="mt-2 max-w-prose text-[15px] text-[var(--color-ink-mute)] leading-relaxed">
                      {room.description}
                    </p>
                  )}
                  <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
                    <li className="flex items-center gap-2.5"><BedIcon />{room.bed_summary}</li>
                    <li className="flex items-center gap-2.5"><PersonIcon />{room.capacity} guests</li>
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

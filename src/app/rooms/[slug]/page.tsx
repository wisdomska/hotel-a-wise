import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FooterCTA } from "@/components/sections/footer-cta";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { getAllRoomSlugs, getRoomBySlug, getAllPublishedRooms } from "@/lib/rooms";
import { getLandingContent } from "@/lib/content";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllRoomSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) return { title: "Room not found" };
  return {
    title: room.name,
    description: room.description ?? `Stay in our ${room.name} — ${room.bed_summary}, ${room.capacity} guests.`,
    openGraph: {
      title: `${room.name} · Hotel A-Wise`,
      description: room.description ?? undefined,
      images: [{ url: room.hero_image_url }],
    },
  };
}

export default async function RoomPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) notFound();

  const allRooms = await getAllPublishedRooms();
  const otherRooms = allRooms.filter((r) => r.slug !== room.slug).slice(0, 3);
  const { contact } = await getLandingContent();

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative isolate min-h-[80svh] w-full overflow-hidden">
          <Image
            src={room.hero_image_url}
            alt={room.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(rgba(255,255,255,0) 0%, #00030d 100%)", opacity: 0.9 }}
          />
          <div className="relative z-10 flex min-h-[80svh] items-end px-[clamp(20px,4vw,64px)] pb-20 pt-40">
            <div className="max-w-[1408px] mx-auto w-full">
              <p className="mb-6 text-[12px] uppercase tracking-[0.28em] text-white/80">
                <Link href="/" className="hover:text-white">Hotel A-Wise</Link>
                <span className="mx-2" aria-hidden>/</span>
                <span>Rooms</span>
              </p>
              <h1
                className="font-display font-light text-white"
                style={{ fontSize: "clamp(44px, 6.5vw, 100px)", letterSpacing: "-0.03em", lineHeight: 1.04 }}
              >
                {room.name}
              </h1>
              <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] uppercase tracking-[0.2em] text-white/85">
                <li>{room.bed_summary}</li>
                <li aria-hidden>•</li>
                <li>{room.capacity} guests</li>
                {room.price_per_night && (
                  <>
                    <li aria-hidden>•</li>
                    <li>From ₵{room.price_per_night}/night</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Description + gallery */}
        <section className="bg-[var(--color-bone)] section-y">
          <div className="container-x grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow">Stay with us</p>
                <h2
                  className="mt-6 max-w-md"
                  style={{ fontSize: "clamp(30px, 4.4vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
                >
                  A quiet, considered space.
                </h2>
                {room.description && (
                  <p className="mt-6 max-w-md text-[var(--color-ink-soft)] leading-relaxed md:text-[17px]">
                    {room.description}
                  </p>
                )}
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href={`mailto:${contact.email}?subject=Booking enquiry — ${encodeURIComponent(room.name)}`}>
                    Enquire to book
                  </Button>
                  <Button href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} variant="outline">
                    Call {contact.phone}
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {room.gallery && room.gallery.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {room.gallery.map((src, i) => (
                    <div
                      key={i}
                      className={`relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)] ${
                        i % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${room.name} — image ${i + 1}`}
                        fill
                        sizes="(min-width: 1024px) 30vw, 50vw"
                        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)]">
                  <Image src={room.hero_image_url} alt={room.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
              )}
            </Reveal>
          </div>
        </section>

        {otherRooms.length > 0 && (
          <section className="bg-[var(--color-cream)] section-y">
            <div className="container-x">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <h2
                    style={{ fontSize: "clamp(30px, 4.4vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
                    className="text-[var(--color-ink)]"
                  >
                    Other rooms you might love.
                  </h2>
                  <Link href="/#rooms" className="text-[13px] uppercase tracking-[0.22em] text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]">
                    Browse all rooms →
                  </Link>
                </div>
              </Reveal>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {otherRooms.map((r, i) => (
                  <Reveal key={r.id} delay={i * 0.05}>
                    <Link href={`/rooms/${r.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-line)]">
                        <Image
                          src={r.hero_image_url}
                          alt={r.name}
                          fill
                          sizes="(min-width: 768px) 30vw, 100vw"
                          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                        />
                      </div>
                      <h3 className="mt-4 font-display text-[24px] md:text-[28px] font-light text-[var(--color-ink)]">{r.name}</h3>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
                        {r.bed_summary} · {r.capacity} guests
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <FooterCTA />
      </main>
      <Footer contact={contact} />
    </>
  );
}

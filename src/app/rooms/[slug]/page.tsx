import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getAllRoomSlugs, getRoomBySlug, getAllPublishedRooms } from "@/lib/rooms";
import { getLandingContent } from "@/lib/content";

export const revalidate = 3600; // 1 hour ISR fallback — CMS revalidates on edit

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
    title: `${room.name}`,
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
        <section className="relative isolate min-h-[80svh] w-full overflow-hidden grain">
          <Image
            src={room.hero_image_url}
            alt={room.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/30 to-ink-950/80" />
          <div className="relative z-10 flex min-h-[80svh] items-end">
            <div className="container-wide pb-20 pt-40">
              <p className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold-300">
                <Link href="/" className="hover:text-cream-50">Hotel A-Wise</Link>
                <span aria-hidden>/</span>
                <span>Rooms</span>
              </p>
              <h1 className="font-display text-5xl leading-[1.05] text-cream-50 md:text-7xl">
                {room.name}
              </h1>
              <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm uppercase tracking-[0.22em] text-cream-100/85">
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
        <section className="bg-cream-50 py-24 md:py-32">
          <div className="container-wide grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-600">Stay with us</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink-900 md:text-5xl">
                A quiet, considered space.
              </h2>
              {room.description && (
                <p className="mt-6 max-w-md text-ink-500 md:text-[17px] leading-relaxed">
                  {room.description}
                </p>
              )}
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={`mailto:${contact.email}?subject=Booking enquiry — ${encodeURIComponent(room.name)}`}>
                  Enquire to book
                </Button>
                <Button href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} variant="outline">
                  Call {contact.phone}
                </Button>
              </div>
            </div>

            {/* Gallery */}
            {room.gallery && room.gallery.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {room.gallery.map((src, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-[var(--radius-card)] bg-cream-200 ${
                      i % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${room.name} — image ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-cream-200">
                <Image
                  src={room.hero_image_url}
                  alt={room.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Other rooms */}
        {otherRooms.length > 0 && (
          <section className="border-t border-[var(--color-border)] bg-cream-100 py-20 md:py-24">
            <div className="container-wide">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-display text-3xl text-ink-900 md:text-4xl">
                  Other rooms you might love
                </h2>
                <Link href="/#rooms" className="text-sm uppercase tracking-[0.22em] text-ink-700 hover:text-gold-600">
                  Browse all rooms →
                </Link>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {otherRooms.map((r) => (
                  <Link key={r.id} href={`/rooms/${r.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-cream-200">
                      <Image
                        src={r.hero_image_url}
                        alt={r.name}
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-ink-900">{r.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-500">
                      {r.bed_summary} · {r.capacity} guests
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer contact={contact} />
    </>
  );
}

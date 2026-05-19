import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Welcome } from "@/components/sections/welcome";
import { AmenitiesMarquee } from "@/components/sections/amenities-marquee";
import { ComingSoon } from "@/components/sections/coming-soon";
import { Reception } from "@/components/sections/reception";
import { Rooms } from "@/components/sections/rooms";
import { Footer } from "@/components/footer";
import { getLandingContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getLandingContent();

  return (
    <>
      <Header />
      <main>
        <Hero data={content.hero} />
        <Welcome />
        <AmenitiesMarquee items={content.amenities} />
        <ComingSoon items={content.comingSoon} />
        <Reception testimonial={content.featuredTestimonial} />
        <Rooms rooms={content.rooms} />
      </main>
      <Footer contact={content.contact} />
    </>
  );
}

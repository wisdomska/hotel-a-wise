import Link from "next/link";
import type { ContactInfo } from "@/types/content";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#reception" },
];

export function Footer({ contact }: { contact: ContactInfo }) {
  return (
    <footer id="contact" className="relative bg-ink-950 text-cream-100">
      {/* Inquiry section */}
      <div className="container-wide border-b border-cream-100/10 py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Enquire</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] text-cream-50 md:text-5xl lg:text-[3.5rem]">
              Plan a stay with us.
            </h2>
            <p className="mt-6 max-w-md text-cream-100/75">
              Tell us your dates and the kind of stay you’re imagining — we’ll get back to you
              within one business day with a curated recommendation.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-cream-100/55">Address</div>
                <div className="mt-1 text-cream-100/85">{contact.address}</div>
                {contact.maps_link && (
                  <a
                    href={contact.maps_link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-xs text-gold-300 underline-offset-4 hover:underline"
                  >
                    View on Google Maps ↗
                  </a>
                )}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-cream-100/55">Phone</div>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="mt-1 block text-cream-100/85 hover:text-gold-300">
                  {contact.phone}
                </a>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-cream-100/55">Email</div>
                <a href={`mailto:${contact.email}`} className="mt-1 block text-cream-100/85 hover:text-gold-300">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="container-wide py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href="/" className="font-display text-3xl tracking-wide text-cream-50">
            Hotel <span className="text-gold-400">A-Wise</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {pageLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-cream-100/70 transition-colors hover:text-gold-300">
                {l.label}
              </Link>
            ))}
          </nav>
          <Button href="#contact" variant="outline" className="border-cream-100 text-cream-50 hover:bg-cream-50 hover:text-ink-900">
            Book your stay
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cream-100/15 pt-6 text-[11px] uppercase tracking-[0.25em] text-cream-100/45">
          <span>{contact.copyright_text}</span>
          <span>Designed with care · Accra</span>
        </div>
      </div>
    </footer>
  );
}

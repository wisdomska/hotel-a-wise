import Link from "next/link";
import type { ContactInfo } from "@/types/content";
import { Button } from "@/components/ui/button";

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#reception" },
  { label: "Contact", href: "#contact" },
];

export function Footer({ contact }: { contact: ContactInfo }) {
  return (
    <footer id="contact" className="relative bg-ink-950 text-cream-100">
      <div className="container-wide pb-12 pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[6fr_3fr_3fr]">
          <div>
            <Link href="/" className="font-display text-3xl tracking-wide text-cream-50">
              Hotel <span className="text-gold-400">A-Wise</span>
            </Link>
            {contact.footer_tagline && (
              <p className="mt-5 max-w-md text-cream-100/75">{contact.footer_tagline}</p>
            )}
            <div className="mt-8">
              <Button href="#rooms" variant="outline" className="border-cream-100 text-cream-50 hover:bg-cream-50 hover:text-ink-900">
                Book your stay
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-300">Pages</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {pageLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream-100/80 transition-colors hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold-300">Get in touch</h4>
            <address className="mt-5 not-italic text-sm leading-relaxed text-cream-100/80">
              {contact.address}
              {contact.maps_link && (
                <>
                  <br />
                  <a
                    href={contact.maps_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold-300 underline-offset-4 hover:underline"
                  >
                    View on Google Maps ↗
                  </a>
                </>
              )}
              <br />
              <br />
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-gold-300">
                {contact.phone}
              </a>
              <br />
              <a href={`mailto:${contact.email}`} className="hover:text-gold-300">
                {contact.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-cream-100/15 pt-8 text-xs uppercase tracking-[0.25em] text-cream-100/55">
          <span>{contact.copyright_text}</span>
          <span>Designed with care · Accra</span>
        </div>
      </div>
    </footer>
  );
}

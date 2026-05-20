import Link from "next/link";
import type { ContactInfo } from "@/types/content";
import { ContactForm } from "@/components/contact-form";

const pageLinks = [
  { label: "Home",     href: "/" },
  { label: "Rooms",    href: "/#rooms" },
  { label: "Services", href: "/#amenities" },
  { label: "Gallery",  href: "/#reception" },
  { label: "Contact",  href: "/#contact" },
];

export function Footer({ contact }: { contact: ContactInfo }) {
  return (
    <footer id="contact" className="bg-[var(--color-bone)] text-[var(--color-ink)]">
      {/* Inquiry section */}
      <div className="container-x section-y border-t border-[var(--color-line-cool)]">
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-20">
          <div>
            <p className="eyebrow">Enquire</p>
            <h2
              className="mt-6 max-w-[16ch] text-[var(--color-ink)]"
              style={{ fontSize: "clamp(30px, 4.4vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
            >
              Plan a stay with us.
            </h2>
            <p className="mt-6 max-w-md text-[var(--color-ink-soft)] text-[16px] leading-relaxed">
              Tell us your dates and the kind of stay you're imagining — we'll reply within one
              business day with a curated recommendation.
            </p>

            <dl className="mt-12 space-y-5 text-[14px]">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">Address</dt>
                <dd className="mt-1 text-[var(--color-ink-soft)]">{contact.address}</dd>
                {contact.maps_link && (
                  <a href={contact.maps_link} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[13px] text-[var(--color-navy)] underline-offset-4 hover:underline">
                    View on Google Maps ↗
                  </a>
                )}
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">Phone</dt>
                <dd><a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]">{contact.phone}</a></dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">Email</dt>
                <dd><a href={`mailto:${contact.email}`} className="text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]">{contact.email}</a></dd>
              </div>
            </dl>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="container-x border-t border-[var(--color-line-cool)] py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href="/" className="font-display text-[28px] tracking-tight leading-none text-[var(--color-ink)]">
            Hotel<span className="italic font-normal">·</span>A-Wise
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
            {pageLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-navy)]">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[12px] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
          <span>{contact.copyright_text}</span>
          <span>Designed with care · Accra</span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#reception" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream-50/85 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-display text-2xl tracking-wide transition-colors",
            scrolled ? "text-ink-900" : "text-cream-50 drop-shadow-sm"
          )}
        >
          Hotel <span className="text-gold-400">A-Wise</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm tracking-wide transition-colors",
                scrolled ? "text-ink-700 hover:text-gold-600" : "text-cream-100 hover:text-gold-300"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="#rooms" variant={scrolled ? "primary" : "outline"} size="md">
            Book Your Stay
          </Button>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "md:hidden flex h-10 w-10 items-center justify-center",
            scrolled ? "text-ink-900" : "text-cream-50"
          )}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-cream-50">
          <div className="container-wide flex flex-col gap-4 py-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-ink-700 hover:text-gold-600"
              >
                {l.label}
              </Link>
            ))}
            <Button href="#rooms" className="mt-2 self-start">Book Your Stay</Button>
          </div>
        </div>
      )}
    </header>
  );
}

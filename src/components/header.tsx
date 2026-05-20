"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/#rooms" },
  { label: "Services", href: "/#amenities" },
  { label: "Gallery", href: "/#reception" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled
          ? "bg-[var(--color-bone)]/85 backdrop-blur-md border-b border-[var(--color-line-cool)]"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-[88px] items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-display text-[28px] tracking-tight leading-none transition-colors",
            scrolled ? "text-[var(--color-ink)]" : "text-white"
          )}
          aria-label="Hotel A-Wise — Home"
        >
          Hotel<span className="italic font-normal">·</span>A-Wise
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-[14px] tracking-wide transition-colors",
                scrolled ? "text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]" : "text-white/85 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "md:hidden flex h-11 w-11 items-center justify-center",
            scrolled ? "text-[var(--color-ink)]" : "text-white"
          )}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 8h16" strokeLinecap="round" />
                <path d="M4 16h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--color-line-cool)] bg-[var(--color-bone)]"
        >
          <nav aria-label="Mobile" className="container-x flex flex-col gap-4 py-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

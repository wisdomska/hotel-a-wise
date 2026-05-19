"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { cn } from "@/lib/cn";

export function ContactForm({ defaultRoomSlug }: { defaultRoomSlug?: string }) {
  const [state, formAction] = useActionState<InquiryState, FormData>(submitInquiry, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset the form after a successful submit so users can send another
  useEffect(() => {
    if (state?.ok && state.reset) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      {/* honeypot — hidden field, real users won’t fill this */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {defaultRoomSlug && <input type="hidden" name="room_slug" value={defaultRoomSlug} />}

      <div className="grid gap-5 md:grid-cols-2">
        <Labelled label="Name" required>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputBase}
          />
        </Labelled>
        <Labelled label="Email" required>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputBase}
          />
        </Labelled>
      </div>

      <Labelled label="Phone" hint="Optional">
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputBase}
        />
      </Labelled>

      <Labelled label="How can we help?" required>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Dates, party size, anything we should know — we’ll get back to you within a business day."
          className={cn(inputBase, "min-h-[140px] py-3")}
        />
      </Labelled>

      {state && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "rounded-md border px-4 py-3 text-sm",
            state.ok
              ? "border-gold-300 bg-gold-50 text-ink-700"
              : "border-[#b3261e] bg-[#fce8e6] text-[#b3261e]"
          )}
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-2 bg-cream-50 px-8 text-sm font-medium tracking-wide text-ink-900 transition-colors hover:bg-cream-100 active:bg-cream-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        >
          Send inquiry
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-xs uppercase tracking-[0.22em] text-cream-100/55">
          We reply within a business day
        </p>
      </div>
    </form>
  );
}

const inputBase =
  "h-12 w-full bg-transparent border-b border-cream-100/45 px-0 text-[15px] text-cream-50 placeholder:text-cream-100/65 " +
  "transition-colors focus:border-gold-400 focus:outline-none";

function Labelled({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between pb-2 text-[11px] uppercase tracking-[0.22em] text-cream-100/85">
        <span>
          {label}
          {required && <span className="ml-1 text-gold-300">*</span>}
        </span>
        {hint && <span className="text-cream-100/70">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

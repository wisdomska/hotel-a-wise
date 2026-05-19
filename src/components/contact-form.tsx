"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { cn } from "@/lib/cn";

export function ContactForm({ defaultRoomSlug }: { defaultRoomSlug?: string }) {
  const [state, formAction] = useActionState<InquiryState, FormData>(submitInquiry, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok && state.reset) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      {/* honeypot */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {defaultRoomSlug && <input type="hidden" name="room_slug" value={defaultRoomSlug} />}

      <div className="grid gap-5 md:grid-cols-2">
        <Labelled label="Name" required>
          <input name="name" type="text" required autoComplete="name" className={inputBase} />
        </Labelled>
        <Labelled label="Email" required>
          <input name="email" type="email" required autoComplete="email" className={inputBase} />
        </Labelled>
      </div>

      <Labelled label="Phone" hint="Optional">
        <input name="phone" type="tel" autoComplete="tel" className={inputBase} />
      </Labelled>

      <Labelled label="How can we help?" required>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Dates, party size, anything we should know — we'll get back to you within a business day."
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
              ? "border-gold-300/40 bg-gold-300/10 text-gold-200"
              : "border-[#b3261e] bg-[#3a1715] text-[#fda4a0]"
          )}
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <SubmitButton />
        <p className="text-xs uppercase tracking-[0.22em] text-cream-100/70">
          We reply within a business day
        </p>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(
        "inline-flex h-14 items-center justify-center gap-2 bg-cream-50 px-8 text-sm font-medium tracking-wide text-ink-900",
        "transition-all duration-200 hover:bg-cream-100 active:bg-cream-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
        pending && "cursor-progress opacity-70"
      )}
    >
      {pending ? (
        <>
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Sending…
        </>
      ) : (
        <>
          Send inquiry
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </button>
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

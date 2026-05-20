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
          className={cn(inputBase, "min-h-[140px] py-3 leading-relaxed")}
        />
      </Labelled>

      {state && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "rounded-md border px-4 py-3 text-sm",
            state.ok
              ? "border-[var(--color-navy)] bg-[var(--color-cream-soft)] text-[var(--color-ink)]"
              : "border-[#b3261e] bg-[#fce8e6] text-[#b3261e]"
          )}
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <SubmitButton />
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
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
        "btn-pill h-[60px] bg-[var(--color-navy)] px-8 text-[14px] font-medium text-white",
        "hover:bg-[var(--color-navy-2)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-navy)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bone)]",
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
  "h-12 w-full bg-transparent border-b border-[var(--color-line)] px-0 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-mute)] " +
  "transition-colors focus:border-[var(--color-navy)] focus:outline-none";

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
      <span className="flex items-center justify-between pb-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
        <span>
          {label}
          {required && <span className="ml-1 text-[var(--color-navy)]">*</span>}
        </span>
        {hint && <span className="text-[var(--color-ink-mute)]/75">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

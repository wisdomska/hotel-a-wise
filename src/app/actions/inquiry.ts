"use server";

import { createClient } from "@/lib/supabase/server";

export type InquiryState = {
  ok: boolean;
  message: string;
  reset?: boolean;
} | null;

const isEmail = (s: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const room_slug = String(formData.get("room_slug") ?? "").trim() || null;
  const honeypot = String(formData.get("website") ?? "");

  // Honeypot — bots will fill this hidden field
  if (honeypot) {
    // Silent success to avoid leaking bot detection
    return { ok: true, message: "Thanks — we’ll be in touch shortly.", reset: true };
  }

  if (!name || name.length < 2) return { ok: false, message: "Please share your name." };
  if (!email || !isEmail(email)) return { ok: false, message: "A valid email helps us reply." };
  if (!message || message.length < 10) return { ok: false, message: "Tell us a little about your stay — at least a sentence." };
  if (message.length > 2000) return { ok: false, message: "Please keep it under 2000 characters." };

  // 1. Save to Supabase
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      phone: phone || null,
      message,
      room_slug,
      source: "website",
    });
    if (error) {
      // Soft-fail: we still try email below so the team gets it
      console.warn("[inquiry] Supabase insert failed:", error);
    }
  } catch (err) {
    console.warn("[inquiry] Supabase unreachable:", err);
  }

  // 2. Send email via Resend (optional — only if RESEND_API_KEY is configured)
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.INQUIRY_EMAIL_TO ?? "info@hotelawise.com";
  const FROM = process.env.INQUIRY_EMAIL_FROM ?? "Hotel A-Wise <onboarding@resend.dev>";

  if (RESEND_KEY) {
    try {
      const html = `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: auto;">
          <h2 style="color: #1a1612;">New website inquiry</h2>
          <p style="color: #5a5247;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          ${phone ? `<p style="color:#5a5247;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${room_slug ? `<p style="color:#5a5247;"><strong>Room:</strong> ${escapeHtml(room_slug)}</p>` : ""}
          <hr style="border:0;border-top:1px solid #e3dccd;margin:24px 0;" />
          <p style="white-space: pre-wrap; color: #1a1612; line-height: 1.6;">${escapeHtml(message)}</p>
        </div>
      `;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
          from: FROM,
          to: TO,
          subject: `Website inquiry — ${name}`,
          html,
          reply_to: email,
        }),
      });
    } catch (err) {
      console.warn("[inquiry] Resend dispatch failed:", err);
    }
  }

  return {
    ok: true,
    message: "Thank you — we’ll be in touch within one business day.",
    reset: true,
  };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

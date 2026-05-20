"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Hero as HeroData } from "@/types/content";
import { Button } from "@/components/ui/button";

export function Hero({ data }: { data: HeroData }) {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <Image
        src={data.background_image_url}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Top→bottom gradient terminating in near-black-blue (#00030d) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(rgba(255,255,255,0) 0%, #00030d 100%)",
          opacity: 0.92,
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-[clamp(20px,4vw,64px)] pt-[120px] md:pt-[160px] pb-16">
        {/* Top — headline + CTAs */}
        <div className="flex flex-1 flex-col justify-end">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[14ch] text-white font-display font-light"
            style={{
              fontSize: "clamp(48px, 7.5vw, 116px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Your Gateway to Unforgettable Memories
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button href={data.cta_link} variant="filled">
              {data.cta_text}
            </Button>
            <Link
              href="#rooms"
              className="btn-pill h-[60px] border border-white/80 px-9 text-[15px] text-white hover:bg-white hover:text-[var(--color-navy)]"
            >
              Book Your Stay
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Bottom — line + subhead */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid items-start gap-6 md:mt-24 md:grid-cols-[1fr_minmax(280px,520px)]"
        >
          <div className="hidden md:block">
            <div className="h-px w-full max-w-[520px] bg-white/40" />
          </div>
          <p className="max-w-[55ch] text-white/90 text-[15px] md:text-[17px] leading-relaxed">
            {data.subtext}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

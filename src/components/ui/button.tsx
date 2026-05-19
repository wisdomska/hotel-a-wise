import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide " +
  "transition-all duration-300 ease-[var(--ease-soft)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-ink-900 text-cream-50 hover:bg-ink-700 active:bg-ink-950",
  outline:
    "border border-ink-900 text-ink-900 bg-transparent hover:bg-ink-900 hover:text-cream-50",
  ghost:
    "text-ink-900 hover:text-gold-600",
} as const;

const sizes = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-[15px]",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = href.startsWith("http");
    return external ? (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

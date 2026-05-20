import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "filled" | "outline" | "ghost" | "outline-light";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "btn-pill " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-navy)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bone)] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  filled:
    "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-2)] active:bg-[var(--color-navy)]",
  outline:
    "border border-[var(--color-navy)] text-[var(--color-navy)] bg-transparent hover:bg-[var(--color-navy)] hover:text-white",
  // Light text outline for use on dark hero
  "outline-light":
    "border border-white/85 text-white bg-transparent hover:bg-white hover:text-[var(--color-navy)]",
  ghost:
    "text-[var(--color-navy)] hover:text-[var(--color-navy-2)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[13px]",
  md: "h-12 px-7 text-[14px]",
  lg: "h-[60px] px-9 text-[15px]",
};

export function Button({
  variant = "filled",
  size = "lg",
  href,
  className,
  children,
  ...rest
}: Props) {
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

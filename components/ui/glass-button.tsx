"use client";

import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

/**
 * GLASS BUTTON SYSTEM
 * -----------------------------------------------------------------------
 * Reserved for primary interactive CTAs — hero, navigation, solution links,
 * contact. Cards and content sections stay flat and clean; the glass is the
 * exception that marks "this is the thing to press", not a site-wide texture.
 *
 *   default   rgba(255,255,255,.55) · blur(12px) · 1px rgba(10,10,10,.12) · #0A0A0A
 *   hover     #1677FF background + border, white text, soft blue glow
 *   motion    magnetic drift toward the cursor, arrow slides, subtle scale
 */

type Tone = "light" | "onDark";

const base =
  "group/glass relative inline-flex items-center gap-3 overflow-hidden rounded-[10px] " +
  "px-7 py-[0.95rem] font-display text-[0.8125rem] font-semibold uppercase tracking-[0.14em] " +
  "backdrop-blur-[12px] transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-500 ease-brand will-change-transform hover:scale-[1.02] active:scale-[0.99] " +
  "hover:border-brand hover:bg-brand hover:text-white " +
  "hover:shadow-[0_10px_34px_-6px_rgba(22,119,255,0.20),0_0_0_1px_rgba(22,119,255,0.20)]";

const tones: Record<Tone, string> = {
  light:
    "border border-[rgba(10,10,10,0.12)] bg-[rgba(255,255,255,0.55)] text-ink " +
    "shadow-[0_6px_24px_-10px_rgba(10,10,10,0.25)]",
  onDark:
    "border border-white/25 bg-white/10 text-white " +
    "shadow-[0_6px_28px_-10px_rgba(0,0,0,0.6)]",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="relative z-10 inline-block translate-x-0 text-[1.05em] leading-none transition-transform duration-500 ease-brand group-hover/glass:translate-x-1"
      >
        &rarr;
      </span>
    </>
  );
}

type CommonProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

export function GlassButton({
  children,
  href,
  tone = "light",
  className,
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const classes = cn(base, tones[tone], className);

  if (external) {
    return (
      <Magnetic>
        <a
          href={href}
          className={classes}
          data-cursor="link"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          <Inner>{children}</Inner>
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <Link href={href} className={classes} data-cursor="link" {...rest}>
        <Inner>{children}</Inner>
      </Link>
    </Magnetic>
  );
}

export function GlassButtonAction({
  children,
  tone = "light",
  className,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <Magnetic>
      <button
        className={cn(base, tones[tone], "disabled:pointer-events-none disabled:opacity-50", className)}
        data-cursor="link"
        {...rest}
      >
        <Inner>{children}</Inner>
      </button>
    </Magnetic>
  );
}

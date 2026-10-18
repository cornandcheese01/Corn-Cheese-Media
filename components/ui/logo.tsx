import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The supplied Corn & Cheese Media logo. Two variants of the same artwork:
 *
 *   dark  — original black wordmark, for white and off-white backgrounds
 *   light — white wordmark, for the near-black hero and dark sections
 *
 * Both are the provided lockup with the flat paper background matted out; the
 * mark, its proportions and its blue are untouched. The white logo is never
 * placed on a white background.
 */

const SRC = {
  dark: "/brand/logo-dark.png?v=2",
  light: "/brand/logo-light.png?v=2",
} as const;

/** Intrinsic aspect of the supplied lockup. */
const RATIO = 1400 / 399;

export function Logo({
  variant = "dark",
  height = 30,
  className,
  priority = false,
}: {
  variant?: "dark" | "light";
  /** Rendered height in pixels; width follows the lockup's aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[variant]}
      alt="Corn & Cheese Media"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width: "auto" }}
    />
  );
}

/** The mark on its own — used as a quiet motif, never as a replacement lockup. */
export function LogoMark({
  size = 40,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      src="/brand/mark.png"
      alt=""
      aria-hidden="true"
      width={Math.round(size * (322 / 404))}
      height={size}
      className={cn("select-none", className)}
      style={{ height: size, width: "auto", ...style }}
    />
  );
}

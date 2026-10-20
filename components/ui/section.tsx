import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Consistent vertical rhythm for every section on every page.
 *
 * Tones: white / offwhite are the neutral base. `tint` is a soft light blue
 * (a gentle break between white sections); `blue` is the logo blue as a full
 * colour band (white text - used sparingly, one per page at most); `ink` is
 * near-black.
 */
export function Section({
  children,
  className,
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "offwhite" | "tint" | "blue" | "ink";
  id?: string;
}) {
  return (
    <section
      id={id}
      data-dark-region={tone === "ink" || tone === "blue" ? "" : undefined}
      className={cn(
        "py-24 md:py-32 lg:py-40",
        tone === "white" && "bg-white text-ink",
        tone === "offwhite" && "bg-offwhite text-ink",
        tone === "tint" && "bg-brand-soft text-ink",
        tone === "blue" && "bg-[linear-gradient(135deg,#1670F0_0%,#0B4FCC_100%)] text-white",
        tone === "ink" && "bg-ink text-white",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Kicker + oversized headline, the standard opening of a section. */
export function SectionHead({
  kicker,
  className,
  children,
}: {
  kicker?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("max-w-5xl", className)}>
      {kicker ? (
        <div className="mb-7 flex items-center gap-4">
          <span className="h-px w-8 bg-brand" aria-hidden="true" />
          <span className="kicker">{kicker}</span>
        </div>
      ) : null}
      {children}
    </div>
  );
}

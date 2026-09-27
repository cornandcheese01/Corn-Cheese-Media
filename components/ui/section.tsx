import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Consistent vertical rhythm for every section on every page. */
export function Section({
  children,
  className,
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "offwhite" | "ink";
  id?: string;
}) {
  return (
    <section
      id={id}
      data-dark-region={tone === "ink" ? "" : undefined}
      className={cn(
        "py-24 md:py-32 lg:py-40",
        tone === "white" && "bg-white text-ink",
        tone === "offwhite" && "bg-offwhite text-ink",
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

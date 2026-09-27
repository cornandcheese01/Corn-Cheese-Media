"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { HalftoneFlow } from "@/components/ui/halftone-flow";
import { EASE } from "@/components/ui/reveal";
import { useReveal } from "@/components/ui/use-reveal";
import { cn } from "@/lib/utils";

/**
 * Solutions as an editorial index, not a card grid: six oversized numbered
 * rows. Hovering a row lifts it to full black, brings its line of copy in and
 * drives a single sticky visual panel — the same halftone field as the hero,
 * in its light mode, so the site keeps one visual language throughout.
 */

type Item = {
  number?: string;
  title: string;
  line: string;
  href?: string;
};

export function SolutionsList({
  items,
  className,
}: {
  items: readonly Item[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  // One trigger for the whole index, so the rows cascade together.
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);

  return (
    <div ref={ref} className={cn("grid gap-12 lg:grid-cols-12 lg:gap-16", className)}>
      {/* Sticky visual — responds to the hovered row. */}
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-32">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] border border-line bg-offwhite">
            <HalftoneFlow
              mode="light"
              palette="brand"
              speed={0.55}
              dotSize={9}
              className="absolute inset-0 h-full w-full"
            />
            {/* Keeps the labels legible where they sit over the dot field. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/85 to-transparent"
            />

            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <span className="kicker">
                {hovered === null ? "Six solutions" : items[hovered]?.number ?? ""}
              </span>
              <motion.p
                key={hovered ?? "idle"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-display text-[1.75rem] font-bold leading-[1.08] tracking-tightest text-ink"
              >
                {hovered === null ? "One team for everything." : items[hovered]?.title}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* The index itself. */}
      <ul className="lg:col-span-8">
        {items.map((item, i) => {
          const isHovered = hovered === i;
          const Row = (
            <div
              className="relative flex flex-col gap-3 py-7 md:flex-row md:items-baseline md:gap-10 md:py-9"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Blue wash that fills the row from the left on hover. */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-y-0 -left-4 -right-4 origin-left scale-x-0 bg-brand-soft/70 transition-transform duration-[650ms] ease-brand md:-left-6 md:-right-6",
                  isHovered && "scale-x-100",
                )}
              />

              <span
                className={cn(
                  "relative font-display text-[0.75rem] font-semibold tracking-[0.18em] transition-colors duration-500 ease-brand md:w-16 md:shrink-0",
                  isHovered ? "text-brand" : "text-grey",
                )}
              >
                {item.number ?? String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className={cn(
                  "relative font-display font-bold tracking-tightest transition-[color,transform] duration-[650ms] ease-brand md:flex-1",
                  "text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.05]",
                  isHovered ? "translate-x-1 text-ink md:translate-x-2" : "text-ink/85",
                )}
              >
                {item.title}
              </h3>

              <p
                className={cn(
                  "relative font-body text-[0.95rem] leading-relaxed transition-colors duration-500 ease-brand md:w-[17rem] md:shrink-0",
                  isHovered ? "text-ink/75" : "text-grey",
                )}
              >
                {item.line}
              </p>

              <span
                aria-hidden="true"
                className={cn(
                  "relative hidden font-display text-lg transition-[opacity,transform] duration-[650ms] ease-brand md:block",
                  isHovered ? "translate-x-0 opacity-100 text-brand" : "-translate-x-2 opacity-0",
                )}
              >
                &rarr;
              </span>
            </div>
          );

          return (
            <motion.li
              key={item.title}
              className="border-t border-line last:border-b"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
            >
              {item.href ? (
                <Link href={item.href} data-cursor="link" className="block">
                  {Row}
                </Link>
              ) : (
                Row
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

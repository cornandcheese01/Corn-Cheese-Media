"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

import { useReveal } from "@/components/ui/use-reveal";
import { cn } from "@/lib/utils";

/**
 * The site's shared animation language. Every section reveals the same way so
 * the whole experience reads as one system rather than a stack of components
 * each doing their own thing.
 *
 *   EASE      cubic-bezier(0.22, 1, 0.36, 1)
 *   TEXT      masked lines rising from below their own overflow box
 *   BLOCKS    short rise + fade
 *   MEDIA     scale-down from 1.06 behind a clipping mask
 *
 * Triggering goes through `useReveal` (see that file) and a state-driven
 * `animate`, never `whileInView`. The trigger always sits on an unclipped
 * wrapper, because a masked line is translated outside its own
 * `overflow:hidden` box and cannot be measured where it sits.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------------------------------- */

/**
 * Masked line reveal. Splits on `\n` so callers control the line breaks that
 * matter to the composition. One trigger per block, so a multi-line headline
 * cascades together instead of each line waiting its own turn.
 *
 * `lines` is an escape hatch for the rare headline that needs one word styled
 * differently (e.g. a single accent word in an otherwise plain sentence): an
 * array of pre-built nodes, one per line of `text`, rendered in place of the
 * plain string at that position. It takes nodes rather than a render function
 * because most callers of this component are Server Components — a function
 * prop can't cross into this Client Component, but JSX built on the server
 * and handed down as a value can. Build the node with `highlightWord` from
 * `@/lib/highlight-word` (or by hand) before passing it in.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  lines: linesOverride,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  lineClassName?: string;
  delay?: number;
  lines?: ReactNode[];
}) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.25);
  const lines = text.split("\n");

  return (
    <div ref={ref}>
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={`${line}-${i}`} className={cn("line-mask", lineClassName)}>
            <motion.span
              className="block"
              initial={{ y: "115%" }}
              animate={inView ? { y: "0%" } : { y: "115%" }}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.06 }}
            >
              {linesOverride?.[i] ?? line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

/** Short rise + fade, for paragraphs, buttons, list rows and small blocks. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>(amount);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Media reveal: the mask opens while the content settles back to scale 1. */
export function RevealMedia({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={
        inView
          ? { clipPath: "inset(0% 0% 0% 0%)" }
          : { clipPath: "inset(100% 0% 0% 0%)" }
      }
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <motion.div
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 1.3, ease: EASE, delay }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** A hairline that draws itself in from the left. Used as a section divider. */
export function RevealRule({ className }: { className?: string }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.5);

  return (
    <motion.div
      ref={ref}
      className={cn("h-px w-full origin-left bg-line", className)}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

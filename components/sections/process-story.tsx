"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { HalftoneFlow } from "@/components/ui/halftone-flow";
import { EASE } from "@/components/ui/reveal";
import { useReveal } from "@/components/ui/use-reveal";
import { highlightWord } from "@/lib/highlight-word";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  step: string;
  title: string;
  body: string;
};

/**
 * The one word per step the Our Process brief calls out — "We Look At The
 * Data", "We Find What Matters", "We Build The Strategy" — indexed the same
 * way as `whatWeDo.steps`.
 */
const STEP_HIGHLIGHT = ["Data", "Matters", "Strategy"];

/**
 * The three step process as a pinned storytelling column rather than three
 * cards. A sticky panel on the left holds the current step's number and a
 * progress spine; the steps themselves scroll past on the right and take over
 * the panel as each one arrives.
 *
 * On tablet and mobile the pin is dropped and the steps become a plain
 * vertical sequence — the hierarchy survives, the machinery doesn't.
 */
export function ProcessStory({ steps }: { steps: readonly Step[] }) {
  const [active, setActive] = useState(0);
  const current = steps[active];

  const { ref: listRef, inView } = useReveal<HTMLOListElement>(0.08);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // A single loop decides which step is under the reader, in both scroll
  // directions. It idles to a cheap bounds check whenever the section is
  // off screen, and stops entirely on unmount.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const check = () => {
      frame = requestAnimationFrame(check);

      const bounds = container.getBoundingClientRect();
      const vh = window.innerHeight;
      if (bounds.bottom < 0 || bounds.top > vh) return;

      // The reading band sits at the vertical middle of the viewport.
      const band = vh / 2;
      for (let i = 0; i < stepRefs.current.length; i++) {
        const el = stepRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= band && rect.bottom >= band) {
          setActive((prev) => (prev === i ? prev : i));
          return;
        }
      }
    };

    frame = requestAnimationFrame(check);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={containerRef} className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      {/* ------------------------------------------------ PINNED PANEL */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-32">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2px] border border-line bg-offwhite">
            <HalftoneFlow
              mode="light"
              palette="brand"
              speed={0.5}
              dotSize={10}
              className="absolute inset-0 h-full w-full"
            />

            {/* Keeps the labels legible where they sit over the dot field. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-offwhite via-offwhite/80 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-offwhite via-offwhite/85 to-transparent"
            />

            <div className="absolute inset-0 flex flex-col justify-between p-10">
              <span className="kicker">{current?.step}</span>

              <motion.span
                key={current?.number}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="font-display text-[clamp(5rem,9vw,9rem)] font-bold leading-none tracking-tightest text-ink"
              >
                {current?.number}
              </motion.span>
            </div>
          </div>

          {/* Progress spine */}
          <div className="mt-8 flex gap-2">
            {steps.map((step, i) => (
              <span
                key={step.number}
                className={cn(
                  "h-px flex-1 transition-colors duration-500 ease-brand",
                  i <= active ? "bg-brand" : "bg-line",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- STEP COLUMN */}
      <ol ref={listRef} className="lg:col-span-7">
        {steps.map((step, i) => (
          <motion.li
            key={step.number}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className="border-t border-line py-12 first:border-t-0 first:pt-0 md:py-16 lg:min-h-[62vh] lg:py-20"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
          >
            <div className="mb-6 flex items-baseline gap-5">
              <span className="font-display text-[0.75rem] font-semibold tracking-[0.18em] text-brand">
                {step.number}
              </span>
              <span className="kicker lg:hidden">{step.step}</span>
            </div>

            <h3 className="display-sm max-w-[14ch]">
              {STEP_HIGHLIGHT[i]
                ? highlightWord(step.title, STEP_HIGHLIGHT[i], "text-cheese")
                : step.title}
            </h3>

            <p className="lede mt-7 max-w-xl">{step.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

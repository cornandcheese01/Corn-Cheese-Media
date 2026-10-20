"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { EASE, RevealMedia } from "@/components/ui/reveal";
import { useReveal } from "@/components/ui/use-reveal";
import { highlightWord } from "@/lib/highlight-word";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  step: string;
  title: string;
  body: string;
  image: string;
  imagePosition?: string;
};

/**
 * The one word per step the Our Process brief calls out — "We Look At The
 * Data", "We Find What Matters", "We Build The Strategy" — indexed the same
 * way as `whatWeDo.steps`.
 */
const STEP_HIGHLIGHT = ["Data", "Matters", "Strategy"];

/**
 * The three step process as a pinned storytelling column rather than three
 * cards. A sticky photograph on the left changes with the step you are
 * reading: each new photo wipes up over the last while settling from a slight
 * zoom, and the whole stack drifts gently with the scroll. The steps scroll
 * past on the right and hand the panel over as each one arrives.
 *
 * On tablet and mobile the pin is dropped: each step carries its own photo
 * above its text instead, revealed as it scrolls in.
 */
export function ProcessStory({ steps }: { steps: readonly Step[] }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = steps[active];

  const { ref: listRef, inView } = useReveal<HTMLOListElement>(0.08);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Slow scroll-linked drift of the photograph stack.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

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
          <div className="relative aspect-square w-full overflow-hidden rounded-[4px] border border-line bg-ink shadow-[0_20px_50px_-20px_rgba(10,10,10,0.35)]">
            {/* Photograph stack. Oversized vertically so the drift never shows an edge. */}
            <motion.div
              style={reduceMotion ? undefined : { y: drift }}
              className="absolute inset-x-0 -inset-y-[8%]"
            >
              {steps.map((step, i) => (
                // Each photo is revealed once its step is reached and stays
                // underneath the next, so scrolling back retracts them in order.
                <motion.div
                  key={step.number}
                  className="absolute inset-0"
                  style={{ zIndex: i }}
                  initial={false}
                  animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  transition={{ duration: reduceMotion ? 0 : 0.95, ease: EASE }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{ scale: i === active ? 1 : 1.14 }}
                    transition={{ duration: reduceMotion ? 0 : 1.5, ease: EASE }}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      loading="eager"
                      className="object-cover"
                      style={{ objectPosition: step.imagePosition ?? "50% 50%" }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Keeps the labels legible over any photograph. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-black/40"
            />

            <div className="absolute inset-0 z-20 flex flex-col justify-between p-10">
              <span className="kicker text-white/85">{current?.step}</span>

              <motion.span
                key={current?.number}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="font-display text-[clamp(5rem,9vw,9rem)] font-semibold leading-none tracking-tightest text-white"
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
                  i <= active ? "bg-brand" : "bg-brand/20",
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
            className="border-t border-brand/15 py-12 first:border-t-0 first:pt-0 md:py-16 lg:min-h-[62vh] lg:py-20"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
          >
            {/* Below lg there is no pinned panel, so each step carries its own photo. */}
            <div className="mb-8 lg:hidden">
              <RevealMedia className="rounded-[4px]">
                <div className="relative aspect-[4/3] w-full bg-ink">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: step.imagePosition ?? "50% 50%" }}
                  />
                </div>
              </RevealMedia>
            </div>

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

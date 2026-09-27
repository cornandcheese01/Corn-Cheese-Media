"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { EASE } from "@/components/ui/reveal";

/**
 * CIRCULAR TESTIMONIALS
 * -----------------------------------------------------------------------
 * Adapted from the reference component per `testomonial.txt`.
 *
 * PRESERVED: the circular/stacked plate arrangement, the centre-active state,
 * the 3D offset + rotateY transforms, prev/next controls, keyboard nav,
 * autoplay, the Framer Motion quote transition and the word-by-word blur
 * reveal, and the responsive two-column layout.
 *
 * CHANGED for Corn & Cheese: the demo's #00a6fb arrow hover is now brand blue,
 * the generic 1.5rem card radius is now an editorial 2px, typography moves onto
 * Montserrat + Raleway, the styled-jsx block is replaced with Tailwind so it
 * shares the site's tokens, and the demo wrapper/background is gone. Content is
 * passed in — the component ships no copy of its own.
 *
 * A testimonial with `src: null` renders a typographic plate instead of a
 * photograph, so the section works before client photography is supplied.
 */

export type CircularTestimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string | null;
};

export type CircularTestimonialsProps = {
  testimonials: CircularTestimonial[];
  autoplay?: boolean;
  /** Milliseconds between automatic advances. */
  interval?: number;
};

/** Reference gap curve: 60px at <=1024, easing up to 86px and beyond. */
function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  interval = 5000,
}: CircularTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [paused, setPaused] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const count = testimonials.length;
  const active = testimonials[activeIndex];

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + count) % count);
  }, [count]);

  // Manual navigation stops autoplay — matching the reference behaviour.
  const handleNext = useCallback(() => {
    setPaused(true);
    next();
  }, [next]);

  const handlePrev = useCallback(() => {
    setPaused(true);
    prev();
  }, [prev]);

  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoplay || paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(next, interval);
    return () => window.clearInterval(id);
  }, [autoplay, paused, count, interval, next]);

  // Arrow keys, but only while the section is actually on screen — a global
  // listener would otherwise hijack arrow keys for the whole page.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    let onScreen = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    const onKey = (event: KeyboardEvent) => {
      if (!onScreen) return;
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [handleNext, handlePrev]);

  /** Left / centre / right plate transforms; everything else is hidden. */
  const getPlateStyle = (index: number): CSSProperties => {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + count) % count === index;
    const isRight = (activeIndex + 1) % count === index;
    const transition = "all 0.8s cubic-bezier(.4,2,.3,1)";

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition,
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition,
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition,
      };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition };
  };

  if (!count || !active) return null;

  return (
    <div ref={rootRef} className="w-full">
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        {/* ------------------------------------------------ PLATE STACK */}
        <div
          ref={imageContainerRef}
          className="relative h-[19rem] w-full sm:h-[22rem] md:h-[24rem]"
          style={{ perspective: 1000 }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              data-index={index}
              style={getPlateStyle(index)}
              className="absolute inset-0 overflow-hidden rounded-[2px] shadow-[0_24px_60px_-24px_rgba(10,10,10,0.35)]"
            >
              {testimonial.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                // Typographic plate — stands in until photography is supplied.
                <div className="flex h-full w-full flex-col justify-between bg-offwhite p-8 ring-1 ring-inset ring-line">
                  <span className="kicker">{String(index + 1).padStart(2, "0")}</span>
                  <span
                    aria-hidden="true"
                    className="font-display text-[5.5rem] font-bold leading-none tracking-tightest text-brand/15"
                  >
                    {initials(testimonial.name) || "CC"}
                  </span>
                  <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-grey">
                    {testimonial.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --------------------------------------------------- QUOTE */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="font-display text-[1.5rem] font-bold tracking-tightest text-ink">
                {active.name}
              </h3>
              <p className="mt-1 font-body text-[0.925rem] text-grey">
                {active.designation}
              </p>

              <p className="mt-8 font-body text-[1.0625rem] leading-[1.75] text-ink/80 md:text-[1.15rem]">
                {active.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${activeIndex}-${i}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-5 pt-12 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              data-cursor="hover"
              className="flex h-[2.7rem] w-[2.7rem] items-center justify-center rounded-full border border-line bg-white text-ink transition-[background-color,color,border-color,transform] duration-400 ease-brand hover:-translate-x-0.5 hover:border-brand hover:bg-brand hover:text-white"
            >
              <FaArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              data-cursor="hover"
              className="flex h-[2.7rem] w-[2.7rem] items-center justify-center rounded-full border border-line bg-white text-ink transition-[background-color,color,border-color,transform] duration-400 ease-brand hover:translate-x-0.5 hover:border-brand hover:bg-brand hover:text-white"
            >
              <FaArrowRight size={16} aria-hidden="true" />
            </button>

            <span className="ml-2 font-display text-[0.75rem] font-semibold tracking-[0.16em] text-grey">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-ink"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
              <span className="mx-1.5 text-line">/</span>
              {String(count).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircularTestimonials;

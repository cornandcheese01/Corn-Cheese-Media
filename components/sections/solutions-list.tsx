"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

import { EASE } from "@/components/ui/reveal";
import { useReveal } from "@/components/ui/use-reveal";
import { cn } from "@/lib/utils";

/**
 * A solution's parent category. Rows are listed under their category's title
 * and introduction; a new group starts wherever `group.title` changes.
 */
type Group = {
  number: string;
  title: string;
  intro: string;
};

type Item = {
  number?: string;
  title: string;
  line: string;
  href?: string;
  /** The service's own photograph — never looked up by list position. */
  image?: string;
  group?: Group;
};

const FALLBACK_IMAGE = "/solutions/default.jpg";

export function SolutionsList({
  items,
  className,
}: {
  items: readonly Item[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolledIndex, setScrolledIndex] = useState<number>(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // One trigger for the whole index, so the rows cascade together.
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);

  // Track the active row as the user scrolls down the page
  useEffect(() => {
    const handleScroll = () => {
      // Trigger point around upper-mid viewport where the sticky card sits
      const triggerY = window.innerHeight * 0.42;
      let closestIdx = 0;
      let minDistance = Infinity;

      rowRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const dist = Math.abs(rowCenter - triggerY);

        if (dist < minDistance && rect.bottom > 80 && rect.top < window.innerHeight - 80) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setScrolledIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items.length]);

  const activeIndex = hovered !== null ? hovered : scrolledIndex;
  const activeItem = items[activeIndex];
  const activeImage = activeItem?.image || FALLBACK_IMAGE;

  return (
    <div ref={ref} className={cn("grid gap-12 lg:grid-cols-12 lg:gap-16", className)}>
      {/* Sticky visual — responds to scroll position and hovered row */}
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-32">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] border border-line bg-ink shadow-[0_20px_50px_-20px_rgba(10,10,10,0.35)]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={activeItem?.title ?? "Solution visual"}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlays to ensure text is clear and readable */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30"
            />

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
              <div className="flex items-center justify-between">
                <span className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/90">
                  {activeItem?.number ? `Solution ${activeItem.number}` : "Solutions"}
                </span>
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 font-display text-[0.68rem] font-semibold text-white backdrop-blur-md">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {activeItem?.group && (
                  <p className="mb-3 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-corn [text-shadow:0_1px_10px_rgba(0,0,0,0.75)]">
                    {activeItem.group.title}
                  </p>
                )}
                <p className="font-display text-[1.65rem] font-semibold leading-[1.12] tracking-tightest text-white">
                  {activeItem?.title ?? "One team for everything."}
                </p>
                {activeItem?.line && (
                  <p className="mt-2.5 font-body text-[0.88rem] leading-relaxed text-white/80">
                    {activeItem.line}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* The index itself */}
      <ul className="lg:col-span-8">
        {items.map((item, i) => {
          const isHovered = hovered === i;
          const isActive = hovered !== null ? isHovered : scrolledIndex === i;

          const Row = (
            <div
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="relative flex flex-col gap-3 py-7 md:flex-row md:items-baseline md:gap-10 md:py-9 transition-colors duration-300"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Blue wash that fills the row on hover or active scroll */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-y-0 -left-4 -right-4 origin-left bg-brand-soft/70 transition-transform duration-[650ms] ease-brand md:-left-6 md:-right-6",
                  isHovered ? "scale-x-100 opacity-100" : isActive ? "scale-x-100 opacity-40" : "scale-x-0 opacity-0",
                )}
              />

              <span
                className={cn(
                  "relative font-display text-[0.75rem] font-semibold tracking-[0.18em] transition-colors duration-500 ease-brand md:w-16 md:shrink-0",
                  isActive ? "text-brand" : "text-grey",
                )}
              >
                {item.number ?? String(i + 1).padStart(2, "0")}
              </span>

              <h4
                className={cn(
                  "relative font-display font-semibold tracking-tightest transition-[color,transform] duration-[650ms] ease-brand md:flex-1",
                  "text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.05]",
                  isActive ? "translate-x-1 text-ink md:translate-x-2" : "text-ink/80",
                )}
              >
                {item.title}
              </h4>

              <p
                className={cn(
                  "relative font-body text-[0.95rem] leading-relaxed transition-colors duration-500 ease-brand md:w-[17rem] md:shrink-0",
                  isActive ? "text-ink/85" : "text-grey",
                )}
              >
                {item.line}
              </p>

              <span
                aria-hidden="true"
                className={cn(
                  "relative hidden font-display text-lg transition-[opacity,transform] duration-[650ms] ease-brand md:block",
                  isActive ? "translate-x-0 opacity-100 text-brand" : "-translate-x-2 opacity-0",
                )}
              >
                &rarr;
              </span>
            </div>
          );

          // A parent category's header sits above its first service.
          const startsGroup = item.group && item.group.title !== items[i - 1]?.group?.title;

          return (
            <Fragment key={item.title}>
              {startsGroup && item.group && (
                <motion.li
                  className="pb-7 pt-16 first:pt-0"
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                >
                  <p className="kicker">Category {item.group.number}</p>
                  <h3 className="mt-3 font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold leading-tight tracking-tightest text-ink">
                    {item.group.title}
                  </h3>
                  <p className="mt-3 max-w-xl font-body text-[0.95rem] leading-relaxed text-grey">
                    {item.group.intro}
                  </p>
                </motion.li>
              )}

              <motion.li
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
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

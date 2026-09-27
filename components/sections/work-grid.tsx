"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { EASE } from "@/components/ui/reveal";
import { useReveal } from "@/components/ui/use-reveal";
import { cn } from "@/lib/utils";

/**
 * Client brand grid. The content PDF states logos are supplied separately
 * (Kasturi Pakka pending), so each brand renders as an equally sized cell —
 * a wordmark plate until an image path exists, the supplied logo once it does.
 *
 * Logos stay monochrome at rest and take on Corn & Cheese blue on hover.
 * No case studies, no results, no statistics — the PDF supplies none.
 */

export type Client = { name: string; logo: string | null };

export function WorkGrid({
  clients,
  className,
}: {
  clients: readonly Client[];
  className?: string;
}) {
  const { ref, inView } = useReveal<HTMLUListElement>(0.1);

  return (
    <ul
      ref={ref}
      className={cn(
        "grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {clients.map((client, i) => (
        <motion.li
          key={client.name}
          className="border-b border-r border-line"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
        >
          <div
            data-cursor="hover"
            className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden px-8 text-center"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-brand-soft/60 transition-transform duration-[650ms] ease-brand group-hover:scale-y-100"
            />

            {client.logo ? (
              <Image
                src={client.logo}
                alt={client.name}
                width={320}
                height={120}
                className="relative h-auto w-full max-w-[190px] object-contain opacity-60 grayscale transition-[filter,opacity] duration-[650ms] ease-brand group-hover:opacity-100 group-hover:grayscale-0"
              />
            ) : (
              <span className="relative font-display text-[clamp(1rem,1.6vw,1.35rem)] font-semibold uppercase tracking-[0.14em] text-grey transition-colors duration-[650ms] ease-brand group-hover:text-brand">
                {client.name}
              </span>
            )}
          </div>
        </motion.li>
      ))}

      {/* Keeps the final row of the 3-up grid visually complete. */}
      <li className="hidden border-b border-r border-line lg:block" aria-hidden="true">
        <div className="flex aspect-[16/9] items-center justify-center">
          <span className="kicker text-line">&mdash;</span>
        </div>
      </li>
    </ul>
  );
}

/** Compact marquee-free strip used as the homepage teaser. */
export function WorkStrip({ clients }: { clients: readonly Client[] }) {
  const { ref, inView } = useReveal<HTMLUListElement>(0.15);

  return (
    <ul
      ref={ref}
      className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-6"
    >
      {clients.map((client, i) => (
        <motion.li
          key={client.name}
          className="group flex items-center justify-center"
          data-cursor="hover"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
        >
          {client.logo ? (
            <Image
              src={client.logo}
              alt={client.name}
              width={280}
              height={110}
              className="h-auto w-full max-w-[150px] object-contain opacity-55 grayscale transition-[filter,opacity] duration-[650ms] ease-brand group-hover:opacity-100 group-hover:grayscale-0"
            />
          ) : (
            <span className="text-center font-display text-[0.8rem] font-semibold uppercase leading-snug tracking-[0.13em] text-grey transition-colors duration-[650ms] ease-brand group-hover:text-brand">
              {client.name}
            </span>
          )}
        </motion.li>
      ))}
    </ul>
  );
}

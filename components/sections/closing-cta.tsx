"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { GlassButton } from "@/components/ui/glass-button";
import { HalftoneFlow } from "@/components/ui/halftone-flow";
import { LogoMark } from "@/components/ui/logo";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { closing } from "@/content/site";

/** Approved closing headline, broken for the composition. Wording is verbatim. */
const CLOSING_LINES = [
  "If your brand's ready",
  "to grow on data instead",
  "of guesswork, let's talk.",
];

/**
 * 08 — CLOSING CTA
 *
 * The homepage closes on the same dark stage it opened on, so the scroll ends
 * where it began. The halftone field parallaxes slowly behind the statement.
 */
export function ClosingCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      data-dark-region
      className="relative overflow-hidden bg-black py-28 md:py-40 lg:py-48"
    >
      <motion.div style={{ y }} className="absolute inset-[-10%]">
        <HalftoneFlow palette="brand" speed={0.7} dotSize={8} className="h-full w-full" />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(100%_80%_at_30%_50%,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.85)_70%,#000_100%)]"
      />

      <div className="shell relative z-10">
        <LogoMark
          size={44}
          className="mb-10 opacity-90"
        />

        <RevealText
          text={CLOSING_LINES.join("\n")}
          as="h2"
          className="display max-w-6xl text-white"
        />

        <Reveal delay={0.35} className="mt-12">
          <GlassButton href={closing.cta.href} tone="onDark">
            {closing.cta.label}
          </GlassButton>
        </Reveal>
      </div>
    </section>
  );
}

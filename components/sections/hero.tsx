"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { GlassButton } from "@/components/ui/glass-button";
import { EASE } from "@/components/ui/reveal";
import { hero, opening } from "@/content/site";

/**
 * 01 — OPENING SCREEN  +  02 — HERO
 * -----------------------------------------------------------------------
 * One continuous dark stage. The Ogilvy quote holds the screen first — the
 * "held breath" the content brief asks for — then dissolves to reveal the
 * Halftone Flow field already running beneath it, and the brand speaks.
 *
 * The quote is dismissed by whichever comes first: the hold elapsing, a
 * scroll, or a click. It plays once per browsing session, so returning to
 * the homepage mid-visit goes straight to the hero.
 *
 * Hero implementation follows `heroic.txt`: the Halftone Flow component is
 * the hero visual, carried over intact and tuned to the brand palette. None
 * of the reference demo's content (waitlist input, adopter counts, Nexus
 * branding, its footer) appears anywhere.
 */

const HOLD_MS = 3000;
const SESSION_KEY = "cc-opening-seen";

const HEADLINE_LINES = ["Hi, we're", "Corn & Cheese", "Media."];

/** The Ogilvy quote, broken for the composition. Wording is verbatim. */
const QUOTE_LINES = [
  '"A man who stops advertising',
  "to save money is like a man",
  "who stops a clock",
  'to save time."',
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [showOpening, setShowOpening] = useState(false);
  const [quoteIn, setQuoteIn] = useState(false);

  // Decide on the client so the server never renders a locked page.
  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    setShowOpening(!seen);
    setReady(true);
  }, []);

  const dismiss = useCallback(() => {
    setShowOpening((open) => {
      if (!open) return open;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* storage unavailable — the opening simply plays again next time */
      }
      return false;
    });
  }, []);

  // Nothing else competes with the quote while it holds — the header fades out
  // for the duration (see globals.css).
  useEffect(() => {
    const root = document.documentElement;
    if (showOpening) root.setAttribute("data-opening", "1");
    else root.removeAttribute("data-opening");
    return () => root.removeAttribute("data-opening");
  }, [showOpening]);

  // Drive the quote from a state change one frame after the overlay mounts.
  // An enter animation declared straight on children of the AnimatePresence
  // child does not fire; a state transition does.
  useEffect(() => {
    if (!showOpening) return;
    const id = window.setTimeout(() => setQuoteIn(true), 60);
    return () => window.clearTimeout(id);
  }, [showOpening]);

  // Hold the screen, then release. Scroll or click releases it early.
  useEffect(() => {
    if (!showOpening) return;

    const timer = window.setTimeout(dismiss, reduceMotion ? 1400 : HOLD_MS);
    const onScroll = () => dismiss();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") dismiss();
    };

    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    // Nothing should scroll away underneath the quote.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [showOpening, dismiss, reduceMotion]);

  // Hero copy waits for the stage to clear.
  const heroState = ready && !showOpening ? "show" : "hidden";

  return (
    <section
      data-dark-region
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>


      {/* Legibility scrim. Three quiet layers rather than one heavy one: a flat
          knock-down, a vignette that keeps the light weighted to the upper
          right, and a deep foot so the headline always sits on near-black. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(115%_85%_at_78%_12%,transparent_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.85)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black via-black/85 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent"
      />

      {/* Structural hairlines, carried over from the reference composition. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[var(--gutter)] top-0 h-full w-px bg-white/10" />
        <div className="absolute right-[var(--gutter)] top-0 h-full w-px bg-white/10" />
        <div className="absolute inset-x-0 top-[22%] h-px bg-white/[0.07]" />
      </div>

      {/* -------------------------------------------------- HERO CONTENT */}
      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="display text-white">
              {HEADLINE_LINES.map((line, i) => (
                <span key={line} className="line-mask">
                  <motion.span
                    className="block"
                    initial={{ y: "115%" }}
                    animate={heroState === "show" ? { y: "0%" } : { y: "115%" }}
                    transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.09 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pb-4">
            <motion.p
              className="max-w-xl font-body text-[1.0625rem] leading-relaxed text-white/70 md:text-[1.15rem]"
              initial={{ opacity: 0, y: 22 }}
              animate={heroState === "show" ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              className="mt-9"
              initial={{ opacity: 0, y: 22 }}
              animate={heroState === "show" ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
            >
              <GlassButton href={hero.cta.href} tone="onDark">
                {hero.cta.label}
              </GlassButton>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-14 flex items-center gap-4 md:mt-16"
          initial={{ opacity: 0 }}
          animate={heroState === "show" ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
        >
          <span className="kicker text-white/45">Scroll</span>
          <span aria-hidden="true" className="relative h-px w-16 overflow-hidden bg-white/20">
            <motion.span
              className="absolute inset-y-0 left-0 w-1/2 bg-white/70"
              animate={reduceMotion ? {} : { x: ["-100%", "200%"] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
            />
          </span>
        </motion.div>
      </div>

      {/* ----------------------------------------------- OPENING SCREEN */}
      <AnimatePresence>
        {showOpening && (
          <motion.div
            key="opening"
            role="button"
            tabIndex={0}
            aria-label="Continue to Corn & Cheese Media"
            onClick={dismiss}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") dismiss();
            }}
            className="absolute inset-0 z-30 flex items-center bg-[#050505]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.4 } }
                : {
                  opacity: 0,
                  filter: "blur(14px)",
                  scale: 1.04,
                  transition: { duration: 1.15, ease: EASE },
                }
            }
          >
            {/* Portrait: a large crop blended into the black with soft gradients on
                its left, top and bottom edges, so it reads as part of the
                background rather than a picture placed on it. Behind the quote
                on small screens (dimmed); beside it from md up. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 h-[62%] w-full -translate-y-1/2 opacity-45 md:bottom-0 md:top-[12%] md:h-auto md:w-[38vw] md:max-w-[760px] md:translate-y-0 md:opacity-100"
            >
              <motion.div
                className="relative h-full w-full"
                style={{ transformOrigin: "right center" }}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 56, scale: 1.08 }}
                animate={
                  quoteIn
                    ? reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0, scale: 1 }
                    : reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 56, scale: 1.08 }
                }
                transition={{ duration: reduceMotion ? 0.6 : 1.5, ease: EASE, delay: reduceMotion ? 0 : 0.1 }}
              >
                <Image
                  src="/David_Ogilvy.jpg"
                  alt="David Ogilvy"
                  fill
                  priority
                  sizes="(min-width: 768px) 38vw, 92vw"
                  className="object-cover grayscale contrast-[1.06] brightness-[0.82]"
                  style={{ objectPosition: "46% 8%" }}
                />
                <div className="absolute inset-y-0 left-0 w-[75%] bg-[linear-gradient(to_right,#050505_0%,rgba(5,5,5,0.94)_14%,rgba(5,5,5,0.7)_32%,rgba(5,5,5,0.32)_55%,rgba(5,5,5,0.08)_78%,transparent_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#050505] to-transparent" />
              </motion.div>

              <motion.p
                className="absolute bottom-10 right-[var(--gutter)] hidden text-right font-display text-[0.6rem] font-medium uppercase leading-relaxed tracking-[0.32em] text-white/35 md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: quoteIn ? 1 : 0 }}
                transition={{ duration: 1, ease: EASE, delay: reduceMotion ? 0 : 1.2 }}
              >
                Advertising legend
              </motion.p>
            </div>

            <div className="shell relative z-10">
              <blockquote className="max-w-6xl">
                <p className="font-display text-[clamp(1.45rem,3.5vw,3.1rem)] font-semibold leading-[1.2] tracking-tightest text-white">
                  {QUOTE_LINES.map((line, i) => (
                    <span key={line} className="line-mask">
                      <motion.span
                        className="block"
                        initial={reduceMotion ? { opacity: 0 } : { y: "115%" }}
                        animate={
                          quoteIn
                            ? reduceMotion
                              ? { opacity: 1 }
                              : { y: "0%" }
                            : reduceMotion
                              ? { opacity: 0 }
                              : { y: "115%" }
                        }
                        transition={{
                          duration: reduceMotion ? 0.5 : 1,
                          ease: EASE,
                          delay: 0.14 + i * 0.075,
                        }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </p>
                <motion.footer
                  className="mt-8 flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: quoteIn ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.14 + QUOTE_LINES.length * 0.075 }}
                >
                  <span aria-hidden="true" className="h-px w-10 bg-brand" />
                  <cite className="kicker not-italic text-white/60">{opening.attribution}</cite>
                </motion.footer>
              </blockquote>
            </div>

            <span className="sr-only">{opening.quote}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

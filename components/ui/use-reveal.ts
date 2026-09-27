"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal trigger for the whole site.
 *
 * WHY NOT IntersectionObserver / `whileInView`
 * -------------------------------------------
 * Every reveal on this site starts from a hidden state, so a trigger that
 * fails to fire doesn't degrade the animation — it renders the page blank.
 * That makes the trigger's worst case, not its average cost, the thing to
 * optimise for, and IO has two failure modes that bite here:
 *
 *  1. It is not delivered at all in some embedded and in-app browsers — the
 *     ones an agency's traffic actually arrives through when a client opens a
 *     link from Instagram or LinkedIn.
 *  2. Its intersection rect is clipped by ancestor `overflow`, so an element
 *     that starts translated outside its own mask measures as zero-area and
 *     never intersects. That is exactly the shape of this site's signature
 *     masked-line reveal.
 *
 * A single shared rAF loop doing a geometry check sidesteps both. Elements
 * unsubscribe the moment they reveal and the loop stops dead once the set is
 * empty, so it costs a bounded number of `getBoundingClientRect` calls per
 * frame while content is still pending and exactly nothing afterwards.
 */

type Subscriber = { el: HTMLElement; amount: number; reveal: () => void };

const subscribers = new Set<Subscriber>();
let frame = 0;

function tick() {
  const vh = window.innerHeight || document.documentElement.clientHeight;

  subscribers.forEach((sub) => {
    const rect = sub.el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;

    const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    // A block taller than the viewport could never show `amount` of itself,
    // so the requirement is capped.
    const required = Math.min(rect.height * sub.amount, vh * 0.55);

    if (visible > 0 && visible >= required) {
      subscribers.delete(sub);
      sub.reveal();
    }
  });

  frame = subscribers.size > 0 ? requestAnimationFrame(tick) : 0;
}

function ensureRunning() {
  if (!frame && subscribers.size > 0) frame = requestAnimationFrame(tick);
}

/**
 * @param amount Fraction of the element that must be on screen before it
 *               reveals. Capped internally so very tall elements still fire.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(amount = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let live = true;
    const sub: Subscriber = {
      el,
      amount,
      reveal: () => {
        if (live) setInView(true);
      },
    };

    subscribers.add(sub);
    ensureRunning();

    return () => {
      live = false;
      subscribers.delete(sub);
      if (subscribers.size === 0 && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
  }, [amount]);

  return { ref, inView };
}

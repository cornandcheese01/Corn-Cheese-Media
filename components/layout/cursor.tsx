"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CUSTOM CURSOR
 * -----------------------------------------------------------------------
 *   default   small near-black dot
 *   hover     expands into a #1677FF circle with a soft blue glow
 *   link      an arrow appears inside the ring
 *
 * Position is written straight to the DOM inside a rAF loop — no React state
 * per frame. The ring lags the dot slightly, which is what makes it read as
 * a considered object rather than a sprite stuck to the pointer.
 *
 * Fine pointers only. Touch devices keep their native behaviour and the
 * `cursor: none` rule is never applied.
 */

type CursorState = "default" | "hover" | "link";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);

      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select, label",
      );
      if (!el) return setState("default");

      const explicit = el.getAttribute("data-cursor");
      if (explicit === "link") return setState("link");
      if (explicit === "hover") return setState("hover");
      const tag = el.tagName.toLowerCase();
      setState(tag === "a" || tag === "button" ? "link" : "hover");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const loop = () => {
      // The ring eases toward the pointer; the dot tracks it exactly.
      const lag = reduce.matches ? 1 : 0.18;
      ring.x += (target.x - ring.x) * lag;
      ring.y += (target.y - ring.y) * lag;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("blur", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const expanded = state !== "default";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[999] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full transition-[width,height,background-color,border-color,box-shadow,opacity] duration-[450ms] ease-brand"
        style={{
          width: expanded ? 46 : 26,
          height: expanded ? 46 : 26,
          opacity: visible ? 1 : 0,
          border: `1px solid ${expanded ? "rgba(22,119,255,0.9)" : "rgba(10,10,10,0.28)"}`,
          backgroundColor: expanded ? "rgba(22,119,255,0.14)" : "transparent",
          boxShadow: expanded ? "0 0 26px 2px rgba(22,119,255,0.28)" : "none",
          backdropFilter: expanded ? "blur(2px)" : undefined,
        }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold leading-none text-brand transition-[opacity,transform] duration-[380ms] ease-brand"
          style={{
            opacity: state === "link" ? 1 : 0,
            transform: state === "link" ? "translateX(0)" : "translateX(-4px)",
          }}
        >
          &rarr;
        </span>
      </div>

      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full transition-[width,height,opacity,background-color] duration-300 ease-brand"
        style={{
          width: expanded ? 0 : 6,
          height: expanded ? 0 : 6,
          opacity: visible ? 1 : 0,
          backgroundColor: "#0A0A0A",
        }}
      />
    </div>
  );
}

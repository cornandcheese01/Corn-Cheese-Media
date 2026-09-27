"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Magnetic pointer attraction. The child drifts a few pixels toward the cursor
 * while it is over the element, then springs back. Fine pointers only — on
 * touch there is no hover state to attract to, and the transform would just
 * make taps feel imprecise.
 */
export function Magnetic({
  children,
  strength = 0.32,
  radius = 8,
  className,
}: {
  children: ReactNode;
  /** Fraction of the cursor's offset from centre that is followed. */
  strength?: number;
  /** Maximum travel in pixels. */
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 260, damping: 22, mass: 0.5 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const clampT = (v: number) => Math.max(-radius, Math.min(radius, v));
  const tx = useTransform(sx, clampT);
  const ty = useTransform(sy, clampT);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: tx, y: ty, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/**
 * ORIGINAL LINE-ART MOTIFS
 * -----------------------------------------------------------------------
 * No photography is licensed for this build, and sourcing stock images from
 * the open web isn't something this build does for a client site (licensing,
 * "no random stock photos" per brief). These are original vector illustrations
 * instead — minimal single-weight line art on `currentColor`, so every motif
 * on the site shares one drawn hand and one accent colour rather than nine
 * unrelated visual styles.
 *
 * Used for:
 *   - the faded "consumer" motif on What We Do
 *   - the faded "strategy" motif on Who We Are
 *   - the nine Solutions-page icons, one per service
 */

import { type SVGProps } from "react";

type MotifProps = SVGProps<SVGSVGElement>;

/** Consumer / audience behaviour: three profiles on a considered path. */
export function ConsumerMotif(props: MotifProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="240" cy="240" r="238" stroke="currentColor" strokeOpacity="0.16" />
      <path
        d="M96 322C140 262 176 214 240 214C304 214 330 288 384 288"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <g stroke="currentColor" strokeWidth="1.5">
        <circle cx="96" cy="322" r="34" />
        <path d="M60 392c8-26 20-38 36-38s28 12 36 38" strokeLinecap="round" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5">
        <circle cx="240" cy="214" r="46" />
        <path d="M188 300c11-35 27-52 52-52s41 17 52 52" strokeLinecap="round" />
      </g>
      <g stroke="currentColor" strokeWidth="1.5">
        <circle cx="384" cy="288" r="30" />
        <path d="M352 350c7-23 17-33 32-33s25 10 32 33" strokeLinecap="round" />
      </g>
      <circle cx="96" cy="322" r="3" fill="currentColor" />
      <circle cx="240" cy="214" r="3" fill="currentColor" />
      <circle cx="384" cy="288" r="3" fill="currentColor" />
    </svg>
  );
}

/** Strategy / evidence: scattered signal resolving into one considered node. */
export function StrategyMotif(props: MotifProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="240" cy="240" r="238" stroke="currentColor" strokeOpacity="0.16" />
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M96 128L240 240" />
        <path d="M120 320L240 240" />
        <path d="M368 150L240 240" />
        <path d="M352 344L240 240" />
        <path d="M240 90L240 240" />
        <path d="M96 128L120 320" strokeOpacity="0.4" />
        <path d="M368 150L352 344" strokeOpacity="0.4" />
      </g>
      <g fill="currentColor">
        <circle cx="96" cy="128" r="5" />
        <circle cx="120" cy="320" r="5" />
        <circle cx="368" cy="150" r="5" />
        <circle cx="352" cy="344" r="5" />
        <circle cx="240" cy="90" r="5" />
      </g>
      <circle cx="240" cy="240" r="17" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="240" cy="240" r="6" fill="currentColor" />
    </svg>
  );
}

/* -------------------------------------------------------------------- */
/* SOLUTION ICONS — one per category, same stroke weight and viewBox.   */
/* -------------------------------------------------------------------- */

const icon = { viewBox: "0 0 64 64", fill: "none", xmlns: "http://www.w3.org/2000/svg" } as const;
const stroke = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function SocialIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <path d="M14 16h28a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H28l-9 8v-8h-5a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4Z" {...stroke} />
      <path d="M32 32c2.2-2.6 4.4-3.9 6.5-3.9 3 0 5 2.2 5 4.9 0 3.7-4.6 6.3-11.5 10.9-6.9-4.6-11.5-7.2-11.5-10.9 0-2.7 2-4.9 5-4.9 2.1 0 4.3 1.3 6.5 3.9Z" {...stroke} />
    </svg>
  );
}

export function InfluencerIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <circle cx="26" cy="24" r="9" {...stroke} />
      <path d="M12 48c1.6-9.4 6.8-14 14-14s12.4 4.6 14 14" {...stroke} />
      <circle cx="45" cy="19" r="9" {...stroke} strokeOpacity="0.55" />
      <path d="m42 18 2.2 2.2L47.5 16" {...stroke} strokeOpacity="0.55" />
    </svg>
  );
}

export function PerformanceIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <path d="M12 50V16M12 50h40" {...stroke} strokeOpacity="0.4" />
      <rect x="18" y="34" width="7" height="16" {...stroke} />
      <rect x="30" y="26" width="7" height="24" {...stroke} />
      <rect x="42" y="18" width="7" height="32" {...stroke} />
      <path d="M18 30 30 20l7 6 12-14" {...stroke} />
      <path d="M42 12h8v8" {...stroke} />
    </svg>
  );
}

export function WebsiteIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <rect x="10" y="14" width="44" height="36" rx="3" {...stroke} />
      <path d="M10 23h44" {...stroke} />
      <circle cx="16" cy="18.5" r="1.2" fill="currentColor" />
      <circle cx="20.5" cy="18.5" r="1.2" fill="currentColor" />
      <path d="M18 32h14M18 38h20M18 44h10" {...stroke} strokeOpacity="0.6" />
    </svg>
  );
}

export function ManufacturingIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <path d="M10 50V28l12 8V28l12 8V22l12 10v18H10Z" {...stroke} />
      <path d="M10 50h40" {...stroke} />
      <circle cx="45" cy="16" r="6" {...stroke} strokeOpacity="0.6" />
      <path d="M45 11v2m0 6v2m5-5h-2m-6 0h-2m8.5-3.5-1.4 1.4m-7.2 7.2-1.4 1.4m0-10 1.4 1.4m7.2 7.2 1.4 1.4" strokeOpacity="0.6" {...stroke} />
    </svg>
  );
}

export function DeepTechIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <path d="M32 14v10M32 40v10M14 32h10M40 32h10M20 20l7 7M37 37l7 7M44 20l-7 7M27 37l-7 7" {...stroke} strokeOpacity="0.55" />
      <circle cx="32" cy="32" r="8" {...stroke} />
      <circle cx="32" cy="14" r="2.4" fill="currentColor" />
      <circle cx="32" cy="50" r="2.4" fill="currentColor" />
      <circle cx="14" cy="32" r="2.4" fill="currentColor" />
      <circle cx="50" cy="32" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function SolarIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <circle cx="20" cy="18" r="6" {...stroke} />
      <path d="M20 9V6.5M20 27v2.5M11 18H8.5M29 18h2.5M13.6 11.6l-1.7-1.7M26.4 11.6l1.7-1.7M13.6 24.4l-1.7 1.7M26.4 24.4l1.7 1.7" {...stroke} strokeOpacity="0.55" />
      <path d="M20 52l8-18h26l-8 18H20Z" {...stroke} />
      <path d="M24 43h26M37 34l-8 18M45 34l-8 18" {...stroke} strokeOpacity="0.6" />
      <path d="M33 52v6M27 58h12" {...stroke} strokeOpacity="0.6" />
    </svg>
  );
}

export function VideoIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <rect x="10" y="18" width="34" height="28" rx="3" {...stroke} />
      <path d="M44 29.5l10-6.5v18l-10-6.5" {...stroke} />
      <path d="M24.5 27v10l8.5-5Z" {...stroke} />
      <circle cx="16" cy="24" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function PRDigitalIcon(props: MotifProps) {
  return (
    <svg {...icon} {...props}>
      <path d="M14 28v8h8l16 10V18L22 28h-8Z" {...stroke} />
      <path d="M20 36l2.5 9h5l-1.5-6.5" {...stroke} strokeOpacity="0.6" />
      <path d="M44 26c2.5 3.5 2.5 8.5 0 12" {...stroke} />
      <path d="M49 21c5 6.5 5 15.5 0 22" {...stroke} strokeOpacity="0.55" />
    </svg>
  );
}

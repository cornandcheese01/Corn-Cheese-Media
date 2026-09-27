import { Fragment, type ReactNode } from "react";

/**
 * Wraps the first exact, whole-word match of `word` inside `text` in a span
 * carrying `className`; everything else passes through untouched. Used to
 * pick out a single accent word inside an otherwise plain heading/paragraph
 * (e.g. "consumer", "Data") without hand-rolling the split at each call site.
 *
 * Deliberately NOT in components/ui/reveal.tsx: that file is "use client", and
 * a plain utility function called directly (not rendered as `<X />`) from a
 * Server Component resolves to an unusable client-reference stub rather than
 * the real implementation when it lives in a "use client" module. This file
 * carries no directive, so it works from either side of the boundary.
 */
export function highlightWord(text: string, word: string, className: string): ReactNode {
  const match = new RegExp(`\\b(${word})\\b`).exec(text);
  if (!match) return text;

  const start = match.index;
  const end = start + match[0].length;

  return (
    <Fragment>
      {text.slice(0, start)}
      <span className={className}>{match[0]}</span>
      {text.slice(end)}
    </Fragment>
  );
}

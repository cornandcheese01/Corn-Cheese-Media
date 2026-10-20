import { type ReactNode } from "react";

import { Reveal, RevealText } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * The opening of every inner page. Same eyebrow, same oversized headline, same
 * measure — so moving between pages feels like turning a page in one book.
 *
 * `headline` splits on \n; callers set the breaks that suit the composition.
 *
 * `visual`, when supplied, switches the copy onto a two-column measure and
 * places it on the right — a faded editorial motif sitting beside the text
 * rather than a full-width block underneath it. Pages that don't pass it
 * (Who We Are's Corn/Cheese intro, Solutions, Work, Contact) render exactly
 * as before.
 */
export function PageHero({
  eyebrow,
  headline,
  headlineLines,
  intro,
  visual,
  tint = false,
  children,
  className,
}: {
  eyebrow: string;
  headline: string;
  /** See `RevealText`'s `lines` — lets one word in the headline carry its own style. */
  headlineLines?: ReactNode[];
  intro?: string;
  visual?: ReactNode;
  /** A faint light-blue glow in the top-right corner. Off by default. */
  tint?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const copy = (
    <>
      <Reveal y={14} amount={0.05}>
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px w-8 bg-brand" aria-hidden="true" />
          <span className="kicker">{eyebrow}</span>
        </div>
      </Reveal>

      <RevealText
        text={headline}
        as="h1"
        className="display max-w-[16ch]"
        lines={headlineLines}
      />

      {intro ? (
        <Reveal delay={0.2} amount={0.05} className="mt-12 max-w-2xl md:mt-16">
          <p className="lede">{intro}</p>
        </Reveal>
      ) : null}

      {children}
    </>
  );

  return (
    <section
      className={cn(
        "bg-white pb-16 pt-[132px] md:pb-24 md:pt-[184px]",
        tint && "bg-[radial-gradient(75%_95%_at_100%_0%,#DCEAFF_0%,rgba(234,242,255,0.55)_38%,rgba(255,255,255,0)_72%)]",
        className,
      )}
    >
      <div className="shell">
        {visual ? (
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">{copy}</div>
            <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
              {visual}
            </div>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
}

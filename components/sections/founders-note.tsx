import Link from "next/link";

import { LogoMark } from "@/components/ui/logo";
import { Reveal, RevealRule } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { whoWeAre } from "@/content/site";

/**
 * FOUNDERS NOTE — homepage, immediately after Solutions
 * -----------------------------------------------------------------------
 * The approved content has no separate "founders note" of its own — what it
 * has is "A Note, Directly From Us" on the Who We Are page, signed by
 * "The Founding Team, Corn & Cheese Media". Rather than invent a new founder
 * statement (explicitly against the content rules), this teases that same
 * approved opening paragraph and signature here, verbatim, and links through
 * to the full note — the same teaser/full-page pattern every other homepage
 * section already uses for What We Do, Who We Are, Solutions and Work.
 */
export function FoundersNote() {
  const [openingLine] = whoWeAre.note;

  return (
    <Section tone="offwhite" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 hidden opacity-[0.05] lg:block"
      >
        <LogoMark size={280} />
      </div>

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal amount={0.1}>
            <span className="kicker">Founders Note</span>
          </Reveal>

          <Reveal delay={0.1} amount={0.1} className="mt-9">
            <p className="font-display text-[clamp(1.5rem,3.1vw,2.5rem)] font-semibold leading-[1.35] tracking-tightest text-ink">
              {openingLine}
            </p>
          </Reveal>

          <Reveal delay={0.2} amount={0.1} className="mt-10 flex flex-col items-center gap-6">
            <RevealRule className="max-w-[3rem]" />
            <p className="kicker text-ink">{whoWeAre.signature}</p>
          </Reveal>

          <Reveal delay={0.28} amount={0.1} className="mt-10">
            <Link
              href="/who-we-are"
              data-cursor="link"
              className="group relative inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-400 ease-brand hover:text-brand"
            >
              Read The Full Note
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-500 ease-brand group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

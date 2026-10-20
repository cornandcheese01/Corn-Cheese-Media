import Link from "next/link";

import { LogoMark } from "@/components/ui/logo";
import { Reveal, RevealRule } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { foundersNote, whoWeAre } from "@/content/site";

/**
 * FOUNDERS NOTE — homepage, immediately after Solutions
 * -----------------------------------------------------------------------
 * The statement is client-supplied copy (`foundersNote` in content/site.ts).
 * It is signed with the existing "The Founding Team" line and links through to
 * the longer "A Note, Directly From Us" on the Who We Are page.
 */
export function FoundersNote() {
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
            <span className="kicker">{foundersNote.kicker}</span>
          </Reveal>

          <Reveal delay={0.1} amount={0.1} className="mt-9">
            <p className="font-display text-[clamp(1.5rem,3.1vw,2.5rem)] font-semibold leading-[1.35] tracking-tightest text-ink">
              {foundersNote.body}
            </p>
          </Reveal>

          <Reveal delay={0.2} amount={0.1} className="mt-10 flex flex-col items-center gap-6">
            <RevealRule className="max-w-[3rem]" />
            <p className="kicker text-ink">{whoWeAre.signature}</p>
          </Reveal>

          <Reveal delay={0.28} amount={0.1} className="mt-10">
            <Link
              href={foundersNote.cta.href}
              data-cursor="link"
              className="group relative inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-400 ease-brand hover:text-brand"
            >
              {foundersNote.cta.label}
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

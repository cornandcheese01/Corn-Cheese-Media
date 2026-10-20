import type { Metadata } from "next";

import { WorkGrid } from "@/components/sections/work-grid";
import { GlassButton } from "@/components/ui/glass-button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { work } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: work.headline,
};

/**
 * Client logos only — no case study copy, no results, no statistics. The
 * content PDF supplies none, and none are invented here.
 */
export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow={work.eyebrow} headline={work.headline} tint />

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="shell">
          <WorkGrid clients={work.clients} />
        </div>
      </Section>

      {/* Closing statement as the page's blue band */}
      <Section tone="blue" className="py-20 md:py-28 lg:py-32">
        <div className="shell">
          <Reveal delay={0.1}>
            <div className="flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
              <p className="font-display text-[clamp(1.85rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-tightest text-white">
                {work.ctaLead}
              </p>
              <GlassButton href={work.cta.href} tone="onDark">{work.cta.label}</GlassButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

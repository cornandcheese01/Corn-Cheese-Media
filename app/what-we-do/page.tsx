import type { Metadata } from "next";

import { ProcessStory } from "@/components/sections/process-story";
import { GlassButton } from "@/components/ui/glass-button";
import { ConsumerMotif } from "@/components/ui/motifs";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import { whatWeDo } from "@/content/site";
import { highlightWord } from "@/lib/highlight-word";

export const metadata: Metadata = {
  title: "What We Do",
  description: whatWeDo.intro,
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow={whatWeDo.eyebrow}
        headline={"We start with\nyour consumer."}
        headlineLines={[
          "We start with",
          highlightWord("your consumer.", "consumer", "text-cheese font-bold"),
        ]}
        intro={whatWeDo.intro}
        visual={
          <ConsumerMotif className="h-auto w-full max-w-md text-ink opacity-[0.07]" />
        }
      />

      {/* Our Process — pinned storytelling, not cards. */}
      <Section tone="offwhite">
        <div className="shell">
          <SectionHead className="mb-16 md:mb-20">
            <RevealText
              text={whatWeDo.processTitle}
              as="h2"
              className="display-sm"
            />
          </SectionHead>

          <ProcessStory steps={whatWeDo.steps} />
        </div>
      </Section>

      {/* What This Looks Like In Practice */}
      <Section>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <RevealText
                text={"What This Looks\nLike In Practice"}
                as="h2"
                className="display-sm"
              />
            </div>
            <div className="lg:col-span-6 lg:pt-3">
              <Reveal delay={0.1}>
                <p className="lede">{whatWeDo.practiceBody}</p>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <GlassButton href={whatWeDo.cta.href}>
                  {whatWeDo.cta.label}
                </GlassButton>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

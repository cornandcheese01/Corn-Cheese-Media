import type { Metadata } from "next";
import { type ComponentType } from "react";

import { GlassButton } from "@/components/ui/glass-button";
import { HalftoneFlow } from "@/components/ui/halftone-flow";
import {
  DeepTechIcon,
  InfluencerIcon,
  ManufacturingIcon,
  PerformanceIcon,
  SocialIcon,
  WebsiteIcon,
} from "@/components/ui/motifs";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, RevealMedia, RevealText } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { solutions } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions",
  description: solutions.items.map((s) => s.title).join(", "),
};

/**
 * One curated icon per solution rather than six unrelated photographs — see
 * `components/ui/motifs.tsx` for why. Same line weight, same accent colour,
 * same halftone ground: one art direction across all six.
 */
const SOLUTION_ICON: Record<string, ComponentType<{ className?: string }>> = {
  "social-media-optimization": SocialIcon,
  "influencer-marketing": InfluencerIcon,
  "performance-marketing": PerformanceIcon,
  "website-development": WebsiteIcon,
  "manufacturing-marketing": ManufacturingIcon,
  "deep-tech-marketing": DeepTechIcon,
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow={solutions.eyebrow} headline={"Solutions\nbuilt for you."} />

      {/* One immersive section per solution, sides alternating down the page. */}
      <div>
        {solutions.items.map((solution, i) => {
          const flipped = i % 2 === 1;
          const Icon = SOLUTION_ICON[solution.slug];

          return (
            <Section
              key={solution.slug}
              id={solution.slug}
              tone={flipped ? "offwhite" : "white"}
              className="group/solution py-20 md:py-28 lg:py-32"
            >
              <div className="shell">
                <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                  {/* Copy */}
                  <div
                    className={cn(
                      "lg:col-span-6",
                      flipped ? "lg:order-2 lg:col-start-7" : "lg:order-1",
                    )}
                  >
                    <Reveal y={14}>
                      <span className="font-display text-[clamp(3.5rem,7vw,7rem)] font-bold leading-none tracking-tightest text-line transition-colors duration-[700ms] ease-brand group-hover/solution:text-brand/35">
                        {solution.number}
                      </span>
                    </Reveal>

                    <RevealText
                      text={solution.title}
                      as="h2"
                      className="display-sm mt-4 max-w-[14ch] transition-colors duration-700 ease-brand group-hover/solution:text-brand"
                    />

                    <Reveal delay={0.14} className="mt-8">
                      <p className="lede max-w-xl">{solution.body}</p>
                    </Reveal>
                  </div>

                  {/* Visual */}
                  <div
                    className={cn(
                      "lg:col-span-5",
                      flipped ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-8",
                    )}
                  >
                    <RevealMedia className="rounded-[2px] border border-line">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white lg:aspect-square">
                        <HalftoneFlow
                          mode="light"
                          palette="brand"
                          speed={0.45 + i * 0.06}
                          dotSize={8 + i}
                          className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-brand group-hover/solution:scale-[1.04]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/85 to-transparent"
                        />
                        {Icon ? (
                          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[900ms] ease-brand group-hover/solution:scale-[1.04]">
                            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-brand/15 bg-white/80 shadow-[0_18px_40px_-16px_rgba(10,10,10,0.2)] backdrop-blur-sm md:h-32 md:w-32">
                              <Icon className="h-14 w-14 text-brand md:h-16 md:w-16" />
                            </div>
                          </div>
                        ) : null}
                        <div className="absolute inset-0 flex items-end p-7">
                          <span className="kicker">{solution.title}</span>
                        </div>
                      </div>
                    </RevealMedia>
                  </div>
                </div>
              </div>
            </Section>
          );
        })}
      </div>

      <Section tone="ink" className="py-24 md:py-28">
        <div className="shell">
          <RevealText
            text={"Talk to us\nabout your brand."}
            as="h2"
            className="display-sm text-white"
            lines={[<span key="accent" className="text-corn">Talk to us</span>, "about your brand."]}
          />
          <Reveal delay={0.16} className="mt-10">
            <GlassButton href={solutions.cta.href} tone="onDark">
              {solutions.cta.label}
            </GlassButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

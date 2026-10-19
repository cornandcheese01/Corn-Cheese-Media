import type { Metadata } from "next";
import { type ComponentType } from "react";

import { GlassButton } from "@/components/ui/glass-button";
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

const SOLUTION_IMAGE_MAP: Record<string, string> = {
  "social-media-optimization": "/solutions/social-media.jpg",
  "influencer-marketing": "/solutions/influencer.jpg",
  "performance-marketing": "/solutions/performance.jpg",
  "website-development": "/solutions/website.jpg",
  "manufacturing-marketing": "/solutions/manufacturing.jpg",
  "deep-tech-marketing": "/solutions/deep-tech.jpg",
};

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
                    <RevealMedia className="rounded-[4px] border border-line shadow-lg">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink lg:aspect-square">
                        <img
                          src={SOLUTION_IMAGE_MAP[solution.slug] || "/solutions/default.jpg"}
                          alt={solution.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover/solution:scale-[1.05]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20"
                        />
                        {Icon ? (
                          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[900ms] ease-brand group-hover/solution:scale-[1.05]">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-black/40 shadow-xl backdrop-blur-md md:h-28 md:w-28">
                              <Icon className="h-12 w-12 text-white md:h-14 md:w-14" />
                            </div>
                          </div>
                        ) : null}
                        <div className="absolute inset-0 flex items-end p-7">
                          <span className="kicker text-white/90">{solution.title}</span>
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

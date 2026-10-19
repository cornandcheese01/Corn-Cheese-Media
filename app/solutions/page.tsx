import type { Metadata } from "next";
import { Fragment, type ComponentType } from "react";

import { GlassButton } from "@/components/ui/glass-button";
import {
  DeepTechIcon,
  InfluencerIcon,
  ManufacturingIcon,
  PRDigitalIcon,
  PerformanceIcon,
  SocialIcon,
  SolarIcon,
  VideoIcon,
  WebsiteIcon,
} from "@/components/ui/motifs";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, RevealMedia, RevealText } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { solutions, type SolutionCategory } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions",
  description: solutions.items.map((s) => s.title).join(", "),
};

/**
 * One curated icon per solution — see `components/ui/motifs.tsx`. Same line
 * weight and stroke across all nine, laid over each service's photograph.
 * (Photographs live on the service itself in `content/site.ts`, so they stay
 * attached to the right service however the list is ordered.)
 */
const SOLUTION_ICON: Record<string, ComponentType<{ className?: string }>> = {
  "social-media-optimization": SocialIcon,
  "performance-marketing": PerformanceIcon,
  "influencer-marketing": InfluencerIcon,
  "manufacturing-marketing": ManufacturingIcon,
  "deep-tech-marketing": DeepTechIcon,
  "solar-renewable-energy-marketing": SolarIcon,
  "video-creative-production": VideoIcon,
  "website-development": WebsiteIcon,
  "marketing-pr-digital": PRDigitalIcon,
};

/** Running index of each category's first service, so the light/off-white rhythm continues across all nine. */
const CATEGORY_OFFSET = solutions.categories.map((_, ci) =>
  solutions.categories.slice(0, ci).reduce((n, c) => n + c.items.length, 0),
);

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow={solutions.eyebrow} headline={"Solutions\nbuilt for you."}>
        <CategoryNav />
      </PageHero>

      {/* Parent category first, its services underneath. */}
      {solutions.categories.map((category, ci) => (
        <Fragment key={category.slug}>
          <CategoryBand category={category} />

          {category.items.map((solution, si) => {
            const i = CATEGORY_OFFSET[ci] + si;
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
                        <span className="font-display text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-none tracking-tightest text-line transition-colors duration-[700ms] ease-brand group-hover/solution:text-brand/35">
                          {solution.number}
                        </span>
                      </Reveal>

                      <RevealText
                        text={solution.title}
                        as="h3"
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
                            src={solution.image}
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
        </Fragment>
      ))}

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

/* -------------------------------------------------------------------- */

/** The three parent categories as a jump menu, directly under the page headline. */
function CategoryNav() {
  return (
    <Reveal delay={0.3} amount={0.05} className="mt-14 md:mt-20">
      <nav aria-label="Solution categories">
        <ol className="grid border-t border-line md:grid-cols-3">
          {solutions.categories.map((category) => (
            <li
              key={category.slug}
              className="border-b border-line md:border-b-0 md:border-r md:last:border-r-0"
            >
              <a
                href={`#${category.slug}`}
                data-cursor="link"
                className="group flex items-start gap-4 py-5 md:px-6 md:py-7 md:first:pl-0"
              >
                <span className="font-display text-[0.75rem] font-semibold tabular-nums tracking-[0.18em] text-brand">
                  {category.number}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[1.05rem] font-semibold leading-snug tracking-tightest text-ink transition-colors duration-500 ease-brand group-hover:text-brand">
                    {category.title}
                  </span>
                  <span className="mt-1 block font-body text-[0.85rem] text-grey">
                    {category.items.length} solutions
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-lg text-grey transition-[color,transform] duration-500 ease-brand group-hover:translate-y-0.5 group-hover:text-brand"
                >
                  &darr;
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Reveal>
  );
}

/**
 * The parent category: number, title and introduction, with its services
 * listed as an index that links down to each one. A dark band, like the page's
 * closing CTA, so a category reads as a clear step above the light service
 * sections beneath it.
 */
function CategoryBand({ category }: { category: SolutionCategory }) {
  return (
    <Section tone="ink" id={category.slug} className="py-20 md:py-28 lg:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal y={14} amount={0.1}>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-8 bg-corn" aria-hidden="true" />
                <span className="kicker text-white/60">Category {category.number}</span>
              </div>
            </Reveal>

            <RevealText
              text={category.title}
              as="h2"
              className="font-display text-[clamp(2.25rem,5vw,5.25rem)] font-semibold leading-[0.98] tracking-tightest text-white"
            />

            <Reveal delay={0.14} amount={0.1} className="mt-8">
              <p className="lede max-w-xl text-white/70">{category.intro}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <Reveal delay={0.2} amount={0.1}>
              <ol className="border-b border-white/15">
                {category.items.map((item) => (
                  <li key={item.slug} className="border-t border-white/15">
                    <a
                      href={`#${item.slug}`}
                      data-cursor="link"
                      className="group flex items-baseline gap-5 py-4"
                    >
                      <span className="font-display text-[0.75rem] font-semibold tabular-nums tracking-[0.18em] text-corn">
                        {item.number}
                      </span>
                      <span className="flex-1 font-display text-[1.05rem] font-semibold leading-snug tracking-tightest text-white transition-colors duration-500 ease-brand group-hover:text-corn">
                        {item.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-lg text-white/40 transition-[color,transform] duration-500 ease-brand group-hover:translate-y-0.5 group-hover:text-corn"
                      >
                        &darr;
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

import type { Metadata } from "next";

import { GlassButton } from "@/components/ui/glass-button";
import { LogoMark } from "@/components/ui/logo";
import { StrategyMotif } from "@/components/ui/motifs";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, RevealRule, RevealText } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { site, whoWeAre } from "@/content/site";

export const metadata: Metadata = {
  title: "Who We Are",
  description: whoWeAre.fusion,
};

export default function WhoWeArePage() {
  return (
    <>
      <PageHero
        eyebrow={whoWeAre.eyebrow}
        headline={"Why we're called\nCorn & Cheese\nMedia."}
        tint
        visual={
          <StrategyMotif className="h-auto w-full max-w-md text-ink opacity-[0.07]" />
        }
      />

      {/* The two halves of the name, set as facing editorial pages. */}
      <Section tone="offwhite" className="relative overflow-hidden">
        {/* The mark as a quiet motif, oversized and cropped by the section. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.05] lg:block"
        >
          <LogoMark size={720} />
        </div>

        <div className="shell relative">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <RevealText
                text={whoWeAre.corn.word}
                as="h2"
                className="display text-corn underline decoration-4 underline-offset-[0.09em]"
              />
              <RevealRule className="my-8" />
              <Reveal delay={0.12}>
                <p className="lede max-w-lg">{whoWeAre.corn.body}</p>
              </Reveal>
            </div>

            <div className="lg:pt-28">
              <RevealText
                text={whoWeAre.cheese.word}
                as="h2"
                className="display text-cheese underline decoration-4 underline-offset-[0.09em]"
              />
              <RevealRule className="my-8" />
              <Reveal delay={0.12}>
                <p className="lede max-w-lg">{whoWeAre.cheese.body}</p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} className="mt-24 md:mt-32">
            <p className="mx-auto max-w-4xl text-center font-display text-[clamp(1.35rem,2.6vw,2.3rem)] font-semibold leading-[1.3] tracking-tightest text-ink">
              {whoWeAre.fusion}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* A Note, Directly From Us - the page's blue band */}
      <Section tone="blue">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <RevealText
                  text={"A Note,\nDirectly\nFrom Us"}
                  as="h2"
                  className="display-sm text-white"
                />
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              {whoWeAre.note.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08} className="mb-8 last:mb-0">
                  <p className="lede text-[1.125rem] text-white/90 md:text-[1.3rem]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={0.3} className="mt-14">
                <RevealRule className="mb-7 bg-white/40" />
                <p className="kicker !text-white">{whoWeAre.signature}</p>
              </Reveal>

              <Reveal delay={0.36} className="mt-12">
                <GlassButton href={site.cta.href} tone="onDark">{site.cta.label}</GlassButton>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

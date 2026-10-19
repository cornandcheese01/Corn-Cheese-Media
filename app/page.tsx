import { ClosingCta } from "@/components/sections/closing-cta";
import { FoundersNote } from "@/components/sections/founders-note";
import { Hero } from "@/components/sections/hero";
import { SolutionsList } from "@/components/sections/solutions-list";
import { Testimonials } from "@/components/sections/testimonials";
import { WorkStrip } from "@/components/sections/work-grid";
import { GlassButton } from "@/components/ui/glass-button";
import { Reveal, RevealRule, RevealText } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import {
  solutionsTeaser,
  whatWeDoTeaser,
  whoWeAreTeaser,
  work,
  workTeaser,
} from "@/content/site";

/**
 * HOMEPAGE
 * 01 Opening screen · 02 Hero · 03 What We Do · 04 Who We Are ·
 * 05 Solutions · 06 Founders Note · 07 Work · 08 Testimonials · 09 Closing CTA
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 03 — WHAT WE DO -------------------------------------------- */}
      <Section>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHead kicker={whatWeDoTeaser.kicker}>
                <RevealText
                  text={"We look at data\nbefore we look\nfor ideas."}
                  as="h2"
                  className="display"
                />
              </SectionHead>
            </div>

            <div className="lg:col-span-5 lg:pt-4">
              <Reveal delay={0.12}>
                <p className="lede max-w-xl">{whatWeDoTeaser.body}</p>
              </Reveal>
              <Reveal delay={0.22} className="mt-10">
                <GlassButton href={whatWeDoTeaser.cta.href}>
                  {whatWeDoTeaser.cta.label}
                </GlassButton>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* 04 — WHO WE ARE -------------------------------------------- */}
      <Section tone="offwhite">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead kicker={whoWeAreTeaser.kicker}>
                <RevealText
                  text={"Corn &\nCheese\nMedia"}
                  as="h2"
                  className="display"
                />
              </SectionHead>
            </div>

            <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <p className="font-display text-[clamp(1.35rem,2.4vw,2.1rem)] font-semibold leading-[1.25] tracking-tightest text-ink">
                  {whoWeAreTeaser.body}
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <GlassButton href={whoWeAreTeaser.cta.href}>
                  {whoWeAreTeaser.cta.label}
                </GlassButton>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* 05 — SOLUTIONS --------------------------------------------- */}
      <Section>
        <div className="shell">
          <SectionHead kicker={solutionsTeaser.kicker} className="mb-16 md:mb-20">
            <RevealText
              text={"One team for everything\nyour brand needs."}
              as="h2"
              className="display"
            />
          </SectionHead>

          <SolutionsList
            items={solutionsTeaser.items.map((item) => ({ ...item, href: "/solutions" }))}
          />

          <Reveal delay={0.1} className="mt-16">
            <GlassButton href={solutionsTeaser.cta.href}>
              {solutionsTeaser.cta.label}
            </GlassButton>
          </Reveal>
        </div>
      </Section>

      {/* 06 — FOUNDERS NOTE ------------------------------------------ */}
      <FoundersNote />

      {/* 07 — WORK --------------------------------------------------- */}
      <Section tone="offwhite" className="py-24 md:py-28 lg:py-32">
        <div className="shell">
          <SectionHead kicker={workTeaser.kicker}>
            <RevealText
              text={"Brands who trusted us\nwith the truth."}
              as="h2"
              className="display-sm"
            />
          </SectionHead>

          <RevealRule className="my-14 bg-line" />

          <WorkStrip clients={work.clients} />
        </div>
      </Section>

      {/* 08 — TESTIMONIALS ------------------------------------------ */}
      <Testimonials />

      {/* 09 — CLOSING CTA ------------------------------------------- */}
      <ClosingCta />
    </>
  );
}

"use client";

import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import {
  testimonials,
  testimonialsEnabled,
  testimonialsSection,
} from "@/content/testimonials";

/**
 * 07 — TESTIMONIALS
 *
 * Wraps the Circular Testimonials component into the site's own rhythm: the
 * standard kicker + oversized headline, site gutters, off-white ground. The
 * component keeps its interaction; only its surroundings are ours.
 *
 * Renders nothing while `testimonialsEnabled` is false — see
 * content/testimonials.ts for the content status.
 */

export function Testimonials() {
  if (!testimonialsEnabled || testimonials.length === 0) return null;

  return (
    <Section tone="white">
      <div className="shell">
        <SectionHead kicker={testimonialsSection.kicker}>
          <RevealText
            text={testimonialsSection.headline}
            as="h2"
            className="display-sm text-corn"
          />
        </SectionHead>

        <Reveal className="mt-16 md:mt-20" delay={0.1}>
          <CircularTestimonials testimonials={testimonials} />
        </Reveal>
      </div>
    </Section>
  );
}

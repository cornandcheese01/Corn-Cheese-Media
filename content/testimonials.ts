/**
 * TESTIMONIAL CONTENT — AWAITING APPROVED COPY
 * =======================================================================
 * The approved Website Content PDF contains NO testimonial copy, and the
 * content rules forbid inventing quotes, names or designations. So the
 * Testimonials section is built and wired, but runs on the placeholders
 * below — exactly as the PDF instructs for the client logos ("leave
 * placeholders sized equally").
 *
 * TO GO LIVE
 * ----------
 * 1. Replace each entry with the real quote, name and designation.
 * 2. Drop the photo into /public/testimonials and set `src` to its path.
 *    `src: null` renders a typographic monogram plate instead of a photo —
 *    the circular arrangement and all motion behave identically either way,
 *    so the section works before the photography arrives.
 * 3. Delete `placeholder: true`.
 *
 * TO HIDE THE SECTION until content is signed off, set:
 *    export const testimonialsEnabled = false;
 */

export const testimonialsEnabled = true;

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  /** Path under /public, or null for the typographic fallback plate. */
  src: string | null;
  placeholder?: boolean;
};

export const testimonialsSection = {
  kicker: "Testimonials",
  headline: "Let's talk & data",
} as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Approved testimonial copy pending. This placeholder holds the layout, the word by word reveal and the circular arrangement so the section can be reviewed before the real quotes are signed off.",
    name: "Client Name",
    designation: "Role, Company",
    src: null,
    placeholder: true,
  },
  {
    quote:
      "Approved testimonial copy pending. Replace this entry in content/testimonials.ts with the real quote, name, designation and photograph.",
    name: "Client Name",
    designation: "Role, Company",
    src: null,
    placeholder: true,
  },
  {
    quote:
      "Approved testimonial copy pending. The component supports any number of testimonials; three keeps the left, centre and right plates all filled.",
    name: "Client Name",
    designation: "Role, Company",
    src: null,
    placeholder: true,
  },
];

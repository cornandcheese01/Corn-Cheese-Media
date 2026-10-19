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
  headline: "",
} as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Got our website + ad creatives done together which saved us so much back and forth between different people. just easier",
    name: "Kavya Iyer",
    designation: "Director",
    src: "/testimonials/testimonial_1.png",
  },
  {
    quote:
      "Had them promote our fest sponsorship and turnout was honestly better than last year when we did it ourselves. would recommend to anyone running an event",
    name: "Imran Sheikh",
    designation: "Founder",
    src: "/testimonials/testimonial_2.png",
  },
  {
    quote:
      "we did an influencer thing with them for diwali and i was nervous it’d feel fake/sponsored. it didn’t. people actually commented asking where to buy",
    name: "Anushka Maheshwari",
    designation: "Brand Manager",

    src: "/testimonials/testimonial_3.png",
  },
];

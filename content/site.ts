/**
 * SINGLE SOURCE OF TRUTH FOR ALL WEBSITE COPY.
 *
 * Every string below is transcribed verbatim from the approved
 * "Corn & Cheese Media — Website Content" PDF (docs/website-content.txt).
 *
 * Do not add claims, statistics, clients, case studies, pricing or services
 * that are not in that document. If copy needs to change, change it here —
 * components read from this file and never hardcode copy.
 */

export const site = {
  name: "Corn & Cheese Media",
  /** Home is not a menu item — the logo returns users here from any page. */
  nav: [
    { label: "What We Do", href: "/what-we-do" },
    { label: "Who We Are", href: "/who-we-are" },
    { label: "Solutions", href: "/solutions" },
    { label: "Work", href: "/work" },
  ],
  cta: { label: "Contact Now", href: "/contact" },
} as const;

export const contact = {
  email: "hello@cornandcheese.com",
  /**
   * NOTE FROM THE CONTENT PDF: phone number pulled from the official brochure.
   * Reconfirm against the dictated version (93222 59284) before publishing —
   * the last six digits differ.
   */
  phoneDisplay: "+91 93225 59284",
  phoneHref: "+919322559284",
  whatsappDisplay: "+91 93225 59284",
  whatsappHref: "919322559284",
  studio: "Mumbai. Pune.",
} as const;

/* ------------------------------------------------------------------ */
/* PAGE 1 — HOMEPAGE                                                   */
/* ------------------------------------------------------------------ */

export const opening = {
  quote:
    "A man who stops advertising to save money is like a man who stops a clock to save time.",
  attribution: "David Ogilvy",
} as const;

export const hero = {
  headline: "Hi, we're Corn & Cheese Media.",
  subheadline:
    "We build on data, not trends. Combining consumer insight with sharp creative and performance execution for manufacturing, deep tech and category defining businesses across India.",
  cta: { label: "Start With The Truth", href: "/what-we-do" },
} as const;

export const whatWeDoTeaser = {
  kicker: "What We Do",
  headline: "We look at data before we look for ideas.",
  body: "We're a data plus advertising company. Before we write a single line of copy, we study how people actually choose, think and behave with a product or service like yours. That's what tells us what will actually work, not what's trending this week.",
  cta: { label: "See What We Do", href: "/what-we-do" },
} as const;

export const whoWeAreTeaser = {
  kicker: "Who We Are",
  headline: "Corn & Cheese Media",
  body: "Two ordinary things, put together the right way, become something people crave. That's the only kind of brand we know how to build.",
  cta: { label: "Know Us Better", href: "/who-we-are" },
} as const;

export const solutionsTeaser = {
  kicker: "Solutions",
  headline: "One team for everything your brand needs.",
  cta: { label: "Explore Solutions", href: "/solutions" },
  items: [
    {
      title: "Social Media Optimization",
      line: "Profiles and engagement tuned to grow organically.",
    },
    {
      title: "Influencer Marketing",
      line: "Paid and barter creator partnerships that match your category.",
    },
    {
      title: "Performance Marketing",
      line: "Meta and Google Ads built to convert, not just impress.",
    },
    {
      title: "Website Development",
      line: "Fast websites built to convert, not just to inform.",
    },
    {
      title: "Manufacturing Marketing",
      line: "Built for how manufacturing businesses actually sell.",
    },
    {
      title: "Deep Tech Marketing",
      line: "For products too complex for surface level marketing.",
    },
  ],
} as const;

export const workTeaser = {
  kicker: "Work",
  headline: "Brands who trusted us with the truth.",
} as const;

export const closing = {
  headline:
    "If your brand's ready to grow on data instead of guesswork, let's talk.",
  cta: { label: "Contact Now", href: "/contact" },
} as const;

/* ------------------------------------------------------------------ */
/* PAGE 2 — WHAT WE DO                                                 */
/* ------------------------------------------------------------------ */

export const whatWeDo = {
  eyebrow: "What We Do",
  headline: "We start with your consumer.",
  intro:
    "We're a data plus advertising company. Every project we take on begins the same way, by understanding your consumer before anything else gets built.",
  processTitle: "Our Process",
  steps: [
    {
      number: "01",
      step: "Step One",
      title: "We Look At The Data",
      body: "We start by getting into real data and real behaviour, not internal assumptions about who your customer is or what they want.",
    },
    {
      number: "02",
      step: "Step Two",
      title: "We Find What Matters",
      body: "From that data we pull out the pattern that actually explains why people buy your product, or don't. That becomes the one truth everything else is built on.",
    },
    {
      number: "03",
      step: "Step Three",
      title: "We Build The Strategy",
      body: "AI helps us move through this fast, but every strategic call on your brand is made by our team, not a machine.",
    },
  ],
  practiceTitle: "What This Looks Like In Practice",
  practiceBody:
    "This process runs behind everything we do for a client. That includes brand strategy and identity, always on social, paid influencer and performance campaigns, and the website that has to carry all of it. We don't split the brand side from the growth side. One team runs both, so nothing gets built apart from everything else.",
  cta: { label: "See Our Solutions", href: "/solutions" },
} as const;

/* ------------------------------------------------------------------ */
/* PAGE 3 — WHO WE ARE                                                 */
/* ------------------------------------------------------------------ */

export const whoWeAre = {
  eyebrow: "Who We Are",
  headline: "Why we're called Corn & Cheese Media.",
  corn: {
    word: "Corn",
    body: "Corn is raw, pulled straight from the ground. It's the real, unfiltered evidence of how people actually think, choose and behave.",
  },
  cheese: {
    word: "Cheese",
    body: "Cheese is crafted using that same raw material, transformed through time and skill into something richer than where it started. It's strategy, design and creative judgement.",
  },
  fusion:
    "On their own, both are ordinary. Put together, they become something people can't leave alone. That's the only kind of brand building we do. Insight and craft, fused into one process, not split across two departments.",
  noteTitle: "A Note, Directly From Us",
  note: [
    "We started Corn & Cheese Media because we kept watching good businesses hire marketing before they'd earned the right to be understood.",
    "Every founder we respect makes decisions on evidence: unit economics, retention, customer calls. Then hands their brand to an agency that works entirely on instinct. We built the version of this company that treats brand building with the same rigor: research first, strategy second, creativity in service of both.",
    "AI gives us the speed to do this without the old cost or timeline. It has never been an excuse to skip the thinking.",
  ],
  signature: "The Founding Team, Corn & Cheese Media",
} as const;

/* ------------------------------------------------------------------ */
/* PAGE 4 — SOLUTIONS                                                  */
/* ------------------------------------------------------------------ */

export const solutions = {
  eyebrow: "Solutions",
  headline: "Solutions built for you.",
  cta: { label: "Talk to Us About Your Brand", href: "/contact" },
  items: [
    {
      number: "01",
      slug: "social-media-optimization",
      title: "Social Media Optimization",
      body: "Your profiles, tuned to actually earn reach, not just post on schedule. We fix what's stopping organic growth: positioning on the profile itself, content rhythm and the engagement patterns platforms reward.",
    },
    {
      number: "02",
      slug: "influencer-marketing",
      title: "Influencer Marketing",
      body: "Creator partnerships matched to your category and audience, run both paid and barter. We pick creators whose audience overlaps with your buyer, not whoever has the biggest following.",
    },
    {
      number: "03",
      slug: "performance-marketing",
      title: "Performance Marketing",
      body: "Meta Ads and Google Ads built around a conversion goal, not a vanity metric. Every campaign is structured, tested and optimized against what it actually needs to do: leads, sales or sign ups.",
    },
    {
      number: "04",
      slug: "website-development",
      title: "Website Development",
      body: "Fast websites built to convert, that represent the brand properly instead of just hosting information. Built to move a visitor toward a decision, not just describe the business to them.",
    },
    {
      number: "05",
      slug: "manufacturing-marketing",
      title: "Manufacturing Marketing",
      body: "Marketing built for how manufacturing businesses actually sell. Long consideration cycles, technical buyers and trust built over time. We specialize in this category and understand what actually moves a manufacturing buyer, which most agencies built only for consumer brands don't.",
    },
    {
      number: "06",
      slug: "deep-tech-marketing",
      title: "Deep Tech Marketing",
      body: "For founders building on deep tech and AI who need their product to reach the right audience, not just any audience. Our team takes the time to understand how the product is actually built, so the marketing goes past the surface and speaks credibly to a technical buyer.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* PAGE 5 — WORK                                                       */
/* ------------------------------------------------------------------ */

/**
 * NOTE FROM THE CONTENT PDF: this page displays client logos only, no case
 * study copy. Logos are to be supplied separately (Kasturi Pakka logo pending),
 * so each brand renders as an equally sized wordmark placeholder until a file
 * is dropped into /public/brand/clients and referenced by `logo` below.
 */
export const work = {
  eyebrow: "Work",
  headline: "Brands who trusted us with the truth.",
  clients: [
    { name: "Vega Beauty", logo: null },
    { name: "Neurobroma", logo: null },
    { name: "Viraj Profiles Limited", logo: null },
    { name: "Kasturi Pakka", logo: null },
    { name: "Kalpataru Homeopathy Clinic", logo: null },
  ] as { name: string; logo: string | null }[],
  ctaLead: "Want to be the next name here?",
  cta: { label: "Contact Now", href: "/contact" },
} as const;

/* ------------------------------------------------------------------ */
/* PAGE 6 — CONTACT NOW                                                */
/* ------------------------------------------------------------------ */

export const contactPage = {
  eyebrow: "Contact Now",
  headline: "Let's talk about your brand.",
  body: "Tell us where your brand is stuck, or where it's ready to grow. We'll get back to you.",
  serviceOptions: solutions.items.map((s) => s.title),
} as const;

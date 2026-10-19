/**
 * SINGLE SOURCE OF TRUTH FOR ALL WEBSITE COPY.
 *
 * Every string below is transcribed verbatim from the approved
 * "Corn & Cheese Media — Website Content" PDF (docs/website-content.txt).
 *
 * Do not add claims, statistics, clients, case studies, pricing or services
 * that are not in that document.
 *
 * ONE EXCEPTION: three of the nine solutions and the three solution-category
 * titles/introductions come from the solutions-architecture brief, not the
 * PDF — see the note above `solutionCategories`. If copy needs to change, change it here —
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
    "We use data, not just trends, to build better marketing. By combining consumer insights, creative thinking, and performance-driven execution, we help manufacturing, deep tech, and ambitious businesses grow across India and globe.",
  cta: { label: "Start With The Truth", href: "/what-we-do" },
} as const;

export const whatWeDoTeaser = {
  kicker: "What We Do",
  headline: "We look at data before we look for ideas.",
  body: "We're a data + advertising company. Before we build a strategy, design a campaign, or launch an ad, we study how people think, what they value, and what drives their decisions. We turn those insights into smarter strategies, sharper creative, and advertising that delivers real business results.",
  cta: { label: "See What We Do", href: "/what-we-do" },
} as const;

export const whoWeAreTeaser = {
  kicker: "Who We Are",
  headline: "Corn & Cheese Media",
  body: "Two ordinary things, put together the right way, can create something extraordinary. That's the power of combining data, creativity, and strategy to make marketing work harder.",
  cta: { label: "Know Us Better", href: "/who-we-are" },
} as const;

/* ------------------------------------------------------------------ */
/* SOLUTIONS — ONE SOURCE FOR THE HOMEPAGE INDEX AND THE SOLUTIONS PAGE */
/* ------------------------------------------------------------------ */

/**
 * Nine solutions in three parent categories. The categories are groupings,
 * not services: they carry a title and an introduction, and own an ordered
 * list of the services beneath them. Order here IS the display order, and the
 * big numbers 01-09 run continuously across the categories.
 *
 * COPY PROVENANCE
 *   - The first six solutions (social, influencer, performance, website,
 *     manufacturing, deep tech) keep their approved PDF copy untouched.
 *   - Solar & Renewable Energy Marketing, Video & Creative Production and
 *     Marketing, PR & Digital are NOT in the PDF. Their title, body and line
 *     come from the solutions-architecture brief (body verbatim; `line` is a
 *     condensed one-liner of that same body for the homepage index). Reconcile
 *     them with the content document before publishing.
 *   - Category titles and introductions are the brief's, verbatim.
 *
 * IMAGES travel with the service they belong to, never by list position —
 * reordering must not move a photo onto the wrong service. The three new
 * services use the generic default photo until dedicated photography exists:
 * drop the file into /public/solutions and change `image` here.
 */
export type Solution = {
  number: string;
  slug: string;
  title: string;
  /** One line, for the homepage index. */
  line: string;
  /** Full description, for the Solutions page. */
  body: string;
  image: string;
};

export type SolutionCategory = {
  number: string;
  slug: string;
  title: string;
  intro: string;
  items: readonly Solution[];
};

const PLACEHOLDER_IMAGE = "/solutions/default.jpg";

export const solutionCategories: readonly SolutionCategory[] = [
  {
    number: "01",
    slug: "growth-marketing",
    title: "Growth & Marketing",
    intro:
      "Cross-industry marketing capabilities that help businesses build visibility, reach audiences, generate demand, and grow.",
    items: [
      {
        number: "01",
        slug: "social-media-optimization",
        title: "Social Media Optimization",
        line: "Profiles and engagement tuned to grow organically.",
        body: "Your profiles, tuned to actually earn reach, not just post on schedule. We fix what's stopping organic growth: positioning on the profile itself, content rhythm and the engagement patterns platforms reward.",
        image: "/solutions/solution_1.png",
      },
      {
        number: "02",
        slug: "performance-marketing",
        title: "Performance Marketing",
        line: "Meta and Google Ads built to convert, not just impress.",
        body: "Meta Ads and Google Ads built around a conversion goal, not a vanity metric. Every campaign is structured, tested and optimized against what it actually needs to do: leads, sales or sign ups.",
        image: "/solutions/performance.jpg",
      },
      {
        number: "03",
        slug: "influencer-marketing",
        title: "Influencer Marketing",
        line: "Paid and barter creator partnerships that match your category.",
        body: "Creator partnerships matched to your category and audience, run both paid and barter. We pick creators whose audience overlaps with your buyer, not whoever has the biggest following.",
        image: "/solutions/influencer.jpg",
      },
    ],
  },
  {
    number: "02",
    slug: "industry-specializations",
    title: "Industry Specializations",
    intro:
      "Specialized marketing solutions designed around the unique audiences, buying journeys, and business challenges of specific industries.",
    items: [
      {
        number: "04",
        slug: "manufacturing-marketing",
        title: "Manufacturing Marketing",
        line: "Built for how manufacturing businesses actually sell.",
        body: "Marketing built for how manufacturing businesses actually sell. Long consideration cycles, technical buyers and trust built over time. We specialize in this category and understand what actually moves a manufacturing buyer, which most agencies built only for consumer brands don't.",
        image: "/solutions/manufacturing.jpg",
      },
      {
        number: "05",
        slug: "deep-tech-marketing",
        title: "Deep Tech Marketing",
        line: "For products too complex for surface level marketing.",
        body: "For founders building on deep tech and AI who need their product to reach the right audience, not just any audience. Our team takes the time to understand how the product is actually built, so the marketing goes past the surface and speaks credibly to a technical buyer.",
        image: "/solutions/deep-tech.jpg",
      },
      {
        number: "06",
        slug: "solar-renewable-energy-marketing",
        title: "Solar & Renewable Energy Marketing",
        line: "Marketing for solar manufacturers, installers, distributors and clean-energy businesses.",
        body: "Marketing for solar manufacturers, installers, distributors, clean-energy businesses, and renewable technology companies.",
        image: "/solutions/renew.PNG",
      },
    ],
  },
  {
    number: "03",
    slug: "creative-digital-solutions",
    title: "Creative & Digital Solutions",
    intro:
      "Production, digital platforms, and communication capabilities that help businesses express their value and deliver their marketing effectively.",
    items: [
      {
        number: "07",
        slug: "video-creative-production",
        title: "Video & Creative Production",
        line: "End-to-end production, from concept and shoots to ad films and edits.",
        body: "End-to-end production, including concept development, pre-production, on-location shoots, product shoots, ad films, photography, editing, and creative asset development.",
        image: PLACEHOLDER_IMAGE,
      },
      {
        number: "08",
        slug: "website-development",
        title: "Website Development",
        line: "Fast websites built to convert, not just to inform.",
        body: "Fast websites built to convert, that represent the brand properly instead of just hosting information. Built to move a visitor toward a decision, not just describe the business to them.",
        image: "/solutions/website.jpg",
      },
      {
        number: "09",
        slug: "marketing-pr-digital",
        title: "Marketing, PR & Digital",
        line: "Brand communications, public relations and media outreach.",
        body: "Brand communications, public relations, media outreach, digital presence, and integrated communication initiatives.",
        image: PLACEHOLDER_IMAGE,
      },
    ],
  },
];

export const solutionsTeaser = {
  kicker: "Solutions",
  headline: "One team for everything your brand needs.",
  cta: { label: "Explore Solutions", href: "/solutions" },
  /** The same nine services in the same order, each tagged with its parent category. */
  items: solutionCategories.flatMap((category) =>
    category.items.map((item) => ({
      number: item.number,
      title: item.title,
      line: item.line,
      image: item.image,
      group: {
        number: category.number,
        title: category.title,
        intro: category.intro,
      },
    })),
  ),
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
  /* Step photos reuse existing site photography (see /public/solutions); swap `image` per step. */
  processTitle: "Our Process",
  steps: [
    {
      number: "01",
      step: "Step One",
      title: "We Look At The Data",
      image: "/solutions/performance.jpg",
      imagePosition: "50% 50%",
      body: "We start by getting into real data and real behaviour, not internal assumptions about who your customer is or what they want.",
    },
    {
      number: "02",
      step: "Step Two",
      title: "We Find What Matters",
      image: "/solutions/influencer.jpg",
      imagePosition: "50% 28%",
      body: "From that data we pull out the pattern that actually explains why people buy your product, or don't. That becomes the one truth everything else is built on.",
    },
    {
      number: "03",
      step: "Step Three",
      title: "We Build The Strategy",
      image: "/solutions/default.jpg",
      imagePosition: "50% 50%",
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
  /** Parent categories, each owning its ordered services. */
  categories: solutionCategories,
  /** Every service, flat, in display order — the contact form's options derive from this. */
  items: solutionCategories.flatMap((category) => category.items),
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

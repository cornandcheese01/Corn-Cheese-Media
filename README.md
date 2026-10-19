# Corn & Cheese Media — Website

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build && npm run start
```

```bash
npm run typecheck
npm run lint
```

> **Windows note:** keep the project in a folder whose name has no `&` in it.
> npm's `.cmd` shims split on `&`, so from a path like `D:\Corn&cheese` every
> script fails with *"'cheese\node_modules\.bin\' is not recognized"*. If you
> ever hit that, either rename the folder or call Node directly:
> `node node_modules/next/dist/bin/next dev`.

Do not run `build` while `dev` is running — they share `.next` and the dev
server will start serving unstyled pages. Stop dev first, or `rm -rf .next`
afterwards.

---

## Content

**`content/site.ts` is the single source of truth for all website copy.**
Every string is transcribed verbatim from the approved Website Content PDF,
which is kept alongside its extracted text in `docs/`. Components read from
this file and never hardcode copy.

All 46 substantive copy strings were audited against the PDF and match
verbatim. Do not add pricing, statistics, clients, case studies or services
that are not in that document.

Two content items need the client's attention:

| Item | Status |
| --- | --- |
| Phone number | The PDF flags that the brochure number (`93225 59284`) and the dictated version (`93222 59284`) differ in the last six digits. The brochure number is live in `content/site.ts` — reconfirm before publishing. |
| Client logos | The PDF states logos are supplied separately (Kasturi Pakka pending). All five brands render as equally sized wordmark plates. Drop files into `public/brand/clients/` and set `logo` in `work.clients`. |
| Testimonials | **The PDF contains no testimonial copy.** See below. |

### Testimonials

The Testimonials section is fully built but runs on clearly marked
placeholders, because inventing quotes or attributing them to real clients
would break the content rules. See `content/testimonials.ts`:

- Replace each entry with the real quote, name and designation.
- Add photos to `public/testimonials/` and set `src`. `src: null` renders a
  typographic monogram plate instead, so the section works before the
  photography arrives.
- To hide the section until sign-off, set `testimonialsEnabled = false`.

### Copy not taken from the PDF

Structural and navigational labels only — no claims: `Scroll`, `Navigate`,
`Get in touch`, `Category 01–03`, `Let's talk & data`, form field labels,
validation messages and aria-labels. The footer tagline ("A data plus
advertising") and the Founders Note (a teaser of the approved "A Note,
Directly From Us" — see below) are the two content decisions made this
session; everything else in `content/site.ts` is unchanged.

---

## Brand assets

`public/brand/` holds three files derived from the supplied logo — the artwork,
its proportions and its blue are untouched:

| File | Use |
| --- | --- |
| `logo-dark.png` | Original black wordmark. White and off-white backgrounds. |
| `logo-light.png` | White wordmark. The near-black hero and dark sections. |
| `mark.png` | The mark alone. Favicon and the quiet motif on Who We Are. |

The flat paper background was matted out with a background flood fill. The
white logo is never placed on a white background — the header cross-fades
between the two variants depending on what it is currently over.

---

## Structure

```
app/
  page.tsx            Homepage — 01 opening · 02 hero · 03 what we do
                      04 who we are · 05 solutions · 06 founders note
                      07 work · 08 testimonials · 09 closing CTA
  what-we-do/         "We start with your consumer." + pinned 3-step process
  who-we-are/         "Why we're called Corn & Cheese Media."
  solutions/          Three parent categories → nine services (see below)
  work/               Client grid (logos only — no case studies)
  contact/            Details + premium form
components/
  ui/                 halftone-flow · circular-testimonials · glass-button
                      magnetic · reveal · use-reveal · logo · section
                      page-hero · motifs (original SVG illustrations)
  layout/             site-header · site-footer · cursor · smooth-scroll
  sections/           hero · solutions-list · work-grid · process-story
                      testimonials · closing-cta · contact-form
                      founders-note
content/              site.ts (approved copy) · testimonials.ts (placeholders)
docs/                 The approved content PDF + extracted text
lib/                  utils.ts (cn helper) · highlight-word.tsx (see below)
```

### Section-specific specs

- **Hero** — built to `heroic.txt`. The Halftone Flow reference is implemented
  as a native WebGL component (`components/ui/halftone-flow.tsx`): no iframe,
  no Three.js, no GSAP, and none of the reference demo's content. The
  reference shader's flow and halftone maths are preserved exactly.
- **Testimonials** — built to `testomonial.txt`. The circular plate
  arrangement, centre-active state, rotateY offsets, arrow and keyboard
  navigation, autoplay, Framer Motion transition and word-by-word blur reveal
  are all preserved; only the palette, typography and surroundings are ours.

---

## Two implementation decisions worth knowing

**The halftone runs on brand blue, not the reference's red/orange.**
`heroic.txt` specifies a dark-red-to-orange ramp; the master brief mandates
white / near-black / blue. The colour ramp is a `palette` prop —
`palette="ember"` is the original reference ramp, `palette="brand"` is the same
ramp on `#1677FF`. The site ships on `brand`. Nothing about the flow, the
halftone grid or the motion differs between them.

**Scroll reveals are geometry-based, not IntersectionObserver-based.**
See the long comment in `components/ui/use-reveal.ts`. Every reveal starts
hidden, so a trigger that fails to fire renders a blank page rather than a
missing animation — and IO has two failure modes that bite here: it is not
delivered at all in some embedded/in-app browsers, and its intersection rect is
clipped by ancestor `overflow`, which is exactly the shape of this site's
masked-line reveal. One shared rAF loop that drains to empty avoids both.

---

## Solutions architecture

Nine solutions in three parent categories. **`solutionCategories` in
`content/site.ts` is the single source** — the Solutions page, the homepage
index and the contact form's service options all derive from it, so the order,
numbering (01–09, continuous across categories) and photographs can't drift
apart.

| Category | Services, in display order |
| --- | --- |
| 01 Growth & Marketing | 01 Social Media Optimization · 02 Performance Marketing · 03 Influencer Marketing |
| 02 Industry Specializations | 04 Manufacturing Marketing · 05 Deep Tech Marketing · 06 Solar & Renewable Energy Marketing |
| 03 Creative & Digital Solutions | 07 Video & Creative Production · 08 Website Development · 09 Marketing, PR & Digital |

- **Solutions page**: a category jump menu under the headline; then for each
  category a dark band (number, title, introduction, and an index linking down
  to each of its services) followed by that category's three service sections.
- **Homepage index**: the same nine in the same order, with each category's
  title and introduction above its rows; the sticky photo card names the
  category of whatever row is active.
- **Photos belong to the service, not the list position.** Each solution
  carries its own `image`. (The index used to pick photos by array position,
  which would have attached the wrong photo to a service the moment the order
  changed.)
- The header now checks *every* `[data-dark-region]`, not just the first, so it
  inverts correctly over all three category bands.

**Content that needs your attention before publishing**

- The approved PDF only contains six services. **Solar & Renewable Energy
  Marketing, Video & Creative Production and Marketing, PR & Digital come from
  the solutions-architecture brief** (full descriptions verbatim; the homepage
  one-liners are condensed from them). Category titles and introductions are
  also the brief's. Reconcile all of it with the content document.
- The three new services have **no dedicated photograph** yet and use the
  generic `/solutions/default.jpg`. Add a file to `public/solutions/` and set
  `image` on that service in `content/site.ts` — one line each.

---

## Refinement pass (this session)

Typography, colour, navigation, footer and page-level polish across the
existing site — no rebuild, no new pages, no touched sections beyond what was
asked. The full list:

- **Raleway** replaces Karla as the body font (`--font-raleway`, `font-body`).
  Headings stay on Montserrat, unchanged.
- **Corn = light blue (`#4FADFF`), Cheese = dark blue (`#0B3D91`)** — new
  `corn`/`cheese` Tailwind tokens, separate from `brand` (`#1677FF`), which
  stays the one general accent colour used everywhere else. Applied to: the
  Corn/Cheese headings on Who We Are (bold + underlined), "consumer" on What
  We Do, "Data"/"Matters"/"Strategy" on Our Process, the Testimonials headline,
  and the "Talk to us" accent on Solutions' closing CTA.
- **Navigation is italic + bold** — Montserrat's real italic face is loaded
  (`style: ["normal", "italic"]`), not a browser-synthesised oblique.
- **The header's Contact Now button is a pill** (`rounded-full`, desktop +
  mobile). Every other glass button on the site keeps its original
  `rounded-[10px]` — this was scoped to the one persistent chrome button, not
  every CTA that happens to point at `/contact`.
- **Founders Note** — new homepage section, Solutions → Founders Note → Work.
  Teases the existing approved "A Note, Directly From Us" copy and signature
  (`whoWeAre.note[0]` + `whoWeAre.signature`, reused verbatim, not duplicated
  as a new content entry) with a "Read The Full Note" link through to Who We
  Are — the same teaser/full-page pattern every other homepage section
  already uses.
- **Solutions page**: each of the six titles turns brand blue on hovering its
  section (`group-hover/solution:text-brand`); each solution now has a visual
  icon.
- **Faded right-hand motifs** on What We Do (consumer/behaviour) and Who We
  Are (strategy/evidence) — see the substitution note below.
- **Footer**: soft grey ground (`#F0F1F3`), phone/mail/WhatsApp/map-pin icons,
  tagline shortened to "A data plus advertising", Studio now appears exactly
  once (moved out of the "Get in touch" list into its own labelled line).
- **Work page**: headline is one sentence with no forced line break (wraps
  naturally instead); "Want to be the next name here?" roughly doubled in size.
- Checked and confirmed already satisfied, no change needed: the contact
  form's service list already only has the six approved solutions (no "Other").

### A substitution worth flagging: no photography

Section 7 of the brief asks for "premium editorial photography" per solution,
plus faded lifestyle imagery on What We Do and Who We Are. This build has no
licensed photography to draw from, and pulling images from the open web for a
client's commercial site isn't something this build does (licensing risk, and
it's exactly the kind of untrusted-source download this setup avoids). Instead,
every image on the site is an **original SVG illustration** — hand-drawn line
art in `components/ui/motifs.tsx`, one accent colour, one stroke weight, so the
six solution icons and the two page motifs read as one curated system rather
than six unrelated photos. If real photography becomes available, each spot is
a single, clearly-marked swap: `SOLUTION_ICON` in `app/solutions/page.tsx`, and
the `visual` prop passed to `PageHero` on What We Do / Who We Are.

---

## Verification

Verified in real Chrome (headless, 1440×900 and 390×844):

- All six pages render with no console or page errors.
- No masked line is left stuck hidden on any page, desktop or mobile.
- Opening screen shows the Ogilvy quote, releases on hold/scroll/click, and
  plays once per session.
- Testimonial arrows advance the active entry.
- Contact form blocks empty submits with per-field errors, and a valid submit
  composes `mailto:hello@cornandcheese.com` with every field and the selected
  services in the body.
- WhatsApp button resolves to `https://wa.me/919322559284`.
- Mobile menu opens with all four nav items.
- (This session) `npm run typecheck`, `npm run lint` and `npm run build` all
  pass clean; all nine routes prerender with no console/page errors.
- (This session) Solutions heading colour confirmed with a real Chrome mouse
  hover (not just the class list): ink at rest, `rgb(22, 118, 254)` ≈
  `#1677FF` while hovered.
- (This session) Corn/Cheese, consumer, Data/Matters/Strategy and the
  Testimonials headline all confirmed at their exact target colours via
  computed styles, not just visual inspection.
- (This session) Footer confirmed: grey background, 4 icons, single Studio
  mention, exact tagline text.
- (This session) Contact form re-submitted end to end after the surrounding
  changes — still composes the same `mailto:` correctly; service list
  unchanged (six approved options, no "Other").

The contact form needs no backend: it hands a formatted message to the
visitor's mail client, addressed to the official address, so no third party
receives enquiries. To move to a server endpoint, replace the body of
`handleSubmit` in `components/sections/contact-form.tsx` with a POST — the
field set and validation stay as they are.

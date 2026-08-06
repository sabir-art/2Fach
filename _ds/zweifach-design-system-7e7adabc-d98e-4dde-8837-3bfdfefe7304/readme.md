# ZweiFach — Design System

> **ZweiFach** (German, "twofold / double") is a deliberately small Swiss studio at the
> intersection of **architecture** and **real-estate commercialisation**. An architect and a
> commercialisation lead work as one team — so the people who *design* a development are the
> same people who get it *financed and sold*. One hand holds both ends, from a raw plot to the
> last apartment sold.

This project **codifies the existing ZweiFach website** into a reusable design system. Nothing
here is a redesign — every colour, type ramp, easing curve and component is lifted directly from
the live source. With `styles.css` + the components + `motion.js` you can compose any new page
(a Contact page, a campaign landing, a case study) and it will look and move like ZweiFach.

> **Language note.** The live site mixes finished **English** copy (Vision, Capabilities,
> Through-line, Selected Work) with **placeholder French** copy (hero, services, Saga, Residences).
> Per the brief, **this system is English-only (Swiss English: British-leaning spelling, CHF,
> metric, 24h).** Every example string has been re-expressed in English. Class names, tokens and
> identifiers stay in English as they already were. The French strings in the source are treated
> strictly as placeholder.

---

## Sources (provided)

- **Codebase** (read-only, mounted): `ZweiFach/`
  - `scroll-video-hero/` — the live site: `index.html`, `about.html`, `works.html`, `styles.css`
    (804 lines, all `:root` tokens), `script.js` (home motion layer), `about.js` (About/Works layer).
  - `logo-intro/` — the standalone logo "draw" intro (`index.html`, `intro.css`, `intro.js`).
  - `zweifach-draw-css.html`, `zweifach-draw-gsap.html` — logo draw variants.
  - `font/stylesheet.css` + `font/*` — the full Graphik LCG family (Thin→Black, + italics).
  - `assets/img/*`, `assets/frames/*` (281 hero frames), `assets/hero.mp4`, `assets/logo.svg`.
- **Upload:** `uploads/Logo ZweiFach.svg` → copied to `assets/logo/zweifach-logo.svg`.
- **`ZweiFach_Strategic_Analysis` (docx/pdf)** by SABIR — positioning research; copied to `_research/`.
  Tagline: *"Building the site that proves the chain, from the idea to the last unit sold."*

**Stack to keep (do NOT migrate to a framework):** static HTML/CSS/JS + **GSAP + ScrollTrigger**
+ **Lenis** smooth-scroll + local **Graphik LCG**. The React components here are design-system
recreations for prototyping; production stays vanilla.

**The two principals**
- **Esad Mujanović** — Architecture & feasibility. Strand colour: **blueprint** (`--blueprint #2e3d4d`).
- **Dionis Fetahaj** — Commercialisation & financing. Strand colour: **clay** (`--clay #a86547`).
- Partner: **CloudOnPoint** — photoreal 3D visualisation (referenced on the About page).

The proposition turns on one Swiss-specific truth the site dramatises: a bank releases
construction credit only once enough units are **pre-sold off-plan** (often ~20–30% equity and a
pre-sale rate frequently above 40%, varying by bank/project). ZweiFach owns the *whole chain* across
that gate — design that is drawn from day one to be financeable, then sold.

---

## CONTENT FUNDAMENTALS — how ZweiFach writes

**Voice.** Confident, spare, architectural. Short declaratives. Often a two-beat structure that
mirrors the "twofold" name: *"The plan, then the place." · "Two specialists. Four moves. One chain." ·
"Proof, not promises."* Lines are pruned to the fewest words that still land.

**Person.** Speaks as **"we"** (the studio) to a **developer / landowner** "you". The two
principals are named in the third person where their craft is the subject (*"Esad turns the site
into a buildable, financeable design." · "Dionis pre-sells on plans."*).

**Casing.** Headlines are **sentence case**, not title case (*"Two specialists. Four moves. One
chain."*). Small labels — eyebrows, kickers, corner labels, nav, buttons, status chips — are
**UPPERCASE** with wide tracking (`.2em`). Section indices appear as **`(01) … (04)`** in a corner.

**Numbers & locale (Swiss English).** Metric (m², m), 24h time, **CHF**, British-leaning spelling
(*commercialisation, metre, programme, favour*). Stats are exact and sourced, with honest hedging
(*"Pre-sale rate often > 40% (indicative, varies by bank & project)."*). Placeholder data is
labelled as such (*"Placeholder case studies — to be replaced"*).

**Tone do/don't.**
- **Do** lead with the chain and the financing gate — that is the angle nobody else owns.
- **Do** keep an editorial restraint: one idea per screen, lots of air, big quiet type.
- **Don't** use exclamation marks, hype adjectives, or stacked buzzwords.
- **Don't** use emoji. The brand voice is dry and precise.

**Specimen copy (English, reusable):**
- Hero: *"The plan, then the place."* / *"ZweiFach turns floor plans into premium property
  visuals — from the technical line to the feeling of a space."*
- Vision: *"A beautiful project isn't enough. It has to be financeable — which means it has to be
  sold before it's built."*
- CTA: *"A plot. An idea. Let's build it — and sell it."* / *"From feasibility to the final unit."*

---

## VISUAL FOUNDATIONS

**The feel.** Premium editorial, architectural, warm-neutral. Big quiet type on a **cream** canvas;
photography that does the talking; motion that is slow and weighted. It should feel like a printed
monograph that happens to scroll.

**Colour.** A **white** background (`--bg #ffffff`) with near-black **ink** text
(`--fg #16140f`) and exactly **one accent**: a **taupe-bronze** (`--accent #98855c`) chosen because
it reads on cream *and* over photography. Media zones go **near-black** (`--media-dark #14130f`) with
light **on-media** text (`--on-media #f4f0e7`). A secondary **"two strands"** palette codes the two
crafts — **blueprint** slate-blue (architecture) and **clay** terracotta (commercialisation) — used
as small dots, owners' labels, rails and the occasional dark section (`--ink`, `--graphite`,
forest `#1d241c`). The palette is restrained: 1 accent, 2 strand colours, a few dark grounds. Never
introduce new hues — derive with `color-mix`/`oklch` from these if you must.

**Typography.** **Graphik LCG** only, across the full 100→700 range, but the working set is tight:
headings are **Medium (500)** — a single restrained weight is the whole personality; hero captions
go **Bold (700)**; large stat values and residence titles drop to **Light (300)**; giant ghost
section numbers are **Extralight (200)** at low opacity. Display type is fluid `clamp()` and tracks
**tight** (`-.02 / -.03em`); labels are tiny, UPPERCASE, tracked **wide** (`.2em`). Italics appear
sparingly for emphasis (*"…the last apartment sold."*). Body is Regular at `line-height:1.6`.

**Spacing & layout.** Fluid page gutter `--pad-x: clamp(20px,6vw,90px)`; content measure
`--maxw:1200px` (Works widens to 1400). Generous vertical rhythm `--section-y: clamp(90px,14vh,170px)`.
Grids are simple: 3-up services/beliefs, 2-up editorial, 50/50 splits. A 4px spacing scale underlies
the rest.

**Corners & cards.** Deliberately **low radius** — this brand is architectural, not bubbly. Image
tiles `4px`, media frames/work blocks `6px`, switcher media `8px`, the lifted selected-work and
through-line cards `14px`. **Buttons and filter pills are SQUARE** (`--radius-button: 0`) — a
deliberate architectural choice, no rounding; only **status chips and dots** stay fully round
(`--radius-pill: 100px`). "Cards" are
rarely boxed — content sits on the cream with **hairline** rules (`1px rgba(22,20,15,.14)`) doing
the dividing. Where a card floats (the editorial `story__square`, lifted imagery) it gets a soft warm
shadow `0 26px 54px rgba(0,0,0,.22)` — no hard borders.

**Imagery.** Warm, golden-hour interiors and exteriors; photoreal architectural 3D; full-bleed in
hero/panels, framed with small radius elsewhere. Almost always under a **scrim** (linear + radial
near-black gradients) so on-media text stays legible — text over media also carries a soft
`text-shadow`. No duotones, no heavy filters; inactive portraits desaturate to grayscale as a state.

**Text formats.** Two treatments (see Type → "Text formats"): **(1) Plain** — ink on cream, divided
by hairlines; the editorial default. **(2) Frosted glass** — light text inside a translucent
`backdrop-filter: blur(18px) saturate(1.25)` panel over imagery, with a thin top-light border and a
soft drop shadow, radius ~18px. Reserve the glass for hero/feature overlays where you want a premium,
luxe touch; don't box ordinary body copy in it. Tokens: `--glass-fill(-strong)`, `--glass-border`,
`--glass-blur`.

**Motion (the signature).** Calm and weighted. The house ease is **out-expo**
`cubic-bezier(.16,1,.3,1)` — fast in, long settle. The recurring gesture is a **clip-path (`inset`)
mask wipe**: images reveal bottom→up, text reveals top→down, panels stack and reveal in a single pin.
Scroll **reveals** fade + rise 42px, batched with a 0.12s stagger (`power3.out`). A **Lenis**
smooth-scroll (duration 1.05s, easeOutExpo) drives **GSAP ScrollTrigger**; a logo "draw" intro
(stroke-dashoffset → fill → zoom-out reveal) opens the site. **Everything is gated on
`prefers-reduced-motion`** with visible static fallbacks. See `tokens/motion.css` + `motion.js`.

**Hover / press / focus.**
- Links & nav: colour lifts (muted → ink, or on-media-muted → on-media) over `--dur-fast .35s`.
- Solid button: `filter:brightness(1.06)` + `translateY(-2px)`.
- Ghost / line buttons: border colour strengthens to accent or on-media.
- Filter pill: subtle ground darkens; the active pill **inverts** (ink ground, cream text).
- Thumbnails: opacity 0.5→1, slight `translateX` + `scale(1.05)`; active gets an accent border.
- Cards/works: image `scale(1.05–1.06)` under a deepening gradient.
- Focus-visible: a single `2px` accent outline (never removed).

**Transparency & blur.** Used sparingly and purposefully: the header is a translucent veil over the
hero, then becomes a `backdrop-filter: blur(8px)` cream bar once past it; the scrollbar thumb uses
`mix-blend-mode:difference` to stay visible on any ground; the works "+" affordance is a blurred
dark disc.

---

## ICONOGRAPHY

ZweiFach is **icon-light** — a deliberate, typographic, architectural choice. The source code
shipped **no icons**; where a UI genuinely needs one, use the restrained line set documented below.

- **The brand mark is the logo** — `assets/logo/zweifach-logo.svg`, a custom geometric **ZF /
  ZweiFach** wordmark built from filled paths and polygons on a construction grid (the grid lines
  power the draw-intro). Two colour groups: `.cls-1` (the "ZF" mark) and `.cls-2` (the "weiFach"
  letters). On the hero the mark is taupe (`--logo`) with light letters; on cream both go ink.
- **UI line icons (added — substitution flagged):** since the codebase had none, the system adopts
  **Lucide** (`unpkg.com/lucide`) — single-weight `1.5px` round-cap glyphs that match the brand's
  hairline. See Brand → "Icons" for the curated set (arrows, plus/close/menu, search, external-link,
  mail/phone/map-pin, building, ruler, grid, image, download). Inherit `currentColor`,
  `stroke-width:1.5`. **Flagged:** this is the nearest-match substitution, not a brand-owned set —
  confirm or swap if you have a preferred library.
- **Affordances are drawn in CSS, not icons:** the scroll hint is a 1px animated line; the works
  "open" affordance is a `+` built from two pseudo-element bars inside a blurred disc; arrows are the
  Unicode glyph **→** (e.g. capability tabs, "Scroll to pan →"); list bullets are **em-dashes (—)**
  or 5px dots. Strand identity is shown with a 7px **dot** (blueprint / clay), not an icon.
- **Decorative marks:** the Vision section draws a faint **blueprint grid** + **plot dot-grid** +
  a drifting **clay halo** from CSS gradients — motifs, not assets.

**Guidance for new work:** stay icon-free. If a UI genuinely needs an icon, use a hairline,
single-weight line glyph that matches the `1px` rule weight, or a Unicode arrow — never a filled,
coloured, or rounded icon, and never emoji.

---

## INDEX — what's in this folder

**Foundations**
- `styles.css` — global entry (import manifest only). Consumers link this one file.
- `tokens/` — `fonts.css` (Graphik LCG @font-face), `colors.css`, `typography.css`, `spacing.css`,
  `motion.css`, `base.css` (reset + base elements).
- `guidelines/` — foundation specimen cards (`@dsCard`) for the Design System tab: colour, type,
  spacing, motion, brand.

**Components** (`components/` — React recreations, `Name.jsx` + `Name.d.ts` + `Name.prompt.md`)
- `core/` — `Button`, `Eyebrow`, `Kicker`, `CornerLabel`, `Dot`, `Hairline`, `FilterPill`.
- `cards/` — `ServiceCard`, `ProjectCard`, `StatBlock`, `Belief`, `CapabilityTab`.

**Sections** (`sections/` — reusable signature organisms, shown in the Design System tab)
- `story-split`, `residence-reveal` (+ thumbnail gallery), `category-slide`, `selected-work`,
  `duo-reveal` (name-behind-figure), `metrics-bar`. `sections.css` is the implementation stylesheet
  (the site's component CSS, verbatim). These are blocks to reuse — **not pages**. See `sections/README.md`.

**Motion** — `motion.js`: the reusable, content-independent motion layer (the `data-*` attribute
API + init architecture extracted from `script.js`). Drop it on a page and add attributes.

**Living style guide** — `styleguide.html` — renders every token and component with the real font.

**Skill** — `SKILL.md` — documents this folder as a portable design system.

---

## How to compose a new page (e.g. Contact)

> The design system ships **atoms, molecules and reusable sections (organisms)** — not finished
> pages. You assemble a page from these in your own project; the system gives you the parts.

1. Link the system: `<link rel="stylesheet" href="styles.css">` (pulls in fonts + tokens). Add
   `sections/sections.css` if you reuse the section blocks.
2. Lay out on the cream canvas with `.zf-container` / `.zf-section`; one idea per screen, lots of air.
3. Open with an **Eyebrow/Kicker + a Medium-weight sentence-case headline**; index the section `(0n)`.
4. Use the components for primitives (Button, FilterPill, Dot, cards). Keep one accent.
5. Add motion by attribute, not JS: `data-reveal` on entering blocks, `data-parallax` on big numbers,
   the mask/switcher/through-line hooks for richer sections — then load `motion.js` (+ GSAP, Lenis).
6. Honour reduced-motion (the layer + tokens already do); check focus states and contrast.
7. Keep copy English, sentence-case headlines, UPPERCASE tracked labels, no emoji.

*Traceability: every value here is sourced from the provided code. Anything not in the source is
flagged in `CAVEATS` at the bottom of `SKILL.md` and in the handoff summary.*

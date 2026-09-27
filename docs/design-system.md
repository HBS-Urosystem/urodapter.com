# UroDapter Design System

The binding reference for building anything on this site. It records the decisions actually
shipped in code, including the ones that reversed an earlier approach. **Read this before adding a
section, page, or component.**

> **2026-09-08:** all three built pages now follow the client's 0831 plan — `/patients` and
> `/clinicians` restructured (§2 *"Where each journey step is answered"*), and the homepage rebuilt
> from `3. page_content.docx`. `/partners` is still the `AudienceStub`, and there is still no
> Support Center route. Canonical docx folder:
> `/Users/vhollo/Public/Google/_melo/Urosystem/urodapter - UX/0831/`.

- Page-specific plans & open items → [patient-journey-page-plan.md](patient-journey-page-plan.md),
  [clinician-journey-page-plan.md](clinician-journey-page-plan.md),
  [home-page-plan.md](home-page-plan.md)
- Tokens live in [src/routes/layout.css](../src/routes/layout.css) — that file is the source of
  truth; this doc explains *how to use them*.

---

## 1. Tokens

Defined in `@theme` (Tailwind v4) in `layout.css`:

| Token | Value | Use |
|---|---|---|
| `--color-navy-950` | `#08111f` | Deepest navy — header band, hero base, text on light |
| `--color-navy-900` | `#0d1a30` | Dark surfaces, bridge band (dark) |
| `--color-navy-800` | `#132342` | Raised dark chips |
| `--color-navy-700` | `#1b2f54` | Rarely used; dark borders/accents |
| `--color-patient` | `#18438a` | **Patient** persona accent |
| `--color-clinician` | `#2c8979` | **Clinician** persona accent |
| `--color-distributor` | `#8764b9` | **Distributor** persona accent |
| `--color-brand` | `#75c6c9` | **Brand highlight** — the logo teal. Constant on every page |
| `--font-display` | `Source Serif 4 Variable` | Editorial serif for display headlines |

Derived single-purpose tints (in `:root`, not `@theme` — they're surfaces, not a scale):

- `--color-patient-soft` = 7% patient in white → light tinted panels/bands
- `--color-patient-glow` = 30% patient, transparent → dark-mode radial glows
- `--chart-trying` / `--chart-continuing` → the **data-series duo** for charts. Brand-hue steps
  snapped to pass the dataviz six-checks validator (lightness band, chroma floor, CVD ΔE,
  contrast) — light `#2f66c4`/`#1e947e`, dark `#0284c7`/`#059669` (auto via media query).
  **Never chart with raw `--color-patient`/`--color-clinician`** — both fail the validator
  (too dark / chroma under the floor). Re-run the validator before adding any series colour.
- `.tint-band` (layout.css) = the full-bleed band surface used by every `SectionBridge` *and*
  the closing band. Its accent is the `--band-accent` custom property (defaults to patient).
- `.bg-persona-page`, `.surface-card`, `.surface-panel`, `.surface-solid` (layout.css) = the
  colourful page canvas and the card/CTA surfaces (see §4). All read `--surface-accent` (defaults
  to patient).

### The accent scopes — how retinting actually works

**One class retints everything below it.** Put `.accent-patient`, `.accent-clinician` or
`.accent-distributor` on a page wrapper *or a single section*, and every `.surface-*`, every
`.tint-band`, the `.nav-gradient` header and all the small accents inside the shared components
follow. The home page uses this per-section (blue → teal → purple as you scroll); persona pages
use it once, on the page wrapper.

Each scope sets four accent tokens plus the three surface variables:

| Token | Role |
|---|---|
| `--accent` | The raw persona colour. |
| `--accent-ink` | The **readable** accent, for text/borders/icon strokes. In dark mode it swaps to the light 300-step of the same hue (patient→`sky-300`, clinician→`emerald-300`, distributor→`violet-300`) — the deep brand colours vanish on navy. Components write `text-(--accent-ink)`, never `text-patient dark:text-sky-300`. **In light mode the clinician ink is the accent darkened to 80%**, not the raw `#2c8979`: the raw teal measures 4.23:1 on white and fails AA for the 12–14px text that uses this token (fixed + measured 2026-08-26 → 6.04:1 on white, 4.66:1 on the deepest panel tint). Patient blue and distributor violet pass unchanged. Measure before changing any persona ink. |
| `--accent-soft` | Icon-chip fill (7% accent in white; 10% ink alpha in dark). |
| `--accent-solid` | Flat fill for compact solid CTAs — the accent at 88%, dark enough for white text to clear AA in every persona (see `.accent-pill`, §4). |

Two rules that are easy to get wrong:

1. **Never declare `--surface-accent` / `--band-accent` / `--nav-accent` on the styled element
   itself.** A declaration on the element beats the inherited value, so a self-declaring
   `.surface-card` could never be retinted from an ancestor. They read
   `var(--surface-accent, var(--color-patient))` at each use site instead — inherit, with a
   patient fallback. *(Fixed 2026-08-26; the bug was invisible while patient was the only persona.)*
2. **Never derive one accent token from another across a scope boundary.** A custom property
   inherits its *substituted* value, so `--accent-soft: color-mix(…var(--accent)…)` declared on
   `:root` would keep `:root`'s colour inside `.accent-clinician`. Every scope redeclares all four.
- `.nav-gradient` (layout.css) = the subpage nav bar's diagonal **navy→accent** gradient (logo
  stays on deep navy, the bar carries the primary colour). Accent via `--nav-accent` (defaults to
  patient). Same in light & dark (the header is always dark with white text).

**Persona colour rule:** each audience page uses its own accent. The patient page uses
`--color-patient` everywhere an accent appears. When building the clinician/distributor pages,
**parameterise** — don't hardcode blue. Shared components should take the accent from the page.

### The brand highlight — `--brand-*` *(2026-09-22)*

A second, **page-independent** accent: `#75c6c9`, the only colour in
`UroDapter_logo_horizontal.svg`. Where `--accent-*` says *which audience you are reading*, the
brand teal says *this is UroDapter* — so it is declared once on `:root` and the `.accent-*` scopes
never touch it. Do not redeclare it inside a persona scope.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--color-brand` | `#75c6c9` | `#75c6c9` | Raw logo teal. Tailwind: `text-brand`, `bg-brand`. |
| `--brand-ink` | `#096b6e` | `#75c6c9` | Readable text / icon / border colour. |
| `--brand-fill` | `#75c6c9` | `#75c6c9` | Bright button & chip background. |
| `--brand-soft` | 10% teal in white | 14% teal alpha | Chip tint. |
| `--brand-on-fill` | `--color-navy-950` | same | The **only** safe text colour on `--brand-fill`. |
| `.brand-pill` | `--brand-fill` + navy text | same | Brand button; the counterpart to `.accent-pill`. |

**Why the split by job.** The logo teal is light (OKLCH L 0.78). Measured: 1.97:1 as text on white
(unusable), 8.84:1 as text on navy-900, 9.62:1 as a *fill* under navy-950 text. So light mode
darkens it along its own hue to `oklch(0.48 0.08 198.7)` = `#096b6e` — 198.3° against the logo's
198.7°, 6.29:1 on white and ≥4.60:1 on every card / canvas / bridge tint of all three personas —
while `--brand-fill` needs no scheme swap at all, because the text on it is navy, not white.
**Never put white text on the teal** (1.97:1); `.brand-pill` sets the text colour itself so that
mistake cannot be made by accident.

**Where it is used** (2026-09-22): interaction affordances and highlight marks, on every journey
page. Persona CTAs are deliberately *not* included — `.accent-pill`, `.surface-solid` bands and the
`NextSteps` cards keep their audience colour.

| Brand teal | Still persona |
|---|---|
| `SectionBridge` arrow chip, quote glyph, rule | Bridge band tint (`--band-accent`) |
| `AutoAccordion` rail + fill, header icon chips, play/pause button, focus outlines | The accordion's group label |
| The `→` story/testimonial links + their focus rings | Section eyebrows |
| The hairline rules under display headlines (`WhyChoose`, `AudienceStub`) | `StatCard` / `BenefitCard` / `IndicationsStrip` chips, page canvas, cards, nav |
| Home hero: "See how it works" (`.brand-pill`), the regulatory pill's shield, the audience cards' ticks, the quote rotator's dot fill + focus rings, the webshop link | The audience cards' chips, eyebrows and borders |

**Known limit — the clinician page in light mode.** The logo teal is 19.5° from `--color-clinician`
in OKLCH, and `#096b6e` is within 19° / 0.01 L of the clinician ink `#236e61`: on `/clinicians` the
two are hard to tell apart, so the highlight reads as cohesion rather than emphasis. Dark mode is
fine (the bright teal separates clearly from `emerald-300`). If light-mode emphasis is wanted
there, separate by **lightness** — use the bright forms (`.brand-pill`, `--brand-fill`,
`--brand-soft`) rather than `--brand-ink` next to clinician ink.

### Dark-mode accent swap (important)

`--color-patient` (#18438a) is a deep blue: it **disappears against navy**. In dark mode swap every
small accent to `sky-300`:

```html
<!-- shared components — accent comes from the enclosing .accent-* scope -->
class="text-(--accent-ink)"
class="bg-(--accent-ink)/60"
class="border-(--accent-ink)/20 dark:border-(--accent-ink)/25"

<!-- patient-page-only compositions may still hardcode; they resolve identically -->
class="text-patient dark:text-sky-300"
```

Dark mode is driven by `prefers-color-scheme` (no theme toggle). Every component ships both.

---

## 2. Page architecture & rhythm

```
SiteHeader (solid)
Section 1  ← content directly on the page gradient
SectionBridge (full-bleed tinted band)
Section 2  ← content directly on the page gradient
SectionBridge
Section 3
…
```

**Sections are NOT cards.** Section content sits directly on `.bg-page-gradient`. The full-bleed
bridge bands are what separate sections — wrapping each section in a panel too stacks redundant
surfaces. *(This reversed the original plan's `rounded-3xl` section cards.)*

- **Container:** `max-w-7xl mx-auto px-5 sm:px-8` — every section, and the header.
- **Page shell:** `<div class="bg-page-gradient text-navy-950 dark:text-white min-h-screen">`
- **Bridges:** full-bleed (outside the container), `my-12 sm:my-16`, inner `py-10 sm:py-14`.
- Every section: `<section aria-labelledby="…">` with a real heading.

**Only these are cards:** product panel, benefit cards, video facade, Support Center box,
indications strip. If you're reaching for a 6th surface, question it.

### Where each journey step is answered *(0831 architecture, 2026-09-07)*

The client's `0831/2. website architecture.docx` assigns the first journey steps to the
**homepage** and the rest to the persona pages. This is load-bearing for page structure:

| Journey step | Answered on |
|---|---|
| "Is this relevant to me?" / "Why should I care?" | Homepage |
| "Is there a better way?" / "What is UroDapter?" | Homepage |
| "How does it work?" | Homepage |
| "Why is this better / can I trust it?" onward | The persona journey page |
| "I want more information" | Support Center (journey pages only point at it) |

So a journey page **opens at the "why choose it" step** — it does not re-explain the device.
`/patients` is four sections, `/clinicians` six. The components that answered the homepage
questions (`patients/HowItWorks`, `clinicians/WhatIsIt`, `clinicians/Mechanism`) are **parked**,
not deleted: they and their content objects are kept unrendered for the homepage rebuild. Don't
re-add them to a journey page without a docx change.

Journey pages carry **curated highlights only**; every deep resource (full publication list,
regulatory documents, all testimonials, IFU, training) belongs to the Support Center, and the page
links to it rather than reproducing it.

### The home page

Same rhythm, on the neutral `.bg-page-gradient` canvas. **Rebuilt 2026-09-08 from
`0831/3. page_content.docx`; the hero was redesigned on 2026-09-27 (owner direction —
[home-hero-redesign/plan.md](home-hero-redesign/plan.md))**. See [home-page-plan.md](home-page-plan.md):

```
SiteHeader (page)    ← in the route, before <main>: transparent on the page gradient
<main>
UroDapterHero        ← copy (pill, h1, body, CTAs) · framed photo + QuoteRotator ·
                       product chip · HeroAudienceCards · credibility strip ·
                       regulatory line
SectionBridge (quote + problems)
                       "For patients" / "For clinicians" problem lines, a rule,
                       then "A simple idea can make a remarkable difference."
HowItWorks   #how-it-works   ← intro, ProductCallouts, caption → 30s animation, detail
SectionBridge (arrow)  "Choose Your Journey"
ChooseJourney #support ← sr-only h2, three journey cards + the Support Center shortcut
</main>
```

**Owner direction 2026-09-27 (D1–D8), reversing four earlier decisions.** Recorded here so
they are not "fixed" back:

- **The hero is no longer always dark** (D1). It has no background of its own; the route's
  `.bg-page-gradient` shows through, light in light mode and navy in dark. Every colour in it
  comes as a light/dark pair, and `SiteHeader` has a matching `page` variant.
- **No logo + product lockup** (D2). Both logo SVGs left the hero; the header carries the brand.
  In their place is a **product chip** (image + title + one line).
- **Not a single column any more.** From `lg` the hero is two columns: copy + chip left, the
  **framed photo** with the audience cards overlapping its bottom edge right.
- **No separate key-benefits section.** `KeyBenefits` is deleted: its two cards became
  `HeroAudienceCards` on the photo (whole card is the link), and its two docx problem sentences
  moved — verbatim — into the first bridge (D6).
- **The testimonials rotate** (D3) — the second bounded exception to "never auto-advance", §6.
- **The regulatory line stays** (D8), under the credibility strip at every width, next to the
  new regulatory pill above the headline and the strip's CE/FDA item.

Hero, card and header-CTA copy is owner-approved mockup copy, not docx copy (D5); see
home-page-plan.md for provenance and the claims flagged to the client.

**Fluid first** *(owner direction 2026-09-27, applied to the whole hero)*. Sizes are continuous,
not stepped: type and spacing are `clamp()`s, the headline scales with **its own column** via
container query units (`cqi`), and layout is intrinsic wherever a switch is only about room —
the CTA row is `flex-wrap w-fit` with `grow` items (side by side while both fit, full-width
stack when not), the audience cards are `repeat(auto-fit, minmax(min(100%, 16.5rem), 1fr))`,
the right-hand column is `calc(32% + 18.3rem)`, and the pill label and the strip's 2 → 4 columns
are **container** queries on the element that actually runs out of room. Media queries are left
only for the two structural moves no fluid value can express (48rem, 64rem — where blocks
change place). New components should follow the same order of preference: fluid value →
intrinsic layout → container query → media query.

**One DOM order, three placements.** The markup is in the phone reading order — copy → media
(photo + quote panel) → product chip → cards — and `grid-template-areas` moves blocks at the two
structural steps, so the chip and the quote panel each exist once:

| | Placement |
|---|---|
| < 48rem | DOM order. Photo 7:5; the quote panel overlaps its bottom edge in flow (`-mt-14 mx-3`); chip under the panel; "Choose your path" eyebrow; cards stacked (or paired, when each gets 16.5rem). |
| 48–64rem | `"copy" "chip" "media" "cards"`. Photo 16:9; panel glass over its top-left; cards paired, overlapping the photo's bottom. |
| ≥ 64rem | `"copy media" "copy cards" "chip cards"`, rows `auto auto 1fr`. |

The ≥ 64rem areas are deliberate. **Row 1 holds nothing but the photo**, so the cards (rows 2–3)
always start at the photo's bottom edge and their negative margin (`clamp(5rem, 2rem + 5vw,
6rem)`) overlaps it by the same amount at every width. The copy spans rows 1–2 so, when it is
taller than the photo (1024–1280px), row 2 takes the difference and the chip still starts right
under the copy. The first version pinned the cards to `max(copy, photo)` instead and they
overlapped the photo by only 18px at 1024. **The cards stay in flow** — only the negative margin
pulls them up — so taller cards push the credibility strip down (≥ 48px clear, measured) rather
than sliding under it.

**The photo is a framed media block**, not a full-bleed background: `rounded-3xl`, no overlay,
no mask, no text on it except the glass quote panel and cards. The full-bleed era's stepped crop
anchors, sub-`lg` cap and mask, overlay gradients and lockup-collision rules are all gone. The box
is narrower than the 16:9 source at every width, so the crop is horizontal and only
`object-position` X matters; it is `100%` (right-anchored) throughout. The aspect per placement is
**measured, not the plan's starting 4:3**: at 4:3 the quote panel ended 3–6px short of the
patient's left eye at 1024–1280, so the right-hand column uses 3:2.

Faces, measured against the source (patient's eyes at 67.6–73.5% of its width, mouth 69–73%;
clinician's face 82.6–89.6%), with the taller (doctor's) slide:

| viewport | photo box | panel → patient's eye | covered | clinician |
|---|---|---|---|---|
| 375 | 335×239 (7:5) | panel under the photo | nothing | face in frame |
| 560 | 520×371 (7:5) | panel under the photo | nothing | face in frame |
| 768 | 704×396 (16:9) | 76px clear | nothing | whole |
| 900 | 836×470 (16:9) | 88px clear | nothing | whole |
| 1024 | 600×400 (3:2) | 30px clear | hair bun only | whole |
| 1280 / 1440 | 681×454 (3:2) | 33px clear | hair bun only | whole |

**The quote panel is 7/6 of one card** (D4): a card is `(100% − 2 × 1.25rem inset − 1rem gap) / 2`
of the photo box, so the panel is `calc((100% - 3.5rem) * 7 / 12)` and its left edge lines up with
the patient card's (365px vs 313px cards at 1280). The inset and gap are fixed for exactly this
reason — make them fluid and the calc has to follow.

**Glass contrast, measured on the worst 2% of the blurred photo behind each panel.** Plan values
failed twice in light mode, so the glass was made more opaque (the rule: raise the glass, never
lighten the text): the quote panel is `bg-white/80` (slate-600 sub-line 4.44 → ≥ 4.99:1) and
`dark:bg-navy-950/65`; the cards are `bg-white/85` (clinician eyebrow ≥ 4.95:1) and
`dark:bg-navy-900/75`. Re-measure if the photo is ever swapped — every number in this section
encodes where the two subjects stand in *this* frame.

**Heights** (2026-09-27, vs the pre-redesign baseline): at 1280 the hero is 949px and `/` is
2 940px (baseline: 705px hero + 373px `KeyBenefits`, 2 973px page); at 375 the hero is ~2 060px
and `/` ~4 820px (baseline 1 063 + 750px, 4 470px). The desktop page is slightly shorter; the
phone page is longer, because the problem sentences now open the first bridge instead of sharing
the cards, and the cards, chip and strip all stack.

**Per-section persona accents still apply**, but *within* a section: `HeroAudienceCards` and the
first bridge's problem row put `.accent-patient` / `.accent-clinician` on their two halves side
by side, and `ChooseJourney` scopes each journey card. The old blue → teal → purple *lane*
structure is retired.

**`#support` is load-bearing.** `SiteHeader`'s "Support Center" nav item and every pending
"learn more" link across the site resolve to it; it is the id on `ChooseJourney`'s Support Center
block. Until a real Support Center route exists, do not remove it — those links go nowhere without
it.

**Off-site links are a separate field.** A CTA that leaves the site carries `externalHref`
(an absolute URL) instead of `href`; `href` stays typed `ResolvedPathname` so eslint's
`no-navigation-without-resolve` still guards every internal link. The component renders those
anchors with `target="_blank" rel="external noopener noreferrer"` — `external` is what makes
SvelteKit's router hand the URL to the browser, and it is also the rule's own escape hatch — plus
an `sr-only` "(opens in a new tab)" after the label. Live off-site destinations (client, 2026-09-09):
the webshop `https://www.urosystem.com/shop` and the app `https://app.urodapter.com`.

**Cross-journey links go to the real page, not to `#support`.** A pending link resolves to
`#support` only when its destination does not exist yet. Where a journey page already holds the
content, link the page and its section: `/patients#stories` (the id lives on `PatientStories`) is
the clinician page's "Read all patient testimonials". Anchor targets carry `scroll-mt-24` so the
sticky header does not cover the heading.

---

## 3. Typography

| Role | Spec |
|---|---|
| Display headlines | `font-display font-semibold` + `text-balance` |
| Patient page `h1` | `text-[clamp(1.75rem,3.8vw,2.6rem)] leading-[1.15]` |
| Section `h2` | `text-[clamp(1.6rem,3.2vw,2.25rem)] leading-tight` |
| Bridge emphasis | `font-display font-semibold text-[clamp(1.35rem,2.6vw,1.9rem)]` |
| Home hero `h1` | `font-bold tracking-[-0.035em] leading-none text-balance text-[clamp(2.75rem,19.2cqi-1.27rem,4.75rem)]` (still sans). Sized by its **column** (`@container` on the copy block): 44px at 375, 73px in the 486px desktop column, 76px cap. One string; "Catheter‑free" uses U+2011 so it never breaks after the hyphen (5.8em wide in the system sans — the cqi slope keeps it on one line with room for wider fallback fonts). |
| Body | `text-base leading-relaxed text-slate-600 dark:text-slate-300` + `text-pretty` |
| Home audience cards | serif `h2` `text-[clamp(1.25rem,1.7vw,1.5rem)]`, ticks `text-[15px] leading-snug space-y-2` (tighter than body, client direction 2026-09-27) |
| Small print | `text-xs text-slate-500` |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.2em] text-patient dark:text-sky-300` |

**Serif is for display headlines only** — body, UI, labels, and cards stay sans. Serif was adopted
as the 2026 editorial direction; the home hero headline has *not* been back-ported yet (open item).

**Headlines are one sentence in one element.** Don't split a sentence into an eyebrow + rest —
the patient `h1` renders the full sentence uninterrupted. Eyebrows are separate short labels
(e.g. "Patient benefits"), never a fragment of the heading. Never render "SECTION n" — the docx
numbering is internal-only.

**Accent rule** (the short bar under a headline): `h-0.5 w-12 rounded-full bg-patient/60
dark:bg-sky-300/60`, `aria-hidden`.

---

## 4. Surfaces, radius, borders

Two-tier radius:

- `rounded-3xl` — large media blocks (the hero photo).
- `rounded-2xl` — cards and panels (the default).
- `rounded-full` — icon chips, pills.

**Surfaces are colour, not chrome** *(2026-07-20 direction: the page is deliberately colourful,
built on the patient accent).* Do **not** reach for `bg-white`/`bg-slate-*` cards — use the two
utility classes in `layout.css`, which carry an accent-tinted gradient + accent border (+ a soft
accent shadow on cards in light). Both read the accent from `--surface-accent` (defaults to
patient), so the clinician page retints by setting that variable on the page wrapper.

| Surface | Class | Notes |
|---|---|---|
| Page canvas | `.bg-persona-page` | Colourful accent gradient (light: white→~13% accent + accent radials; dark: navy + strong accent glows). Pair with an `.accent-*` class — the patient page is `bg-persona-page accent-patient`. Replaces the neutral home `.bg-page-gradient`, which stays as-is. *(Renamed from `.bg-patient-page` 2026-08-26 — it was never patient-specific.)* |
| Content card | `.surface-card` | Gently accent-tinted (white→~10%), accent border, soft accent shadow. Benefit/testimonial/stat/chart/video/product cards. |
| Tinted panel | `.surface-panel` | Deeper accent tint (~13→21%). Callouts, indications strip, clinician-quote box, dive-deep band. |
| Solid CTA band | `.surface-solid` | **Bold, full-strength accent fill** + white text — the same gradient as the home audience cards / Section 6 primary CTA. For strong "go here" invitations (Support Center bands). Dark mode brightens toward the text-free bottom-right so the band lifts off the navy canvas while white text stays on the dark top-left. |
| Full-bleed band | `.tint-band` | Section bridges + closing band (accent via `--band-accent`; see §1). |
| Compact solid CTA | `.accent-pill` | **Flat** `--accent-solid` fill for buttons and small CTA panels. `.surface-solid` is a *band*: its gradient brightens toward a corner the text never reaches. A pill is small enough that its label sits across the whole sweep, and there clinician teal and distributor violet drop white text under 4.5:1. Use `.surface-solid` for bands, `.accent-pill` for buttons. |

**Use the primary accent at full strength where an element is a strong call-to-action**, not only
as a light tint — e.g. the "Read all patient testimonials" / "Go to Support Center" bands
(`SupportCenterCard variant="solid"`, the default) and the Section 6 primary "Order UroDapter"
CTA. Reserve `.surface-panel` (light tint) for secondary/informational callouts so the solid
bands stay the loudest thing in their section.

Only `rounded-2xl` + padding utilities stay inline on these elements; the class supplies bg +
border (+ shadow). Cards that aren't links get **no hover lift** — hover belongs to interactive
things. Icon chips inside cards stay `bg-(--color-patient-soft)` / white as before.

---

## 5. Icons

- **Heroicons outline only.** No icon fonts, no second icon set.
- Inline the single path `d` string; draw with `currentColor`.
- `viewBox="0 0 24 24"`, `fill="none"`, `stroke-width="1.5"` (2 for small/dense marks),
  `stroke-linecap="round" stroke-linejoin="round"`, `aria-hidden="true"`.
- Icon `d` strings live **next to the copy** in `src/lib/content/*.ts`, with a comment naming the
  icon (e.g. `// face-smile`).
- Chip: `w-10 h-10 rounded-full bg-(--color-patient-soft) dark:bg-sky-300/10 border
  border-patient/20 dark:border-sky-300/25 text-patient dark:text-sky-300`.

---

## 6. Motion

**One vocabulary. Nothing else moves.**

1. **Scroll reveal** — `use:reveal` from [`$lib/actions/reveal.ts`](../src/lib/actions/reveal.ts).
   Adds `.reveal-init` → `.reveal-in` (fade + 12px rise, 0.6s) via IntersectionObserver.
   - Guards built in: skips under `prefers-reduced-motion`, skips elements already in view, and
     skips elements that could never cross the trigger line (so nothing is stranded invisible).
   - *Why not CSS `animation-timeline: view()`?* It was the original plan, but it produced blank
     compositor paints in Chromium. Don't reintroduce it.
   - Use sparingly: bridges, card grids, column blocks — not every element.
2. **Link arrow** — `group-hover:translate-x-1 transition-transform` on a `→`.
3. **Bridge arrow nudge** — gentle 4px loop, disabled under reduced motion.
4. **The accordion rail** — the progress fill in `AutoAccordion`, §6a. Drawn in
   `--brand-ink`, not the persona accent (see *The brand highlight*, §1).
5. **The quote rotator's dot** — the active dot's fill in the home hero's `QuoteRotator`, the same
   timer mechanism as the accordion rail (§6b), also in `--brand-ink`.

Anything new must justify itself against these five. No parallax, 3D, cursor effects, or
autoplaying video — wrong register for anxious patients on a regulated medical page.

**Sliders/carousels are a last resort**, and when content genuinely demands one
(`ClinicianQuotes`): **manual only, never auto-advance**; stack all slides in one grid cell so
the box height fits the longest slide (no layout jump); crossfade opacity only, disabled via
`motion-reduce:transition-none`; `aria-live="polite"`, labelled dot + prev/next buttons. A
content *grid* (Section 4 testimonials) beats a carousel — the Section 4 carousel mockup was
rejected exactly because it hides content behind interaction.

Two bounded exceptions auto-advance, each under the conditions listed with it: the
`AutoAccordion` (§6a) and the home hero's `QuoteRotator` (§6b).

---

## 6a. The autonomous accordion (`AutoAccordion`) *(2026-09-13)*

One item open at a time, its detail in the pane beside it, advancing on its own. Modelled on
Whoop's "Built to be worn 24/7" module. **This is a deliberate, bounded exception to §6's
"manual only, never auto-advance"** — read the conditions before reaching for it.

**Why the exception was granted.** The clinician page ran 7 105 px / 7.9 screens desktop and
12 726 px / 15.7 screens mobile, the patient page 5 479 / 10 256
([page-length-audit.md](page-length-audit.md)). The sections that were worst are all the same
shape — "several parallel blocks, each with its own visual" — which is the shape an accordion
is actually for. Stacking them cost thousands of pixels to say three things that are read one
at a time anyway.

**Where it is applied.** Both journey pages, eight sections (2026-09-13): clinician Sections 1–4,
patient Sections 1–3. Patient `NextSteps` is deliberately **not** one — see below.

**Not for CTAs.** Patient/clinician `NextSteps` stays a visible grid. Its three tiers are the
conversion path and each card is itself an `<a>`; putting two of three behind an interaction
works directly against what the section is for. Length is not the thing to optimise there.

**Conditions. All of them, or use a grid instead:**

- **Nothing leaves the DOM.** Collapsed bodies are clipped (`grid-template-rows: 0fr`), hidden
  panes are `visibility: hidden` — both still rendered, so every claim, footnote and citation
  is in the HTML for crawlers and AEO. The section gets shorter, not lighter.
- **The page must not move.** All panes stack in one grid cell so the box is as tall as the
  tallest — the §6 slider rule. Verified: page height is identical across every item, on both
  pages, desktop and mobile.
- **Reduced motion is fully manual.** No exceptions, no separate branch — see below.
- **A pause control** (WCAG 2.2.2), and opening an item pauses it: the reader chose that item,
  so nothing should move under them. The control flips to "Play".
- **The pane must not repeat the header.** A pane component that renders its own title
  duplicates the accordion header — `OutcomesChart` and `ClinicianQuotes` both took a required
  `heading` and had to be made optional. Check this when putting an existing block in a pane.
- **Measure before assuming it shortens anything.** A header row is ~60 px with an icon chip and
  ~46 px without, plus ~56 px for the pause control. So a 4-item list is 296 px / 251 px before
  the pane is even considered, and against a 4-up card grid (208 px desktop) an accordion makes
  the section *longer*. It paid for itself twice by being measured, not predicted: clinician
  Section 1 was rebuilt from six items to two after the first shape saved 22 px, and patient
  `WhyChoose` only works because its headers drop the icon chip.

**On testimonials (§6's rejected carousel).** §6 records that a Section 4 carousel mockup was
rejected for hiding quotes behind interaction. Clinician Section 3 and patient Section 3 now do
put quotes in an accordion, **deliberately and with the client's call** (2026-09-13). What keeps
the original objection answered: the quote itself is the *pane*, which is on screen the whole
time — it is the short theme label that collapses, not the quote. The clinician/patient split
the docx and the 2026-09-02 client comment both care about survives as the accordion's two
labelled `role="group"` runs.

**How it advances — the one mechanism worth understanding.** The progress rail *is* the timer:
the fill animates `scaleY(0 → 1)` over `--ac-dwell`, and its `animationend` opens the next item.
Three things fall out of that for free rather than needing their own code:

| | |
|---|---|
| Pause / resume | one `animation-play-state` — the rail freezes where it is |
| Reduced motion | no animation → no `animationend` → **nothing auto-advances**, ever |
| Background tab | the browser stops the animation clock, so the page never advances unseen |

A `@media (prefers-reduced-motion: reduce)` block kills the animation in CSS *as well as* the
JS `matchMedia` check, because the CSS also covers the pre-hydration window.

**Other specifics:**

- `inView` **fails open** (starts `true`; the IntersectionObserver only ever *pauses*). If
  IntersectionObserver is missing or never delivers, the accordion still runs rather than
  sitting frozen on item 1.
- Headers are real `<button>`s in an `<h3>`, with `aria-expanded` / `aria-controls`; panels are
  `role="region"` + `aria-labelledby`, `inert` when closed. Arrow / Home / End move between
  headers (ARIA APG).
- **Inactive headers are `text-slate-500 dark:text-slate-400`, not dimmed opacity.** Whoop uses
  `opacity: 0.4`; at our sizes that fails AA. The slate pair is the project's established
  secondary-text colour and passes.
- **Panes sharing one box must share one surface.** `surface-card` throughout — a pane that
  switches to `surface-panel` reads as a glitch when it fades in where a card just was.
- Dwell defaults to reading time (~2.6 words/s + 3 s for the pane, clamped 7–16 s); `seconds`
  overrides per item. Dwell is presentation, so it lives in the content file's item list next to
  the ids, never as copy.

---

## 6b. The home hero's quote rotator (`QuoteRotator`) *(owner direction 2026-09-27)*

The two docx testimonials rotate in one glass panel on the hero photo. **The second bounded
exception to §6's "never auto-advance"** — granted by the owner (D3) for a two-quote panel that
would otherwise double the space the photo gives up to text. It meets the same conditions as
§6a, with the same mechanism:

- **The active dot is the timer.** Its fill animates `scaleX(0 → 1)` over `--qr-dwell` (the item's
  `seconds` — 7 s for Hannah's 17 words, 9 s for the doctor's 23 — kept in the content file next
  to the quote), and its `animationend` shows the next quote, wrapping.
- **Held** — `animation-play-state: paused`, the fill freezes where it is — on hover and on focus
  within the panel (pure CSS, `:hover` / `:focus-within`), when the panel is out of view (an
  IntersectionObserver that **fails open**), and when the tab is hidden (`visibilityState`; the
  document timeline keeps running in a background tab, so without this the fill would complete
  unseen and advance the moment the tab came back).
- **Paused by the reader** with a visible pause/play button (WCAG 2.2.2), or by clicking a dot:
  the reader chose that quote, so nothing moves under them.
- **Reduced motion is fully manual**: the button is not rendered, the fill has no animation, and
  a `@media (prefers-reduced-motion: reduce)` block kills it in CSS too (covers pre-hydration).
- **Nothing leaves the DOM and nothing moves.** Both quotes stack in one grid cell (the panel is
  as tall as the longer — measured identical on both slides), crossfade opacity + `visibility`
  over 0.4 s, inactive slides are `inert`. The footer is pushed to the bottom so both
  attributions sit on the controls' row.
- **APG carousel semantics**: `<section aria-roledescription="carousel" aria-label>`, slides
  `role="group" aria-roledescription="slide" aria-label="1 of 2"` holding `<blockquote>` +
  `<footer>`, `aria-live="off"` while it rotates and `"polite"` when it is paused or held. The
  controls come first in the DOM (focus order: CTAs → quote controls → cards) but are drawn on
  the attribution row. Dots are 5px / a 14px pill inside 24×24 hit areas (WCAG 2.5.8).

---

## 7. Components

Shared (`src/lib/components/`):

| Component | Notes |
|---|---|
| `SiteHeader.svelte` | `variant: 'page'` (transparent on the page gradient, scheme-aware text — the home page, rendered by the route before `<main>`) \| `'solid'` (subpages — a `.nav-gradient` navy→accent bar, white text). Owns nav + mobile menu. A **"Contact us"** pill closes the nav on every page (and the mobile menu); it points at `#support` until a contact route exists (`TODO(placeholder)`). The nav gap is fluid (`clamp(1rem, 2.5vw - 0.5rem, 2rem)`) so links + pill fit at 768px. |
| `UroDapterHero.svelte` | Home hero (2026-09-27): regulatory pill, sans `h1`, body, brand-pill + outline CTAs, the framed photo with `QuoteRotator`, the product chip, `HeroAudienceCards`, the credibility strip (every item has a sub-line; the webshop link is off-site) and the regulatory line. Renders **no** header, **no** `<main>` and **no** page wrapper — the route owns all three. Placement rules and measurements: §2 *The home page*. |

`src/lib/components/shared/` — used by more than one page. **These take their accent from the
enclosing `.accent-*` scope; never hardcode patient blue in them.** *(Moved out of
`components/patients/` 2026-08-26, when the home page began using them.)*

| Component | Notes |
|---|---|
| `SectionBridge.svelte` | `variant: 'arrow' \| 'quote'`, props `lead` (optional), `emphasis`, `problems` (optional, quote variant only). Full-bleed tinted band. **The page's separator — always exactly one between sections.** Omit `lead` when the bridge copy is a single sentence — a sentence stays in one element. `problems` (`{id, label, text, icon, accentClass}[]`) adds a row of labelled audience statements above the emphasis — side by side when each gets 20rem, stacked below — and then the band shows **no quote glyph** and the rule sits **above** the emphasis, as the divider between problem and answer (the answer is the site's own line, not a quote). Without it the band renders exactly as before. The arrow variant centres its row (`sm:justify-center`), which only moves bridges shorter than the row (home's "Choose Your Journey"). |
| `BenefitCard.svelte` | Icon chip + title + body, optional `source` citation line (design system §9 — a card that carries a clinical claim carries its source). **Its chip+title treatment is the shared vocabulary** the testimonial theme labels rhyme with. |
| `TestimonialCard.svelte` | Theme chip+label (BenefitCard vocabulary), real `<blockquote>`/`<footer>`, optional story link (omit `linkLabel`/`href` when a grid shares one "read all" band, as the clinician page does). |
| `StatCard.svelte` | Icon chip + serif `highlight` + body + optional `source` citation. Extracted from `EvidenceOutcomes`; also the home page's "The numbers" row. |
| `SupportCenterCard.svelte` | Reusable "visit the Support Center" CTA. `variant`: `'solid'` (default — bold `.surface-solid` band, white text) \| `'tint'` (light `.surface-panel`). `href` typed `ResolvedPathname`. |
| `IndicationsStrip.svelte` | Tinted band: sentence + condition icon chips. Designed for ~4 chips; more than that squeezes the `sm:flex` row — the clinician page's five indications use their own card grid instead. |
| `OutcomesChart.svelte` | Two single-series labeled-bar lists on a shared 0–100% scale. Thin `h-2` bars, data-end-only rounding, recessive track, label+value as real text on every row (the bars are decoration over an accessible list), source line. Series colours: the validated `--chart-*` tokens only. *(Promoted from `patients/` 2026-08-26, when the clinician page needed it.)* |
| `DonutStat.svelte` | Single-value completion ring (the clinician docx's "large 74% continuation ring"). Arc drawn with `--chart-continuing` — **never the raw persona accent** (§1) — `stroke-linecap="round"`, SVG `aria-hidden`, percentage + caption as real text. Props `value` (0–100) + `caption`. |
| `ProductCallouts.svelte` | The 3×3 device diagram — see §8. Callouts may carry an optional `description` (the client's technical figure notes); it is hidden below `sm`, where a corner cell is ~80px wide. |
| `VideoFacade.svelte` | Click-to-load video; **nothing is fetched until the viewer presses play**. `sources={{ webm?, mp4 }}` → a self-hosted native `<video>` (preferred: no third party is contacted at all); `videoId` → a `youtube-nocookie` embed. Neither → "Coming soon" placeholder. Also `poster`, `caption`, `duration`. **Never show a fake duration.** `captionPosition`: `'below'` (default) \| `'above'` — the caption becomes the video's lead-in, first child of the `<figure>` (home page only). |
| `ImagePlaceholder.svelte` | Dashed accent frame + photo icon + a proposed image `description`. Marks where a real asset should go so the client knows what to supply; swap for `<enhanced:img>` on delivery. |
| `AutoAccordion.svelte` | The autonomous accordion — **see §6a for the conditions of use, which are binding.** Props: `items` (`{id, title, body?, icon?, seconds?}`), `controlLabel` (names the pause button), `autoplay`, and a `panel` snippet rendered once per item. Optional `group` on an item labels a run of consecutive items and wraps it in a `role="group"`. Takes its accent from the enclosing scope. |

Home page (`src/lib/components/home/`) — two sections below the hero since the 2026-09-27 redesign:

| Component | Notes |
|---|---|
| `HeroAudienceCards.svelte` | The two audience cards in the hero (replaced `KeyBenefits`, 2026-09-27). Each `<article>` in its own `.accent-*` scope: persona chip + eyebrow, serif `h2` (ids `benefits-patients` / `benefits-clinicians`), brand-teal ticks, and a footer link whose `::after` stretches over the card — the **whole card is the link** and the focus ring surrounds it. Intrinsic grid (`minmax(min(100%, 16.5rem), 1fr)`); wrapper `flex-col` + `article h-full` keep both cards one height with the footers level. No `use:reveal` (above the fold). |
| `QuoteRotator.svelte` | The hero's rotating testimonial panel — **see §6b for its conditions**. Props `items` (`{quote, author, subAuthor?, seconds?}`), `label`, `class` (placement only). |
| `HowItWorks.svelte` | **Section 2**, `id="how-it-works"` + `scroll-mt-24` (the hero's "See how it works" target): header + intro, the `ProductCallouts` diagram in a `.surface-card`, then a `[3fr_2fr]` row pairing the 30-second animation (caption **above** it) with the second-line explanation. |
| `ChooseJourney.svelte` | **Section 3**: three journey cards (`.accent-pill`, each in its own accent scope) + the Support Center shortcut. Its `h2` is `sr-only` — the bridge above reads "Choose Your Journey" (D14). **Carries `id="support"`** — see §2. |
| `WhatItIs.svelte`, `ProofStats.svelte`, `PersonaSection.svelte`, `Voices.svelte` | **Parked** — the pre-0831 home page. Not rendered; their CMS-approved copy is kept for the Support Center build. |
| `AudienceStub.svelte` | The `/partners` placeholder page: persona canvas + solid nav + "coming soon" roadmap + CTA panel. Replace with a real journey, don't extend. |

Patient page (`src/lib/components/patients/`) — four sections since the 0831 restructure:

| Component | Notes |
|---|---|
| `WhyChoose.svelte` | **Section 1**: the hero photo with the serif `h1` in a frosted glass panel **on** the image (docx: "text on top/top-right"), the intro sentence below it, then the four benefits as an `AutoAccordion` (§6a) and the `IndicationsStrip`. Its headers carry **no icon chip** — with one the 4-item list is 296 px against a 208 px grid; without, 251 px, and the icon moves to the pane. All four benefit *titles* stay visible; only the bodies collapse. *Trades +43 px desktop for −223 px mobile — the only section here that costs desktop height, taken because mobile is the viewport that is too long.* LCP image → `fetchpriority="high"`. The panel is `self-end sm:self-start` — at 375px the crop puts the subject's face at the top, so the headline drops to the bottom. |
| `PatientStories.svelte` | **Section 2**: header + the four stories as an `AutoAccordion` (§6a) — theme label in the list; quote, attribution and that person's "read my story" link in the pane — then "more stories" (`SupportCenterCard` reuse). *729 → 731 px desktop (unchanged), 1 930 → 1 430 px mobile — this one is bought entirely for the phone.* |
| `OutcomesChart.svelte` | *(now in `shared/`)* Two single-series labeled-bar lists on a shared 0–100% scale. `heading`/`intro` are **optional** — inside an accordion pane the item header already carries them. |
| `ClinicianQuotes.svelte` | Manual quote slider (see Motion §6 slider rules) + disclaimer line. `heading` is **optional** for the same reason as `OutcomesChart`'s. It now lives inside an `AutoAccordion` pane — a manual slider nested in an accordion pane is a wrinkle worth revisiting (promoting the three quotes to accordion items would remove it, at the cost of retiring this component). |
| `EvidenceOutcomes.svelte` | **Section 3**: stat cards stay a visible row, then chart / expert consensus / clinician quotes become an `AutoAccordion` (§6a) — three parallel answers to "what does the research show?", each with its own visual. *1 273 → 859 px desktop.* |
| `NextSteps.svelte` | **Not an accordion** (§6a — CTAs stay visible). Section 4 composition: CTA tiers (primary wears the home audience-card gradient via scoped `.cta-primary`; others = home support-card neutral), dive-deep band, and the full-bleed closing `tint-band` with the serif callback quote. |
| `HowItWorks.svelte` | **Parked** — "how does it work?" is a homepage question now. Kept for the homepage rebuild; not rendered. |

Clinician page (`src/lib/components/clinicians/`) — six sections since the 0831 restructure; the
route is composition only. All of them take the accent from the page's `.accent-clinician` scope:

| Component | Notes |
|---|---|
| `ClinicalValue.svelte` | **Section 1**: serif `h1` + accent rule + two intro paragraphs, `ImagePlaceholder` beside them (the hero photo is still a pending client asset), then the two benefit groups as an `AutoAccordion` (§6a) — the **group** is the item and its three benefits are the pane, which is the docx's "1 box for the 3 patient benefit, 1 box for the clinician benefit … can be sliders as well to save space" almost literally. Keeping a group's three benefits together also keeps them comparable. *1 172 → 1 052 px desktop, 2 265 → 1 717 px mobile — the modest desktop figure is because the hero row and header, not the benefits, are most of this section.* |
| `ClinicalEvidence.svelte` | **Section 2**: the same three named studies, now an `AutoAccordion` (§6a) — each study's docx label is the header, its descriptor the summary line, and its visual the pane: a `<dl>` row of three serif figures (Lovász), `DonutStat` + a two-row bar list (Pothoven), the recognition figure (Buford). All three panes are `surface-card`. Footnotes and citations stay in the panes. *967 → 533 px desktop, 1 931 → 1 134 px mobile.* |
| `SocialProof.svelte` | **Section 3**: the "Trusted Worldwide" `StatCard`s stay a visible row (glanceable trust, ~150px), then all six quotes are one `AutoAccordion` (§6a) with the docx's two headings as `group` labels — theme label in the list, quote + attribution in the pane. The two Support Center cards sit side by side below (the audit's §4.4 merge still needs the client to say which copy survives). *1 375 → 1 058 px desktop, 3 019 → 2 083 px mobile.* |
| `Implementation.svelte` | **Section 4**: the docx's three blocks as an `AutoAccordion` (§6a) — each block title is already a claim, and the pane answers it: five indication icon chips (chips in one card, **not** five nested cards — that would stack surfaces, §4), the six-item workflow checklist, and the three-step learning `<ol>` with static ↓ marks + resource pills. Only the indications block has a docx lead sentence, so only that item reveals a body. *820 → 532 px desktop, 1 723 → 998 px mobile.* |
| `NextSteps.svelte` | **Section 5**: three CTA tiers, one link each. Primary tier is `.accent-pill`, not the patient page's scoped gradient. |
| `SupportClosing.svelte` | **Section 6**: the Support Center box **and** the docx's closing statement in one full-bleed band — a bridge or a second band stacked here would put two tinted surfaces back to back. |
| `WhatIsIt.svelte`, `Mechanism.svelte` | **Parked** — "what is it?" / "how does it work?" are homepage questions now. Kept for the homepage rebuild; not rendered. |

*(`ImagePlaceholder` sits in the patient page's Section 2/3 headers: a two-column
`lg:grid-cols-[1fr_auto]`, image `lg:w-72`, stacking below the heading on mobile.)*

`ClinicianQuotes` is still under `patients/` and still hardcodes patient blue — promote it to
`shared/` and swap its accents for `--accent-ink` at the moment a second page needs it.

---

## 8. The 3×3 product diagram (`ProductCallouts`)

Worth its own section — it took several iterations, and the constraints are easy to break.

```
[ label TL .....] [   ][ ] [label TR]
[      —       ] [ D E V I C E ..... ]
[ label BL ] [   ][ ] [label BR .....]
```

- **The column edges are the leader anchors.** Five columns, and each interior edge is where
  one leader meets the photo, chosen so every label points at the part it names. The widths
  are derived from `product_features.png` (1251×262) as fractions of the photo's width:

  | edge | fraction | device part | leader |
  |---|---|---|---|
  | 1\|2 | 0.000 | rounded tip | bottom-left |
  | 2\|3 | 0.088 | flange | top-left |
  | 3\|4 | 0.215 | sealing collar | bottom-right |
  | 4\|5 | 0.300 | luer ribs | top-right |

  The photo keeps 60% of the width and the label columns 40%, giving
  `grid-cols-[minmax(0,400fr)_minmax(0,53fr)_minmax(0,76fr)_minmax(0,51fr)_minmax(0,420fr)]`.
  Placement: TL `col-start-1 col-span-2`, BL `col-start-1`, BR `col-start-4 col-span-2`,
  TR `col-start-5`. The left pair is deliberately *not* nearest-first: the seal copy belongs
  on the flange and the "only the tip enters" copy on the tip, so the top-left leader reaches
  past the bottom-left one. **Re-derive the tracks if the photo is re-cropped** — measure the parts
  from the alpha silhouette, don't eyeball them.
- **No column gap.** A uniform `gap-x` also sits inside the photo's own span, which pushes
  every anchor to the right of its part; the 0.5rem breathing room the layout used to get
  from `gap-x-2` now comes from the leader lines themselves.
- Each leader's **dot is inset ~4px from its cell edge** (`cx` 4/44 of the 48-wide viewBox),
  so left-hand dots land a hair left of their anchor and right-hand dots a hair right. The
  flange edge is set to 0.088 rather than the flange's own 0.082 to absorb that.
- **`minmax(0, …)` is load-bearing.** A bare `fr` floors at the track's min-content width, so
  the labels and the 1251px-wide photo would blow the narrow anchor columns wide open.
- Device in the **middle row, spanning columns 2–5** (`col-start-2 col-span-4 row-start-2
  self-center`), image `block w-full h-auto`, `sizes="(min-width: 1024px) 31rem, 45vw"` —
  `sizes` describes the laid-out box (measured 488px on the clinician page, the widest), so
  re-check it whenever the column ratios change. The middle row carries no labels, so the
  span costs nothing; in a single column the device rendered barely 40px tall.
- **`product_features.png` is a cropped derivative, not the client's file.** The client's
  render is 2502×479 (kept beside it as `product_features-full.png`): its right half is only
  the syringe plunger, and that plunger is the *only* reason the canvas is 479 tall — within
  the left half, rows 0–109 and 372–478 are fully transparent and showed as dead space above
  and below the adapter. The shipped asset is the window **x 0–1251, y 110–372** = 1251×262
  (≈4.8:1), cropped tight to the device (`Image.getbbox()` returns the full frame).
  **When the client ships a new render, re-crop it the same way** — re-derive the box from
  the alpha bounding box of the left half — rather than compensating in CSS.
- **The image's cell must not be `flex`.** `<enhanced:img>` emits a `<picture>` wrapper; as a
  flex item the picture shrink-wraps to the `<img>`, whose `w-full` then resolves against the
  picture — a circular width that collapses to 0 until the image loads. A plain block cell
  resolves the percentage against the cell.
- **Same layout at every breakpoint** — there is deliberately no stacked mobile fallback. The
  image, leaders and label text scale down instead.
- **No icons on the labels.** The leader lines carry the label→device association.
- **Leader lines:** inline SVG, `viewBox="0 0 48 36"`, 1.25px line + 2.5r dot at the device end,
  `text-patient/45 dark:text-sky-300/45`, `w-8 h-6 sm:w-12 sm:h-9`. Four directions
  (side × pos) so every line converges on the device.
- **Vertical alignment inside a corner cell** — the subtle part:
  - Corner cells `self-stretch` to fill their grid row (otherwise there's no room to align in and
    short labels float centred).
  - **Text → outer edge:** top row `self-start`, bottom row `self-end` (labels frame the diagram).
  - **Leader → inner edge:** top row `self-end`, bottom row `self-start` (reaches toward device).
  - `gap-2 sm:gap-3` between text and leader.
  - Net effect: when two labels in a row wrap to different line counts, the shorter one still
    aligns to the same outer edge as its row-mate.
- Horizontal: `justify-self-end` (left column) / `justify-self-start` (right column) pulls labels
  toward the device; left-side callouts use `flex-row-reverse text-right`.

---

## 9. Content & copy

- **All copy lives in `src/lib/content/*.ts`** (typed objects), never inline in components. This
  keeps i18n open and makes the docx↔code diff reviewable.
- **The client docx is the source of truth** for wording. Don't paraphrase.
- **Never strengthen a claim.** Preserve the regulatory hedging verbatim: *"may make"*,
  *"designed to"*, *"many patients"*, *"most patients"*. This is a medical device.
- Where a mockup and the docx disagree, the docx wins **unless the client says otherwise**
  (they have; e.g. "repeatedly" and the mood-board quick-benefit labels).
- Any label/stat with no docx origin must be flagged to the client, not silently invented.
- Cite sources for clinical claims in a consistent `text-xs text-slate-500` line.

---

## 10. Links, routing, assets

- **Internal links must use `resolve()`** from `$app/paths` — `eslint-plugin-svelte`'s
  `no-navigation-without-resolve` is on and will fail the build otherwise.
  ```ts
  import { resolve } from '$app/paths';
  import type { ResolvedPathname } from '$app/types';
  const href = resolve('/patients');
  // cross-page fragment:
  const fragment = (hash: string) => (resolve('/') + hash) as ResolvedPathname;
  ```
  Props that carry a URL should be typed `ResolvedPathname`.
- **Images:** `src/lib/assets/**` → import + `enhanced:img` (hashed, AVIF/WebP). `static/**` →
  served at the **root** (`static/foo.webp` → `/foo.webp`) and **cannot be imported** (Vite
  forbids importing from the public dir); reference by URL and **URL-encode** spaces/`®`
  (e.g. `/Introducing%20the%20UroDapter%C2%AE.webp`).
- Only the above-the-fold hero image is eager (`fetchpriority="high"`); everything else
  `loading="lazy"`.
- **Video is self-hosted from `static/`, never embedded from a third party** where the client owns
  the file. Client masters are far too heavy to ship as-is (the 30-second animation arrived at
  38 MB); re-encode to a `.webm` (VP9) + `.mp4` (H.264, `+faststart`) pair around 2 MB each plus a
  WebP poster, and hand them to `VideoFacade`'s `sources` prop. Exact settings and the ffmpeg
  situation on this machine: [home-page-plan.md](home-page-plan.md).

---

## 11. Accessibility (WCAG 2.2 baseline)

- Semantic landmarks; `<section aria-labelledby>` + a real heading. Eyebrows are not headings.
- Decorative imagery `alt=""` + `aria-hidden` where appropriate; the message lives in the text.
- Visible focus: `focus-visible:ring-2 ring-patient dark:ring-sky-300`.
- Targets ≥24px. Contrast-check accents (patient blue passes on white; use `sky-300` on navy).
- Quotes are `<blockquote>`/`<footer>`, not styled divs.
- Any slider/carousel: pause on hover+focus, static under reduced motion.

---

## 12. Reusing this system for the clinician journey

**Built 2026-08-26, restructured to the 0831 client plan 2026-09-07.** The parameterisation rules
below are unchanged and still binding; only the page's *section list* changed (§2 and §7). See
[clinician-journey-page-plan.md](clinician-journey-page-plan.md) for its structure, copy
provenance and open items. The notes below are what the build actually followed.

The clinician page is the same system with different parameters — **do not fork patterns**:

- **Accent:** `--color-clinician` (#2c8979) everywhere the patient page uses `--color-patient`.
  Dark-mode small-accent swap: **`emerald-300`** (the home page already pairs clinician-teal
  with emerald-300 checkmarks) — i.e. `text-clinician dark:text-emerald-300`. Derive
  `--color-clinician-soft`/`-glow` the same way as the patient tints when first needed.
- **Colour, in one class:** `<div class="bg-persona-page accent-clinician">`. That is the whole
  retint — `.surface-card/panel/solid`, every `.tint-band`, the `.nav-gradient` header and every
  `--accent-ink` inside the shared components follow. See §1 and `AudienceStub.svelte`.
- **Same rhythm:** solid `SiteHeader` → open sections on the colourful persona canvas →
  alternating arrow/quote bridges → closing band. Sections are still not cards; cards use the
  `.surface-*` classes.
- **Same components, new content module** (`src/lib/content/clinicians.ts`): `SectionBridge`,
  `VideoFacade` (poster + nocookie embed), `SupportCenterCard`, `BenefitCard`,
  `TestimonialCard` (peer quotes), `OutcomesChart` (the evidence data is persona-neutral —
  chart series tokens stay as validated), `ClinicianQuotes`. Where a component still hardcodes
  patient classes (`text-patient dark:text-sky-300` etc.), parameterise it *at that moment*
  (accent prop or CSS variable) rather than duplicating the file.
- **Register shifts, rules don't:** clinician copy may be more technical (docx will provide),
  but claims stay verbatim-from-docx, sources stay cited, motion stays the three verbs, and the
  serif stays display-only.
- **Audience-page checklist:** nav link retarget (done — `SiteHeader` points at `/clinicians` and
  `/partners`), JSON-LD `audience` → `MedicalAudience/Clinician` (done), and the same definition of
  done (§14). **`AudienceStub` now serves `/partners` only** — the distributor journey is the
  remaining one to build, the same way, and under the 0831 architecture it too starts at the
  "why choose it" step rather than re-explaining the device.

**Building the distributor journey?** Follow §2's journey-step table: don't reintroduce a
"what is it / how does it work" section. If the distributor docx asks for one, that is a
homepage-vs-journey-page conflict — raise it with the client rather than resolving it in code.

---

## 13. SEO / AEO

Every page: `<svelte:head>` with a real `<title>` + `meta description`, plus JSON-LD
(`MedicalWebPage` + `MedicalDevice`, `audience: Patient`). Build the JSON-LD as a local string and
`{@html}` it — see [patients/+page.svelte](../src/routes/patients/+page.svelte).

---

## 14. Definition of done

A component isn't finished until all of these hold:

1. **Dark variant** — check it, don't assume (deep blue vanishes on navy).
2. **Mobile layout** at 375px.
3. **Reduced-motion** behaviour.
4. `svelte-autofixer` clean (Svelte MCP — required by CLAUDE.md, run it on every `.svelte` edit).
5. `npm run check` → 0 errors, `npm run lint` → clean.
6. **Verified in the browser**, not just typechecked: light + dark, 375/768/1280, keyboard pass.

### Browser-verification gotchas (in-app preview)

These are **preview-pane artifacts, not bugs — don't "fix" the code for them:**

1. **Blank grey band on scrolled screenshots** (compositor paint). Workaround: set a **tall
   viewport** (`resize_window 1280×3100`) and shoot the whole page in one capture instead of
   scroll+capture.
2. **A washed-out capture right after HMR** is the reveal transition mid-flight — just re-shoot.
3. **`loading="lazy"` images intermittently never fetch**, even when scrolled into view at the
   right size (`currentSrc` stays empty, `naturalWidth` 0). Confirm the asset is actually fine
   before touching code: `fetch(url)` → 200, and `new Image()` with the same URL loads. Setting
   `loading="eager"` in devtools loads it instantly. Lazy is still correct in production.
4. **After `preview_start`, the viewport can be ~0px wide** — the whole layout collapses and
   every measurement is nonsense. Always `resize_window` before measuring or screenshotting.
5. The **network panel records nothing** for cross-origin iframes (and often at all) — verify with
   `fetch()`/`curl` instead.
6. At **extreme viewport heights** (≈10k px+, used to capture the full 6-section page in one
   shot) the capture may **duplicate tiles** — the page content appears twice in the image.
   Verify structure with JS measurements (`scrollWidth`, grid `gridTemplateColumns`, element
   rects) and trust the un-duplicated upper portion of the capture.

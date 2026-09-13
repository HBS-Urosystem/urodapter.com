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
`0831/3. page_content.docx`** — see [home-page-plan.md](home-page-plan.md):

```
UroDapterHero        ← headline + subheadline on the photo, product chip,
                       credibility strip + regulatory line. One column, ending
                       just below the regulatory line.
                       Renders no <main> and no page wrapper — the route owns both.
KeyBenefits          ← two audience cards + the testimonial column beside them
SectionBridge          "A simple idea can make a remarkable difference."
HowItWorks   #how-it-works   ← intro, ProductCallouts, explanation, the 30s animation
SectionBridge
ChooseJourney #support ← three journey cards + the Support Center shortcut
```

**The credibility strip lives on the hero photo on purpose.** The docx opens by asking that "the
reader doesn't have to scroll down too much… cards or text elements might be inserted on the
opening image" — that is why credibility is overlaid rather than given a section of its own, and
it is the one place the page departs from docx order.

**The hero is no longer short, and that was a deliberate reversal.** It was ~530px at 1280 until the
horizontal lockup took a row of its own under the copy (~705px), and the testimonials then came back
into it (client direction 2026-09-13), which leaves it ~705px at 1280 — they fit in the right-hand
column without adding height — but **~913–999px below `lg`**, where they stack. The testimonials had
been moved out to the key-benefits row on 2026-09-08 precisely to reclaim ~240px; that decision is
now reversed. The height matters beyond looks: the band's aspect is the input to every crop anchor
below, so anything that changes the hero's height invalidates them.

**The hero photo now shows at every width** (client direction 2026-09-10). It used to be dropped
below 960px in favour of plain navy, because the single-column content covered it and cropped the
subject's face. It is back on small screens with a different anchor: below `md` the photo starts
*under* the `SiteHeader` and runs behind the product chip and the rest of the column; from `md` up
it is full-bleed behind the header as before. That switch is done by moving the *containing block*
— the wrapper around the photo is `relative md:static`, so the same `absolute inset-0` boxes
resolve against the wrapper on small screens and against the section on large ones. Don't replace
this with a hardcoded `top` offset: the header grows when the mobile menu opens, and the
containing-block version follows it for free.

**Under 1024px the brand lockup sits below the hero copy, left-aligned to it.** The headline row
is `flex flex-col gap-6 lg:flex-row`, so below `lg` the lockup — the UroDapter logo plus the product
chip — stacks under the copy. It was centred on the copy column until the logo joined it
(2026-09-11), and that stopped working: a centred lockup occupies the middle of the frame, and any
crop that keeps the clinician in shot puts the patient's face in the middle too, so the two collide
at *every* anchor in 400–640px. Left-aligning frees the right half of the frame for both subjects
(client direction 2026-09-12, chosen over cropping the clinician or covering the patient). From
`lg` up both width caps lift, the row turns, and the lockup sits right of the headline. It was also
briefly hoisted *above* the copy with `order-first`; at 768–1023px that read as part of the header
rather than the hero. Don't put it back, and don't re-centre it.

**The two logo lockups are sized by their ink, not their boxes, and never share a row.** Both SVGs
carry internal padding — the artwork fills 73.5% of the square viewBox's height and 63.6% of the
horizontal one's — so matching box heights would leave them visibly shorter than the product image.
The heights are therefore `productHeight / inkFraction`: the square lockup is `h-[3.4rem]`
(54px box → 40px of ink) and `sm:h-[5.44rem]` (87px → 64px), the horizontal one `lg:h-[8.65rem]`
(138px → 88px). Measured, the ink lands within 0.4px of the product image at every breakpoint
(client direction 2026-09-12).

Placement follows from how much frame the row can spare. Ink-matched, the horizontal lockup is
~196px wide, so below `md` it would push that row onto the patient's face — at 640px it cuts the
clinician from 67% of her width to 29%. The square lockup therefore runs below 768px. From `md` the
visible window is wide enough (69% of the frame at 768px vs 58% at 640px) that the horizontal one
costs nothing — measured at 768px it leaves the lockup ending at 60.8%, still clear of her head at
66%, with the clinician unchanged at 75% (client direction 2026-09-12). So: square below 768px,
horizontal beside the product image 768–1023px, and from `lg` horizontal again but in a row of its
own under the copy, centred on the text column, with the product image beside the headline. The
`md` height is `md:h-[6.29rem]` (101px box → 64px of ink).

At `lg`, `lg:flex-initial` on the copy column is what keeps the product image *next to* the text. As
`flex-1` the column grew to fill the whole 62% track, leaving a ~300px void and pinning the image to
the track's right edge (client direction 2026-09-12). The column is now as wide as the copy itself —
411px at 1024, 448px from ~1120 where `max-w-md` on the body caps it — with a 40px gap to the image,
and the headline still holds two lines at every width from 1024 up. The horizontal lockup centres on
that narrower column, so it tracks the copy rather than the track.

Both lockups are decorative (`alt=""`,
`aria-hidden`): `SiteHeader` already carries the brand as a link. They are plain `<img>`, not
`enhanced:img` — that transform is raster-only.

**The photo's crop anchor is stepped across five breakpoints, all measured.** Below `lg` the hero
band is portrait, so `object-cover` matches its *height* and overflows horizontally: the crop is
purely horizontal, `object-position`'s Y value does nothing, and its X value decides what sits behind
the brand lockup. Two goals pull against each other — the lockup must stay left of ~66% (the
patient's head runs ~66–78%) while the window must reach ~88% for the clinician (~85–100%) to be in
shot.

Restoring the testimonials (2026-09-13) made the band far taller below `lg` — 999px at 375 against
635px before — which narrowed the window to ~21% of the frame and cropped the clinician out
entirely. The fix is `.hero-photo`: below `lg` the photo is capped at `max-height: 40rem` and masked
to fade out over its last quarter, so the band's aspect stays near what it was before the quotes
came back and the quotes sit on the navy base below the fade. From `lg` the cap and mask are
removed — the hero is landscape there and crops vertically instead. With the cap in place:

| viewport | anchor | lockup ends at | patient whole | clinician shown |
|----------|--------|----------------|---------------|-----------------|
| 375      | 73%    | 65.0%          | yes           | 0% — see below  |
| 430      | 79%    | 65.3%          | yes           | 13%             |
| 480      | 84%    | 64.7%          | yes           | 38%             |
| 640      | 88%    | 61.8%          | yes           | 65%             |
| 768      | 88%    | 61.5%          | yes           | 73%             |
| 1023     | 88%    | 41.9%          | yes           | 91%             |
| 1280     | 75%    | 51.9% — beside the headline | yes | full |

375 is the one width where she still cannot appear: the window there is ~33% of the frame, too
narrow to hold lockup + patient + clinician at once, and the lockup has only ~1% of headroom before
it reaches the patient's face. That is geometry, not a tuning miss.

400px and 480px are expressed in rem (`min-[25rem]`, `min-[30rem]`) so they sort correctly against
Tailwind's rem breakpoints. **Re-measure before touching any of this**, and re-measure again if the
hero's height moves at all. These numbers are void if the hero photo is ever swapped, since they
encode where the two subjects stand in *this* frame.

**The sub-`lg` overlay dips where the faces are.** Above 1024px the horizontal fade leaves the
subjects almost clear (4–6% at the right), but below it a single top-to-bottom gradient sat as
heavily on the faces as on the background and the people read far darker than on desktop (client
direction 2026-09-12). The gradient now has four stops: it opens at 60%, **dips to 42% at 38%
height — where the crop puts the two faces** — and closes back to 62%/74% for the credibility strip
and the 12px regulatory line, which run over the subject's light sweater and need the cover. Dark
keeps the same shape, heavier throughout (86/60/74/82).

**The testimonials live in the hero again, in one set of markup.** From `lg` they are the
right-hand column of a `lg:grid-cols-[1.5fr_1fr]` grid, glass over the photo, as they were before
2026-09-08; below `lg` that wrapper is a plain block, so they simply fall after the credibility strip
*and* its regulatory line — the fine print belongs with the strip it qualifies, so the quotes go
under both (client direction 2026-09-13). No duplicate markup and no second copy of the quotes:
`KeyBenefits` lost its third column and is now `md:grid-cols-2`, and `quotes` is imported by the hero
instead.

**Per-section persona accents still apply**, but now *within* a section: `KeyBenefits` puts
`.accent-patient` and `.accent-clinician` on its two cards side by side, and `ChooseJourney`
scopes each journey card. The old page's blue → teal → purple *lane* structure is retired.

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
| Home hero `h1` | `font-bold tracking-tight text-[clamp(1.9rem,4.5vw,3rem)]` (still sans) |
| Body | `text-base leading-relaxed text-slate-600 dark:text-slate-300` + `text-pretty` |
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

Anything new must justify itself against these three. No parallax, 3D, cursor effects, or
autoplaying video — wrong register for anxious patients on a regulated medical page.

**Sliders/carousels are a last resort**, and when content genuinely demands one
(`ClinicianQuotes`): **manual only, never auto-advance**; stack all slides in one grid cell so
the box height fits the longest slide (no layout jump); crossfade opacity only, disabled via
`motion-reduce:transition-none`; `aria-live="polite"`, labelled dot + prev/next buttons. A
content *grid* (Section 4 testimonials) beats a carousel — the Section 4 carousel mockup was
rejected exactly because it hides content behind interaction.

---

## 7. Components

Shared (`src/lib/components/`):

| Component | Notes |
|---|---|
| `SiteHeader.svelte` | `variant: 'overlay'` (transparent, over the home hero photo) \| `'solid'` (subpages — a `.nav-gradient` navy→accent bar). Owns nav + mobile menu. Overlay is unchanged; only `solid` carries the primary-colour gradient. |
| `UroDapterHero.svelte` | Home hero: headline + subheadline over the photo, product chip, the four-item credibility strip and the one-line regulatory statement. Consumes `SiteHeader variant="overlay"`. Renders **no** `<main>` and **no** page wrapper — the route owns both. **Single column** (`lg:max-w-[62%]`), so the photo's subjects stay clear; the audience glass cards and the testimonial stack that used to sit here are gone (see §2). |

`src/lib/components/shared/` — used by more than one page. **These take their accent from the
enclosing `.accent-*` scope; never hardcode patient blue in them.** *(Moved out of
`components/patients/` 2026-08-26, when the home page began using them.)*

| Component | Notes |
|---|---|
| `SectionBridge.svelte` | `variant: 'arrow' \| 'quote'`, props `lead` (optional), `emphasis`. Full-bleed tinted band. **The page's separator — always exactly one between sections.** Omit `lead` when the bridge copy is a single sentence — a sentence stays in one element. |
| `BenefitCard.svelte` | Icon chip + title + body, optional `source` citation line (design system §9 — a card that carries a clinical claim carries its source). **Its chip+title treatment is the shared vocabulary** the testimonial theme labels rhyme with. |
| `TestimonialCard.svelte` | Theme chip+label (BenefitCard vocabulary), real `<blockquote>`/`<footer>`, optional story link (omit `linkLabel`/`href` when a grid shares one "read all" band, as the clinician page does). |
| `StatCard.svelte` | Icon chip + serif `highlight` + body + optional `source` citation. Extracted from `EvidenceOutcomes`; also the home page's "The numbers" row. |
| `SupportCenterCard.svelte` | Reusable "visit the Support Center" CTA. `variant`: `'solid'` (default — bold `.surface-solid` band, white text) \| `'tint'` (light `.surface-panel`). `href` typed `ResolvedPathname`. |
| `IndicationsStrip.svelte` | Tinted band: sentence + condition icon chips. Designed for ~4 chips; more than that squeezes the `sm:flex` row — the clinician page's five indications use their own card grid instead. |
| `OutcomesChart.svelte` | Two single-series labeled-bar lists on a shared 0–100% scale. Thin `h-2` bars, data-end-only rounding, recessive track, label+value as real text on every row (the bars are decoration over an accessible list), source line. Series colours: the validated `--chart-*` tokens only. *(Promoted from `patients/` 2026-08-26, when the clinician page needed it.)* |
| `DonutStat.svelte` | Single-value completion ring (the clinician docx's "large 74% continuation ring"). Arc drawn with `--chart-continuing` — **never the raw persona accent** (§1) — `stroke-linecap="round"`, SVG `aria-hidden`, percentage + caption as real text. Props `value` (0–100) + `caption`. |
| `ProductCallouts.svelte` | The 3×3 device diagram — see §8. Callouts may carry an optional `description` (the client's technical figure notes); it is hidden below `sm`, where a corner cell is ~80px wide. |
| `VideoFacade.svelte` | Click-to-load video; **nothing is fetched until the viewer presses play**. `sources={{ webm?, mp4 }}` → a self-hosted native `<video>` (preferred: no third party is contacted at all); `videoId` → a `youtube-nocookie` embed. Neither → "Coming soon" placeholder. Also `poster`, `caption`, `duration`. **Never show a fake duration.** |
| `ImagePlaceholder.svelte` | Dashed accent frame + photo icon + a proposed image `description`. Marks where a real asset should go so the client knows what to supply; swap for `<enhanced:img>` on delivery. |

Home page (`src/lib/components/home/`) — three sections since the 0831 rebuild:

| Component | Notes |
|---|---|
| `KeyBenefits.svelte` | **Section 1**: a two-column row of audience cards, each in its own accent scope. It carried the two docx testimonials as a third `.surface-panel` column from 2026-09-08 until they moved back to the hero (2026-09-13) — hence `md:grid-cols-2` with no `lg` step. The docx key-benefits headline is **split across the two card titles** (`h2` each), so the section has no headline of its own and is labelled by both — `aria-labelledby="benefits-patients benefits-clinicians"`. Inside a card: persona chip + serif title, that audience's problem sentence, a hairline, then the three benefits as **ticks** (bare check icon in `--accent-ink`, no chip). |
| `HowItWorks.svelte` | **Section 2**: header + intro, the `ProductCallouts` diagram in a `.surface-card`, then a `[2fr_3fr]` row pairing the second-line explanation with the 30-second animation. |
| `ChooseJourney.svelte` | **Section 3**: three journey cards (`.accent-pill`, each in its own accent scope) + the Support Center shortcut. **Carries `id="support"`** — see §2. |
| `WhatItIs.svelte`, `ProofStats.svelte`, `PersonaSection.svelte`, `Voices.svelte` | **Parked** — the pre-0831 home page. Not rendered; their CMS-approved copy is kept for the Support Center build. |
| `AudienceStub.svelte` | The `/partners` placeholder page: persona canvas + solid nav + "coming soon" roadmap + CTA panel. Replace with a real journey, don't extend. |

Patient page (`src/lib/components/patients/`) — four sections since the 0831 restructure:

| Component | Notes |
|---|---|
| `WhyChoose.svelte` | **Section 1**: the hero photo with the serif `h1` in a frosted glass panel **on** the image (docx: "text on top/top-right"), the intro sentence below it, then the four benefit cards and the `IndicationsStrip`. LCP image → `fetchpriority="high"`. The panel is `self-end sm:self-start` — at 375px the crop puts the subject's face at the top, so the headline drops to the bottom. |
| `PatientStories.svelte` | Section 2: header + testimonial grid + "more stories" (`SupportCenterCard` reuse). |
| `OutcomesChart.svelte` | *(now in `shared/`)* Two single-series labeled-bar lists on a shared 0–100% scale. |
| `ClinicianQuotes.svelte` | Manual quote slider (see Motion §6 slider rules) + disclaimer line. |
| `EvidenceOutcomes.svelte` | Section 3 composition: stat cards (serif first-word highlight + citation) → chart + consensus callout → quotes slider. |
| `NextSteps.svelte` | Section 4 composition: CTA tiers (primary wears the home audience-card gradient via scoped `.cta-primary`; others = home support-card neutral), dive-deep band, and the full-bleed closing `tint-band` with the serif callback quote. |
| `HowItWorks.svelte` | **Parked** — "how does it work?" is a homepage question now. Kept for the homepage rebuild; not rendered. |

Clinician page (`src/lib/components/clinicians/`) — six sections since the 0831 restructure; the
route is composition only. All of them take the accent from the page's `.accent-clinician` scope:

| Component | Notes |
|---|---|
| `ClinicalValue.svelte` | **Section 1**: serif `h1` + accent rule + two intro paragraphs, `ImagePlaceholder` beside them (the hero photo is still a pending client asset), then two labelled groups of three `BenefitCard`s — "For Your Practice" / "For Your Patients". Two labelled rows, **not** cards nested inside a box: that would stack surfaces. |
| `ClinicalEvidence.svelte` | **Section 2**: three named study blocks — a `<dl>` row of three serif figures (Lovász), `DonutStat` + a two-row bar list (Pothoven), and a recognition `.surface-panel` (Buford). |
| `SocialProof.svelte` | **Section 3**: clinician `TestimonialCard` grid + a `tint` Support Center band, the three "Trusted Worldwide" `StatCard`s, then the patient quote grid + a `solid` Support Center band. Two bands in one section: the first is tinted so only the last one is loud (§4). |
| `Implementation.svelte` | **Section 4**: five indication icon cards, the six-item workflow checklist in a `.surface-panel`, and the three-step learning `<ol>` with static ↓ marks + resource pills. |
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

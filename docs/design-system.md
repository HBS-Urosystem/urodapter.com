# UroDapter Design System

The binding reference for building anything on this site. It records the decisions actually
shipped in code, including the ones that reversed an earlier approach. **Read this before adding a
section, page, or component.**

> **2026-10-05 — UroSystem Brand Guideline 1.0** (`Brand Identity Codes_UroSystem.pdf` in the
> client's `urodapter - UX/Képek, design ötletek/` folder). Owner decisions:
> **(1)** the whole site is set in **Source Sans 3** — the serif display face is retired (§3);
> **(2)** the palette is regrouped by the guideline: 60% UroSystem primary, 30% the UroDapter
> colours (pine, lagoon, `#09979d`, aqua, powder, steel) plus lilac / plum from the UroDapter
> brand book for the distributor, 10% the warm secondaries (sun, coral, blush). The brand teal
> moved to the guideline's values (`#09979d` light / `#6fc6ca` dark); spruce, graphite and
> silver are gone (§1); **(3)** the client's Canva-exported icons (bitmap masks, not
> recolourable) are replaced by heroicons; **(4)** the icon rule now admits the client's
> *vector* brand pictograms next to heroicons (§5).
>
> **2026-09-29 — brand palette.** Every colour now comes from the client's brand guide (three
> palettes, used **60% primary / 30% complementary / 10% secondary**, §1). The three persona
> colours were remapped onto it (patient `#0b3b54`, clinician `#166b6a`, distributor `#8376a3`),
> navy became the guide's primary petrol, eyebrows became colour pills, and persona colours may
> now appear on each other's pages. Values quoted elsewhere in this doc from before that date
> (`#18438a`, `#2c8979`, `#8764b9`, `sky-300`, `emerald-300`, `#08111f`) are historical.
>
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

### The brand palette — 60 / 30 / 10 *(ratio: owner direction 2026-09-29; sets: UroSystem Brand Guideline 1.0, 2026-10-05)*

The colours come from two client documents: the **UroSystem Brand Guideline 1.0** (UroSystem
primary colours, the UroDapter colour scheme, the secondary colours) and the **UroDapter brand
book** (lilac and plum). The owner set the ratio: **60% primary, 30% complementary
("kiegészítő"), 10% secondary**. Every colour on the site is one of these, or a *measured* shade
of one where small text needs AA on a light surface. Don't add a colour from outside them.

| Set | Share | Colours → tokens | What it carries |
|---|---|---|---|
| **Primary** (UroSystem) | 60% | `#072c3f` `navy-950` · `#0b3b54` `navy-900` · `#52b2d6` `cerulean` · `#c7e1f0` `mist` | The structure on every page: text, the header, dark mode, the canvas and bridge base, the patient persona |
| **Complementary** (UroDapter) | 30% | `#166b6a` `pine` · `#23a0a3` `lagoon` · `#09979d` `brand` · `#6fc6ca` `aqua` (= `--brand-bright`) · `#99c7e0` `powder` · `#3e94b7` `steel` — from the guideline; `#caa8cf` `lilac` · `#8376a3` `plum` — from the UroDapter brand book | Persona tints (clinician pine + aqua, distributor plum + lilac), the brand highlight, the home canvas's second glow |
| **Secondary** | 10% | `#f9e497` `sun` · `#ef797a` `coral` · `#f4ded8` `blush` (+ white) | The warm pops — eyebrow pills (coral / sun) and highlights |

In practice the 60% is automatic: navy text, the header, the mist canvas and every dark-mode
surface are primary on every page. The persona tint is the 30% layer over it, and the pops are
kept small — **pills and highlights, never a section background**.

**The guideline's gradients** (available, not yet tokens): `#0b3b54 → #072c3f` 45° and
`#c7e1f0 → #52b2d6` −45° (UroSystem); `#166b6a → #23a0a3` 45°, `#6fc6ca → #09979d` −45° and
`#99c7e0 → #3e94b7` 45° (UroDapter). Use these pairs, at these angles, when a surface needs a
brand gradient rather than inventing a stop.

*(Until 2026-10-05 the complementary set also listed `#005c5b` spruce, `#706f6f` graphite and
`#c6c6c6` silver, and the brand teal was `#02979d` / `#78c7c9`. None of those is in the
guideline; the three greys were never used outside their token declarations and were removed.
Pine, lagoon, aqua, powder and steel were listed as secondary; the guideline groups them with
the UroDapter colour scheme, so they count toward the 30%.)*

Defined in `@theme` (Tailwind v4) in `layout.css`:

| Token | Value | Use |
|---|---|---|
| `--color-navy-950` | `#072c3f` (primary) | Deepest petrol — header base, text on light, text on bright fills |
| `--color-navy-900` | `#0b3b54` (primary) | Dark bridge band base; the patient colour |
| `--color-navy-800` / `-700` | `#114a68` / `#18597b` | Lighter steps of the same hue — raised chips on dark, hovers |
| `--color-cerulean` / `--color-mist` | `#52b2d6` / `#c7e1f0` | Primary brights: patient tint + dark ink / the canvas and band base |
| `--color-patient` | `#0b3b54` | **Patient** persona (deep) |
| `--color-clinician` | `#166b6a` | **Clinician** persona (deep) |
| `--color-distributor` | `#8376a3` | **Distributor** persona (deep) |
| `--color-brand` | `#09979d` light / `#6fc6ca` dark | **Brand highlight** — the UroDapter teal. Constant on every page, scheme-aware (2026-09-28; guideline values since 2026-10-05) |
| `--font-sans` | `Source Sans 3 Variable` | The one typeface (UroSystem Brand Guideline 1.0, 2026-10-05) — body, UI, labels |
| `--font-display` | `Source Sans 3 Variable` | The same family, kept as the display-headline role token (§3) |

**Dark mode is deeper than navy-950 at the top.** The persona and home canvases run `#041c29 →
#062536 → navy-950`, and dark cards/panels mix their tint into **navy-950, not navy-900**: the
primary petrol is lighter than the old navy, and on a `navy-900` base slate-400 small print fell
to 3.7:1. Measured now: slate-400 ≥ 4.64:1 on every dark card and panel of all three personas
(panels are capped at the card's 10% tint for exactly this — at 12% clinician measured 4.44:1).

Derived single-purpose tints (in `:root`, not `@theme` — they're surfaces, not a scale):

- `--color-patient-soft` = 14% cerulean in white → light tinted chips
- `--color-patient-glow` = 30% cerulean, transparent → dark-mode radial glows
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

**Each persona is a pair of palette colours** (2026-09-29): a **deep** one for fills under white
text, and a **bright** one for tints. Mixed into white, a deep colour turns grey; the bright one
keeps the surfaces colourful.

| Persona | Deep (fills, nav, ink base) | Bright (tints; dark-mode ink) | Pop (eyebrow pill) |
|---|---|---|---|
| Patient | `#0b3b54` navy-900 (primary) | `#52b2d6` cerulean (primary) | `#ef797a` coral |
| Clinician | `#166b6a` pine (complementary) | `#6fc6ca` aqua (complementary) | `#f9e497` sun |
| Distributor | `#8376a3` plum (complementary) | `#caa8cf` lilac (complementary) | `#f9e497` sun |

Each scope sets every token below; `:root` carries the patient set as the default:

| Token | Role |
|---|---|
| `--accent` | The raw persona colour (deep). |
| `--accent-ink` | The **readable** accent, for text/borders/icon strokes. Components write `text-(--accent-ink)`, never a `dark:` pair. Light / dark, measured (on white · on the deepest `.surface-panel` tint): **patient `#1d6788`** — cerulean darkened, since `#0b3b54` reads as the heading navy — 6.27 · 5.06; **clinician `#166b6a`** as is, 6.28 · 5.30; **distributor plum 80% + black** (`#695e82`; raw plum is 4.13:1) 5.94 · 4.98. In dark mode it is the bright partner: cerulean / aqua / lilac, 6.6 / 8.0 / 7.6:1 on the dark canvas, ≥ 5.05:1 on dark cards. Measure before changing any persona ink. |
| `--accent-soft` | Icon-chip fill (16–20% bright in white; 16% bright alpha in dark). |
| `--accent-solid` | Flat fill for compact solid CTAs — clears AA under white text in every persona: patient 11.9, clinician 6.3, distributor (plum 85% + black) 5.4 (see `.accent-pill`, §4). |
| `--accent-pop` | The persona's secondary **pop** — the `eyebrow` pill fill (§3). Navy text on it: coral 5.33:1, sun 11.5:1. |
| `--surface-accent` / `--band-accent` | The **bright** colour — the tints of cards, panels, the canvas glows, bridge glows. |
| `--surface-deep` | The **deep** colour — `.surface-solid` bands and card shadows. |
| `--nav-accent` | The nav bar's end colour, set per scope to keep white text ≥ 5.4:1 (patient: 75% deep + cerulean, 7.7:1). |

Two rules that are easy to get wrong:

1. **Never declare `--surface-accent` / `--surface-deep` / `--band-accent` / `--nav-accent` on the
   styled element itself.** A declaration on the element beats the inherited value, so a
   self-declaring `.surface-card` could never be retinted from an ancestor. They read
   `var(--surface-accent, var(--color-cerulean))` at each use site instead — inherit, with a
   patient fallback. *(Fixed 2026-08-26; the bug was invisible while patient was the only persona.)*
2. **Never derive one accent token from another across a scope boundary.** A custom property
   inherits its *substituted* value, so `--accent-soft: color-mix(…var(--accent)…)` declared on
   `:root` would keep `:root`'s colour inside `.accent-clinician`. Every scope redeclares them all.
- `.nav-gradient` (layout.css) = the subpage nav bar's diagonal **navy→accent** gradient (logo
  stays on deep navy, the bar carries the persona colour). Accent via `--nav-accent`. Same in
  light & dark (the header is always dark with white text).

**Persona colour rule:** each audience page uses its own accent, set once on the page wrapper.
Shared components take the accent from the page — never hardcode one.

**Persona colours may appear on each other's pages** *(owner direction 2026-09-29)*. Where a page
shows another audience's content, that block wears the other audience's scope: the patient
page's clinician quotes are `.accent-clinician`; on the clinician page the patient quotes, the
"Want to hear more patient stories?" card and the "For Your Patients" benefits card are
`.accent-patient`. Put the scope on the smallest wrapper that holds that content —
`AutoAccordion` items take an `accentClass` for this (§7).

### The brand highlight — `--brand-*` *(2026-09-22)*

A second, **page-independent** accent: the UroDapter teal, **`#09979d` in light mode and `#6fc6ca`
in dark** — the guideline's UroDapter teal pair (2026-10-05; `#02979d` / `#78c7c9` from 2026-09-28,
and before that a single `#75c6c9`, the colour the logo SVG files still carry). Where `--accent-*` says *which audience you are reading*, the
brand teal says *this is UroDapter* — so it is declared once on `:root` and the `.accent-*` scopes
never touch it. Do not redeclare it inside a persona scope.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--color-brand` | `#09979d` | `#6fc6ca` | The brand colour. Tailwind: `text-brand`, `bg-brand`. The header logo uses it. |
| `--brand-bright` | `#6fc6ca` | `#6fc6ca` | The bright teal (`var(--color-aqua)`), scheme-independent: dark mode's `--color-brand`, and the logo on surfaces that are dark in both schemes (the journey pages' `.nav-gradient` header). |
| `--brand-ink` | `#096b6e` | `#6fc6ca` | Readable text / icon / border colour. |
| `--brand-fill` | `#09979d` | `#6fc6ca` | Button & chip background (white text in light, navy in dark). |
| `--brand-soft` | 10% teal in white | 14% teal alpha | Chip tint. |
| `--brand-on-fill` | `#fff` | `--color-navy-950` | Text on `--brand-fill`. White in light mode by owner direction (2026-09-28) — **3.54:1, AA only for large text**; navy in dark, where white would be 1.98:1. |
| `.brand-pill` | `--brand-fill` + white text | `--brand-fill` + navy text | Brand button; the counterpart to `.accent-pill`. |

**Why the split by job.** Measured (WCAG 2, re-measured 2026-10-05 on the guideline values):
light `#09979d` is 3.54:1 on white — enough for the logo, a focus ring or a fill (≥ 3:1), not for
small text — and only 4.11:1 under navy-950 text, so the light fill carries white text (below).
Dark `#6fc6ca` is 6.00:1 as text on navy-900, 7.36:1 as a fill under navy-950 text and 8.81:1 on
the darkest canvas stop. *(The 5.33 / 8.95 / 9.74 figures this paragraph quoted before 2026-10-05
were measured against the pre-2026-09-29 navy and did not hold on the current one.)* So
light-mode *text* keeps its own,
darker ink, `oklch(0.48 0.08 198.3)` = `#096b6e` — the same hue, 6.29:1 on white and ≥4.85:1 on
every card / canvas / bridge tint of all three personas (re-measured on the 2026-09-29 palette:
4.85 on the band's mist base, 5.07–5.31 on the deepest panel tints). **Text on the fill is set per scheme by
`.brand-pill` itself** (`--brand-on-fill`): white in light mode at the owner's request
(2026-09-28), navy in dark. White on the light fill is **3.54:1 (4.11:1 on hover) — below AA's
4.5:1 for normal-size text**; the button's 16px semibold label counts as normal text. It would pass
if the label were large text (≥ 18.66px bold) or the fill darker; **the owner accepted the
3.55:1 of the earlier `#02979d` (2026-09-28)**, and the guideline's `#09979d` measures the same —
don't "fix" it without asking. White on the dark-mode fill would be 1.98:1, so never set it there.

**Where it is used** (2026-09-22): interaction affordances and highlight marks, on every journey
page. Persona CTAs are deliberately *not* included — `.accent-pill`, `.surface-solid` bands and the
`NextSteps` cards keep their audience colour.

| Brand teal | Still persona |
|---|---|
| `SectionBridge` arrow chip, rule | Bridge band tint (`--band-accent`) |
| `AutoAccordion` rail + fill, header icon chips (the open item's filled with `.brand-pill`), play/pause button, focus outlines | The accordion's group label |
| The `→` story/testimonial links + their focus rings | Section eyebrows (the persona's `--accent-pop`) |
| The hairline rules under display headlines (`WhyChoose`, `AudienceStub`) | `StatCard` / `BenefitCard` / `IndicationsStrip` chips, page canvas, cards, nav |
| Home hero: "See how it works" (`.brand-pill`), the regulatory pill's shield, the audience cards' ticks, the quote rotator's dot fill + focus rings, the webshop link | The audience cards' chips, eyebrows and borders |

**Known limit — the clinician page.** The clinician colours are teals from the same guide as the
logo, so on `/clinicians` the brand highlight and the persona accent nearly coincide: light
`#096b6e` brand ink vs `#166b6a` clinician ink, and in dark mode both are `#6fc6ca` (since
2026-10-05 — the guideline's aqua is the dark brand teal *and* the clinician ink). The highlight reads
as cohesion rather than emphasis there. If emphasis is wanted, separate by **lightness** — use
the fill forms (`.brand-pill`, `--brand-fill`, `--brand-soft`) rather than `--brand-ink` next to
clinician ink.

### Dark-mode accent swap (important)

The deep persona colours (`#0b3b54`, `#166b6a`, plum) **disappear against the dark canvas**. The
scopes swap `--accent-ink` / `--accent-soft` to the bright partner in dark mode, so components
never need a `dark:` colour pair for an accent:

```html
<!-- accent comes from the enclosing .accent-* scope, in both schemes -->
class="text-(--accent-ink)"
class="bg-(--accent-ink)/60"
class="border-(--accent-ink)/20 dark:border-(--accent-ink)/25"
```

The last hardcoded `text-patient dark:text-sky-300` pairs (patient `NextSteps`, `ClinicianQuotes`,
the section eyebrows) were converted on 2026-09-29. Don't reintroduce them.

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
SectionBridge (bridge + problems)
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
| 1024 | 600×400 (3:2) | 76px clear | nothing | whole |
| 1280 / 1440 | 682×455 (3:2) | 85px clear | nothing | whole |

**The quote panel is sized in cards.** A card is `(100% − 2 × 1.25rem inset − 1rem gap) / 2` of
the photo box, and the panel's left edge always lines up with the patient card's. At md (48–64rem)
it is **7/6 of a card** (D4, `calc((100% - 3.5rem) * 7 / 12)` — 455px vs 390px cards at 900). From
lg it is **exactly one card** (`calc((100% - 3.5rem) / 2)`), so it squares up with the patient card
below it (owner direction 2026-09-28: at 7/6 it read as slightly too wide). Measured: 272px at
1024, 313px at 1280/1440, both edges flush with the card; the narrower panel is taller (241px at
1024, 225px at 1280) but still clears the cards by 52px / 109px. The inset and gap are fixed for
exactly this reason — make them fluid and the calc has to follow.

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
| Home hero `h1` | `font-bold tracking-[-0.035em] leading-none text-balance text-[clamp(2.75rem,19.2cqi-1.27rem,4.75rem)]`. Sized by its **column** (`@container` on the copy block): 44px at 375, 73px in the 486px desktop column, 76px cap. One string; "Catheter‑free" uses U+2011 so it never breaks after the hyphen (5.45em wide in Source Sans 3 bold with the tracking, measured 2026-10-05 — 5.8em in the system sans it replaced; the cqi slope keeps it on one line with room for wider fallback fonts). |
| Body | `text-base leading-relaxed text-slate-600 dark:text-slate-300` + `text-pretty` |
| Home audience cards | display `h2` (`font-display font-semibold`) `text-[clamp(1.25rem,1.7vw,1.5rem)]`, ticks `text-[15px] leading-snug space-y-2` (tighter than body, client direction 2026-09-27) |
| Small print | `text-xs text-slate-500` |
| Eyebrow | `class="eyebrow"` — a Tailwind `@utility` in layout.css: a 26px pill, 12px semibold uppercase `tracking-[0.16em]`, **navy-950 text on the persona's `--accent-pop`** (coral on patient, sun on clinician/distributor), in both schemes. *(2026-09-29, owner: "colour the eyebrows"; was ink-coloured text.)* An icon may sit inside it (the home bridge's "For patients"). |

**One typeface: Source Sans 3** *(UroSystem Brand Guideline 1.0, owner direction 2026-10-05)*.
Self-hosted as `@fontsource-variable/source-sans-3` (upright + italic, weight axis 200–900) and
wired in as Tailwind's `--font-sans`, so every element gets it without a class. `--font-display`
points at the same family: keep writing `font-display` on display headlines — it is the *role*
token, so a later change of display weight or face is one line in `layout.css`, not 30 call sites.
The guideline shows Light, Regular, Bold and their italics; the site uses 400 for body, 600 for
display headlines and labels, 700 for the home hero `h1`. Don't add a second family.
*(Source Serif 4 was the display face from 2026-07-14 to 2026-10-05, and body text was the system
sans. The open item "back-port the serif to the home hero `h1`" is closed by this change.)*

**Headlines are one sentence in one element.** Don't split a sentence into an eyebrow + rest —
the patient `h1` renders the full sentence uninterrupted. Eyebrows are separate short labels
(e.g. "Patient benefits"), never a fragment of the heading. Never render "SECTION n" — the docx
numbering is internal-only.

**Accent rule** (the short bar under a headline): `h-0.5 w-12 rounded-full bg-(--accent-ink)/60`
(or `bg-(--brand-ink)/60` for the brand rules listed in §1), `aria-hidden`.

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
| Page canvas | `.bg-persona-page` | **Primary mist base on every page** (light: 15→55% mist in white; dark: `#041c29 → navy-950`) with three glows in the persona's bright colour — the 60 / 30 split made literal (2026-09-29). Pair with an `.accent-*` class — the patient page is `bg-persona-page accent-patient`. The home page's neutral `.bg-page-gradient` is the same mist base with a cerulean and a lilac glow. *(Renamed from `.bg-patient-page` 2026-08-26 — it was never patient-specific.)* |
| Content card | `.surface-card` | White warming to 12% of the bright colour, a **visible** 42% border (was 22% — more card/canvas contrast, 2026-09-29), a soft shadow in the deep colour. Benefit/testimonial/stat/chart/video/product cards. |
| Tinted panel | `.surface-panel` | Deeper bright tint (16→26%), 50% border. Callouts, indications strip, clinician-quote box, dive-deep band. In dark mode it is no deeper than a card (see §1) and stands out by its border. |
| Solid CTA band | `.surface-solid` | **Bold persona fill** + white text: `--surface-deep` → 22% of the bright partner toward the bottom-right (38% in dark). For strong "go here" invitations (Support Center bands) and the solid bridge. White text, measured at the bright end: patient 8.1, clinician 4.7, distributor 4.3 (a corner the text never reaches). |
| Full-bleed band | `.tint-band` | Section bridges + closing band: mist base, persona glows via `--band-accent` (§1). |
| Compact solid CTA | `.accent-pill` | **Flat** `--accent-solid` fill for buttons and small CTA panels. `.surface-solid` is a *band*: its gradient brightens toward a corner the text never reaches. A pill is small enough that its label sits across the whole sweep, so it stays flat. Use `.surface-solid` for bands, `.accent-pill` for buttons. |

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

**Two sources, nothing else** *(owner direction 2026-10-05; until then "heroicons outline only")*:

1. **Heroicons outline** — the default for UI marks, benefits and features.
   - Inline the single path `d` string; draw with `currentColor`.
   - `viewBox="0 0 24 24"`, `fill="none"`, `stroke-width="1.5"` (2 for small/dense marks),
     `stroke-linecap="round" stroke-linejoin="round"`, `aria-hidden="true"`.
2. **The client's vector brand pictograms** — the line drawings from the brand guideline's icon
   page, for things heroicons cannot draw (conditions, the catheter, the bladder and urethra).
   Source folder: `urodapter - UX/Képek, design ötletek/Ikonok/`. Only the files that are real
   vectors qualify: `no catheter.svg`, `kateter.svg`, `urethral treatment 2.svg`,
   `chemo cystitis.svg`, `irradiation cystitis.svg`, `male-female.svg`. (`no pain 2.svg` is a
   vector but holds only the strike-through lines, not the lightning bolt.)
   - They are **filled outlines**, not strokes: merge the file's paths into one `d`, keep the
     file's own `viewBox`, draw with `fill="currentColor"` (drop the hard-coded `#4bb3d6`-style
     fills), `aria-hidden="true"`. Size by height; the viewBoxes are not square.
   - Don't mix the two sources inside one row or grid of equal items — one set per row.

**Never ship the Canva exports** in that folder — `bladder care.svg`, `bladder pain.svg`,
`bladder.svg`, `no pain.svg`, `pill.svg`, `save time.svg`, `urodapter.svg`. Each is a 400–950 KB
file whose drawing is an embedded bitmap mask, so `fill` cannot recolour it and dark mode cannot
retint it. Use the heroicon instead: *no pain* → `face-smile`, *save time* → `clock`, *pill* →
`beaker` (the home page's existing choice for post-cancer cystitis). The three bladder drawings and
the UroDapter device drawing have no heroicon equivalent — ask the client for a vector export
before using them.

No icon fonts, no third set.

- Icon `d` strings — both sources — live **next to the copy** in `src/lib/content/*.ts`, with a
  comment naming the icon (e.g. `// face-smile`, `// brand: no catheter.svg`).
- Chip: `w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20
  dark:border-(--accent-ink)/25 text-(--accent-ink)`. A chip that marks the *current* item (the
  open accordion item, the open Clinical value tab) is filled instead — `.brand-pill` or
  `bg-(--accent-solid) text-white`.

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

**Where it is applied.** Both journey pages, seven sections: clinician Sections 2–4, patient
Sections 1–3. Patient `NextSteps` is deliberately **not** one — see below.

**Clinician Section 1 left the accordion** *(owner direction 2026-09-29)*. Its two boxes ("For Your
Practice" / "For Your Patients") are side by side and always visible from 48rem; only on a phone do
they share one cell, behind two **side tabs** — a 44px column of icon + vertical label + rail
beside the card, so the handle sits *next to* the card rather than above a list. It keeps every
§6a condition (one cell so nothing moves — measured: page height identical across tabs; the rail
is the timer; pause control; reduced motion is manual; inactive panel `inert`), but it is its own
markup in `ClinicalValue.svelte` (APG vertical tabs, roles applied only below 48rem), not an
`AutoAccordion`.

**Not for CTAs.** Patient/clinician `NextSteps` stays a visible grid. Its three tiers are the
conversion path and each card is itself an `<a>`; putting two of three behind an interaction
works directly against what the section is for. Length is not the thing to optimise there.

**Conditions. All of them, or use a grid instead:**

- **Nothing leaves the DOM.** Collapsed bodies are clipped (`grid-template-rows: 0fr`), hidden
  panes are `visibility: hidden` — both still rendered, so every claim, footnote and citation
  is in the HTML for crawlers and AEO. The section gets shorter, not lighter.
- **The page must not move — and it takes *two* mechanisms, not one.**
  1. **The pane column**: all panes stack in one grid cell, so the box is as tall as the tallest
     — the §6 slider rule.
  2. **The list column**: a spacer (`.ac-reserve`) at the end of the list holds back whatever the
     open item's body does *not* use, so the list is always `base + tallest body` regardless of
     which item is open.

  Mechanism 2 was missing until 2026-09-30 and caused a real bug: clinician Section 2's Buford
  body is a 22-word sentence (88 px) against 36 px for the other two descriptors, so opening it
  made the list taller than the pane and pushed the page down 34 px at 1152 px. At 1280 px the
  pane happened to clear the list by **2 px**, which is why it looked fine at the width it was
  built at.

  > **Measuring this in the in-app preview needs care.** A hidden Browser pane freezes CSS
  > transitions, so `grid-template-rows` never animates from `0fr` and the bodies read as
  > collapsed — every item then measures the same height and the bug hides. Inject
  > `*{transition:none!important;animation:none!important}` before measuring, and after a
  > `resize_window` **reload** the page: the `ResizeObserver` that re-measures bodies on a width
  > change does not fire in a frozen pane either, so the reserve would be stale.

- **Prefer fixing the imbalance over reserving around it.** The spacer guarantees stability, but
  reserving the tallest body costs that height in *every* state. Where one item's body is the
  outlier, moving it into that item's pane is better — clinician Section 2 put Buford's sentence
  in its pane (the thinnest of the three at 168 px natural, against 343 and 316, so the pane
  column did not grow) and the section went back to its original 560 px instead of a permanent
  595 px.
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
| `SiteHeader.svelte` | `variant: 'page'` (transparent on the page gradient, scheme-aware text — the home page, rendered by the route before `<main>`) \| `'solid'` (subpages — a `.nav-gradient` navy→accent bar, white text). Owns nav + mobile menu. A **"Contact us"** pill closes the nav on every page (and the mobile menu); it points at `#support` until a contact route exists (`TODO(placeholder)`). The nav gap is fluid (`clamp(1rem, 2.5vw - 0.5rem, 2rem)`) so links + pill fit at 768px. **Brand = the logo, not a text wordmark** (2026-09-28): `UroDapterLogo` in a logo slot that takes the row's leftover width and is a size container — the horizontal logo shows while the slot is ≥ its width (8.875rem = 141.6px at the 56px md+ height), the stacked one where the horizontal would run into the menu. **The links collapse into the menu button by the same rule** (owner direction 2026-09-28): only when the link row no longer fits beside the *stacked* logo, not at a viewport width. CSS cannot query whether a row's own max-content width fits, so `fitLinks` (an attachment on the `<nav>`) measures it — the row's max-content width, read with one synchronous out-of-flow layout so it works in either state, + the nav gap + the stacked logo's width — before the first paint and again from a `ResizeObserver` on the nav and the row and on `document.fonts.ready`. The server render and the pre-hydration frame fall back to the md breakpoint. The result is three steps, each triggered by room, not width: horizontal logo + links → stacked logo + links → horizontal logo + menu button. Measured with Source Sans 3 (2026-10-05): links + horizontal logo from 729px (726px is already the stacked logo), links + stacked logo 618–726px, menu button at 615px and below — the narrower brand face moved both switches down from the system-font 772 / 687–771 / ≤ 686px; longer labels or text zoom move them back up. Logo height is fluid below md (44px at 375 → 56px at 768) and fixed from md. Colour: the brand colour, `text-brand` (`#02979d` light, `#78c7c9` dark), on the `page` variant (the light ring is 3.55:1 on white, clear of WCAG 2.4.11's 3:1); on the `solid` bar — dark in both schemes — always `--brand-bright` (`#78c7c9`), focus ring included (owner direction 2026-09-28). The header row is 56px tall from md (was 44px). |
| `UroDapterLogo.svelte` | The client's logo inlined (`variant: 'horizontal' \| 'stacked'`), `fill="currentColor"`, `aria-hidden` (the wrapping link carries the label). Paths are unchanged from `$lib/assets/hero/UroDapter_logo_horizontal.svg` / `_square.svg`; each viewBox is cropped to the artwork's ink (measured with `getBBox()`), because the source files carry 20–30% padding. Size it by `h-*` + `w-auto`. |
| `UroDapterHero.svelte` | Home hero (2026-09-27): regulatory pill, sans `h1`, body, brand-pill + outline CTAs, the framed photo with `QuoteRotator`, the product chip, `HeroAudienceCards`, the credibility strip (every item has a sub-line; the webshop link is off-site) and the regulatory line. Renders **no** header, **no** `<main>` and **no** page wrapper — the route owns all three. Placement rules and measurements: §2 *The home page*. |

`src/lib/components/shared/` — used by more than one page. **These take their accent from the
enclosing `.accent-*` scope; never hardcode patient blue in them.** *(Moved out of
`components/patients/` 2026-08-26, when the home page began using them.)*

| Component | Notes |
|---|---|
| `SectionBridge.svelte` | `variant: 'arrow' \| 'bridge'`, props `lead` (optional), `emphasis`, `problems` (optional, bridge variant only). Full-bleed tinted band. **The page's separator — always exactly one between sections.** Omit `lead` when the bridge copy is a single sentence — a sentence stays in one element. **No variant draws a quotation mark** (2026-09-30, owner: the bridge copy is the site's own line, not a quotation; the variant was called `'quote'` until then). **The rule is a divider, never an underline:** in the `bridge` variant it sits between `lead` and `emphasis`, and a bridge with only `emphasis` carries no rule at all. `problems` (`{id, label, text, icon, accentClass}[]`) adds a row of labelled audience statements above the emphasis — side by side when each gets 20rem, stacked below — and the rule then divides the problems from the answer. The problem labels are `eyebrow` pills in their own persona's pop. The arrow variant centres its row (`sm:justify-center`), which only moves bridges shorter than the row (home's "Choose Your Journey"). **`tone: 'tint' \| 'solid'`** (arrow variant, default `'tint'`): `'solid'` swaps the mist band for the persona's `.surface-solid` fill with white text and a glass arrow chip — the surface of the solid `SupportCenterCard`. Used once: the patient page's bridge into the stories, which matches the "Want to hear more patient stories?" card below it (owner direction 2026-09-29). Keep it rare — a solid bridge is louder than a solid CTA. |
| `BenefitCard.svelte` | Icon chip + title + body, optional `source` citation line (design system §9 — a card that carries a clinical claim carries its source). **Its chip+title treatment is the shared vocabulary** the testimonial theme labels rhyme with. |
| `TestimonialCard.svelte` | Theme chip+label (BenefitCard vocabulary), real `<blockquote>`/`<footer>`, optional story link (omit `linkLabel`/`href` when a grid shares one "read all" band, as the clinician page does). |
| `StatCard.svelte` | Icon chip + display `highlight` + body + optional `source` citation. Extracted from `EvidenceOutcomes`; also the home page's "The numbers" row. |
| `SupportCenterCard.svelte` | Reusable "visit the Support Center" CTA. `variant`: `'solid'` (default — bold `.surface-solid` band, white text) \| `'tint'` (light `.surface-panel`). `href` typed `ResolvedPathname`. |
| `IndicationsStrip.svelte` | Tinted band: sentence + condition icon chips. Designed for ~4 chips; more than that squeezes the `sm:flex` row — the clinician page's five indications use their own card grid instead. |
| `OutcomesChart.svelte` | Two single-series labeled-bar lists on a shared 0–100% scale. Thin `h-2` bars, data-end-only rounding, recessive track, label+value as real text on every row (the bars are decoration over an accessible list), source line. Series colours: the validated `--chart-*` tokens only. *(Promoted from `patients/` 2026-08-26, when the clinician page needed it.)* |
| `DonutStat.svelte` | Single-value completion ring (the clinician docx's "large 74% continuation ring"). Arc drawn with `--chart-continuing` — **never the raw persona accent** (§1) — `stroke-linecap="round"`, SVG `aria-hidden`, percentage + caption as real text. Props `value` (0–100) + `caption`. |
| `ProductCallouts.svelte` | The 3×3 device diagram — see §8. Callouts may carry an optional `description` (the client's technical figure notes); it is hidden below `sm`, where a corner cell is ~80px wide. |
| `VideoFacade.svelte` | Click-to-load video; **nothing is fetched until the viewer presses play**. `sources={{ webm?, mp4 }}` → a self-hosted native `<video>` (preferred: no third party is contacted at all); `videoId` → a `youtube-nocookie` embed. Neither → "Coming soon" placeholder. Also `poster`, `caption`, `duration`. **Never show a fake duration.** `captionPosition`: `'below'` (default) \| `'above'` — the caption becomes the video's lead-in, first child of the `<figure>` (home page only). `posterBar` (optional, 0–1): the height fraction of a caption bar burned into the bottom of a 16:9 poster — the duration pill is then centred in it (`bottom: posterBar × 50%` + `translate-y-1/2`) and scales with the video in `cqi` so it fits the bar even at phone width (~21px). A fixed `bottom-3` only lined up at one width (2026-09-28). The home poster's bar is 83/720, measured; re-measure if the poster is re-exported. Without it the pill keeps its fixed `bottom-3 right-3`. |
| `ImagePlaceholder.svelte` | Dashed accent frame + photo icon + a proposed image `description`. Marks where a real asset should go so the client knows what to supply; swap for `<enhanced:img>` on delivery. |
| `AutoAccordion.svelte` | The autonomous accordion — **see §6a for the conditions of use, which are binding.** Props: `items` (`{id, title, body?, icon?, seconds?}`), `controlLabel` (names the pause button), `autoplay`, and a `panel` snippet rendered once per item. Optional `group` on an item labels a run of consecutive items and wraps it in a `role="group"`. Takes its accent from the enclosing scope, **or per item from `accentClass`** (2026-09-29): an `.accent-*` class applied to that item's header, its pane and — from the run's first item — its group label, so another persona's content keeps its own colour (§1). The open item's icon chip is filled (`.brand-pill`). |

Home page (`src/lib/components/home/`) — two sections below the hero since the 2026-09-27 redesign:

| Component | Notes |
|---|---|
| `HeroAudienceCards.svelte` | The two audience cards in the hero (replaced `KeyBenefits`, 2026-09-27). Each `<article>` in its own `.accent-*` scope: persona chip + eyebrow, display `h2` (ids `benefits-patients` / `benefits-clinicians`), brand-teal ticks, and a footer link whose `::after` stretches over the card — the **whole card is the link** and the focus ring surrounds it. **The arrow chip is inside the `<a>`** (a solid `.accent-pill` circle): as a sibling its hover `translate-x` lifted it into its own stacking layer above the `::after`, and a click on the arrow hit nothing (fixed 2026-09-29). Link labels: "Patient benefits" (owner direction 2026-09-29, was "What to expect") / "Clinical use & evidence". Intrinsic grid (`minmax(min(100%, 16.5rem), 1fr)`); wrapper `flex-col` + `article h-full` keep both cards one height with the footers level. No `use:reveal` (above the fold). |
| `QuoteRotator.svelte` | The hero's rotating testimonial panel — **see §6b for its conditions**. Props `items` (`{quote, author, subAuthor?, seconds?}`), `label`, `class` (placement only). |
| `HowItWorks.svelte` | **Section 2**, `id="how-it-works"` + `scroll-mt-24` (the hero's "See how it works" target): header + intro, the `ProductCallouts` diagram in a `.surface-card`, then a `[3fr_2fr]` row pairing the 30-second animation (caption **above** it) with the second-line explanation. |
| `ChooseJourney.svelte` | **Section 3**: three journey cards (`.accent-pill`, each in its own accent scope) + the Support Center shortcut. Its `h2` is `sr-only` — the bridge above reads "Choose Your Journey" (D14). **Carries `id="support"`** — see §2. |
| `WhatItIs.svelte`, `ProofStats.svelte`, `PersonaSection.svelte`, `Voices.svelte` | **Parked** — the pre-0831 home page. Not rendered; their CMS-approved copy is kept for the Support Center build. |
| `AudienceStub.svelte` | The `/partners` placeholder page: persona canvas + solid nav + "coming soon" roadmap + CTA panel. Replace with a real journey, don't extend. |

Patient page (`src/lib/components/patients/`) — four sections since the 0831 restructure:

| Component | Notes |
|---|---|
| `WhyChoose.svelte` | **Section 1**: the hero photo with the display `h1` in a frosted glass panel **on** the image (docx: "text on top/top-right"), the intro sentence below it, then the four benefits as an `AutoAccordion` (§6a) and the `IndicationsStrip`. Its headers carry **no icon chip** — with one the 4-item list is 296 px against a 208 px grid; without, 251 px, and the icon moves to the pane. All four benefit *titles* stay visible; only the bodies collapse. *Trades +43 px desktop for −223 px mobile — the only section here that costs desktop height, taken because mobile is the viewport that is too long.* LCP image → `fetchpriority="high"`. The panel is `self-end sm:self-start` — at 375px the crop puts the subject's face at the top, so the headline drops to the bottom. |
| `PatientStories.svelte` | **Section 2**: header + the four stories as an `AutoAccordion` (§6a) — theme label in the list; quote, attribution and that person's "read my story" link in the pane — then "more stories" (`SupportCenterCard` reuse). *729 → 731 px desktop (unchanged), 1 930 → 1 430 px mobile — this one is bought entirely for the phone.* |
| `OutcomesChart.svelte` | *(now in `shared/`)* Two single-series labeled-bar lists on a shared 0–100% scale. `heading`/`intro` are **optional** — inside an accordion pane the item header already carries them. |
| `ClinicianQuotes.svelte` | Manual quote slider (see Motion §6 slider rules) + disclaimer line. Accents from the enclosing scope (2026-09-29) — on the patient page its accordion item is `accent-clinician`. `heading` is **optional** for the same reason as `OutcomesChart`'s. It now lives inside an `AutoAccordion` pane — a manual slider nested in an accordion pane is a wrinkle worth revisiting (promoting the three quotes to accordion items would remove it, at the cost of retiring this component). |
| `EvidenceOutcomes.svelte` | **Section 3**: stat cards stay a visible row, then chart / expert consensus / clinician quotes become an `AutoAccordion` (§6a) — three parallel answers to "what does the research show?", each with its own visual. *1 273 → 859 px desktop.* |
| `NextSteps.svelte` | **Not an accordion** (§6a — CTAs stay visible). Section 4 composition: CTA tiers (primary is the `.surface-solid` gradient language via scoped `.cta-primary`, read from the scope; others are `.surface-card` — were slate-50 until 2026-09-29), dive-deep band, and the full-bleed closing `tint-band` with the display-type callback quote. |
| `HowItWorks.svelte` | **Parked** — "how does it work?" is a homepage question now. Kept for the homepage rebuild; not rendered. |

Clinician page (`src/lib/components/clinicians/`) — six sections since the 0831 restructure; the
route is composition only. All of them take the accent from the page's `.accent-clinician` scope:

| Component | Notes |
|---|---|
| `ClinicalValue.svelte` | **Section 1**: display `h1` + accent rule + two intro paragraphs, `ImagePlaceholder` beside them (the hero photo is still a pending client asset), then the two benefit groups as **two boxes** — the docx's "1 box for the 3 patient benefit, 1 box for the clinician benefit". Each box is a `.surface-card` `<article>` with a solid `--accent-solid` header (icon + `h3`) and its three benefits, in its own persona scope: "For Your Practice" clinician, "For Your Patients" **patient** (§1, cross-persona colours). **From 48rem the two sit side by side, always visible; below it they share one cell behind two side tabs** (§6a, owner direction 2026-09-29 — it was an `AutoAccordion` at every width). Measured: 596px cards at 1280 (equal height); at 375 a 44px tab column beside a 279px card, page height identical across tabs, no horizontal scroll. |
| `ClinicalEvidence.svelte` | **Section 2**: the same three named studies, now an `AutoAccordion` (§6a) — each study's docx label is the header, its descriptor the summary line, and its visual the pane: a `<dl>` row of three display-type figures (Lovász), `DonutStat` + a two-row bar list (Pothoven), the recognition figure (Buford). All three panes are `surface-card`. Footnotes and citations stay in the panes. *967 → 533 px desktop, 1 931 → 1 134 px mobile.* |
| `SocialProof.svelte` | **Section 3**: the "Trusted Worldwide" `StatCard`s stay a visible row (glanceable trust, ~150px), then all six quotes are one `AutoAccordion` (§6a) with the docx's two headings as `group` labels — theme label in the list, quote + attribution in the pane; the patient run is `accentClass: 'accent-patient'`. The two Support Center cards sit side by side below (the patient one in the patient scope) (the audit's §4.4 merge still needs the client to say which copy survives). *1 375 → 1 058 px desktop, 3 019 → 2 083 px mobile.* |
| `Implementation.svelte` | **Section 4**: the docx's three blocks as an `AutoAccordion` (§6a) — each block title is already a claim, and the pane answers it: five indication icon chips (chips in one card, **not** five nested cards — that would stack surfaces, §4), the six-item workflow checklist, and the three-step learning `<ol>` with static ↓ marks + resource pills. Only the indications block has a docx lead sentence, so only that item reveals a body. *820 → 532 px desktop, 1 723 → 998 px mobile.* |
| `NextSteps.svelte` | **Section 5**: three CTA tiers, one link each. Primary tier is `.accent-pill`, not the patient page's scoped gradient. |
| `SupportClosing.svelte` | **Section 6**: the Support Center box **and** the docx's closing statement in one full-bleed band — a bridge or a second band stacked here would put two tinted surfaces back to back. |
| `WhatIsIt.svelte`, `Mechanism.svelte` | **Parked** — "what is it?" / "how does it work?" are homepage questions now. Kept for the homepage rebuild; not rendered. |

*(`ImagePlaceholder` sits in the patient page's Section 2/3 headers: a two-column
`lg:grid-cols-[1fr_auto]`, image `lg:w-72`, stacking below the heading on mobile.)*

`ClinicianQuotes` is still under `patients/`; its accents were swapped for `--accent-ink` on
2026-09-29 (it now renders in clinician teal on the patient page). Promote it to `shared/` when
a second page needs it.

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
  `text-(--accent-ink)/45`, `w-8 h-6 sm:w-12 sm:h-9`. Four directions
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
- Visible focus: `focus-visible:ring-2 ring-(--accent-ink)` (or `outline-(--brand-ink)` on
  brand affordances).
- Targets ≥24px. Contrast-check accents — the measured persona inks and pops are in §1; a bright
  palette colour (cerulean, coral, sun, aqua, lilac) is never small text on a light surface,
  only a fill under navy text or ink on dark.
- Quotes are `<blockquote>`/`<footer>`, not styled divs.
- Any slider/carousel: pause on hover+focus, static under reduced motion.

---

## 12. Reusing this system for the clinician journey

**Built 2026-08-26, restructured to the 0831 client plan 2026-09-07.** The parameterisation rules
below are unchanged and still binding; only the page's *section list* changed (§2 and §7). See
[clinician-journey-page-plan.md](clinician-journey-page-plan.md) for its structure, copy
provenance and open items. The notes below are what the build actually followed.

The clinician page is the same system with different parameters — **do not fork patterns**:

- **Accent:** the clinician pair (`#166b6a` pine / `#6fc6ca` aqua, §1) wherever the patient page
  uses the patient pair — set by `.accent-clinician`, never written per component. *(Until
  2026-09-29: `#2c8979` with an `emerald-300` dark ink.)*
- **Colour, in one class:** `<div class="bg-persona-page accent-clinician">`. That is the whole
  retint — `.surface-card/panel/solid`, every `.tint-band`, the `.nav-gradient` header and every
  `--accent-ink` inside the shared components follow. See §1 and `AudienceStub.svelte`.
- **Same rhythm:** solid `SiteHeader` → open sections on the colourful persona canvas →
  alternating arrow/quote bridges → closing band. Sections are still not cards; cards use the
  `.surface-*` classes.
- **Same components, new content module** (`src/lib/content/clinicians.ts`): `SectionBridge`,
  `VideoFacade` (poster + nocookie embed), `SupportCenterCard`, `BenefitCard`,
  `TestimonialCard` (peer quotes), `OutcomesChart` (the evidence data is persona-neutral —
  chart series tokens stay as validated), `ClinicianQuotes`. If a component ever hardcodes a persona
  colour, parameterise it *at that moment* (accent prop or CSS variable) rather than duplicating
  the file.
- **Register shifts, rules don't:** clinician copy may be more technical (docx will provide),
  but claims stay verbatim-from-docx, sources stay cited, motion stays the three verbs, and the
  type stays the one family (Source Sans 3).
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

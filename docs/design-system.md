# UroDapter Design System

The binding reference for building anything on this site. It records the decisions actually
shipped in code (home page + patient journey page), including the ones that reversed an earlier
approach. **Read this before adding a section, page, or component.**

- Page-specific plan & open items → [patient-journey-page-plan.md](patient-journey-page-plan.md)
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
  the closing band. Its accent is the `--band-accent` custom property (defaults to patient) —
  persona pages retint by setting `--band-accent` on an ancestor, no new CSS.
- `.bg-patient-page`, `.surface-card`, `.surface-panel` (layout.css) = the colourful page canvas
  and the two card surfaces (see §4). All read `--surface-accent` (defaults to patient) so a
  persona page retints every surface at once by setting `--surface-accent` on the page wrapper.

**Persona colour rule:** each audience page uses its own accent. The patient page uses
`--color-patient` everywhere an accent appears. When building the clinician/distributor pages,
**parameterise** — don't hardcode blue. Shared components should take the accent from the page.

### Dark-mode accent swap (important)

`--color-patient` (#18438a) is a deep blue: it **disappears against navy**. In dark mode swap every
small accent to `sky-300`:

```html
class="text-patient dark:text-sky-300"
class="bg-patient/60 dark:bg-sky-300/60"
class="border-patient/20 dark:border-sky-300/25"
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
| Page canvas | `.bg-patient-page` | Colourful patient-blue gradient (light: white→~13% accent + accent radials; dark: navy + strong accent glows). Replaces the neutral home `.bg-page-gradient`, which stays as-is. |
| Content card | `.surface-card` | Gently accent-tinted (white→~10%), accent border, soft accent shadow. Benefit/testimonial/stat/chart/video/product cards. |
| Tinted panel | `.surface-panel` | Deeper accent tint (~13→21%). Callouts, indications strip, clinician-quote box, dive-deep band. |
| Solid CTA band | `.surface-solid` | **Bold, full-strength accent fill** + white text — the same gradient as the home audience cards / Section 6 primary CTA. For strong "go here" invitations (Support Center bands). Dark mode brightens toward the text-free bottom-right so the band lifts off the navy canvas while white text stays on the dark top-left. |
| Full-bleed band | `.tint-band` | Section bridges + closing band (accent via `--band-accent`; see §1). |

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

Shared:

| Component | Notes |
|---|---|
| `SiteHeader.svelte` | `variant: 'overlay'` (transparent, over the home hero photo) \| `'solid'` (navy band, subpages). Owns nav + mobile menu. |
| `UroDapterHero.svelte` | Home hero. Consumes `SiteHeader variant="overlay"`. |

Patient page (`src/lib/components/patients/`):

| Component | Notes |
|---|---|
| `PatientHero.svelte` | Section 1: one-sentence serif `h1` + accent rule + body, `rounded-3xl` photo beside it. LCP image → `fetchpriority="high"`. |
| `SectionBridge.svelte` | `variant: 'arrow' \| 'quote'`, props `lead`, `emphasis`. Full-bleed tinted band. **The page's separator — always exactly one between sections.** |
| `HowItWorks.svelte` | Section 2 composition: centered header, then `[3fr_2fr]` columns. |
| `ProductCallouts.svelte` | The 3×3 device diagram — see §8. |
| `VideoFacade.svelte` | Click-to-load `youtube-nocookie` embed. Props `videoId`, `poster`, `caption`, `duration`. `videoId: null` → "Coming soon" placeholder. **Never show a fake duration.** |
| `SupportCenterCard.svelte` | Reusable "visit the Support Center" CTA. `variant`: `'solid'` (default — bold `.surface-solid` band, white text) \| `'tint'` (light `.surface-panel`). `href` typed `ResolvedPathname`. |
| `BenefitCard.svelte` | Icon chip + title + body. **Its chip+title treatment is the shared vocabulary** the Section 4 testimonial theme labels rhyme with. |
| `IndicationsStrip.svelte` | Tinted band: sentence + condition icon chips. |
| `TestimonialCard.svelte` | Section 4 card: theme chip+label (BenefitCard vocabulary), real `<blockquote>`/`<footer>`, story link. |
| `PatientStories.svelte` | Section 4 composition: header + testimonial grid + "more stories" (`SupportCenterCard` reuse). |
| `OutcomesChart.svelte` | Two single-series labeled-bar lists on a shared 0–100% scale. Thin `h-2` bars, data-end-only rounding, recessive track, label+value as real text on every row (the bars are decoration over an accessible list), source line. Series colours: the validated `--chart-*` tokens only. |
| `ClinicianQuotes.svelte` | Manual quote slider (see Motion §6 slider rules) + disclaimer line. |
| `EvidenceOutcomes.svelte` | Section 5 composition: stat cards (serif first-word highlight + citation) → chart + consensus callout → quotes slider. |
| `NextSteps.svelte` | Section 6 composition: CTA tiers (primary wears the home audience-card gradient via scoped `.cta-primary`; others = home support-card neutral), dive-deep band, and the full-bleed closing `tint-band` with the serif callback quote. |
| `ImagePlaceholder.svelte` | Dashed accent frame + photo icon + a proposed image `description`. Marks where a real asset should go so the client knows what to supply; swap for `<enhanced:img>` on delivery. Placed in the Section 3/4/5 headers (a two-column `lg:grid-cols-[1fr_auto]`, image `lg:w-72`, stacks below the heading on mobile). |

Reusable beyond the patient page: `SectionBridge`, `VideoFacade`, `SupportCenterCard`,
`BenefitCard`, `TestimonialCard`, `OutcomesChart`, `ClinicianQuotes`. Keep them
accent-parameterisable rather than hardcoding patient blue.

---

## 8. The 3×3 product diagram (`ProductCallouts`)

Worth its own section — it took several iterations, and the constraints are easy to break.

```
[label TL] [    —    ] [label TR]
[    —    ] [ DEVICE ] [    —    ]
[label BL] [    —    ] [label BR]
```

- `grid grid-cols-3 grid-rows-[auto_auto_auto]`, **no grid gaps**. Mid-edge cells empty.
- Device in the **center cell** (`col-start-2 row-start-2`), `w-full max-w-52 object-contain`.
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

The clinician page is the same system with different parameters — **do not fork patterns**:

- **Accent:** `--color-clinician` (#2c8979) everywhere the patient page uses `--color-patient`.
  Dark-mode small-accent swap: **`emerald-300`** (the home page already pairs clinician-teal
  with emerald-300 checkmarks) — i.e. `text-clinician dark:text-emerald-300`. Derive
  `--color-clinician-soft`/`-glow` the same way as the patient tints when first needed.
- **Colour, in one line:** set `--surface-accent: var(--color-clinician)` **and**
  `--band-accent: var(--color-clinician)` on the page wrapper — `.surface-card`, `.surface-panel`
  and every `.tint-band` retint themselves; no per-component edits. Give the clinician page its
  own canvas class (clone `.bg-patient-page` → `.bg-clinician-page`, or reuse it with
  `--surface-accent` overridden) so the whole page reads teal instead of blue.
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
- **Audience-page checklist:** nav link retarget (`/#clinicians` → `/clinicians`), JSON-LD
  `audience` → `MedicalAudience/Clinician`, and the same definition of done (§14).

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

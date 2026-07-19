# Patient Journey Page — Design & Build Plan

**Scope of this plan:** Sections 1–3 and the two bridges between them, specified to build-ready
detail, plus system-level guidelines so Sections 4–6 (testimonials, evidence, next steps) can be
added later without redesigning anything.

**Sources:** `4. patient journey page.docx` (approved copy + meta notes), three layout-proposal
images (Sections 1–2, Sections 2–3, and the "How does it work" product-features mockup), and the
live home page design system ([UroDapterHero.svelte](../src/lib/components/UroDapterHero.svelte),
[layout.css](../src/routes/layout.css)).

---

## 1. Design-system alignment — the reconciliation

The layout proposals are light-theme medical-brochure mockups with serif display headlines.
The home page is a navy-dark hero + light gradient body with glass cards, sans-serif bold type,
`rounded-2xl` surfaces, and full dark-mode parity. This plan keeps the mockups' **layout and
content structure** but restyles everything with the **home page's visual language**:

| Element | Mockup shows | This plan uses (home system) |
|---|---|---|
| Headlines | Serif (editorial) | `font-bold tracking-tight` sans, fluid `clamp()` sizes — same voice as the home h1 |
| Page background | Flat pale blue | Existing `bg-page-gradient` (light + dark variants) |
| Section containers | White rounded panels | `rounded-3xl` surfaces: `bg-white/…` light, `bg-navy-900/60 border-white/10` dark |
| "SECTION n" chips | Navy pill badges | Semantic eyebrow labels instead (see §3) — docx says numbers are internal-only |
| Accent color | Generic blue | `--color-patient` (#18438a) — this *is* the patient page, the persona color system finally pays off |
| Icons | Thin-line circle chips | Heroicons outline paths, `stroke-width 1.5–2`, inline `d` strings (home pattern) |
| Radius / borders | ~16–24px | `rounded-2xl` cards inside `rounded-3xl` sections, `border-slate-200` / `border-white/10` |

**Decision (2026-07-14): serif adopted.** The 2026 "editorial anti-generic" trend favors serif
display type, and the client's fallback preference was serif too. Implemented as the
`--font-display` token (Source Serif 4 Variable, self-hosted via `@fontsource-variable`),
applied to patient-page headlines and bridge emphasis. Recommended follow-up: back-port to the
home hero headline for full coherence (not done yet — the home page look is a separate call).

### Prerequisite refactors (small, do first)

1. **Extract `SiteHeader.svelte`** from `UroDapterHero.svelte` (nav + logo + mobile menu are
   currently embedded in the hero). Props: `variant: 'overlay' | 'solid'` — `overlay` = current
   transparent-over-photo behavior, `solid` = navy-950 band for subpages. Point the
   "For Patients" nav item at `/patients` instead of `#patients`.
2. **Promote `.bg-page-gradient` to a shared utility** (move from the hero component's scoped
   `<style>` into `layout.css` as an `@utility` or plain class) — subpages need the same canvas.
3. **Token additions** in `layout.css` (keep minimal):
   ```css
   --color-patient-soft: color-mix(in srgb, var(--color-patient) 8%, white);   /* light chips/bands */
   --color-patient-glow: color-mix(in srgb, var(--color-patient) 30%, transparent); /* dark-mode accents */
   ```
   In dark mode, follow the home page's existing convention: `sky-300` for small accents
   (checkmarks, eyebrows) where #18438a would vanish against navy.

---

## 2. Page architecture

```
src/routes/patients/+page.svelte          ← composition only
src/lib/content/patients.ts               ← ALL copy as typed objects (i18n-ready, docx = source of truth)
src/lib/components/
  SiteHeader.svelte                       ← extracted (prereq)
  patients/
    PatientHero.svelte                    ← Section 1
    SectionBridge.svelte                  ← both bridges (variant: 'arrow' | 'quote')
    HowItWorks.svelte                     ← Section 2 composition
    ProductCallouts.svelte                ← annotated product image
    VideoFacade.svelte                    ← lite YouTube embed (reusable site-wide)
    SupportCenterCard.svelte              ← reusable "Go to Support Center" box
    BenefitCard.svelte                    ← Section 3 cards (reused by Section 4 theme labels later)
    IndicationsStrip.svelte               ← condition icon chips
```

Vertical rhythm: `SiteHeader (solid)` → Section 1 → Bridge A → Section 2 → Bridge B → Section 3
→ *(future: Bridge → S4 → Bridge → S5 → Bridge → S6 → closing)*. Section content sits **directly
on the page gradient** (`max-w-7xl mx-auto px-5 sm:px-8`), *not* inside section-level cards;
bridges are **full-bleed tinted bands** — the alternation of open content and tinted band is what
separates the sections and makes the page read as a journey. *(Revised 2026-07-15: the earlier
`rounded-3xl` white/navy section cards were removed — with the bridges already separating
sections, wrapping each in a card stacked too many surfaces. Only genuine content cards remain:
the product panel, benefit cards, video facade, Support Center box, indications strip.)*

Each section: `<section aria-labelledby="…">` with a real heading; eyebrow labels are
presentational text above the heading, not headings themselves.

---

## 3. Section 1 — Brief value reminder

**Copy (docx, final):**
- H1: *"A more comfortable bladder instillation experience may be possible."*
- Body: *"UroDapter is designed to allow bladder instillation without catheterization, helping
  patients avoid one of the most uncomfortable parts of treatment."*

**Layout** — per mockup: one `rounded-3xl` panel, two columns on `lg:` —
- **Left (~45%):** headline + short accent rule + body copy. *(Revised 2026-07-15, client
  direction: the full sentence renders as **one uninterrupted display headline** — no eyebrow
  split.)* Accent rule: short `h-0.5 w-12` bar in patient blue.
- **Right (~55%):** patient photo bleeding to the panel's rounded edge (`object-cover`,
  `object-position` favoring the face). `enhanced:img`, `fetchpriority="high"` (it's the LCP),
  `alt=""` (decorative — the message is in the text).
- **Mobile:** text first, photo below as a `rounded-2xl` block; never let the photo push the
  headline below the fold.

**Not a copy of the home hero on purpose:** the home page already did navy-photo-hero; the
patient page opens calm and light (mockup intent, and right for a health-anxiety audience).
Dark mode: panel becomes `bg-navy-900/60`, photo gets a subtle bottom-left navy gradient scrim
so text panels never compete with it.

**Asset needed:** calm at-home patient photo (the mockup's woman-on-couch). Wants ~3:2, face in
right half. Flag to client if not yet sourced.

---

## 4. SectionBridge component (both bridges)

One component, full-bleed band, two variants. Band background: `--color-patient-soft` tint in
light mode; in dark, `bg-navy-900` with the home page's radial-glow treatment
(`--color-patient-glow`). Decorative only — `aria-hidden` ornaments, real text in a `<p>`.

**Variant `arrow`** (Bridge Section 1 → 2):
- Circle chip (white / navy-800, thin border) with a down-arrow icon; gentle 6px "nudge" loop
  (CSS keyframes, disabled under `prefers-reduced-motion`).
- Copy: *"A simple idea can make a remarkable difference. Here's how UroDapter delivers bladder
  instillation without using a catheter."*
- Layout: chip left, text right on `sm:+`; stacked centered on mobile.

**Variant `quote`** (Bridge Section 2 → 3):
- Centered, larger: quote-glyph chip on the band's top edge, two-tier text — first sentence
  regular, second emphasized (bigger, bolder, navy/white).
- Copy (docx wording is source of truth): *"Understanding how UroDapter works is only part of
  the story. What matters most is how it changes the treatment experience for people who need
  bladder instillations again and again."*
  ⚠️ The mockup renders this as "…who undergo bladder instillations repeatedly" — docx wins;
  confirm with client.
- Short accent rule below, patient blue.

Both variants get a soft scroll-reveal (see §7). API sketch:
`<SectionBridge variant="quote" lead="…" emphasis="…" />`.

---

## 5. Section 2 — How it works

**Heading block** *(revised 2026-07-15 to follow the "Section 2 mood.png" board, no eyebrow)*:
**centered** H2 *"A simple, catheter-free approach"* + centered intro paragraph (docx):
*"UroDapter is a small syringe adapter that allows medication to be delivered into the bladder
without inserting a catheter. It offers a simple, catheter-free approach that may make treatment
more comfortable for many patients."* The left column then opens with the docx explanation split
mood-board-style: bold patient-blue lead (*"UroDapter is gently placed at the urinary opening,
where it forms a temporary, watertight seal."*) + body (*"Medication can then be delivered…"*),
followed by the product panel — the mood board's features box **without** the "Product Features"
title strip.

**Two-column body on `lg:` (per mockups):**

*Added 2026-07-15 (from "Section 2 mood.png"):* below the product card, a row of **four quick
at-a-glance benefits** (icon + short label, understated outline icons in patient blue /
`sky-300`): **Catheter-free installation · Designed for comfort · Minimizes risk of trauma &
infections · Quick and easy to use**. These are the mood board's labels (not in the docx copy,
which the docx confirms) — kept because the client referenced the board directly. Row is
`grid-cols-2 sm:grid-cols-4`, spanning the left column under the product panel. Stored in
`howItWorks.quickBenefits`.

**Left — `ProductCallouts`:** the existing transparent product render
(`urodapter-product.png`) with the four **patient-centered labels** (docx replaces the clinical
"Product Features" wording):
1. *Only the short, rounded tip enters the urethra* — user/person icon
2. *Creates a temporary seal during treatment* — droplet icon
3. *Designed to be gentle and comfortable* — heart icon
4. *Connects to a standard syringe* — link icon

A genuine **3×3 CSS grid** (`grid-cols-3 grid-rows-[auto_auto_auto]`): the device sits in the
**center cell** (col 2 / row 2), and the four labels occupy the four **corner cells** (cols 1/3,
rows 1/3), horizontally pulled toward the center (`justify-self`) so each **diagonal leader
line** — thin `1.25px` line + a small dot at the device end, patient-blue / `sky-300` at ~45%
opacity — converges on the device. Vertically, each corner cell **`self-stretch`es** to fill its
grid row, then text and leader split to opposite edges: the **text** pins to the **outer** edge
(top row `self-start`, bottom row `self-end`) so the four labels frame the diagram, while the
**leader** pins to the **inner** edge nearest the device (top row `self-end`, bottom row
`self-start`) and reaches in. This matters when the two labels in a row wrap to different line
counts: the shorter one still pins its text to the same outer edge as its taller row-mate (slack
pushed to the inner side) instead of floating centered. A `gap-2 sm:gap-3` sits between text and
leader; the grid itself has no gaps. The mid-edge cells are empty. *(Evolution 2026-07-15:
icon chips removed → leader lines added → layout kept at every breakpoint (no stacked fallback)
→ finally restructured from flex columns into this true 3×3 grid at the client's request.)* The
device image (`w-full max-w-52`) and leaders (`w-8→w-12`) scale down so the 3×3 grid stays intact
from desktop to 375px; the longer corner labels wrap to several lines at the narrowest widths.
Uses the client-supplied `product_features.png`.
Second explanation paragraph below the diagram (docx): *"UroDapter is gently placed at the
urinary opening, where it forms a temporary, watertight seal. Medication can then be delivered
into the bladder through the adapter – without passing a catheter through the urethra."*

**Right column, stacked:**
- **`VideoFacade`** — poster image + centered play chip + duration badge; clicking swaps in a
  `youtube-nocookie.com/embed/x10av1eP8L8` iframe (validated; embed verified playing in-browser).
  No YouTube JS on page load — a meaningful LCP/privacy win. Caption: *"Watch this short animation
  to see how UroDapter works."*, badge `3:03`. ⚠️ Docx still wants an **under-60-sec cut**; when
  it exists, swap `videoId` in `patients.ts` and update the badge. `videoId: null` falls back to
  the "Coming soon" placeholder — never a fake duration.
- **`SupportCenterCard`** — book icon chip, heading *"Would you like to learn more about how
  UroDapter works?"*, body *"Visit the Support Center for detailed explanations, videos and
  additional educational resources."*, link *"Go to Support Center →"* with the home page's
  `group-hover:translate-x-1` arrow micro-interaction. Card: `bg-patient-soft` light /
  `bg-white/[0.06] border-white/15` dark.

---

## 6. Section 3 — Why patients prefer UroDapter?

**Heading block:** H2 *"Why patients prefer UroDapter?"* + intro (docx): *"For many patients,
bladder instillations are not a one-time event — they are repeated over weeks, months or even
years. UroDapter is designed to make every one of those treatments a more comfortable
experience, without changing the medication itself."*

**Benefit cards** — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`, each a `BenefitCard`:

| Icon (heroicons outline) | Title | Copy (docx, verbatim) |
|---|---|---|
| leaf / feather | More comfortable treatment | "Most patients describe treatment with UroDapter as pain-free. Avoid one of the most uncomfortable parts of treatment by eliminating catheterization." |
| face-smile | Less anxiety | "Most patients feel more relaxed knowing a catheter does not need to be inserted before treatment." |
| shield-check | Fewer catheter-related problems | "Without catheterization, many patients can avoid infection, irritation, bleeding and other catheter-related complications." |
| user | Greater independence | "Suitable for self-treatment when recommended by your healthcare professional, giving many patients greater flexibility and control over ongoing therapy." |

Card anatomy: icon in a circle chip (patient-blue outline on white / `sky-300` on navy),
`font-semibold` title, `text-sm text-slate-600 dark:text-slate-300` body, `rounded-2xl`,
hairline border, **no hover-lift** (they're not links). Equal heights via grid.
**Design note from docx:** Section 4's testimonial "theme labels" must visually rhyme with these
cards — so `BenefitCard`'s icon-chip + title treatment is the shared vocabulary; build it clean.

**Indications strip** (bottom of the section, per mockup): left, the docx sentence *"Whether
bladder instillations are prescribed for interstitial cystitis/bladder pain syndrome (IC/BPS),
chronic or recurrent urinary tract infections (UTIs), bladder cancer, or other bladder
conditions, patients share the same goal: making treatment as comfortable as possible."* in a
tinted `rounded-2xl` band; right, four icon chips: **IC/BPS · Chronic UTI · Recurrent UTI ·
Bladder Cancer**. Chips are informational (not links) for now; later they can deep-link to
Support Center condition pages. Mobile: sentence, then chips in a 2×2 grid.

---

## 7. 2026 UI/UX trends — what we adopt (and what we skip)

Curated for a medical-device audience; "calm tech" beats spectacle here.

**Adopt:**
1. **Scroll reveals** — sections and bridge content fade/rise ~12px into view, disabled under
   `prefers-reduced-motion`. *Implementation note (2026-07-14):* originally specced as CSS-only
   `animation-timeline: view()`, but that path produced blank compositor paints in Chromium
   during verification — replaced with a tiny IntersectionObserver Svelte action
   (`$lib/actions/reveal.ts`) driving `.reveal-init`/`.reveal-in` classes. Same visual, no
   scroll-JS library, and content is simply visible without JS.
2. **Bento-style card grids** — Section 3 already is one; keep gaps/radii identical to the home
   CTA row so the site reads as one system.
3. **Fluid editorial type** — `clamp()` scales (h1 reuses the home formula; h2
   `clamp(1.6rem,3.2vw,2.25rem)`), `text-wrap: balance` on headings, `text-wrap: pretty` on
   paragraphs.
4. **Performance as UX** — video facade (no YT payload until click), `enhanced:img` AVIF/WebP,
   only Section 1's photo eager-loaded.
5. **Dark-mode parity by default** — every component specced above has its dark variant; this
   is table stakes in 2026, and the home page already committed to it.
6. **Micro-interactions, one vocabulary** — the `→ translate-x-1` link arrow, chip hovers, and
   the bridge arrow nudge are the *only* motion verbs on the page.
7. **WCAG 2.2 as baseline** — ≥24px targets, visible focus rings (`focus-visible:ring-2
   ring-patient`), semantic landmarks, contrast-checked accents (#18438a passes on white;
   swap to `sky-300` on navy).
8. **AEO/structured data** — JSON-LD (`MedicalDevice` + `MedicalWebPage`) and a proper
   title/description in `<svelte:head>`; answer-engine visibility is the 2026 SEO reality.

**Deliberately skipped:** AI chat widgets, parallax/3D product spins, cursor effects,
auto-playing video, gradient-mesh maximalism — all wrong for anxious patients on a regulated
medical page.

**Phase-2 candidate:** a slim sticky **journey rail** (dots + labels, `xl:` only, right edge)
marking the 6 sections — fits the "patient journey" metaphor literally; skip until Sections 4–6
exist so it doesn't advertise an unfinished journey.

---

## 8. Sections 4–6 — built 2026-07-19 (chosen options + rationale)

**Rhythm rule (held):** every section pair is separated by exactly one `SectionBridge`,
alternating variants — the full page now runs arrow → quote → arrow → quote → arrow, and the
page ends with a **closing `tint-band`** that bookends the journey (a band that closes rather
than bridges).

**Section 4 — Patient experiences → client mockup "Option 2 – Soft panel grid" chosen.**
Rejected: Option 1 (carousel — hides content, adds motion machinery beyond our three verbs, and
its per-card colour system breaks the single-persona-accent rule) and Option 3 (quote-focus —
loses the theme-label link to the Section 3 benefit cards that the docx explicitly asks for).
Built as `TestimonialCard` ×4 in the same `sm:2 lg:4` grid rhythm as the benefits: theme chip +
uppercase label in the `BenefitCard` vocabulary, real `<blockquote>`/`<footer>`, story link with
the `→` micro-interaction. All-patient-blue chips (no per-card colours). "More stories" row
reuses `SupportCenterCard`. H2 "Stories from patients like you" adopted from the chosen mockup
(eyebrow carries the docx section title "Patient experiences").

**Section 5 — Evidence and outcomes → client mockup "Option A – Modern, clean & card-based"
chosen.** (The docx's "let's talk first" gate was released by the client supplying these
layout proposals.) Rejected: Option B (lifestyle photo + olive/purple bars — off-token colours)
and Option C (dark clinical data panel — wrong register for an anxious patient audience).
Built: 3 stat cards (first-word highlight in serif patient-blue, citation line), the
two-column labeled-bar chart (`OutcomesChart` — HTML/CSS bars, **series colours are the
validated `--chart-trying`/`--chart-continuing` tokens**, ran the dataviz six-checks validator
for light AND dark), expert-consensus callout, and `ClinicianQuotes` — a **manual** slider
(no auto-advance; calmer of the two docx options), grid-stacked quotes so the box height fits
the longest text (the docx's "some texts may be too long" worry), aria-live, keyboard-friendly,
crossfade disabled under reduced motion. No clinician headshots — the mockup's photos have no
delivered assets, and we don't fabricate. Disclaimer line from the mockup kept (it hedges,
never strengthens).

**Section 6 — What happens next → single client proposal adopted, mapped to our language.**
CTA tiers wear the home audience-card gradient (primary = patient gradient card; the other two
= home support-card neutral style) instead of the mockup's outlined cards — stronger cross-page
consistency. Mockup's "MOST POPULAR" badge dropped (marketing-pressure pattern, wrong register,
not in docx). Product-box/illustration/phone artwork skipped (no assets). Dive-deep band with
the mockup's five Support Center items. H2 = docx wording **"What would you like to do now?"**
(mockup says "next" — docx wins; flag if the client prefers otherwise). Closing = full-bleed
`tint-band`: "You are not alone on this journey." + support line + serif callback quote echoing
Section 1. The docx's positive closing hero image is a **pending asset**.

**Standing rules for anything new on this page:**
- Copy lives in `src/lib/content/patients.ts`; the docx is the copy source of truth; keep the
  regulatory hedging intact (*"may make"*, *"designed to"*, *"many patients"*) — never
  strengthen claims in UI copy.
- Section headers: eyebrow + H2, never "SECTION n" (docx: internal-only).
- Icons: heroicons outline, inline path `d`, `stroke-width` 1.5–2 — no icon fonts, no new sets.
- New surfaces pick from the two-tier radius system (`rounded-2xl` cards in `rounded-3xl`
  sections) and existing border tokens.
- Every new component ships with: dark variant, mobile layout, reduced-motion behavior, and a
  `svelte-autofixer` pass — before it's considered done.
- Reusable pieces (`SectionBridge`, `VideoFacade`, `SupportCenterCard`, `BenefitCard`) will be
  wanted by the clinician page too — keep them persona-color-parameterizable via the existing
  `--color-patient/clinician/distributor` tokens rather than hardcoding blue.

---

## 9. Build order (when implementation starts)

1. Prereqs: extract `SiteHeader`, promote `bg-page-gradient`, add the two tokens, retarget the
   "For Patients" nav link.
2. `src/lib/content/patients.ts` with Sections 1–3 + bridge copy from the docx.
3. `SectionBridge` (both variants) — it defines the page rhythm; get it right first.
4. Section 1 → Bridge A → Section 2 (`ProductCallouts`, `VideoFacade`, `SupportCenterCard`) →
   Bridge B → Section 3 (`BenefitCard`, `IndicationsStrip`).
5. `<svelte:head>` metadata + JSON-LD.
6. Verify in the browser preview: light/dark, 375px/768px/1280px, reduced motion, keyboard
   walk-through; `npm run check` + `lint`.

**Status (2026-07-14): Sections 1–3 + both bridges are built and verified** (light/dark,
desktop/mobile, `svelte-check`, eslint, svelte-autofixer). Open-item resolutions:
- Serif display font: **adopted** (Source Serif 4 Variable; see §1).
- Section 1 patient photo: **delivered and placed** (`src/lib/assets/patients/patient-hero.jpg`,
  AI watermark cropped out).
- Video: **embedded** — `x10av1eP8L8` via youtube-nocookie, click-to-load, badge `3:03`
  (verified playing in-browser). If/when an under-60s cut is produced, swap `videoId` in
  `src/lib/content/patients.ts`; `null` reverts to the "Coming soon" placeholder.
- Bridge B wording: **"…who undergo bladder instillations repeatedly"** (client decision).
- Section 5: gate lifted — the client supplied the layout proposals; **built** (see §8).

**Status (2026-07-19): Sections 4–6 are built and verified** (light/dark, 375/768/1280,
slider interaction, `svelte-check`, eslint, autofixer, dataviz palette validation). Open items:
- **Pending URLs** (all currently point at the Support Center anchor, marked `TODO` in
  `patients.ts`): webshop ("Order UroDapter"), discussion guide ("Learn how to discuss
  UroDapter" — label adopted from the mockup since the docx's own button copy ends in "???"),
  UroDapter App, and the four patient-story pages (`Read <name>'s story`).
- ~~Closing hero image~~ — **delivered and placed 2026-07-20**
  (`src/lib/assets/patients/closing-hero.jpg`, AI watermark cropped out; the closing band is
  now photo (2fr) + text (3fr), stacked and centered on mobile).
- Wording adopted from client mockups (flag if unwanted): S4 H2 "Stories from patients like
  you", S5 H2 "What the research shows", clinician-testimonial disclaimer line. S6 H2 kept as
  docx "…do now?" over mockup "…do next?".

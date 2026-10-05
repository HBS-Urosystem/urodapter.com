# Home page redesign: hero, first bridge, How It Works and journey copy

**Scope:** the home page (`/`) from the header to the Choose Your Journey cards. §1–§4.8 cover
the hero and the bridge after it. §4.9–§4.10 cover the copy and layout changes further down
(D9–D14).

**Status:** implemented 2026-09-27 (branch `feat/hero-audience-cards`) · **Revised:** 2026-09-27 (v3, with the owner's decisions)
· **Owner:** Lukács
**Design source:** Design canvas "UroDapter Hero" (private; desktop 1440 + mobile 390).
Reference renders `hero-mockup-main.png` and `hero-mockup-mobile.png` sit next to this file.
They show the **whole home page** with every change in this plan applied: the hero, the first
bridge, How It Works, the "Choose Your Journey" bridge, the journey cards and the Support
Center card. They use the real repo assets (hero photo, product image, product diagram, video
poster). Read these notes before using them:

- They show the **dark** scheme on a flat navy. The real hero uses the page background in
  both schemes (§3).
- They were rendered with fallback fonts, so the headline breaks at the hyphen there. The
  real headline must not (§3).

> **This plan implements the mockup as drawn.** The owner reviewed the design and made the
> decisions in §2. They override the client docx wording and two design-system rules for this
> hero only. **Don't revert them** by citing `CLAUDE.md`. Record them in the docs instead (§7).


> **Implementation notes (2026-09-27).** Built **fluid first**, at the owner's request: type and
> spacing are `clamp()`s, the H1 scales with its column (`cqi`), the CTA row, card grid and bridge
> problem row are intrinsic, and the pill label and strip columns are container queries; only the
> two structural steps (48rem / 64rem) are media queries. Where measurement overrode a starting
> value in §3 (details and numbers in design-system.md §2 *The home page*):
>
> - **Photo aspect at lg is 3:2, not 4:3** — at 4:3 the quote panel ended 3–6px short of the
>   patient's eye at 1024–1280 (object-position is already 100%).
> - **lg grid areas are `"copy media" "copy cards" "chip cards"`** (rows `auto auto 1fr`), not
>   `"copy media" "chip media" "chip cards"` — with the latter the cards followed the copy when it
>   was taller than the photo and overlapped it by only 18px at 1024.
> - **The right column is `calc(32% + 18.3rem)`**, not `7fr` (600px at 1024, 681px = 7/12 from
>   1280), and the cards pair up at `minmax(min(100%, 16.5rem), 1fr)`, so "Clinical use &
>   evidence" never wraps and the footers stay level.
> - **H1 is `clamp(2.75rem, 19.2cqi - 1.27rem, 4.75rem)`** — 44px at 375, 73px at 1280/1440.
> - **Glass is more opaque**: quote panel `bg-white/80` / `dark:bg-navy-950/65`, cards
>   `bg-white/85` (slate-600 and the clinician eyebrow measured under 4.5:1 at the plan values).
> - **The hero has no bottom padding**: the bridge's own `my-12 sm:my-16` already supplies the
>   space under the regulatory line; with both it was ~110px against the mockup's ~57px.
> - **Quote panel width from lg = one card** (owner direction 2026-09-28, amends D4): at 7/6 it
>   read as slightly too wide above the patient card. 7/6 is kept at md.
> - The "Choose Your Journey" arrow bridge is centred (`sm:justify-center`, as in the mockup); the
>   other arrow bridges fill their row, so they do not move.

---

## 0. Before you start

1. Read `CLAUDE.md` and `docs/design-system.md` (§1–§7, §6a).
2. **Uncommitted work.** The tree has uncommitted changes in `UroDapterHero.svelte`,
   `KeyBenefits.svelte`, `layout.css`, `docs/design-system.md` and other files. Ask Lukács to
   commit them before you branch. **Don't stash or discard them.** Then branch, e.g.
   `feat/hero-audience-cards`.
3. **Baseline.** Measure the hero height and the `/` `scrollHeight` at 1280×900 and 375×812.
   Screenshot each. Earlier numbers in `docs/page-length-audit.md` are stale.

## 1. What changes and why (user journey)

Today the first screen says what UroDapter is and why to trust it. The *where do I go next*
step appears only in `ChooseJourney`, about three screens down. The `KeyBenefits` cards below
the hero are not links.

After this change, the first screen does four jobs in this order:

1. **Say what it is:** headline, subheadline, and the product chip.
2. **Offer two actions:**
   - primary: *See how it works*, which scrolls to the explainer with the 30-second animation;
   - secondary: *Talk to our team*.
3. **Let visitors pick their audience.** Two cards sit on the photo, and the whole card is the
   link: patients go to `/patients`, clinicians to `/clinicians`.
4. **Show proof:**
   - a rotating testimonial panel on the photo;
   - the credibility strip underneath, with the regulatory sentence under it (as today);
   - a regulatory pill above the headline.

Right after the hero, **before How It Works**, the bridge band states each audience's problem.
These are the two "why heroes care" sentences, moved out of the old cards. The band then
answers with "A simple idea can make a remarkable difference." The page's argument becomes:
*who it's for → why it matters → the idea → how it works.*

The photo changes from **full-bleed behind the text** to a **framed media block** in the right
column. No text sits on the photo at any width, so the following become obsolete and are
removed:

- the stepped crop anchors;
- the sub-`lg` cap and mask;
- the overlay gradients;
- the lockup-vs-face collision rules.

## 2. Owner decisions (2026-09-27): implement exactly as stated

| # | Decision | Replaces |
|---|---|---|
| D1 | **Background = the page background in both schemes.** The hero drops `bg-navy-950 text-white` and sits on `.bg-page-gradient`: light in light mode, navy in dark mode. | "The hero is always dark" |
| D2 | **Product chip = product image + title + one line, no logo.** It appears at every width: **under the CTAs from `md` up**, and **under the photo (after the quote panel) below `md`**. Both logo SVGs leave the hero; the header still carries the brand. | The logo + product lockup (client direction 2026-09-12 / 2026-09-27) |
| D3 | **Testimonials rotate automatically** every few seconds. The dots from the mockup indicate position and can be clicked. Both quotes are included. | §6 "manual only, never auto-advance". A bounded exception like §6a |
| D4 | **Quote panel on desktop is 7/6 of one audience card's width.** In the first mockup it was about 5/6. *Amended 2026-09-28 (owner): from lg (≥ 1024px) the panel is exactly one card wide, flush with the patient card; 7/6 stays at md.* | — |
| D5 | **Mockup copy replaces the approved copy** in the hero, the header CTA and the audience cards. It includes "Contact us" (nav) and "Talk to our team" (secondary CTA), both with **placeholder links**. | The docx-verbatim hero and key-benefits copy |
| D6 | **The problem sentences move out of the cards into the bridge band below the hero**, docx wording unchanged, labelled "For patients" / "For clinicians". They sit above "A simple idea can make a remarkable difference." (§3, §4.8). The clinician tick reads "Fewer catheter-related complications". | Problem lines inside the key-benefit cards; "Reduced …" |
| D7 | **"See how it works" uses the brand colour:** `.brand-pill`, logo teal `--brand-fill` with navy text. The mockup's turquoise hex is not used. | — |
| D8 | **The regulatory sentence (`heroRegulatory`) stays**, unchanged, under the credibility strip at every width, as on the current site. It sits alongside the new pill and the strip's CE/FDA item. | — (kept) |
| D9 | **How It Works intro becomes one sentence** (owner wording, grammar-corrected): "UroDapter is a sterile, single-use syringe adapter that enables medication to be delivered into the bladder without catheter insertion, making treatment more comfortable for both male and female patients." | The two-sentence docx intro ("…allows medication… It offers… that may make treatment more comfortable for many patients.") |
| D10 | **How It Works detail, middle sentence** becomes "During instillation, only the medication passes gently through the urethra into the bladder." The first and last sentences stay, with the D12 change to the last. | "During instillation, the patient is asked to relax the urethral sphincter, allowing the medication to pass gently … without the need for catheterization." |
| D11 | **The video caption** ("Watch this short animation to see how UroDapter works.") moves **above** the video, as its lead-in. | Caption under the video |
| D12 | **"standard syringe" → "standard Luer syringe"** everywhere on the home page: the hero product chip, the How It Works callout ("Connects to a standard Luer syringe") and the detail's last sentence. | "standard syringe" |
| D13 | **Clinician copy: "patient experience" → "patient compliance"** on the home page, in two places: the hero clinician card tick ("Better patient compliance") and the Choose Your Journey clinician card ("…can improve patient compliance while fitting into your clinical workflow."). | "patient experience" |
| D14 | **The journey bridge reads just "Choose Your Journey"**, and the visible "Choose Your Journey" `h2` above the journey cards is removed. It stays in the DOM as `sr-only`, so the section keeps its label. | Bridge "That is the whole idea. / Choose the path that fits you best." + visible `h2` |

**Additions that the owner's decisions require (not optional):**

- **D3 needs a visible pause/play control next to the dots (WCAG 2.2.2).** Rotation also pauses:
  - on hover;
  - on focus within the panel;
  - when the panel is out of view;
  - in a background tab.

  Under reduced motion the panel **never** auto-advances; the dots still work. This follows
  the same pattern as `AutoAccordion` (§6a).
- **D5 placeholder links follow the repo convention for pending links:** `href = supportHref`
  (`/#support`), with a `// TODO(placeholder): contact route` comment. Never use `"#"`, which
  lint and the resolve rule both reject.
- **Headings keep their semantics:** one `h1`, and the two card titles are `h2`.

## 3. Target layout

The hero section has no background of its own; the route wrapper's `.bg-page-gradient`
(light/dark) shows through. Container: `max-w-7xl mx-auto px-5 sm:px-8`. Every colour below
comes as a light/dark pair.

```
≥ lg (1024+)                         grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-12
┌─ header: UroDapter®      For Patients · For Clinicians · For Distributors · Support Center [Contact us] ┐
├──────────────────────────────┬───────────────────────────────────────────────┤
│ (pill) CE marked · FDA …     │ ┌──────── photo, rounded-3xl, aspect-4/3 ───┐ │
│ H1  Catheter‑free            │ │ ┌── quote panel (7/6 card) ──┐            │ │
│     bladder instillation     │ │ │ “…”  Hannah, 27 · …   ▬ • ⏸ │ (subjects) │ │
│ body                         │ │ └─────────────────────────────┘            │ │
│ [See how it works ↓] [Talk…] │ │   ┌─ patient card ─┐ ┌─ clinician card ─┐   │ │
│ ┌ product chip ────────────┐ │ └───│ glass, link    │─│ glass, link      │───┘ │
│ │[img] Sterile, single-use…│ │     └────────────────┘ └──────────────────┘     │
├──────────────────────────────┴───────────────────────────────────────────────┤
│ 1,000,000+ procedures │ Scientifically validated │ Available internationally │ CE marked & FDA listed │
│ UroDapter® holds required CE certification … certified to ISO 13485.  (regulatory line, text-xs)  │
└────────────────────────────────────────────────────────────────────────────────┘
┌─ SectionBridge (tint-band, full bleed) ────────────────────────────────────────┐
│  ♡ FOR PATIENTS                          ⊕ FOR CLINICIANS                        │
│  Repeated bladder treatments can be …     Catheterization for bladder …          │
│                                    ──                                            │
│             A simple idea can make a remarkable difference.                      │
└────────────────────────────────────────────────────────────────────────────────┘
HowItWorks  #how-it-works
```

The bridge band is specified in §4.8.

**md (768–1023):** one column, in this order:

1. pill;
2. H1;
3. body;
4. CTAs in a row;
5. product chip;
6. photo at `aspect-video`, with the quote panel over its top-left;
7. cards in `grid-cols-2`, overlapping the photo bottom (`-mt-20 mx-5`);
8. strip, 4 columns;
9. regulatory line.

**< md:** follow `hero-mockup-mobile.png`:

1. pill, using the short label;
2. H1;
3. body;
4. CTAs stacked, full width, `h-12`;
5. photo at `aspect-[7/5]`, `rounded-3xl`;
6. quote panel **overlapping the photo's bottom edge** (`-mt-14 mx-3`, relative);
7. **product chip**, full width, **under the photo and quote panel** (`mt-4`);
8. eyebrow "Choose your path" (`mt-8`);
9. cards stacked, no overlap (`space-y-3`);
10. strip in `grid-cols-2`, icons hidden;
11. regulatory line.

**One DOM order for every width.** Write the markup in the mobile reading order:

1. copy block (pill, H1, body, CTAs);
2. media block (photo + `QuoteRotator`);
3. product chip;
4. cards block (mobile eyebrow + the two cards);
5. strip, then the regulatory line, both after the grid.

Place the blocks per breakpoint with `grid-template-areas` in the component's `<style>`. Write
the breakpoints in rem (`48rem`, `64rem`), as the existing component does, so they sort
correctly against Tailwind's `md:` and `lg:`.

- **< 48rem:** no areas; blocks follow DOM order.
- **48–64rem:** `"copy" "chip" "media" "cards"`.
- **≥ 64rem:** `grid-template-columns: minmax(0,5fr) minmax(0,7fr)` with
  `"copy media" "chip media" "chip cards"`, and `align-self: start` on the chip. This puts the
  chip right under the copy while the cards follow the photo and overlap it with their negative
  top margin.

The chip holds nothing focusable, so the visual reordering does not change tab order.
**Don't** render the chip twice.

### Sizes and colours (starting values; measure, don't guess)

**Text**

- **Pill.** `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px]
  border border-navy-950/10 bg-white/70 text-slate-700 dark:border-white/15 dark:bg-white/5
  dark:text-slate-300`. Icon: heroicons `shield-check` in `text-(--brand-ink)`. Below `sm`,
  render `labelShort`.
- **H1.** `mt-6 font-bold tracking-[-0.035em] leading-[1.0] text-balance
  text-[clamp(2.75rem,5.3vw,4.75rem)] text-navy-950 dark:text-white`. That comes to about
  76 px at 1440 and 44 px at 375, matching the mockup.
  - It is one string, and "Catheter‑free" uses a **non-breaking hyphen (U+2011)**, so the line
    never breaks after "Catheter-".
  - The mockup's H1 is sans. The serif back-port stays out of scope.
- **Body.** `mt-5 text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-md`.

**Actions and product chip**

- **CTAs.** `mt-8 flex flex-col sm:flex-row gap-3`.
  - Primary: `.brand-pill h-12 sm:h-13 px-6 rounded-full inline-flex items-center
    justify-center gap-2.5 font-semibold`, plus the heroicons `arrow-down` icon.
  - Secondary: `h-12 sm:h-13 px-6 rounded-full inline-flex items-center justify-center
    font-medium border border-navy-950/20 text-navy-950 hover:bg-navy-950/5
    dark:border-white/25 dark:text-white dark:hover:bg-white/5`.
  - Both get `focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-(--brand-ink)`.
- **Product chip.** Top margin `mt-4` below md (after the quote panel) and `md:mt-12` from md
  (after the CTAs). `inline-flex max-w-md items-center gap-4 rounded-2xl p-3
  pr-5 border border-navy-950/10 bg-white/70 dark:border-white/10 dark:bg-white/5`.
  - Image box: `w-22 h-18 shrink-0 rounded-xl bg-slate-100 dark:bg-navy-800
    flex items-center justify-center overflow-hidden`. It holds the existing
    `urodapter-product.png` with `object-contain` and its current flip and shadow treatment.
    The image keeps `hero.productAlt`.
  - Title: `text-[15px] font-semibold text-navy-950 dark:text-white`.
  - Line: `text-sm leading-snug text-slate-600 dark:text-slate-400`.
  - On mobile, `w-full`.

**Photo**

- The existing `enhanced:img` of `urodapter-hero.png` inside a `relative rounded-3xl
  overflow-hidden shadow-xl shadow-navy-950/10 dark:shadow-none` box. Aspect is `4/3` at lg,
  `video` at md and `7/5` below md.
- The box is narrower than the 16:9 source, so only `object-position` **X** matters. Start at
  `object-[100%_50%]` and measure (§6).
- `sizes`: roughly `(min-width:1280px) 700px, (min-width:1024px) 58vw, 100vw`.
- Keep `fetchpriority="high"` and `alt=""` / `aria-hidden`.

**Quote panel (D3/D4)**

- From md, position it `absolute top-6 left-5`.
- **Width: 7/6 of a card.** The cards are inset 20 px each side (`mx-5`) with a 16 px gap, so
  one card is `(100% − 3.5rem) / 2` of the photo box. The panel is therefore
  `w-[calc((100%-3.5rem)*7/12)]`, about 376 px at 1440. The panel's left edge lines up with
  the patient card's left edge.
- Glass over the photo, in both schemes: `rounded-2xl p-4 sm:p-5 backdrop-blur-md border
  bg-white/75 border-white/60 text-navy-950 dark:bg-navy-950/60 dark:border-white/15
  dark:text-white`.
- Quote: `text-sm sm:text-[15px] leading-relaxed`. Attribution: `text-xs font-semibold`, and
  the Dr. Parekattil sub-line is `font-normal text-slate-600 dark:text-slate-300`.
- **Controls sit on the attribution row, at the right:**
  - the dots: the active one is a 14×5 px pill, the others 5×5 px;
  - a 24 px pause/play icon button.

**Audience cards**

- Wrapper: `relative z-10 grid gap-4 md:grid-cols-2 md:-mt-20 lg:-mt-24 md:mx-5`.
- **The cards stay in normal flow; never position them absolutely.** Only the negative top
  margin pulls them over the photo. Their height varies: the serif titles wrap to two lines,
  and so does "Fewer catheter-related complications". In flow, that extra height pushes the
  credibility strip down instead of sliding under it. An absolutely positioned version of the
  mockup did overlap the strip.
- Each card is an `<article>` with `group relative flex flex-col rounded-2xl p-6 backdrop-blur-xl
  border bg-white/80 border-(--accent-ink)/20 shadow-xl shadow-navy-950/10
  dark:bg-navy-900/75 dark:border-(--accent-ink)/25 dark:shadow-black/30
  hover:border-(--accent-ink)/45 transition-colors h-full`. Each sits inside its own `.accent-patient`
  or `.accent-clinician` wrapper.
- **Equal heights, bottom-aligned footers.** The grid stretches the two wrappers to the same
  height, but the wrapper is the grid item, not the card. Give the wrapper `h-full` or
  `flex flex-col`, and the `<article>` `h-full`, so the shorter card fills its cell. The
  footer then sits at the card's bottom via `mt-auto`, **together with its hairline**, in both
  cards. This holds when one card's ticks wrap to more lines, as the clinician card's
  "Fewer catheter-related complications" does.
- **Header row:** an icon chip (`w-10 h-10 rounded-full bg-(--accent-soft) text-(--accent-ink)`,
  heroicons `heart` or `plus-circle`) and the eyebrow (`text-xs font-semibold uppercase
  tracking-[0.1em] text-(--accent-ink)`).
- **Title:** `h2`, `mt-4 font-display font-semibold leading-tight text-balance
  text-[clamp(1.25rem,1.7vw,1.5rem)] text-navy-950 dark:text-white`.
- **Ticks:** `mt-4 mb-5 space-y-2 text-[15px] leading-snug text-slate-700 dark:text-slate-200`.
  `mb-5` is the minimum gap above the footer hairline when `mt-auto` has no slack. The
  check icon is `text-(--brand-ink)`, teal in both cards as in the mockup.
- **Footer:** `mt-auto pt-4 border-t border-navy-950/10 dark:border-white/10 flex items-center
  justify-between`.
  - The link label: `text-[15px] font-semibold`.
  - A 36 px round arrow chip: `bg-navy-950/5 dark:bg-white/10`, heroicons `arrow-right`,
    `group-hover:translate-x-1 motion-reduce:transition-none`.
  - This uses the stretched-link pattern (§4.3).

**Strip**

- `mt-12 pt-8 border-t border-navy-950/10 dark:border-white/10 grid grid-cols-2 md:grid-cols-4
  gap-6 md:gap-4`.
- **Clearance.** The strip's top border sits at least 48 px (`mt-12`) below the **bottom edge
  of the cards**, not below the photo. The cards overlap the photo, so they, not the photo, are
  the lowest thing in the right column.
- Each item has an icon (`hidden md:block`, `w-7 h-7 text-slate-500 dark:text-slate-300`),
  then a title and an optional sub-line.
- Item 0 is emphasised: the title is `text-2xl font-bold tracking-tight`. The other titles are
  `text-base font-medium`.
- Sub-lines: `text-sm text-slate-600 dark:text-slate-400`. Use slate-600, not slate-500: the
  latter drops near 4.3:1 at the bottom of the light page gradient. Every item has one (see
  §4.1):
  - 1,000,000+ → "procedures worldwide";
  - Scientifically validated → "Peer-reviewed in 3 journals";
  - Available internationally → "Visit our webshop ↗";
  - CE marked & FDA listed → "ISO 13485 certified QMS".
- **Webshop link sub-line.**
  - Style: `inline-flex items-center gap-1 text-sm font-medium text-(--brand-ink)
    hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-(--brand-ink)`, plus the heroicons `arrow-up-right` icon (14 px,
    `aria-hidden`) to mark it as off-site.
  - Render it with the existing off-site pattern: `target="_blank" rel="external noopener
    noreferrer"` and an `sr-only` "(opens in a new tab)".
  - Its hit area must be ≥ 24 px tall (WCAG 2.5.8). Use `py-1 -my-1` if the line box is
    shorter.

**Regulatory line (D8)**

- `heroRegulatory`, unchanged, below the strip: `mt-6 max-w-2xl text-xs leading-relaxed
  text-slate-600 dark:text-slate-400`.
- Hero bottom padding: `pb-14 sm:pb-16`.

## 4. Implementation steps

### 4.1 `src/lib/content/home.ts`: hero copy from the mockup (D5, D6; D8 kept)

**Links**

- Add `const howItWorksHref = (resolve('/') + '#how-it-works') as ResolvedPathname;`
- Declare `supportHref` before `hero`. It already is; just make sure nothing references
  `journey` from `hero`, which would be a TDZ error.

**Replace `hero` with:**

```ts
export const hero = {
	// Owner direction 2026-09-27: mockup copy replaces the docx wording in the hero.
	// U+2011 non-breaking hyphen: the headline must never break after "Catheter-".
	headline: 'Catheter‑free bladder instillation',
	body: 'A simple way to perform bladder instillations without catheterization.',
	regulatoryPill: {
		label: 'CE marked · FDA listed · ISO 13485 certified QMS',
		labelShort: 'CE marked · FDA listed · ISO 13485',
		icon: iconShieldCheck,
	},
	primaryCta: { label: 'See how it works', href: howItWorksHref },
	// TODO(placeholder): contact route — pending links resolve to #support until it exists
	secondaryCta: { label: 'Talk to our team', href: supportHref },
	product: {
		title: 'Sterile, single-use syringe adapter',
		body: 'Connects to a standard Luer syringe and creates a temporary seal during treatment.', // D12
		alt: 'UroDapter catheter-free bladder instillation device',
	},
	// Mobile only, above the stacked audience cards.
	choosePathLabel: 'Choose your path',
};
```

**Replace `heroTrustStats` with `{ title, sub?, link?, icon, emphasis? }` items.** Every item
carries a sub-line, so no claim stands without a figure or a next step (owner direction
2026-09-27):

1. `'1,000,000+'` / sub `'procedures worldwide'` / users icon / `emphasis: true`
2. `'Scientifically validated'` / sub `'Peer-reviewed in 3 journals'` / keep the existing
   microscope path. Add a source comment next to it naming the three journals already cited
   on the site:
   - Int J Urol (Lovász, 2019);
   - Continence (Pothoven et al., 2025);
   - Neurourol Urodyn (Buford et al., 2025).
3. `'Available internationally'` / **link** `{ label: 'Visit our webshop', externalHref:
   'https://www.urosystem.com/shop' }` / globe.
   - Use the webshop, already a live off-site destination (design system §2, "Off-site links
     are a separate field").
   - **No country count.** The 2026-09-09 decision still stands (30+ / 50+ / 85 remain
     unsettled). Keep the existing comment explaining why.
4. `'CE marked & FDA listed'` / sub `'ISO 13485 certified QMS'` / shield-check

**Replace `quotes`** (the `pill` field goes, since the regulatory pill replaces it):

```ts
export const quotes = {
	label: 'Testimonials',           // region label for screen readers
	items: [
		{ quote: 'I now have confidence, less apprehension, more predictability, and an overall better quality of life.',
		  author: 'Hannah, 27 · IC/BPS patient', seconds: 7 },
		{ quote: 'Perfect for targeted bladder treatments — Less discomfort, more efficiency, better experience.',
		  author: 'Dr. Parekattil, Avant Concierge Urology', subAuthor: 'Winter Garden, Florida, USA', seconds: 9 },
	],
};
```

The dwell times are presentation, so they live next to the items, like `AutoAccordion`'s
`seconds`. Hannah's quote is 17 words and the doctor's 23; about 7 s and 9 s fits "every few
seconds" and is still readable.

**Replace `keyBenefits` with the hero cards (D5, D6).** They have no `problem` field; those
sentences move to the bridge (below):

```ts
export const heroAudienceCards = [
	{ id: 'patients', accentClass: 'accent-patient', icon: iconHeart,
	  eyebrow: 'I’m a patient', title: 'A better experience for patients',
	  items: ['Catheter-free treatment', 'Greater comfort', 'Less anxiety'],
	  linkLabel: 'What to expect', href: patientsHref },
	{ id: 'clinicians', accentClass: 'accent-clinician', icon: /* plus-circle */ '…',
	  eyebrow: 'I’m a clinician', title: 'A practical solution for clinicians',
	  items: ['Better patient compliance', 'Fewer catheter-related complications', 'Simple integration into practice'], // D13
	  linkLabel: 'Clinical use & evidence', href: cliniciansHref },
];
```

**Move the two `problem` sentences into `bridgeHowItWorks` (D6), verbatim**, together with
their existing docx comments, including the "minimally corrected" note on the clinician line:

```ts
export const bridgeHowItWorks = {
	variant: 'quote' as const,
	// The two docx "why heroes care" lines, moved here from the key-benefit cards
	// (owner direction 2026-09-27): the audience problems, then the idea that answers them.
	problems: [
		{ id: 'patients', label: 'For patients', accentClass: 'accent-patient', icon: iconHeart,
		  text: 'Repeated bladder treatments can be stressful, uncomfortable and emotionally exhausting.' },
		{ id: 'clinicians', label: 'For clinicians', accentClass: 'accent-clinician', icon: /* plus-circle */ '…',
		  text: 'Catheterization for bladder instillations is associated with complications and procedural burden, and creates discomfort for patients.' },
	],
	// docx's own "[Main headline/introductory explanation]" line — unchanged.
	emphasis: 'A simple idea can make a remarkable difference.',
};
```

Hoist the plus-circle `d` string into a shared `iconPlusCircle` const, since the cards and the
bridge both use it.

**Keep** `heroRegulatory` exactly as it is (D8).

**Remove** `keyBenefits`, once nothing imports it. Its problem lines now live in
`bridgeHowItWorks`.

**Update the provenance comments.** State that the hero, cards and header CTA copy is
owner-approved mockup copy (2026-09-27), not docx copy.

### 4.2 `src/lib/components/SiteHeader.svelte`: Contact us + a scheme-aware variant

- **Replace the `overlay` variant with `page`.** Only the home hero used `overlay`.
  - `page` is transparent, with scheme-aware text.
  - Logo: `text-navy-950 dark:text-white`. The SVG already uses `currentColor`.
  - Nav links: `text-slate-600 hover:text-navy-950 dark:text-slate-300 dark:hover:text-white`.
  - Menu button: `hover:bg-navy-950/5 dark:hover:bg-white/10`.
  - Mobile menu divider: `border-navy-950/10 dark:border-white/10`.
- **`solid`** (subpages) is unchanged: white on `.nav-gradient`.
- **Add a "Contact us" pill after the nav links**, on every page (the header is shared):
  - `hidden md:inline-flex h-11 px-5 items-center rounded-full font-medium border`;
  - on `page`: `border-navy-950/20 text-navy-950 dark:border-white/25 dark:text-white`;
  - on `solid`: `border-white/30 text-white`;
  - href `supportHref`, with a `// TODO(placeholder): contact route` comment.

  Also add it as the last item of the mobile menu. The label goes in a small `nav` content
  object, or next to `navLinks`, following the existing pattern.

### 4.3 New `src/lib/components/home/HeroAudienceCards.svelte` (replaces `KeyBenefits.svelte`)

- Render `heroAudienceCards` as specified in §3. **Don't use `use:reveal`**: the cards are
  above the fold.
- **Make the whole card clickable with the stretched-link pattern.** Don't wrap the `h2` in the
  link. The label is visible and specific ("What to expect", "Clinical use & evidence"), so no
  `sr-only` suffix is needed.

  ```svelte
  <a href={card.href}
     class="font-semibold text-navy-950 dark:text-white after:absolute after:inset-0 after:rounded-2xl
            focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2
            focus-visible:after:outline-(--brand-ink)">{card.linkLabel}</a>
  <span aria-hidden="true" class="… group-hover:translate-x-1 transition-transform motion-reduce:transition-none">
    <!-- arrow-right -->
  </span>
  ```
- Keep the `h2` ids (`benefits-patients`, `benefits-clinicians`).
- Delete `KeyBenefits.svelte`.

### 4.4 New `src/lib/components/home/QuoteRotator.svelte` (D3, D4)

Read `shared/AutoAccordion.svelte` first and **reuse its mechanism rather than inventing a
timer.**

- **The active dot is the timer.** Its fill animates `scaleX(0→1)` over `--dwell`
  (`item.seconds`), and its `animationend` advances to the next slide, wrapping at the end.
  This gives three behaviours for free:
  - pause is `animation-play-state: paused`;
  - reduced motion has no animation, so it never advances;
  - in a background tab the animation clock stops, so it never advances unseen.
- **Paused when:**
  - the user pressed pause;
  - the panel is hovered;
  - focus is inside the panel;
  - the panel is out of view. Use an IntersectionObserver that **fails open**: `inView`
    starts `true`, and the observer only ever pauses.
- **Reduced motion** is handled in both places, as in AutoAccordion: a
  `@media (prefers-reduced-motion: reduce)` block kills the animation, and a JS `matchMedia`
  check does too. The panel is fully manual then.
- **No layout shift:**
  - all slides stack in one grid cell (`grid` with `[grid-area:1/1]`), so the panel is as tall
    as the longest quote;
  - they crossfade with opacity plus `visibility` over 0.4 s, with
    `motion-reduce:transition-none`;
  - inactive slides are `inert`;
  - every quote stays in the DOM (for crawlers and AEO).
- **ARIA** (APG carousel pattern):
  - wrapper `<section aria-roledescription="carousel" aria-label={quotes.label}>`;
  - each slide `role="group" aria-roledescription="slide" aria-label="1 of 2"`, holding a
    `<blockquote>` and `<footer>`;
  - the slides container has `aria-live="off"` while rotating and `"polite"` when paused.
- **Controls:**
  - dots are `<button aria-label="Show testimonial 1" aria-current={active}>`. The visual dot
    is 5–14 px, but each button's hit area is ≥ 24×24 px (WCAG 2.5.8), using padding or
    negative margins;
  - the pause button: `aria-label` "Pause testimonials" or "Play testimonials", heroicons
    pause/play, 24 px, `focus-visible:outline-(--brand-ink)`;
  - clicking a dot shows that slide and **pauses** (the reader chose it, as in AutoAccordion).
- **Props:** `items`, `label`, and `class` for placement. The same component is used at every
  width; only its container's positioning changes.

### 4.5 `src/lib/components/UroDapterHero.svelte`: rewrite the layout

**Remove:**

- `bg-navy-950 text-white` from the section;
- the `relative md:static` photo wrapper;
- `.hero-overlay` (markup and CSS);
- `.hero-photo` (cap and mask);
- the stepped `object-[…]` anchors;
- both logo imports and the lockup markup (D2);
- the old quotes stack and `quotes.pill`;
- the long measurement comments. Replace them with a short rationale that points to the
  design system.

**Keep:** the regulatory `<p>` (D8), now below the restyled strip.

**Build:**

- the grid from §3, with blocks in the mobile DOM order (copy → media → chip → cards) and
  placed with `grid-template-areas` per breakpoint;
- the media block is the photo box, which contains `<QuoteRotator class="md:absolute …">`.
  Below md the rotator is in normal flow, overlapping the photo's bottom edge;
- `<HeroAudienceCards />` in the cards area;
- after the grid, the strip and then the regulatory line, both spanning the full width.

**Single instances:** one `QuoteRotator` and one product chip, positioned responsively. No
second copies.

### 4.6 `src/routes/+page.svelte`

- Remove the `KeyBenefits` import and element. The `bridgeHowItWorks` `SectionBridge` now
  follows the hero directly. Pass the new prop:
  `<SectionBridge variant={bridgeHowItWorks.variant} problems={bridgeHowItWorks.problems}
  emphasis={bridgeHowItWorks.emphasis} />`. Check its top spacing: it used to follow a
  `pt-14 sm:pt-20` section, and now follows the regulatory line.
- **Landmark fix, now possible.** The photo no longer runs behind the header, so render
  `<SiteHeader variant="page" />` in the route **before** `<main>`. Move `<UroDapterHero />`
  **inside** `<main>`, so the H1, CTAs and cards are in the main landmark. The hero no longer
  renders `SiteHeader`.
- JSON-LD, `<title>` and meta description are unchanged. They keep "Catheter-Free Bladder
  Instillation" (out of scope).

### 4.7 `src/lib/components/home/HowItWorks.svelte`

- Add `id="how-it-works" class="… scroll-mt-24"` to its `<section>`. Today the id exists only
  on `WhatItIs.svelte`, which `/` doesn't render. Confirm `/` has exactly one `#how-it-works`.
- "See how it works" lands on the How It Works heading, **past** the bridge band. That is
  intended: the band is the lead-in for someone reading down, and the CTA is for someone who
  wants the explainer now.

### 4.8 `src/lib/components/shared/SectionBridge.svelte`: optional `problems` row (D6)

The band already exists between the hero and How It Works; it gains an optional row above the
emphasis sentence. This keeps **exactly one bridge** between the two sections (design system
§2).

**It is not a quote.** "A simple idea can make a remarkable difference." is the site's own
statement, so this bridge shows **no quote glyph** (the “ chip). The short brand-teal rule sits
**above** the sentence as a divider between the problems and the answer, **not** below it.

- **New optional prop** `problems?: { id: string; label: string; text: string; icon: string;
  accentClass: string }[]`.
  - Render it only in the `quote` variant.
  - With no `problems`, the component renders exactly as today. Every other bridge on
    `/patients`, `/clinicians` and `/` is untouched.
- **Markup**, inside the existing `max-w-7xl` container and before the `max-w-3xl` quote block:

  ```svelte
  {#if problems?.length}
    <div class="grid gap-7 md:grid-cols-2 md:gap-12 mb-10 sm:mb-14 text-left">
      {#each problems as p (p.id)}
        <div class={p.accentClass}>
          <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-(--accent-ink)">
            <svg class="w-4 h-4 sm:w-[18px] sm:h-[18px]" …><path d={p.icon} … /></svg>{p.label}
          </p>
          <p class="mt-3 text-[17px] sm:text-xl leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">{p.text}</p>
        </div>
      {/each}
    </div>
  {/if}
  ```

- **The emphasis block when `problems` is set.** Keep the existing `max-w-3xl mx-auto
  text-center` block, but change what it contains:
  - **omit** the “ glyph chip;
  - render the rule **first**, then the sentence:

  ```svelte
  <div class="h-0.5 w-12 mx-auto rounded-full bg-(--brand-ink)/50 dark:bg-(--brand-ink)/60" aria-hidden="true"></div>
  <p class="mt-6 sm:mt-7 font-display font-semibold …existing emphasis classes…">{emphasis}</p>
  ```

  - no rule below the sentence.

  Implement it as a branch on `problems?.length` inside the `quote` variant. Without
  `problems`, the glyph → sentence → rule order stays exactly as today, so the other quote
  bridges (`/patients`, `/clinicians`, `bridgeJourney` is `arrow`) don't change.
- **Accent scopes.** Putting `.accent-patient` / `.accent-clinician` on the inner wrappers is
  safe. They set `--band-accent` only on those children, not on the `.tint-band` element, so
  the band's own tint does not change. That respects the §1 rule about never declaring the
  accent variables on the styled element itself.
- **Motion.** The whole bridge block keeps its single `use:reveal`; the new row sits inside
  it. No new motion.
- **Semantics.** The labels are short eyebrow `<p>`s, not headings, which matches the bridge's
  existing structure (the message is a `<p>`). Screen readers read: label → problem → label →
  problem → the emphasis sentence.
- **Sizes and spacing.** From md, the two columns align to the container edges, with the rule and
  the sentence centred below them (see `hero-mockup-main.png`). Below md they stack (`gap-7`),
  above the centred rule and sentence (see `hero-mockup-mobile.png`).

### 4.9 How It Works: copy and caption position (D9–D12)

**`src/lib/content/home.ts`, `howItWorks`.** Keep each field's comment and add
"owner wording 2026-09-27" where the text changed.

```ts
intro:
	'UroDapter is a sterile, single-use syringe adapter that enables medication to be delivered into the bladder without catheter insertion, making treatment more comfortable for both male and female patients.',
detail:
	'UroDapter is placed at the urethral opening, where it forms a temporary, watertight seal while only the short rounded tip is inserted. During instillation, only the medication passes gently through the urethra into the bladder. The procedure uses a standard Luer syringe and integrates easily into existing bladder instillation routines.',
callouts: [
	{ label: 'Creates a temporary seal during treatment', icon: '' },
	{ label: 'Only the short, rounded tip enters the urethra', icon: '' },
	{ label: 'Connects to a standard Luer syringe', icon: '' },   // D12
	{ label: 'Designed to be gentle and comfortable', icon: '' },
],
```

- The intro is the owner's sentence, grammar-corrected: "without the insertion of a catheter"
  became "without catheter insertion", and "making the treatment" became "making treatment".
- `video.caption` is unchanged; only its position moves (below).
- The callouts comment says these labels are shared with the patient page. They now differ in
  the Luer wording. Say so in the comment, and see §8 on aligning the other pages.

**`src/lib/components/shared/VideoFacade.svelte`: caption above the video (D11).**

- Add an optional prop `captionPosition?: 'above' | 'below'`, default `'below'`.
- With `'above'`, render the `<figcaption>` as the **first** child of the `<figure>` (valid
  HTML) with `mb-3 text-sm sm:text-base font-medium text-navy-950 dark:text-white`. It reads as
  the lead-in to the video. With `'below'`, render exactly as today.
- Only `home/HowItWorks.svelte` passes `captionPosition="above"`. The patient `HowItWorks` and
  clinician `Mechanism` keep the caption below, unchanged.

**`src/lib/components/home/HowItWorks.svelte`:** no other markup change. The intro `<p>` and
the detail `<p>` render the new strings.

### 4.10 Choose Your Journey: bridge and heading (D13, D14)

**`src/lib/content/home.ts`**

```ts
export const bridgeJourney = {
	variant: 'arrow' as const,
	// Owner direction 2026-09-27: the bridge carries the section name; the visible h2 goes.
	emphasis: 'Choose Your Journey',
};
```

- Remove `lead`. The arrow variant already skips it when it is undefined.
- `journey.cards`, clinician `copy` (D13): `'See how UroDapter can improve patient compliance
  while fitting into your clinical workflow.'`
- Keep `journey.heading` (`'Choose Your Journey'`): the hidden `h2` still uses it.

**`src/routes/+page.svelte`:**
`<SectionBridge variant={bridgeJourney.variant} emphasis={bridgeJourney.emphasis} />` (drop the
`lead` prop).

**`src/lib/components/home/ChooseJourney.svelte`**

- The `h2#journey-heading` gets `class="sr-only"` in place of its visual classes. This keeps
  the section's `aria-labelledby` and the page's heading outline intact.
- The card grid loses its `mt-8`, since nothing visible sits above it now; the bridge band
  supplies the spacing.
- A screen reader hears "Choose Your Journey" twice, once from the bridge paragraph and once
  as the heading. That is acceptable. **Don't** hide the visible bridge text from assistive
  technology.

## 5. Accessibility

- **Contrast, both schemes.** Measure every text on glass against its **worst** backdrop. The
  quote panel and the tops of the cards sit on the photo's light wall and sweater. The target
  is 4.5:1 for body text, and the ticks and eyebrows count as body text. If something fails,
  raise the glass opacity; don't lighten the text.
- **Brand button.** `.brand-pill` carries navy text. **Never put white text on it** (1.97:1).
- **Pause control (WCAG 2.2.2).** Reachable by keyboard, with a label that reflects its state.
  The rotation must not resume while focus is inside the panel.
- **Focus order.** Header (logo → nav → Contact us) → CTAs → quote controls → cards → the rest.
  Card focus rings go on the `::after` overlay, so they surround the whole card.
- **Reduced motion.** Nothing auto-advances, there are no crossfades, and the arrow chips don't
  nudge.
- **Header.** `page` variant links and the Contact pill must reach ≥ 4.5:1 on the light page
  gradient and on the dark one.

## 6. Verification (definition of done, plus hero-specific checks)

1. **Tooling.** Run `svelte-autofixer` on every edited `.svelte` file until it is clean, then
   `npm run check` (0 errors) and `npm run lint`. Watch for `no-navigation-without-resolve` on
   every new href.
2. **Browser.** Check light and dark at 375 / 768 / 1024 / 1280 / 1440, and screenshot each. As
   `CLAUDE.md` says, use a tall viewport and shoot the whole page in one go.
3. **Faces.**
   - At every width, the patient's face (eyes and mouth) must not be covered by the quote panel
     or the cards, for **either** slide.
   - Measure with the taller slide, the doctor's quote.
   - If it collides, tune `object-position` X. **Don't** shrink the panel below 7/6 of a card
     (D4).
   - At 375 the patient must be whole. The clinician should be ≥ 50 % in frame.
   - Record the final anchors and measurements in the design system.
4. **Headline.** No break after "Catheter-" at any width. At most 3 lines from 1024 up.
   **No overlap with the strip.** At 768, 1024, 1280 and 1440, with the real fonts loaded,
   the credibility strip (including "Available internationally" and "CE marked & FDA
   listed") starts ≥ 48 px below the cards' bottom edge. Nothing in the strip sits under a
   card.
   **Card footers.** From 768 up, both cards are the same height, and "What to expect" and
   "Clinical use & evidence" sit at the same baseline, with their hairlines level at the cards'
   bottom edge.
   **Product chip position.** Under the photo and quote panel below 768; under the CTAs from
   768 up. It must not be duplicated in the DOM. The regulatory line shows under the strip at
   every width.
   **Bridge band.** Right after the hero and before How It Works:
   - the two problem sentences (verbatim docx) are side by side from 768 up and stacked below;
   - "A simple idea can make a remarkable difference." is centred under them, with the short
     rule **above** it and **no** quote glyph;
   - the persona labels reach ≥ 4.5:1 on the band in both schemes;
   - every other `SectionBridge` on `/`, `/patients` and `/clinicians` is pixel-identical to
     before (no `problems` prop → unchanged).
5. **Rotator.** Check each of these:
   - it advances after ~7 s and ~9 s and wraps;
   - it pauses on hover, on focus, with the button, and out of view;
   - reduced motion: no advance;
   - a background tab doesn't advance;
   - the panel height is **identical** on both slides (measure it);
   - `aria-live` flips off and on with rotation.
6. **Heights.** Record the hero height and the `/` `scrollHeight` against the §0 baseline. The
   page should get shorter, because `KeyBenefits` and its padding are gone. At 1280×800 the
   tops of both cards must be visible without scrolling.
7. **Anchors.**
   - "See how it works" lands on the How It Works heading, below the header.
   - "Talk to our team" and "Contact us" land on `#support` (the placeholder).
   - "Visit our webshop" opens `https://www.urosystem.com/shop` in a new tab, and a screen
     reader announces "(opens in a new tab)".
8. **LCP.** The hero image is still the eager, `fetchpriority="high"` image, and it downloads
   smaller than before.
9. **Below the hero (D9–D14).**
   - How It Works shows the new one-sentence intro and the new middle sentence in the detail
     paragraph.
   - "standard Luer syringe" appears in the hero chip, in the callout and in the detail, and
     nowhere on `/` still says just "standard syringe".
   - On `/` the video caption sits **above** the video. On `/patients` and `/clinicians` it is
     still below.
   - The journey bridge reads only "Choose Your Journey", and no visible heading sits above the
     three cards. The `sr-only` `h2#journey-heading` is still there, and the section's
     `aria-labelledby` resolves.
   - Both clinician strings read "patient compliance".

## 7. Docs to update in the same change

**`docs/design-system.md`**

- **§2 "The home page"**
  - The new structure diagram: `SiteHeader` in the route, the hero inside `<main>`,
    `KeyBenefits` → `HeroAudienceCards` + `QuoteRotator`, and the first bridge now carrying
    the two problem sentences above its quote.
  - Replace the full-bleed, crop-anchor, overlay, mask and lockup paragraphs with the
    framed-photo rules and the new measurement table.
  - Record D1–D7 as **owner direction 2026-09-27**, reversing:
    - the always-dark hero;
    - the logo + product lockup;
    - the single-column hero;
    - the separate key-benefits section.
  - Note that the regulatory line is kept (D8).
  - Document the chip's breakpoint-dependent position (grid areas, one DOM instance).
- **§3:** the new home H1 spec.
- **§6:** add the quote rotator as a **second bounded exception** to "never auto-advance",
  listing the conditions it meets (§4.4). Cross-reference §6a.
- **§7 component table:** `SiteHeader` (`page` variant + Contact pill), `UroDapterHero`,
  `HeroAudienceCards`, `QuoteRotator`, and `SectionBridge`. For `SectionBridge`, document the
  optional `problems` row (quote variant only): with it, the band shows no quote glyph and the
  rule sits above the emphasis sentence. Also document `VideoFacade`'s new `captionPosition`
  prop (`'below'` by default; the home page uses `'above'`). Remove `KeyBenefits`.
- **§2 home structure diagram:** the second bridge now reads "Choose Your Journey", and
  `ChooseJourney`'s `h2` is `sr-only` (D14).

**`docs/home-page-plan.md`**

- **Structure table:** the new hero layout.
- **Copy provenance:** hero, cards and header CTA = owner-approved mockup copy (2026-09-27).
  The two problem sentences stay docx-verbatim and now live in the first bridge. The How It
  Works intro and detail, the "Luer" wording, "patient compliance" and the "Choose Your
  Journey" bridge are owner wording (D9–D14).
- **Open items:** add §8.

**`AGENTS.md` / `CLAUDE.md`:** no change, unless a stated rule changes. The docx-wording rule
still holds everywhere except these owner-overridden strings.

## 8. Open items (for the owner/client, not blockers)

1. **Contact destination.** "Contact us" and "Talk to our team" point to `#support` as
   placeholders. A contact route or form, with its copy, is needed to replace them.
2. **Card deep links (optional).** "What to expect" and "Clinical use & evidence" go to the page
   roots. Deep links such as `/clinicians#…` could replace them once those sections carry
   stable ids.
3. **Client sign-off.** The hero copy now differs from the client docx (D5/D6). Record the
   client's acknowledgement in `home-page-plan.md`.
4. **Strip sub-lines.**
   - "Peer-reviewed in 3 journals" counts the three journals the site already cites. If the
     client has a fuller publication list (Support Center "Publications"), a total count
     could replace it.
   - Under "Available internationally", the webshop link stands in for a country count
     until the client settles one figure (30+ / 50+ / 85).
5. **Claim wording to confirm with the client.** `CLAUDE.md` says the device's claims must not
   be strengthened. Two owner changes go further than the docx:
   - **D9** drops the hedge. "may make treatment more comfortable for many patients" becomes
     "making treatment more comfortable for both male and female patients".
   - **D13** "patient compliance" is a new clinical-benefit claim. Design system §9 expects a
     source for claims like this. The closest cited evidence on the site is the continuation
     data in Pothoven et al., *Continence*, 2025.

   Implement them as stated, and record both in `home-page-plan.md` for the client to confirm.
6. **"Luer" on the other pages.** The same fact still reads "standard syringe" in three places:
   - the patient page callout (`patients.ts`, "Connects to a standard syringe");
   - the clinician Implementation body (`clinicians.ts`, "uses a standard syringe");
   - the clinician spec list ("Standard syringe").

   Align them in a follow-up if wanted. They are left alone here to keep this change on `/`.

## Out of scope

- The serif back-port for the home H1.
- `ChooseJourney` beyond D13/D14. It keeps its three cards and the Support Center block.
- `/patients`, `/clinicians`, `/partners`, apart from the shared header's Contact pill.
- JSON-LD, `<title>` and meta copy.
- New photography.

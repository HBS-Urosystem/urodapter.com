# Home hero redesign: audience cards on the photo

**Status:** ready to implement · **Written:** 2026-09-27 · **Owner:** Lukács
**Design source:** Design canvas "UroDapter Hero" (private, desktop 1440 + mobile 390).
Reference renders: `hero-mockup-main.png` and `hero-mockup-mobile.png` next to this file.
They use system fallback fonts.

> **The mockup shows the direction, and this plan decides the details.** The mockup was
> drawn from screenshots without the repo, so in several places it breaks client directions
> or design-system rules. Section 2 lists every one of those conflicts and how it is
> resolved. Where the plan and the mockup disagree, follow the plan.

---

## 0. Before you start

1. Read `CLAUDE.md` and `docs/design-system.md` (§1 tokens, §2 "The home page", §3, §4, §6, §7).
   This change **deliberately reverses** two recorded decisions:
   - the hero was made single-column with the audience glass cards removed;
   - `KeyBenefits` was made its own section.

   Update the docs in the same change (§7 below).
2. The working tree has uncommitted changes in `UroDapterHero.svelte`, `KeyBenefits.svelte`,
   `layout.css`, `docs/design-system.md` and others. Ask Lukács to commit them before you
   branch. **Don't stash or discard them.** Then create a branch such as `feat/hero-audience-cards`.
3. Measure the baseline first, at 1280×900 and 375×812, and write the numbers down:
   - the hero height;
   - the `/` `scrollHeight`;
   - a screenshot at each size.

   `docs/page-length-audit.md` records `/` as 2 877 / 4 591 px on 2026-09-09. That figure
   is probably stale, so re-measure it.

## 1. What changes and why (user journey)

The home page has to answer "What is it? Why should I care? Can I trust it? Where do I go
next?" for two audiences (home-page-plan.md). Today the first screen answers the first
three. The fourth, *which way to go*, only appears in the `KeyBenefits` cards below the fold,
and those cards are **not links**. So the first click happens in `ChooseJourney`, about
three screens down.

After this change the first screen carries:

1. **The headline and subheadline.** These say what it is.
2. **Two CTAs:**
   - primary: *See how it works* → `#how-it-works`, the explainer with the 30-second animation;
   - secondary: *Visit Support Center* → `#support`, for existing users.
3. **The two audience cards on the photo, as whole-card links.**
   - The patient card goes to `/patients`, the clinician card to `/clinicians`.
   - This makes self-selection by audience the main path into the site.
4. **Proof:** the two testimonials on the photo, then the credibility strip and the
   regulatory line.

The photo moves from **full-bleed behind the text** to a **framed media block**
(`rounded-3xl`) in the right column. This is also a large simplification. No text sits on
the photo at any width any more, so the following all become obsolete:

- the stepped crop anchors;
- the sub-`lg` height cap and mask;
- the face-dodging overlay gradients;
- the lockup-vs-face collision rules.

## 2. Mockup vs. codebase: decisions made in this plan

| Mockup shows | Implement instead | Why |
|---|---|---|
| Two audience cards overlapping the photo's bottom edge | **Keep** as drawn, from `md` up | The requested change |
| Pill "CE marked · FDA listed · ISO 13485 certified QMS" above the H1 | Use the **existing approved pill** `quotes.pill` ("Trusted by patients and clinicians worldwide") with the check-badge icon | No new regulatory wording; CE/FDA/ISO stays in the strip and `heroRegulatory` |
| Big logo removed; product shown in a chip with a description | **Keep the logo + product lockup** (same markup, sizes, square/horizontal switch), under the CTAs, left-aligned | Client direction **2026-09-27**: logo and product always share a row |
| One quote (Hannah) plus carousel dots | **Both quotes, static**, in one glass panel over the photo's top-left (the current markup) | Client direction 2026-09-13 puts both quotes in the hero; design system §6 says carousels are a last resort and manual only |
| "Contact us" button in the nav, "Talk to our team" CTA | **Remove both.** Secondary CTA = `journey.support.linkLabel` ("Visit Support Center") → `#support` | No contact destination exists; that label is already approved |
| "See how it works ↓" primary CTA | **Keep**, as `.brand-pill` | New microcopy: add it to content and flag it to the client (§8) |
| Card links "What to expect" / "Clinical use & evidence" | **"Explore →"**, the approved label from `ChooseJourney` | Approved copy |
| Card problem sentence removed | **Keep** `keyBenefits.columns[].problem`, at `text-sm` | Approved docx "why heroes care" copy. Dropping it is an open client item (§8) |
| "Fewer catheter-related complications" | "Reduced catheter-related complications" (from content) | Claims are never reworded |
| Eyebrows "I'm a patient" / "I'm a clinician" | **Keep**, reusing the `journey.cards[].title` strings ("I’m a Patient", "I’m a Clinician") | Approved strings; eyebrows are separate labels, not headline fragments |
| Geist; sentence-case H1 "Catheter-free bladder instillation" | Site sans; existing `hero.headlineLines` ("Catheter-Free" / "Bladder Instillation"), still sans | Tokens. The serif back-port stays an open item (§3 of the design system) |
| Accent `#6CC5C3`; card colours `#9DB8FF` / `#7ED6B2` | `--brand-*` / `.brand-pill` (`#75c6c9`); persona inks via `--accent-ink` in a new `.on-navy` scope (sky-300 / emerald-300) | Tokens only, no hex values in components |
| Mobile "Choose your path" label | **Drop** | `bridgeJourney` already says it further down |

## 3. Target layout

The hero section stays `bg-navy-950` with white text in **both** colour schemes, as it is
today. Container: `max-w-7xl mx-auto px-5 sm:px-8`.

```
≥ lg (1024+)                                   grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-12
┌──────────────────────────────┬───────────────────────────────────────────────┐
│ pill (Trusted by …)          │ ┌──────── photo, rounded-3xl, aspect-4/3 ───┐ │
│ H1  Catheter-Free            │ │ ┌ quotes panel ┐                          │ │
│     Bladder Instillation     │ │ │ Hannah       │      (patient)  (clinician)│ │
│ body                         │ │ │ Dr. Parekattil│                          │ │
│ [See how it works ↓] [Visit…]│ │ └──────────────┘                          │ │
│                              │ │   ┌─ patient card ─┐ ┌─ clinician card ─┐   │ │
│ [logo][product] lockup       │ └───│  (glass, link) │─│  (glass, link)   │───┘ │
│                              │     └────────────────┘ └──────────────────┘     │
├──────────────────────────────┴───────────────────────────────────────────────┤
│ 1,000,000+ procedures │ Scientifically validated │ Available intl. │ CE & FDA │ ← strip
│ regulatory line (text-xs)                                                      │
└────────────────────────────────────────────────────────────────────────────────┘
```

- **md (768–1023):** one column: copy → CTAs → lockup → photo at `aspect-video`, with
  the quotes panel over its top-left → cards in `grid-cols-2`, overlapping the photo's
  bottom (`-mt-20 mx-4`) → strip (4 columns) → regulatory line.
- **< md:** one column: copy → CTAs (stacked, full width, `h-12`) → lockup → photo at
  `aspect-4/3` → quotes panel **under** the photo (`-mt-10 mx-3`, relative, still glass) →
  cards stacked with no overlap (`mt-4 space-y-3`) → strip (`grid-cols-2`) → regulatory line.

**Sizes and spacing (starting values; tune by measuring, don't guess):**

- Left column: `pt-10 sm:pt-14 lg:pt-16`. Pill → H1 `mt-6`, H1 → body `mt-5`,
  body → CTAs `mt-8`, CTAs → lockup `mt-10`.
- **H1:** `font-bold tracking-tight leading-[1.02] text-balance`. Size from about
  `text-[clamp(2.25rem,4.4vw,3.5rem)]`.
  - Put `headlineLines[0]` in `<span class="whitespace-nowrap">` so it never breaks at the
    hyphen. The fallback-font render of the mockup did break there.
  - Keep the `<br class="hidden sm:block">`.
  - Acceptance: 2 lines at ≥1280, at most 3 lines at 1024, never breaking inside a word.
- **Right column:** `mt-10 lg:mt-12`, `relative`.
- **Photo:** the `enhanced:img` of `urodapter-hero.png`, `rounded-3xl`, `object-cover`.
  - The box is narrower than the 16:9 source, so only the **X** value of `object-position`
    does anything.
  - Start at `object-[100%_50%]` and measure (see §6).
  - `sizes`: roughly `(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw`, then
    check that the chosen candidate is sensible. The photo is no longer full-bleed, so it
    should download smaller.
  - Keep `fetchpriority="high"`.
- **Quotes panel (from `md`):** `absolute top-4 left-4 w-[min(20rem,46%)]`. Reuse the
  existing glass classes (`bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl
  shadow-xl divide-y divide-white/10`), or a darker `bg-navy-950/60` if the photo behind
  it is too light for 4.5:1.
- **Cards (from `md`):**
  - Wrapper: `relative z-10 grid grid-cols-2 gap-4 -mt-20 lg:-mt-24 mx-4`.
  - Each card: `group relative rounded-2xl p-6 flex flex-col bg-navy-900/75
    backdrop-blur-xl border border-(--accent-ink)/25 shadow-2xl shadow-black/30
    hover:border-(--accent-ink)/50 transition-colors`.
- **Strip:** `mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6`.
  - Item 0: the value large (`text-2xl font-bold tracking-tight`) with the label under it
    (`text-sm text-slate-300`).
  - Items 1–3: one line, `"{value} {label}"`, in `text-base font-medium`.
  - Icons unchanged.
- **Regulatory line:** unchanged, `mt-6 text-xs`. Hero bottom padding `pb-14`.

## 4. Implementation steps

### 4.1 `src/lib/content/home.ts` (copy stays here, never inline)

- Add `const howItWorksHref = (resolve('/') + '#how-it-works') as ResolvedPathname;`
- `hero`: add
  - `primaryCta: { label: 'See how it works', href: howItWorksHref }`, with the comment
    `// new microcopy (2026-09-27) — confirm with client`;
  - `secondaryCta: { label: journey.support.linkLabel, href: supportHref }`. Either reuse
    the constants or move `supportHref`/label use below `journey`, so the file keeps no
    duplicate string.
- `keyBenefits.columns[]`: add
  - `eyebrow` ('I’m a Patient' / 'I’m a Clinician', the same strings as `journey.cards`;
    hoist them into shared consts so they can't drift);
  - `href` (`patientsHref` / `cliniciansHref`);
  - `linkLabel: 'Explore'`;
  - `linkContext`, a screen-reader suffix: ' the patient journey' / ' the clinician journey'.
- `heroTrustStats`: add `emphasis: true` to the first item. It renders large.
- Update the provenance comments above `hero`, `quotes` and `keyBenefits` to say where
  they now render.

### 4.2 `src/routes/layout.css`: an always-dark ink scope

The hero is navy in **both** schemes, but `--accent-ink` / `--brand-ink` only swap to
their light-on-dark values under `prefers-color-scheme: dark`. In the light scheme the
patient ink `#18438a` would **vanish** on the navy glass. Add a scope that forces the
dark-scheme inks whatever the scheme is:

```css
/* Always-dark surfaces (the home hero). Forces the dark-scheme inks in BOTH schemes.
   Not a persona scope — it never sets --accent / --surface-accent / --band-accent. */
.on-navy {
  --brand-ink: var(--color-brand);
  --brand-soft: color-mix(in srgb, var(--color-brand) 14%, transparent);
}
.on-navy .accent-patient {
  --accent-ink: var(--color-sky-300, #7dd3fc);
  --accent-soft: color-mix(in srgb, var(--color-sky-300, #7dd3fc) 10%, transparent);
}
.on-navy .accent-clinician {
  --accent-ink: var(--color-emerald-300, #6ee7b7);
  --accent-soft: color-mix(in srgb, var(--color-emerald-300, #6ee7b7) 10%, transparent);
}
```

The specificity is (0,2,0), which beats both `.accent-*` and its media-query override.
Document the scope in design-system §1. The distributor rule isn't needed yet, so leave
it out until something uses it.

### 4.3 New `src/lib/components/home/HeroAudienceCards.svelte` (replaces `KeyBenefits.svelte`)

- Take the card internals from `KeyBenefits.svelte`:
  - icon chip;
  - serif title (`font-display font-semibold text-white leading-tight text-balance
    text-[clamp(1.2rem,1.7vw,1.5rem)]`);
  - problem line (`mt-3 text-sm leading-snug text-slate-300 text-pretty`);
  - hairline (`border-white/10`);
  - ticks (`text-sm leading-snug text-slate-200`, check in `text-(--accent-ink)`).
- Add the eyebrow above the title: `text-xs font-semibold uppercase tracking-[0.2em]
  text-(--accent-ink)`, in a row with the icon chip.
- **Whole-card link with the stretched-link pattern.** Don't wrap the heading in `<a>`;
  that would make the whole card the accessible name. Use:

  ```svelte
  <a href={column.href}
     class="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white
            after:absolute after:inset-0 after:rounded-2xl
            focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-(--brand-ink)">
    {column.linkLabel}<span class="sr-only">{column.linkContext}</span>
    <span aria-hidden="true" class="group-hover:translate-x-1 transition-transform">→</span>
  </a>
  ```

  The `→` nudge is one of the permitted motion verbs. **Don't use `use:reveal`** here:
  the cards are above the fold.
- Each card keeps its own `accentClass` wrapper (`accent-patient` / `accent-clinician`).
- Titles stay `h2`, so the page has one `h1` followed by `h2`s. Keep the `id`s
  (`benefits-patients` / `benefits-clinicians`).
- Delete `KeyBenefits.svelte` once nothing imports it.

### 4.4 `src/lib/components/UroDapterHero.svelte` (rewrite the layout, keep the parts)

- Put `on-navy` on the `<section>`.
- **Remove:**
  - the `relative md:static` photo wrapper;
  - `.hero-overlay` and its markup;
  - `.hero-photo` (cap and mask);
  - the stepped `object-[…]` anchors;
  - the long comments describing those measurements (replace them with a short
    rationale that points to the new design-system text).
- **Keep as they are:** the lockup block (both logos, ink-matched sizes, product flip and
  shadow), the strip data loop, the regulatory line, the quotes markup, `badgeIcon`.
- Move the pill (`quotes.pill`) from above the quotes to above the H1. Icon colour:
  `text-(--brand-ink)`.
- Add the CTA row:
  - primary `<a class="brand-pill …">` with the heroicons `arrow-down` path, `h-12 px-6
    rounded-full font-semibold`;
  - secondary ghost `border border-white/25 text-white hover:bg-white/5`.
  - Both `inline-flex items-center justify-center`, full width below `sm`
    (`flex-col sm:flex-row`).
- Structure the grid as in §3. The right column holds: the photo box (`relative`, which
  also contains the quotes panel from `md`), then `<HeroAudienceCards />`.
- Below `md`, the quotes panel must appear **after** the photo and **before** the cards in
  DOM order as well as visually. Use one set of markup positioned with
  `md:absolute md:top-4 md:left-4`, not two copies.

### 4.5 `src/routes/+page.svelte`

- Remove the `KeyBenefits` import and element. `<main>` now opens with the
  `bridgeHowItWorks` `SectionBridge`. Check its top spacing, which used to follow a
  `pt-14 sm:pt-20` section.
- **Recommended landmark fix, now possible:** the photo no longer runs behind the header,
  so `SiteHeader` no longer has to live inside the hero.
  - Render `<div class="bg-navy-950"><SiteHeader variant="overlay" /></div>` in the route,
    *before* `<main>`.
  - Move `<UroDapterHero />` *inside* `<main>`, so the H1, CTAs and cards are in the main
    landmark.
  - Remove `SiteHeader` from the hero. Make sure the join between header and hero is
    seamless (same `bg-navy-950`, no gap).
  - If this turns out to be fiddly, leave it and log it as a follow-up instead.

### 4.6 `src/lib/components/home/HowItWorks.svelte`

- Add `id="how-it-works"` and `scroll-mt-24` to its `<section>`. The design-system diagram
  claims the id exists, but it currently lives only on `WhatItIs.svelte`, which the home
  route doesn't render. Confirm there is still only one `#how-it-works` on `/`.

## 5. Accessibility

- **Contrast.** Measure every text on glass at its **worst** backdrop (the light sweater
  and wall in the photo): quotes, card problem line, ticks, eyebrow. The target is 4.5:1;
  darken the glass if a text fails.
  - `.brand-pill` has navy text (9.62:1 by the design system). **Never put white text on it.**
- **Focus.** Visible rings on both CTAs and on both cards (the ring on `::after` spans the
  whole card). Tab order: nav → CTAs → cards → rest. The quotes are not focusable.
- **Link names.** Screen readers must hear "Explore the patient journey" and "Explore the
  clinician journey". "Explore" alone is not enough.
- **Reduced motion.** Only the `→` nudge moves; add `motion-reduce:transition-none` to it.
- **Decorative images.** The photo stays `alt=""` / `aria-hidden`. The lockup logos stay
  decorative. The product keeps `hero.productAlt`.

## 6. Verification (definition of done, plus hero-specific measurements)

1. Run the Svelte `svelte-autofixer` on every edited `.svelte` file until it reports clean.
   Then `npm run check` (0 errors) and `npm run lint` (watch for
   `no-navigation-without-resolve`).
2. **Browser, light + dark, at 375 / 768 / 1024 / 1280 / 1440.** Screenshot each.
   Following CLAUDE.md, use a tall viewport and shoot the whole page in one go.
3. **Faces:**
   - At every width both faces must be fully visible and not covered by the quotes
     panel or the cards.
   - At 375 the patient must be whole; the clinician should be ≥ 50% in frame. A 4:3 box
     shows about 75% of the 16:9 source, which should be enough, so confirm it.
   - Record the final `object-position` X and the measured result per breakpoint in the
     design system, the way the old table did.
4. **Headline:** at most 3 lines at 1024, 2 at ≥1280, and no hyphen break at any width.
5. **Heights.** Record them, don't hard-fail on them:
   - the hero height and `/` `scrollHeight` at 1280×900 and 375×812, compared with the
     §0 baseline;
   - expect the page to get **shorter**, since the `KeyBenefits` section and its
     padding are gone.
   - At 1280×800 the top of both cards must be visible without scrolling. If the cards
     make the hero taller than ~1 100 px at 1280, raise it as an open item. **Don't**
     silently drop the problem line.
6. **Anchors:** "See how it works" lands on the How It Works heading below the sticky
   header, and "Visit Support Center" lands on `#support`.
7. **LCP:** the hero image is still the eager, `fetchpriority="high"` candidate, and its
   downloaded size is smaller than before.

## 7. Docs to update in the same change

- **`docs/design-system.md`**
  - §1: the `.on-navy` scope.
  - §2 "The home page": new structure diagram (`KeyBenefits` gone,
    `HeroAudienceCards` in the hero). Replace the full-bleed / crop-anchor / overlay /
    mask paragraphs with the framed-photo rules and the new measurement table. Record this
    as a **reversal** (2026-09-27, client/owner direction) of the single-column hero and the
    separate key-benefits section.
  - §3: the new home H1 size.
  - §7: component table rows for `UroDapterHero`, `KeyBenefits` → `HeroAudienceCards`,
    `SiteHeader` (if the landmark fix lands).
- **`docs/home-page-plan.md`**: structure table, and the open items below.
- **`AGENTS.md` / `CLAUDE.md`**: no change expected. Update them only if a rule they state
  changes.

## 8. Open items to raise with the client

1. **New microcopy:** "See how it works" (primary CTA) and the screen-reader suffixes.
2. **Placement change:** the key-benefit cards now sit in the hero and link to the journey
   pages. This reverses the 2026-09-08 single-column hero. Owner-approved; confirm with
   the client.
3. **Optional trim:** drop the cards' problem sentence on the home page to shorten the
   hero. The journey pages carry the same point. Only if the client agrees.
4. **Contact route:** the mockup had "Contact us" / "Talk to our team". Is a contact page
   or form wanted? If so it gets its own route and approved copy.

## Out of scope

- The serif back-port for the home H1 (it stays open).
- `ChooseJourney`, which keeps its three cards and the Support Center block.
- `/patients`, `/clinicians`, `/partners`.
- New photography. The framed crop uses the existing `urodapter-hero.png`.

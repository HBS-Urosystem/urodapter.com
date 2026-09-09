# Clinician Journey Page — Build Plan & Decisions

**Status (2026-09-07): rebuilt against the 0831 client plan and verified.** Light + dark,
375 / 768 / 1280, `npm run check` (0 errors), `npm run lint` (clean, apart from the pre-existing
stray `src/routes/._+page long.svelte`), no console errors.

**Sources (0831, current):** `5. clinician journey page.docx` and `2. website architecture.docx`
in `/Users/vhollo/Public/Google/_melo/Urosystem/urodapter - UX/0831/`. Where a block survived the restructure unchanged, its earlier
provenance still holds: `5_clinician_journey_precursor.docx` (client outline + margin comments +
the "Product Features" figure) and the client CMS blocks quoted in
[`content/home.ts`](../src/lib/content/home.ts).

> **2026-09-09 — hosszúság-audit.** A lap 7 105 px asztali / 12 756 px mobil, ami **docx-hű**:
> mind a hat szekció megvan, kitalált blokk nincs rajta. A rövidítési pontok nem a docx
> túllépéséből, hanem a docx *be nem tartásából* jönnek (Section 1 közös doboza, „selected
> highlights" a Section 3-ban), és a lap terhének egy része a homepage-re tartozna. Mérések,
> kereszt-duplikációs tábla és a javaslatok: **[page-length-audit.md](page-length-audit.md)**.

Everything else is the shipped system: [design-system.md](design-system.md) §12 said the clinician
page is "the same system with different parameters", and it still is. The 0831 rebuild added
exactly one new shared component (`DonutStat`); nothing else was invented.

### What the 0831 architecture changed

Journey Steps 1–3 — *"Why should I care?"*, *"What is UroDapter?"*, *"How does it work?"* — are now
answered **on the homepage**. This page starts at **Step 4 (Clinical Value)** and runs to Step 9
(Support Center). Eight sections became six, and the evidence section was re-cut around the three
named studies instead of a generic "safe and effective" panel.

| Was (2026-08-26) | Now (0831) |
|---|---|
| 1 `ClinicianHero` Recognition | folded into **Section 1** `ClinicalValue` |
| 2 `WhatIsIt` What is the UroDapter? | **parked** for the homepage rebuild |
| 3 `Mechanism` The new approach… | **parked** for the homepage rebuild |
| 4 `ClinicalBenefits` 3 benefit cards | **Section 1** — now 2 × 3 cards, "For Your Practice" / "For Your Patients" |
| 5 `Indications` own section | **Section 4**, block 1 — "Suitable for the patients you already treat" |
| 6 `EvidenceApprovals` stats + chart + publications + regulatory | **Section 2** `ClinicalEvidence` — three named study blocks |
| 7 `Adoption` stats + partners + quotes | **Section 3** `SocialProof` — clinician quotes, numbers, patient quotes |
| 8 `NextSteps` 3 CTA tiers | **Section 5** — new CTA copy, one link per tier |
| `SupportClosing` | **Section 6** — plus the docx's closing statement |

`WhatIsIt.svelte` / `Mechanism.svelte` and their content objects (`whatIsIt`, `mechanism`,
`bridgeMechanism`) are **parked, not deleted** — kept at the end of `content/clinicians.ts` for the
homepage rebuild. `ClinicianHero`, `ClinicalBenefits`, `Indications`, `EvidenceApprovals` and
`Adoption` were **deleted**: their content was absorbed into the new sections, not moved.

### Content dropped in the restructure (recoverable from git)

- **The regulatory / approvals panel** (CE, FDA listing, ISO 13485, patent pending). The 0831 plan
  puts regulatory information in the **Support Center**, and the closing band now carries a
  "Regulatory information" chip pointing there. Restore the panel only if the client asks.
- **The publications list** (three papers + "see all publications"). Same reason — the architecture
  doc makes the Support Center the single home for publications; the three studies are now cited
  inline in Section 2 instead.
- **The international partners block** (IBSA / iAluadapter®, Dawa, Morulaa) and the **"85
  countries"** stat. The 0831 docx replaces them with the "Trusted Worldwide" figures below.

> **2026-09-08 — canonical source folder + English pass.** The 0831 documents now live at
> `/Users/vhollo/Public/Google/_melo/Urosystem/urodapter - UX/0831/` (this page's docx is
> byte-identical to the copy this page was built from; the file is larger only because of embedded
> images). A site-wide English correction pass was applied — hyphens used as dashes → em dashes,
> "1,5 years" → "1.5 years", and the spelling fixes already noted. The full list is in
> [home-page-plan.md](home-page-plan.md). Two of the corrections touch testimonial quotes; flag to
> the client if quotes must stay byte-identical.

---

## 1. Structure

```
SiteHeader (solid, .nav-gradient teal)
1  ClinicalValue      Clinical Value for You and Your Patients   hero + 2 × 3 BenefitCards
   bridge (arrow)
2  ClinicalEvidence   What the Clinical Evidence Shows           3 figures · ring + bars · review
   bridge (quote)
3  SocialProof        Trusted in everyday clinical practice      clinician quotes · numbers · patient quotes
   bridge (arrow)
4  Implementation     Easy to introduce into clinical practice   indications · workflow · learning path
   bridge (quote)
5  NextSteps          What would you like to do now?             3 CTA tiers
   SupportClosing     Support Center box + the closing statement
```

Four bridges for five open sections, alternating arrow → quote → arrow → quote, exactly as the
patient page. Section 6 is folded into `SupportClosing` so the page does not stack a bridge on top
of the closing band. Copy lives in
[`src/lib/content/clinicians.ts`](../src/lib/content/clinicians.ts); the route is composition only.

**Accent:** the whole page is `bg-persona-page accent-clinician`. That single class retints the
canvas, every `.surface-*`, every `.tint-band` and the nav gradient — no teal is hardcoded
anywhere in the components.

### Section 2 — how the three studies are drawn

| Block | Docx ask | Built as |
|---|---|---|
| Lovász, *Int J Urol* 2019 | "a row of three large evidence figures" | A `.surface-card` with a `<dl>` of three serif figures (1,520 · 98% / 100% · 0 observed), divided by hairline accent rules, then the two docx footnotes and the citation |
| Pothoven et al., *Continence* 2025 | "a large 74% continuation ring on the left, a short horizontal bar chart on the right" | `shared/DonutStat.svelte` (new) + a two-row bar list, side by side from `sm` up, stacked below it |
| Buford et al., *Neurourol Urodyn* 2025 | recognition callout | A `.surface-panel` beside the Pothoven card: label, the serif "8 experts from 6 countries", the recognition sentence and the citation |

`DonutStat` draws the arc with the validated `--chart-continuing` token (never the raw persona
accent — design system §1); the SVG is `aria-hidden` and the percentage is real text.

### Section 4 — the three implementation blocks

1. **"Suitable for the patients you already treat"** — five icon cards (Recurrent UTI · Chronic UTI
   · IC/BPS · Irradiation cystitis · Bladder cancer). Same grid the old `Indications` section used;
   `IndicationsStrip` is still only good for ~4 chips.
2. **"Fits into your existing workflow"** — the docx's six ✓ items as a two-column checklist in a
   `.surface-panel`.
3. **"Easy to learn. Supported from the start"** — the three-step `<ol>` with the docx's ↓ arrows
   between steps (static marks, not motion), and the four support resources as accent pills.

## 2. What each client comment turned into *(precursor docx — most of these blocks moved or were parked on 2026-09-07; see the box at the top)*

| docx comment (HU) | Where it landed |
|---|---|
| "I would definitely use *this* figure here; the clinician cares about technical details, incl. insertion depth and easy grip in a wet environment" (§2) | `ProductCallouts` now renders the client figure's four labels **with their technical notes** — Isolating Collar / Short Rounded Tip (6–8 mm) / Connecting Tail (Luerslip + Luer-lock) / Handling Grip |
| "Small diagrams would be good here, like in the patient journey" (§4) | The three benefits are `BenefitCard`s with heroicons — the same vocabulary as the patient page's Section 3 |
| "Small icons for the indications would be nice" (§5) | Five icon cards. `IndicationsStrip` is designed for ~4 chips, so five got their own grid instead of squeezing it |
| "I'd make a separate box out of this" (§5 paragraph) | The "local therapy would be more effective…" paragraph is its own `.surface-panel` box below the chips |
| "This obviously has to be uploaded" (§6 publication list) | Three publications already cited on this site are listed, with "See all publications in the Support Center →". **Open item — the full list is still owed.** |
| "This too has to be uploaded. More numbers could be thrown around here — how many countries etc." (§7) | Two `StatCard`s (1,000,000+ procedures; 85 countries with the IBSA attribution) + the three named partners |
| "Two kinds of form / e-mail could go here: one to invite the patient to this site, one for colleagues and management" (secondary CTA) | The tier carries the docx's two buttons ("For patients" / "For clinicians"), currently linking to the two journeys. **Open item — they should become share/e-mail forms.** |
| "If it's one deep content, this is the only way to steer" (last section) | The last bridge line and the "Dive deep" Support Center box are rendered as **one** closing band |

---

## 3. Copy provenance

**0831 docx, verbatim:** the Section 1 sub-title and both intro paragraphs; all six "For Your
Practice" / "For Your Patients" benefit titles and bodies; every bridge line; the Section 2 intro
and all three study blocks (labels, titles, figures, both footnotes, the recognition sentence and
the citations); the three clinician quotes with their theme labels; the "Trusted Worldwide"
figures; the three patient quotes with their theme labels; the whole of Section 4 (title, intro,
five indications, six workflow items, three learning steps, four resources); all three CTA tiers
with their button labels; and the Section 6 sentence plus the closing statement.

Two obvious docx typos are corrected: *"retorspective"* → retrospective, *"acceptence"* →
acceptance.

**Newly written, deliberately claim-free:** the five eyebrows (Clinical value · Clinical evidence ·
Social proof · Implementation · Next steps), and the two "want to read more…" lead-ins above the
Support Center bands.

**Adopted from the approved patient docx:** the Section 5 heading *"What would you like to do
now?"* — the clinician docx names the three tiers but gives no section heading. Flag if unwanted.

**Section header used once, not twice:** the docx's adoption-block title *"Trusted in everyday
clinical practice"* and its sentence serve as the Section 3 heading and intro, so they are not
repeated mid-section. The docx's own order — clinician quotes → numbers → patient quotes — is kept.

**Claims held at their previous strength, deliberately:**
- *"The only effective way of treating the bladder and the urethra at the same time"* left the page
  with `ClinicalBenefits`. If it returns, it must keep its 2025-consensus citation.
- The FDA wording (*"listed with the U.S. Food and Drug Administration"*, never "FDA approved") now
  only lives in `content/home.ts` — apply the same rule wherever regulatory copy resurfaces.
- *"significantly reduces the risk of urinary tract infections"* (`urodapter/benefits`) is still
  **not used** anywhere — it has no citation.

## 4. Component changes made for this page

No component was forked. From the 2026-08-26 build, four shared components gained an optional prop
and one moved:

| Component | Change |
|---|---|
| `SectionBridge` | `lead` is now optional — two of the four clinician bridges are a single sentence, and a sentence stays in one element |
| `BenefitCard` | optional `source` citation line; card is a flex column so the line pins to the bottom |
| `TestimonialCard` | optional `linkLabel`/`href` — the clinician grids have no per-card story page, one shared "read all" band instead |
| `ProductCallouts` | optional per-callout `description` (used only by the parked `WhatIsIt`) |
| `OutcomesChart` | **moved** `patients/` → `shared/`. Still used by the patient page; the clinician page's 0831 evidence section draws its own two-row bar list instead |

The 0831 rebuild added exactly one component:

| Component | Notes |
|---|---|
| `shared/DonutStat.svelte` | A single-value completion ring (the docx's "large 74% continuation ring"). Arc drawn with `--chart-continuing`, `stroke-linecap="round"`, SVG `aria-hidden`; the percentage and caption are real text. Props `value` (0–100) + `caption` |

`ClinicianQuotes` (the manual slider) is still **not** used here: grids of `TestimonialCard`s keep
every quote visible, which the design system prefers over a slider.

## 5. Accessibility fix this page forced

`--accent-ink` for the clinician scope in **light mode** was the raw `#2c8979`, measured at
**4.23:1 on white** — below AA for the 12–14px eyebrows, links and step numbers that use it. It is
now `color-mix(in srgb, var(--color-clinician) 80%, black)` → **6.04:1 on white, 4.66:1 on the
deepest `.surface-panel` tint** (the worst case on the page). Patient blue and distributor violet
were measured too and pass unchanged (4.60:1 for violet).

This also slightly darkens the clinician lane on the home page — an intended fix, not a
regression. Dark mode is untouched (`emerald-300` on navy).

---

## 6. Open items for the client

**Pending copy/data**

1. **"30+ Countries"** is the docx's own figure, annotated in the file with *"Ezt ki kéne
   számolni, hogy ide mit írhatunk"* — i.e. it still has to be calculated. It is shipped as
   written, with **no source line**. Note it contradicts the previously approved CMS figure of
   **85 countries** (iAluadapter®/IBSA) that this page used until 2026-09-07, and the home hero's
   "50+ countries". Three different numbers are now in play — the client needs to settle one.
2. **"Thousands of Satisfied Patients"** (docx verbatim) also ships without a source.
3. **Hero headline placement.** The docx wants the sub-title on the hero image, as on the patient
   page. The clinician hero photo does not exist yet, so the headline sits beside an
   `ImagePlaceholder`; move it onto the photo when the asset lands.
4. **Support Center chips** on the closing band (Publications · Clinical evidence · Technical
   documents · Training resources · FAQs · Regulatory information) come from the docx sentence plus
   the architecture doc's Support Center contents. No Support Center route exists yet.
5. **Regulatory and publication content** was moved off this page (see the box at the top).
   Confirm that clinicians are expected to find CE / FDA-listing / ISO 13485 / patent status in the
   Support Center rather than on the journey page.

**Pending assets**

6. **Hero photo** — currently an `ImagePlaceholder`: a clinician performing a catheter-free
   instillation in an outpatient room, hands/syringe/device in focus. This is the only placeholder
   on the page, and it is above the fold.

**Pending destinations** (all currently point at the home `#support` anchor, marked `TODO` in
`clinicians.ts`): the **free sample kit request**, the **expert-contact request**, and the
clinician testimonial collection. The **UroDapter Web App** is live (2026-09-09):
`https://app.urodapter.com`, opened in a new tab. "Read all patient testimonials" is **live**
(2026-09-09) — it goes to `/patients#stories`, where the patient journey already collects them.

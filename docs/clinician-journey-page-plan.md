# Clinician Journey Page — Build Plan & Decisions

**Status (2026-08-26): built and verified.** `/clinicians` is a full journey page now — it
replaced the `AudienceStub` placeholder. Light + dark, 375 / 768 / 1280, `npm run check`
(0 errors), `npm run lint` (clean), no console errors.

**Sources:** `5_clinician_journey_precursor.docx` (client outline — its section headings, bridge
lines, benefit and indication bullets, and CTA copy are the source of truth), the **margin
comments** in that file, the client's **"Product Features" figure** embedded in it, and — where
the docx only names a section — the client CMS blocks already quoted in
[`content/home.ts`](../src/lib/content/home.ts).

Everything else is the shipped system: [design-system.md](design-system.md) §12 said the clinician
page is "the same system with different parameters", and this page is exactly that. No new
patterns were invented; four shared components gained an optional prop instead.

---

## 1. Structure

```
SiteHeader (solid, .nav-gradient teal)
1  ClinicianHero        Recognition                       ImagePlaceholder (pending photo)
   bridge (arrow)
2  WhatIsIt             What is the UroDapter?            ProductCallouts + spec list
   bridge (quote)
3  Mechanism            The new approach of the bladder   4 steps + VideoFacade + learning curve
   bridge (arrow)
4  ClinicalBenefits     A small device with a lot of…     3 BenefitCards + time-saving callout
   bridge (quote)
5  Indications          Conditions whose treatment…       5 icon cards + note box
   bridge (arrow)
6  EvidenceApprovals    Safe and effective                stats, OutcomesChart, publications, regs
   bridge (quote)
7  Adoption             More than 1,000,000 treatments    stats, partners, testimonial grid
   bridge (arrow)
8  NextSteps            What would you like to do now?    3 CTA tiers
   SupportClosing       closing tint-band
```

Seven bridges for eight sections, alternating arrow → quote → arrow …, exactly as the patient
page. Copy lives in [`src/lib/content/clinicians.ts`](../src/lib/content/clinicians.ts); the route
is composition only.

**Accent:** the whole page is `bg-persona-page accent-clinician`. That single class retints the
canvas, every `.surface-*`, every `.tint-band` and the nav gradient — no teal is hardcoded
anywhere in the components.

---

## 2. What each client comment turned into

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

Verbatim from the docx: the §1 hero (sentence 1 = h1, sentence 2 = body), all seven bridge lines
plus the closing line, all six section headings, the §3 mechanism paragraph (split into four
steps — one docx sentence each, unchanged), the three §4 benefit titles, the five §5 indications
and the §5 paragraph, the §7 IBSA bullet, and all three CTA tiers with their button labels.

Verbatim from the client CMS (the docx leaves these blank): the §2 device description and material
sentence (`urodapter/details`), the §4 benefit bodies (`urodapter/benefits`, `clinicians/hero`),
the learning-curve quote, the evidence stats and the regulatory bullets (`index/regulatory`,
`urodapter/legal`), and the clinician testimonials (`index/testimonials`).

Newly written, deliberately claim-free: the six eyebrows, the §6 and §7 intro sentences, the four
step titles, and the five Support Center category labels.

**Adopted from the approved patient docx:** the §8 heading *"What would you like to do now?"* —
the clinician docx names the three tiers but gives no section heading. Flag if unwanted.

**Claims held at CMS strength, deliberately:**
- The docx says "referring to CE, **FDA approval**". The site says *"listed with the U.S. Food and
  Drug Administration (FDA)"* — the CMS wording, and the one the home page plan already flagged
  as the correct one. Not upgraded to "approval".
- §4's *"The only effective way of treating the bladder and the urethra at the same time"* is the
  docx's own title and is kept verbatim; its card body and citation come from the 2025 consensus
  paper, so the strongest claim on the page carries a source line (design system §9). This is why
  `BenefitCard` gained an optional `source`.
- *"significantly reduces the risk of urinary tract infections"* (`urodapter/benefits`) is still
  **not used** anywhere — it has no citation.

---

## 4. Component changes made for this page

No component was forked. Four shared components gained an optional prop, and one moved:

| Component | Change |
|---|---|
| `SectionBridge` | `lead` is now optional — four clinician bridges are a single sentence, and a sentence stays in one element |
| `BenefitCard` | optional `source` citation line; card is a flex column so the line pins to the bottom |
| `TestimonialCard` | optional `linkLabel`/`href` — the clinician grid has no per-card story page, one shared "read all" band instead |
| `ProductCallouts` | optional per-callout `description` (the client figure's technical notes), hidden below `sm` where a corner cell is ~80px wide |
| `OutcomesChart` | **moved** `patients/` → `shared/` (design system §7 said to promote it when a second page needed it). No accent was hardcoded in it; the chart tokens are unchanged and still the validated ones |

`ClinicianQuotes` (the manual slider) was **not** reused: a grid of `TestimonialCard`s keeps all
four quotes visible, which the design system prefers over a slider.

---

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

1. **The full publication list** (docx §6, client comment). Three papers are shown; supply the rest
   and the DOIs/links — the titles now shown for Lovász 2019 and Pothoven 2025 are descriptive and
   should be replaced with the exact published titles.
2. **Partner detail** (docx §7). "Dawa in the US, Morulaa" is all the docx says. Dawa renders as
   "In the US."; **Morulaa has no region or role stated** — confirm both, and supply logos if they
   should appear.
3. **More adoption numbers** were invited by the comment but only 1,000,000+ and 85 countries exist
   in approved copy. The home page's "50+ countries" hero figure still contradicts the CMS's 85
   (see [home-page-plan.md](home-page-plan.md) §4) — unchanged here, 85 is used with its IBSA
   attribution.
4. **Support Center categories** on the closing band (Publications · Clinical evidence · Videos &
   training · Instructions for use · Technical information) are proposed labels — no Support Center
   route exists yet.

**Pending assets**

5. **Hero photo** — currently an `ImagePlaceholder`: a clinician performing a catheter-free
   instillation in an outpatient room, hands/syringe/device in focus. This is the only placeholder
   on the page, and it is above the fold.

**Pending destinations** (all currently point at the home `#support` anchor, marked `TODO` in
`clinicians.ts`): the webshop ("Order UroDapter"), the UroDapter App, the publication list, and the
clinician testimonial collection. The secondary tier's two buttons should become the share/e-mail
forms described in the client comment.

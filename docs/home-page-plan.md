# Home Page — Design & Build Plan

**Scope:** everything below the hero. The hero + audience CTA row were already shipped; this plan
covers the six sections added beneath them, the two audience stub routes they link to, and the
accent-scope machinery that makes the page colourful.

**Sources:** the client CMS at `urosystem.kit1/cms/blocks/**` (block file named against every
string below) and the shipped patient journey ([design-system.md](design-system.md),
[patient-journey-page-plan.md](patient-journey-page-plan.md)).

---

## 1. The problem this solved

The home page was a hero and nothing else. `SiteHeader` linked to `/#clinicians`,
`/#distributors` and `/#support`; the audience cards linked to `#patient` / `#clinician` /
`#distributor`. **None of those IDs existed** — every nav item except "For Patients" was dead. Two
of the three audiences had no landing surface at all, while the CMS held approved copy for all
three.

## 2. Structure

| # | Section | Component | Anchor | Accent |
|---|---|---|---|---|
| 1 | What UroDapter is + indications | `WhatItIs` | `#how-it-works` | default (patient) |
| 2 | Proof in numbers | `ProofStats` | `#proof` | default |
| 3 | For Patients | `PersonaSection` | `#patients` | `.accent-patient` |
| 4 | For Clinicians | `PersonaSection` | `#clinicians` | `.accent-clinician` |
| 5 | For Distributors | `PersonaSection` | `#distributors` | `.accent-distributor` |
| 6 | Voices + regulatory + Support Center | `Voices` | `#stories`, `#support` | mixed |

Five `SectionBridge` bands separate them; the bridge before a persona lane is wrapped in that
lane's accent class, so the colour hands over before the content does. Rhythm diagram in
[design-system.md §2](design-system.md).

Sections 3–5 are **one component used three times** (`<PersonaSection {...clinicians} />`) — the
lanes differ only in content and accent class.

## 3. Copy provenance

Every string is verbatim from the CMS (or de-escalated), never paraphrased. `src/lib/content/home.ts`
names the source block above each object.

| Section | CMS blocks |
|---|---|
| Hero (migrated out of the component) | `index/hero`, `index/key-benefits`, `index/credibility`, `index/audience` |
| 1 | `urodapter/details`, `urodapter/details_hero`, `instructions/general`, `index/indications` |
| 2 | `index/credibility`, `index/eval-pack-ud`, `index/refs`, `company/quality` |
| 3 | `patients/hero`, `index/key-benefits`, `urodapter/benefits`, `index/testimonials` |
| 4 | `clinicians/hero`, `index/eval-pack-ud`, `index/testimonials` |
| 5 | `partners/hero`, `distributors/product`, `index/refs`, `index/testimonials` |
| 6 | `index/testimonials`, `index/regulatory`, `urodapter/legal` |
| `/clinicians`, `/partners` stubs | `clinicians/roadmap`, `clinicians/hero`, `partners/hero`, `cta/partner` |

Only the bridge copy and the section intros are newly written, and they are deliberately
claim-free connective tissue.

## 4. Open items for the client

**Claims to confirm** (flagged, not changed — the hero is untouched by request):

1. The hero trust bar reads **"FDA / CE / MDR Certified"**. The CMS says "required CE
   certification" and "listed with / registered by the U.S. Food and Drug Administration".
   **MDR appears nowhere in the CMS**, and "Certified" is stronger than "listed". The new sections
   use the CMS wording.
2. The hero reads **"Used In 50+ Countries"**. The CMS figure is 85, but it attaches to the
   IBSA-branded iAluadapter® variant — §2 and §5 quote 85 only with that attribution.
3. `blocks/products/hero_urodapter.en.md` uses `alt='CE Marked / FDA Approved / ISO 13485:2016'`.
   "FDA Approved" contradicts every other CMS file; not copied into this site.
4. *"significantly reduces the risk of urinary tract infections"* (`urodapter/benefits.en.md`) is
   the client's own wording but carries no citation, and §9 of the design system requires a source
   line for clinical claims. **Not used** on this page — the softer neighbouring bullets are used
   instead. Supply a source if it should appear.

**Assets to supply** (currently `ImagePlaceholder`, or rendered as text):

- Close-up of the UroDapter® mounted on a standard syringe, in a gloved hand (§1 header).
- UroDapter® retail packaging + the 10-piece evaluation pack, flat on neutral (§5 header).
- `CE-FDA-ISO_nobg.svg` and the IBSA logo — referenced by the CMS but not present in this repo,
  so §2 renders the certification stats as icon + text rather than badge artwork.

**Content gaps:**

- No distributor testimonial exists. §5 uses the "Unknown Customer, USA, 2024" quote, which is a
  demand signal from a practice rather than a partner voice. A real distributor quote would be
  stronger.
- The 6–8 mm insertion depth and Luer Slip/Lock compatibility exist **only in Hungarian**
  (`urodapter/intro.hu.md`). Both are strong, concrete spec points; an approved English version
  would improve §1.
- There is no Support Center page. `#support` is a section on this page that routes onward to the
  three journeys; it should become a real route.

## 5. Follow-ups

- `/clinicians` and `/partners` are `AudienceStub` placeholders. Replace them with real journeys
  built the way `/patients` was — same components, new content module, `.accent-*` on the wrapper.
- Standalone `→` story links are 20px tall (WCAG 2.2 target-size guidance suggests 24). This is the
  shipped `TestimonialCard` pattern, not new here, but worth revisiting site-wide.
- Back-porting the serif to the home hero `h1` is still open (design system §3).

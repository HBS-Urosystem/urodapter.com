# Home Page — Design & Build Plan

> ## 2026-09-27 — hero redesign (owner direction)
>
> **Status: built and verified.** Plan and decisions D1–D14:
> [home-hero-redesign/plan.md](home-hero-redesign/plan.md); layout rules, measurements and the
> fluid approach: [design-system.md §2 *The home page*](design-system.md) and §6b.
>
> ### Shipped structure (supersedes the 2026-09-08 table below for the hero and Section 1)
>
> | # | Block | Component | Source |
> |---|---|---|---|
> | — | Hero: regulatory pill, headline, body, "See how it works" / "Talk to our team", product chip, framed photo with the rotating testimonials, two audience cards (whole card = link), credibility strip, regulatory line | `UroDapterHero`, `home/HeroAudienceCards`, `home/QuoteRotator` | Owner-approved mockup copy (2026-09-27); testimonials and regulatory line unchanged |
> | — | bridge (quote + problems): "For patients" / "For clinicians" problem lines, then *"A simple idea can make a remarkable difference."* | `SectionBridge` (`problems`) | docx "Why Heroes Care" lines, verbatim (moved out of the cards) + the docx How-It-Works headline |
> | 2 | How It Works — one-sentence intro, product diagram, caption above the 30-second animation, explanation | `home/HowItWorks.svelte` | docx, with owner wording D9–D12 |
> | — | bridge (arrow): *"Choose Your Journey"* | `SectionBridge` | owner wording (D14) |
> | 3 | Choose Your Journey (sr-only `h2`, 3 cards) + Support Center shortcut | `home/ChooseJourney.svelte` | docx, clinician card D13 |
>
> `KeyBenefits` is deleted. `SiteHeader variant="page"` is rendered by the route before `<main>`,
> and the hero is now inside `<main>`.
>
> ### Copy provenance
>
> - **Owner-approved mockup copy (2026-09-27), not docx copy:** the hero headline, body, CTAs,
>   regulatory pill, product chip, the two audience cards, "Choose your path", the strip's
>   sub-lines, and the header's "Contact us".
> - **Still docx-verbatim:** the two problem sentences (now in the first bridge), the two
>   testimonials, the video caption, the Choose Your Journey cards except D13.
> - **Owner wording (D9–D14):** the How It Works intro and the detail's middle sentence,
>   "standard Luer syringe" (hero chip, callout, detail), "patient compliance" (hero card tick and
>   journey card), and the "Choose Your Journey" bridge.
>
> ### Open items (for the owner/client, not blockers)
>
> 1. **Contact destination.** "Contact us" and "Talk to our team" point at `#support` as
>    placeholders (`TODO(placeholder): contact route`). A contact route or form is needed.
> 2. **Card deep links (optional).** "What to expect" and "Clinical use & evidence" go to the page
>    roots; deep links (`/clinicians#…`) could replace them once those sections carry stable ids.
> 3. **Client sign-off.** The hero copy now differs from the client docx (D5/D6). Record the
>    client's acknowledgement here.
> 4. **Strip sub-lines.** "Peer-reviewed in 3 journals" counts the three journals the site cites
>    (Int J Urol 2019, Continence 2025, Neurourol Urodyn 2025); a fuller publication list could
>    replace it. The webshop link stands in for a country count until one is settled.
> 5. **Claim wording to confirm with the client** (implemented as the owner stated; the design
>    system says claims must not be strengthened):
>    - **D9** drops the hedge: "may make treatment more comfortable for many patients" became
>      "making treatment more comfortable for both male and female patients".
>    - **D13** "patient compliance" is a new clinical-benefit claim; design system §9 expects a
>      source. The closest cited evidence on the site is the continuation data in Pothoven et al.,
>      *Continence*, 2025.
> 6. **"Luer" on the other pages.** Still "standard syringe" in the patient callout
>    (`patients.ts`), the clinician Implementation body and the clinician spec list
>    (`clinicians.ts`). Left alone to keep this change on `/`.
> 7. **Page length.** At 1280 `/` went 2 973 → 2 940px; at 375 it went 4 470 → ~4 820px, because
>    the problem sentences now open the first bridge and the hero stacks cards, chip and strip.

> ## 2026-09-08 — rebuilt from `3. page_content.docx`
>
> **Status: built and verified.** Light + dark, 375 / 768 / 1280, `npm run check` (0 errors),
> `npm run lint` (clean apart from the pre-existing stray `src/routes/._+page long.svelte`), no
> console errors, and the animation confirmed playing in the browser.
>
> Sections 1–5 below are the *previous* (pre-0831) build and no longer describe the page. They are
> kept because the copy provenance and the client flags in §4 are still valid, and because the
> parked components still hold that CMS-approved copy.
>
> **Canonical source folder:** `/Users/vhollo/Public/Google/_melo/Urosystem/urodapter - UX/0831/`.
> Note `3. page_content.docx` supersedes the earlier `3. homepage_content.docx`.
>
> ### Shipped structure
>
> The 0831 architecture puts journey Steps 1–3 on the homepage, and the docx opens with a warning
> that "the reader doesn't have to scroll down too much… cards or text elements might be inserted
> on the opening image". That is why the credibility strip and the two testimonials are **overlaid
> on the hero** instead of getting sections of their own.
>
> | # | Block | Component | Docx |
> |---|---|---|---|
> | — | Hero: headline + subheadline on the image, product chip, credibility strip, regulatory line | `UroDapterHero` | Hero + Credibility |
> | 1 | Two audience cards — "A Better Experience for Patients" / "A Practical Solution for Clinicians", each with that audience's problem line and three ticks — **plus the two testimonials as a third column** | `home/KeyBenefits.svelte` | Why Heroes Care + Key benefits + the two testimonials |
> | — | bridge (quote): *"A simple idea can make a remarkable difference."* | `SectionBridge` | the docx's own How-It-Works headline |
> | 2 | How It Works — intro, product diagram, second-line explanation, 30-second animation | `home/HowItWorks.svelte` | How It Works |
> | — | bridge (arrow) | `SectionBridge` | connective, newly written |
> | 3 | Choose Your Journey (3 cards) + Support Center shortcut | `home/ChooseJourney.svelte` | CTA Cards + Support Center Shortcut |
>
> The docx orders Credibility *after* Key benefits; it is overlaid on the hero instead, per the
> docx's own "don't scroll too much" instruction. Everything else follows docx order exactly.
>
> **Section 1 composition (client direction, 2026-09-08).** The docx's key-benefits headline is
> **split across the two card titles** rather than sitting above them as one line, so each card
> owns its half and nothing is repeated; the section therefore has no headline of its own and is
> labelled by both card headings. The two "why heroes care" lines moved **inside** the cards,
> between the title and the list — problem first, then what changes. The benefit lists use **ticks**
> (the mark the pre-0831 hero cards used), not per-item icons, and the "Why it matters" eyebrow was
> dropped.
>
> **Hero height (client direction, 2026-09-08).** The hero was 708 px at 1280 with 237 px of dead
> space below the regulatory line — it was being stretched by a second column holding the two
> testimonials. Those moved into the key-benefits row as a third column, so the hero is now a
> single column ending just below the regulatory line (**527 px**), and the testimonials sit beside
> the patient and clinician cards. The docx's "put the testimonials in a different place than the
> rest of the credibility list" still holds — they are simply one section lower.
>
> **Section 2 layout (client direction, 2026-09-09).** The four docx beats are two alternating
> rows, not a full-width stack: the intro sits **beside** the annotated product figure
> (`2fr / 3fr` — the figure is ~4.8:1 with labels in all four corners, so it takes the wider
> track), then the animation and the second-line explanation **swap sides** below it
> (`3fr / 2fr`, video left). Below `lg` both rows stack in DOM order: intro → figure → video →
> explanation.
>
> ### The 30-second animation
>
> The client supplied `Urodapter_anim_30sec_EN_230309.mp4` (1920×1080, 30 s, ~10 Mbps, **38 MB**).
> It is **self-hosted, not embedded from YouTube** — no third party is contacted at all:
>
> | File | Size | Notes |
> |---|---|---|
> | `static/urodapter-animation.mp4` | 2.4 MB | H.264 high, 1280×720, CRF 24, AAC 96 k, `+faststart` |
> | `static/urodapter-animation.webm` | 1.9 MB | VP9 CRF 34, Opus 80 k — served first |
> | `static/urodapter-animation-poster.webp` | 16 KB | frame at 2 s ("Introducing UroDapter") |
>
> Re-encoded with ffmpeg; **there is no ffmpeg on this machine** — the one used was the copy
> bundled inside Stremio (`/Applications/Stremio.app/Contents/MacOS/ffmpeg`, 7.1.1 with libx264 and
> libvpx-vp9). macOS's own `avconvert` was tried first and could only reach 26 MB at 720p, since its
> presets do not expose a bitrate. **If the client ships a new cut, re-encode with the same
> settings** rather than dropping the raw 38 MB file into `static/`.
>
> `VideoFacade` gained a `sources` prop for this: nothing is fetched until the viewer presses play,
> then a native `<video>` takes over. `videoId` (youtube-nocookie) still works for the longer 3:03
> animation the patient page's parked section used.
>
> **Accessibility note / open item:** the animation carries **burned-in (open) captions**. They are
> visible but not machine-readable and cannot be switched off. A `<track kind="captions">` WebVTT
> file should be added once a transcript exists — the place for it is marked in `VideoFacade`.
>
> ### English corrections to the approved copy
>
> Applied across all three content modules; every change is minimal and meaning-preserving:
>
> | Docx | Shipped | Why |
> |---|---|---|
> | "…is associated with complications, procedural burden and creates discomfort for patients." | "…is associated with complications and procedural burden, and creates discomfort for patients." | The original mixed two constructions ("is associated with X, Y and creates Z") |
> | "Hannah 27y female IC/BPS patient" | "Hannah, 27, female IC/BPS patient" | punctuation |
> | "…and an overall a better quality of life" | "…and an overall better quality of life" | stray article (already fixed in a previous build) |
> | "in 1,5 years" | "in 1.5 years" | decimal comma → decimal point |
> | "treatments - especially", "loyalty - particularly" | em dashes | hyphen used as a dash |
> | "retorspective", "acceptence" | "retrospective", "acceptance" | spelling |
>
> Two testimonial quotes are touched (the 1.5-years line and Hannah's). Both are already
> translations rather than transcripts, and the edits are punctuation/article only — **flag to the
> client if quotes must stay byte-identical.**
>
> ### Copy decisions where the docx offered alternatives
>
> | Docx | Chosen | Why |
> |---|---|---|
> | "1 Million+ Uses / 1 Million+ Procedures" | **1,000,000+ Procedures worldwide** | matches the numeral style used elsewhere on the site |
> | "Available Internationally / Used in XY Countries" | **Available internationally** | "XY" is a placeholder, and three different country counts are already in circulation — see §4 |
> | "FDA Registered (?) / CE Marked / MDR" | **CE marked and FDA listed** | answers the client's own "(?)": the approved CMS wording is *listed with* the FDA, never "approved" or "registered" |
> | "Already using UroDapter? / Looking for publications, FAQs…" | **both** | one as the heading, one as the body of the Support Center shortcut |
>
> ### Still open on the homepage
>
> 0. **The homepage is under-loaded for its own job.** At 2 877 px it is less than half the
>    clinician page (7 105 px), and the architecture docx's fourth question — *"Can I trust it?"* —
>    is answered only by the hero's four chips, with no figures and no citations. The block that
>    would answer it is **built but not mounted**: `home/ProofStats.svelte` plus the `proof` /
>    `bridgeProof` exports in `content/home.ts`. Measurements, the cross-page duplication table and
>    the proposed moves: **[page-length-audit.md](page-length-audit.md)**.
> 1. **Country count.** The docx's "XY" is unresolved and three numbers exist: 30+ (clinician
>    docx), 50+ (the old hero) and 85 (CMS, via iAluadapter®/IBSA). The homepage now avoids the
>    number entirely. **The client needs to settle one figure.** *(2026-09-09 — decision: no
>    country number anywhere until the client settles one; the clinician page's "30+ Countries"
>    card goes too.)*
> 2. **`#support` is still a placeholder.** The header's "Support Center" nav item and every
>    pending "learn more" link resolve to the Support Center shortcut block at the foot of the
>    homepage (`id="support"` on that block). Without a real Support Center route those links
>    scroll to a card, not to content.
> 3. **`/partners` "Back to the overview"** pointed at `/#distributors`, a section the 0831
>    rebuild removed — it is now the homepage itself (2026-09-09). `sectionHref()` had no other
>    caller and was dropped from `home.ts`.
> 4. **Product image.** The docx just says "[Product image]"; the shipped block reuses the
>    annotated `ProductCallouts` diagram with the **patient-facing** callout labels, because the
>    personas doc is explicit that patients are not looking for technical specifications. Confirm
>    that is the intended image.
> 5. **Regulatory line.** The one-line CE / FDA / ISO 13485 statement under the hero credibility
>    strip is not in the homepage docx — it is there because the journey pages now point at the
>    Support Center for regulatory detail, and this keeps the facts on the site. Remove it if the
>    client prefers.
>
> ### Parked, still unused
>
> `components/home/{WhatItIs,ProofStats,PersonaSection,Voices}.svelte` and their content objects
> (`whatItIs`, `proof`, `patients`, `clinicians`, `distributors`, `voices`, and the five old
> `bridge*` objects) are kept at the foot of `content/home.ts` under a PARKED banner. The 0831
> homepage replaces all of them, but the copy is CMS-approved and the **Support Center page will
> need much of it** — especially the publications, regulatory bullets and the indications strip.
> `patients/HowItWorks.svelte`, `clinicians/WhatIsIt.svelte` and `clinicians/Mechanism.svelte`
> stay parked too: the 0831 homepage did not need them, so they are now candidates for the
> Support Center rather than for this page.

**Scope:** everything below the hero. The hero + audience CTA row were already shipped; this plan
covers the six sections added beneath them, the two audience stub routes they link to, and the
accent-scope machinery that makes the page colourful.

**Sources:** the client CMS at `urosystem.kit1/cms/blocks/**` (block file named against every
string below) and the shipped patient journey ([design-system.md](design-system.md),
[patient-journey-page-plan.md](patient-journey-page-plan.md)).

---

## 1. The problem this solved *(pre-0831 build — superseded; see the box at the top)*

The home page was a hero and nothing else. `SiteHeader` linked to `/#clinicians`,
`/#distributors` and `/#support`; the audience cards linked to `#patient` / `#clinician` /
`#distributor`. **None of those IDs existed** — every nav item except "For Patients" was dead. Two
of the three audiences had no landing surface at all, while the CMS held approved copy for all
three.

## 2. Structure *(pre-0831 build — superseded)*

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

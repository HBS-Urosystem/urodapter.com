// Clinician journey page copy.
// Source of truth: "0831/5. clinician journey page.docx" + "0831/2. website
// architecture.docx". Where the 0831 docx keeps a block that already existed,
// the earlier provenance still holds ("5_clinician_journey_precursor.docx" and
// the client CMS blocks). Newly written strings are limited to connective
// tissue and are deliberately claim-free.
//
// Architecture note (0831): journey Steps 1-3 ("Why should I care?", "What is
// UroDapter?", "How does it work?") are answered by the HOMEPAGE. This page
// starts at Step 4, so it opens with Section 1 "Clinical Value for You and Your
// Patients"; the device and mechanism sections are parked at the end of this
// file for the homepage rebuild.
//
// Never strengthen a claim: keep "designed to", "may", "can be", "much less".
//
// Icon `d` strings are heroicons *outline*, single path, drawn with
// currentColor; the comment above each one names the icon.

import { resolve } from "$app/paths";
import type { ResolvedPathname } from "$app/types";

// Placeholder target until the dedicated routes exist (webshop, UroDapter App,
// publications, testimonials): everything pending points at the Support Center.
const supportHref = (resolve("/") + "#support") as ResolvedPathname;
// The patient journey's stories section (`PatientStories` carries the id).
const patientStoriesHref = (resolve("/patients") + "#stories") as ResolvedPathname;

// External destination supplied by the client (2026-09-09). It is an absolute
// URL, not a route, so it lives in `externalHref` rather than `href`: the two
// fields are what tell the component to open a new tab, and they keep `href`
// typed `ResolvedPathname` for eslint's `no-navigation-without-resolve`.
const appUrl = "https://app.urodapter.com";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

// users
const iconUsers =
  "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z";
// globe-alt
const iconGlobe =
  "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418";
// shield-check
const iconShieldCheck =
  "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z";
// check-badge
const iconCheckBadge =
  "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z";
// face-smile
const iconFaceSmile =
  "M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z";
// clock
const iconClock = "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z";
// bladder outline (drawn for this site; used site-wide for IC/BPS + the bladder)
const iconBladder =
  "M7.5 4.5c0 1.5-1 2.5-2.25 3.5C3.75 9.25 3 11.25 3 13.5 3 17.64 7.03 21 12 21s9-3.36 9-7.5c0-2.25-.75-4.25-2.25-5.5C17.5 7 16.5 6 16.5 4.5M9.75 21v-2.25M14.25 21v-2.25";
// awareness ribbon (bladder cancer)
const iconRibbon =
  "M12 3c-2 2.5-3.5 5.5-3.5 8 0 1.5.5 3 1.5 4.5L6.5 21M12 3c2 2.5 3.5 5.5 3.5 8 0 1.5-.5 3-1.5 4.5l3.5 5.5M9.25 13.75 6.5 21m7.25-7.25L17.5 21";
// arrow-path (recurrent)
const iconArrowPath =
  "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99";
// document-text
const iconDocument =
  "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z";
// chart-bar
const iconChartBar =
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z";
// academic-cap
const iconAcademicCap =
  "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342";
// link
const iconLink =
  "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244";
// droplet
const iconDroplet =
  "M12 21a7.5 7.5 0 0 0 7.5-7.5c0-4.06-3.07-7.44-5.28-9.83A41.03 41.03 0 0 0 12 1.5s-.9.86-2.22 2.17C7.57 6.06 4.5 9.44 4.5 13.5A7.5 7.5 0 0 0 12 21Z";
// arrows-pointing-out
const iconArrowsOut =
  "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15";
// shopping-cart
const iconCart =
  "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z";
// chat-bubble-left-right
const iconChat =
  "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155";
// device-phone-mobile
const iconPhone =
  "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3";
// play-circle
const iconPlay =
  "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5.09-.328a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z";
// wrench-screwdriver
const iconWrench =
  "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z";

// heart
const iconHeart =
  "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z";
// puzzle-piece
const iconPuzzle =
  "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.007-1.875 2.25-1.875s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z";
// adjustments-horizontal
const iconAdjustments =
  "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75";
// calendar-days
const iconCalendar =
  "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5";
// shield + droplet (chronic UTI; same mark as the patient page)
const iconShieldDroplet =
  "M12 2.714A11.959 11.959 0 0 1 20.402 6 11.99 11.99 0 0 1 21 9.749c0 5.592-3.824 10.29-9 11.623-5.176-1.332-9-6.03-9-11.622 0-1.31.21-2.571.598-3.751A11.959 11.959 0 0 0 12 2.714Zm0 5.036s3 3.11 3 5.25a3 3 0 1 1-6 0c0-2.14 3-5.25 3-5.25Z";
// sun (irradiation cystitis)
const iconSun =
  "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z";
// book-open
const iconBook =
  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253";
// question-mark-circle
const iconQuestion =
  "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z";

// ---------------------------------------------------------------------------
// SECTION 1 — Clinical Value for You and Your Patients
// docx: hero image + sub-title, two intro paragraphs, then two groups of three
// benefit cards ("For Your Practice" / "For Your Patients"). All verbatim.
// ---------------------------------------------------------------------------

export const hero = {
  // docx "[Sub-title]" — the display line that sits on the hero image.
  headline:
    "A Better Bladder Instillation Experience. Without Changing Your Practice.",
  intro: [
    "Bladder instillation is not only about delivering medication. How treatment is administered can influence patient comfort, acceptance of repeated procedures and the practical burden on the clinical team.",
    "By avoiding catheterization, UroDapter is designed to improve patient comfort, reduce catheter-related complications and support efficient treatment delivery.",
  ],
  image: {
    description:
      "A clinician performing a catheter-free instillation in an outpatient room — hands, syringe and UroDapter in focus, patient at ease.",
  },
};

// The docx asks for the section header to be written out, and for the two
// groups to stay visually separated so they remain readable on mobile — and
// offers "1 box for the 3 patient benefit, 1 box for the clinician benefit …
// can be sliders as well to save space". So each group is one box: side by
// side from md, and one at a time behind two side tabs on a phone (owner
// direction 2026-09-29; it was an AutoAccordion at every width).
export const clinicalValue = {
  eyebrow: "Clinical value",
  heading: "Clinical Value for You and Your Patients",
  // Each group is one card. `accentClass` puts each in its own persona colour
  // — the patients' card in patient petrol on the clinician page (owner
  // direction 2026-09-29: persona colours may appear on each other's pages).
  // `seconds` is the mobile tabs' dwell (presentation, not copy).
  groups: [
    {
      title: "For Your Practice",
      icon: iconShieldCheck,
      accentClass: "accent-clinician",
      seconds: 12,
      items: [
        {
          title: "Higher patient satisfaction",
          body: "A more comfortable treatment experience can strengthen patient confidence, satisfaction and loyalty — particularly important in practices where the quality of the patient experience matters.",
          icon: iconHeart,
        },
        {
          title: "Fewer catheter-related complications",
          body: "Eliminating catheter insertion reduces the risk of urethral trauma, bleeding, irritation and catheter-associated infection, helping avoid preventable treatment-related problems.",
          icon: iconShieldCheck,
        },
        {
          title: "Straightforward adoption",
          body: "UroDapter uses a standard syringe, requires minimal training and can be integrated into existing bladder instillation workflows without major changes.",
          icon: iconPuzzle,
        },
      ],
    },
    {
      title: "For Your Patients",
      icon: iconFaceSmile,
      accentClass: "accent-patient",
      seconds: 12,
      items: [
        {
          title: "A more comfortable experience",
          body: "Avoiding catheterization may reduce pain and anxiety, helping patients feel more relaxed and confident during bladder instillation.",
          icon: iconFaceSmile,
        },
        {
          title: "Better acceptance of repeated treatment",
          body: "When instillations are more comfortable and less stressful, patients may be more willing to start, continue and return for repeated treatments.",
          icon: iconArrowPath,
        },
        {
          title: "Greater treatment flexibility",
          body: "Depending on the patient, indication and local practice, UroDapter can be used by healthcare professionals and may also support clinician-approved self-treatment.",
          icon: iconAdjustments,
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// SECTION 2 — What the Clinical Evidence Shows
// docx bridge + intro, then three named evidence blocks. Figures, labels and
// footnotes are verbatim; only the obvious docx typos are corrected
// ("retorspective" → "retrospective", "acceptence" → "acceptance").
// ---------------------------------------------------------------------------

export const bridgeEvidence = {
  variant: "arrow" as const,
  lead: "The practical advantages are clear.",
  emphasis:
    "For clinical adoption, they also need to be supported by clinical evidence.",
};

export const evidence = {
  eyebrow: "Clinical evidence",
  heading: "What the Clinical Evidence Shows",
  intro:
    "UroDapter has been evaluated in a published clinical series, supported by real-world observational experience and included in an international review of IC/BPS treatments. The available evidence provides insight into procedural feasibility, safety and patient preference.",

  // 1 — Lovász: a row of three large evidence figures.
  series: {
    label: "Published Clinical Series — Feasibility at Scale",
    title: "270 patients with IC/BPS",
    source: "Lovász, International Journal of Urology, 2019",
    figures: [
      { value: "1,520", label: "Catheter-free instillations" },
      { value: "98% / 100%", label: "Successful instillation in women / men" },
      {
        value: "0 observed",
        label: "Instillation-related infections in this series",
      },
    ],
    notes: [
      "Published clinical evaluation in 270 patients with IC/BPS.",
      "“Successful instillation” refers to completing the catheter-free procedure without significant leakage or technical difficulty; it does not refer to treatment efficacy.",
    ],
    icon: iconCheckBadge,
  },

  // 2 — Pothoven: the combined visual the docx asks for (continuation ring on
  // the left, "why patients continued" bars on the right).
  realWorld: {
    label: "Real-world clinical experience — Patient acceptance",
    title: "61 patients, retrospective single-center study",
    source: "Pothoven et al., Continence, 2025",
    ring: {
      value: 74,
      caption: "continued using UroDapter during initial follow-up",
    },
    bars: {
      title: "Why patients continued",
      rows: [
        { label: "Less pain", value: 47.1 },
        { label: "Easier to use", value: 22.9 },
      ],
    },
    icon: iconChartBar,
  },

  // 3 — Buford: professional recognition.
  review: {
    label: "International expert review — Professional recognition",
    title: "8 experts from 6 countries",
    titleNote: "in a leading international review of IC/BPS treatment",
    body: "Catheter-free instillation was recognized as a novel delivery approach designed to avoid the discomfort and complications associated with repeated catheterization.",
    source: "Buford et al., Neurourology and Urodynamics, 2025",
    icon: iconGlobe,
  },
};

// The Section 2 accordion reads these three in order (design system §6a).
// Every string is one of the docx fields above — the header is each study's
// own label, the summary line is its descriptor (Buford: its finding), and
// the figures, footnotes and citation stay in the pane beside it. `seconds`
// is presentation, not copy: how long an item holds before the next opens,
// tuned to how much its pane asks the reader to take in.
export const evidenceItems = [
  {
    id: "series",
    title: evidence.series.label,
    body: evidence.series.title,
    icon: evidence.series.icon,
    seconds: 9,
  },
  {
    id: "real-world",
    title: evidence.realWorld.label,
    body: evidence.realWorld.title,
    icon: evidence.realWorld.icon,
    seconds: 12,
  },
  {
    id: "review",
    // No `body`: Buford's finding is a 22-word sentence, ~3 lines in this
    // column against one line for the other two descriptors, and the list
    // column is sized to its tallest body. It sits in the pane instead — the
    // thinnest of the three panes, which has the room for it.
    title: evidence.review.label,
    icon: evidence.review.icon,
    seconds: 10,
  },
];

// ---------------------------------------------------------------------------
// SECTION 3 — Social proof
// docx order: clinician testimonials → adoption numbers → patient testimonials.
// The adoption block's own title and sentence are used as the section header,
// so the docx wording appears once rather than twice.
// ---------------------------------------------------------------------------

export const bridgeSocialProof = {
  variant: "bridge" as const,
  lead: "Clinical evidence provides the scientific foundation.",
  emphasis:
    "Real-world experience shows how UroDapter performs in everyday clinical practice.",
};

export const socialProof = {
  eyebrow: "Social proof",
  heading: "Trusted in everyday clinical practice",
  intro:
    "UroDapter is used by clinicians and patients across multiple countries and healthcare settings.",
  // "Trusted Worldwide" figures, docx verbatim. The countries figure is still
  // an open client item ("this has to be calculated") — see the page plan.
  stats: [
    {
      value: "1,000,000+",
      label: "Procedures",
      source: "Urosystem, 2025",
      icon: iconUsers,
    },
    { value: "30+", label: "Countries", icon: iconGlobe },
    { value: "Thousands", label: "of satisfied patients", icon: iconHeart },
  ],
  clinicians: {
    heading: "What clinicians say about UroDapter",
    items: [
      {
        theme: "Clinical efficiency",
        icon: iconClock,
        quote:
          "Perfect for quick, targeted bladder treatments — especially when repeated instillations are needed. Less discomfort, more efficiency, better experience.",
        author: "Dr. Sijo J. Parekattil",
        meta: "Avant Concierge Urology, Winter Garden, Florida, USA",
      },
      {
        theme: "Patient comfort",
        icon: iconFaceSmile,
        quote:
          "It is a huge upgrade in patient comfort compared to using catheters for intravesical instillations.",
        author: "Dr. Kinga Karabinos",
        meta: "Urologist, South-Pest Hospital, Hungary",
      },
      {
        theme: "Practical adoption",
        icon: iconPuzzle,
        quote:
          "The device is a good alternative to conventional catheterization for intravesical therapy with patients experiencing less pain and a low risk of UTI development.",
        author: "Ria Pothoven",
        meta: "Clinical nurse consultant, Andros Bladder Center, Andros Clinics, The Netherlands",
      },
    ],
    disclaimer:
      "Testimonials reflect the personal experience of individual clinicians.",
    more: {
      heading: "Want to read more clinician experiences?",
      body: "Clinician testimonials and key opinion leader statements are collected in the Support Center.",
      linkLabel: "Explore clinician experiences",
      href: supportHref,
    },
  },
  patients: {
    heading: "What patients say about UroDapter?",
    items: [
      {
        theme: "Life-changing",
        icon: iconHeart,
        quote: "This tiny adapter has been a game changer in my treatment",
        author: "Kathy",
        meta: "Female IC/BPS patient, USA",
      },
      {
        theme: "Long-term comfort",
        icon: iconCalendar,
        quote:
          "I’ve been using UroDapters for the last two years, and they’ve made a huge difference. They’re not painful, easy to learn how to use, and I absolutely love them!",
        author: "Sue",
        meta: "Female chronic UTI patient, USA",
      },
      {
        theme: "Confidence during treatment",
        icon: iconShieldCheck,
        quote:
          "Using the UroDapter does not cause me mental distress or pain, and it has never caused any infection or complications in 1.5 years.",
        author: "Reka",
        meta: "Female IC/BPS patient, Hungary",
      },
    ],
    more: {
      heading: "Want to hear more patient stories?",
      body: "Discover how people with different bladder conditions describe their experience with UroDapter.",
      linkLabel: "Read all patient testimonials",
      // Live destination: the patient journey collects these stories. The
      // clinician collection above still waits on the Support Center.
      href: patientStoriesHref,
    },
  },
};

// Section 3's accordion (design system §6a). The six quotes are one list, with
// the docx's two headings as the group labels — the clinician/patient split is
// load-bearing here (a 2026-09-02 client comment is specifically about which
// quotes sit on which page), so it survives as a labelled `role="group"` run.
// Header is the theme label; the quote and its attribution are the pane.
export const socialProofItems = [
  ...socialProof.clinicians.items.map((item) => ({
    id: `clinician-${item.author.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: item.theme,
    icon: item.icon,
    group: socialProof.clinicians.heading,
    seconds: 9,
  })),
  ...socialProof.patients.items.map((item) => ({
    id: `patient-${item.author.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: item.theme,
    icon: item.icon,
    group: socialProof.patients.heading,
    // Patients' words, in the patient colour (owner direction 2026-09-29:
    // persona colours may appear on each other's pages).
    accentClass: "accent-patient",
    seconds: 9,
  })),
];

// ---------------------------------------------------------------------------
// SECTION 4 — Implementation
// docx: bridge, title + intro, then three blocks — the indications the reader
// already treats, a workflow checklist, and the three-step learning path.
// ---------------------------------------------------------------------------

export const bridgeImplementation = {
  variant: "arrow" as const,
  emphasis:
    "The next consideration is practical: how easily can UroDapter fit into your existing practice?",
};

export const implementation = {
  eyebrow: "Implementation",
  heading: "Easy to introduce into clinical practice",
  intro:
    "Trying UroDapter does not require a major change in your bladder instillation workflow. It uses familiar equipment, can be delivered by existing clinical staff, and is supported by practical training resources to help clinicians become confident quickly.",
  indications: {
    title: "Suitable for the patients you already treat",
    intro: "UroDapter can be used across common intravesical treatment settings:",
    items: [
      { label: "Recurrent UTI", icon: iconArrowPath },
      { label: "Chronic UTI", icon: iconShieldDroplet },
      { label: "IC/BPS", icon: iconBladder },
      { label: "Irradiation cystitis", icon: iconSun },
      { label: "Bladder cancer", icon: iconRibbon },
    ],
  },
  workflow: {
    title: "Fits into your existing workflow",
    items: [
      "Standard syringe",
      "Similar procedure time",
      "No additional equipment",
      "No routine local anaesthetic",
      "No catheter insertion",
      "Physician- or nurse-delivered instillations",
    ],
  },
  learning: {
    title: "Easy to learn. Supported from the start",
    steps: [
      { label: "Explore the step-by-step guidance", icon: iconBook },
      { label: "Perform your first procedures", icon: iconPlay },
      { label: "Become confident in routine use", icon: iconCheckBadge },
    ],
    resources: [
      "Step-by-step web app",
      "Video guidance",
      "Clinical webinar",
      "Expert support",
    ],
  },
};

// Section 4's accordion (design system §6a). Each of the docx's three
// implementation blocks becomes one item: its own title is the header — each
// already reads as a claim the pane then answers — and only the indications
// block has a lead sentence in the docx, so only that item reveals a body.
export const implementationItems = [
  {
    id: "indications",
    title: implementation.indications.title,
    body: implementation.indications.intro,
    icon: iconBladder,
    seconds: 9,
  },
  {
    id: "workflow",
    title: implementation.workflow.title,
    icon: iconArrowPath,
    seconds: 11,
  },
  {
    id: "learning",
    title: implementation.learning.title,
    icon: iconBook,
    seconds: 10,
  },
];

// ---------------------------------------------------------------------------
// SECTION 5 — What happens next?
// The three CTA tiers, docx verbatim. Targets are still placeholders: the
// sample-kit request, the web app and the expert-contact form do not exist yet.
// ---------------------------------------------------------------------------

export const bridgeNextSteps = {
  variant: "bridge" as const,
  emphasis:
    "From clinical evidence to practical implementation, you now have the essentials to decide how UroDapter could fit into your practice.",
};

export const nextSteps = {
  eyebrow: "Next steps",
  heading: "What would you like to do now?",
  intro:
    "Whether you are ready to try UroDapter, want to prepare for your first procedures, are already using it in routine practice, or would like to discuss practical questions with an experienced clinician, choose the next step that fits you best.",
  ctas: [
    {
      tier: "primary" as const,
      title: "Try UroDapter in your practice",
      body: "See how UroDapter fits into your own clinical workflow. Request a complimentary sample kit to evaluate the catheter-free approach in practice.",
      icon: iconCart,
      linkLabel: "Request a Free Sample Kit",
      href: supportHref, // TODO: sample-kit request form
      externalHref: null,
    },
    {
      tier: "neutral" as const,
      title: "Explore the UroDapter Web App",
      body: "Access step-by-step video and written guidance covering the procedure, practical tips and support for both first-time and routine use.",
      icon: iconPhone,
      linkLabel: "Open the UroDapter Web App",
      href: null,
      externalHref: appUrl,
    },
    {
      tier: "neutral" as const,
      title: "Discuss UroDapter with a clinical expert",
      body: "Have practical or clinical questions? Request contact with an experienced UroDapter clinician to discuss the procedure, patient selection, implementation or other questions relevant to your practice.",
      icon: iconChat,
      linkLabel: "Request Expert Contact",
      href: supportHref, // TODO: expert-contact form
      externalHref: null,
    },
  ],
};

// ---------------------------------------------------------------------------
// SECTION 6 — "I want more information" + the closing line.
// Rendered as ONE full-bleed band: the Support Center box and the closing
// statement, so the page does not stack two tinted bands.
// "Regulatory information" is in the chip list because the 0831 architecture
// names it as Support Center content — this page no longer carries the CE /
// FDA / ISO 13485 / patent panel (see the page plan).
// ---------------------------------------------------------------------------

export const closing = {
  heading: "Looking for detailed information?",
  body: "Explore publications, clinical evidence, technical documents, training resources, FAQs and more in the UroDapter Support Center.",
  items: [
    { label: "Publications", icon: iconDocument },
    { label: "Clinical evidence", icon: iconChartBar },
    { label: "Technical documents", icon: iconWrench },
    { label: "Training resources", icon: iconAcademicCap },
    { label: "FAQs", icon: iconQuestion },
    { label: "Regulatory information", icon: iconShieldCheck },
  ],
  linkLabel: "Visit the Support Center",
  href: supportHref,
  final: {
    heading: "A practical step toward a better bladder instillation experience",
    body: "UroDapter offers a catheter-free approach designed to improve patient comfort while fitting into everyday clinical practice. Whether you are evaluating it for the first time or already using it routinely, the resources and support are here when you need them.",
  },
};

// ---------------------------------------------------------------------------
// PARKED — "What is the UroDapter?" and "How does it work?" are HOMEPAGE
// questions in the 0831 architecture (journey Steps 2–3), so the two objects
// below are no longer rendered on /clinicians. They are kept verbatim, together
// with `components/clinicians/WhatIsIt.svelte` and `Mechanism.svelte`, so the
// homepage rebuild can reuse them. Do not link them back into a journey page
// without a docx change.
// ---------------------------------------------------------------------------

export const whatIsIt = {
  eyebrow: "The device",
  heading: "What is the UroDapter?",
  intro:
    "The UroDapter® is a small device that replaces catheter in the field of bladder instillation. Only the tip of the adapter has to be inserted into the urethral orifice to deliver the desired solution into the bladder, through the urethra.",
  spec: "It is made of medical-grade elastic polymer and has a specially designed radiused tip for easy insertion, a sealing collar for leakage-free instillation, and a ribbed grip for easy mounting.",
  // Order matters: ProductCallouts places [0] top-left, [2] top-right,
  // [1] bottom-left, [3] bottom-right — matching the client's figure.
  callouts: [
    {
      label: "Isolating Collar",
      description:
        "Ensures a watertight seal, preventing leakage during instillations.",
      icon: "",
    },
    {
      label: "Short Rounded Tip",
      description:
        "Minimizes urethral trauma by entering only 6–8 mm into the urethra.",
      icon: "",
    },
    {
      label: "Connecting Tail",
      description: "Compatible with both Luerslip and Luer-lock syringes.",
      icon: "",
    },
    {
      label: "Handling Grip",
      description: "Allows easy and precise manipulation.",
      icon: "",
    },
  ],
};

export const bridgeMechanism = {
  variant: "bridge" as const,
  lead: "Every single feature is designed for enabling a safe, painless instillation.",
  emphasis: "Let’s see how it works.",
};

// ---------------------------------------------------------------------------
// SECTION 3 — The new approach of the bladder – literally speaking
// The four step bodies are the four sentences of the docx paragraph, verbatim
// and in order; only the short step titles are editorial labels.
// ---------------------------------------------------------------------------

export const mechanism = {
  eyebrow: "Mechanism",
  heading: "The new approach of the bladder – literally speaking",
  steps: [
    {
      title: "Mount and position",
      body: "Once the UroDapter is attached to the syringe that contains the solution to instill, only the tip of the device has to enter the urethral orifice.",
      icon: iconLink,
    },
    {
      title: "Seal",
      body: "The concave sealing collar of the UroDapter creates local vacuum to prevent leakage.",
      icon: iconDroplet,
    },
    {
      title: "Open",
      body: "When the instillation begins, the liquid flows into the urethra, raising its internal pressure, which results in the opening of the sphincter muscles.",
      icon: iconArrowsOut,
    },
    {
      title: "Deliver",
      body: "Once it happens, the instilled solution enters the bladder.",
      icon: iconBladder,
    },
  ],
  video: {
    caption: "Watch this short animation to see how UroDapter works.",
    duration: "3:03",
    poster: "/Introducing%20the%20UroDapter%C2%AE.webp",
    videoId: "x10av1eP8L8" as string | null,
  },
  // blocks/clinicians/* — kept because the docx §1 says "with some practice",
  // and this is the client's own, attributed wording for that learning curve.
  learningCurve: {
    title: "On the learning curve",
    icon: iconAcademicCap,
    body: "For men, its use is easy to learn. In women, due to anatomical variations, the learning curve is a bit longer, but with the patient’s cooperation and appropriate instructions, the experience can be gained to easily deliver the drug into the bladder without loss.",
    source:
      "Dr. Marianna Nagy, Urologist, Dept of Urology, Homeland Defense Hospital, Budapest, Hungary",
  },
};

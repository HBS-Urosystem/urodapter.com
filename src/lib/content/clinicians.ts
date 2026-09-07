// Clinician journey page copy.
// Source of truth: "5_clinician_journey_precursor.docx" (client outline, incl.
// its margin comments and the client-supplied "Product Features" figure).
// Where the docx only names a section, the wording is taken verbatim from the
// client CMS (blocks/urodapter/*, blocks/clinicians/*, blocks/index/*) — the
// same provenance rule as content/home.ts. Newly written strings are limited to
// connective tissue (section intros) and are deliberately claim-free.
//
// Never strengthen a claim: keep "designed to", "may", "can be", "much less".
//
// Icon `d` strings are heroicons *outline*, single path, drawn with
// currentColor; the comment above each one names the icon.

import { resolve } from "$app/paths";
import type { ResolvedPathname } from "$app/types";

const patientsHref = resolve("/patients");
const cliniciansHref = resolve("/clinicians");
// Placeholder target until the dedicated routes exist (webshop, UroDapter App,
// publications, testimonials): everything pending points at the Support Center.
const supportHref = (resolve("/") + "#support") as ResolvedPathname;

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
// hand-raised
const iconHandRaised =
  "M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002";
// bladder outline (drawn for this site; used site-wide for IC/BPS + the bladder)
const iconBladder =
  "M7.5 4.5c0 1.5-1 2.5-2.25 3.5C3.75 9.25 3 11.25 3 13.5 3 17.64 7.03 21 12 21s9-3.36 9-7.5c0-2.25-.75-4.25-2.25-5.5C17.5 7 16.5 6 16.5 4.5M9.75 21v-2.25M14.25 21v-2.25";
// beaker
const iconBeaker =
  "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5";
// awareness ribbon (bladder cancer)
const iconRibbon =
  "M12 3c-2 2.5-3.5 5.5-3.5 8 0 1.5.5 3 1.5 4.5L6.5 21M12 3c2 2.5 3.5 5.5 3.5 8 0 1.5-.5 3-1.5 4.5l3.5 5.5M9.25 13.75 6.5 21m7.25-7.25L17.5 21";
// arrow-path (recurrent)
const iconArrowPath =
  "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99";
// bolt (urgency / overactive bladder)
const iconBolt = "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z";
// document-text
const iconDocument =
  "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z";
// chart-bar
const iconChartBar =
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z";
// academic-cap
const iconAcademicCap =
  "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342";
// sparkles
const iconSparkles =
  "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z";
// link
const iconLink =
  "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244";
// droplet
const iconDroplet =
  "M12 21a7.5 7.5 0 0 0 7.5-7.5c0-4.06-3.07-7.44-5.28-9.83A41.03 41.03 0 0 0 12 1.5s-.9.86-2.22 2.17C7.57 6.06 4.5 9.44 4.5 13.5A7.5 7.5 0 0 0 12 21Z";
// arrows-pointing-out
const iconArrowsOut =
  "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15";
// building-office-2
const iconBuilding =
  "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z";
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

// ---------------------------------------------------------------------------
// SECTION 1 — Recognition (docx §1, verbatim: sentence 1 = h1, sentence 2 = body)
// ---------------------------------------------------------------------------

export const hero = {
  headline:
    "UroDapter is designed to allow bladder instillation without catheterization, which greatly increases the patient compliance.",
  body: "With some practice, the treatment can be performed quickly, saving valuable time for the clinician.",
  image: {
    description:
      "A clinician performing a catheter-free instillation in an outpatient room — hands, syringe and UroDapter in focus, patient at ease.",
  },
};

export const bridgeWhatIsIt = {
  variant: "arrow" as const,
  emphasis:
    "Get to know this simple, sterile device that makes catheter-free bladder instillation possible.",
};

// ---------------------------------------------------------------------------
// SECTION 2 — What is the UroDapter?
// The docx leaves the body empty and the client comment asks for the technical
// figure ("the clinician cares about technical details: insertion depth, easy
// grip in a wet environment"). Callout wording is verbatim from the client's
// own "Product Features" figure embedded in the docx; the two paragraphs are
// verbatim from blocks/urodapter/details.en.md.
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
  variant: "quote" as const,
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

export const bridgeBenefits = {
  variant: "arrow" as const,
  lead: "That’s all the theory behind.",
  emphasis:
    "But the patients don’t care about theories – they feel the practice.",
};

// ---------------------------------------------------------------------------
// SECTION 4 — A small device with a lot of benefits
// Titles are the docx's three bullets, verbatim. Bodies are verbatim CMS
// sentences (blocks/urodapter/benefits.en.md, blocks/clinicians/hero.en.md);
// the third card carries the consensus citation for its claim.
// ---------------------------------------------------------------------------

export const benefits = {
  eyebrow: "Clinical benefits",
  heading: "A small device with a lot of benefits",
  items: [
    {
      title: "Painless treatment",
      body: "Performing the instillation with UroDapter® is pain-free. Only the tip of the adapter enters the urethral orifice, and the UroDapter® causes no lesions.",
      icon: iconFaceSmile,
    },
    {
      title: "Less infections, less complications",
      body: "Fewer post-treatment complications; no urethral trauma. The instillation causes much less post treatment complications.",
      icon: iconShieldCheck,
    },
    {
      title:
        "The only effective way of treating the bladder and the urethra at the same time",
      body: "A 2025 global expert review recognized catheter-free instillation using UroDapter as a clinically validated approach that treats the bladder and the urethra simultaneously.",
      source: "Buford et al., Neurourology and Urodynamics, 2025",
      icon: iconSparkles,
    },
  ],
  // docx §1 — the clinician-side benefit, restated here as a compact callout
  timeSaving: {
    title: "Quick to perform",
    icon: iconClock,
    body: "With some practice, the treatment can be performed quickly, saving valuable time for the clinician. Quick instillation; applicable in 98% of female and 100% of male patients.",
    source: "UroDapter® evaluation pack information",
  },
};

export const bridgeIndications = {
  variant: "quote" as const,
  emphasis:
    "Every clinician knows that the actual advantages of a device only manifest if it’s versatile enough for being useful in common or multiple indications.",
};

// ---------------------------------------------------------------------------
// SECTION 5 — Conditions whose treatment with UroDapter is possible
// Five conditions verbatim from the docx; the closing paragraph is verbatim and
// sits in its own box (client comment: "Ebből külön dobozt csinálnék").
// ---------------------------------------------------------------------------

export const indications = {
  eyebrow: "Indications",
  heading: "Conditions whose treatment with UroDapter is possible",
  items: [
    {
      label: "Interstitial Cystitis / Bladder Pain Syndrome",
      icon: iconHandRaised,
    },
    {
      label: "Recurrent or chronic urinary tract infections",
      icon: iconArrowPath,
    },
    {
      label:
        "Post-cancer bladder conditions (irradiation cystitis, chemotherapy-induced cystitis)",
      icon: iconBeaker,
    },
    { label: "Bladder cancer", icon: iconRibbon },
    { label: "Overactive bladder syndrome", icon: iconBolt },
  ],
  note: "In a lot of cases, the local therapy of the bladder would be more effective and convenient than oral therapy, because of higher drug concentration and the lack of systemic side effects. The pain and the complications caused by a catheter itself makes patient reluctant to have the local therapy applied. UroDapter overcomes this problem.",
  noteIcon: iconBladder,
};

export const bridgeEvidence = {
  variant: "arrow" as const,
  emphasis:
    "Any new device or new method is worth just as much as the evidence for its safety and effectiveness.",
};

// ---------------------------------------------------------------------------
// SECTION 6 — Safe and effective
// docx: "Publication list + referring to CE, FDA approval (…) mentioning that
// it's patented." Client comment: the list still has to be uploaded — the three
// publications below are the ones already cited on this site.
// Regulatory wording is verbatim from blocks/index/regulatory.en.md +
// blocks/urodapter/legal.en.md ("listed with the FDA", never "FDA approved").
// ---------------------------------------------------------------------------

export const evidence = {
  eyebrow: "Evidence & approvals",
  heading: "Safe and effective",
  intro:
    "Peer-reviewed publications, a certified quality management system and regulatory clearances stand behind the catheter-free method.",
  stats: [
    {
      highlight: "98% / 100%",
      rest: "of female and male patients were successfully treated with the catheter-free method.",
      source: "Lovász, Int J Urol, 2019 — 270 patients, 1,520 instillations",
      icon: iconCheckBadge,
    },
    {
      highlight: "3+ years",
      rest: "of long-term real-world use confirmed in follow-up study.",
      source: "Pothoven et al., Continence, 2025",
      icon: iconClock,
    },
    {
      highlight: "ISO 13485",
      rest: "The quality management system of Urosystem Zrt. has been certified by EMKI-cert Kft. in accordance with the ISO 13485 standard.",
      source:
        "Scope: design and development of non-active medical devices for urology and gynecology",
      icon: iconShieldCheck,
    },
  ],
  chart: {
    heading: "Why patients choose the catheter-free approach",
    intro:
      "In a real-world clinical study, patients were asked why they wanted to try UroDapter — and what kept them using it.",
    columns: [
      {
        title: "Reasons for trying it",
        series: "trying" as const,
        rows: [
          { label: "Urethral pain with catheter", value: 41 },
          { label: "Hope for fewer infections", value: 26 },
          { label: "Convenience", value: 26 },
          { label: "Fear of catheter", value: 2 },
        ],
      },
      {
        title: "Reasons for continuing",
        series: "continuing" as const,
        rows: [
          { label: "Less pain", value: 47 },
          { label: "Hope for fewer infections", value: 26 },
          { label: "Easier to use", value: 23 },
          { label: "Self-sustainability", value: 16 },
        ],
      },
    ],
    source:
      "Source: Pothoven et al., Continence, 2025 — 61 patients, Andros Clinics, Netherlands",
  },
  publications: {
    heading: "Selected publications",
    items: [
      {
        title:
          "Catheter-free intravesical instillation: applicability of a urethral adapter in daily practice",
        meta: "Lovász S. — International Journal of Urology, 2019 · 270 patients, 1,520 instillations",
      },
      {
        title:
          "Real-world experience with catheter-free intravesical instillation: reasons for trying and continuing",
        meta: "Pothoven et al. — Continence, 2025 · 61 patients, Andros Clinics, Netherlands",
      },
      {
        title:
          "Global Consensus on IC/BPS: An Update on Therapeutic Treatments",
        meta: "Buford et al. — Neurourology and Urodynamics, 2025 · eight specialists from the USA, Europe and India",
      },
    ],
    linkLabel: "See all publications in the Support Center",
    href: supportHref,
    icon: iconDocument,
  },
  approvals: {
    heading: "Regulatory and compliance",
    items: [
      "UroDapter® holds required CE certification and is listed with the U.S. Food and Drug Administration (FDA).",
      "The quality management system behind the device is certified to ISO 13485.",
      "Regulatory positioning, intended-use framing and legal references are available for clinical review.",
      "UroDapter®’s patent is pending. PCT international patent application number: PCT/HU2016/000063.",
    ],
    icon: iconShieldCheck,
  },
  consensus: {
    title: "International expert consensus — 2025",
    body: "A 2025 global expert review on interstitial cystitis/bladder pain syndrome (IC/BPS) treatment — authored by eight specialists from the USA, Europe, and India — recognized catheter-free instillation using UroDapter as a clinically validated approach that makes bladder instillation completely painless and treats the bladder and urethra simultaneously.",
    source:
      "Buford et al., Neurourology and Urodynamics, 2025 — Global Consensus on IC/BPS: An Update on Therapeutic Treatments",
    icon: iconGlobe,
  },
};

export const bridgeAdoption = {
  variant: "quote" as const,
  emphasis:
    "Even if something works in theory, is scientifically proven, the biggest evidence of a device is when it’s widely used.",
};

// ---------------------------------------------------------------------------
// SECTION 7 — More than 1,000,000 treatments performed
// docx bullets: iAluadapter/IBSA in Europe, "Dawa in the US, Morulaa",
// testimonials and KOLs. Client comment asks for further numbers (countries…).
// Partner detail beyond the names is pending client confirmation.
// ---------------------------------------------------------------------------

export const adoption = {
  eyebrow: "Real-world use",
  heading: "More than 1,000,000 treatments performed",
  intro:
    "The catheter-free method is in daily use in clinics and at home, on several continents, through international partners.",
  stats: [
    {
      highlight: "1,000,000+",
      rest: "Procedures performed with the UroDapter® worldwide.",
      source: "Urosystem, 2025",
      icon: iconUsers,
    },
    {
      highlight: "85 countries",
      rest: "Together with iAluRil®, the drug solution from IBSA, UroDapter® is also available under the name iAluadapter® in 85 countries.",
      source: "IBSA Group / iAluadapter®",
      icon: iconGlobe,
    },
  ],
  partners: {
    heading: "Available through international partners",
    items: [
      {
        name: "IBSA — iAluadapter®",
        detail:
          "Co-packed with iAluRil® by IBSA, under the name of iAluadapter®, it’s been available in Europe.",
        icon: iconBuilding,
      },
      { name: "Dawa", detail: "In the US.", icon: iconGlobe },
      { name: "Morulaa", detail: "Distribution partner.", icon: iconGlobe },
    ],
  },
  testimonials: {
    heading: "What professionals say about the UroDapter",
    items: [
      {
        theme: "Clinical practice",
        icon: iconChartBar,
        quote:
          "The Urodapter has had a tremendous impact in my practice on treating patients suffering from IC/BPS. It is a huge upgrade in patient comfort compared to using catheters for intravesical instillations. I would never hesitate, and I would choose the Urodapter over a conventional catheter any time for intravesical instillations.",
        author: "Dr. Kinga Karabinos",
        meta: "Dept of Urology, South-Pest Teaching Hospital, Budapest, Hungary",
      },
      {
        theme: "Efficiency",
        icon: iconClock,
        quote:
          "Perfect for quick, targeted bladder treatments — especially when repeated instillations are needed. Less discomfort, more efficiency, better experience.",
        author: "Dr. Sijo J. Parekattil",
        meta: "Avant Concierge Urology, Winter Garden, Florida, USA",
      },
      {
        theme: "Gynecology",
        icon: iconBeaker,
        quote:
          "With the UroDapter®, complaints can be treated very simply and immediately without catheterization, both diagnostically and therapeutically for urological origins.",
        author: "Dr. Zoltán Kovács",
        meta: "Gynecologist, Neural Therapy Expert, Private Practitioner, Budapest, Hungary",
      },
      {
        theme: "Patient advocacy",
        icon: iconHandRaised,
        quote:
          "This new device is a most welcome addition to traditional instillation equipment, particularly for patients with pain in the urethra, since this is very difficult to treat effectively when using a catheter for instillation. Catheter-related trauma causing burning pain in the urethra and neck of the bladder following instillation is also reduced to a minimum with this adapter.",
        author: "Jane Meijlink",
        meta: "International Painful Bladder Foundation, The Netherlands",
      },
    ],
    disclaimer:
      "Testimonials reflect the personal experience of individual clinicians.",
    more: {
      heading: "Want to read more clinician experiences?",
      body: "Testimonials and key opinion leader statements are collected in the Support Center.",
      linkLabel: "Read all clinician testimonials",
      href: supportHref,
    },
  },
};

export const bridgeNextSteps = {
  variant: "arrow" as const,
  lead: "Now you know what UroDapter is.",
  emphasis:
    "It’s your choice how to go further – we’re here to help you to take the next step.",
};

// ---------------------------------------------------------------------------
// SECTION 8 — the three CTA tiers (docx, verbatim).
// The heading is adopted from the approved patient docx ("What would you like
// to do now?") — the clinician docx names the tiers but no section heading.
// The secondary tier carries TWO buttons per the docx; the client comment wants
// them to become share/e-mail forms (one inviting patients, one inviting
// colleagues or management) once those forms exist.
// ---------------------------------------------------------------------------

export const nextSteps = {
  eyebrow: "Next steps",
  heading: "What would you like to do now?",
  ctas: [
    {
      tier: "primary" as const,
      title: "I’m ready to get UroDapter",
      body: "If UroDapter is available in your country, you can order it directly through our webshop.",
      icon: iconCart,
      links: [{ label: "Order UroDapter", href: supportHref }], // TODO: webshop URL
    },
    {
      tier: "neutral" as const,
      title: "I’d like to talk about it",
      body: "Whether it’s your patients, your colleagues or the management of your institution you want to discuss the topic further, feel free to show them what you learnt.",
      icon: iconChat,
      // TODO: replace with the two share/e-mail forms the client asked for
      links: [
        { label: "For patients", href: patientsHref },
        { label: "For clinicians", href: cliniciansHref },
      ],
    },
    {
      tier: "neutral" as const,
      title: "I’m already using UroDapter",
      body: "Access the UroDapter App for step-by-step guidance, treatment resources and useful tips.",
      icon: iconPhone,
      links: [{ label: "Open the UroDapter App", href: supportHref }], // TODO: app URL
    },
  ],
};

// ---------------------------------------------------------------------------
// Closing band — the last docx bridge and the "Dive deep" box are rendered as
// one closing band, so the page ends on a band instead of stacking a bridge
// directly on top of one.
// ---------------------------------------------------------------------------

export const closing = {
  lead: "We know it may sound too easy... and you may have so many questions.",
  heading: "Looking for more information?",
  body: "The UroDapter Support Center brings together everything you need in one place.",
  items: [
    { label: "Publications", icon: iconDocument },
    { label: "Clinical evidence", icon: iconChartBar },
    { label: "Videos & training", icon: iconPlay },
    { label: "Instructions for use", icon: iconAcademicCap },
    { label: "Technical information", icon: iconWrench },
  ],
  linkLabel: "Visit the Support Center",
  href: supportHref,
};

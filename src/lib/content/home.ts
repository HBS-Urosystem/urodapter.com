// Home page copy.
// Source of truth: "0831/3. page_content.docx" (client-approved homepage copy)
// + "0831/2. website architecture.docx". Where the 0831 docx keeps wording that
// already existed, the earlier provenance still holds: the client CMS at
// urosystem.kit1/cms/blocks/** (the block file is named above each object).
//
// The homepage answers journey Steps 1-3 for BOTH personas — "What is
// UroDapter?", "Why should I care?", "Can I trust it?", "Where do I go next?" —
// and hands over to the journey pages. Keep it simple; the depth lives on the
// journey pages and in the Support Center.
//
// Never strengthen a claim: keep "may", "designed to", "can be", "many
// patients". Where the docx offers alternatives ("1 Million+ Uses / 1 Million+
// Procedures"), the choice is noted in a comment.
//
// Icon `d` strings are heroicons *outline*, single path, drawn with
// currentColor; the comment above each one names the icon.

import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';

const patientsHref = resolve('/patients');
const cliniciansHref = resolve('/clinicians');
const partnersHref = resolve('/partners');
// The Support Center section at the foot of this page, until a dedicated
// resources route exists.
const supportHref = (resolve('/') + '#support') as ResolvedPathname;
const homeHref = resolve('/');

// ---------------------------------------------------------------------------
// Icons reused across several sections
// ---------------------------------------------------------------------------

// users
const iconUsers =
	'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z';
// globe-alt
const iconGlobe =
	'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418';
// shield-check
const iconShieldCheck =
	'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z';
// check-badge
const iconCheckBadge =
	'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z';
// heart
const iconHeart =
	'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z';
// face-smile
const iconFaceSmile =
	'M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z';
// clock
const iconClock = 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';
// hand-raised
const iconHandRaised =
	'M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002';
// beaker
const iconBeaker =
	'M7.5 4.5c0 1.5-1 2.5-2.25 3.5C3.75 9.25 3 11.25 3 13.5 3 17.64 7.03 21 12 21s9-3.36 9-7.5c0-2.25-.75-4.25-2.25-5.5C17.5 7 16.5 6 16.5 4.5M9.75 21v-2.25M14.25 21v-2.25';
// document-text
const iconDocument =
	'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z';
// briefcase
const iconBriefcase =
	'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z';
// chart-bar
const iconChartBar =
	'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z';
// academic-cap
const iconAcademicCap =
	'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342';
// sparkles
const iconSparkles =
	'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z';
// book-open
const iconBookOpen =
	'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';

// plus-circle
const iconPlusCircle = 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';

// ---------------------------------------------------------------------------
// HERO — owner-approved mockup copy (design canvas "UroDapter Hero", owner
// direction 2026-09-27; docs/home-hero-redesign/plan.md D1–D8). It replaces the
// docx-verbatim hero wording: the headline, subheadline, CTAs, product chip,
// audience cards and the header's "Contact us" are mockup copy, not docx copy.
// The docx's two "why heroes care" problem lines are unchanged — they moved to
// the first bridge (`bridgeHowItWorks`). The regulatory line is kept (D8).
// ---------------------------------------------------------------------------

// "See how it works" lands on the How It Works heading, past the bridge band.
const howItWorksHref = (resolve('/') + '#how-it-works') as ResolvedPathname;

export const hero = {
	// U+2011 non-breaking hyphen: the headline must never break after "Catheter-".
	headline: 'Catheter‑free bladder instillation',
	body: 'A simple way to perform bladder instillations without catheterization.',
	regulatoryPill: {
		label: 'CE marked · FDA listed · ISO 13485 certified QMS',
		// Narrow screens: the pill has to stay on one line.
		labelShort: 'CE marked · FDA listed · ISO 13485',
		icon: iconShieldCheck,
	},
	primaryCta: { label: 'See how it works', href: howItWorksHref },
	// TODO(placeholder): contact route — pending links resolve to #support until it exists
	secondaryCta: { label: 'Talk to our team', href: supportHref },
	product: {
		title: 'Sterile, single-use syringe adapter',
		// Owner wording 2026-09-27: "standard Luer syringe" (D12).
		body: 'Connects to a standard Luer syringe and creates a temporary seal during treatment.',
		alt: 'UroDapter catheter-free bladder instillation device',
	},
	// Shown above the audience cards only while they sit under the photo
	// (single column); from md they overlap the photo and need no label.
	choosePathLabel: 'Choose your path',
};

// The credibility strip. docx "Credibility — short, peak infos"; every item
// carries a sub-line, so no claim stands without a figure or a next step
// (owner direction 2026-09-27).
export const heroTrustStats: {
	title: string;
	sub?: string;
	link?: { label: string; externalHref: string };
	icon: string;
	emphasis?: boolean;
}[] = [
	// docx: "1 Million+ Uses / 1 Million+ Procedures" → Procedures, in the
	// numeral style the rest of the site already uses.
	{ title: '1,000,000+', sub: 'procedures worldwide', icon: iconUsers, emphasis: true },
	{
		title: 'Scientifically validated',
		// The three journals the site already cites: Int J Urol (Lovász, 2019),
		// Continence (Pothoven et al., 2025), Neurourol Urodyn (Buford et al., 2025).
		sub: 'Peer-reviewed in 3 journals',
		// microscope: eyepiece + body tube, arm curving down to the base,
		// stage slide, and the bench line it stands on
		icon: 'M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2ZM9 14h2M14 22a7 7 0 1 0 0-14h-1M6 18h8M3 22h18',
	},
	// docx: "Available Internationally / Used in XY Countries" → the wording
	// without a figure. The country count is an open client item: 30+, 50+ and
	// 85 are all in circulation (see home-page-plan.md). The webshop — a live
	// off-site destination — stands in as the next step until one is settled.
	{
		title: 'Available internationally',
		link: { label: 'Visit our webshop', externalHref: 'https://www.urosystem.com/shop' },
		icon: iconGlobe,
	},
	// docx: "FDA Registered (?) / CE Marked / MDR". The client's own question
	// mark is answered by the approved CMS wording: the device is *listed* with
	// the FDA, never "FDA approved" or "FDA registered".
	{ title: 'CE marked & FDA listed', sub: 'ISO 13485 certified QMS', icon: iconShieldCheck },
];

// blocks/index/regulatory.en.md + blocks/company/quality.en.md — the one line
// that keeps the regulatory facts on the site now that the journey pages point
// at the Support Center for them. Kept unchanged under the strip (D8).
export const heroRegulatory =
	'UroDapter® holds required CE certification and is listed with the U.S. Food and Drug Administration (FDA). The quality management system behind it is certified to ISO 13485.';

// docx: "1-1 testimonials – should be put to different place than the rest of
// the list", i.e. away from the credibility strip. They rotate in a glass panel
// on the hero photo (owner direction 2026-09-27, D3). `seconds` is the dwell —
// presentation, like AutoAccordion's — sized to each quote's reading time.
export const quotes = {
	// Region label for screen readers.
	label: 'Testimonials',
	items: [
		{
			quote:
				'I now have confidence, less apprehension, more predictability, and an overall better quality of life.',
			author: 'Hannah, 27 · IC/BPS patient',
			seconds: 7,
		},
		{
			quote:
				'Perfect for quick, targeted bladder treatments — especially when repeated instillations are needed. Less discomfort, more efficiency, better experience.',
			author: 'Dr. Parekattil, Avant Concierge Urology',
			subAuthor: 'Winter Garden, Florida, USA',
			seconds: 9,
		},
	],
};

// The two audience cards on the hero photo — owner-approved mockup copy
// (2026-09-27, D5). The whole card is the link. The docx problem sentences
// that used to open these cards now lead the first bridge (D6).
export const heroAudienceCards = [
	{
		id: 'patients',
		accentClass: 'accent-patient',
		icon: iconHeart,
		eyebrow: 'I’m a patient',
		title: 'A better experience for patients',
		items: ['Catheter-free treatment', 'Greater comfort', 'Less anxiety'],
		// Owner direction 2026-09-29 (was "What to expect"): the label names the
		// patient page's first section, as the clinician card's names its own.
		linkLabel: 'Patient benefits',
		href: patientsHref,
	},
	{
		id: 'clinicians',
		accentClass: 'accent-clinician',
		icon: iconPlusCircle,
		eyebrow: 'I’m a clinician',
		title: 'A practical solution for clinicians',
		// Owner wording 2026-09-27: "patient compliance" (D13) and "Fewer …" (D6).
		items: [
			'Better patient compliance',
			'Fewer catheter-related complications',
			'Simple integration into practice',
		],
		linkLabel: 'Clinical use & evidence',
		href: cliniciansHref,
	},
];

// ---------------------------------------------------------------------------
// SECTION 2 — How It Works (docx: "[Title written out]")
// The intro, the detail's middle sentence and the "Luer" wording are owner
// wording (2026-09-27, D9–D12); the rest is docx-verbatim. The product diagram
// reuses the patient-facing callout labels approved for the patient journey
// page — the personas doc is explicit that patients are not looking for
// technical specifications.
// ---------------------------------------------------------------------------

export const bridgeHowItWorks = {
	variant: 'bridge' as const,
	// The two docx "why heroes care" lines, moved here from the key-benefit cards
	// (owner direction 2026-09-27, D6): the audience problems, then the idea that
	// answers them.
	problems: [
		{
			id: 'patients',
			label: 'For patients',
			accentClass: 'accent-patient',
			icon: iconHeart,
			// docx "Why Heroes Care / Why it matters" — patients.
			text: 'Repeated bladder treatments can be stressful, uncomfortable and emotionally exhausting.',
		},
		{
			id: 'clinicians',
			label: 'For clinicians',
			accentClass: 'accent-clinician',
			icon: iconPlusCircle,
			// docx "Why Heroes Care / Why it matters" — clinicians. Minimally
			// corrected: "is associated with complications, procedural burden and
			// creates discomfort" mixed two constructions.
			text: 'Catheterization for bladder instillations is associated with complications and procedural burden, and creates discomfort for patients.',
		},
	],
	// docx's own "[Main headline/introductory explanation]" line — unchanged.
	emphasis: 'A simple idea can make a remarkable difference.',
};

export const howItWorks = {
	heading: 'How It Works',
	// Owner wording 2026-09-27 (D9), grammar-corrected. Replaces the two-sentence
	// docx intro — its "may … for many patients" hedge is flagged to the client
	// (home-page-plan.md, open items).
	intro:
		'UroDapter is a sterile, single-use syringe adapter that enables medication to be delivered into the bladder without catheter insertion, making treatment more comfortable for both male and female patients.',
	// docx-verbatim except the middle sentence (owner wording 2026-09-27, D10)
	// and "standard Luer syringe" (D12).
	detail:
		'UroDapter is placed at the urethral opening, where it forms a temporary, watertight seal while only the short rounded tip is inserted. During instillation, only the medication passes gently through the urethra into the bladder. The procedure uses a standard Luer syringe and integrates easily into existing bladder instillation routines.',
	// Patient-facing labels (approved for the patient journey page); the leader
	// lines carry the label→device association, so no icons here. They now
	// differ from the patient page in one label: "standard Luer syringe" (owner
	// wording 2026-09-27, D12) — the patient page still says "standard syringe".
	callouts: [
		{ label: 'Creates a temporary seal during treatment', icon: '' },
		{ label: 'Only the short, rounded tip enters the urethra', icon: '' },
		{ label: 'Connects to a standard Luer syringe', icon: '' },
		{ label: 'Designed to be gentle and comfortable', icon: '' },
	],
	video: {
		// docx-verbatim; on the home page it sits above the video as its lead-in (D11).
		caption: 'Watch this short animation to see how UroDapter works.',
		duration: '0:30',
		// Client asset: Urodapter_anim_30sec_EN_230309.mp4, re-encoded for the
		// web and self-hosted from /static (no third-party embed).
		poster: '/urodapter-animation-poster.webp',
		// The poster's burned-in "Introducing UroDapter." bar: rows 637–720 of
		// 720 (measured). The duration pill centres in it. Re-measure if the
		// poster is re-exported.
		posterBar: 83 / 720,
		sources: {
			webm: '/urodapter-animation.webm',
			mp4: '/urodapter-animation.mp4',
		},
	},
};

// ---------------------------------------------------------------------------
// SECTION 3 — Choose Your Journey + the Support Center shortcut.
// docx card copy verbatim, except the clinician card's "patient compliance"
// (owner wording 2026-09-27, D13). The hrefs are the real routes — they used to
// be on-page anchors (#patients …) that no longer exist.
// ---------------------------------------------------------------------------

export const bridgeJourney = {
	variant: 'arrow' as const,
	// Owner direction 2026-09-27 (D14): the bridge carries the section name; the
	// visible h2 above the cards goes (it stays in the DOM as sr-only).
	emphasis: 'Choose Your Journey',
};

export const journey = {
	// Rendered as the section's sr-only h2 (D14).
	heading: 'Choose Your Journey',
	cards: [
		{
			id: 'patient',
			title: 'I’m a Patient',
			copy: 'Learn how catheter-free bladder instillation may improve your treatment experience.',
			href: patientsHref,
		},
		{
			id: 'clinician',
			title: 'I’m a Clinician',
			copy: 'See how UroDapter can improve patient compliance while fitting into your clinical workflow.',
			href: cliniciansHref,
		},
		{
			id: 'distributor',
			title: 'I’m a Distributor',
			copy: 'Explore partnership and distribution opportunities in your market.',
			href: partnersHref,
		},
	],
	// docx offers two lead-ins for the Support Center shortcut; both are used —
	// one as the heading, one as the body.
	support: {
		heading: 'Already using UroDapter?',
		body: 'Looking for publications, FAQs, videos, training or technical resources?',
		linkLabel: 'Visit Support Center',
		href: supportHref,
	},
};

// ===========================================================================
// PARKED — the pre-0831 home page (six sections below the hero). The 0831
// homepage docx replaces all of it: the persona lanes became the "Choose Your
// Journey" cards, the proof row became the hero credibility strip, and the
// voices grid became the two hero testimonials. Kept verbatim, together with
// components/home/{WhatItIs,ProofStats,PersonaSection,Voices}.svelte, because
// the copy below is client-CMS-approved and the Support Center page will need
// much of it. Nothing here is rendered.
// ===========================================================================

// ---------------------------------------------------------------------------
// SECTION 1 — what UroDapter is / how it works
// Source: blocks/urodapter/details.en.md, blocks/urodapter/details_hero.en.md,
// blocks/instructions/general.en.md, blocks/index/indications.en.md
// ---------------------------------------------------------------------------

export const whatItIs = {
	eyebrow: 'How it works',
	heading: 'A urological syringe adapter which completely replaces the catheter',
	intro:
		'The UroDapter® is a small device that replaces catheter in the field of bladder instillation. Only the tip of the adapter has to be inserted into the urethral orifice to deliver the desired solution into the bladder, through the urethra.',
	spec: 'It is made of medical-grade elastic polymer and has a specially designed radiused tip for easy insertion, a sealing collar for leakage-free instillation, and a ribbed grip for easy mounting.',
	// ProductCallouts uses the labels only — the leader lines carry the association
	callouts: [
		{ label: 'Radiused tip for easy insertion', icon: '' },
		{ label: 'Sealing collar for leakage-free instillation', icon: '' },
		{ label: 'Ribbed grip for easy mounting', icon: '' },
		{ label: 'Made of medical-grade elastic polymer', icon: '' },
	],
	quickBenefits: [
		{ label: 'Pain-free insertion', icon: iconFaceSmile },
		{
			label: 'Simultaneous treatment of bladder and urethra',
			icon: iconSparkles,
		},
		{
			label: 'Low risk of complications and infections',
			icon: iconShieldCheck,
		},
		{
			label: 'Suitable for a range of urological conditions',
			icon: iconCheckBadge,
		},
	],
	linkLabel: 'See the full patient journey',
	href: patientsHref,
	image: {
		description: 'Close-up of the UroDapter® mounted on a standard syringe, held in a gloved hand.',
	},
	indications: {
		text: 'Any solution can be instilled with UroDapter® into the bladder assuming it has no adverse effect on the nearby tissues or organs. The device can be applied in the therapy of the following conditions — and for diagnostic purposes such as retrograde urethrography.',
		items: [
			{ label: 'IC / Bladder Pain Syndrome', icon: iconHandRaised },
			{ label: 'Recurring UTIs', icon: iconShieldCheck },
			{ label: 'Post-cancer cystitis', icon: iconBeaker },
			{ label: 'Diagnostic use', icon: iconDocument },
		],
	},
};

// ---------------------------------------------------------------------------
// SECTION 2 — proof in numbers
// Source: blocks/index/credibility.en.md, blocks/index/eval-pack-ud.en.md,
// blocks/index/refs.en.md, blocks/company/quality.en.md
// ---------------------------------------------------------------------------

export const bridgeProof = {
	variant: 'arrow' as const,
	lead: 'A small device, used in clinics and at home around the world.',
	emphasis: 'Here is what that adds up to.',
};

export const proof = {
	eyebrow: 'The numbers',
	heading: 'Scientifically validated, globally certified',
	intro:
		'Peer-reviewed clinical evidence, a certified quality management system, and more than a million procedures behind it.',
	stats: [
		{
			highlight: '1,000,000+',
			rest: 'Procedures performed with the UroDapter® worldwide.',
			source: 'Urosystem, 2025',
			icon: iconUsers,
		},
		{
			highlight: '98% / 100%',
			rest: 'Quick instillation; applicable in 98% of female and 100% of male patients.',
			source: 'UroDapter® evaluation pack information',
			icon: iconCheckBadge,
		},
		{
			highlight: '85 countries',
			rest: 'Together with iAluRil®, the drug solution from IBSA, UroDapter® is also available under the name iAluadapter® in 85 countries.',
			source: 'IBSA Group / iAluadapter®',
			icon: iconGlobe,
		},
		{
			highlight: 'ISO 13485',
			rest: 'The quality management system of Urosystem Zrt. has been certified by EMKI-cert Kft. in accordance with the ISO 13485 standard.',
			source:
				'Scope: design and development of non-active medical devices for urology and gynecology',
			icon: iconShieldCheck,
		},
	],
};

// ---------------------------------------------------------------------------
// SECTION 3 — for patients
// Source: blocks/patients/hero.en.md, blocks/index/key-benefits.en.md,
// blocks/urodapter/benefits.en.md, blocks/index/testimonials.en.md
// ---------------------------------------------------------------------------

export const bridgePatients = {
	variant: 'bridge' as const,
	lead: 'Repeated bladder treatments can be stressful, uncomfortable and emotionally exhausting.',
	emphasis: 'A more comfortable experience may be possible.',
};

export const patients = {
	id: 'patients',
	accentClass: 'accent-patient',
	eyebrow: 'For patients',
	heading: 'A more comfortable bladder instillation experience may be possible',
	intro:
		'Catheterization for bladder instillations brings complications, procedural burden and discomfort for patients. The UroDapter® is preferred by the patients to catheters.',
	benefits: [
		{
			title: 'Pain-free instillation',
			body: 'Performing the instillation with UroDapter® is pain-free.',
			icon: iconFaceSmile,
		},
		{
			title: 'No lesions',
			body: 'Only the tip of the adapter enters the urethral orifice, and the UroDapter® causes no lesions.',
			icon: iconHeart,
		},
		{
			title: 'Fewer complications afterwards',
			body: 'The instillation causes much less post treatment complications.',
			icon: iconShieldCheck,
		},
	],
	testimonial: {
		theme: 'Quality of life',
		icon: iconSparkles,
		quote:
			'I found UroDapter®, asked my doctor to use it, and it became a game changer. Since incorporating it into my weekly instillations, I am getting better and my quality of life has improved in ways I never thought possible.',
		author: 'Kathy P.',
		meta: 'Female IC/BPS patient, USA, 2025',
		linkLabel: 'Read patient stories',
		href: patientsHref,
	},
	cta: { label: 'Explore the patient journey', href: patientsHref },
};

// ---------------------------------------------------------------------------
// SECTION 4 — for clinicians
// Source: blocks/clinicians/hero.en.md, blocks/index/eval-pack-ud.en.md,
// blocks/index/testimonials.en.md
// ---------------------------------------------------------------------------

export const bridgeClinicians = {
	variant: 'arrow' as const,
	lead: 'The same procedure, seen from the other side of the treatment room.',
	emphasis: 'What it changes in clinical practice.',
};

export const clinicians = {
	id: 'clinicians',
	accentClass: 'accent-clinician',
	eyebrow: 'For clinicians',
	heading:
		'Improve the catheter-free bladder instillation experience without major workflow changes',
	intro:
		'UroDapter® allows catheter-free bladder instillation and has been used in more than 1,000,000 procedures worldwide by world-leading experts.',
	benefits: [
		{
			title: 'Pain-free insertion',
			body: 'Pain-free insertion and simultaneous bladder and urethra treatment.',
			icon: iconHandRaised,
		},
		{
			title: 'Fewer post-treatment complications',
			body: 'Fewer post-treatment complications; no urethral trauma.',
			icon: iconShieldCheck,
		},
		{
			title: 'Quick instillation',
			body: 'Quick instillation; applicable in 98% of female and 100% of male patients.',
			icon: iconClock,
		},
	],
	callout: {
		title: 'On the learning curve',
		icon: iconAcademicCap,
		body: 'For men, its use is easy to learn. In women, due to anatomical variations, the learning curve is a bit longer, but with the patient’s cooperation and appropriate instructions, the experience can be gained to easily deliver the drug into the bladder without loss.',
		source:
			'Dr. Marianna Nagy, Urologist, Dept of Urology, Homeland Defense Hospital, Budapest, Hungary',
	},
	testimonial: {
		theme: 'Clinical practice',
		icon: iconChartBar,
		quote:
			'UroDapter® has had a tremendous impact in my practice treating patients with Bladder Pain Syndrome. It is a huge upgrade in patient comfort compared with catheters for intravesical instillations.',
		author: 'Dr. Kinga Karabinos',
		meta: 'Urologist, South-Pest Teaching Hospital, Budapest, Hungary',
		linkLabel: 'Read clinician testimonials',
		href: cliniciansHref,
	},
	cta: { label: 'Request a 10-piece evaluation pack', href: cliniciansHref },
};

// ---------------------------------------------------------------------------
// SECTION 5 — for distributors
// Source: blocks/partners/hero.en.md, blocks/distributors/product.en.md,
// blocks/index/refs.en.md, blocks/index/testimonials.en.md
// ---------------------------------------------------------------------------

export const bridgeDistributors = {
	variant: 'bridge' as const,
	lead: 'Catheter-free instillation is already reaching patients across dozens of markets.',
	emphasis: 'There may be room for it in yours.',
};

export const distributors = {
	id: 'distributors',
	accentClass: 'accent-distributor',
	eyebrow: 'For distributors',
	heading: 'Bring catheter-free bladder instillation to your market',
	intro:
		'UroDapter® is CE-marked, FDA-registered and used in 1,000,000+ procedures — a differentiated addition to your urology portfolio.',
	benefits: [
		{
			title: 'Product Value',
			body: 'UroDapter® addresses pain and complication concerns around catheter-based intravesical workflows with a differentiated proposition.',
			icon: iconBriefcase,
		},
		{
			title: 'Clinical-Commercial Proof',
			body: 'Validated clinician and patient feedback supports a compelling value narrative for distributor decision-makers.',
			icon: iconChartBar,
		},
		{
			title: 'Regulatory Readiness',
			body: 'CE and FDA listing context, intended-use framing, and supporting compliance references for responsible commercialization.',
			icon: iconDocument,
		},
	],
	callout: {
		title: 'Already carried by an international partner',
		icon: iconGlobe,
		body: 'Together with iAluRil®, the drug solution from IBSA, UroDapter® is also available under the name iAluadapter® in 85 countries.',
		source: 'IBSA Group',
	},
	testimonial: {
		theme: 'Demand from practices',
		icon: iconUsers,
		quote:
			'Ease of use, no discomfort and so much quicker instillation than via catheter. I wish you would make it easier for physicians’ offices to order from you directly.',
		author: 'Customer feedback',
		meta: 'USA, 2024',
		linkLabel: 'See partnership options',
		href: partnersHref,
	},
	cta: { label: 'Explore partnership', href: partnersHref },
	image: {
		description:
			'UroDapter® retail packaging and the 10-piece evaluation pack, shot flat on a neutral background.',
	},
};

// ---------------------------------------------------------------------------
// SECTION 6 — voices, regulatory highlights, Support Center
// Source: blocks/index/testimonials.en.md, blocks/index/regulatory.en.md,
// blocks/urodapter/legal.en.md
// ---------------------------------------------------------------------------

export const bridgeVoices = {
	variant: 'arrow' as const,
	lead: 'Numbers describe the device.',
	emphasis: 'These are the people who use it.',
};

export const voices = {
	eyebrow: 'In their words',
	heading: 'UroDapter Success Stories',
	intro:
		'Clinicians and patients describing what changed when the catheter came out of the procedure.',
	testimonials: [
		{
			accentClass: 'accent-patient',
			theme: 'Patient · self-treatment',
			icon: iconHeart,
			quote:
				'I use the UroDapter® for self-treatment at home with intravesical medication. With UroDapter®, I experience no pain during treatments, unlike when I used catheters.',
			author: 'Piotr K.',
			meta: '37y male IC/BPS patient, Poland, 2023',
			linkLabel: 'Read patient stories',
			href: patientsHref,
		},
		{
			accentClass: 'accent-clinician',
			theme: 'Clinician · design',
			icon: iconSparkles,
			quote:
				'The design and functionality are incredibly well-engineered and make medication instillation more straightforward and more comfortable for my patients.',
			author: 'Dr. Sijo J. Parekattil',
			meta: 'Urologist and Medical Director, Avant Concierge Urology, Winter Garden, Florida, USA',
			linkLabel: 'Read clinician testimonials',
			href: cliniciansHref,
		},
		{
			accentClass: 'accent-patient',
			theme: 'Patient · long-term use',
			icon: iconClock,
			quote:
				'Using the UroDapter® does not cause me mental distress, pain, or urethral injury, and it has not caused any infection or complications in 1.5 years.',
			author: 'Reka S. D.',
			meta: 'Female IC/BPS patient, Hungary, 2023',
			linkLabel: 'Read patient stories',
			href: patientsHref,
		},
		{
			accentClass: 'accent-clinician',
			theme: 'Clinician · gynecology',
			icon: iconBeaker,
			quote:
				'With the UroDapter®, complaints can be treated very simply and immediately without catheterization, both diagnostically and therapeutically for urological origins.',
			author: 'Dr. Zoltán Kovács',
			meta: 'Gynecologist, Neural Therapy Expert, Private Practitioner, Budapest, Hungary',
			linkLabel: 'Read clinician testimonials',
			href: cliniciansHref,
		},
	],
	regulatory: {
		heading: 'Regulatory and Compliance Highlights',
		items: [
			'UroDapter® holds required CE certification and is listed with the U.S. Food and Drug Administration (FDA).',
			'Regulatory positioning, intended-use framing, and legal references are available for partner and clinical review.',
			'Compliance documentation and implementation support can be shared during distributor or clinical onboarding.',
			'UroDapter®’s patent is pending. PCT international patent application number: PCT/HU2016/000063.',
		],
		icon: iconDocument,
	},
	support: {
		id: 'support',
		heading: 'Support Center',
		body: 'Publications, FAQs, videos, training and technical resources are being brought together here. In the meantime, start from the journey that fits you.',
		links: [
			{ label: 'For patients', href: patientsHref },
			{ label: 'For clinicians', href: cliniciansHref },
			{ label: 'For distributors', href: partnersHref },
		],
		icon: iconBookOpen,
	},
};

// ---------------------------------------------------------------------------
// Stub audience page (/partners) — placeholder until the distributor journey
// ships. /clinicians is now a real journey (src/lib/content/clinicians.ts).
// Source: blocks/partners/hero.en.md, blocks/cta/partner.en.md
// ---------------------------------------------------------------------------

export const partnerPage = {
	accentClass: 'accent-distributor',
	heading: distributors.heading,
	body: distributors.intro,
	roadmap: {
		heading: 'Partnership detail is on the way',
		body: 'This page is being built around commercial enablement. Coming soon:',
		items: [
			{ label: 'Product-commercial enablement', icon: iconBriefcase },
			{ label: 'Clinical-commercial proof', icon: iconChartBar },
			{ label: 'Regulatory readiness', icon: iconDocument },
			{ label: 'Territory and volume planning', icon: iconGlobe },
			{ label: 'Launch and onboarding support', icon: iconAcademicCap },
		],
	},
	cta: {
		heading: 'A special invitation to our B2B partners',
		body: 'License, build OEM relationships, or form a multi-country corporate alliance with UroSystem.',
		linkLabel: 'Back to the overview',
		// The homepage's `#distributors` section is gone (0831 rebuild), so this
		// goes to the homepage itself rather than a dead anchor.
		href: homeHref,
	},
};

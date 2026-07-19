// Patient journey page copy. Source of truth: "4. patient journey page.docx"
// (client-approved wording — edit only against an updated docx).
// Keep the regulatory hedging intact: "may", "designed to", "many patients".

import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';

// Placeholder target until dedicated pages/URLs exist (story pages, webshop,
// discussion guide, app) — every pending link points at the Support Center.
const supportHref = (resolve('/') + '#support') as ResolvedPathname;

export const hero = {
	headline: 'A more comfortable bladder instillation experience may be possible.',
	body: 'UroDapter is designed to allow bladder instillation without catheterization, helping patients avoid one of the most uncomfortable parts of treatment.',
};

export const bridgeHowItWorks = {
	variant: 'arrow' as const,
	lead: 'A simple idea can make a remarkable difference.',
	emphasis: 'Here’s how UroDapter delivers bladder instillation without using a catheter.',
};

export const howItWorks = {
	heading: 'A simple, catheter-free approach',
	intro:
		'UroDapter is a small syringe adapter that allows medication to be delivered into the bladder without inserting a catheter. It offers a simple, catheter-free approach that may make treatment more comfortable for many patients.',
	// One docx paragraph, split for the mood-board layout: bold lead + body
	lead: 'UroDapter is gently placed at the urinary opening, where it forms a temporary, watertight seal.',
	leadBody:
		'Medication can then be delivered into the bladder through the adapter – without passing a catheter through the urethra.',
	// Patient-centered labels (docx replaces the clinical "Product Features" wording)
	callouts: [
		{
			label: 'Creates a temporary seal during treatment',
			icon: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
		},
		{
			label: 'Only the short, rounded tip enters the urethra',
			// droplet
			icon: 'M12 21a7.5 7.5 0 0 0 7.5-7.5c0-4.06-3.07-7.44-5.28-9.83A41.03 41.03 0 0 0 12 1.5s-.9.86-2.22 2.17C7.57 6.06 4.5 9.44 4.5 13.5A7.5 7.5 0 0 0 12 21Z',
		},
		{
			label: 'Connects to a standard syringe',
			icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
		},
		{
			label: 'Designed to be gentle and comfortable',
			icon: 'M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244',
		},
	],
	// Quick at-a-glance benefits below the product card (from "Section 2 mood.png")
	quickBenefits: [
		{
			label: 'Catheter-free installation',
			// check-badge
			icon: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z',
		},
		{
			label: 'Designed for comfort',
			// face-smile
			icon: 'M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z',
		},
		{
			label: 'Minimizes risk of trauma & infections',
			// hand-raised (protection)
			icon: 'M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002',
		},
		{
			label: 'Quick and easy to use',
			// clock
			icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
		},
	],
	video: {
		caption: 'Watch this short animation to see how UroDapter works.',
		duration: '3:03',
		// Poster served from /static (spaces + ® URL-encoded).
		poster: '/Introducing%20the%20UroDapter%C2%AE.webp',
		// Full "how UroDapter works" animation. Swap this id for a shorter cut if
		// one is produced; the facade click-loads youtube-nocookie.com/embed/<id>.
		videoId: 'x10av1eP8L8' as string | null,
	},
	supportCard: {
		heading: 'Would you like to learn more about how UroDapter works?',
		body: 'Visit the Support Center for detailed explanations, videos and additional educational resources.',
		linkLabel: 'Go to Support Center',
		href: supportHref,
	},
};

export const bridgeStories = {
	variant: 'arrow' as const,
	lead: 'The benefits of catheter-free treatment are important.',
	emphasis:
		'But nothing explains the difference better than the experiences of people who have used UroDapter themselves.',
};

export const stories = {
	eyebrow: 'Patient experiences',
	heading: 'Stories from patients like you',
	intro:
		'Every patient’s journey is different. Here are some of the experiences shared by people who have used UroDapter.',
	// Theme labels visually rhyme with the Section 3 benefit cards (docx note)
	testimonials: [
		{
			theme: 'Life-changing',
			// heart
			icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
			quote: 'This tiny adapter has been a game changer in my treatment',
			author: 'Kathy',
			meta: 'Female IC/BPS patient, USA',
			linkLabel: 'Read Kathy’s story',
			href: supportHref,
		},
		{
			theme: 'Long-term comfort',
			// calendar-days
			icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',
			quote:
				'I’ve been using UroDapters for the last two years, and they’ve made a huge difference. They’re not painful, easy to learn how to use, and I absolutely love them!',
			author: 'Sue',
			meta: 'Female chronic UTI patient, USA',
			linkLabel: 'Read Sue’s story',
			href: supportHref,
		},
		{
			theme: 'Confidence during treatment',
			// shield-check
			icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
			quote:
				'Using the UroDapter does not cause me mental distress or pain, and it has never caused any infection or complications in 1,5 years.',
			author: 'Reka',
			meta: 'Female IC/BPS patient, Hungary',
			linkLabel: 'Read Reka’s story',
			href: supportHref,
		},
		{
			theme: 'Greater independence',
			// home
			icon: 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75',
			quote:
				'I use the UroDapter for self-treatment at home with intravesical medication. With UroDapter, I experience no pain during treatments, unlike when I used catheters.',
			author: 'Piotr',
			meta: 'Male IC/BPS patient, Poland',
			linkLabel: 'Read Piotr’s story',
			href: supportHref,
		},
	],
	more: {
		heading: 'Want to hear more patient stories?',
		body: 'Discover how people with different bladder conditions describe their experience with UroDapter.',
		linkLabel: 'Read all patient testimonials',
		href: supportHref,
	},
};

export const bridgeEvidence = {
	variant: 'quote' as const,
	lead: 'Personal experiences matter. But do clinical studies tell the same story?',
	emphasis:
		'Clinical research helps us understand whether those experiences are shared by many patients.',
};

export const evidence = {
	eyebrow: 'Evidence & outcomes',
	heading: 'What the research shows',
	intro:
		'UroDapter has been studied in clinical settings in real patients receiving intravesical instillations. Here are the findings that matter most to patients.',
	// First word/phrase of each stat is highlighted (docx spec)
	stats: [
		{
			highlight: '98%',
			rest: 'of female patients and 100% of male patients were successfully treated with the catheter-free method.',
			source: 'Lovász, Int J Urol, 2019 — 270 patients, 1,520 instillations',
			// user-group
			icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
		},
		{
			highlight: 'Less pain',
			rest: 'was the leading reason patients chose to continue treatment with UroDapter.',
			source: 'Pothoven et al., Continence, 2025 — 61 patients',
			// heart
			icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
		},
		{
			highlight: '3+ years',
			rest: 'of long-term real-world use confirmed in follow-up study.',
			source: 'Pothoven et al., Continence, 2025',
			// calendar-days
			icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',
		},
	],
	chart: {
		heading: 'Why patients choose the catheter-free approach',
		intro:
			'In a real-world clinical study, patients were asked why they wanted to try UroDapter — and what kept them using it.',
		columns: [
			{
				title: 'Reasons for trying it',
				series: 'trying' as const,
				rows: [
					{ label: 'Urethral pain with catheter', value: 41 },
					{ label: 'Hope for fewer infections', value: 26 },
					{ label: 'Convenience', value: 26 },
					{ label: 'Fear of catheter', value: 2 },
				],
			},
			{
				title: 'Reasons for continuing',
				series: 'continuing' as const,
				rows: [
					{ label: 'Less pain', value: 47 },
					{ label: 'Hope for fewer infections', value: 26 },
					{ label: 'Easier to use', value: 23 },
					{ label: 'Self-sustainability', value: 16 },
				],
			},
		],
		source: 'Source: Pothoven et al., Continence, 2025 — 61 patients, Andros Clinics, Netherlands',
	},
	consensus: {
		title: 'International expert consensus — 2025',
		body: 'A 2025 global expert review on interstitial cystitis/bladder pain syndrome (IC/BPS) treatment — authored by eight specialists from the USA, Europe, and India — recognized catheter-free instillation using UroDapter as a clinically validated approach that makes bladder instillation completely painless and treats the bladder and urethra simultaneously.',
		source: 'Buford et al., Neurourology and Urodynamics, 2025 — Global Consensus on IC/BPS: An Update on Therapeutic Treatments',
		// globe
		icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
	},
	clinicians: {
		heading: 'What professionals say about the UroDapter',
		quotes: [
			{
				quote:
					'This new device is a most welcome addition to traditional instillation equipment, particularly for patients with pain in the urethra, since this is very difficult to treat effectively when using a catheter for instillation. Catheter-related trauma causing burning pain in the urethra and neck of the bladder following instillation is also reduced to a minimum with this adapter.',
				author: 'Jane Meijlink',
				org: 'International Painful Bladder Foundation, The Netherlands',
			},
			{
				quote:
					'The Urodapter has had a tremendous impact in my practice on treating patients suffering from IC/BPS. It is a huge upgrade in patient comfort compared to using catheters for intravesical instillations. I would never hesitate, and I would choose the Urodapter over a conventional catheter any time for intravesical instillations.',
				author: 'Dr. Karabinos',
				org: 'Dept of Urology, South-Pest Hospital, Hungary',
			},
			{
				quote:
					'Perfect for quick, targeted bladder treatments — especially when repeated instillations are needed. Less discomfort, more efficiency, better experience.',
				author: 'Dr. Parekattil',
				org: 'Avant Concierge Urology, Winter Garden, Florida, USA',
			},
		],
		disclaimer: 'Testimonials reflect the personal experience of individual clinicians.',
	},
};

export const bridgeNextSteps = {
	variant: 'arrow' as const,
	lead: 'You’ve explored the possibilities of catheter-free bladder instillation.',
	emphasis: 'Now choose the next step that’s right for you.',
};

export const nextSteps = {
	eyebrow: 'What happens next',
	heading: 'What would you like to do now?',
	intro:
		'Whether you’re ready to start treatment, speak with your clinician, or simply learn more, we’re here to help you take the next step.',
	ctas: [
		{
			tier: 'primary' as const,
			title: 'I’m ready to get UroDapter',
			body: 'If UroDapter is available in your country, you can order it directly through our webshop.',
			linkLabel: 'Order UroDapter',
			href: supportHref, // TODO: webshop URL
			// shopping-cart
			icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z',
		},
		{
			tier: 'neutral' as const,
			title: 'I’d like to discuss it with my clinician',
			body: 'Discuss UroDapter with your healthcare professional and ask whether it could be appropriate for your treatment.',
			linkLabel: 'Learn how to discuss UroDapter',
			href: supportHref, // TODO: discussion-guide URL
			// chat-bubble-left-right
			icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155',
		},
		{
			tier: 'neutral' as const,
			title: 'I’m already using UroDapter',
			body: 'Access the UroDapter App for step-by-step guidance, treatment resources and useful tips.',
			linkLabel: 'Open the UroDapter App',
			href: supportHref, // TODO: app URL
			// device-phone-mobile
			icon: 'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
		},
	],
	diveDeep: {
		heading: 'Looking for more information?',
		body: 'The UroDapter Support Center brings together everything you need in one place.',
		items: [
			{
				label: 'Patient stories',
				// user-group
				icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
			},
			{
				label: 'Clinical evidence',
				// chart-bar
				icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
			},
			{
				label: 'Videos',
				// play-circle
				icon: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5.09-.328a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z',
			},
			{
				label: 'Educational materials',
				// academic-cap
				icon: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342',
			},
			{
				label: 'Technical information',
				// document-text
				icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
			},
		],
		linkLabel: 'Visit the Support Center',
		href: supportHref,
	},
	closing: {
		heading: 'You are not alone on this journey.',
		body: 'Whether you’re exploring your options or already using UroDapter, we’re here to support you every step of the way.',
		// Callback to the Section 1 headline (docx: reflection to the beginning)
		callback: 'A more comfortable treatment experience begins with the next step you choose.',
	},
};

export const bridgeWhyPrefer = {
	variant: 'quote' as const,
	lead: 'Understanding how UroDapter works is only part of the story.',
	emphasis:
		'What matters most is how it changes the treatment experience for people who undergo bladder instillations repeatedly.',
};

export const whyPrefer = {
	eyebrow: 'Patient benefits',
	heading: 'Why patients prefer UroDapter?',
	intro:
		'For many patients, bladder instillations are not a one-time event — they are repeated over weeks, months or even years. UroDapter is designed to make every one of those treatments a more comfortable experience, without changing the medication itself.',
	benefits: [
		{
			title: 'More comfortable treatment',
			body: 'Most patients describe treatment with UroDapter as pain-free. Avoid one of the most uncomfortable parts of treatment by eliminating catheterization.',
			// leaf
			icon: 'M5 21c0-5.5 2.5-10.5 7-13.5C15 5.5 18.5 4.5 21 4.5c0 2.5-1 6-3.5 9C14.5 18 9.5 21 5 21Zm0 0c1-4 3.5-8 8.5-11.5',
		},
		{
			title: 'Less anxiety',
			body: 'Most patients feel more relaxed knowing a catheter does not need to be inserted before treatment.',
			// face-smile
			icon: 'M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z',
		},
		{
			title: 'Fewer catheter-related problems',
			body: 'Without catheterization, many patients can avoid infection, irritation, bleeding and other catheter-related complications.',
			// shield-check
			icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
		},
		{
			title: 'Greater independence',
			body: 'Suitable for self-treatment when recommended by your healthcare professional, giving many patients greater flexibility and control over ongoing therapy.',
			// user
			icon: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
		},
	],
	indications: {
		text: 'Whether bladder instillations are prescribed for interstitial cystitis/bladder pain syndrome (IC/BPS), chronic or recurrent urinary tract infections (UTIs), bladder cancer, or other bladder conditions, patients share the same goal: making treatment as comfortable as possible.',
		items: [
			{
				label: 'IC/BPS',
				// bladder outline
				icon: 'M7.5 4.5c0 1.5-1 2.5-2.25 3.5C3.75 9.25 3 11.25 3 13.5 3 17.64 7.03 21 12 21s9-3.36 9-7.5c0-2.25-.75-4.25-2.25-5.5C17.5 7 16.5 6 16.5 4.5M9.75 21v-2.25M14.25 21v-2.25',
			},
			{
				label: 'Chronic UTI',
				// shield + droplet
				icon: 'M12 2.714A11.959 11.959 0 0 1 20.402 6 11.99 11.99 0 0 1 21 9.749c0 5.592-3.824 10.29-9 11.623-5.176-1.332-9-6.03-9-11.622 0-1.31.21-2.571.598-3.751A11.959 11.959 0 0 0 12 2.714Zm0 5.036s3 3.11 3 5.25a3 3 0 1 1-6 0c0-2.14 3-5.25 3-5.25Z',
			},
			{
				label: 'Recurrent UTI',
				// arrow-path (cycle)
				icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
			},
			{
				label: 'Bladder Cancer',
				// awareness ribbon
				icon: 'M12 3c-2 2.5-3.5 5.5-3.5 8 0 1.5.5 3 1.5 4.5L6.5 21M12 3c2 2.5 3.5 5.5 3.5 8 0 1.5-.5 3-1.5 4.5l3.5 5.5M9.25 13.75 6.5 21m7.25-7.25L17.5 21',
			},
		],
	},
};

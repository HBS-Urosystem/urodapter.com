// Support Center (/support). Layout and copy: the "Support Center (1/2)" and
// "(2/2)" boards of the UroDapter webdesign canvas (2026-11-18), whose copy came
// from the client's Support_FINAL_Files folder and the old urosystem.com.
// The long texts below were extracted from the board HTML by script, unedited.
// Files: PDFs in static/docs/ (the client's 02_Clinical_Evidence folder and the
// old site's uploads), the real-life videos in static/videos/real-life/ (the
// client's 04_Videos_and_Learning masters, re-encoded 2026-11-18 with ffmpeg
// 9.0.2: 960px wide, no audio track (the masters have none); <base>.webm VP9
// CRF 44 (served first, 0.4–1.9 MB), <base>.mp4 H.264 high CRF 30 +faststart
// (0.8–3.0 MB), <base>-poster.jpg the frame at 1 s).

import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';

/** An in-page link to a Support Center section, e.g. `#faq`. */
const section = (hash: `#${string}`) => (resolve('/support') + hash) as ResolvedPathname;
import { ifuHref, siteFooter } from '$lib/content/site';
import webAppImage from '$lib/assets/support/web-app.jpg?enhanced';
import videoIntroImage from '$lib/assets/support/video-intro.jpg?enhanced';
import thumbLovaszInstruction from '$lib/assets/support/video-lovasz-instruction.jpg?enhanced';
import thumbLovaszInterview from '$lib/assets/support/video-lovasz-interview.jpg?enhanced';
import thumbDawaPodcast from '$lib/assets/support/video-dawa-podcast.jpg?enhanced';
import thumbIcaWebinar from '$lib/assets/support/video-ica-webinar.jpg?enhanced';
import thumbSunaKarabinos from '$lib/assets/support/video-suna-karabinos.jpg?enhanced';
import productImage from '$lib/assets/product/urodapter-on-syringe.png?enhanced';
import ibsaLogo from '$lib/assets/partners/ibsa.png?enhanced';
import infuserveLogo from '$lib/assets/partners/infuserve.png?enhanced';
import morulaaLogo from '$lib/assets/partners/morulaa.jpg?enhanced';
import apexLogo from '$lib/assets/partners/apex.webp?enhanced';
import dawaLogo from '$lib/assets/partners/dawa.webp?enhanced';

/** A paragraph with inline links: plain strings and `{ text, href }` link segments. */
export type Rich = (string | { text: string; href: string })[];

export const supportHero = {
	eyebrow: "Support Center",
	title: "UroDapter®",
	heading: "How can we help you?",
	intro: "Instructions, clinical evidence, videos, answers to frequent questions and a direct line to the UroDapter team, in one place.",
	navLabel: "Support topics",
	topics: [
		{
			hash: "#use",
			title: "Using UroDapter",
			body: "Instructions For Use, Tips & Tricks, the Web App and real-life videos.",
			icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
		},
		{
			hash: "#evidence",
			title: "Clinical Evidence",
			body: "Published papers, consensus guides and international recognition.",
			icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
		},
		{
			hash: "#experience",
			title: "Testimonials",
			body: "Experiences of patients and clinicians.",
			icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
		},
		{
			hash: "#videos",
			title: "Videos and Learning",
			body: "Short videos, a detailed webinar, interviews and conferences.",
			icon: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5.09-.328a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z",
		},
		{
			hash: "#faq",
			title: "FAQ",
			body: "Answers to the most important questions coming to mind.",
			icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z",
		},
		{
			hash: "#contact",
			title: "Help and Contact",
			body: "Ask or tell the UroDapter team something specific.",
			icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
		},
		{
			hash: "#partners",
			title: "Partners",
			body: "Get to know our partners and distributors.",
			icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
		}
	],
};

export const using = {
	heading: "Using UroDapter",
	intro: "In this section, you can find not only the Instructions For Use and a detailed Tips And Tricks guide, but also an Application and short real-life videos to help you understand how to use UroDapter.",
	webApp: {
		tag: "Web App",
		heading: "UroDapter Web App",
		body: "An application that shows you step-by-step how to use the device.",
		link: "Open the Web App",
		srSuffix: " at app.urodapter.com (opens in a new tab)",
		href: "https://app.urodapter.com",
		domain: "app.urodapter.com",
		image: webAppImage,
		imageAlt: "The UroDapter Web App start screen: How to Use",
	},
	realVideos: {
		tag: "Videos",
		warning: "Explicit medical content · 18+",
		heading: "Real-life Instillation Videos",
		body: "Real treatments on real patients.",
		meta: "4 short videos · female and male patients",
		button: "Watch the videos",
		// Unlocked for this visit only (in memory): nothing is stored, so the gate needs no cookie.
		unlocked: "Thank you. The real-life instillation videos are now available below.",
		icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z",
		statusIcon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
		videos: [
			{
				label: "Female patient 1",
				duration: "1:01",
				"base": "/videos/real-life/female-patient-1",
			},
			{
				label: "Female patient 2",
				duration: "0:30",
				"base": "/videos/real-life/female-patient-2",
			},
			{
				label: "Female patient 3",
				duration: "0:42",
				"base": "/videos/real-life/female-patient-3",
			},
			{
				label: "Male patient",
				duration: "1:20",
				"base": "/videos/real-life/male-patient",
			}
		],
	},
	ifu: {
		heading: "Instructions For Use",
		tag: "PDF",
		body: "The official UroDapter Instructions For Use (IFU).",
		link: "Download the IFU",
		href: ifuHref,
	},
	tips: {
		heading: "UroDapter Tips & Tricks",
		tag: "PDF · 9 pages",
		body: "Less technical, and more practical on the use of the device.",
		link: "Download Tips & Tricks",
		href: "/docs/Using_UroDapter_Tips_and_Tricks_v4.pdf",
		toggle: "What’s inside",
		insideLabel: "Inside Tips & Tricks",
		groups: [
			{
				heading: "UroDapter Web App An application that shows you step-by-step how to use the device. Open the Web App at app.urodapter.com (opens in a new tab) app.urodapter.com VideosExplicit medical content · 18+ Real-life Instillation Videos Real treatments on real patients. 4 short videos · female and male patients Watch the videos → Thank you. The real-life instillation videos are now available on this device.Real-life Instillation VideosReal treatments on real patients.Female patient 11:01Female patient 20:30Female patient 30:42Male patient1:20 Instructions For UsePDF The official UroDapter Instructions For Use (IFU). Download the IFU UroDapter Tips & TricksPDF · 9 pages Less technical, and more practical on the use of the device. Download Tips & Tricks What’s inside Inside Tips & Tricks Female patients",
				items: [
					"Identifying and exposing the orifice of the urethra",
					"The proper method for disinfecting the orifice",
					"Preventing the dislocation of the orifice",
					"Finding the best angle with the syringe",
					"Leakage prevention",
					"The speed of instillation",
					"Special cases, possible complications",
					"After the instillation"
				],
			},
			{
				heading: "Male patients",
				items: [
					"Disinfection of the glans and the urethral orifice",
					"Holding the penis and fitting the adapter",
					"Relaxed, slow and intermittent delivery",
					"Delivering the solution left in the urethra with air"
				],
			}
		],
		note: "This summary cannot replace personal experience. The more times you use the UroDapter, the more easily and effectively you can perform instillations with it.",
	},
	icons: {
		download: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3",
		external: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
		document: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
		chevron: "m19.5 8.25-7.5 7.5-7.5-7.5",
	},
};

export const evidence = {
	heading: "Clinical Evidence",
	intro: "There are several published papers that confirm the safety and effectiveness of UroDapter. Its application is mentioned in consensus guides, too.",
	studiesHeading: "Published studies",
	studies: [
		{
			type: "Prospective observational trial",
			title: "Lovasz, 2019",
			body: "A prospective observational trial on the use of UroDapter in IC/BPS patients (1,520 instillations, 270 patients). There were no infections or any other complications. The treatment was successful in 100% of male and 98% of female patients. All treated patients preferred the catheter-free method over conventional catheterization.",
			citation: "International Journal of Urology (2019) 26 (Suppl. 1), 57–60",
			online: {
				label: "Read online",
				href: "https://onlinelibrary.wiley.com/doi/10.1111/iju.13976",
			},
			pdf: {
				href: "/docs/2019_IntJUrol_Lovasz.pdf",
				size: "0.4 MB",
				label: "Download PDF",
			},
		},
		{
			type: "Review",
			title: "Pothoven, 2023",
			body: "In a review about urinary tract infections, the authors also summarize the preliminary results of their study fully published in 2024.",
			citation: "Drug Target Insights 2023; 17: 126–137",
			online: {
				label: "Read online",
				href: "https://journals.aboutscience.eu/index.php/dti/article/view/2660",
			},
			pdf: {
				href: "/docs/2023_DTI_Pothoven.pdf",
				size: "1.7 MB",
				label: "Download PDF",
			},
		},
		{
			type: "Retrospective study",
			title: "Pothoven, 2024",
			body: "This retrospective study reports on the use of UroDapter (iAluadapter) in 61 patients with various bladder diseases. There were no infections or other complications. Seventy-five percent of all patients and 82% of those over 50 years wanted to continue using the device, because of the reduced pain, easy usage and the reduced risk of infections.",
			citation: "Continence 13 (2025) 101723",
			online: {
				label: "Read online",
				href: "https://www.sciencedirect.com/science/article/pii/S2772973724009986",
			},
			pdf: {
				href: "/docs/2024_Pothoven_Continence.pdf",
				size: "0.6 MB",
				label: "Download PDF",
			},
		}
	],
	guidelinesHeading: "Guidelines and consensus",
	// OPEN: "completely painless" (Global Consensus summary) is flagged to the client — never strengthen a claim.
	guidelines: [
		{
			type: "Guideline · consensus",
			title: "IPBF, 2025",
			source: "International Painful Bladder Foundation",
			body: "The IPBF is one of the biggest international patient-initiated organizations committed to delivering high-quality information and help to IC/BPS patients worldwide, assisted by a panel of international medical experts. Their publication about the Diagnosis and Treatment of IC/BPS lists UroDapter as a novel catheter-free solution on page 33.",
			online: {
				label: "Read online",
				href: "https://www.painful-bladder.org/archive/IPBF%20Brochure%20IC-BPS%20Diagnosis-Treatment/",
			},
			pdf: {
				href: "/docs/2025_IPBF_Diagnosis_Treatment.pdf",
				size: "0.8 MB",
				label: "Download PDF",
			},
		},
		{
			type: "Guideline · consensus",
			title: "Global Consensus on IC/BPS, 2025",
			citation: "Neurourology and Urodynamics, 2025; 1–8",
			body: "A global conference on IC/BPS was held in Winston-Salem, North Carolina, USA in April 2025 to establish expert consensus on the definition, diagnosis, classification, and treatment of IC/BPS. The expert consensus paper recognizes UroDapter as a novel catheter‑free instillation method, making instillations completely painless and treating the bladder and urethral symptoms simultaneously.",
			online: {
				label: "View on publisher’s site",
				href: "https://onlinelibrary.wiley.com/doi/epdf/10.1002/nau.70106",
			},
			contact: {
				label: "Contact us for the full publication",
			},
		}
	],
};

export const testimonials = {
	heading: "Testimonials",
	intro: "The best feedback on the use of a medical device is the experience patients and clinicians have.",
	tabsLabel: "Testimonials",
	patients: {
		tab: "Patients",
		showAll: "Show all 10 patient stories",
		items: [
			{
				paras: [
					"I’ve been using UroDapters for probably the last two years. I have chronic interstitial cystitis with recurring infections, and the UroDapters have made a huge difference multiple times. I have had infections that are resistant - only an infusion with an antibiotic, instead of oral treatment, helps resolve the problem.",
					"And the UroDapters are just not painful, easy to learn how to use, and I feel so much better knowing I have them and not fearing having to use a catheter, which is very painful, difficult, and more likely to cause an infection. So I absolutely love the UroDapters."
				],
				name: "Sue R-S.",
				details: ["Female chronic UTI patient", "USA, 2026"],
			},
			{
				paras: [
					"After 3 years of debilitating painful bladder symptoms, I started treatment for chronic embedded UTI in 2025. Since oral antibiotics were not as effective, my physician initiated a new treatment with direct antibiotic bladder instillations. However, my pelvic floor, urethra, vaginal area, and bladder were so sensitive and prone to spasms that even a pediatric catheter was uncomfortable.",
					"My local gynecologist reviewed the videos and instructions that UroDapter provides for physicians and patients and administered the first round of 28 bladder instillations of antibiotics using the UroDapter. I was so excited that this UroDapter existed for people like me who are very sensitive and in chronic pain.",
					"It was easy to order them, and they have allowed me to continue receiving treatments in my gynecologist’s office - working together towards eradicating a very tough biofilm chronic infection. It would be wonderful if all physicians who work in the area of urology and gynecology would use or offer UroDapters as an alternative for their patients and clients!"
				],
				name: "Michelle K.",
				details: ["Female chronic UTI patient", "USA, 2026"],
			},
			{
				paras: [
					"My name is KP. Last year I was diagnosed with Interstitial Cystitis. It is an extremely debilitating disorder that nearly destroyed my life. In my experience, catheters not only caused numerous infections but pain and irritation making each bladder instillation an anxiety filled experience. I cancelled all my bladder instillations as every single time that we used a catheter I would end up with an infection. In the hours of endless research, I came across the UroDapter. Without hesitation I purchased a set and asked my doctor to use it instead of the standard catheter.",
					"My doctor loves using the UroDapter and went to great lengths to order them for the clinic. She like myself saw the immense benefit of using it in lieu of a catheter. That tiny attachment has been a game changer in my treatment! More people need to be made aware of it. I am your biggest advocate, I tell everyone who will listen about this miraculous invention. Since the incorporation of the UroDapter into my weekly bladder instillations, I am actually getting better and my quality of life improved in ways I’ve never thought possible!"
				],
				name: "Kathy P.",
				details: ["Female IC/BPS patient", "USA, 2025"],
			},
			{
				paras: [
					"The UroDapter has resulted in a significant shift in how I manage my interstitial cystitis. Before discovering this device, managing my condition and treatments was often marked by discomfort, risk, and frustration.",
					"Prior to the UroDapter, I tried a variety of different treatment options. I had to be catheterized for both assessment and for treatment. Not only was this painful, but the risk of infections was always a consideration. The UroDapter has really transformed my experience. The discomfort associated with catheterization is no longer an issue. This revolutionary device’s design ensures a gentler approach, completely eliminating any discomfort during instillations. There is also a significant reduction in the risk of infections or damage to my urethra due to the device only going a small distance into the urethra. Previously I had gotten a complicated UTI, one that could not be treated with regular antibiotics, most likely from catheterization.",
					"I now have confidence, less apprehension, more predictability, and an overall a better quality of life."
				],
				name: "Hannah J.",
				details: ["27y female IC/BPS patient", "USA, the Netherlands, 2023"],
			},
			{
				paras: [
					"Using a catheter for intravesical treatment required mental preparation for the unpleasant and painful procedure, which could potentially lead to infection. In contrast, using the UroDapter does not cause me mental distress, it does not cause pain, does not hurt my urethra, and it has never caused any infection or complications in 1,5 years. It can be inserted into the urethral opening with ease and without causing any damage."
				],
				name: "Reka S. D.",
				details: ["Female IC/BPS patient", "Hungary, 2023"],
			},
			{
				paras: [
					"The UroDapter helps patients receive intravesical instillations at home without the need for painful catheterization.",
					"I use the UroDapter for self-treatment at home with intravesical medication. With UroDapter, I experience no pain during treatments, unlike when I used catheters.",
					"This is a fantastic product for patients who need to take medications into their urinary bladder."
				],
				name: "Piotr K.",
				details: ["37y male IC/BPS patient", "Poland, 2023"],
			},
			{
				paras: [
					"I am a retired hospital employee and an IC/BPS patient. I came across the UroDapter on YouTube. I love the idea! I have so much anxiety when I get bladder instillations via catheter due to a bad experience & the burning afterwards."
				],
				name: "Tanya J.",
				details: ["Female IC/BPS patient", "USA, 2024"],
			},
			{
				paras: [
					"The UroDapter is the best invention possible. Dr. Lovász has saved his patients from severe pain with this device. Intravesical instillations have become a very gentle procedure thanks to the UroDapter. You can only feel very mild pressure during its application, whereas a catheter painfully injures the urethra. Furthermore, with this method the urethra is treated as well, especially since my main issue is urethral burning. I don't believe my urethral pain would have gone away with a catheter. I recommend using this device for anyone undergoing intravesical cocktail treatments. I would no longer consider undergoing intravesical treatments with a catheter on a monthly basis."
				],
				name: "Edit K.",
				details: ["46y female IC/BPS patient", "Hungary, 2023"],
			},
			{
				paras: [
					"Ease of use, no discomfort and so much quicker instillation than via catheter. I wish you would make it easier for physicians’ offices to order from you directly."
				],
				name: "Female customer",
				details: ["USA, 2024"],
			},
			{
				paras: [
					"It works great at delivering the medicine into my bladder. My specific goal with this device is to deliver DMSO into the prostate. I hope this will do the trick, as I have been suffering from chronic prostatitis for many years now."
				],
				name: "Zach T.",
				details: ["Male chronic prostatitis patient", "USA, 2024"],
			}
		],
	},
	professionals: {
		tab: "Professionals",
		showAll: "Show all 7 professional testimonials",
		items: [
			{
				paras: [
					"I recently had the pleasure of using UroDapters and they have exceeded all of my expectations. From the moment I first interacted with the products, it was clear that the UroDapter is at the forefront of innovation in their field. The design and functionality of the UroDapter are nothing short of impressive and are incredibly well-engineered. I particularly appreciate the design, which makes instillation of medications straightforward and more comfortable for my patients."
				],
				name: "Dr. Sijo J. Parekattil",
				details: [
					"Urologist, Medical Director",
					"Avant Concierge Urology",
					"Winter Garden, Florida, USA"
				],
			},
			{
				paras: [
					"I have been using the UroDapter for almost 5 years and have had a very good experience. For patients whose primary complaint is in the urethral area, the adapter makes it almost painless to deliver the medicine into the bladder, which was unthinkable with the single-use catheters used previously. For men, its use is easy to learn. In women, due to anatomical variations, the learning curve is a bit longer, but with the patient's cooperation and appropriate instructions, the experience can be gained to easily deliver the drug into the bladder without loss. This is a real help for the IC/BPS patient group."
				],
				name: "Dr. Marianna Nagy",
				details: ["Urologist", "Dept of Urology, Homeland Defense Hospital", "Budapest, Hungary"],
			},
			{
				paras: [
					"The Ialuadapter® (UroDapter) offers an efficient method of administering medicine into the bladder without needing a catheter. The adapter tip can be guided into the urethral orifice of female and male patients with minimal risk of pain or other complications. After an initial learning curve involving some practice, the use of the device for bladder instillations is a pain-free alternative to standard catheterization in both men and women providing simultaneous treatment of the bladder and the urethra.",
					"The patients reported less pain and reported that it was easier to use compared to conventional catheters. The method is also more effective and gives faster results in patients with bladder pain and urethritis.",
					"The device is a good alternative to conventional catheterization for intravesical therapy with patients experiencing less pain and a low risk of UTI development."
				],
				name: "Ria Pothoven",
				details: [
					"Clinical nurse consultant",
					"Andros Clinics",
					"Center for complex bladder disorders",
					"The Hague, Baarn, Netherlands"
				],
			},
			{
				paras: [
					"The UroDapter device is very useful in everyday gynecological practice. Many patients present with symptoms of pelvic pain. With the UroDapter, complaints can be treated very simply and immediately without catheterization, both diagnostically and therapeutically for urological origins. The use of the Urodapter, like other medical devices, can be learned in a short time. The catheterization process can be uncomfortable and painful for patients, but this can be avoided with the help of the UroDapter."
				],
				name: "Dr. Zoltán Kovács",
				details: ["Gynecologist, Neural Therapy Expert", "Private Practitioner", "Budapest, Hungary"],
			},
			{
				paras: [
					"The UroDapter is a potential solution for catheter-free instillation in patients when catheter use is too painful due to urethral pain. It can also help to prevent catheterisation-related infections."
				],
				name: "Jane M. Meijlink",
				details: ["Chairman", "International Painful Bladder Foundation", "The Netherlands"],
			},
			{
				paras: [
					"The Urodapter has had a tremendous impact in my practice on treating patients suffering from Bladder Pain Syndrome. It is a huge upgrade in patient comfort compared to using catheters for intravesical instillations. I have been using it for three years, and the feedback from patients has been amazing.",
					"I have always appreciated innovations that led to better patient care. I believe the Urodapter has a short learning curve, and it now has great teaching videos that make its usage even easier. I would never hesitate, and I would choose the Urodapter over a conventional catheter any time for intravesical instillations."
				],
				name: "Dr. Kinga Karabinos",
				details: ["Urologist", "Dept. of Urology, South-Pest Teaching Hospital", "Budapest, Hungary"],
			},
			{
				paras: [
					"After some practice, the UroDapter simplifies intravesical treatment for both patients and staff. Once you experience its benefits, you won’t want to use anything else. I highly recommend it to all my colleagues and patients."
				],
				name: "Dr. Zoltan Balogh",
				details: ["Urologist", "Dept. of Urology, South-Pest Teaching Hospital", "Budapest, Hungary"],
			}
		],
	},
	showFewer: "Show fewer",
	chevron: "m19.5 8.25-7.5 7.5-7.5-7.5",
};

export const videos = {
	heading: "Videos and Learning",
	intro: "Let’s deep dive into footage: from short videos through a detailed webinar to interviews and conferences – everything you need to know and see about UroDapter.",
	feature: {
		tag: "Animation",
		duration: "3 min",
		heading: "Concept, theory, benefits – everything about UroDapter in 3 minutes.",
		href: "https://www.youtube.com/watch?v=x10av1eP8L8",
		image: videoIntroImage,
		imageAlt: "Video still: Introducing the UroDapter",
		play: "Play on YouTube: UroDapter in 3 minutes",
		link: "Watch on YouTube",
	},
	howTo: {
		tag: "How to use",
		duration: "1:13",
		heading: "A short instructive video on the use of UroDapter",
		href: "https://www.youtube.com/watch?v=MONZqHMJv7Q",
	},
	webinar: {
		tag: "Webinar",
		count: "4 videos",
		heading: "A full-scale webinar on the device in four parts: Benefits, How it works, Indications, FAQ.",
		parts: [
			{
				part: 1,
				duration: "4:39",
				title: "What is the UroDapter?",
				body: "On the disadvantages of performing an instillation with a catheter, and on the basics of the UroDapter.",
				href: "https://www.youtube.com/watch?v=dQtB2cPLD-w",
			},
			{
				part: 2,
				duration: "9:37",
				title: "How does the UroDapter work",
				body: "Detailed instructions on the use of the UroDapter, with video animations and step-by-step instructions.",
				href: "https://www.youtube.com/watch?v=CEGjtWhIMKI",
			},
			{
				part: 3,
				duration: "17:16",
				title: "Main indications",
				body: "On the indications and medical fields the UroDapter can be applied in.",
				href: "https://www.youtube.com/watch?v=s_urKNb2Fa0",
			},
			{
				part: 4,
				duration: "8:18",
				title: "Frequently Asked Questions",
				body: "Answering the most frequently asked questions regarding the UroDapter.",
				href: "https://www.youtube.com/watch?v=qyPv5P9SClE",
			}
		],
	},
	moreHeading: "More videos",
	more: [
		{
			tag: "Instruction",
			duration: "45 min",
			explicit: true,
			title: "A detailed instructional video on the use of the UroDapter® by Sándor Lovász MD, PhD, the inventor of the UroDapter®",
			href: "https://new.holyagfajdalom.hu/urosystem_large_files/Urodapter_Dr.Lovasz_Final_JAV.mp4",
			thumb: thumbLovaszInstruction,
		},
		{
			tag: "Interview",
			duration: "45 min",
			explicit: false,
			title: "Interview with Dr. Lovász – Pelvic Health Support Canada, 2024",
			href: "https://www.youtube.com/watch?v=Fz-_nM6oXXc",
			thumb: thumbLovaszInterview,
		},
		{
			tag: "Podcast",
			duration: "50 min",
			explicit: false,
			title: "Podcast by Dawa Medical, USA – a deep dive into the background, development and adoption of the UroDapter, focusing on the US market, 2025",
			href: "https://www.youtube.com/watch?v=bZ--jNk-REI",
			thumb: thumbDawaPodcast,
		},
		{
			tag: "Webinar",
			duration: "62 min",
			explicit: false,
			title: "An educational webinar covering the diagnosis and management of IC/BPS, featuring the UroDapter, for the Interstitial Cystitis Association (ICA), 2025",
			href: "https://www.youtube.com/watch?v=JGCQIvi4LJg",
			thumb: thumbIcaWebinar,
		},
		{
			tag: "Interview",
			duration: "39 min",
			explicit: false,
			title: "Interview with Dr. Karabinos, at the Society of Urologic Nurses and Associates (SUNA) annual conference in 2023",
			href: "https://www.youtube.com/watch?v=yCR1AM-eCMk&t=712s",
			thumb: thumbSunaKarabinos,
		}
	],
	explicitLabel: "Explicit medical content · 18+",
	icons: {
		play: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z",
		clock: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
		external: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
	},
};

export const faq: {
	heading: string;
	intro: string;
	shortLabel: string;
	detailLabel: string;
	items: { question: string; short: string; detail: Rich[] }[];
	aside: { heading: string; body: string; link: string; icon: string };
	chevron: string;
} = {
	heading: "Frequently Asked Questions",
	intro: "Answers to the most important questions coming to mind.",
	shortLabel: "Short answer",
	detailLabel: "Detailed answer",
	// OPEN: the leakage answer's "absolutely no leakage" wording is flagged to the client.
	items: [
		{
			question: "Who can use the UroDapter®?",
			short: "The UroDapter® is for professional use, but non-professionals trained by professional people can use it, too.",
			detail: [
				[
					"The UroDapter® can be used by medical professionals who are experienced at bladder instillation. To use the device, being familiar with the information provided by the Instructions for Use, the UroDapter® – Tips and Tricks, and the web application ",
					{
						text: "app.urodapter.com",
						href: "https://app.urodapter.com",
					},
					" is necessary; consulting the video files and/or professionals who have used the UroDapter® before is recommended."
				],
				[
					"The UroDapter® can also be used by non-professionals provided they have been trained by a professional in how the device is to be used."
				]
			],
		},
		{
			question: "Can the UroDapter® be used for treating male and female patients, as well?",
			short: "Yes, the UroDapter® can be used for both male and female patients with maximal efficacy.",
			detail: [
				[
					"A common question from clinicians or patients unfamiliar with the device is whether it can be used for both male and female patients. UroDapter is designed for use in both sexes. Due to the obvious anatomical differences, certain things are to be performed differently regarding the sex of the patient. The detailed step-by-step instructions and animations for both male and female patients are available on the Web App: ",
					{
						text: "app.urodapter.com",
						href: "https://app.urodapter.com",
					},
					"."
				]
			],
		},
		{
			question: "Can the UroDapter® be used for treating children?",
			short: "The minimum age of a patient is 15.",
			detail: [
				[
					"The urethral opening is of roughly the same size in adults. Just as most body parts, the opening is usually smaller in children. Although it cannot be ruled out that in certain cases the UroDapter® can be applied in the treatment of children, the use of the device is not recommended under the age of 15."
				]
			],
		},
		{
			question: "What type of syringes can I use the UroDapter with?",
			short: "Any syringe with Luer lock or Luer slip tips. Typically, 20- or 50-mL syringes.",
			detail: [
				[
					"This is an important question, and to answer it, we need to understand the types of syringes available on the market. There are two main parameters of syringes that are relevant now. The first is the size of the syringe. Sizes range from 1 mL (or cc) to 100 mL or even more. The UroDapter is compatible with all syringe sizes, although for bladder instillation, 20 or 50 mL syringes are used typically."
				],
				[
					"The second important parameter is the type of the tip. Most syringes have Luer slip or Luer lock tips, which are compatible with standard needles. With Luer slips, the needle can be attached to the syringe simply by pushing or slipping it onto the syringe tip. With Luer locks, the needle's base end must be twisted onto the syringe tip. Luer locks, for example, are used in intravenous cannulas to ensure better stability and a secure connection to the connecting tubes. (Some syringes are eccentric; on these the Luer slip tip is positioned at the edge of the syringe to provide better positioning for surface veins or artery injections.) The third most common tip variant is the catheter tip. This is larger than the Luer tips and compatible with catheter or gastrostomy tube connections. It’s generally found on large syringes (100 mL or above) that are mainly used for flushing or cleaning catheters or tubes. Another syringe type is the Toomey, which is usually 50 mL or bigger. These are applied in multiple fields; in urology, they’re used for draining the bladder, washing out items (e.g., blood clots) from the bladder, or during cystoscopy."
				],
				[
					"The UroDapter is compatible with all Luer slip and Luer lock syringes (eccentric or not). It’s not compatible with catheter tip or Toomey syringes, but these are not typically used for intravesical drug delivery, anyway."
				]
			],
		},
		{
			question: "Are UroDapter®, iAluadapter® and MID-ii the same products?",
			short: "Yes, they are the same products under different names.",
			detail: [
				[
					"IBSA, a Swiss pharmaceutical company, has been selling the UroDapter®, co-packed with their medicine, iAluRil®, under the name of iAluadapter®. This medicine is a GAG-layer replenisher cocktail, generally used for certain bladder conditions (such as Interstitial Cystitis/Bladder Pain Syndrome or the post-treatment bladder complications of chemotherapy). It is available in several European countries and in certain regions of the world."
				],
				[
					"MID-ii used to be the name of the product before it was changed to UroDapter®. This name can still be found on some older webpages or on older packaging."
				]
			],
		},
		{
			question: "I experienced some leakage of the solution in female patients. Is this normal?",
			short: "With some practice, the rate of leakage can be quickly decreased below 1% in both sexes.",
			detail: [
				[
					"User experience indicates that with the correct technique, the incidence of leakage in female patients can quickly drop below 1%, and there is absolutely no leakage in male patients. However, due to the UroDapter’s simplicity and logical design, new inexperienced users who are unfamiliar with the device may attempt to use it without understanding the proper technique. Simply inserting the UroDapter into the urethral opening and pushing the syringe could lead to an unsuccessful attempt. Just like every medical device, the UroDapter requires some practice and proper technique for successful application, too. (For example, inserting a catheter without any practice or knowledge results in a low success rate, as well.)"
				],
				[
					"To overcome the initial difficulties, the instructions provided by the ",
					{
						text: "app.urodapter.com",
						href: "https://app.urodapter.com",
					},
					" site and our Tips and Tricks Guide explain the correct technique of using the UroDapter®. The two decisive factors of a successful treatment are the angle of the instillation and the pressure applied to the plunger of the syringe – these guides show and detail how to find the correct angle and pressure."
				],
				[
					"User feedback suggests that in the first few attempts, a 15–20% leakage rate is normal for female patients, and this rate can be quickly reduced to 5% after approximately 10 instillations, and further to 0.5% with some additional practice."
				],
				[
					"Whether the leakage raises the risks during the treatment depends on the instilled solution. In case of a GAG-layer replenisher cocktail or some anesthetics (e.g., lidocaine), the leakage won’t cause any complications. However, in case of chemotherapeutic agents, even a few drops must be handled quickly and safely (the situation is the same regardless of the application method). Consult the manual of the instilled solution for details."
				]
			],
		},
		{
			question: "Can I use the UroDapter to drain urine from the bladder?",
			short: "No.",
			detail: [
				[
					"No, the UroDapter was designed to replace the catheter in cases of bladder instillations but not for draining urine from the bladder. Therefore, it is not suitable to replace the catheter for the purpose of urine drainage."
				]
			],
		},
		{
			question: "Should I check for residual urine prior to each instillation in a patient?",
			short: "No, only prior to the first instillation.",
			detail: [
				[
					"Post-void residual urine (PVR) or post-void residual volume is the amount of urine remaining in the bladder after voluntary urination. Normally – in 90% of the population – it is below 50 mL. A PVR between 50 and 200 milliliters is considered significant, and anything above 200 mL is classified as urinary retention. (It is more prevalent among elderly men or patients with lower urinary tract or neurological disorders.) The PVR can be assessed with a bladder ultrasound scan, or by inserting a catheter after urination."
				],
				[
					"Estimating the PVR is necessary only before the first instillation. If it is not significant, the UroDapter can be used for the subsequent treatments safely. In case of small residual urine, the dilution effect on the instilled solution is not significant. However, the slightly diluted effect of the instillation should be balanced against the decreased discomfort of instillation and the treatment’s urethral effect."
				]
			],
		},
		{
			question: "Can I use the UroDapter® for bladder instillation in case of significant post-void residual urine (PVR)?",
			short: "Since the UroDapter is not suitable to drain urine, in case of a significant PVR, the instilled solution will be diluted in the residual urine. Only use the device if this effect does not cause problems.",
			detail: [
				[
					"For the majority of cases without significant post-void residual volume, the UroDapter can be used without any subsequent PVR checks. Patients are simply advised to empty their bladder in the restroom before treatment. In the case of a small residual urine, the dilution effect is not significant. In the minority of cases where patients have significant PVR, the UroDapter is not ideal for bladder instillation if dilution of the instilled solution causes problems. On the other hand, the device can still be effectively used for urethral treatments or diagnostic purposes."
				]
			],
		},
		{
			question: "Can the UroDapter® be used for self-instillation, too?",
			short: "Assuming the patient has received the necessary training, the UroDapter® can be used for self-instillation.",
			detail: [
				[
					"In case of male patients, the device can be used for self-instillation without any extra effort provided the person has received training from a professional."
				],
				[
					"In case of female patients, performing self-instillation requires some learning, due to the obvious anatomical differences (in addition to being trained in the use of the device). Drawing on the experience of patients who successfully used the UroDapter® for self-treatment, we compiled a Self-instillation guide, which provides different options for this somewhat challenging process."
				]
			],
		}
	],
	aside: {
		heading: "Didn’t find your answer?",
		body: "Reach out for the UroDapter team if you want to ask or tell us something specific.",
		link: "Contact the team",
		icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z",
	},
	chevron: "m19.5 8.25-7.5 7.5-7.5-7.5",
};

export const explicitGate = {
	heading: "Explicit content warning",
	body: "The following videos contain explicit medical content. They show how UroDapter works in practice: real treatments performed on real patients.",
	accept: "I am 18 or older, and I understand the nature of the videos",
	decline: "I am younger, or I do not want to see explicit medical content",
	icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
};

// ISO 3166-1 alpha-2 codes of the inhabited countries and territories; the
// form's country list shows their English names (Intl.DisplayNames), sorted.
const countryCodes =
	'AF AX AL DZ AS AD AO AI AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI XK KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF KP MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA KR SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UY UZ VU VE VN VG VI WF EH YE ZM ZW';
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
export const countries = countryCodes
	.split(' ')
	.map((code) => regionNames.of(code) ?? code)
	.sort((a, b) => a.localeCompare(b, 'en'));

export const contact = {
	heading: 'Help and Contact',
	intro:
		'Be a patient, a clinician, a distributor or anyone who’s interested in the UroDapter®, we’re ready to help you, and to answer your questions.',
	// Netlify Forms, like the old urosystem.com contact form (form "Contact").
	// The page is prerendered so Netlify finds the form at deploy time.
	formName: 'contact',
	fields: {
		name: 'Name',
		email: 'E-mail address',
		phone: 'Phone',
		country: 'Country',
		countryHint: 'Start typing to pick from the list',
		website: 'Website',
		subject: 'Subject',
		subjectPlaceholder: 'Choose a subject',
		message: 'Message',
		optional: 'Optional'
	},
	subjects: [
		'UroDapter – General Question',
		'UroDapter – Medical Question',
		'Purchasing UroDapter – Private Person or Clinic',
		'Purchasing UroDapter – Institution',
		'Bulk Purchase or Distribution',
		'Shipping Question',
		'Feedback',
		'Issues Related To Use',
		'Other'
	],
	privacy: { before: 'I’ve read and accept the ', link: 'privacy policy', after: '.', href: siteFooter.legal.links[0].href },
	required: 'Required field',
	submit: 'Send message',
	sending: 'Sending…',
	sent: 'Thank you, your message has been sent. We will get back to you soon.',
	failed: 'Sorry, your message could not be sent. Please try again, or write to us later.',
	side: [
		// heroicons: shopping-bag
		{ text: 'To purchase UroDapter, visit our Shop.', link: 'Go to the Shop', href: resolve('/shop'), icon: 'M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' },
		// heroicons: question-mark-circle
		{ text: 'For information on the most frequently asked topics, visit the FAQ.', link: 'Read the FAQ', href: section('#faq'), icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z' }
	],
	chevron: 'm19.5 8.25-7.5 7.5-7.5-7.5'
};

export type Partner = { name: string; country: string; logo: typeof ibsaLogo; logoAlt: string; href: string | null };

export const partners = {
	heading: 'Partners',
	intro: 'Get to know our partners and distributors.',
	strategic: {
		tag: 'Strategic partner · Switzerland',
		logo: ibsaLogo,
		logoAlt: 'IBSA',
		href: 'https://www.ibsagroup.com/ibsa-group/technologies.html',
		body: 'Packed together with iAluRil®, the intravesical drug solution from IBSA (Switzerland), the patented UroDapter® is also available under the name iAluadapter®, in 85 countries.',
		image: productImage
	},
	visitWebsite: 'Visit website',
	// OPEN: the Infuserve America and Dawa Medical website addresses are still to
	// come from the client; until then their cards have no link.
	clinicalHeading: 'Clinical partners',
	clinical: [
		{ name: 'Infuserve America', country: 'United States', logo: infuserveLogo, logoAlt: 'Infuserve America logo', href: null }
	] satisfies Partner[],
	distributorsHeading: 'Distributors',
	distributors: [
		{ name: 'Morulaa Healthtech', country: 'India', logo: morulaaLogo, logoAlt: 'Morulaa HealthTech logo', href: 'https://www.morulaa.com' },
		{ name: 'Apex Medical Products, Inc', country: 'United States', logo: apexLogo, logoAlt: 'Apex Medical Products logo', href: 'https://www.apexmedicalproducts.com' },
		{ name: 'Dawa Medical', country: 'United States', logo: dawaLogo, logoAlt: 'Dawa Medical logo', href: null }
	] satisfies Partner[],
	cta: { text: 'Interested in becoming our distributor?', link: 'For distributors', href: resolve('/partners') },
	icons: {
		// heroicons: map-pin
		pin: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
		// heroicons: arrow-top-right-on-square
		external: 'M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
	}
};

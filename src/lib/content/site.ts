// Site chrome copy: the header navigation and the footer, shared by every page.
// Source: the "UroDapter webdesign" canvas (header and footer of every board,
// 2026-11-18) plus the client's task list of 2026-11-18 ("Feladatok – További
// ez-az", rows 6–11: UroSystem logo with a "Company" label, Support Center,
// Webshop, Contact us, legal pages and IFU links in the footer).

import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';

// The Support Center (canvas "Support Center" boards); the contact form is its
// "Help and Contact" section.
export const supportHref = resolve('/support');
export const contactHref = (resolve('/support') + '#contact') as ResolvedPathname;

export type NavLink = { href: ResolvedPathname; label: string };

export const siteNav: { links: NavLink[]; contact: NavLink } = {
	links: [
		{ href: resolve('/patients'), label: 'Patients' },
		{ href: resolve('/clinicians'), label: 'Clinicians' },
		{ href: resolve('/partners'), label: 'Distributors' },
		{ href: supportHref, label: 'Support Center' }
	],
	// The contact form is a section of the Support Center ("Help and Contact").
	contact: { href: contactHref, label: 'Contact us' }
};

/** The official Instructions For Use, the same file the old urosystem.com served. */
export const ifuHref = '/docs/UroDapter_Users_Manual.pdf';

export type ExternalLink = { label: string; href: string };

export const siteFooter = {
	company: {
		// Task list row 6: the UroSystem logo replaces the UroDapter logo, with a
		// "Company" label beside it so it is clear what the logo stands for.
		label: 'Company',
		href: 'https://www.urosystem.com',
		ariaLabel: 'UroSystem Zrt., www.urosystem.com',
		productOf: 'UroDapter® is a product of UroSystem Zrt.'
	},
	regulatory: 'CE marked · FDA listed · ISO 13485 certified QMS',
	links: [
		{ label: 'Support Center', href: supportHref },
		{ label: 'Webshop', href: resolve('/shop') },
		{ label: 'Contact us', href: contactHref }
	] satisfies NavLink[],
	// Task list row 11: the IFU is on the Support Center too, but belongs in the
	// footer as well.
	ifu: { label: 'Instructions For Use', note: 'PDF, 0.2 MB', href: ifuHref },
	// Task list row 10: launch-blocking until the documents are confirmed to be
	// current (rows 13–16). They are UroSystem's documents and live on
	// urosystem.com, where the webshop and the company pages are.
	legal: {
		heading: 'Legal',
		links: [
			{ label: 'Privacy Policy', href: 'https://www.urosystem.com/en/privacy-policy' },
			{ label: 'Terms of Service', href: 'https://www.urosystem.com/en/terms-of-service' },
			{ label: 'Shipping Policy', href: 'https://www.urosystem.com/en/shipping-policy' }
		] satisfies ExternalLink[]
	}
};

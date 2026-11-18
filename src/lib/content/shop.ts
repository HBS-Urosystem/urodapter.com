// Webshop page (/shop). Layout: the "Webshop" board of the UroDapter webdesign
// canvas (2026-11-18). Facts come from the old urosystem.com shop, which this
// page replaces as the UroDapter entry point:
//   · price, delivery times, accepted cards, right of withdrawal, "Manage my
//     orders" → urosystem.kit1/cms/blocks/shop/shop-5pcs.en.md
//   · card payment through Stripe → urosystem.kit1/cms/blocks/legal/terms.en.md
//     ("with bank debit or credit card through Stripe")
//   · the Shopify product the old "Shop now" button sold (product 5983114002592,
//     variant 39737392300192 on ify.urosystem.com) → urosystem.kit1/src/lib/my/BuyButton.svelte
// The old page's B2B block ("Interested in becoming our B2B Partner?") is gone:
// client task list 2026-11-18, rows 4–5 — a "For distributors" link replaces it.
//
// Owner decisions 2026-11-18 (client task list row 3):
//   · checkout stays the Shopify buy link (the cart permalink below);
//   · the €99 pack price is without VAT — in Europe 27% VAT is added;
//   · shipping is €10 for 1 pack and €25 for 2–5 packs (1 pack = 10 adapters),
//     which replaced the old per-region rates (€9.50 / €10.00);
//   · at most 5 packs per order.

import { resolve } from '$app/paths';
import { contactHref, supportHref } from '$lib/content/site';

const tick = 'm4.5 12.75 6 6 9-13.5'; // heroicons: check

export const shop = {
	eyebrow: 'Webshop',
	title: 'UroDapter®',
	heading: 'Buy UroDapter® directly from UroSystem',
	intro:
		'Sterile, single-use syringe adapter. A simple way to perform bladder instillations without catheterization.',
	tickIcon: tick,
	facts: [
		'10 adapters per pack',
		'Sent out by registered priority mail',
		'Bank card payment secured by Stripe',
		'CE marked · FDA listed · ISO 13485 certified QMS'
	],

	firstPack: {
		heading: 'Our offer for first-time patients and doctors',
		// The old page's "This exclusive offer" lost "exclusive" (no pressure wording).
		body: 'Contact us to get your first pack of 10 UroDapter® at a 50% discount. This offer lets you try UroDapter® at half the regular price.',
		link: { label: 'Contact us for the first-pack offer', href: contactHref },
		// heroicons: tag
		icon: 'M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z',
		iconDot: 'M6 6h.008v.008H6V6Z'
	},

	buy: {
		imageAlt: 'The UroDapter device: a small conical syringe adapter with a short rounded tip',
		heading: 'UroDapter® · pack of 10',
		seller: 'Sold by UroSystem Zrt.',
		pricePerPack: 99,
		adaptersPerPack: 10,
		perPack: 'per pack',
		/** Europe: +27% VAT on the pack price (owner direction 2026-11-18). */
		vatRate: 0.27,
		vatNote: (perPackWithVat: string) => `+ 27% VAT in Europe (${perPackWithVat} per pack)`,
		quantityLabel: 'Number of packs',
		fewer: 'One pack fewer',
		more: 'One pack more',
		maxPacks: 5,
		maxNote: 'Up to 5 packs per order',
		productsLabel: (adapters: number) => `Products (${adapters} adapters)`,
		/** Shipping per order: €10 for 1 pack, €25 for 2–5 packs. */
		shippingFor: (packs: number) => (packs === 1 ? 10 : 25),
		shippingLabel: (packs: number) => `Shipping (${packs} ${packs === 1 ? 'pack' : 'packs'})`,
		pricesNote: 'Prices exclude VAT. For orders within Europe, 27% VAT is added.',
		checkout: 'Continue to secure checkout',
		/** Shopify cart permalink: goes straight to checkout with `packs` in the cart. */
		checkoutHref: (packs: number) => `https://ify.urosystem.com/cart/39737392300192:${packs}`,
		// heroicons: lock-closed
		checkoutIcon:
			'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z',
		checkoutNote: 'You will see the full amount, VAT and shipping included, before you pay.',
		acceptLabel: 'We accept',
		cards: ['Visa', 'Mastercard', 'American Express', 'Apple Pay'],
		firstPackNudge: {
			strong: 'Ordering for the first time?',
			rest: 'Ask us about 50% off your first pack before you buy.'
		}
	},

	info: {
		heading: 'Shipping, delivery and your rights',
		intro: 'Everything to know before you order, in one place.',
		shipping: {
			heading: 'Shipping cost',
			// heroicons: truck
			icon: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
			rows: [
				{ label: '1 pack (10 adapters)', value: '€10.00' },
				{ label: '2–5 packs', value: '€25.00' }
			],
			note: 'Per order, sent out by registered priority mail. Up to 5 packs per order.'
		},
		delivery: {
			heading: 'Delivery time',
			// heroicons: clock
			icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			rows: [
				{ label: 'European countries', value: '12 days' },
				{ label: 'USA', value: '10 days' },
				{
					label:
						'Armenia, Azerbaijan, Georgia, Kazakhstan, Kyrgyzstan, Moldova, Tajikistan, Turkmenistan, Ukraine, Uzbekistan',
					value: '19 days'
				},
				{ label: 'Other countries', value: '15 days' }
			],
			note: 'Estimated by the customer’s country. For information only; may differ in certain cases.'
		},
		withdrawal: {
			heading: 'Right of withdrawal',
			// heroicons: arrow-uturn-left
			icon: 'M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3',
			body: 'EU consumers have the right to withdraw from a distance purchase within 14 days without giving any reason, in accordance with EU Directive 2023/2673.',
			// The button is how a customer withdraws, so it sits in this card
			// (owner direction 2026-11-18).
			note: 'To withdraw from an order, or to check its status, open it in Manage my orders.',
			link: { label: 'Manage my orders', href: 'https://shop.urosystem.com' }
		},
		questions: {
			title: 'Questions before or after you order?',
			body: 'Instructions, videos and answers in the Support Center.',
			href: supportHref,
			// heroicons: question-mark-circle
			icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
		},
		// Client task list 2026-11-18, row 5: a "For distributors" link in place
		// of the B2B text, equal in weight to the questions card.
		distributors: {
			title: 'For distributors',
			href: resolve('/partners'),
			// heroicons: globe-alt
			icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
		}
	}
};

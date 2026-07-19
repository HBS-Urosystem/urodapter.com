// Scroll reveal: fade/rise content ~12px as it enters the viewport.
// IntersectionObserver instead of CSS `animation-timeline: view()` — the
// scroll-driven-animation compositor path is still unreliable in Chromium
// (blank paints observed in embedded/capture contexts). Progressive
// enhancement: without JS or with reduced motion, content is simply visible.
export function reveal(node: HTMLElement) {
	if (
		typeof IntersectionObserver === 'undefined' ||
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		return;
	}

	// Hide only elements that are below the trigger line AND can still cross
	// it with the scroll the page actually has — anything else would either
	// flash (already visible) or stay invisible forever (unreachable line).
	const triggerLine = window.innerHeight * 0.9;
	const top = node.getBoundingClientRect().top;
	const maxScroll = Math.max(
		0,
		document.documentElement.scrollHeight - window.innerHeight - window.scrollY
	);
	if (top < triggerLine || top - maxScroll >= triggerLine) {
		return;
	}

	node.classList.add('reveal-init');
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				node.classList.add('reveal-in');
				observer.disconnect();
			}
		},
		{ rootMargin: '0px 0px -10% 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
}

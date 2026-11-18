// The explicit-content gate of the Support Center (canvas: "Explicit content
// warning"). Every [explicit] item — the real-life instillation videos and the
// 45-minute instruction video — asks first; accepting unlocks them for this
// visit only. Nothing is stored (no cookie, no storage), so a reload asks again.
export class ExplicitGate {
	open = $state(false);
	unlocked = $state(false);
	/** Element id to scroll to once the warning is accepted, if any. */
	#target: string | null = null;

	request(target: string | null = null) {
		if (this.unlocked) {
			if (target) this.#reveal(target);
			return;
		}
		this.#target = target;
		this.open = true;
	}

	accept() {
		this.unlocked = true;
		this.open = false;
		const target = this.#target;
		this.#target = null;
		// Wait one frame: the unlocked content renders before it is scrolled to.
		if (target) requestAnimationFrame(() => this.#reveal(target));
	}

	decline() {
		this.open = false;
		this.#target = null;
	}

	#reveal(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
		el.focus({ preventScroll: true });
	}
}

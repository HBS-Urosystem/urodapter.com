<script lang="ts">
  // The canvas's wave bridge (Páciens oldal board, 2026-11-18): a blush band
  // with wavy top and bottom edges between two sections — a short lead line,
  // the emphasis sentence in the light display weight, and the bridge arrow
  // (the bridge-arrow motion verb) pointing at the next section.
  // `above` / `below` are the fill classes of the neighbouring bands, so the
  // waves cut into them seamlessly in both colour schemes.
  let {
    lead,
    emphasis,
    next,
    above = 'fill-white dark:fill-navy-950',
    below = 'fill-white dark:fill-navy-950',
  }: {
    lead: string;
    emphasis: string;
    /** Id of the section the arrow scrolls to. */
    next: string;
    above?: string;
    below?: string;
  } = $props();
</script>

<div aria-hidden="true" class="block">
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" class="block w-full h-10 sm:h-16">
    <rect width="1440" height="80" class={above} />
    <path d="M0 80V40C260 8 520 4 780 34S1220 76 1440 28V80Z" class="fill-blush dark:fill-[color-mix(in_srgb,var(--color-blush)_12%,var(--color-navy-950))]" />
  </svg>
</div>
<div class="bg-blush dark:bg-[color-mix(in_srgb,var(--color-blush)_12%,var(--color-navy-950))]">
  <div class="max-w-[56.25rem] mx-auto px-5 sm:px-8 pt-[clamp(0.875rem,1.8vw,1.375rem)] pb-[clamp(0.625rem,1.2vw,0.875rem)] flex flex-col items-center gap-2.5 text-center">
    <p class="text-lg leading-normal text-(--ink-soft)">{lead}</p>
    <p class="text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight font-light tracking-[-0.01em] text-(--ink) text-balance">{emphasis}</p>
    <a
      href="#{next}"
      aria-label="Scroll to the next section"
      class="arrow-nudge mt-1 grid place-items-center size-10 rounded-full bg-white text-(--brand-ink) dark:bg-white/10
             focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--brand-ink)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-[18px]"><path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
    </a>
  </div>
</div>
<div aria-hidden="true" class="block">
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" class="block w-full h-10 sm:h-16">
    <rect width="1440" height="80" class="fill-blush dark:fill-[color-mix(in_srgb,var(--color-blush)_12%,var(--color-navy-950))]" />
    <path d="M0 80V30C300 70 600 74 860 46S1260 6 1440 22V80Z" class={below} />
  </svg>
</div>

<style>
  /* The bridge-arrow motion verb (as in SectionBridge): a 4px bob, paused on
     hover, off under reduced motion. */
  @keyframes nudge {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(4px);
    }
  }
  .arrow-nudge {
    animation: nudge 2.4s ease-in-out infinite;
  }
  .arrow-nudge:hover {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    .arrow-nudge {
      animation: none;
    }
  }
</style>

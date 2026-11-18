<script lang="ts">
  // The canvas's "cool" bridge (Klinikus oldal board, 2026-11-18): a navy band
  // (navy-950 → navy-900 at 45°, the guideline's UroSystem gradient) with a
  // translucent pine → lagoon corner, the lead line, the emphasis in the light
  // display weight, both left-aligned, and a square aqua bridge arrow (the
  // bridge-arrow motion verb). Dark in both colour schemes.
  let { lead, emphasis, next }: { lead?: string; emphasis: string; next: string } = $props();
</script>

<div class="relative overflow-hidden bg-[linear-gradient(45deg,var(--color-navy-950)_30%,var(--color-navy-900))]">
  <div aria-hidden="true" class="absolute right-0 top-0 w-[34%] h-full opacity-35 bg-linear-45 from-pine to-lagoon [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]"></div>
  <div class="relative max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(2.25rem,4vw,3.5rem)] flex flex-col items-start gap-3.5">
    {#if lead}<p class="text-lg leading-normal text-mist">{lead}</p>{/if}
    <p class="max-w-[56.25rem] text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight font-light tracking-[-0.01em] text-white text-balance">{emphasis}</p>
    <a
      href="#{next}"
      aria-label="Scroll to the next section"
      class="arrow-nudge grid place-items-center size-10 rounded-[3px] bg-aqua text-navy-950 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aqua"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-[18px]"><path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
    </a>
  </div>
</div>

<style>
  /* The bridge-arrow motion verb (as in SectionBridge). */
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

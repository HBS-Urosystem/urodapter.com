<script lang="ts">
  import { reveal } from '$lib/actions/reveal';

  let {
    variant = 'arrow',
    lead,
    emphasis,
  }: { variant?: 'arrow' | 'quote'; lead: string; emphasis: string } = $props();
</script>

<!-- Full-bleed tinted band between two section panels; the hand-off moment
     of the journey. Decorative bits are aria-hidden, the message is a <p>. -->
<div class="tint-band my-12 sm:my-16">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
    {#if variant === 'arrow'}
      <div use:reveal class="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 max-w-3xl mx-auto text-center sm:text-left">
        <span
          class="w-14 h-14 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center shrink-0 text-patient dark:text-sky-300"
          aria-hidden="true"
        >
          <svg class="w-6 h-6 arrow-nudge" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
        </span>
        <p class="text-lg sm:text-xl leading-relaxed text-navy-900 dark:text-slate-100 text-pretty">
          {lead}
          <span class="font-semibold text-navy-950 dark:text-white">{emphasis}</span>
        </p>
      </div>
    {:else}
      <div use:reveal class="max-w-3xl mx-auto text-center">
        <span
          class="mx-auto w-14 h-14 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center"
          aria-hidden="true"
        >
          <span class="font-display text-4xl leading-none text-patient dark:text-sky-300 translate-y-2">&ldquo;</span>
        </span>
        <p class="mt-6 text-lg text-navy-900 dark:text-slate-100">{lead}</p>
        <p class="mt-3 font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug text-balance">
          {emphasis}
        </p>
        <div class="mt-6 h-0.5 w-12 mx-auto rounded-full bg-patient/50 dark:bg-sky-300/60" aria-hidden="true"></div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Band background is the shared .tint-band class (layout.css) */
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
  @media (prefers-reduced-motion: reduce) {
    .arrow-nudge {
      animation: none;
    }
  }
</style>

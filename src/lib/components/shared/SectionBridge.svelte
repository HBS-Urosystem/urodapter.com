<script lang="ts">
  import { reveal } from '$lib/actions/reveal';

  type Problem = { id: string; label: string; text: string; icon: string; accentClass: string };

  // `lead` is optional: several clinician-page bridges are a single sentence,
  // and a headline sentence stays in one element (design system §3).
  // `problems` (quote variant only) puts one short labelled statement per
  // audience above the emphasis — the home page's first bridge. Without it the
  // band renders exactly as before.
  let {
    variant = 'arrow',
    lead = undefined,
    emphasis,
    problems = undefined,
  }: { variant?: 'arrow' | 'quote'; lead?: string; emphasis: string; problems?: Problem[] } = $props();
</script>

<!-- Full-bleed tinted band between two section panels; the hand-off moment
     of the journey. Decorative bits are aria-hidden, the message is a <p>. -->
<div class="tint-band my-12 sm:my-16">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
    {#if variant === 'arrow'}
      <div use:reveal class="flex flex-col sm:flex-row sm:justify-center items-center gap-5 sm:gap-7 max-w-3xl mx-auto text-center sm:text-left">
        <span
          class="w-14 h-14 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center shrink-0 text-(--brand-ink)"
          aria-hidden="true"
        >
          <svg class="w-6 h-6 arrow-nudge" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
        </span>
        <p class="text-lg sm:text-xl leading-relaxed text-navy-900 dark:text-slate-100 text-pretty">
          {#if lead}{lead}{/if}
          <span class="font-semibold text-navy-950 dark:text-white">{emphasis}</span>
        </p>
      </div>
    {:else if problems?.length}
      <!-- The audience problems, then the site's own answer. The answer is not a
           quote, so no glyph chip; the rule sits above it as the divider between
           problem and answer. The accent scopes sit on the inner wrappers, so
           the band's own tint is untouched (design system §1). -->
      <div use:reveal>
        <div class="grid gap-x-12 gap-y-7 grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] text-left">
          {#each problems as p (p.id)}
            <div class={p.accentClass}>
              <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-(--accent-ink)">
                <svg class="w-[clamp(1rem,0.9rem+0.25vw,1.125rem)] h-[clamp(1rem,0.9rem+0.25vw,1.125rem)] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
                  ><path stroke-linecap="round" stroke-linejoin="round" d={p.icon} /></svg
                >{p.label}
              </p>
              <p class="mt-3 text-[clamp(1.0625rem,0.95rem+0.4vw,1.25rem)] leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">
                {p.text}
              </p>
            </div>
          {/each}
        </div>
        <div class="mt-[clamp(2.5rem,2rem+1.5vw,3.5rem)] max-w-3xl mx-auto text-center">
          <div class="h-0.5 w-12 mx-auto rounded-full bg-(--brand-ink)/50 dark:bg-(--brand-ink)/60" aria-hidden="true"></div>
          <p class="mt-[clamp(1.5rem,1.35rem+0.4vw,1.75rem)] font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug text-balance">
            {emphasis}
          </p>
        </div>
      </div>
    {:else}
      <div use:reveal class="max-w-3xl mx-auto text-center">
        <span
          class="mx-auto w-14 h-14 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center"
          aria-hidden="true"
        >
          <span class="font-display text-4xl leading-none text-(--brand-ink) translate-y-2">&ldquo;</span>
        </span>
        {#if lead}
          <p class="mt-6 text-lg text-navy-900 dark:text-slate-100">{lead}</p>
        {/if}
        <p class="{lead ? 'mt-3' : 'mt-6'} font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug text-balance">
          {emphasis}
        </p>
        <div class="mt-6 h-0.5 w-12 mx-auto rounded-full bg-(--brand-ink)/50 dark:bg-(--brand-ink)/60" aria-hidden="true"></div>
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

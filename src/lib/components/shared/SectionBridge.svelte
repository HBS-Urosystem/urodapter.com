<script lang="ts">
  import { reveal } from '$lib/actions/reveal';

  type Problem = { id: string; label: string; text: string; icon: string; accentClass: string };

  // `lead` is optional: several clinician-page bridges are a single sentence,
  // and a headline sentence stays in one element (design system §3). When both
  // pieces are present, the rule divides them; a single sentence carries no
  // rule (owner direction 2026-09-30, which also removed the quotation-mark
  // chip this variant used to draw — the copy is the site's own line).
  // `problems` (bridge variant only) puts one short labelled statement per
  // audience above the emphasis — the home page's first bridge. Without it the
  // band renders exactly as before.
  // `tone` (arrow variant): 'tint' is the usual mist band; 'solid' is the
  // persona's `.surface-solid` fill with white text — the same surface as the
  // solid Support Center card, for a bridge that should read louder (owner
  // direction 2026-09-29: the patient page's bridge into the stories).
  let {
    variant = 'arrow',
    tone = 'tint',
    lead = undefined,
    emphasis,
    problems = undefined,
  }: {
    variant?: 'arrow' | 'bridge';
    tone?: 'tint' | 'solid';
    lead?: string;
    emphasis: string;
    problems?: Problem[];
  } = $props();

  const solid = $derived(tone === 'solid' && variant === 'arrow');
</script>

<!-- Full-bleed tinted band between two section panels; the hand-off moment
     of the journey. Decorative bits are aria-hidden, the message is a <p>. -->
<div class="{solid ? 'surface-solid text-white' : 'tint-band'} my-12 sm:my-16">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
    {#if variant === 'arrow'}
      <div use:reveal class="flex flex-col sm:flex-row sm:justify-center items-center gap-5 sm:gap-7 max-w-3xl mx-auto text-center sm:text-left">
        <span
          class="w-14 h-14 rounded-full flex items-center justify-center shrink-0
                 {solid
            ? 'bg-white/15 border border-white/25 text-white'
            : 'bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 shadow-sm text-(--brand-ink)'}"
          aria-hidden="true"
        >
          <svg class="w-6 h-6 arrow-nudge" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
        </span>
        <p class="text-lg sm:text-xl leading-relaxed text-pretty {solid ? 'text-white/85' : 'text-navy-900 dark:text-slate-100'}">
          {#if lead}{lead}{/if}
          <span class="font-semibold {solid ? 'text-white' : 'text-navy-950 dark:text-white'}">{emphasis}</span>
        </p>
      </div>
    {:else if problems?.length}
      <!-- The audience problems, then the site's own answer. The rule sits above
           the answer as the divider between problem and answer. The accent scopes
           sit on the inner wrappers, so the band's own tint is untouched
           (design system §1). -->
      <div use:reveal>
        <div class="grid gap-x-12 gap-y-7 grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] text-left">
          {#each problems as p (p.id)}
            <div class={p.accentClass}>
              <p class="eyebrow">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
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
        {#if lead}
          <!-- Two sentences: the rule divides them, the same role it plays
               between the problems and the answer above. -->
          <p class="text-lg text-navy-900 dark:text-slate-100">{lead}</p>
          <div class="mt-6 h-0.5 w-12 mx-auto rounded-full bg-(--brand-ink)/50 dark:bg-(--brand-ink)/60" aria-hidden="true"></div>
        {/if}
        <p class="{lead ? 'mt-[clamp(1.5rem,1.35rem+0.4vw,1.75rem)]' : ''} font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug text-balance">
          {emphasis}
        </p>
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

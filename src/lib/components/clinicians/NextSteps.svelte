<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { nextSteps } from '$lib/content/clinicians';

  type Cta = (typeof nextSteps.ctas)[number];

  // Canvas (2026-11-18), the "cool" shape: square 2px cards. The primary tier
  // is the flat pine fill (`.accent-pill`, white text 6.3:1 — design system
  // §4) with a translucent lagoon corner; the others are white with a mist
  // ring, square icon chips and a square aqua-outlined button look.
  const cardClass = (cta: Cta) =>
    cta.tier === 'primary'
      ? 'group relative overflow-hidden accent-pill rounded-[2px] p-8 flex flex-col gap-4 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-ink)'
      : 'group relative rounded-[2px] p-8 flex flex-col gap-4 bg-white ring-1 ring-inset ring-mist hover:ring-(--accent-ink)/50 dark:bg-navy-900 dark:ring-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-ink)';
</script>

<!-- Card interior, shared by the on-site and off-site anchors below. -->
{#snippet cardBody(cta: Cta)}
  {@const primary = cta.tier === 'primary'}
  {#if primary}
    <div aria-hidden="true" class="absolute right-0 top-0 w-[55%] h-[60%] bg-lagoon opacity-30 [clip-path:polygon(40%_0,100%_0,100%_100%)]"></div>
  {/if}
  <span
    class="relative grid place-items-center size-12 shrink-0 rounded-[3px] {primary
      ? 'bg-white/15'
      : 'bg-white ring-1 ring-inset ring-mist text-(--accent-ink) dark:bg-white/10 dark:ring-white/15'}"
    aria-hidden="true"
  >
    <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={cta.icon} /></svg>
  </span>
  <h3 class="relative text-[22px] leading-tight font-semibold {primary ? '' : 'text-(--ink)'}">{cta.title}</h3>
  <p class="relative grow leading-relaxed text-pretty {primary ? 'text-white/90' : 'text-(--ink-soft)'}">
    {cta.body}
  </p>
  <span class="relative self-start inline-flex items-center gap-2 font-semibold {primary ? 'h-11 px-4 rounded-[3px] bg-white text-pine' : 'text-(--accent-ink)'}">
    {cta.linkLabel}{#if cta.externalHref}<span class="sr-only"> (opens in a new tab)</span>{/if}
    <span class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">→</span>
  </span>
{/snippet}

<!-- Section 5 (0831 docx) — the three CTA tiers, one link each. The primary
     tier is `.accent-pill` (a flat solid fill), not the patient page's scoped
     gradient: clinician teal drops white text under AA across a gradient sweep
     at this size (design system §4). -->
<section id="c-next" aria-labelledby="next-steps-heading" class="scroll-mt-6">
<div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)]">
  <p class="eyebrow rounded-[2px]!">{nextSteps.eyebrow}</p>
  <h2
    id="next-steps-heading"
    class="mt-4 display-light"
  >
    {nextSteps.heading}
  </h2>
  <p class="mt-4 text-lg leading-relaxed text-(--ink-soft) max-w-3xl text-pretty">
    {nextSteps.intro}
  </p>

  <div use:reveal class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
    {#each nextSteps.ctas as cta (cta.title)}
      {#if cta.externalHref}
        <!-- Off-site (the UroDapter Web App): a new tab, and `rel="external"`
             so SvelteKit's router hands it to the browser. -->
        <a
          href={cta.externalHref}
          target="_blank"
          rel="external noopener noreferrer"
          class={cardClass(cta)}
        >
          {@render cardBody(cta)}
        </a>
      {:else}
        <a href={cta.href} class={cardClass(cta)}>
          {@render cardBody(cta)}
        </a>
      {/if}
    {/each}
  </div>
</div>
</section>

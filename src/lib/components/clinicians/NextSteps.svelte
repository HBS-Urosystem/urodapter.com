<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { nextSteps } from '$lib/content/clinicians';

  type Cta = (typeof nextSteps.ctas)[number];

  // The primary tier is `.accent-pill` (a flat solid fill), not the patient
  // page's scoped gradient: clinician teal drops white text under AA across a
  // gradient sweep at this size (design system §4).
  const cardClass = (cta: Cta) =>
    cta.tier === 'primary'
      ? 'group accent-pill transition-[background] rounded-2xl p-6 flex flex-col text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
      : 'group rounded-2xl surface-card p-6 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink)';
</script>

<!-- Card interior, shared by the on-site and off-site anchors below. -->
{#snippet cardBody(cta: Cta)}
  {@const primary = cta.tier === 'primary'}
  <span
    class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 {primary
      ? 'bg-white/20'
      : 'bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink)'}"
    aria-hidden="true"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={cta.icon} /></svg>
  </span>
  <h3 class="mt-4 font-semibold {primary ? '' : 'text-navy-950 dark:text-white'}">{cta.title}</h3>
  <p class="mt-1.5 text-sm leading-relaxed flex-1 text-pretty {primary ? 'text-white/85' : 'text-slate-600 dark:text-slate-300'}">
    {cta.body}
  </p>
  <span class="mt-4 inline-flex items-center gap-1.5 text-sm {primary ? 'font-semibold' : 'font-medium text-(--accent-ink)'}">
    {cta.linkLabel}{#if cta.externalHref}<span class="sr-only"> (opens in a new tab)</span>{/if}
    <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
  </span>
{/snippet}

<!-- Section 5 (0831 docx) — the three CTA tiers, one link each. The primary
     tier is `.accent-pill` (a flat solid fill), not the patient page's scoped
     gradient: clinician teal drops white text under AA across a gradient sweep
     at this size (design system §4). -->
<section aria-labelledby="next-steps-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
    {nextSteps.eyebrow}
  </p>
  <h2
    id="next-steps-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {nextSteps.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {nextSteps.intro}
  </p>

  <div use:reveal class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
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
</section>

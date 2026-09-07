<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { benefits } from '$lib/content/clinicians';
  import BenefitCard from '$lib/components/shared/BenefitCard.svelte';
</script>

<!-- Section 4 — the three docx benefit bullets as cards (client comment asked
     for the small icons used in the patient journey), plus the docx §1
     clinician-side benefit as a compact callout. -->
<section aria-labelledby="benefits-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
    {benefits.eyebrow}
  </p>
  <h2
    id="benefits-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)] max-w-3xl"
  >
    {benefits.heading}
  </h2>

  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each benefits.items as item (item.title)}
      <BenefitCard title={item.title} body={item.body} icon={item.icon} source={item.source} />
    {/each}
  </div>

  <div use:reveal class="mt-6 rounded-2xl surface-panel p-6 sm:p-7 flex items-start gap-4">
    <span
      class="w-12 h-12 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={benefits.timeSaving.icon} /></svg>
    </span>
    <div>
      <h3 class="font-semibold text-navy-950 dark:text-white">{benefits.timeSaving.title}</h3>
      <p class="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">{benefits.timeSaving.body}</p>
      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">{benefits.timeSaving.source}</p>
    </div>
  </div>
</section>

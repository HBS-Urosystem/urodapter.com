<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { proof } from '$lib/content/home';
  import StatCard from '$lib/components/shared/StatCard.svelte';
</script>

<!-- Section 2: the credibility numbers, deliberately deeper than the hero's
     four-item trust bar (which stays a glance, not a citation). -->
<section id="proof" aria-labelledby="proof-heading" class="max-w-7xl mx-auto px-5 sm:px-8 scroll-mt-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">{proof.eyebrow}</p>
  <h2
    id="proof-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {proof.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {proof.intro}
  </p>

  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each proof.stats as stat (stat.highlight)}
      <StatCard highlight={stat.highlight} rest={stat.rest} source={stat.source} icon={stat.icon} />
    {/each}
  </div>
</section>

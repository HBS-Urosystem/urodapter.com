<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { evidence, evidenceItems } from '$lib/content/patients';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import OutcomesChart from '$lib/components/shared/OutcomesChart.svelte';
  import ClinicianQuotes from './ClinicianQuotes.svelte';
  import ImagePlaceholder from '$lib/components/shared/ImagePlaceholder.svelte';
  import StatCard from '$lib/components/shared/StatCard.svelte';
</script>

<section aria-labelledby="evidence-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-patient dark:text-sky-300">
        {evidence.eyebrow}
      </p>
      <h2
        id="evidence-heading"
        class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
      >
        {evidence.heading}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
        {evidence.intro}
      </p>
    </div>
    <div class="w-full lg:w-72 shrink-0">
      <ImagePlaceholder description={evidence.image.description} />
    </div>
  </div>

  <!-- Stat snippets: first word highlighted (docx spec) -->
  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each evidence.stats as stat (stat.highlight)}
      <StatCard highlight={stat.highlight} rest={stat.rest} source={stat.source} icon={stat.icon} />
    {/each}
  </div>

  <!-- Chart, expert consensus and clinician quotes are three parallel answers
       to the section's question, so they are an AutoAccordion (design system
       §6a) rather than three stacked blocks. The quotes pane keeps the existing
       ClinicianQuotes slider: it is manual, it carries the disclaimer that has
       to travel with the quotes, and the accordion pauses the moment anyone
       touches it — but a slider inside a pane is a wrinkle worth revisiting. -->
  <div use:reveal class="mt-6">
    <AutoAccordion items={evidenceItems} controlLabel="the research findings">
      {#snippet panel(item)}
        {#if item.id === 'chart'}
          <!-- No heading/intro: the accordion header and body carry both. -->
          <OutcomesChart columns={evidence.chart.columns} source={evidence.chart.source} />
        {:else if item.id === 'consensus'}
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full">
            <p class="text-base leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">
              {evidence.consensus.body}
            </p>
            <p class="mt-5 text-xs text-slate-500 dark:text-slate-400">{evidence.consensus.source}</p>
          </div>
        {:else}
          <ClinicianQuotes quotes={evidence.clinicians.quotes} disclaimer={evidence.clinicians.disclaimer} />
        {/if}
      {/snippet}
    </AutoAccordion>
  </div>
</section>

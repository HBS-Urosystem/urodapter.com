<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { evidence } from '$lib/content/patients';
  import OutcomesChart from './OutcomesChart.svelte';
  import ClinicianQuotes from './ClinicianQuotes.svelte';
  import ImagePlaceholder from './ImagePlaceholder.svelte';
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
      <div class="rounded-2xl surface-card p-5 flex flex-col">
        <div class="flex items-center gap-3">
          <span
            class="w-10 h-10 rounded-full bg-(--color-patient-soft) dark:bg-sky-300/10 border border-patient/20 dark:border-sky-300/25 text-patient dark:text-sky-300 flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={stat.icon} /></svg>
          </span>
          <span class="font-display font-semibold text-2xl leading-none text-patient dark:text-sky-300">{stat.highlight}</span>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200 flex-1">{stat.rest}</p>
        <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">{stat.source}</p>
      </div>
    {/each}
  </div>

  <!-- Chart + expert consensus -->
  <div use:reveal class="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-start">
    <OutcomesChart
      heading={evidence.chart.heading}
      intro={evidence.chart.intro}
      columns={evidence.chart.columns}
      source={evidence.chart.source}
    />
    <div class="rounded-2xl surface-panel p-6 sm:p-8">
      <div class="flex items-center gap-3">
        <span
          class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-patient/20 dark:border-sky-300/25 text-patient dark:text-sky-300 flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={evidence.consensus.icon} /></svg>
        </span>
        <h3 class="font-semibold text-navy-950 dark:text-white leading-snug">{evidence.consensus.title}</h3>
      </div>
      <p class="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">
        {evidence.consensus.body}
      </p>
      <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">{evidence.consensus.source}</p>
    </div>
  </div>

  <div use:reveal class="mt-6">
    <ClinicianQuotes
      heading={evidence.clinicians.heading}
      quotes={evidence.clinicians.quotes}
      disclaimer={evidence.clinicians.disclaimer}
    />
  </div>
</section>

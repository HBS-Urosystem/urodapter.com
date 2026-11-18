<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { evidence, evidenceItems } from '$lib/content/patients';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import OutcomesChart from '$lib/components/shared/OutcomesChart.svelte';
  import ClinicianQuotes from './ClinicianQuotes.svelte';
  import researchImage from '$lib/assets/patients/research-urologist.jpg?enhanced';
  import StatCard from '$lib/components/shared/StatCard.svelte';
</script>

<!-- Canvas restyle 2026-11-18: light display heading, and the urologist photo
     in the arch crop beside it. -->
<section id="evidence" aria-labelledby="evidence-heading" class="max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(3.5rem,6vw,6rem)] scroll-mt-6">
  <div class="flex flex-wrap items-center gap-x-14 gap-y-8">
    <div class="flex-[1_1_26rem] min-w-0">
      <p class="eyebrow">{evidence.eyebrow}</p>
      <h2
        id="evidence-heading"
        class="mt-4 display-light"
      >
        {evidence.heading}
      </h2>
      <p class="mt-4 text-lg leading-relaxed text-(--ink-soft) max-w-3xl text-pretty">
        {evidence.intro}
      </p>
    </div>
    <enhanced:img
      src={researchImage}
      alt={evidence.imageAlt}
      sizes="(min-width: 1024px) 520px, 100vw"
      loading="lazy"
      class="flex-[1_1_22.5rem] min-w-0 max-w-[32.5rem] mx-auto w-full aspect-[16/10] object-cover object-[62%_0%] rounded-[999px_999px_2rem_2rem/60%_60%_2rem_2rem]"
    />
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

<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { evidence } from '$lib/content/clinicians';
  import StatCard from '$lib/components/shared/StatCard.svelte';
  import OutcomesChart from '$lib/components/shared/OutcomesChart.svelte';
</script>

<!-- Section 6 — "Safe and effective": the numbers, the real-world study, the
     publication list and the regulatory position. The publication list is the
     set already cited on this site; the client still has to supply the full one. -->
<section aria-labelledby="evidence-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
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

  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each evidence.stats as stat (stat.highlight)}
      <StatCard highlight={stat.highlight} rest={stat.rest} source={stat.source} icon={stat.icon} />
    {/each}
  </div>

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
          class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
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

  <div use:reveal class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
    <!-- Publications -->
    <div class="rounded-2xl surface-card p-6 sm:p-8">
      <div class="flex items-center gap-3">
        <span
          class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={evidence.publications.icon} /></svg>
        </span>
        <h3 class="font-semibold text-navy-950 dark:text-white">{evidence.publications.heading}</h3>
      </div>
      <ul class="mt-5 space-y-4">
        {#each evidence.publications.items as item (item.title)}
          <li class="border-l-2 border-(--accent-ink)/30 pl-4">
            <p class="text-sm font-medium leading-snug text-navy-950 dark:text-white text-pretty">{item.title}</p>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.meta}</p>
          </li>
        {/each}
      </ul>
      <a
        href={evidence.publications.href}
        class="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-ink) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink) rounded-sm"
      >
        {evidence.publications.linkLabel}
        <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
      </a>
    </div>

    <!-- Regulatory / compliance -->
    <div class="rounded-2xl surface-card p-6 sm:p-8">
      <div class="flex items-center gap-3">
        <span
          class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={evidence.approvals.icon} /></svg>
        </span>
        <h3 class="font-semibold text-navy-950 dark:text-white">{evidence.approvals.heading}</h3>
      </div>
      <ul class="mt-5 space-y-3">
        {#each evidence.approvals.items as item (item)}
          <li class="flex items-start gap-3">
            <svg class="w-4 h-4 mt-1 shrink-0 text-(--accent-ink)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            <span class="text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">{item}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

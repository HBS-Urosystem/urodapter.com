<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { evidence } from '$lib/content/clinicians';
  import DonutStat from '$lib/components/shared/DonutStat.svelte';

  const { series, realWorld, review } = evidence;
</script>

<!-- Section 2 (0831 docx) — "What the Clinical Evidence Shows": three named
     evidence blocks. 1) the published series as a row of large figures,
     2) the real-world study as the combined ring + bar visual the docx asks
     for, 3) the international review as a recognition callout. -->
<section aria-labelledby="clinical-evidence-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
    {evidence.eyebrow}
  </p>
  <h2
    id="clinical-evidence-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {evidence.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {evidence.intro}
  </p>

  <!-- 1 — Published clinical series: three large figures -->
  <div use:reveal class="mt-10 rounded-2xl surface-card p-6 sm:p-8">
    <div class="flex items-start gap-3">
      <span
        class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={series.icon} /></svg>
      </span>
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.15em] text-(--accent-ink)">{series.label}</p>
        <h3 class="mt-1.5 font-semibold text-navy-950 dark:text-white">{series.title}</h3>
      </div>
    </div>

    <dl class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-7">
      {#each series.figures as figure (figure.label)}
        <div class="sm:border-l sm:border-(--accent-ink)/20 sm:pl-5 sm:first:border-l-0 sm:first:pl-0">
          <dt class="font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none">
            {figure.value}
          </dt>
          <dd class="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
            {figure.label}
          </dd>
        </div>
      {/each}
    </dl>

    <div class="mt-8 pt-5 border-t border-slate-100 dark:border-white/10 space-y-1.5">
      {#each series.notes as note (note)}
        <p class="text-xs leading-relaxed text-slate-500 dark:text-slate-400 text-pretty">{note}</p>
      {/each}
      <p class="text-xs text-slate-500 dark:text-slate-400 pt-1.5">{series.source}</p>
    </div>
  </div>

  <div class="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-start">
    <!-- 2 — Real-world experience: continuation ring + "why patients continued" -->
    <div use:reveal class="rounded-2xl surface-card p-6 sm:p-8">
      <div class="flex items-start gap-3">
        <span
          class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={realWorld.icon} /></svg>
        </span>
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.15em] text-(--accent-ink)">{realWorld.label}</p>
          <h3 class="mt-1.5 font-semibold text-navy-950 dark:text-white">{realWorld.title}</h3>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-10 items-center">
        <DonutStat value={realWorld.ring.value} caption={realWorld.ring.caption} />

        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            {realWorld.bars.title}
          </h4>
          <ul class="mt-4 space-y-4">
            {#each realWorld.bars.rows as row (row.label)}
              <li>
                <div class="flex items-baseline justify-between gap-3 text-sm">
                  <span class="text-slate-700 dark:text-slate-200">{row.label}</span>
                  <span class="font-semibold tabular-nums text-navy-950 dark:text-white">{row.value}%</span>
                </div>
                <div class="mt-1.5 h-2 rounded-[4px] bg-slate-100 dark:bg-white/10" aria-hidden="true">
                  <div class="h-full rounded-r-[4px] bg-(--chart-continuing)" style="width: {row.value}%"></div>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <p class="mt-8 text-xs text-slate-500 dark:text-slate-400">{realWorld.source}</p>
    </div>

    <!-- 3 — International expert review -->
    <div use:reveal class="rounded-2xl surface-panel p-6 sm:p-8">
      <div class="flex items-start gap-3">
        <span
          class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={review.icon} /></svg>
        </span>
        <p class="text-xs font-semibold uppercase tracking-[0.15em] text-(--accent-ink) pt-2.5">{review.label}</p>
      </div>

      <h3 class="mt-6 font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.5rem,3vw,2rem)] leading-none">
        {review.title}
      </h3>
      <p class="mt-2.5 text-sm text-slate-600 dark:text-slate-300">{review.titleNote}</p>

      <p class="mt-6 text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">{review.body}</p>
      <p class="mt-6 text-xs text-slate-500 dark:text-slate-400">{review.source}</p>
    </div>
  </div>
</section>

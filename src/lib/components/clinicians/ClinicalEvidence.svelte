<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { evidence, evidenceItems } from '$lib/content/clinicians';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import DonutStat from '$lib/components/shared/DonutStat.svelte';

  const { series, realWorld, review } = evidence;
</script>

<!-- Section 2 (0831 docx) — "What the Clinical Evidence Shows": the same three
     named evidence blocks, now one at a time in an autonomous accordion
     (design system §6a) instead of three stacked cards. Each study's label is
     the header, its figures are the pane beside it, and every footnote and
     citation stays in the DOM — the section is shorter, not lighter. -->
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

  <div use:reveal class="mt-10">
    <AutoAccordion items={evidenceItems} controlLabel="the clinical evidence">
      {#snippet panel(item)}
        {#if item.id === 'series'}
          <!-- 1 — Published clinical series: three large figures -->
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full">
            <dl class="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-7">
              {#each series.figures as figure (figure.label)}
                <div class="sm:border-l sm:border-(--accent-ink)/20 sm:pl-5 sm:first:border-l-0 sm:first:pl-0">
                  <!-- Smaller than the old full-width card, and `leading-[1.05]`
                       rather than `leading-none`: "98% / 100%" wraps in a pane
                       this narrow, and none-leading collides the two lines. -->
                  <dt class="font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.05]">
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
        {:else if item.id === 'real-world'}
          <!-- 2 — Real-world experience: continuation ring + "why patients continued" -->
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full">
            <div class="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-10 items-center">
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
        {:else}
          <!-- 3 — International expert review -->
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full">
            <h4 class="font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.5rem,3vw,2rem)] leading-none">
              {review.title}
            </h4>
            <p class="mt-2.5 text-sm text-slate-600 dark:text-slate-300">{review.titleNote}</p>
            <p class="mt-6 text-xs text-slate-500 dark:text-slate-400">{review.source}</p>
          </div>
        {/if}
      {/snippet}
    </AutoAccordion>
  </div>
</section>

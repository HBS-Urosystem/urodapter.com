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
<!-- Canvas restyle 2026-11-18: a mist-15 band ruled as graph paper (48px), the
     "clinical" texture of the cool direction. -->
<section id="c-evidence" aria-labelledby="clinical-evidence-heading" class="scroll-mt-6 graph-paper border-y border-mist dark:border-white/10">
<div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)]">
  <p class="eyebrow rounded-[2px]!">{evidence.eyebrow}</p>
  <h2
    id="clinical-evidence-heading"
    class="mt-4 display-light"
  >
    {evidence.heading}
  </h2>
  <p class="mt-4 text-lg leading-relaxed text-(--ink-soft) max-w-3xl text-pretty">
    {evidence.intro}
  </p>

  <!-- Canvas (2026-11-18): from 960px all three blocks are visible at once —
       the series full width, then the real-world study and the expert review
       side by side (the review as the solid pine card); square 2px corners,
       the clinician's "cool" shape. Below 960px the same panes sit in the
       AutoAccordion (design system §6a), whose header carries the label. -->
  {#snippet label(text: string, onDark = false)}
    <p class="text-xs font-bold tracking-[0.14em] uppercase {onDark ? 'text-white' : 'text-(--accent-ink)'}">{text}</p>
  {/snippet}

  {#snippet pane(id: string, wide: boolean)}
    {#if id === 'series'}
      <article class="h-full flex flex-col rounded-[2px] bg-white ring-1 ring-inset ring-mist dark:bg-navy-900 dark:ring-white/10">
        <div class="px-8 pt-7 pb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-mist dark:border-white/10">
          <div class="flex flex-col gap-1.5">
            {#if wide}{@render label(series.label)}{/if}
            <h3 class="text-[28px] leading-tight font-light text-(--ink)">{series.title}</h3>
          </div>
          <p class="text-sm text-(--ink-soft)">{series.source}</p>
        </div>
        <dl class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13.75rem),1fr))]">
          {#each series.figures as figure, i (figure.label)}
            <div class="px-8 py-7 flex flex-col-reverse gap-2.5 {i ? 'shadow-[inset_1px_0_0_var(--color-mist)] dark:shadow-[inset_1px_0_0_rgb(255_255_255/0.1)]' : ''}">
              <dt class="text-[15px] text-(--ink-soft)">{figure.label}</dt>
              <dd class="text-[clamp(2.75rem,4.6vw,4rem)] leading-none font-light tracking-[-0.02em] tabular-nums {i === 1 ? 'text-(--accent-ink)' : 'text-(--ink)'}">{figure.value}</dd>
            </div>
          {/each}
        </dl>
        <div class="mt-auto px-8 pt-4 pb-6 border-t border-mist dark:border-white/10 flex flex-col gap-1 text-[13px] leading-normal text-(--ink-mute)">
          {#each series.notes as note (note)}<p class="text-pretty">{note}</p>{/each}
        </div>
      </article>
    {:else if id === 'real-world'}
      <article class="h-full flex flex-col gap-5.5 rounded-[2px] px-8 py-7 bg-white ring-1 ring-inset ring-mist dark:bg-navy-900 dark:ring-white/10">
        <div class="flex flex-col gap-1.5">
          {#if wide}{@render label(realWorld.label)}{/if}
          <h3 class="text-2xl leading-tight font-light text-(--ink)">{realWorld.title}</h3>
        </div>
        <DonutStat value={realWorld.ring.value} caption={realWorld.ring.caption} />
        <div class="pt-4.5 border-t border-mist dark:border-white/10">
          <h4 class="text-xs font-bold uppercase tracking-[0.14em] text-(--ink-mute)">{realWorld.bars.title}</h4>
          <ul class="mt-3 flex flex-col gap-3">
            {#each realWorld.bars.rows as row (row.label)}
              <li>
                <div class="flex items-baseline justify-between gap-3 text-sm">
                  <span class="text-(--ink-soft)">{row.label}</span>
                  <span class="font-semibold tabular-nums text-(--ink)">{row.value}%</span>
                </div>
                <div class="mt-1.5 h-2 rounded-[2px] bg-mist/55 dark:bg-white/10" aria-hidden="true">
                  <div class="h-full rounded-[2px] bg-(--chart-continuing)" style="width: {row.value}%"></div>
                </div>
              </li>
            {/each}
          </ul>
        </div>
        <p class="mt-auto text-[13px] text-(--ink-mute)">{realWorld.source}</p>
      </article>
    {:else}
      <article class="relative overflow-hidden h-full flex flex-col gap-4.5 rounded-[2px] px-8 py-7 bg-pine text-white dark:ring-1 dark:ring-white/10">
        <div aria-hidden="true" class="absolute right-0 top-0 w-[55%] h-[70%] bg-lagoon opacity-30 [clip-path:polygon(40%_0,100%_0,100%_100%)]"></div>
        {#if wide}<div class="relative">{@render label(review.label, true)}</div>{/if}
        <div class="relative flex flex-col gap-1.5">
          <h3 class="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] font-light tracking-[-0.02em]">{review.title}</h3>
          <p>{review.titleNote}</p>
        </div>
        <p class="relative text-[17px] leading-relaxed text-pretty">{review.body}</p>
        <p class="relative mt-auto text-[13px] text-mist">{review.source}</p>
      </article>
    {/if}
  {/snippet}

  <div use:reveal class="mt-10 hidden min-[960px]:grid grid-cols-2 gap-5">
    <div class="col-span-2">{@render pane('series', true)}</div>
    {@render pane('real-world', true)}
    {@render pane('review', true)}
  </div>

  <div use:reveal class="mt-10 min-[960px]:hidden">
    <AutoAccordion items={evidenceItems} controlLabel="the clinical evidence">
      {#snippet panel(item)}
        {@render pane(item.id, false)}
      {/snippet}
    </AutoAccordion>
  </div>
</div>
</section>

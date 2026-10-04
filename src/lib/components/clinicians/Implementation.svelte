<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { implementation, implementationItems } from '$lib/content/clinicians';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';

  const { indications, workflow, learning } = implementation;

  // check (heroicons outline) — the docx's ✓ list marker
  const checkIcon = 'm4.5 12.75 6 6 9-13.5';
</script>

<!-- Section 4 (0831 docx) — implementation. The docx's three blocks (the
     indications the reader already treats, the workflow checklist and the
     learning path) are the three accordion items: each block title already
     reads as a claim, and the pane beside it is the answer. -->
<section aria-labelledby="implementation-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="eyebrow">{implementation.eyebrow}</p>
  <h2
    id="implementation-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {implementation.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {implementation.intro}
  </p>

  <div use:reveal class="mt-10">
    <AutoAccordion items={implementationItems} controlLabel="the implementation steps">
      {#snippet panel(item)}
        {#if item.id === 'indications'}
          <!-- Block 1 — suitable indications. Icon chips in one panel rather
               than five separate tiles: inside a pane, per-item cards would
               stack surfaces (design system §4). -->
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full">
            <ul class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
              {#each indications.items as indication (indication.label)}
                <li class="flex flex-col items-center text-center gap-3">
                  <span
                    class="w-12 h-12 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={indication.icon} /></svg>
                  </span>
                  <span class="text-sm font-medium leading-snug text-slate-700 dark:text-slate-200 text-balance">{indication.label}</span>
                </li>
              {/each}
            </ul>
          </div>
        {:else if item.id === 'workflow'}
          <!-- Block 2 — workflow checklist -->
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full">
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {#each workflow.items as workflowItem (workflowItem)}
                <li class="flex items-start gap-3">
                  <span
                    class="w-6 h-6 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0 mt-px"
                    aria-hidden="true"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={checkIcon} /></svg>
                  </span>
                  <span class="text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">{workflowItem}</span>
                </li>
              {/each}
            </ul>
          </div>
        {:else}
          <!-- Block 3 — the three-step learning path -->
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full">
            <ol class="space-y-3">
              {#each learning.steps as step, i (step.label)}
                <li>
                  <div class="flex items-center gap-4">
                    <span
                      class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={step.icon} /></svg>
                    </span>
                    <span class="text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">
                      <span class="font-semibold text-navy-950 dark:text-white tabular-nums">{i + 1}</span>
                      <span class="mx-2 text-(--accent-ink)/40" aria-hidden="true">·</span>{step.label}
                    </span>
                  </div>
                  {#if i < learning.steps.length - 1}
                    <!-- The connector sits in the icon's own column (`w-10`, the icon
                         circle's width) and centres inside it, so it lines up with the
                         circle above and below rather than with the circle's left edge. -->
                    <span class="my-1 flex w-10 justify-center text-(--accent-ink)/45" aria-hidden="true">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
                    </span>
                  {/if}
                </li>
              {/each}
            </ol>

            <ul class="mt-7 pt-5 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-x-2 gap-y-2">
              {#each learning.resources as resource (resource)}
                <li class="rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 px-3 py-1 text-xs font-medium text-(--accent-ink)">
                  {resource}
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      {/snippet}
    </AutoAccordion>
  </div>
</section>

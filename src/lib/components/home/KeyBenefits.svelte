<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { keyBenefits } from '$lib/content/home';

  // check (heroicons outline) — the tick that came back from the old hero cards
  const checkIcon = 'm4.5 12.75 6 6 9-13.5';
</script>

<!-- Section 1 (0831 page_content docx) — the key benefits, one card per
     audience. The two testimonials sat here as a third column from 2026-09-08
     until they were moved back into the hero (client direction 2026-09-13) —
     they are not duplicated here.

     The docx headline is split across the two card titles, so each card owns its
     half and no section headline repeats it; that is why the section is labelled
     by both card headings rather than by an <h2> of its own. Inside each card:
     the audience's problem (the docx's "why heroes care" line), then what
     changes, as ticks. -->
<section
  aria-labelledby="benefits-patients benefits-clinicians"
  class="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20"
>
  <div use:reveal class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
    {#each keyBenefits.columns as column (column.id)}
      <div class={column.accentClass}>
        <div class="rounded-2xl surface-card p-6 sm:p-7 h-full flex flex-col">
          <div class="flex items-start gap-3">
            <span
              class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={column.icon} /></svg>
            </span>
            <h2
              id="benefits-{column.id}"
              class="font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.25rem,2vw,1.6rem)]"
            >
              {column.title}
            </h2>
          </div>

          <p class="mt-5 text-base leading-snug text-slate-600 dark:text-slate-300 text-pretty">
            {column.problem}
          </p>

          <ul class="mt-6 pt-6 border-t border-slate-100 dark:border-white/10 space-y-2">
            {#each column.items as item (item)}
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 shrink-0 mt-px text-(--accent-ink)"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                ><path stroke-linecap="round" stroke-linejoin="round" d={checkIcon} /></svg>
                <span class="text-base leading-snug text-slate-700 dark:text-slate-200 text-pretty">{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
</section>

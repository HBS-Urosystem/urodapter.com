<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { keyBenefits, quotes } from '$lib/content/home';

  // check (heroicons outline) — the tick that came back from the old hero cards
  const checkIcon = 'm4.5 12.75 6 6 9-13.5';
  // check-badge (heroicons outline) — the trust pill's mark
  const badgeIcon =
    'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z';
</script>

<!-- Section 1 (0831 page_content docx) — the key benefits, one card per
     audience, with the two testimonials as a third column beside them (client
     direction 2026-09-08: moving them out of the hero is what lets the hero end
     just below the regulatory line).

     The docx headline is split across the two card titles, so each card owns its
     half and no section headline repeats it; that is why the section is labelled
     by both card headings rather than by an <h2> of its own. Inside each card:
     the audience's problem (the docx's "why heroes care" line), then what
     changes, as ticks. -->
<section
  aria-labelledby="benefits-patients benefits-clinicians"
  class="max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20"
>
  <div use:reveal class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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

          <p class="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
            {column.problem}
          </p>

          <ul class="mt-6 pt-6 border-t border-slate-100 dark:border-white/10 space-y-3.5">
            {#each column.items as item (item)}
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 shrink-0 mt-0.5 text-(--accent-ink)"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                ><path stroke-linecap="round" stroke-linejoin="round" d={checkIcon} /></svg>
                <span class="text-base leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}

    <!-- Third column: the two docx testimonials. Spans both card columns at md,
         where three columns would squeeze the serif card titles. -->
    <div class="md:col-span-2 lg:col-span-1">
      <div class="rounded-2xl surface-panel p-6 sm:p-7 h-full flex flex-col">
        <p class="inline-flex items-center gap-2 text-xs font-semibold text-(--accent-ink)">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d={badgeIcon} /></svg>
          {quotes.pill}
        </p>

        <div class="mt-5 space-y-5 divide-y divide-slate-200/70 dark:divide-white/10">
          {#each quotes.items as quote (quote.author)}
            <blockquote class="pt-5 first:pt-0">
              <p class="text-sm leading-relaxed text-navy-900 dark:text-slate-100 text-pretty">
                &ldquo;{quote.quote}&rdquo;
              </p>
              <footer class="mt-3 text-xs">
                <span class="font-semibold text-navy-950 dark:text-white">{quote.author}</span>
                {#if quote.subAuthor}
                  <span class="block mt-0.5 text-slate-500 dark:text-slate-400">{quote.subAuthor}</span>
                {/if}
              </footer>
            </blockquote>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

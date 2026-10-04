<script lang="ts">
  import { heroAudienceCards } from '$lib/content/home';

  let { class: className = '' }: { class?: string } = $props();

  // heroicons outline — check, arrow-right
  const checkIcon = 'm4.5 12.75 6 6 9-13.5';
  const arrowRightIcon = 'M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3';
</script>

<!-- The two audience cards on the hero photo (owner direction 2026-09-27).
     The whole card is the link, via a stretched ::after on the footer anchor —
     the h2 stays a heading, not link text. No `use:reveal`: above the fold.

     The grid is intrinsic, not stepped: two columns whenever each card gets at
     least 16.5rem, one below that — so they pair up from ~580px viewports and in
     the hero's right-hand column at 1024px alike. 16.5rem is measured: below
     ~260px "Clinical use & evidence" wraps beside its arrow chip and the two
     footers stop lining up. The wrapper stretches to the row and
     the <article> fills it (`h-full`), so both cards share one height and the
     footers (with their hairlines) sit level at the bottom via `mt-auto`. -->
<div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,16.5rem),1fr))] {className}">
  {#each heroAudienceCards as card (card.id)}
    <div class="{card.accentClass} flex flex-col">
      <article
        aria-labelledby="benefits-{card.id}"
        class="group relative flex flex-col h-full rounded-2xl border backdrop-blur-xl transition-colors
               p-[clamp(1.25rem,1rem+0.6vw,1.5rem)]
               bg-white/85 border-(--accent-ink)/20 shadow-xl shadow-navy-950/10 hover:border-(--accent-ink)/45
               dark:bg-navy-900/75 dark:border-(--accent-ink)/25 dark:shadow-black/30 dark:hover:border-(--accent-ink)/45"
      >
        <div class="flex items-center gap-3">
          <span
            class="w-10 h-10 rounded-full bg-(--accent-soft) text-(--accent-ink) flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
              ><path stroke-linecap="round" stroke-linejoin="round" d={card.icon} /></svg
            >
          </span>
          <p class="eyebrow">{card.eyebrow}</p>
        </div>

        <h2
          id="benefits-{card.id}"
          class="mt-4 font-display font-semibold leading-tight text-balance text-[clamp(1.25rem,1.7vw,1.5rem)] text-navy-950 dark:text-white"
        >
          {card.title}
        </h2>

        <!-- `mb-5` is the floor under the ticks when `mt-auto` has no slack. -->
        <ul class="mt-4 mb-5 space-y-2 text-[15px] leading-snug text-slate-700 dark:text-slate-200">
          {#each card.items as item (item)}
            <li class="flex items-start gap-2.5">
              <svg
                class="w-4 h-4 mt-0.5 shrink-0 text-(--brand-ink)"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d={checkIcon} /></svg
              >
              <span class="text-pretty">{item}</span>
            </li>
          {/each}
        </ul>

        <!-- The arrow chip lives INSIDE the anchor. As a sibling it was not
             clickable: its hover `translate-x` made it a stacking layer above
             the stretched ::after, so a click on the arrow hit nothing
             (fixed 2026-09-29). -->
        <div class="mt-auto pt-4 border-t border-navy-950/10 dark:border-white/10">
          <a
            href={card.href}
            class="flex items-center justify-between gap-3 text-[15px] font-semibold text-navy-950 dark:text-white
                   after:absolute after:inset-0 after:rounded-2xl
                   focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2
                   focus-visible:after:outline-(--brand-ink)"
          >
            {card.linkLabel}
            <span
              aria-hidden="true"
              class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 accent-pill text-white
                     transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                ><path stroke-linecap="round" stroke-linejoin="round" d={arrowRightIcon} /></svg
              >
            </span>
          </a>
        </div>
      </article>
    </div>
  {/each}
</div>

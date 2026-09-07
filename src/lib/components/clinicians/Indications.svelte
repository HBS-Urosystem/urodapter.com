<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { indications } from '$lib/content/clinicians';
</script>

<!-- Section 5 — five conditions as icon chips (client comment: "small icons
     for the indications"), and the closing docx paragraph in its own box
     ("Ebből külön dobozt csinálnék"). Five chips is one more than the shared
     IndicationsStrip is designed for, so they get their own grid. -->
<section aria-labelledby="indications-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
    {indications.eyebrow}
  </p>
  <h2
    id="indications-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)] max-w-3xl"
  >
    {indications.heading}
  </h2>

  <ul use:reveal class="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
    {#each indications.items as item (item.label)}
      <li class="rounded-2xl surface-card p-5 flex flex-col items-center text-center gap-3">
        <span
          class="w-12 h-12 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg>
        </span>
        <span class="text-sm font-medium leading-snug text-slate-700 dark:text-slate-200 text-balance">{item.label}</span>
      </li>
    {/each}
  </ul>

  <div use:reveal class="mt-6 rounded-2xl surface-panel p-6 sm:p-7 flex items-start gap-4">
    <span
      class="w-12 h-12 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={indications.noteIcon} /></svg>
    </span>
    <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-200 max-w-4xl text-pretty">
      {indications.note}
    </p>
  </div>
</section>

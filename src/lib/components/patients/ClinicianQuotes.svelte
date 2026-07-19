<script lang="ts">
  type Quote = { quote: string; author: string; org: string };

  let {
    heading,
    quotes,
    disclaimer,
  }: { heading: string; quotes: Quote[]; disclaimer: string } = $props();

  let index = $state(0);

  function prev() {
    index = (index - 1 + quotes.length) % quotes.length;
  }
  function next() {
    index = (index + 1) % quotes.length;
  }
</script>

<!-- Manual slider only — no auto-advance (calm register; the docx offers
     either). All quotes are stacked in one grid cell so the box height fits
     the longest quote and never jumps between slides. -->
<div class="rounded-2xl bg-(--color-patient-soft) dark:bg-white/[0.05] border border-slate-200/70 dark:border-white/10 p-6 sm:p-10">
  <h3 class="font-semibold text-navy-950 dark:text-white">{heading}</h3>

  <div class="mt-6 grid" aria-live="polite">
    {#each quotes as q, i (q.author)}
      <blockquote
        class="col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none {i === index
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'}"
        aria-hidden={i !== index}
      >
        <p class="text-base sm:text-lg leading-relaxed text-navy-900 dark:text-slate-100 text-pretty">
          &ldquo;{q.quote}&rdquo;
        </p>
        <footer class="mt-4 text-sm">
          <span class="font-semibold text-navy-950 dark:text-white">{q.author}</span>
          <span class="block mt-0.5 text-xs text-slate-500 dark:text-slate-400">{q.org}</span>
        </footer>
      </blockquote>
    {/each}
  </div>

  <div class="mt-6 flex items-center justify-between">
    <div class="flex items-center gap-2" role="group" aria-label="Choose quote">
      {#each quotes as q, i (q.author)}
        <button
          onclick={() => (index = i)}
          aria-label="Show quote {i + 1} of {quotes.length}"
          aria-current={i === index}
          class="w-2.5 h-2.5 rounded-full transition-colors {i === index
            ? 'bg-patient dark:bg-sky-300'
            : 'bg-slate-300 dark:bg-white/25 hover:bg-slate-400 dark:hover:bg-white/40'}"
        ></button>
      {/each}
    </div>
    <div class="flex items-center gap-2">
      <button
        onclick={prev}
        aria-label="Previous quote"
        class="w-9 h-9 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 text-navy-950 dark:text-white flex items-center justify-center hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patient dark:focus-visible:ring-sky-300"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
      </button>
      <button
        onclick={next}
        aria-label="Next quote"
        class="w-9 h-9 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 text-navy-950 dark:text-white flex items-center justify-center hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patient dark:focus-visible:ring-sky-300"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      </button>
    </div>
  </div>

  <p class="mt-5 text-xs text-slate-500 dark:text-slate-400">{disclaimer}</p>
</div>

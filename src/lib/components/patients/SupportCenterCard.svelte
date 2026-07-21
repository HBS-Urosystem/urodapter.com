<script lang="ts">
  import type { ResolvedPathname } from '$app/types';

  let {
    heading,
    body,
    linkLabel,
    href,
    variant = 'solid',
  }: {
    heading: string;
    body: string;
    linkLabel: string;
    href: ResolvedPathname;
    variant?: 'solid' | 'tint';
  } = $props();

  // book-open (heroicons)
  const bookIcon =
    'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
</script>

{#if variant === 'solid'}
  <!-- Bold primary-colour CTA band (white text on the patient accent) -->
  <div class="rounded-2xl surface-solid p-6 flex items-start gap-4 text-white">
    <span class="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0" aria-hidden="true">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={bookIcon} /></svg>
    </span>
    <div>
      <h3 class="font-semibold">{heading}</h3>
      <p class="mt-1.5 text-sm leading-relaxed text-white/85">{body}</p>
      <a
        {href}
        class="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
      >
        {linkLabel}
        <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
{:else}
  <div class="rounded-2xl surface-panel p-6 flex items-start gap-4">
    <span
      class="w-12 h-12 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 text-patient dark:text-sky-300 flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={bookIcon} /></svg>
    </span>
    <div>
      <h3 class="font-semibold text-navy-950 dark:text-white">{heading}</h3>
      <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
      <a
        {href}
        class="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-patient dark:text-sky-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patient dark:focus-visible:ring-sky-300 rounded-sm"
      >
        {linkLabel}
        <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
{/if}

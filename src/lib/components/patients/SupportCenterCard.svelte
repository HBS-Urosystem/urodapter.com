<script lang="ts">
  import type { ResolvedPathname } from '$app/types';

  let {
    heading,
    body,
    linkLabel,
    href,
  }: { heading: string; body: string; linkLabel: string; href: ResolvedPathname } = $props();
</script>

<div class="rounded-2xl bg-(--color-patient-soft) dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/15 p-6 flex items-start gap-4">
  <span
    class="w-12 h-12 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 text-patient dark:text-sky-300 flex items-center justify-center shrink-0"
    aria-hidden="true"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  </span>
  <div>
    <h3 class="font-semibold text-navy-950 dark:text-white">{heading}</h3>
    <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
    <a
      href={href}
      class="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-patient dark:text-sky-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patient dark:focus-visible:ring-sky-300 rounded-sm"
    >
      {linkLabel}
      <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
    </a>
  </div>
</div>

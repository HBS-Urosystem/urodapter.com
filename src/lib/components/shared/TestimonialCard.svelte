<script lang="ts">
  import type { ResolvedPathname } from '$app/types';

  let {
    theme,
    icon,
    quote,
    author,
    meta,
    linkLabel = undefined,
    href = undefined,
  }: {
    theme: string;
    icon: string;
    quote: string;
    author: string;
    meta: string;
    // Optional: the clinician page shows a grid of quotes with one shared
    // "read all testimonials" band instead of a link per card.
    linkLabel?: string;
    href?: ResolvedPathname;
  } = $props();
</script>

<!-- Theme chip + label deliberately rhyme with BenefitCard (Section 3) — the
     docx asks the testimonial theme labels to visually fit the benefit cards. -->
<div class="rounded-2xl surface-card p-5 flex flex-col">
  <div class="flex items-center gap-3">
    <span
      class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={icon} /></svg>
    </span>
    <h3 class="text-xs font-semibold uppercase tracking-[0.15em] text-(--accent-ink) leading-snug">{theme}</h3>
  </div>

  <blockquote class="mt-4 flex-1">
    <p class="text-sm leading-relaxed text-navy-900 dark:text-slate-100 text-pretty">&ldquo;{quote}&rdquo;</p>
    <footer class="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 text-sm">
      <span class="font-semibold text-navy-950 dark:text-white">{author}</span>
      <span class="block mt-0.5 text-xs text-slate-500 dark:text-slate-400">{meta}</span>
    </footer>
  </blockquote>

  {#if href && linkLabel}
    <a
      {href}
      class="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--brand-ink) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-ink) rounded-sm"
    >
      {linkLabel}
      <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
    </a>
  {/if}
</div>

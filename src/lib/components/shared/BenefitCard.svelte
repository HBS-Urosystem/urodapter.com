<script lang="ts">
  // `source` is optional: a clinical claim on a card needs its citation line
  // (design system §9) — the patient-page cards carry none.
  let {
    title,
    body,
    icon,
    source = undefined,
  }: { title: string; body: string; icon: string; source?: string } = $props();
</script>

<!-- The icon-chip + title treatment here is the shared vocabulary for the
     Section 4 testimonial theme labels — keep them visually in sync. -->
<div class="rounded-2xl surface-card p-5 flex flex-col">
  <div class="flex items-center gap-3">
    <span
      class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={icon} /></svg>
    </span>
    <h3 class="font-semibold text-sm text-navy-950 dark:text-white leading-snug">{title}</h3>
  </div>
  <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 flex-1">{body}</p>
  {#if source}
    <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">{source}</p>
  {/if}
</div>

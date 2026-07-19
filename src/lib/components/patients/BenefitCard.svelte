<script lang="ts">
  let { title, body, icon }: { title: string; body: string; icon: string } = $props();
</script>

<!-- The icon-chip + title treatment here is the shared vocabulary for the
     Section 4 testimonial theme labels — keep them visually in sync. -->
<div class="rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 p-5">
  <div class="flex items-center gap-3">
    <span
      class="w-10 h-10 rounded-full bg-(--color-patient-soft) dark:bg-sky-300/10 border border-patient/20 dark:border-sky-300/25 text-patient dark:text-sky-300 flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={icon} /></svg>
    </span>
    <h3 class="font-semibold text-sm text-navy-950 dark:text-white leading-snug">{title}</h3>
  </div>
  <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
</div>

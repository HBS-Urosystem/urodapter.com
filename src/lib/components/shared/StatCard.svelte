<script lang="ts">
  let {
    highlight,
    rest,
    source,
    icon,
  }: { highlight: string; rest: string; source?: string; icon: string } = $props();
</script>

<!-- Stat snippet: serif highlight (a number or short phrase) + body + citation.
     Accent comes from the surrounding .accent-* scope, so the same card reads
     blue on the patient page and teal/purple in a persona section. -->
<div class="rounded-2xl surface-card p-5 flex flex-col">
  <div class="flex items-center gap-3">
    <span
      class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={icon} /></svg>
    </span>
    <span class="font-display font-semibold text-2xl leading-none text-(--accent-ink)">{highlight}</span>
  </div>
  <p class="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200 flex-1">{rest}</p>
  {#if source}
    <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">{source}</p>
  {/if}
</div>

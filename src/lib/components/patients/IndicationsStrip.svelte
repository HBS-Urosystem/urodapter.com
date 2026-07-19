<script lang="ts">
  let {
    text,
    items,
  }: { text: string; items: { label: string; icon: string }[] } = $props();
</script>

<div class="rounded-2xl bg-(--color-patient-soft) dark:bg-white/[0.05] border border-slate-200/70 dark:border-white/10 p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-6 items-center">
  <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-300 max-w-2xl text-pretty">{text}</p>

  <ul class="grid grid-cols-2 sm:flex sm:items-start gap-x-8 gap-y-5">
    {#each items as item (item.label)}
      <li class="flex flex-col items-center gap-2 text-center">
        <span
          class="w-11 h-11 rounded-full bg-white dark:bg-navy-800 border border-patient/20 dark:border-sky-300/25 text-patient dark:text-sky-300 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg>
        </span>
        <span class="text-xs font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
      </li>
    {/each}
  </ul>
</div>

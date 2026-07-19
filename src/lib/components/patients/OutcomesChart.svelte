<script lang="ts">
  type Row = { label: string; value: number };
  type Column = { title: string; series: 'trying' | 'continuing'; rows: Row[] };

  let {
    heading,
    intro,
    columns,
    source,
  }: { heading: string; intro: string; columns: Column[]; source: string } = $props();
</script>

<!-- Two single-series labeled-bar lists on a shared 0–100% scale. Series colors
     are the validated chart tokens (--chart-trying / --chart-continuing,
     dark-mode steps included). Every row carries its label + value as real
     text, so the bars are decoration over an accessible list. -->
<div class="rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 p-6 sm:p-8">
  <h3 class="font-semibold text-navy-950 dark:text-white">{heading}</h3>
  <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">{intro}</p>

  <div class="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
    {#each columns as column (column.title)}
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
          {column.title}
        </h4>
        <ul class="mt-4 space-y-4">
          {#each column.rows as row (row.label)}
            <li>
              <div class="flex items-baseline justify-between gap-3 text-sm">
                <span class="text-slate-700 dark:text-slate-200">{row.label}</span>
                <span class="font-semibold tabular-nums text-navy-950 dark:text-white">{row.value}%</span>
              </div>
              <div class="mt-1.5 h-2 rounded-[4px] bg-slate-100 dark:bg-white/10" aria-hidden="true">
                <div
                  class="h-full rounded-r-[4px] {column.series === 'trying' ? 'bg-(--chart-trying)' : 'bg-(--chart-continuing)'}"
                  style="width: {row.value}%"
                ></div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <p class="mt-7 text-xs text-slate-500 dark:text-slate-400">{source}</p>
</div>

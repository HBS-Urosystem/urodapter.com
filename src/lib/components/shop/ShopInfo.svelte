<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { shop } from '$lib/content/shop';

  const { info } = shop;
  const tables = [info.shipping, info.delivery];

  const cardClass =
    'rounded-[20px] p-[clamp(1.375rem,2.6vw,2rem)] flex flex-col gap-3.5 ' +
    'bg-mist/15 ring-1 ring-inset ring-mist/55 dark:bg-white/5 dark:ring-white/10';
  const chipClass =
    'grid place-items-center size-11 shrink-0 rounded-[14px] bg-mist/55 text-navy-900 dark:bg-white/10 dark:text-mist';
  const linkCardClass =
    'group flex items-center gap-4 min-h-11 px-6 py-5 rounded-[20px] ring-1 ring-inset text-(--ink) transition-colors ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)';
</script>

{#snippet icon(d: string)}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-[22px]">
    <path {d} />
  </svg>
{/snippet}

<!-- "Shipping, delivery and your rights" (canvas "Webshop" board). The right of
     withdrawal and "Manage my orders" share one card: the button is how an
     order is withdrawn. Below, two equal link cards — the Support Center and,
     in place of the old B2B text, "For distributors" (task list rows 4–5). -->
<section aria-labelledby="ship-h" class="bg-white dark:bg-navy-950">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 id="ship-h" class="display-light">{info.heading}</h2>
      <p class="max-w-2xl text-lg leading-relaxed text-(--ink-soft)">{info.intro}</p>
    </div>

    <div use:reveal class="grid gap-5 items-stretch grid-cols-[repeat(auto-fit,minmax(min(100%,21.25rem),1fr))]">
      {#each tables as table (table.heading)}
        <div class={cardClass}>
          <span aria-hidden="true" class={chipClass}>{@render icon(table.icon)}</span>
          <h3 class="text-[21px] leading-tight font-semibold text-(--ink)">{table.heading}</h3>
          <dl class="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 leading-snug">
            {#each table.rows as row (row.label)}
              <dt class="text-(--ink-soft)">{row.label}</dt>
              <dd class="font-bold text-(--ink) text-right whitespace-nowrap">{row.value}</dd>
            {/each}
          </dl>
          <p class="text-[15px] leading-normal text-(--ink-mute)">{table.note}</p>
        </div>
      {/each}

      <div class={cardClass}>
        <span aria-hidden="true" class={chipClass}>{@render icon(info.withdrawal.icon)}</span>
        <h3 class="text-[21px] leading-tight font-semibold text-(--ink)">{info.withdrawal.heading}</h3>
        <p class="leading-relaxed text-(--ink-soft)">{info.withdrawal.body}</p>
        <p class="text-[15px] leading-normal text-(--ink-mute)">{info.withdrawal.note}</p>
        <a
          href={info.withdrawal.link.href}
          target="_blank"
          rel="external noopener noreferrer"
          class="mt-auto self-start inline-flex items-center gap-2 min-h-12 px-[22px] rounded-full font-bold transition-colors
                 ring-[1.5px] ring-inset ring-navy-900 text-navy-900 hover:bg-navy-900/5
                 dark:ring-white/70 dark:text-white dark:hover:bg-white/10
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
        >
          {info.withdrawal.link.label} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>

    <div use:reveal class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,26.25rem),1fr))]">
      <a
        href={info.questions.href}
        class="{linkCardClass} ring-mist/85 hover:bg-mist/15 dark:ring-white/15 dark:hover:bg-white/5"
      >
        <span aria-hidden="true" class="grid place-items-center size-11 shrink-0 rounded-[14px] bg-mist/35 text-navy-900 dark:bg-white/10 dark:text-mist">
          {@render icon(info.questions.icon)}
        </span>
        <span class="flex-1 flex flex-col gap-0.5">
          <strong class="text-lg">{info.questions.title}</strong>
          <span class="text-[15px] text-(--ink-mute)">{info.questions.body}</span>
        </span>
        <span aria-hidden="true" class="text-lg transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
      </a>

      <a
        href={info.distributors.href}
        class="accent-distributor {linkCardClass} ring-lilac/45 hover:bg-lilac/10 dark:ring-lilac/30 dark:hover:bg-lilac/10"
      >
        <span aria-hidden="true" class="grid place-items-center size-11 shrink-0 rounded-[14px] bg-(--accent-soft) text-(--accent-ink)">
          {@render icon(info.distributors.icon)}
        </span>
        <span class="flex-1 text-lg font-bold">{info.distributors.title}</span>
        <span aria-hidden="true" class="text-lg text-(--accent-ink) transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
      </a>
    </div>
  </div>
</section>

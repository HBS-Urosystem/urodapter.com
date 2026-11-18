<script lang="ts">
  import { testimonials } from '$lib/content/support';

  type TabKey = 'patients' | 'professionals';
  const tabs: TabKey[] = ['patients', 'professionals'];
  let active = $state<TabKey>('patients');
  let expanded = $state(false);
  const group = $derived(testimonials[active]);

  function select(key: TabKey) {
    active = key;
    expanded = false;
  }

  // Arrow keys move between the two tabs (WAI-ARIA tabs pattern).
  function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = tabs[(tabs.indexOf(active) + 1) % tabs.length];
    select(next);
    document.getElementById(`tab-${next}`)?.focus();
  }
</script>

<!-- "Testimonials" (canvas board 1/2): patients and professionals as two tabs
     (patients navy, professionals pine). Each tab opens collapsed — about
     1000px of quotes, faded — with a show-all toggle. -->
<section id="experience" aria-labelledby="experience-h" class="scroll-mt-6 bg-white dark:bg-navy-950">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 id="experience-h" class="display-light">{testimonials.heading}</h2>
      <p class="max-w-3xl text-lg leading-relaxed text-(--ink-soft) text-pretty">{testimonials.intro}</p>
    </div>

    <div role="tablist" aria-label={testimonials.tabsLabel} tabindex="-1" onkeydown={onKeydown} class="self-start inline-flex gap-1 p-1 rounded-full ring-1 ring-inset ring-mist/85 dark:ring-white/15">
      {#each tabs as key (key)}
        {@const selected = active === key}
        <button
          type="button"
          role="tab"
          id="tab-{key}"
          aria-controls="panel-{key}"
          aria-selected={selected}
          tabindex={selected ? 0 : -1}
          onclick={() => select(key)}
          class="inline-flex items-center gap-2 min-h-11 px-5 rounded-full font-semibold transition-colors
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)
                 {selected
            ? key === 'patients' ? 'bg-navy-900 text-white dark:bg-cerulean dark:text-navy-950' : 'bg-pine text-white dark:bg-aqua dark:text-navy-950'
            : 'text-(--ink) hover:bg-mist/35 dark:hover:bg-white/10'}"
        >
          {testimonials[key].tab}
          <span class="text-sm opacity-80 tabular-nums">{testimonials[key].items.length}</span>
        </button>
      {/each}
    </div>

    <div>
      <div id="clip-{active}" class="relative {expanded ? '' : 'max-h-[1000px] overflow-hidden'}">
        <div role="tabpanel" id="panel-{active}" aria-labelledby="tab-{active}" class="columns-1 md:columns-2 xl:columns-3 gap-5">
          {#each group.items as item (item.name + item.details.join())}
            <figure class="relative mb-5 break-inside-avoid rounded-[20px] p-6 bg-mist/15 ring-1 ring-inset ring-mist/55 dark:bg-white/5 dark:ring-white/10">
              <span aria-hidden="true" class="block text-5xl leading-none font-semibold {active === 'patients' ? 'text-cerulean' : 'text-aqua'}">“</span>
              <blockquote class="mt-1 flex flex-col gap-3 leading-relaxed text-(--ink-soft)">
                {#each item.paras as para, i (i)}<p>{para}</p>{/each}
              </blockquote>
              <figcaption class="mt-4 flex flex-col text-sm">
                <span class="font-bold text-(--ink)">{item.name}</span>
                {#each item.details as detail (detail)}<span class="text-(--ink-mute)">{detail}</span>{/each}
              </figcaption>
            </figure>
          {/each}
        </div>
        {#if !expanded}
          <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-white dark:to-navy-950"></div>
        {/if}
      </div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="clip-{active}"
        onclick={() => (expanded = !expanded)}
        class="mt-4 inline-flex items-center gap-2 min-h-12 px-5 rounded-full font-bold ring-[1.5px] ring-inset ring-navy-900 text-navy-900 hover:bg-navy-900/5
               dark:ring-white/70 dark:text-white dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
      >
        {expanded ? testimonials.showFewer : group.showAll}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
          class="size-4 transition-transform motion-reduce:transition-none {expanded ? 'rotate-180' : ''}"><path d={testimonials.chevron} /></svg>
      </button>
    </div>
  </div>
</section>

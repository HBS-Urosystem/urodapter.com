<script lang="ts" module>
  export type AutoAccordionItem = {
    /** Stable key; also seeds the header/panel id pair. */
    id: string;
    /** The header line. Sans, one short line — serif is display headlines only. */
    title: string;
    /** The sentence revealed when the item opens. */
    body?: string;
    /** heroicons outline `d` string, drawn in the header's icon chip. */
    icon?: string;
    /**
     * Optional label for a run of consecutive items ("For Your Practice").
     * Rendered once above the run, and the run is wrapped in a `role="group"`
     * so the split survives for screen readers too.
     */
    group?: string;
    /** Dwell override in seconds. Default is derived from `body` length. */
    seconds?: number;
  };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    items,
    autoplay = true,
    controlLabel,
    panel,
  }: {
    items: AutoAccordionItem[];
    /** Auto-advance. Ignored under reduced motion, which is always manual. */
    autoplay?: boolean;
    /** Names the pause control, e.g. "clinical evidence" → "Pause clinical evidence". */
    controlLabel: string;
    /** The detail pane, re-rendered for whichever item is open. */
    panel: Snippet<[AutoAccordionItem, number]>;
  } = $props();

  const uid = $props.id();

  let active = $state(0);
  let paused = $state(false);
  // Fails open: the observer below only ever *pauses* this. If
  // IntersectionObserver is missing — or never delivers, as in a hidden tab —
  // the accordion still runs rather than sitting frozen on item 1.
  let inView = $state(true);
  let reduceMotion = $state(false);
  let root = $state<HTMLElement>();

  // The progress rail *is* the timer: when its animation ends, the next item
  // opens. Tying the clock to the thing the reader can see has two payoffs —
  // pause/resume is one `animation-play-state`, and reduced motion (no
  // animation → no `animationend`) degrades to a plain manual accordion with
  // no extra branch. Whoop drives its 24/7 module the same way.
  const timed = $derived(autoplay && !reduceMotion && !paused);

  // Reading time for the body (~2.6 words/s) plus three seconds to take in the
  // pane, clamped so nothing flashes past or overstays.
  function dwell(item: AutoAccordionItem) {
    if (item.seconds) return item.seconds * 1000;
    const words = item.body ? item.body.trim().split(/\s+/).length : 0;
    return Math.min(16000, Math.max(7000, Math.round(words / 2.6) * 1000 + 3000));
  }

  // Consecutive items sharing a `group` render under one label. Items keep
  // their original index — it drives `active`, the ids and the pane.
  const runs = $derived.by(() => {
    const out: { group?: string; entries: { item: AutoAccordionItem; index: number }[] }[] = [];
    items.forEach((item, index) => {
      const last = out[out.length - 1];
      if (last && last.group === item.group) last.entries.push({ item, index });
      else out.push({ group: item.group, entries: [{ item, index }] });
    });
    return out;
  });

  $effect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => (reduceMotion = query.matches);
    sync();
    query.addEventListener('change', sync);

    // Nothing advances while the section is off screen, so a reader who
    // scrolls back finds the item they left rather than item 1.
    let observer: IntersectionObserver | undefined;
    if (root && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          inView = entries.some((entry) => entry.isIntersecting);
        },
        { threshold: 0.3 }
      );
      observer.observe(root);
    }

    return () => {
      query.removeEventListener('change', sync);
      observer?.disconnect();
    };
  });

  function open(index: number) {
    active = index;
    // The reader picked an item — stop moving the page under them. The control
    // flips to "Play", so auto-advance stays one click away (WCAG 2.2.2).
    paused = true;
  }

  function next() {
    active = (active + 1) % items.length;
  }

  // Arrow/Home/End between headers — the ARIA APG accordion pattern.
  function onHeaderKeydown(event: KeyboardEvent, index: number) {
    const last = items.length - 1;
    const target =
      event.key === 'ArrowDown'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowUp'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1;
    if (target < 0) return;
    event.preventDefault();
    root?.querySelectorAll<HTMLButtonElement>('.ac-header')[target]?.focus();
  }

  // heroicons outline — pause / play
  const pauseIcon = 'M15.75 5.25v13.5m-7.5-13.5v13.5';
  const playIcon =
    'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z';
</script>

<!-- Autonomous accordion: one item open at a time, its detail in the pane
     beside it, advancing on the progress rail's own animation. Every panel
     stays in the DOM (clipped, not removed), so nothing is hidden from
     crawlers — the section is shorter, not lighter. -->
{#if items.length}
  <div
    bind:this={root}
    class="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-8 lg:gap-12 items-start"
    class:ac-suspended={!inView}
  >
    <div>
      {#each runs as run (run.group ?? '_')}
        <!-- The visible label is a <p>, so role="group" + aria-label is what
             carries the split to assistive tech. -->
        <div
          role={run.group ? 'group' : undefined}
          aria-label={run.group}
          class={run.group ? 'mb-6 last:mb-0' : ''}
        >
          {#if run.group}
            <p class="pl-5 sm:pl-6 mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
              {run.group}
            </p>
          {/if}
          {#each run.entries as { item, index: i } (item.id)}
            <div
              class="ac-item relative pl-5 sm:pl-6 py-3"
              data-open={i === active ? '' : undefined}
              style="--ac-dwell: {dwell(item)}ms"
            >
              <span class="ac-track" aria-hidden="true"></span>
              {#if i === active}
                <span
                  class="ac-fill"
                  class:ac-fill--timed={timed}
                  aria-hidden="true"
                  onanimationend={next}
                ></span>
              {/if}

              <h3 class="text-base sm:text-lg font-semibold leading-snug">
                <button
                  class="ac-header w-full text-left cursor-pointer rounded-sm transition-colors
                         flex items-center gap-3
                         focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-ink)
                         {i === active
                    ? 'text-navy-950 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white'}"
                  id="{uid}-h{i}"
                  aria-expanded={i === active}
                  aria-controls="{uid}-p{i}"
                  onclick={() => open(i)}
                  onkeydown={(event) => onHeaderKeydown(event, i)}
                >
                  {#if item.icon}
                    <span
                      class="w-9 h-9 rounded-full bg-(--brand-soft) border border-(--brand-ink)/20 dark:border-(--brand-ink)/25
                             text-(--brand-ink) flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                        ><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg
                      >
                    </span>
                  {/if}
                  <span class="text-pretty">{item.title}</span>
                </button>
              </h3>

              <div
                class="ac-body"
                id="{uid}-p{i}"
                role="region"
                aria-labelledby="{uid}-h{i}"
                inert={i !== active}
              >
                <div class="min-h-0 overflow-hidden">
                  {#if item.body}
                    <p
                      class="pt-2.5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 text-pretty
                             {item.icon ? 'pl-12' : ''}"
                    >
                      {item.body}
                    </p>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/each}

      {#if autoplay && !reduceMotion}
        <!-- Indented to the header text, not the rail: flush left it reads as
             a fourth list marker. -->
        <div class="mt-5 pl-5 sm:pl-6">
          <div class="pl-12">
            <button
            type="button"
            class="w-9 h-9 rounded-full bg-(--brand-soft) border border-(--brand-ink)/20 dark:border-(--brand-ink)/25
                   text-(--brand-ink) flex items-center justify-center cursor-pointer transition-colors
                   hover:bg-(--brand-ink)/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
              aria-label={paused ? `Play ${controlLabel}` : `Pause ${controlLabel}`}
              onclick={() => (paused = !paused)}
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"
                ><path stroke-linecap="round" stroke-linejoin="round" d={paused ? playIcon : pauseIcon} /></svg
              >
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- Every pane is rendered, stacked in one grid cell, so the box is as tall
         as the tallest and nothing below the section moves as items advance —
         the design system's slider rule (§6), and it keeps all the figures and
         citations in the DOM rather than swapping them in and out. -->
    <div class="grid">
      {#each items as item, i (item.id)}
        <div
          class="ac-pane col-start-1 row-start-1"
          class:ac-pane--on={i === active}
          inert={i !== active}
        >
          {@render panel(item, i)}
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  /* Collapse with `grid-template-rows: 0fr → 1fr` — the modern accordion
     transition. The inner wrapper needs `min-height: 0` + `overflow: hidden`
     (set as utilities in the markup) for the row to actually clip. */
  .ac-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.45s ease;
  }
  .ac-item[data-open] .ac-body {
    grid-template-rows: 1fr;
  }

  /* The rail: a full-height track per item, with the open item's fill growing
     over its dwell. Because a collapsed item is only as tall as its header,
     the same 100% height reads as a short mark when closed and a long one
     when open — no separate "active" geometry needed. */
  .ac-track,
  .ac-fill {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: 2px;
    border-radius: 999px;
    /* Progress rail is an interaction affordance, so it carries the brand
       highlight rather than the persona accent (design system §1). */
    background: var(--brand-ink);
  }
  .ac-track {
    opacity: 0.2;
  }
  .ac-fill {
    transform-origin: top;
  }

  /* Untimed (paused, autoplay off, reduced motion) the fill simply stands at
     full height, marking the open item. Timed, it grows and its `animationend`
     is what opens the next item. */
  @keyframes ac-bar {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
  .ac-fill--timed {
    animation: ac-bar var(--ac-dwell, 9000ms) linear forwards;
  }
  .ac-suspended .ac-fill--timed {
    animation-play-state: paused;
  }

  /* Pane crossfade — opacity only, the one treatment the design system allows
     for a slide change (§6). `visibility` keeps the hidden panes out of the
     a11y tree and out of the tab order without removing them from the DOM. */
  .ac-pane {
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.4s ease,
      visibility 0.4s;
  }
  .ac-pane--on {
    opacity: 1;
    visibility: visible;
  }

  @media (prefers-reduced-motion: reduce) {
    .ac-body,
    .ac-pane {
      transition: none;
    }
    /* No animation → no `animationend` → nothing auto-advances. This guard
       also covers the pre-hydration window, where `timed` is still true. */
    .ac-fill--timed {
      animation: none;
    }
  }
</style>

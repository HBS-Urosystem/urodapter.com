<script lang="ts" module>
  export type RotatorQuote = {
    quote: string;
    author: string;
    subAuthor?: string;
    /** Dwell in seconds — presentation, kept next to the item in the content file. */
    seconds?: number;
  };
</script>

<script lang="ts">
  import { MediaQuery } from 'svelte/reactivity';
  import type { Attachment } from 'svelte/attachments';

  let {
    items,
    label,
    class: className = '',
  }: {
    items: RotatorQuote[];
    /** Names the carousel region for screen readers. */
    label: string;
    /** Placement only — the same panel is used at every width. */
    class?: string;
  } = $props();

  const uid = $props.id();

  let active = $state(0);
  // The reader's own choice: the pause button, or picking a dot.
  let paused = $state(false);
  // Fails open: the observer only ever *pauses* this, so if it is missing or
  // never delivers the quotes still rotate rather than freezing on the first.
  let inView = $state(true);
  // Browsers keep the document timeline running in a background tab, so the
  // fill would complete unseen and advance the moment the tab came back.
  let visibilityState = $state<DocumentVisibilityState>('visible');
  const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)', false);

  // Same mechanism as AutoAccordion (design system §6a): the active dot's fill
  // *is* the timer, and its `animationend` shows the next quote. Pause/resume
  // is one `animation-play-state`, and reduced motion (no animation → no
  // `animationend`) leaves a fully manual panel with no extra branch.
  const timed = $derived(!reducedMotion.current && !paused);
  // Hover and focus-within hold the timer in CSS (see the styles); these are the
  // holds only script can see.
  const held = $derived(!inView || visibilityState !== 'visible');
  // APG carousel: announce slide changes only when the reader caused them.
  const rotating = $derived(timed && !held);

  const watchViewport: Attachment<HTMLElement> = (node) => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  };

  function show(index: number) {
    active = index;
    // The reader picked a quote — stop moving it under them. The control flips
    // to "Play", so rotation stays one click away (WCAG 2.2.2).
    paused = true;
  }

  function next() {
    active = (active + 1) % items.length;
  }

  // heroicons outline — pause / play
  const pauseIcon = 'M15.75 5.25v13.5m-7.5-13.5v13.5';
  const playIcon =
    'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z';
</script>

<!-- Rotating testimonial panel (APG carousel pattern), glass over the hero
     photo in both schemes. Every quote stays in the DOM — stacked in one grid
     cell, so the panel is as tall as the longest and nothing moves when it
     advances (design system §6). -->
<svelte:document bind:visibilityState />

{#if items.length}
  <section
    {@attach watchViewport}
    aria-roledescription="carousel"
    aria-label={label}
    class="qr relative rounded-2xl border backdrop-blur-md p-[clamp(1rem,0.75rem+0.75vw,1.25rem)]
           bg-white/80 border-white/60 text-navy-950 shadow-lg shadow-navy-950/10
           dark:bg-navy-950/65 dark:border-white/15 dark:text-white dark:shadow-black/20 {className}"
    class:qr-held={held}
  >
    <!-- Controls come first in the DOM (APG) but are drawn on the attribution
         row, bottom right. -->
    <div
      class="absolute z-10 flex items-center bottom-[clamp(0.625rem,0.4rem+0.75vw,0.875rem)] right-[clamp(0.625rem,0.4rem+0.75vw,0.875rem)]"
    >
      {#each items as item, i (item.author)}
        <!-- 24px hit area (WCAG 2.5.8) around a 5px dot / 14px pill. -->
        <button
          type="button"
          class="h-6 min-w-6 px-1 grid place-items-center rounded-full cursor-pointer
                 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-(--brand-ink)"
          aria-label="Show testimonial {i + 1}"
          aria-current={i === active ? 'true' : undefined}
          aria-controls="{uid}-slides"
          onclick={() => show(i)}
        >
          <span
            class="relative block h-[5px] rounded-full overflow-hidden
                   {i === active ? 'w-3.5 bg-navy-950/20 dark:bg-white/25' : 'w-[5px] bg-navy-950/50 dark:bg-white/55'}"
            style="--qr-dwell: {(item.seconds ?? 8) * 1000}ms"
            aria-hidden="true"
          >
            {#if i === active}
              <span class="qr-fill" class:qr-fill--timed={timed} onanimationend={next}></span>
            {/if}
          </span>
        </button>
      {/each}

      {#if !reducedMotion.current}
        <button
          type="button"
          class="ml-0.5 w-6 h-6 grid place-items-center rounded-full cursor-pointer transition-colors
                 text-navy-950/75 hover:text-navy-950 hover:bg-navy-950/5
                 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10
                 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-(--brand-ink)"
          aria-label={paused ? 'Play testimonials' : 'Pause testimonials'}
          onclick={() => (paused = !paused)}
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
            ><path stroke-linecap="round" stroke-linejoin="round" d={paused ? playIcon : pauseIcon} /></svg
          >
        </button>
      {/if}
    </div>

    <div id="{uid}-slides" class="grid" aria-live={rotating ? 'off' : 'polite'}>
      {#each items as item, i (item.author)}
        <div
          role="group"
          aria-roledescription="slide"
          aria-label="{i + 1} of {items.length}"
          class="qr-slide [grid-area:1/1] flex"
          class:qr-slide--on={i === active}
          inert={i !== active}
        >
          <!-- The footer is pushed to the bottom so every slide's attribution
               sits on the controls' row, whatever the quote's length. -->
          <blockquote class="flex flex-col w-full">
            <p class="text-[clamp(0.875rem,0.8rem+0.25vw,0.9375rem)] leading-relaxed text-pretty">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer class="mt-auto pt-3 pr-20 text-xs font-semibold leading-snug">
              {item.author}
              {#if item.subAuthor}
                <span class="block font-normal text-slate-600 dark:text-slate-300">{item.subAuthor}</span>
              {/if}
            </footer>
          </blockquote>
        </div>
      {/each}
    </div>
  </section>
{/if}

<style>
  .qr-fill {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    /* The timer is an interaction affordance, so it carries the brand
       highlight, like the AutoAccordion rail (design system §1). */
    background: var(--brand-ink);
    transform-origin: left;
  }

  /* Untimed (paused, reduced motion) the fill stands full, marking the active
     quote. Timed, it grows over the dwell and its `animationend` advances. */
  @keyframes qr-bar {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
  .qr-fill--timed {
    animation: qr-bar var(--qr-dwell, 8000ms) linear forwards;
  }
  /* Hover and focus inside the panel hold the timer where it is; so does
     leaving the viewport or the tab (`.qr-held`, set from script). */
  .qr:hover .qr-fill--timed,
  .qr:focus-within .qr-fill--timed,
  .qr-held .qr-fill--timed {
    animation-play-state: paused;
  }

  /* Crossfade — opacity only (§6). `visibility` keeps the hidden quotes out of
     the a11y tree without removing them from the DOM. */
  .qr-slide {
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.4s ease,
      visibility 0.4s;
  }
  .qr-slide--on {
    opacity: 1;
    visibility: visible;
  }

  @media (prefers-reduced-motion: reduce) {
    .qr-slide {
      transition: none;
    }
    /* No animation → no `animationend` → nothing auto-advances. This also
       covers the pre-hydration window, where `timed` is still true. */
    .qr-fill--timed {
      animation: none;
    }
  }
</style>

<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { hero, clinicalValue } from '$lib/content/clinicians';
  import ImagePlaceholder from '$lib/components/shared/ImagePlaceholder.svelte';

  const groups = clinicalValue.groups;
  const uid = $props.id();

  // Below md the two cards share one cell and the side tabs pick which one
  // shows; from md both are simply visible. `compact` mirrors that breakpoint
  // for what CSS cannot express — the tab roles and `inert`. It starts false,
  // so the server render is the plain two-card version.
  let compact = $state(false);
  let active = $state(0);
  let paused = $state(false);
  // Fails open, like AutoAccordion's: the observer below only ever pauses.
  let inView = $state(true);
  let reduceMotion = $state(false);
  let root = $state<HTMLElement>();

  // The same timer as AutoAccordion (design system §6a): the open tab's rail
  // fill animates over the dwell and its `animationend` shows the next card.
  // Reduced motion → no animation → nothing advances. From md the tabs are
  // `display: none`, so no animation runs and nothing advances there either.
  const timed = $derived(!reduceMotion && !paused);

  $effect(() => {
    const narrow = window.matchMedia('(max-width: 47.98rem)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      compact = narrow.matches;
      reduceMotion = motion.matches;
    };
    sync();
    narrow.addEventListener('change', sync);
    motion.addEventListener('change', sync);

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
      narrow.removeEventListener('change', sync);
      motion.removeEventListener('change', sync);
      observer?.disconnect();
    };
  });

  // The reader picked a card — stop moving it under them (WCAG 2.2.2).
  function open(index: number) {
    active = index;
    paused = true;
  }

  function next() {
    active = (active + 1) % groups.length;
  }

  // Vertical tablist (ARIA APG): Up/Down/Home/End move focus and select.
  function onTabKeydown(event: KeyboardEvent, index: number) {
    const last = groups.length - 1;
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
    open(target);
    root?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[target]?.focus();
  }

  // heroicons outline — pause / play
  const pauseIcon = 'M15.75 5.25v13.5m-7.5-13.5v13.5';
  const playIcon =
    'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z';
</script>

<!-- Section 1 (0831 docx) — "Clinical Value for You and Your Patients".
     Hero sub-title + the two intro paragraphs, then the two benefit groups as
     two boxes — the docx's own "1 box for the 3 patient benefit, 1 box for the
     clinician benefit". The hero photo is still a pending client asset, so the
     slot states what it should show. -->
<section aria-labelledby="clinician-hero-heading" class="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16">
  <div class="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 lg:gap-12 items-center">
    <div class="lg:pr-6">
      <h1
        id="clinician-hero-heading"
        class="font-display font-semibold text-navy-950 dark:text-white leading-[1.15] text-balance text-[clamp(1.6rem,3.4vw,2.4rem)]"
      >
        {hero.headline}
      </h1>
      <div class="mt-7 h-0.5 w-12 rounded-full bg-(--accent-ink)/60" aria-hidden="true"></div>
      {#each hero.intro as paragraph, i (paragraph)}
        <p
          class="{i === 0 ? 'mt-7' : 'mt-4'} text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-md text-pretty"
        >
          {paragraph}
        </p>
      {/each}
    </div>

    <div class="w-full">
      <ImagePlaceholder description={hero.image.description} ratio="aspect-[3/2]" />
    </div>
  </div>

  <div class="mt-14">
    <p class="eyebrow">{clinicalValue.eyebrow}</p>
    <h2
      class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
    >
      {clinicalValue.heading}
    </h2>
  </div>

  <!-- Owner direction 2026-09-29: from md the two boxes sit side by side,
       always visible; the accordion is phone-only, and there the handle sits
       BESIDE the card — a narrow column of two side tabs (icon + vertical
       label + progress rail). Both cards share one grid cell, so the box is as
       tall as the taller card and nothing below moves when they swap (§6a). -->
  <div
    bind:this={root}
    use:reveal
    class="mt-10 grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 md:block"
    class:cv-suspended={!inView}
  >
    <div class="md:hidden flex flex-col" role={compact ? 'tablist' : undefined} aria-orientation={compact ? 'vertical' : undefined} aria-label={compact ? clinicalValue.heading : undefined}>
      {#each groups as group, i (group.title)}
        <div class="{group.accentClass} relative flex-1 flex pr-2.5" style="--cv-dwell: {group.seconds * 1000}ms">
          <!-- Rail on the tab's inner edge: it reads as the join between the
               open tab and its card. -->
          <span class="cv-track" aria-hidden="true"></span>
          {#if i === active}
            <span class="cv-fill" class:cv-fill--timed={timed} aria-hidden="true" onanimationend={next}></span>
          {/if}
          <button
            type="button"
            id="{uid}-tab{i}"
            role={compact ? 'tab' : undefined}
            aria-selected={compact ? i === active : undefined}
            aria-controls={compact ? `${uid}-panel${i}` : undefined}
            tabindex={compact && i !== active ? -1 : undefined}
            class="flex-1 flex flex-col items-center gap-3 py-2 rounded-lg cursor-pointer transition-colors
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)
                   {i === active
              ? 'text-navy-950 dark:text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white'}"
            onclick={() => open(i)}
            onkeydown={(event) => onTabKeydown(event, i)}
          >
            <span
              class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors
                     {i === active ? 'bg-(--accent-solid) text-white' : 'bg-(--accent-soft) text-(--accent-ink)'}"
              aria-hidden="true"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"
                ><path stroke-linecap="round" stroke-linejoin="round" d={group.icon} /></svg
              >
            </span>
            <span class="[writing-mode:vertical-rl] rotate-180 text-sm font-semibold leading-none whitespace-nowrap">
              {group.title}
            </span>
          </button>
        </div>
      {/each}

      {#if !reduceMotion}
        <div class="pt-3 pr-2.5 flex justify-center">
          <button
            type="button"
            class="w-8 h-8 rounded-full bg-(--brand-soft) border border-(--brand-ink)/20 dark:border-(--brand-ink)/25
                   text-(--brand-ink) flex items-center justify-center cursor-pointer transition-colors
                   hover:bg-(--brand-ink)/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
            aria-label={paused ? 'Play the clinical benefits' : 'Pause the clinical benefits'}
            onclick={() => (paused = !paused)}
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"
              ><path stroke-linecap="round" stroke-linejoin="round" d={paused ? playIcon : pauseIcon} /></svg
            >
          </button>
        </div>
      {/if}
    </div>

    <div class="cv-panes">
      {#each groups as group, i (group.title)}
        <div
          id="{uid}-panel{i}"
          class="cv-pane {group.accentClass}"
          class:cv-pane--on={i === active}
          role={compact ? 'tabpanel' : undefined}
          aria-labelledby={compact ? `${uid}-tab${i}` : undefined}
          inert={compact && i !== active}
        >
          <article aria-labelledby="{uid}-title{i}" class="h-full rounded-2xl surface-card overflow-hidden flex flex-col">
            <!-- A solid persona header: the card says whose benefits these
                 are before a word is read (2026-09-29: more contrast). -->
            <div class="bg-(--accent-solid) text-white px-5 sm:px-6 py-4 flex items-center gap-3">
              <span class="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                  ><path stroke-linecap="round" stroke-linejoin="round" d={group.icon} /></svg
                >
              </span>
              <h3 id="{uid}-title{i}" class="font-semibold text-base sm:text-lg leading-snug">{group.title}</h3>
            </div>
            <ul class="flex-1 p-5 sm:p-6 space-y-6">
              {#each group.items as benefit (benefit.title)}
                <!-- Chip + title on one row; on a phone the body runs full
                     width under both, from md it aligns under the title. -->
                <li class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5 items-center">
                  <span
                    class="w-9 h-9 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg class="w-[1.125rem] h-[1.125rem]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                      ><path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon} /></svg
                    >
                  </span>
                  <h4 class="font-semibold leading-snug text-navy-950 dark:text-white text-pretty">{benefit.title}</h4>
                  <p class="col-span-2 md:col-start-2 md:col-span-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
                    {benefit.body}
                  </p>
                </li>
              {/each}
            </ul>
          </article>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Phone: both cards in one cell, the open one visible — the box is as tall
     as the taller card, so nothing below moves. Crossfade opacity only (§6). */
  .cv-panes {
    display: grid;
  }
  .cv-pane {
    grid-area: 1 / 1;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.4s ease,
      visibility 0.4s;
  }
  .cv-pane--on {
    opacity: 1;
    visibility: visible;
  }

  /* md and up: the two boxes side by side, both always visible. */
  @media (min-width: 48rem) {
    .cv-panes {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
    }
    .cv-pane {
      grid-area: auto;
      opacity: 1;
      visibility: visible;
      transition: none;
    }
  }

  /* The rail — AutoAccordion's, turned to the tab's inner edge. The fill is
     the timer: its `animationend` shows the next card. */
  .cv-track,
  .cv-fill {
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    width: 2px;
    border-radius: 999px;
    background: var(--brand-ink);
  }
  .cv-track {
    opacity: 0.2;
  }
  .cv-fill {
    transform-origin: top;
  }
  @keyframes cv-bar {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
  .cv-fill--timed {
    animation: cv-bar var(--cv-dwell, 12000ms) linear forwards;
  }
  .cv-suspended .cv-fill--timed {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .cv-pane {
      transition: none;
    }
    /* No animation → no `animationend` → nothing auto-advances; also covers
       the pre-hydration window. */
    .cv-fill--timed {
      animation: none;
    }
  }
</style>

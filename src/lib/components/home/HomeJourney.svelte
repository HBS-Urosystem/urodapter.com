<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { journey } from '$lib/content/home';

  // Per-card styling (canvas "Főoldal" board): each persona keeps its own
  // shape language — the patient rounded and warm, the clinician square and
  // cool, the distributor lilac with soft corners.
  const look = {
    patient: {
      scope: 'accent-patient',
      card: 'bg-[color-mix(in_srgb,var(--color-blush)_40%,white)] dark:bg-navy-900 dark:ring-1 dark:ring-blush/25',
      deco: 'absolute -right-15 -top-[70px] w-[190px] h-[170px] rounded-[58%_42%_55%_45%/52%_60%_40%_48%] bg-blush dark:bg-blush/12',
      chip: 'rounded-full bg-white text-navy-900 dark:bg-white/10 dark:text-white',
      arrow: 'rounded-full bg-navy-900 text-white dark:bg-cerulean dark:text-navy-950',
    },
    clinician: {
      scope: 'accent-clinician',
      card: 'bg-white ring-1 ring-inset ring-mist dark:bg-navy-900 dark:ring-white/10',
      deco: 'absolute right-0 top-0 w-[170px] h-[120px] bg-mist/35 dark:bg-white/5 [clip-path:polygon(35%_0,100%_0,100%_100%)]',
      chip: 'rounded-[3px] bg-white ring-1 ring-inset ring-mist text-(--accent-ink) dark:bg-white/10 dark:ring-white/15',
      arrow: 'rounded-[3px] bg-pine text-white dark:bg-aqua dark:text-navy-950',
    },
    distributor: {
      scope: 'accent-distributor',
      card: 'bg-lilac/20 dark:bg-navy-900 dark:ring-1 dark:ring-lilac/30',
      deco: 'absolute -right-10 -top-10 size-[150px] bg-lilac/45 dark:bg-lilac/12',
      chip: 'rounded-[14px] bg-white text-(--accent-ink) dark:bg-white/10',
      arrow: 'rounded-[14px] accent-pill text-white',
    },
  } as const;
</script>

<!-- "Choose Your Journey" (canvas "Főoldal" board): a mist band with the
     bouncing arrow (the bridge-arrow motion verb) and the section name, then
     the three journey cards — each card is one link — and the dark Support
     Center band. -->
<div class="bg-mist/35 dark:bg-[#062536]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(2.5rem,4vw,3.5rem)] flex flex-col items-center gap-4 text-center">
    <a
      href="#journey"
      aria-label="Scroll to the next section"
      class="grid place-items-center size-11 rounded-full bg-white ring-1 ring-inset ring-mist text-(--brand-ink) arrow-nudge
             dark:bg-white/10 dark:ring-white/15 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aqua"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-5"><path d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75" /></svg>
    </a>
    <h2 id="h-journey" class="text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight font-light tracking-[-0.01em] text-(--ink) text-balance">{journey.heading}</h2>
  </div>
</div>

<section id="journey" aria-labelledby="h-journey" class="scroll-mt-6 max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(4rem,7vw,6.5rem)] flex flex-col gap-6">
  <ul use:reveal class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {#each journey.cards as card (card.id)}
      {@const s = look[card.id as keyof typeof look]}
      <li class="{s.scope} {card.id === 'distributor' ? 'sm:col-span-2 sm:w-[calc(50%-0.625rem)] sm:mx-auto lg:col-span-1 lg:w-auto' : ''}">
        <a
          href={card.href}
          class="group relative overflow-hidden h-full flex flex-col gap-3.5 p-[30px] rounded-2xl text-(--ink) {s.card}
                 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-ink)"
        >
          <div aria-hidden="true" class={s.deco}></div>
          <span aria-hidden="true" class="relative grid place-items-center size-13 {s.chip}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d={card.icon} /></svg>
          </span>
          <h3 class="relative text-[26px] leading-tight font-light">{card.title}</h3>
          <p class="relative grow leading-relaxed text-(--ink-soft)">{card.copy}</p>
          <span aria-hidden="true" class="relative self-end grid place-items-center size-11 text-xl transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none {s.arrow}">→</span>
        </a>
      </li>
    {/each}
  </ul>

  <div class="relative overflow-hidden flex flex-wrap items-center justify-between gap-x-10 gap-y-5 p-[clamp(1.5rem,3vw,2.25rem)] rounded-3xl text-white bg-linear-45 from-navy-950 to-navy-900 dark:ring-1 dark:ring-white/10">
    <div aria-hidden="true" class="absolute -right-[50px] -bottom-20 w-60 h-50 rounded-[52%_48%_44%_56%/56%_44%_56%_44%] bg-navy-800"></div>
    <div class="relative flex flex-col gap-1.5 max-w-2xl">
      <h3 class="text-2xl leading-tight font-semibold">{journey.support.heading}</h3>
      <p class="leading-relaxed text-mist">{journey.support.body}</p>
    </div>
    <a
      href={journey.support.href}
      class="group relative inline-flex items-center gap-2.5 h-12 px-[22px] rounded-full font-semibold bg-white text-navy-900 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
    >
      {journey.support.linkLabel} <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
    </a>
  </div>
</section>

<style>
  /* The bridge-arrow motion verb, as in SectionBridge: a 4px bob, paused on
     hover, off under reduced motion. */
  @keyframes nudge {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(4px);
    }
  }
  .arrow-nudge {
    animation: nudge 2.4s ease-in-out infinite;
  }
  .arrow-nudge:hover {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    .arrow-nudge {
      animation: none;
    }
  }
</style>

<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { nextSteps } from '$lib/content/patients';
  import closingImage from '$lib/assets/patients/closing-medical-team.jpg?enhanced';

  type Cta = (typeof nextSteps.ctas)[number];

  // Canvas (2026-11-18): three tinted cards, each one link — the first (order)
  // mist with a powder blob and a white pill, the second (talk to your
  // clinician) blush, the third (already using) light mist. 32px corners.
  const looks = [
    {
      card: 'bg-mist dark:bg-navy-900 dark:ring-1 dark:ring-powder/25',
      chip: 'bg-navy-700 text-mist',
      blob: 'absolute -right-15 -bottom-[70px] w-[220px] h-50 rounded-[52%_48%_44%_56%/56%_44%_56%_44%] bg-powder dark:bg-powder/12',
      link: 'h-12 px-[22px] rounded-full bg-white text-navy-900 dark:bg-white/10 dark:text-white',
    },
    {
      card: 'bg-[color-mix(in_srgb,var(--color-blush)_40%,white)] dark:bg-navy-900 dark:ring-1 dark:ring-blush/20',
      chip: 'bg-blush text-navy-900 dark:bg-blush/15 dark:text-white',
      blob: '',
      link: 'min-h-11 text-navy-900 dark:text-white',
    },
    {
      card: 'bg-mist/35 dark:bg-navy-900 dark:ring-1 dark:ring-white/10',
      chip: 'bg-mist text-navy-900 dark:bg-white/10 dark:text-white',
      blob: '',
      link: 'min-h-11 text-navy-900 dark:text-white',
    },
  ];
  const look = (cta: Cta) => looks[nextSteps.ctas.indexOf(cta)] ?? looks[2];
  const cardClass = (cta: Cta) =>
    `group relative overflow-hidden rounded-[32px] p-8 flex flex-col gap-4 text-(--ink) ${look(cta).card} ` +
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-ink)';
</script>

<!-- Card interior, shared by the on-site and off-site anchors below. -->
{#snippet cardBody(cta: Cta)}
  {@const l = look(cta)}
  {#if l.blob}<div aria-hidden="true" class={l.blob}></div>{/if}
  <span class="relative grid place-items-center size-14 shrink-0 rounded-full {l.chip}" aria-hidden="true">
    <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={cta.icon} /></svg>
  </span>
  <h3 class="relative text-2xl leading-tight font-semibold">{cta.title}</h3>
  <p class="relative grow leading-relaxed text-(--ink-soft)">{cta.body}</p>
  <span class="relative self-start inline-flex items-center gap-2 font-semibold {l.link}">
    {cta.linkLabel}{#if cta.externalHref}<span class="sr-only"> (opens in a new tab)</span>{/if}
    <span class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">→</span>
  </span>
{/snippet}

<section id="next-steps" aria-labelledby="next-steps-heading" class="max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(3.5rem,6vw,6rem)] scroll-mt-6">
  <p class="eyebrow">{nextSteps.eyebrow}</p>
  <h2
    id="next-steps-heading"
    class="mt-4 display-light"
  >
    {nextSteps.heading}
  </h2>
  <p class="mt-4 text-lg leading-relaxed text-(--ink-soft) max-w-3xl text-pretty">
    {nextSteps.intro}
  </p>

  <div use:reveal class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
    {#each nextSteps.ctas as cta (cta.title)}
      {#if cta.externalHref}
        <!-- Off-site (client webshop / UroDapter App): a new tab, and
             `rel="external"` so SvelteKit's router hands it to the browser. -->
        <a
          href={cta.externalHref}
          target="_blank"
          rel="external noopener noreferrer"
          class={cardClass(cta)}
        >
          {@render cardBody(cta)}
        </a>
      {:else}
        <a href={cta.href} class={cardClass(cta)}>
          {@render cardBody(cta)}
        </a>
      {/if}
    {/each}
  </div>

  <!-- Dive deep: the Support Center panel (canvas: mist, 32px corners, the
     topics as white pills, a navy pill button). -->
  <div use:reveal class="mt-6 rounded-[32px] p-[clamp(1.5rem,3vw,2.25rem)] flex flex-wrap items-center justify-between gap-x-10 gap-y-5 bg-mist/35 dark:bg-navy-900 dark:ring-1 dark:ring-white/10">
    <div class="flex-[1_1_22.5rem] min-w-0 flex flex-col gap-3.5">
      <h3 class="text-2xl leading-tight font-semibold text-(--ink)">{nextSteps.diveDeep.heading}</h3>
      <p class="leading-relaxed text-(--ink-soft)">{nextSteps.diveDeep.body}</p>
      <ul class="flex flex-wrap gap-2">
        {#each nextSteps.diveDeep.items as item (item.label)}
          <li class="inline-flex items-center gap-2 h-[38px] px-3.5 rounded-full bg-white text-sm font-semibold text-navy-900 dark:bg-white/10 dark:text-white">
            <svg class="size-4 text-(--brand-ink)" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg>
            {item.label}
          </li>
        {/each}
      </ul>
    </div>
    <a
      href={nextSteps.diveDeep.href}
      class="group inline-flex items-center gap-2.5 h-12 px-[22px] rounded-full font-semibold bg-navy-900 text-white hover:bg-navy-950 dark:bg-white dark:text-navy-950 dark:hover:bg-mist
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
    >
      {nextSteps.diveDeep.linkLabel} <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
    </a>
  </div>
</section>

<!-- Closing band (canvas "Páciens oldal" board, 2026-11-18): mist, with a
     powder and a blush blob; the closing note, a rule, the callback (a
     takeaway, not a quote — no quotation marks), and the medical-team photo
     in the arch crop. It replaced the meadow photo of 2026-10-11
     (`closing-meadow.jpg`, kept). Text is left-aligned at every width. -->
<section aria-labelledby="p-close" class="relative overflow-hidden bg-mist dark:bg-[#062536]">
  <div aria-hidden="true" class="absolute -left-15 -top-20 w-80 h-[280px] rounded-[52%_48%_60%_40%/46%_56%_44%_54%] bg-powder/55 dark:bg-powder/10"></div>
  <div aria-hidden="true" class="absolute right-[6%] -bottom-[90px] w-[260px] h-60 rounded-[44%_56%_48%_52%/58%_44%_56%_42%] bg-blush dark:bg-blush/10"></div>
  <div class="relative max-w-[73.75rem] mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-wrap items-center gap-[clamp(2rem,5vw,4rem)]">
    <div class="flex-[1_1_26rem] min-w-0 flex flex-col items-start gap-4.5">
      <h2 id="p-close" class="display-light text-navy-950! dark:text-white!">{nextSteps.closing.heading}</h2>
      <p class="text-lg leading-relaxed text-navy-900 dark:text-slate-300">{nextSteps.closing.body}</p>
      <span aria-hidden="true" class="mt-2.5 w-12 h-0.5 rounded-full bg-(--brand-ink)/70"></span>
      <p class="max-w-2xl text-[clamp(1.25rem,2vw,1.625rem)] leading-snug font-semibold text-navy-950 dark:text-white text-balance">{nextSteps.closing.callback}</p>
    </div>
    <enhanced:img
      src={closingImage}
      alt={nextSteps.closing.imageAlt}
      sizes="(min-width: 1024px) 460px, 100vw"
      loading="lazy"
      class="relative flex-[1_1_20rem] min-w-0 max-w-[28.75rem] mx-auto w-full aspect-[5/4] object-cover object-[50%_30%] rounded-[999px_999px_2rem_2rem/60%_60%_2rem_2rem]"
    />
  </div>
</section>


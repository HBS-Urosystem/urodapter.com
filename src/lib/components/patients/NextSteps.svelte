<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { nextSteps } from '$lib/content/patients';
  import closingImage from '$lib/assets/patients/closing-medical-team.jpg?enhanced';

  type Cta = (typeof nextSteps.ctas)[number];

  // CTA tiers: primary is the solid persona gradient (scoped `.cta-primary`);
  // the other tiers are persona-tinted cards, as on the clinician page
  // (2026-09-29: were slate-50 — more contrast against the canvas).
  const cardClass = (cta: Cta) =>
    cta.tier === 'primary'
      ? 'group cta-primary transition-[background] rounded-2xl p-6 flex flex-col text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--accent-ink)'
      : 'group surface-card rounded-2xl p-6 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink)';
</script>

<!-- Card interior, shared by the on-site and off-site anchors below. -->
{#snippet cardBody(cta: Cta)}
  {@const primary = cta.tier === 'primary'}
  <span
    class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 {primary
      ? 'bg-white/20'
      : 'bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink)'}"
    aria-hidden="true"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={cta.icon} /></svg>
  </span>
  <h3 class="mt-4 font-semibold {primary ? '' : 'text-navy-950 dark:text-white'}">{cta.title}</h3>
  <p class="mt-1.5 text-sm leading-relaxed flex-1 {primary ? 'text-white/85' : 'text-slate-600 dark:text-slate-300'}">
    {cta.body}
  </p>
  <span class="mt-4 inline-flex items-center gap-1.5 text-sm {primary ? 'font-semibold' : 'font-medium text-(--accent-ink)'}">
    {cta.linkLabel}{#if cta.externalHref}<span class="sr-only"> (opens in a new tab)</span>{/if}
    <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
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

  <div use:reveal class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
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

  <!-- Dive deep: Support Center band -->
  <div use:reveal class="mt-6 rounded-2xl surface-panel p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-6 items-center">
    <div class="flex items-start gap-4">
      <span
        class="w-12 h-12 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 text-(--accent-ink) flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      </span>
      <div>
        <h3 class="font-semibold text-navy-950 dark:text-white">{nextSteps.diveDeep.heading}</h3>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{nextSteps.diveDeep.body}</p>
        <a
          href={nextSteps.diveDeep.href}
          class="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-ink) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink) rounded-sm"
        >
          {nextSteps.diveDeep.linkLabel}
          <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
    <ul class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-x-6 gap-y-5">
      {#each nextSteps.diveDeep.items as item (item.label)}
        <li class="flex flex-col items-center gap-2 text-center">
          <span
            class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg>
          </span>
          <span class="text-xs font-medium leading-snug text-slate-700 dark:text-slate-200">{item.label}</span>
        </li>
      {/each}
    </ul>
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

<style>
  /* The .surface-solid gradient language (deep → a little of the bright
     partner), read from the page's accent scope rather than hardcoded. */
  .cta-primary {
    background: linear-gradient(
      135deg,
      var(--accent-solid) 0%,
      color-mix(in srgb, var(--accent-solid) 78%, var(--surface-accent)) 100%
    );
  }
  .cta-primary:hover {
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent-solid) 85%, black) 0%, var(--accent-solid) 100%);
  }
</style>

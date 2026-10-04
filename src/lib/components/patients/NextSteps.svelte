<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { nextSteps } from '$lib/content/patients';
  import closingImage from '$lib/assets/patients/closing-hero.jpg?enhanced';

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

<section aria-labelledby="next-steps-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="eyebrow">{nextSteps.eyebrow}</p>
  <h2
    id="next-steps-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {nextSteps.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
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

<!-- Closing band: bookends the page — closing note + callback, with the
     positive photo (client asset) on the right: the subject looks left, so
     her gaze points into the text. -->
<div class="tint-band mt-12 sm:mt-16">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
    <div class="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-14 items-center">
      <div class="text-center lg:text-left">
        <p class="font-semibold text-navy-950 dark:text-white">{nextSteps.closing.heading}</p>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 text-pretty">
          {nextSteps.closing.body}
        </p>
        <div class="mt-7 h-0.5 w-12 mx-auto lg:mx-0 rounded-full bg-(--accent-ink)/50 dark:bg-(--accent-ink)/60" aria-hidden="true"></div>
        <p class="mt-7 font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug text-balance">
          &ldquo;{nextSteps.closing.callback}&rdquo;
        </p>
      </div>
      <enhanced:img
        src={closingImage}
        alt=""
        aria-hidden="true"
        sizes="(min-width: 1024px) 35vw, 100vw"
        loading="lazy"
        class="rounded-3xl w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end h-auto object-cover"
      />
    </div>
  </div>
</div>

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

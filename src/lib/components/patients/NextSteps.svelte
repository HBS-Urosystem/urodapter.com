<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { nextSteps } from '$lib/content/patients';
  import closingImage from '$lib/assets/patients/closing-hero.jpg?enhanced';
</script>

<section aria-labelledby="next-steps-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-patient dark:text-sky-300">
    {nextSteps.eyebrow}
  </p>
  <h2
    id="next-steps-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {nextSteps.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {nextSteps.intro}
  </p>

  <!-- CTA tiers: primary wears the home page's audience-card gradient
       language; the other tiers are neutral cards (home support-card style) -->
  <div use:reveal class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each nextSteps.ctas as cta (cta.title)}
      {#if cta.tier === 'primary'}
        <a href={cta.href} class="group cta-primary transition-[background] rounded-2xl p-6 flex flex-col text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
          <span class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0" aria-hidden="true">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={cta.icon} /></svg>
          </span>
          <h3 class="mt-4 font-semibold">{cta.title}</h3>
          <p class="mt-1.5 text-sm text-white/85 leading-relaxed flex-1">{cta.body}</p>
          <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
            {cta.linkLabel}
            <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </span>
        </a>
      {:else}
        <a href={cta.href} class="group bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/15 transition-colors rounded-2xl p-6 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patient dark:focus-visible:ring-sky-300">
          <span class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-patient/20 dark:border-sky-300/25 text-patient dark:text-sky-300 flex items-center justify-center shrink-0" aria-hidden="true">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={cta.icon} /></svg>
          </span>
          <h3 class="mt-4 font-semibold text-navy-950 dark:text-white">{cta.title}</h3>
          <p class="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">{cta.body}</p>
          <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-patient dark:text-sky-300">
            {cta.linkLabel}
            <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </span>
        </a>
      {/if}
    {/each}
  </div>

  <!-- Dive deep: Support Center band -->
  <div use:reveal class="mt-6 rounded-2xl bg-(--color-patient-soft) dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/15 p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-6 items-center">
    <div class="flex items-start gap-4">
      <span
        class="w-12 h-12 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 text-patient dark:text-sky-300 flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      </span>
      <div>
        <h3 class="font-semibold text-navy-950 dark:text-white">{nextSteps.diveDeep.heading}</h3>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{nextSteps.diveDeep.body}</p>
        <a
          href={nextSteps.diveDeep.href}
          class="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-patient dark:text-sky-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patient dark:focus-visible:ring-sky-300 rounded-sm"
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
            class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-patient/20 dark:border-sky-300/25 text-patient dark:text-sky-300 flex items-center justify-center"
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
        <div class="mt-7 h-0.5 w-12 mx-auto lg:mx-0 rounded-full bg-patient/50 dark:bg-sky-300/60" aria-hidden="true"></div>
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
  /* Same gradient language as the home page's patient audience card */
  .cta-primary {
    background: linear-gradient(135deg, var(--color-patient) 0%, color-mix(in srgb, var(--color-patient) 85%, white) 100%);
  }
  .cta-primary:hover {
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-patient) 85%, black) 0%, var(--color-patient) 100%);
  }
</style>

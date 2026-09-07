<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import type { ResolvedPathname } from '$app/types';
  import BenefitCard from '$lib/components/shared/BenefitCard.svelte';
  import TestimonialCard from '$lib/components/shared/TestimonialCard.svelte';

  type Benefit = { title: string; body: string; icon: string };
  type Testimonial = {
    theme: string;
    icon: string;
    quote: string;
    author: string;
    meta: string;
    linkLabel: string;
    href: ResolvedPathname;
  };
  type Callout = { title: string; body: string; source: string; icon: string };

  let {
    id,
    accentClass,
    eyebrow,
    heading,
    intro,
    benefits,
    testimonial,
    callout,
    cta,
  }: {
    id: string;
    accentClass: string;
    eyebrow: string;
    heading: string;
    intro: string;
    benefits: Benefit[];
    testimonial: Testimonial;
    callout?: Callout;
    cta: { label: string; href: ResolvedPathname };
  } = $props();
</script>

<!-- One of the three audience lanes. `accentClass` (.accent-patient /
     -clinician / -distributor) retints every surface below it — cards, icon
     chips, the CTA fill — so the page reads blue → teal → purple as it scrolls.
     The bridge above each lane carries the same class. -->
<section {id} class="{accentClass} max-w-7xl mx-auto px-5 sm:px-8 scroll-mt-8" aria-labelledby="{id}-heading">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">{eyebrow}</p>
  <h2
    id="{id}-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)] max-w-3xl"
  >
    {heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {intro}
  </p>

  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each benefits as benefit (benefit.title)}
      <BenefitCard title={benefit.title} body={benefit.body} icon={benefit.icon} />
    {/each}
  </div>

  <div use:reveal class="mt-6 grid grid-cols-1 {callout ? 'lg:grid-cols-[3fr_2fr]' : ''} gap-6 items-start">
    <TestimonialCard
      theme={testimonial.theme}
      icon={testimonial.icon}
      quote={testimonial.quote}
      author={testimonial.author}
      meta={testimonial.meta}
      linkLabel={testimonial.linkLabel}
      href={testimonial.href}
    />

    {#if callout}
      <div class="rounded-2xl surface-panel p-6">
        <div class="flex items-center gap-3">
          <span
            class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={callout.icon} /></svg>
          </span>
          <h3 class="font-semibold text-navy-950 dark:text-white">{callout.title}</h3>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">
          {callout.body}
        </p>
        <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">{callout.source}</p>
      </div>
    {/if}
  </div>

  <a
    href={cta.href}
    class="group mt-8 inline-flex items-center gap-2 rounded-full accent-pill px-6 py-3 text-sm font-semibold text-white transition-[background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink) focus-visible:ring-offset-2"
  >
    {cta.label}
    <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
  </a>
</section>

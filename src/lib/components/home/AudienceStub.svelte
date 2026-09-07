<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import type { ResolvedPathname } from '$app/types';
  import SiteHeader from '$lib/components/SiteHeader.svelte';

  let {
    accentClass,
    heading,
    body,
    roadmap,
    cta,
  }: {
    accentClass: string;
    heading: string;
    body: string;
    roadmap: { heading: string; body: string; items: { label: string; icon: string }[] };
    cta: { heading: string; body: string; linkLabel: string; href: ResolvedPathname };
  } = $props();
</script>

<!-- Placeholder audience page: the full journey pages are still to come, so
     this states what is coming rather than pretending to be finished. Same
     system as /patients — persona canvas, solid nav, open sections. -->
<div class="bg-persona-page {accentClass} text-navy-950 dark:text-white transition-colors min-h-screen">
  <SiteHeader variant="solid" />

  <main class="pb-16">
    <section aria-labelledby="stub-heading" class="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16">
      <h1
        id="stub-heading"
        class="font-display font-semibold text-navy-950 dark:text-white leading-[1.15] text-balance text-[clamp(1.75rem,3.8vw,2.6rem)] max-w-4xl"
      >
        {heading}
      </h1>
      <div class="mt-7 h-0.5 w-12 rounded-full bg-(--accent-ink)/60" aria-hidden="true"></div>
      <p class="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
        {body}
      </p>

      <div use:reveal class="mt-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-start">
        <div class="rounded-2xl surface-card p-6 sm:p-7">
          <h2 class="font-semibold text-navy-950 dark:text-white">{roadmap.heading}</h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{roadmap.body}</p>
          <ul class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {#each roadmap.items as item (item.label)}
              <li class="flex items-start gap-3">
                <span
                  class="w-9 h-9 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg>
                </span>
                <span class="text-sm font-medium text-slate-700 dark:text-slate-200 pt-2">{item.label}</span>
              </li>
            {/each}
          </ul>
        </div>

        <div class="rounded-2xl accent-pill p-6 sm:p-7 text-white">
          <h2 class="font-semibold text-lg">{cta.heading}</h2>
          <p class="mt-2 text-sm leading-relaxed text-white/85 text-pretty">{cta.body}</p>
          <a
            href={cta.href}
            class="group mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {cta.linkLabel}
            <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  </main>
</div>

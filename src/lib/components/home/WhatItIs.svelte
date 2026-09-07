<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { whatItIs } from '$lib/content/home';
  import ProductCallouts from '$lib/components/shared/ProductCallouts.svelte';
  import IndicationsStrip from '$lib/components/shared/IndicationsStrip.svelte';
  import ImagePlaceholder from '$lib/components/shared/ImagePlaceholder.svelte';
</script>

<!-- Section 1: what the device is. The annotated product diagram carries the
     explanation; the copy beside it stays short so the home page teases the
     patient journey rather than repeating it. -->
<section id="how-it-works" aria-labelledby="how-it-works-heading" class="max-w-7xl mx-auto px-5 sm:px-8 scroll-mt-8">
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
        {whatItIs.eyebrow}
      </p>
      <h2
        id="how-it-works-heading"
        class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
      >
        {whatItIs.heading}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
        {whatItIs.intro}
      </p>
    </div>
    <div class="w-full lg:w-72 shrink-0">
      <ImagePlaceholder description={whatItIs.image.description} />
    </div>
  </div>

  <div use:reveal class="mt-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-10 items-center">
    <div class="rounded-2xl surface-card p-6 sm:p-8">
      <ProductCallouts callouts={whatItIs.callouts} />
    </div>

    <div>
      <p class="text-base leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">
        {whatItIs.spec}
      </p>

      <ul class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-4">
        {#each whatItIs.quickBenefits as benefit (benefit.label)}
          <li class="flex items-start gap-3">
            <svg class="w-6 h-6 shrink-0 text-(--accent-ink)" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon} /></svg>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{benefit.label}</span>
          </li>
        {/each}
      </ul>

      <a
        href={whatItIs.href}
        class="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-ink) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink) rounded-sm"
      >
        {whatItIs.linkLabel}
        <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
      </a>
    </div>
  </div>

  <div use:reveal class="mt-8">
    <IndicationsStrip text={whatItIs.indications.text} items={whatItIs.indications.items} />
  </div>
</section>

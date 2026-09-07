<script lang="ts">
  import { hero } from '$lib/content/clinicians';
  import ImagePlaceholder from '$lib/components/shared/ImagePlaceholder.svelte';
</script>

<!-- Section 1 — recognition. Same shape as the patient hero: one uninterrupted
     serif sentence + accent rule + body, media beside it. The photo is still a
     pending client asset, so the slot states what it should show. -->
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
      <p class="mt-7 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-md text-pretty">
        {hero.body}
      </p>
    </div>

    <div class="w-full">
      <ImagePlaceholder description={hero.image.description} ratio="aspect-[3/2]" />
    </div>
  </div>
</section>

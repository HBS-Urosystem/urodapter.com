<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { howItWorks } from '$lib/content/home';
  import ProductCallouts from '$lib/components/shared/ProductCallouts.svelte';
  import VideoFacade from '$lib/components/shared/VideoFacade.svelte';
</script>

<!-- Section 2 (0831 page_content docx) — "How It Works", title written out.
     The docx's four beats (intro → product image → second-line explanation →
     the 30-second animation) are laid out as two alternating rows: intro beside
     the annotated product figure, then the animation beside the explanation.
     The callout labels are the patient-facing set (the personas doc is explicit
     that patients are not after specifications). -->
<!-- #how-it-works is the hero's "See how it works" target; scroll-mt clears
     the header. It lands past the bridge band on purpose (the band is the
     lead-in for someone reading down). -->
<section id="how-it-works" aria-labelledby="how-it-works-heading" class="max-w-7xl mx-auto px-5 sm:px-8 scroll-mt-24">
  <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
    <div>
      <h2
        id="how-it-works-heading"
        class="font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
      >
        {howItWorks.heading}
      </h2>
      <p class="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
        {howItWorks.intro}
      </p>
    </div>

    <!-- The figure is ~4.8:1 and carries labels in all four corners, so it takes
         the wider track; below `lg` it goes full width under the intro. -->
    <div use:reveal class="rounded-2xl surface-card p-6 sm:p-8">
      <ProductCallouts callouts={howItWorks.callouts} />
    </div>
  </div>

  <div use:reveal class="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">
    <VideoFacade
      sources={howItWorks.video.sources}
      poster={howItWorks.video.poster}
      posterBar={howItWorks.video.posterBar}
      caption={howItWorks.video.caption}
      captionPosition="above"
      duration={howItWorks.video.duration}
    />

    <p class="text-base leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
      {howItWorks.detail}
    </p>
  </div>
</section>

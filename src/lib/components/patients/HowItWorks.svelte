<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { howItWorks } from '$lib/content/patients';
  import ProductCallouts from './ProductCallouts.svelte';
  import VideoFacade from './VideoFacade.svelte';
  import SupportCenterCard from './SupportCenterCard.svelte';
</script>

<section aria-labelledby="how-it-works-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <!-- Centered header, per the Section 2 mood board -->
  <div class="text---center max-w-3xl mx---auto">
    <h2
      id="how-it-works-heading"
      class="font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
    >
      {howItWorks.heading}
    </h2>
    <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
      {howItWorks.intro}
    </p>
  </div>

  <div class="mt-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-x-12 gap-y-10 items-start">
    <div use:reveal>
      <p class="font-semibold text-patient dark:text-sky-300 text-lg leading-snug text-pretty">
        {howItWorks.lead}
      </p>
      <p class="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
        {howItWorks.leadBody}
      </p>

      <!-- Product panel (mood board's features box, without the title strip) -->
      <div class="mt-8 rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 p-6 sm:p-8">
        <ProductCallouts callouts={howItWorks.callouts} />
      </div>

      <!-- Quick at-a-glance benefits row, below the product card -->
      <ul class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
        {#each howItWorks.quickBenefits as benefit (benefit.label)}
          <li class="flex flex-col items-center text-center gap-2.5">
            <svg class="w-8 h-8 text-patient dark:text-sky-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon} /></svg>
            <span class="text-xs leading-snug text-slate-600 dark:text-slate-300 text-balance">{benefit.label}</span>
          </li>
        {/each}
      </ul>
    </div>

    <div use:reveal class="space-y-6">
      <VideoFacade
        videoId={howItWorks.video.videoId}
        poster={howItWorks.video.poster}
        caption={howItWorks.video.caption}
        duration={howItWorks.video.duration}
      />
      <SupportCenterCard
        heading={howItWorks.supportCard.heading}
        body={howItWorks.supportCard.body}
        linkLabel={howItWorks.supportCard.linkLabel}
        href={howItWorks.supportCard.href}
      />
    </div>
  </div>
</section>

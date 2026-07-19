<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { stories } from '$lib/content/patients';
  import TestimonialCard from './TestimonialCard.svelte';
  import SupportCenterCard from './SupportCenterCard.svelte';
</script>

<section aria-labelledby="patient-stories-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-patient dark:text-sky-300">
    {stories.eyebrow}
  </p>
  <h2
    id="patient-stories-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {stories.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {stories.intro}
  </p>

  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each stories.testimonials as t (t.author)}
      <TestimonialCard
        theme={t.theme}
        icon={t.icon}
        quote={t.quote}
        author={t.author}
        meta={t.meta}
        linkLabel={t.linkLabel}
        href={t.href}
      />
    {/each}
  </div>

  <div use:reveal class="mt-6">
    <SupportCenterCard
      heading={stories.more.heading}
      body={stories.more.body}
      linkLabel={stories.more.linkLabel}
      href={stories.more.href}
    />
  </div>
</section>

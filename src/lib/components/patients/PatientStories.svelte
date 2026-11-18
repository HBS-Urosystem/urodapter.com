<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { stories, storyItems } from '$lib/content/patients';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import SupportCenterCard from '$lib/components/shared/SupportCenterCard.svelte';
  import storiesImage from '$lib/assets/patients/closing-hero.jpg?enhanced';

  // `storyItems` is built from `stories.testimonials` in order; the pane looks
  // its story up by item id rather than by position.
  const storyById = new Map(
    storyItems.map((item, i) => [item.id, stories.testimonials[i]])
  );
</script>

<!-- `#stories` is a cross-page anchor target: the clinician journey's "Read all
     patient testimonials" lands here. `scroll-mt-24` clears the sticky header. -->
<!-- Canvas restyle 2026-11-18: light display heading, and the sofa photo in the
     arch crop with a blush ring beside the heading. -->
<section id="stories" aria-labelledby="patient-stories-heading" class="max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(3.5rem,6vw,6rem)] scroll-mt-6">
  <div class="flex flex-wrap items-center gap-x-14 gap-y-8">
    <div class="flex-[1_1_26rem] min-w-0">
      <p class="eyebrow">{stories.eyebrow}</p>
      <h2
        id="patient-stories-heading"
        class="mt-4 display-light"
      >
        {stories.heading}
      </h2>
      <p class="mt-4 text-lg leading-relaxed text-(--ink-soft) max-w-3xl text-pretty">
        {stories.intro}
      </p>
    </div>
    <enhanced:img
      src={storiesImage}
      alt={stories.imageAlt}
      sizes="(min-width: 1024px) 520px, 100vw"
      loading="lazy"
      class="flex-[1_1_22.5rem] min-w-0 max-w-[32.5rem] mx-auto w-full aspect-[16/10] object-cover object-[72%_30%] rounded-[999px_999px_2rem_2rem/60%_60%_2rem_2rem] ring-8 ring-blush/40 dark:ring-blush/15"
    />
  </div>

  <!-- Canvas (2026-11-18): from 768px the four stories are four blush cards
     side by side, all visible; below 768px the same cards sit in the
     AutoAccordion (design system §6a), whose header carries the theme. -->
  {#snippet storyCard(story: (typeof stories.testimonials)[number], withTheme: boolean)}
    <div class="h-full rounded-[30px] p-7 flex flex-col gap-3.5 bg-[color-mix(in_srgb,var(--color-blush)_40%,white)] dark:bg-navy-900 dark:ring-1 dark:ring-blush/20">
      {#if withTheme}
        <div class="accent-clinician flex items-center gap-2.5 text-[13px] font-bold tracking-[0.12em] uppercase text-(--accent-ink)">
          <svg class="size-[18px] shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d={story.icon} /></svg>
          {story.theme}
        </div>
      {/if}
      <figure class="grow flex flex-col gap-3.5">
        <blockquote class="text-[19px] leading-snug italic font-light text-(--ink) text-pretty">“{story.quote}”</blockquote>
        <figcaption class="mt-auto flex flex-col gap-0.5 text-sm text-(--ink-soft)">
          <strong class="text-[15px] text-(--ink)">{story.author}</strong>{story.meta}
        </figcaption>
      </figure>
      <a
        href={story.href}
        class="group self-start inline-flex items-center gap-1.5 min-h-11 text-[15px] font-semibold text-(--brand-ink) rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
      >
        {story.linkLabel} <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
      </a>
    </div>
  {/snippet}

  <ul use:reveal class="mt-10 hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-5">
    {#each stories.testimonials as story (story.author)}
      <li>{@render storyCard(story, true)}</li>
    {/each}
  </ul>

  <div use:reveal class="mt-10 md:hidden">
    <AutoAccordion items={storyItems} controlLabel="the patient stories">
      {#snippet panel(item)}
        {@const story = storyById.get(item.id)}
        {#if story}{@render storyCard(story, false)}{/if}
      {/snippet}
    </AutoAccordion>
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

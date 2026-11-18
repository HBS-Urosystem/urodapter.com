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

  <!-- The four stories are an AutoAccordion (design system §6a) rather than a
       four-up grid. The quote is the pane, on screen the whole time — what
       collapses is the theme label. Desktop barely changes; the section is
       1 930 px on a 375 px screen, where four stacked cards are nearly all of
       it, and that is what this buys back. -->
  <div use:reveal class="mt-10">
    <AutoAccordion items={storyItems} controlLabel="the patient stories">
      {#snippet panel(item)}
        {@const story = storyById.get(item.id)}
        {#if story}
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full flex flex-col justify-center">
            <span class="font-display text-4xl leading-none text-(--accent-ink)" aria-hidden="true">&ldquo;</span>
            <blockquote class="mt-3">
              <p class="text-base sm:text-lg leading-relaxed text-navy-900 dark:text-slate-100 text-pretty">
                {story.quote}
              </p>
              <footer class="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 text-sm">
                <span class="font-semibold text-navy-950 dark:text-white">{story.author}</span>
                <span class="block mt-0.5 text-xs text-slate-500 dark:text-slate-400">{story.meta}</span>
              </footer>
            </blockquote>
            <a
              href={story.href}
              class="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--brand-ink) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-ink) rounded-sm self-start"
            >
              {story.linkLabel}
              <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </a>
          </div>
        {/if}
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

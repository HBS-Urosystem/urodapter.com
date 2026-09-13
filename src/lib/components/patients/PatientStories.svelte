<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { stories, storyItems } from '$lib/content/patients';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import SupportCenterCard from '$lib/components/shared/SupportCenterCard.svelte';
  import ImagePlaceholder from '$lib/components/shared/ImagePlaceholder.svelte';

  // `storyItems` is built from `stories.testimonials` in order; the pane looks
  // its story up by item id rather than by position.
  const storyById = new Map(
    storyItems.map((item, i) => [item.id, stories.testimonials[i]])
  );
</script>

<!-- `#stories` is a cross-page anchor target: the clinician journey's "Read all
     patient testimonials" lands here. `scroll-mt-24` clears the sticky header. -->
<section id="stories" aria-labelledby="patient-stories-heading" class="max-w-7xl mx-auto px-5 sm:px-8 scroll-mt-24">
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
    <div>
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
    </div>
    <div class="w-full lg:w-72 shrink-0">
      <ImagePlaceholder description={stories.image.description} />
    </div>
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
              class="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-ink) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink) rounded-sm self-start"
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

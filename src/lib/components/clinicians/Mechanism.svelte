<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { mechanism } from '$lib/content/clinicians';
  import VideoFacade from '$lib/components/shared/VideoFacade.svelte';
</script>

<!-- Section 3 — mechanism of action. The four steps are the four sentences of
     the docx paragraph, in order and verbatim; only the step titles are labels. -->
<section aria-labelledby="mechanism-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
    {mechanism.eyebrow}
  </p>
  <h2
    id="mechanism-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)] max-w-3xl"
  >
    {mechanism.heading}
  </h2>

  <div class="mt-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-x-12 gap-y-10 items-start">
    <ol use:reveal class="space-y-5">
      {#each mechanism.steps as step, i (step.title)}
        <li class="rounded-2xl surface-card p-5 flex items-start gap-4">
          <span
            class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={step.icon} /></svg>
          </span>
          <div>
            <h3 class="text-sm font-semibold text-navy-950 dark:text-white">
              <span class="text-(--accent-ink) tabular-nums">{i + 1}.</span>
              {step.title}
            </h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">{step.body}</p>
          </div>
        </li>
      {/each}
    </ol>

    <div use:reveal class="space-y-6">
      <VideoFacade
        videoId={mechanism.video.videoId}
        poster={mechanism.video.poster}
        caption={mechanism.video.caption}
        duration={mechanism.video.duration}
      />

      <div class="rounded-2xl surface-panel p-6">
        <div class="flex items-center gap-3">
          <span
            class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={mechanism.learningCurve.icon} /></svg>
          </span>
          <h3 class="font-semibold text-navy-950 dark:text-white leading-snug">{mechanism.learningCurve.title}</h3>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">
          {mechanism.learningCurve.body}
        </p>
        <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">{mechanism.learningCurve.source}</p>
      </div>
    </div>
  </div>
</section>

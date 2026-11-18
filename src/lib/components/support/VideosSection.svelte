<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { videos } from '$lib/content/support';
  import type { ExplicitGate } from './explicit-gate.svelte';

  let { gate }: { gate: ExplicitGate } = $props();

  const { feature, howTo, webinar, icons } = videos;
  const tagClass =
    'inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase bg-mist/55 text-navy-900 dark:bg-white/10 dark:text-mist';
  const playClass =
    'grid place-items-center size-14 shrink-0 rounded-full bg-navy-900 text-white transition-transform hover:scale-105 motion-reduce:transition-none ' +
    'dark:bg-white dark:text-navy-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)';
  const cardClass = 'rounded-[20px] bg-white ring-1 ring-inset ring-mist/85 dark:bg-navy-900 dark:ring-white/10';
</script>

{#snippet icon(d: string, size = 'size-4')}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="{size} shrink-0"><path {d} /></svg>
{/snippet}

{#snippet meta(tag: string, duration: string)}
  <div class="flex flex-wrap gap-2">
    <span class={tagClass}>{tag}</span>
    <span class="inline-flex items-center gap-1 text-sm font-semibold text-(--ink-mute) tabular-nums">{@render icon(icons.clock)}{duration}</span>
  </div>
{/snippet}

<!-- "Videos and Learning" (canvas board 1/2). Every video opens on YouTube in
     a new tab (links, not embeds — nothing loads from YouTube until a click);
     the 45-minute instruction video is self-hosted by the client and sits
     behind the 18+ gate. -->
<section id="videos" aria-labelledby="videos-h" class="scroll-mt-6 bg-mist/15 dark:bg-[#062536]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 id="videos-h" class="display-light">{videos.heading}</h2>
      <p class="max-w-3xl text-lg leading-relaxed text-(--ink-soft) text-pretty">{videos.intro}</p>
    </div>

    <div use:reveal class="grid gap-5 lg:grid-cols-3">
      <article class="{cardClass} lg:col-span-2 overflow-hidden flex flex-col">
        <div class="relative">
          <enhanced:img src={feature.image} alt={feature.imageAlt} sizes="(min-width: 1024px) 800px, 100vw" loading="lazy" class="block w-full aspect-video object-cover" />
          <a href={feature.href} target="_blank" rel="external noopener noreferrer" aria-label="{feature.play} (opens in a new tab)" class="{playClass} absolute inset-0 m-auto size-18!">
            {@render icon(icons.play, 'size-8 ml-1')}
          </a>
        </div>
        <div class="p-6 flex flex-col items-start gap-3">
          {@render meta(feature.tag, feature.duration)}
          <h3 class="text-xl font-semibold leading-snug text-(--ink)">{feature.heading}</h3>
          <a href={feature.href} target="_blank" rel="external noopener noreferrer" class="inline-flex items-center gap-1.5 min-h-11 font-bold text-navy-900 dark:text-white underline-offset-4 hover:underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)">
            {feature.link}<span class="sr-only"> (opens on YouTube in a new tab)</span> {@render icon(icons.external)}
          </a>
        </div>
      </article>

      <div class="flex flex-col gap-5">
        <article class="{cardClass} p-6 flex items-center gap-4">
          <a href={howTo.href} target="_blank" rel="external noopener noreferrer" aria-label="Play on YouTube: {howTo.heading} (opens in a new tab)" class={playClass}>
            {@render icon(icons.play, 'size-6 ml-0.5')}
          </a>
          <div class="flex flex-col gap-2">
            {@render meta(howTo.tag, howTo.duration)}
            <h3 class="font-semibold leading-snug text-(--ink)">{howTo.heading}</h3>
          </div>
        </article>
        <article class="{cardClass} p-6 flex flex-col gap-3">
          {@render meta(webinar.tag, webinar.count)}
          <h3 class="font-semibold leading-snug text-(--ink)">{webinar.heading}</h3>
          <ol class="flex flex-col gap-3">
            {#each webinar.parts as part (part.href)}
              <li class="flex flex-col gap-0.5">
                <a href={part.href} target="_blank" rel="external noopener noreferrer" class="self-start inline-flex items-center gap-2 min-h-11 font-bold text-navy-900 dark:text-white rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink) group">
                  <span aria-hidden="true" class="grid place-items-center size-8 rounded-full bg-mist/55 text-navy-900 dark:bg-white/10 dark:text-white group-hover:bg-mist">{@render icon(icons.play, 'size-4 ml-0.5')}</span>
                  Part {part.part}<span class="sr-only">: {part.title} (opens on YouTube in a new tab)</span>
                  <span class="font-normal text-sm text-(--ink-mute) tabular-nums">{part.duration}</span>
                </a>
                <span class="text-sm leading-snug text-(--ink-soft)">{part.body}</span>
              </li>
            {/each}
          </ol>
        </article>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-2xl font-semibold text-(--ink)">{videos.moreHeading}</h3>
      <ul use:reveal class="flex flex-col gap-3">
        {#each videos.more as item (item.title)}
          {@const locked = item.explicit && !gate.unlocked}
          <li class="{cardClass} p-4 sm:p-5 flex items-center gap-4">
            <enhanced:img src={item.thumb} alt="" sizes="96px" loading="lazy" class="hidden sm:block w-24 aspect-video object-cover rounded-xl" />
            <div class="flex-1 min-w-0 flex flex-col gap-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class={tagClass}>{item.tag}</span>
                <span class="inline-flex items-center gap-1 text-sm font-semibold text-(--ink-mute) tabular-nums">{@render icon(icons.clock)}{item.duration}</span>
                {#if item.explicit}
                  <span class="inline-flex items-center h-7 px-3 rounded-full text-xs font-bold tracking-[0.06em] uppercase bg-coral/20 text-navy-950 dark:bg-coral/25 dark:text-white">{videos.explicitLabel}</span>
                {/if}
              </div>
              <span class="leading-snug text-(--ink)">{item.title}</span>
            </div>
            {#if locked}
              <button type="button" onclick={() => gate.request()} aria-label="Play: {item.title} (explicit medical content: confirm first)" class={playClass}>
                {@render icon(icons.play, 'size-6 ml-0.5')}
              </button>
            {:else}
              <a href={item.href} target="_blank" rel="external noopener noreferrer" aria-label="Play: {item.title} (opens in a new tab)" class={playClass}>
                {@render icon(icons.play, 'size-6 ml-0.5')}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

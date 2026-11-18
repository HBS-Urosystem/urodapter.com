<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { using } from '$lib/content/support';
  import type { ExplicitGate } from './explicit-gate.svelte';

  let { gate }: { gate: ExplicitGate } = $props();

  const { webApp, realVideos, ifu, tips, icons } = using;
  let tipsOpen = $state(false);

  const cardClass =
    'rounded-[20px] bg-white ring-1 ring-inset ring-mist/85 shadow-[0_18px_40px_-30px_rgba(7,44,63,0.45)] ' +
    'dark:bg-navy-900 dark:ring-white/10 dark:shadow-none';
  const tagClass =
    'inline-flex items-center h-7 px-3 rounded-full text-xs font-bold tracking-[0.12em] uppercase bg-mist/55 text-navy-900 dark:bg-white/10 dark:text-mist';
  const buttonClass =
    'inline-flex items-center gap-2 min-h-12 px-5 rounded-full font-bold transition-colors ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)';
  const solidButton = `${buttonClass} bg-navy-900 text-white hover:bg-navy-950 dark:bg-white dark:text-navy-950 dark:hover:bg-mist`;
  const outlineButton = `${buttonClass} ring-[1.5px] ring-inset ring-navy-900 text-navy-900 hover:bg-navy-900/5 dark:ring-white/70 dark:text-white dark:hover:bg-white/10`;
</script>

{#snippet icon(d: string, size = 'size-5')}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="{size} shrink-0">
    <path {d} />
  </svg>
{/snippet}

<!-- "Using UroDapter" (canvas board 1/2): the Web App and the real-life videos
     (behind the 18+ gate), then the IFU and Tips & Tricks PDFs, with the
     "What's inside" summary of the Tips & Tricks on demand. -->
<section id="use" aria-labelledby="use-h" class="scroll-mt-6 bg-white dark:bg-navy-950">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 id="use-h" class="display-light">{using.heading}</h2>
      <p class="max-w-3xl text-lg leading-relaxed text-(--ink-soft) text-pretty">{using.intro}</p>
    </div>

    <div use:reveal class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,26rem),1fr))]">
      <article class="{cardClass} p-[clamp(1.5rem,2.6vw,2rem)] flex flex-wrap items-center gap-6">
        <div class="flex-[1_1_15rem] flex flex-col items-start gap-3">
          <span class={tagClass}>{webApp.tag}</span>
          <h3 class="text-2xl font-semibold leading-tight text-(--ink)">{webApp.heading}</h3>
          <p class="leading-relaxed text-(--ink-soft)">{webApp.body}</p>
          <a href={webApp.href} target="_blank" rel="external noopener noreferrer" class="{solidButton} mt-1">
            {webApp.link}<span class="sr-only">{webApp.srSuffix}</span>
            {@render icon(icons.external, 'size-[18px]')}
          </a>
          <span class="text-sm text-(--ink-mute)">{webApp.domain}</span>
        </div>
        <enhanced:img
          src={webApp.image}
          alt={webApp.imageAlt}
          sizes="200px"
          loading="lazy"
          class="flex-[0_1_11rem] w-44 h-auto mx-auto rounded-2xl ring-1 ring-mist/85 dark:ring-white/10"
        />
      </article>

      <article class="{cardClass} p-[clamp(1.5rem,2.6vw,2rem)] flex items-start gap-6">
        <div class="flex-1 flex flex-col items-start gap-3">
          <div class="flex flex-wrap gap-2">
            <span class={tagClass}>{realVideos.tag}</span>
            <span class="inline-flex items-center h-7 px-3 rounded-full text-xs font-bold tracking-[0.06em] uppercase bg-coral/20 text-navy-950 dark:bg-coral/25 dark:text-white">
              {realVideos.warning}
            </span>
          </div>
          <h3 class="text-2xl font-semibold leading-tight text-(--ink)">{realVideos.heading}</h3>
          <p class="leading-relaxed text-(--ink-soft)">{realVideos.body}</p>
          <span class="text-sm text-(--ink-mute)">{realVideos.meta}</span>
          <button type="button" class="{outlineButton} mt-1" onclick={() => gate.request('real-videos')}>
            {realVideos.button} <span aria-hidden="true">→</span>
          </button>
        </div>
        <span aria-hidden="true" class="hidden sm:grid place-items-center size-20 shrink-0 rounded-full bg-mist/55 text-navy-900 dark:bg-white/10 dark:text-mist">
          {@render icon(realVideos.icon, 'size-9')}
        </span>
      </article>
    </div>

    {#if gate.unlocked}
      <div class="flex flex-col gap-4">
        <p role="status" class="flex items-center gap-2.5 text-(--brand-ink)">
          {@render icon(realVideos.statusIcon)}
          {realVideos.unlocked}
        </p>
        <div id="real-videos" tabindex="-1" class="scroll-mt-6 rounded-2xl bg-navy-900 text-white p-[clamp(1.5rem,3vw,2.25rem)] flex flex-col gap-5 outline-none dark:ring-1 dark:ring-white/10">
          <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 class="text-[22px] font-semibold leading-tight">{realVideos.heading}</h3>
            <span class="text-sm text-mist">{realVideos.body}</span>
          </div>
          <div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))]">
            {#each realVideos.videos as video (video.base)}
              <figure class="flex flex-col gap-2.5">
                <!-- Real treatment footage with no audio track, so there is nothing to caption. -->
                <video controls preload="none" playsinline poster="{video.base}-poster.jpg" aria-label="Real-life instillation video: {video.label}" class="w-full aspect-video rounded-xl bg-black">
                  <source src="{video.base}.webm" type="video/webm" />
                  <source src="{video.base}.mp4" type="video/mp4" />
                </video>
                <figcaption class="flex justify-between gap-3 text-sm">
                  <span class="font-semibold">{video.label}</span>
                  <span class="text-mist tabular-nums">{video.duration}</span>
                </figcaption>
              </figure>
            {/each}
          </div>
        </div>
      </div>
    {/if}

    <div use:reveal class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,26rem),1fr))]">
      {#each [ifu, tips] as doc (doc.heading)}
        <article class="{cardClass} p-6 flex items-start gap-4">
          <span aria-hidden="true" class="grid place-items-center size-12 shrink-0 rounded-[14px] bg-mist/55 text-(--brand-ink) dark:bg-white/10">
            {@render icon(icons.document, 'size-6')}
          </span>
          <div class="flex-1 flex flex-col items-start gap-2">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 class="text-xl font-semibold leading-tight text-(--ink)">{doc.heading}</h3>
              <span class="text-sm font-semibold text-(--ink-mute)">{doc.tag}</span>
            </div>
            <p class="leading-relaxed text-(--ink-soft)">{doc.body}</p>
            <div class="mt-1 flex flex-wrap items-center gap-3">
              <a href={doc.href} download rel="external" class={outlineButton}>
                {@render icon(icons.download, 'size-[18px]')}
                {doc.link}
              </a>
              {#if doc === tips}
                <button
                  type="button"
                  aria-expanded={tipsOpen}
                  aria-controls="tips-inside"
                  onclick={() => (tipsOpen = !tipsOpen)}
                  class="inline-flex items-center gap-1.5 min-h-12 px-3 rounded-full font-semibold text-(--ink) hover:bg-mist/35 dark:hover:bg-white/10
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
                >
                  {tips.toggle}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
                    class="size-4 transition-transform motion-reduce:transition-none {tipsOpen ? 'rotate-180' : ''}"><path d={icons.chevron} /></svg>
                </button>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>

    <div id="tips-inside" hidden={!tipsOpen} class="rounded-2xl bg-mist/15 ring-1 ring-inset ring-mist/55 dark:bg-white/5 dark:ring-white/10 p-[clamp(1.5rem,3vw,2.25rem)]">
      <span class="eyebrow">{tips.insideLabel}</span>
      <div class="mt-5 grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))]">
        {#each tips.groups as group (group.heading)}
          <div>
            <h3 class="text-xl font-semibold text-(--ink)">{group.heading}</h3>
            <ul class="mt-3 flex flex-col gap-2 text-(--ink-soft)">
              {#each group.items as item (item)}
                <li class="flex items-start gap-3"><span aria-hidden="true" class="mt-2.5 size-1.5 shrink-0 rounded-full bg-(--brand-ink)"></span>{item}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
      <p class="mt-6 text-[15px] leading-relaxed text-(--ink-mute)">{tips.note}</p>
    </div>
  </div>
</section>

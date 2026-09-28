<script lang="ts">
  import productImage from '$lib/assets/hero/urodapter-product.png';

  let {
    videoId = null,
    sources = null,
    poster = null,
    posterBar = null,
    caption,
    captionPosition = 'below',
    duration,
  }: {
    videoId?: string | null;
    // Self-hosted clip (preferred): nothing is fetched until the user presses
    // play, and no third party is contacted at all.
    sources?: { webm?: string; mp4: string } | null;
    poster?: string | null;
    /**
     * Height of a caption bar burned into the bottom of a 16:9 poster, as a
     * fraction of the poster's height. The duration pill is centred in it; the
     * bar scales with the video, so a fixed px offset only fits one width.
     */
    posterBar?: number | null;
    caption: string;
    /** 'above' makes the caption the video's lead-in (home page); default 'below'. */
    captionPosition?: 'above' | 'below';
    duration: string;
  } = $props();

  const playable = $derived(Boolean(sources) || Boolean(videoId));

  let playing = $state(false);
</script>

<!-- Lite video facade: nothing loads until the user presses play.
     `sources` = a self-hosted clip (a native <video>, no third party at all);
     `videoId` = a youtube-nocookie embed. With neither, it renders a branded
     "Coming soon" placeholder instead. -->
<figure>
  {#if captionPosition === 'above'}
    <figcaption class="mb-3 text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] font-medium text-navy-950 dark:text-white">{caption}</figcaption>
  {/if}
  <div class="@container relative rounded-2xl overflow-hidden aspect-video border border-slate-200/70 dark:border-white/10 bg-navy-900">
    {#if playing && sources}
      <!-- The client's animation carries burned-in (open) captions. Add a
           <track kind="captions"> WebVTT file here once a transcript exists —
           open captions are not machine-readable and cannot be turned off. -->
      <video
        controls
        autoplay
        playsinline
        {poster}
        class="absolute inset-0 w-full h-full bg-navy-950 object-cover"
      >
        {#if sources.webm}<source src={sources.webm} type="video/webm" />{/if}
        <source src={sources.mp4} type="video/mp4" />
      </video>
    {:else if playing && videoId}
      <iframe
        src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0"
        title="Animation: how UroDapter works"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
        class="absolute inset-0 w-full h-full"
      ></iframe>
    {:else}
      {#if poster}
        <img src={poster} alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover" />
        <!-- Subtle scrim so the play control stays legible over the artwork -->
        <div class="absolute inset-0 bg-navy-950/15" aria-hidden="true"></div>
      {:else}
        <!-- Fallback poster: navy gradient, soft ripple rings, the device itself -->
        <div class="absolute inset-0" aria-hidden="true">
          <div class="absolute inset-0 poster-gradient"></div>
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/10"></div>
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/5"></div>
          <img
            src={productImage}
            alt=""
            loading="lazy"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 opacity-45 object-contain"
          />
        </div>
      {/if}

      {#if playable}
        <button
          onclick={() => (playing = true)}
          class="group absolute inset-0 flex items-center justify-center focus-visible:outline-none"
          aria-label="Play the animation"
        >
          <span class="w-16 h-16 rounded-full bg-white/95 text-navy-950 shadow-xl flex items-center justify-center transition-transform group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-(--accent-ink)">
            <svg class="w-7 h-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
          </span>
        </button>
      {:else}
        <div class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span class="w-16 h-16 rounded-full bg-white/70 text-navy-950 flex items-center justify-center">
            <svg class="w-7 h-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
          </span>
        </div>
        <span class="absolute top-3 left-3 text-xs font-medium text-white bg-navy-950/70 backdrop-blur rounded-md px-2 py-1">Coming soon</span>
      {/if}

      {#if poster && posterBar}
        <!-- Centred on the poster's own caption bar: `bottom` is a % of the
             box's height, so it tracks the bar at every width. The pill scales
             with the video (cqi) so it stays inside the bar, which is only
             ~21px tall at a 335px-wide phone video — a fixed 24px pill spilled
             over it. -->
        <span
          class="absolute translate-y-1/2 font-medium text-white bg-navy-950/80
                 right-[clamp(0.5rem,1.8cqi,0.75rem)] rounded-[clamp(0.25rem,0.9cqi,0.375rem)]
                 px-[clamp(0.375rem,1.2cqi,0.5rem)] py-[clamp(0.125rem,0.6cqi,0.25rem)]
                 text-[clamp(0.625rem,2.2cqi,0.75rem)] leading-[1.35]"
          style="bottom: {posterBar * 50}%">{duration}</span
        >
      {:else}
        <span class="absolute bottom-3 right-3 text-xs font-medium text-white bg-navy-950/80 rounded-md px-2 py-1">{duration}</span>
      {/if}
    {/if}
  </div>
  {#if captionPosition === 'below'}
    <figcaption class="mt-3 text-sm text-slate-600 dark:text-slate-300">{caption}</figcaption>
  {/if}
</figure>

<style>
  .poster-gradient {
    background:
      radial-gradient(420px 260px at 70% 20%, color-mix(in srgb, var(--accent, var(--color-patient)) 30%, transparent), transparent 70%),
      linear-gradient(135deg, var(--color-navy-800) 0%, var(--color-navy-950) 100%);
  }
</style>

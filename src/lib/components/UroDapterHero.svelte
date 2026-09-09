<script lang="ts">
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import heroImage from "$lib/assets/hero/urodapter-hero.png?enhanced";
  import productImage from "$lib/assets/hero/urodapter-product.png";
  import { hero, heroTrustStats, heroRegulatory } from "$lib/content/home";
</script>

<!-- HERO with full-width background photo; text is always white here
       because it sits on the photo + navy overlay in both color schemes -->
<section class="hero-section relative overflow-hidden text-white bg-navy-950">
  <!-- Below 960px the single-column content (cards, stats, testimonials)
         fully covers the photo anyway, so it's dropped in favor of a plain
         navy background instead of an obscured, cropped face. -->
  <!-- object-position keeps the right side (the people) visible when
         narrow viewports crop the 16:9 image -->
  <enhanced:img
    src={heroImage}
    alt=""
    aria-hidden="true"
    sizes="min(2752px, 100vw)"
    fetchpriority="high"
    class="hidden min-[960px]:block absolute inset-0 w-full h-full object-cover object-[75%_50%]"
  />
  <div class="hero-overlay absolute inset-0"></div>

  <div class="relative z-10"><SiteHeader variant="overlay" /></div>

  <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-14">
    <!-- One column. The testimonials used to sit in a second column here; they
         moved to the key-benefits row (client direction 2026-09-08), which is
         what lets the hero end just below the regulatory line instead of being
         stretched to the height of a quote stack. `lg:min-h` keeps enough photo
         on screen for the subjects to read. -->
    <div class="lg:min-h-[26rem] pt-10 sm:pt-14">
      <div class="lg:max-w-[62%]">
        <div
          class="flex flex-col sm:flex-row sm:items-start gap-6 max-w-xl lg:max-w-none"
        >
          <div class="flex-1 min-w-0">
            <h1
              class="font-bold tracking-tight leading-[1.05] text-[clamp(1.9rem,4.5vw,3rem)]"
            >
              {hero.headlineLines[0]}<br class="hidden sm:block" />
              {hero.headlineLines[1]}
            </h1>
            <p class="mt-4 text-slate-200 text-base sm:text-lg max-w-md">
              {hero.body}
            </p>
          </div>
          <div
            class="shrink-0 w-28 sm:w-32 lg:w-40 aspect-4/3 flex items-center justify-center p-4"
          >
<!-- Flipped vertically. The drop-shadow is a filter, so the flip
                 transform mirrors it too — its y offset is negated here to keep
                 the shadow falling downward. -->
            <img
              src={productImage}
              alt={hero.productAlt}
              width="410"
              height="276"
              class="w-full h-full object-contain -scale-y-100 drop-shadow-[0_-10px_16px_rgba(0,0,0,0.30)]"
            />
          </div>
        </div>

        <div
          class="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {#each heroTrustStats as stat (stat.label)}
            <div class="flex items-start gap-2.5">
              <svg
                class="w-8 h-8 text-slate-300 shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d={stat.icon}
                />
              </svg>
              <div class="min-w-0">
                <p class="text-sm">{stat.value}</p>
                <p class="text-sm mt-0.5">{stat.label}</p>
              </div>
            </div>
          {/each}
        </div>

        <!-- The regulatory facts, kept on the site in one line now that the
             journey pages point at the Support Center for the detail. -->
        <p class="mt-6 text-xs leading-relaxed text-slate-300/90 max-w-2xl">
          {heroRegulatory}
        </p>
      </div>

    </div>
  </div>
</section>

<style>
  /* .bg-page-gradient lives in layout.css — shared with subpages */

  /* Legibility overlay over the full-width hero photo: navy on the left
     (text side), fading toward the figures on the right; slight top/bottom fade.
     The left-hand stops are the ones that decide how heavy the hero reads; they
     are kept lighter in the light scheme so the photo isn't crushed to near-black
     next to the light page below, and restored to full strength in dark. The
     mid stop sits at 62% — the right edge of the `lg:max-w-[62%]` text column —
     so the trust-stat row keeps a tinted backdrop while everything past it opens
     up to the photo and the subjects read as photo, not as tinted photo. */
  .hero-overlay {
    --overlay-0: rgba(8, 17, 31, 0.62);
    --overlay-30: rgba(10, 21, 38, 0.55);
    --overlay-62: rgba(13, 26, 48, 0.4);
    --overlay-84: rgba(13, 26, 48, 0.04);
    --overlay-100: rgba(13, 26, 48, 0.06);

    background: linear-gradient(
        90deg,
        var(--overlay-0) 0%,
        var(--overlay-30) 30%,
        var(--overlay-62) 62%,
        var(--overlay-84) 84%,
        var(--overlay-100) 100%
      ),
      linear-gradient(
        180deg,
        rgba(8, 17, 31, 0.3) 0%,
        transparent 22%,
        transparent 72%,
        rgba(8, 17, 31, 0.4) 100%
      );
  }
  @media (prefers-color-scheme: dark) {
    .hero-overlay {
      --overlay-0: rgba(8, 17, 31, 0.96);
      --overlay-30: rgba(10, 21, 38, 0.9);
      --overlay-62: rgba(13, 26, 48, 0.55);
      --overlay-84: rgba(13, 26, 48, 0.12);
      --overlay-100: rgba(13, 26, 48, 0.18);
    }
  }
  /* 63.9375rem (1023px at the default 16px root) instead of a raw px value,
     so this lines up exactly with Tailwind's `lg:` (64rem) breakpoint used
     elsewhere in this component — mixing units here previously threw off
     Tailwind's breakpoint sort order and broke unrelated lg: utilities. */
  @media (max-width: 63.9375rem) {
    .hero-overlay {
      background: linear-gradient(
        180deg,
        rgba(8, 17, 31, 0.9) 0%,
        rgba(10, 21, 38, 0.8) 45%,
        rgba(13, 26, 48, 0.6) 100%
      );
    }
  }

</style>

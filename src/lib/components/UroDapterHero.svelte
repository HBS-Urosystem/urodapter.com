<script lang="ts">
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import heroImage from "$lib/assets/hero/urodapter-hero.png?enhanced";
  import productImage from "$lib/assets/hero/urodapter-product.png";
  import logoHorizontal from "$lib/assets/hero/UroDapter_logo_horizontal.svg";
  import logoSquare from "$lib/assets/hero/UroDapter_logo_square.svg";
  import {
    hero,
    heroTrustStats,
    heroRegulatory,
    quotes,
  } from "$lib/content/home";

  // check-badge (heroicons outline) — the trust pill's mark
  const badgeIcon =
    "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z";
</script>

<!-- HERO with full-width background photo; text is always white here
       because it sits on the photo + navy overlay in both color schemes -->
<section
  class="hero-section relative overflow-hidden text-white bg-navy-950 flex flex-col"
>
  <div class="relative z-10"><SiteHeader variant="overlay" /></div>

  <!-- The photo and its overlay are absolute; what they cover is decided by
       which ancestor is positioned. Below md this wrapper is `relative`, so the
       photo starts under the SiteHeader (which then sits on plain navy) and
       runs behind the product image and the rest of the column. From md up the
       wrapper is `static`, so the same absolute boxes resolve against the
       section instead and the photo goes full-bleed behind the header too.
       Doing it this way keeps the header's height out of the CSS. -->
  <div class="relative md:static flex-1">
    <!-- The crop anchor is stepped, and every value is measured, not guessed.
         Below lg the band is portrait, so object-cover matches its *height* and
         overflows horizontally: the crop is purely horizontal, the Y value does
         nothing, and the X value decides what sits behind the brand lockup. Two
         goals pull against each other — the lockup must stay left of ~66% (the
         patient's head runs ~66–78%) while the window must reach ~88% for the
         clinician (~85–100%) to be in shot.
         Restoring the testimonials to the hero (2026-09-13) made the band far
         taller below lg — 999px at 375 against 635px before — which narrows the
         visible window to ~21% of the frame and slides everything right. These
         anchors are the re-solved values that keep the lockup off her face at
         the new heights; the clinician is the casualty below ~700px, and the
         only lever that brings her back is stopping the band from stretching
         behind the testimonials.
           <400px   69%    lockup ends ~65%, clinician out of frame
           400px    73%    lockup ends ~65%, clinician out of frame
           480px    76%    lockup ends ~65%, clinician out of frame
           640px    80%    lockup ends ~65%, clinician ~20% at 640, ~50% at 1023
           1024px   75%    desktop; lockup under the copy, ends ~45% (36% at 1280)
         Re-measure (lockup rect vs. band rect, converted to source %) before
         changing any of these, and re-measure again if the hero's height moves —
         the band's aspect is the input to all of it. -->
    <enhanced:img
      src={heroImage}
      alt=""
      aria-hidden="true"
      sizes="min(2752px, 100vw)"
      fetchpriority="high"
      class="hero-photo absolute inset-0 w-full h-full object-cover object-[73%_50%] min-[25rem]:object-[79%_50%] min-[30rem]:object-[84%_50%] sm:object-[88%_50%] lg:object-[75%_50%]"
    />
    <div class="hero-overlay absolute inset-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-14">
      <!-- Two columns from lg, one below it, and the testimonials are the same
           markup in both — the grid is what moves them. From lg they are the
           right-hand column, floating over the photo as they did before they
           were moved to the key-benefits row; below lg the wrapper is a plain
           block, so they simply fall after the credibility strip and its
           regulatory line (client direction 2026-09-13, reversing 2026-09-08).
           `1.5fr_1fr` reproduces the old split and stands in for the
           `lg:max-w-[62%]` the left column used to carry. -->
      <div
        class="lg:min-h-[26rem] pt-10 sm:pt-14 lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-x-10 lg:items-start"
      >
        <div>
          <!-- The brand lockup — logo plus product image, always side by side
               (client direction 2026-09-27) — sits under the copy at every
               width, aligned to the copy's left edge. It was centred on the copy
               column until the lockup grew a logo: a centred lockup sits on the
               middle of the frame, and any crop that keeps the clinician in shot
               puts the patient's face there too, so the two collided at every
               width in 400–640px. Left-aligning frees the right half of the
               frame for both subjects (client direction 2026-09-12, chosen over
               cropping the clinician or covering the patient).
               It briefly sat above the copy (`order-first`) — that read as part
               of the header rather than the hero; don't put it back. From lg the
               product image used to sit beside the headline with the logo alone
               under the copy; the client wants the two together, so don't split
               them again. -->
          <div class="flex flex-col gap-6 lg:gap-10">
            <div class="min-w-0 max-w-xl lg:max-w-none">
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
              class="w-full max-w-xl flex items-center justify-start gap-3 sm:gap-4"
            >
              <!-- Lockup left of the chip, sized so its *ink* matches the
                   product image's height, not its box: the artwork fills 73.5%
                   of the square viewBox and 63.6% of the horizontal one, so each
                   box is height/inkFraction.
                   Which version depends on how much frame the row can spare. The
                   horizontal lockup is ~196px wide once ink-matched, and below
                   768px that pushes this row onto the patient's face — at 640px
                   it would cut the clinician from 67% of her width to 29%. From
                   768px the visible window is wide enough (69% of the frame vs
                   58% at 640px) that it costs nothing, so the horizontal one
                   takes over there (client direction 2026-09-12).
                   Decorative — SiteHeader carries the brand as a link. -->
              <img
                src={logoSquare}
                alt=""
                aria-hidden="true"
                class="shrink-0 w-auto h-[3.4rem] sm:h-[5.44rem] md:hidden"
              />
              <img
                src={logoHorizontal}
                alt=""
                aria-hidden="true"
                class="hidden shrink-0 w-auto md:block md:h-[6.29rem] lg:h-[8.65rem]"
              />
              <div
                class="shrink-0 w-24 sm:w-32 lg:w-40 aspect-4/3 flex items-center justify-center p-4"
              >
                <!-- Flipped vertically. The drop-shadow is a filter, so the
                     flip transform mirrors it too — its y offset is negated
                     here to keep the shadow falling downward. -->
                <img
                  src={productImage}
                  alt={hero.productAlt}
                  width="410"
                  height="276"
                  class="w-full h-full object-contain -scale-y-100 drop-shadow-[0_-10px_16px_rgba(0,0,0,0.30)]"
                />
              </div>
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

        <!-- Glass over the photo, so it reads as floating rather than as a card
             on the page. `lg:self-end lg:translate-y-8` drops it against the
             bottom of the band the way it sat before; below lg it is just the
             next block after the regulatory line. -->
        <div
          class="mt-10 space-y-3 lg:mt-0 lg:w-full lg:max-w-sm lg:justify-self-end lg:self-end lg:translate-y-8"
        >
          <div
            class="inline-flex items-center gap-2 bg-navy-900/80 backdrop-blur border border-white/10 rounded-full pl-3 pr-4 py-2"
          >
            <svg
              class="w-4 h-4 text-sky-300 shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d={badgeIcon}
              /></svg
            >
            <p class="text-xs font-semibold text-slate-200">{quotes.pill}</p>
          </div>

          <div
            class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl shadow-xl divide-y divide-white/10"
          >
            {#each quotes.items as quote (quote.author)}
              <blockquote class="p-4">
                <p class="text-sm leading-relaxed text-white text-pretty">
                  &ldquo;{quote.quote}&rdquo;
                </p>
                <footer class="mt-2 text-xs text-slate-300">
                  <span class="font-bold text-white">{quote.author}</span>
                  {#if quote.subAuthor}<br />{quote.subAuthor}{/if}
                </footer>
              </blockquote>
            {/each}
          </div>
        </div>
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
  /* The photo is capped below lg. Stacking the testimonials into the hero takes
     it to ~900–1000px there, and a 16:9 source covering a box that tall leaves a
     ~21%-wide window, which crops the clinician out entirely. Capping the photo
     holds the band's aspect near what it was before the quotes came back, so the
     crop anchors keep both subjects in frame (client direction 2026-09-13).
     Below the cap the quotes sit on the navy base; the mask fades the photo out
     over its last quarter instead of ending it on a hard line. From lg the photo
     fills the section again — the hero is landscape there and crops vertically. */
  .hero-photo {
    max-height: 40rem;
    -webkit-mask-image: linear-gradient(to bottom, #000 74%, transparent 100%);
    mask-image: linear-gradient(to bottom, #000 74%, transparent 100%);
  }
  @media (min-width: 64rem) {
    .hero-photo {
      max-height: none;
      -webkit-mask-image: none;
      mask-image: none;
    }
  }

  /* 63.9375rem (1023px at the default 16px root) instead of a raw px value,
     so this lines up exactly with Tailwind's `lg:` (64rem) breakpoint used
     elsewhere in this component — mixing units here previously threw off
     Tailwind's breakpoint sort order and broke unrelated lg: utilities. */
  @media (max-width: 63.9375rem) {
    /* Single-column widths: the copy runs the full width, so the left-to-right
       fade has nothing to protect and a top-to-bottom one takes over. Lighter
       in the light scheme for the same reason as above — the photo now shows at
       every size, and the old values buried it. */
    /* The stops follow what is behind them rather than fading one way. A flat
       gradient here kept the copy legible but sat just as heavily on the faces
       as on the background, and below lg the subjects read far darker than they
       do on desktop, where the horizontal fade leaves them almost clear
       (client direction 2026-09-12). So the band dips at ~38%, which is where
       the crop puts the two faces, and comes back for the credibility strip and
       the 12px regulatory line — those run over the subject's light sweater and
       need the cover. */
    .hero-overlay {
      --overlay-top: rgba(8, 17, 31, 0.6);
      --overlay-faces: rgba(10, 21, 38, 0.42);
      --overlay-strip: rgba(13, 26, 48, 0.62);
      --overlay-bottom: rgba(13, 26, 48, 0.74);

      background: linear-gradient(
        180deg,
        var(--overlay-top) 0%,
        var(--overlay-faces) 38%,
        var(--overlay-strip) 62%,
        var(--overlay-bottom) 100%
      );
    }
    @media (prefers-color-scheme: dark) {
      .hero-overlay {
        --overlay-top: rgba(8, 17, 31, 0.86);
        --overlay-faces: rgba(10, 21, 38, 0.6);
        --overlay-strip: rgba(13, 26, 48, 0.74);
        --overlay-bottom: rgba(13, 26, 48, 0.82);
      }
    }
  }

</style>

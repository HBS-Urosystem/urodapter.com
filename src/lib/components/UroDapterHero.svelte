<script lang="ts">
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import heroImage from "$lib/assets/hero/urodapter-hero.png?enhanced";
  import productImage from "$lib/assets/hero/urodapter-product.png";
  import logoHorizontal from "$lib/assets/hero/UroDapter_logo_horizontal.svg";
  import logoSquare from "$lib/assets/hero/UroDapter_logo_square.svg";
  import { hero, heroTrustStats, heroRegulatory } from "$lib/content/home";
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
    <!-- The crop anchor is stepped, and the steps are not monotonic on purpose.
         Below lg the band is portrait, so covering the 16:9 source matches its
         *height* and overflows horizontally: the crop is purely horizontal, the
         Y value does nothing, and the X value is exactly what ends up behind the
         centred product chip. As the viewport widens the visible window widens
         faster than the chip moves, so the chip sweeps leftward across the
         source — 84% of the frame at 375px down to 37% at 1023px — dragging it
         straight over the patient, whose head occupies ~61–77%. One anchor
         therefore cannot clear her at every width (a single 75% put the chip on
         her cheek; a single 100% fixed 375px but not 500–768px). Each step below
         parks the chip on quiet frame while keeping her fully in shot:
           <400px   100% — narrowest window; she sits left, the clinician right,
                           and the chip falls in the gap between them
           400px     62% — past ~400px a 100% anchor drags the chip onto her
                           cheek, so the anchor pulls back to keep it left of her
           768px+    75% — window is nearly the full width; the chip is over the
                           blurred background, and this is the desktop framing too
         400px is in rem for the same reason the media query below is: mixing
         units with Tailwind's rem breakpoints throws off its sort order.
         The anchors also have to keep the clinician in frame (she occupies
         ~85–100% of the source) — below lg she was cropped almost entirely away
         (client direction 2026-09-12). Both goals pull against each other: the
         lockup must stay left of ~66%, which caps how far right the window can
         reach. The stops are the best each range allows, measured:
           <400px  75% — window is only ~34% of the frame, too narrow to hold
                         lockup + patient + clinician; the patient wins and the
                         clinician stays out. Not fixable without a shorter band.
           400px   80% — clinician starts to appear (~20% of her at 430px)
           480px   88% — 57% of her at 480px, 69% at 768px, 92% at 1023px
           1024px  75% — desktop framing, unchanged
         Re-measure (lockup rect vs. band rect, converted to source %) before
         changing any of these; they are not arbitrary. -->
    <enhanced:img
      src={heroImage}
      alt=""
      aria-hidden="true"
      sizes="min(2752px, 100vw)"
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover object-[75%_50%] min-[25rem]:object-[80%_50%] min-[30rem]:object-[88%_50%] lg:object-[75%_50%]"
    />
    <div class="hero-overlay absolute inset-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-14">
      <!-- One column. The testimonials used to sit in a second column here; they
           moved to the key-benefits row (client direction 2026-09-08), which is
           what lets the hero end just below the regulatory line instead of being
           stretched to the height of a quote stack. `lg:min-h` keeps enough photo
           on screen for the subjects to read. -->
      <div class="lg:min-h-[26rem] pt-10 sm:pt-14">
        <div class="lg:max-w-[62%]">
          <!-- Under 1024px this row stacks, so the brand lockup lands under the
               copy rather than beside it, aligned to the copy's left edge. It
               was centred on the copy column until the lockup grew a logo: a
               centred lockup sits on the middle of the frame, and any crop that
               keeps the clinician in shot puts the patient's face there too, so
               the two collided at every width in 400–640px. Left-aligning frees
               the right half of the frame for both subjects (client direction
               2026-09-12, chosen over cropping the clinician or covering the
               patient). From lg up both width caps lift and the row turns, so
               the lockup sits right of the headline.
               It briefly sat above the copy (`order-first`) — that read as part
               of the header rather than the hero; don't put it back. -->
          <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
            <!-- `lg:flex-initial` so the column is as wide as the copy, not as
                 wide as the 62% track. As `flex-1` it grew to fill, which left
                 a ~300px void between the text and the product image and pinned
                 the image to the far right of the track. -->
            <div class="flex-1 min-w-0 max-w-xl lg:max-w-none lg:flex-initial">
              <h1
                class="font-bold tracking-tight leading-[1.05] text-[clamp(1.9rem,4.5vw,3rem)]"
              >
                {hero.headlineLines[0]}<br class="hidden sm:block" />
                {hero.headlineLines[1]}
              </h1>
              <p class="mt-4 text-slate-200 text-base sm:text-lg max-w-md">
                {hero.body}
              </p>
              <!-- From lg the horizontal lockup gets a row of its own under the
                   copy, centred on the text column, while the product image
                   stays beside the headline. Height is ink-matched to that image
                   (88px) the same way the square one is: the artwork fills 63.6%
                   of this viewBox, so the box is 88/0.636. -->
              <img
                src={logoHorizontal}
                alt=""
                aria-hidden="true"
                class="hidden lg:block mx-auto mt-10 w-auto h-[8.65rem]"
              />
            </div>
            <div
              class="w-full max-w-xl lg:w-auto lg:max-w-none shrink-0 flex items-center justify-start gap-3 sm:gap-4"
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
                class="hidden shrink-0 w-auto md:block md:h-[6.29rem] lg:hidden"
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

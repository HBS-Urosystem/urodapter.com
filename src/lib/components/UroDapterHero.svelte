<script lang="ts">
  import heroImage from '$lib/assets/hero/urodapter-hero.png?enhanced';
  import productImage from '$lib/assets/hero/urodapter-product.png';
  import HeroAudienceCards from '$lib/components/home/HeroAudienceCards.svelte';
  import QuoteRotator from '$lib/components/home/QuoteRotator.svelte';
  import { hero, heroTrustStats, heroRegulatory, quotes } from '$lib/content/home';

  // heroicons outline — arrow-down, arrow-up-right
  const arrowDownIcon = 'M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3';
  const arrowUpRightIcon = 'm4.5 19.5 15-15m0 0H8.25m11.25 0v11.25';
</script>

<!-- Home hero (owner direction 2026-09-27, docs/home-hero-redesign/plan.md).
     No background of its own: the route's .bg-page-gradient shows through, so
     it is light in light mode and navy in dark. The photo is a framed media
     block — no text ever sits on it except the glass quote panel and cards.

     Fluid first (design system §2 "The home page"): type, spacing, the CTA row,
     the card grid and the strip size themselves from the space they get
     (clamp / cqi / intrinsic grids). The only media queries are the two
     structural ones in the styles below, where blocks change place. -->
<section aria-labelledby="hero-heading" class="pt-[clamp(1.75rem,0.75rem+3vw,3.5rem)]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- One DOM order for every width — the mobile reading order: copy →
         media → chip → cards. The grid areas below move the chip under the
         CTAs from md, so it is rendered once. It holds nothing focusable, so
         the visual reordering leaves the tab order alone. -->
    <div class="hero-grid">
      <!-- A size container: the headline scales with the column it sits in,
           not the viewport, so "Catheter‑free" always fits on one line. -->
      <div class="hero-copy @container">
        <p
          class="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] leading-none border whitespace-nowrap
                 border-navy-950/10 bg-white/70 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300"
        >
          <svg class="w-4 h-4 shrink-0 text-(--brand-ink)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
            ><path stroke-linecap="round" stroke-linejoin="round" d={hero.regulatoryPill.icon} /></svg
          >
          <!-- The full label needs ~23rem; narrower copy columns get the short one. -->
          <span class="@min-[23.5rem]:hidden">{hero.regulatoryPill.labelShort}</span>
          <span class="hidden @min-[23.5rem]:inline">{hero.regulatoryPill.label}</span>
        </p>

        <!-- Sized by the copy column (cqi), not the viewport: 44px at a 335px
             phone column, 73px in the 486px desktop column, capped at 76px.
             "Catheter‑free" measures 5.8em in the system sans, so the line fits
             with room for wider fallback fonts at every width; U+2011 in the
             copy keeps the hyphen unbreakable. -->
        <h1
          id="hero-heading"
          class="mt-[clamp(1.25rem,1rem+0.75vw,1.5rem)] font-bold tracking-[-0.035em] leading-none text-balance
                 text-[clamp(2.75rem,19.2cqi-1.27rem,4.75rem)] text-navy-950 dark:text-white"
        >
          {hero.headline}
        </h1>
        <p
          class="mt-[clamp(1rem,0.875rem+0.4vw,1.25rem)] max-w-md text-[clamp(1.125rem,1.05rem+0.25vw,1.25rem)] leading-relaxed text-pretty
                 text-slate-600 dark:text-slate-300"
        >
          {hero.body}
        </p>

        <!-- Stacks without a breakpoint: the row is only as wide as both
             buttons side by side (`w-fit`), capped at the column. When they no
             longer fit they wrap, and `grow` stretches each to the full width. -->
        <div class="mt-[clamp(1.5rem,1rem+1.5vw,2rem)] flex flex-wrap gap-3 w-fit max-w-full">
          <a
            href={hero.primaryCta.href}
            class="brand-pill grow h-[clamp(3rem,2.875rem+0.4vw,3.25rem)] px-6 rounded-full inline-flex items-center justify-center gap-2.5 font-semibold
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
          >
            {hero.primaryCta.label}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
              ><path stroke-linecap="round" stroke-linejoin="round" d={arrowDownIcon} /></svg
            >
          </a>
          <a
            href={hero.secondaryCta.href}
            class="grow h-[clamp(3rem,2.875rem+0.4vw,3.25rem)] px-6 rounded-full inline-flex items-center justify-center font-medium border transition-colors
                   border-navy-950/20 text-navy-950 hover:bg-navy-950/5 dark:border-white/25 dark:text-white dark:hover:bg-white/5
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <!-- The photo box, with the one testimonial panel. From md the panel is
           glass over the photo's top-left, its left edge lined up with the
           patient card's. A card is (100% − 2 × 1.25rem inset − 1rem gap) / 2 of
           the box. At md the panel is that × 7/6 (D4); from lg it is exactly one
           card wide, so it squares up with the patient card below it (owner
           direction 2026-09-28). Below md it overlaps the photo's bottom edge in
           normal flow. -->
      <div class="hero-media relative">
        <div class="hero-photo relative rounded-3xl overflow-hidden shadow-xl shadow-navy-950/10 dark:shadow-none">
          <!-- The box is narrower than the 16:9 source at every width, so the
               crop is horizontal and only the X anchor matters: right-anchored,
               the two subjects stay in frame and the glass sits on the wall. -->
          <enhanced:img
            src={heroImage}
            alt=""
            aria-hidden="true"
            sizes="(min-width: 80rem) 681px, (min-width: 64rem) 55vw, 100vw"
            fetchpriority="high"
            class="absolute inset-0 w-full h-full object-cover object-[100%_50%]"
          />
        </div>
        <QuoteRotator
          items={quotes.items}
          label={quotes.label}
          class="z-10 -mt-14 mx-3 md:absolute md:top-6 md:left-5 md:mt-0 md:mx-0 md:w-[calc((100%-3.5rem)*7/12)] lg:w-[calc((100%-3.5rem)/2)]"
        />
      </div>

      <div class="hero-chip">
        <div
          class="flex w-full max-w-md items-center gap-4 rounded-2xl p-3 pr-5 border
                 border-navy-950/10 bg-white/70 dark:border-white/10 dark:bg-white/5"
        >
          <div class="w-22 h-18 shrink-0 rounded-xl bg-slate-100 dark:bg-navy-800 flex items-center justify-center overflow-hidden p-2">
            <!-- Flipped vertically. The drop-shadow is a filter, so the flip
                 mirrors it too — its y offset is negated to keep it falling down. -->
            <img
              src={productImage}
              alt={hero.product.alt}
              width="922"
              height="753"
              class="w-full h-full object-contain -scale-y-100 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.25)]"
            />
          </div>
          <div class="min-w-0">
            <p class="text-[15px] font-semibold leading-snug text-navy-950 dark:text-white">{hero.product.title}</p>
            <p class="mt-0.5 text-sm leading-snug text-slate-600 dark:text-slate-400 text-pretty">{hero.product.body}</p>
          </div>
        </div>
      </div>

      <div class="hero-cards">
        <!-- Only while the cards follow the chip; from md they sit on the photo. -->
        <p class="md:hidden mt-8 mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-400">
          {hero.choosePathLabel}
        </p>
        <!-- In flow, never absolutely positioned: only the negative margin pulls
             them over the photo, so taller cards push the strip down instead of
             sliding under it. -->
        <HeroAudienceCards class="relative z-10 md:mx-5 md:-mt-[clamp(5rem,2rem+5vw,6rem)]" />
      </div>
    </div>

    <!-- Credibility strip: a size container, so it goes 2 → 4 columns (icons
         on) when it has room, not at a viewport width. ≥ 48px clear of the
         cards, which are the lowest thing in the right-hand column. -->
    <div class="@container mt-12 pt-8 border-t border-navy-950/10 dark:border-white/10">
      <ul class="grid grid-cols-2 @2xl:grid-cols-4 gap-x-[clamp(1rem,0.5rem+1.5vw,1.5rem)] gap-y-6">
        {#each heroTrustStats as stat (stat.title)}
          <li class="flex items-start gap-3 min-w-0">
            <svg
              class="hidden @2xl:block w-7 h-7 shrink-0 text-slate-500 dark:text-slate-300"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d={stat.icon} /></svg
            >
            <div class="min-w-0">
              <p
                class={stat.emphasis
                  ? 'text-[clamp(1.375rem,1.25rem+0.4vw,1.5rem)] leading-tight font-bold tracking-tight text-navy-950 dark:text-white'
                  : 'text-base leading-snug font-medium text-navy-950 dark:text-white'}
              >
                {stat.title}
              </p>
              {#if stat.sub}
                <p class="text-sm leading-snug text-slate-600 dark:text-slate-400">{stat.sub}</p>
              {/if}
              {#if stat.link}
                <a
                  href={stat.link.externalHref}
                  target="_blank"
                  rel="external noopener noreferrer"
                  class="inline-flex items-center gap-1 py-1 -my-1 text-sm font-medium text-(--brand-ink) hover:underline underline-offset-4
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
                >
                  {stat.link.label}
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"
                    ><path stroke-linecap="round" stroke-linejoin="round" d={arrowUpRightIcon} /></svg
                  >
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    </div>

    <!-- The regulatory facts in one line, under the strip at every width (D8). -->
    <p class="mt-6 max-w-2xl text-xs leading-relaxed text-slate-600 dark:text-slate-400">
      {heroRegulatory}
    </p>
  </div>
</section>

<style>
  /* The two structural steps — where blocks change place, which no fluid value
     can express. Written in rem so they sort with Tailwind's md: / lg:, which
     the markup uses for the matching per-block switches. Everything between
     the steps is fluid. */
  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
  .hero-media {
    margin-top: clamp(1.75rem, 1rem + 2vw, 2.5rem);
  }
  /* Below md the chip follows the quote panel. */
  .hero-chip {
    margin-top: 1rem;
  }
  /* The photo box's aspect changes with the layout: 7:5 as a phone-width
     block, 16:9 full width at md, 3:2 in the right-hand column. Measured, not
     taken from the plan's 4:3: the box is narrower than the 16:9 source, so a
     taller aspect crops more from the left, and at 4:3 the quote panel ended
     3–6px short of the patient's eye at 1024–1280. 3:2 gives ~30px. */
  .hero-photo {
    aspect-ratio: 7 / 5;
  }

  @media (min-width: 48rem) {
    .hero-grid {
      grid-template-areas: 'copy' 'chip' 'media' 'cards';
    }
    .hero-copy {
      grid-area: copy;
    }
    .hero-chip {
      grid-area: chip;
      margin-top: clamp(2rem, 0.5rem + 3vw, 3rem);
    }
    .hero-media {
      grid-area: media;
    }
    .hero-cards {
      grid-area: cards;
    }
    .hero-photo {
      aspect-ratio: 16 / 9;
    }
  }

  @media (min-width: 64rem) {
    /* Row 1 holds nothing but the photo, so it is exactly the photo's height and
       the cards (rows 2–3) always start at its bottom edge — their negative
       margin then pulls them over it by the same amount at every width. The
       copy spans rows 1–2, so when it is taller than the photo (1024–1280px,
       where the right column is narrow) row 2 takes the difference and the chip
       (row 3) still starts right under the copy. Pinning the cards to the copy
       instead left them overlapping the photo by 18px at 1024.
       The right-hand track is fluid rather than a fixed 7fr: 32% + 18.3rem is
       600px at 1024 and 681px (= 7/12, the mockup's split) from 1280, so each
       card stays ≥ 260px — the width at which "Clinical use & evidence" stays
       on one line beside its arrow chip and the two footers line up. A plain
       7fr gave 240px cards at 1024. */
    .hero-grid {
      grid-template-columns: minmax(0, 1fr) calc(32% + 18.3rem);
      grid-template-rows: auto auto 1fr;
      grid-template-areas:
        'copy media'
        'copy cards'
        'chip cards';
      column-gap: clamp(2.5rem, 1rem + 2.5vw, 3rem);
    }
    .hero-copy {
      padding-top: clamp(1rem, -1rem + 3vw, 2.25rem);
    }
    .hero-chip {
      align-self: start;
    }
    .hero-media {
      margin-top: 0;
    }
    .hero-photo {
      aspect-ratio: 3 / 2;
    }
  }
</style>

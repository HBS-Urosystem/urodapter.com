<script lang="ts">
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import heroImage from "$lib/assets/hero/urodapter-hero.png?enhanced";
  import productImage from "$lib/assets/hero/urodapter-product.png";
  import {
    hero,
    heroAudiences,
    heroTrustStats,
    heroTestimonials,
    audienceCards,
    heroSupportCard,
  } from "$lib/content/home";
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
    <div
      class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-x-10 gap-y-20 lg--gap-14 items-start lg:min-h-[38rem] pt-10 sm:pt-14"
    >
      <!-- Left: headline + product chip + audience cards + trust bar -->
      <div>
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
            <img
              src={productImage}
              alt={hero.productAlt}
              width="410"
              height="276"
              class="w-full h-full object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.30)]"
            />
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          {#each heroAudiences as audience (audience.id)}
            <div
              data-tone={audience.tone}
              class="audience-glass backdrop-blur-md border border-white/10 rounded-2xl p-5"
            >
              <div class="flex items-center gap-2.5 mb-3">
                <span
                  class="audience-chip w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d={audience.icon}
                    /></svg
                  >
                </span>
                <h2 class="font-semibold text-sm">{audience.label}</h2>
              </div>
              <ul class="space-y-2 text-sm text-slate-200">
                {#each audience.benefits as benefit (benefit)}
                  <li class="flex items-start gap-2">
                    <span class="audience-tick mt-0.5">&check;</span>{benefit}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
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
      </div>

      <!-- Right: testimonials floating over the photo -->
      <div
        class="lg:justify-self-end lg:self-end lg:translate-y-8 w-full lg:max-w-sm space-y-3"
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
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            /></svg
          >
          <p class="text-xs font-semibold text-slate-200 whitespace-nowrap">
            {hero.trustPill}
          </p>
        </div>

        <div
          class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl shadow-xl divide-y divide-white/10"
        >
          {#each heroTestimonials as testimonial (testimonial.author)}
            <blockquote class="p-4">
              <p class="text-sm leading-relaxed text-white">
                "{testimonial.quote}"
              </p>
              <footer class="mt-2 text-xs text-slate-300">
                <span class="font-bold text-white">{testimonial.author}</span>
                {#if testimonial.subAuthor}<br />{testimonial.subAuthor}{/if}
              </footer>
            </blockquote>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA row below the hero, on the theme-aware page background -->
<div class="max-w-7xl mx-auto px-5 sm:px-8">
  <div class="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-14">
    {#each audienceCards as card (card.id)}
      <a
        href={card.href}
        data-color={card.id}
        class="group audience-card transition-[background] rounded-2xl p-5 flex flex-col"
      >
        <h3 class="font-semibold text-sm text-white">{card.title}</h3>
        <p class="text-xs text-white/80 mt-1.5 flex-1">{card.copy}</p>
        <span
          class="mt-3 text-sm text-white group-hover:translate-x-1 transition-transform"
          >→</span
        >
      </a>
    {/each}

    <a
      href={heroSupportCard.href}
      class="group bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/15 transition-colors rounded-2xl p-5 flex flex-col justify-between"
    >
      <div class="flex items-start gap-2">
        <svg
          class="w-8 h-8 shrink-0 text-slate-500 dark:text-slate-300"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d={heroSupportCard.icon}
          /></svg
        >
        <p class="text-xs text-slate-600 dark:text-slate-300">
          {heroSupportCard.copy}
        </p>
      </div>
      <span
        class="mt-3 text-sm font-medium text-navy-950 dark:text-white flex items-center gap-1.5"
        >{heroSupportCard.linkLabel}
        <span class="group-hover:translate-x-1 transition-transform">→</span
        ></span
      >
    </a>
  </div>
</div>

<style>
  /* .bg-page-gradient lives in layout.css — shared with subpages */

  /* Legibility overlay over the full-width hero photo: navy on the left
     (text side), fading toward the figures on the right; slight top/bottom fade.
     The left-hand stops are the ones that decide how heavy the hero reads; they
     are kept lighter in the light scheme so the photo isn't crushed to near-black
     next to the light page below, and restored to full strength in dark. */
  .hero-overlay {
    --overlay-0: rgba(8, 17, 31, 0.62);
    --overlay-30: rgba(10, 21, 38, 0.55);
    --overlay-55: rgba(13, 26, 48, 0.32);
    --overlay-80: rgba(13, 26, 48, 0.08);
    --overlay-100: rgba(13, 26, 48, 0.2);

    background: linear-gradient(
        90deg,
        var(--overlay-0) 0%,
        var(--overlay-30) 30%,
        var(--overlay-55) 55%,
        var(--overlay-80) 80%,
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
      --overlay-55: rgba(13, 26, 48, 0.55);
      --overlay-80: rgba(13, 26, 48, 0.14);
      --overlay-100: rgba(13, 26, 48, 0.3);
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

  /* Hero audience glass cards: one markup block, tinted per audience tone.
     The tick colour is the light 300-step of each persona hue — the deep
     brand colours are invisible on the navy overlay. */
  .audience-glass {
    background: color-mix(in srgb, var(--color-patient) 25%, transparent);
  }
  .audience-glass[data-tone="clinician"] {
    background: color-mix(in srgb, var(--color-clinician) 25%, transparent);
  }
  .audience-chip {
    background: var(--color-patient);
  }
  .audience-glass[data-tone="clinician"] .audience-chip {
    background: var(--color-clinician);
  }
  .audience-tick {
    color: var(--color-sky-300, #7dd3fc);
  }
  .audience-glass[data-tone="clinician"] .audience-tick {
    color: var(--color-emerald-300, #6ee7b7);
  }

  /* Audience cards: dark base tone in the top-left corner, lightening
     toward the bottom-right, per color per card. On hover the gradient
     runs from a 10%-black-mixed shade of the base color to the base color. */
  .audience-card {
    background: linear-gradient(
      135deg,
      var(--color-patient) 0%,
      color-mix(in srgb, var(--color-patient) 85%, white) 100%
    );
  }
  .audience-card:hover {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-patient) 85%, black) 0%,
      var(--color-patient) 100%
    );
  }
  .audience-card[data-color="clinician"] {
    background: linear-gradient(
      135deg,
      var(--color-clinician) 0%,
      color-mix(in srgb, var(--color-clinician) 85%, white) 100%
    );
  }
  .audience-card[data-color="clinician"]:hover {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-clinician) 85%, black) 0%,
      var(--color-clinician) 100%
    );
  }
  .audience-card[data-color="distributor"] {
    background: linear-gradient(
      135deg,
      var(--color-distributor) 0%,
      color-mix(in srgb, var(--color-distributor) 85%, white) 100%
    );
  }
  .audience-card[data-color="distributor"]:hover {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-distributor) 85%, black) 0%,
      var(--color-distributor) 100%
    );
  }
</style>

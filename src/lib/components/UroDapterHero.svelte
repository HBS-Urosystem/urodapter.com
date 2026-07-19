<script>
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import heroImage from '$lib/assets/hero/urodapter-hero.png?enhanced';
  import productImage from '$lib/assets/hero/urodapter-product.png';

  const patientBenefits = [
    'Catheter-free treatment',
    'Greater comfort',
    'Less anxiety',
  ];

  const clinicianBenefits = [
    'Better patient experience',
    'Reduced catheter-related complications',
    'Simple integration into practice',
  ];

  // icon: the `d` of a single 24x24 outline path (heroicons), drawn with
  // currentColor stroke in the markup below.
  const trustStats = [
    {
      value: '1M+ Procedures',
      label: 'Worldwide',
      icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
    },
    {
      value: 'Scientifically',
      label: 'Validated',
      // microscope: eyepiece + body tube, arm curving down to the base,
      // stage slide, and the bench line it stands on
      icon: 'M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2ZM9 14h2M14 22a7 7 0 1 0 0-14h-1M6 18h8M3 22h18',
    },
    {
      value: 'Used In',
      label: '50+ Countries',
      icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
    },
    {
      value: 'FDA / CE / MDR',
      label: 'Certified',
      icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
    },
  ];

  const testimonials = [
    {
      quote: 'I now have confidence, less apprehension, more predictability, and an overall better quality of life.',
      author: 'Hannah, 27y, IC/BPS patient',
    },
    {
      quote: 'Perfect for quick, targeted bladder treatments — especially when repeated instillations are needed. Less discomfort, more efficiency, better experience.',
      author: 'Dr. Parekattil, Avant Concierge Urology',
      subAuthor: 'Winter Garden, Florida, USA',
    },
  ];

  const audienceCards = [
    {
      id: 'patient',
      title: "I'm a Patient",
      copy: 'Learn how catheter-free bladder instillation may improve your treatment experience.',
    },
    {
      id: 'clinician',
      title: "I'm a Clinician",
      copy: 'See how UroDapter can improve patient experience while fitting into your clinical workflow.',
    },
    {
      id: 'distributor',
      title: "I'm a Distributor",
      copy: 'Explore partnership and distribution opportunities in your market.',
    },
  ];
</script>

<div class="bg-page-gradient text-navy-950 dark:text-white transition-colors">
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
      <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-x-10 gap-y-20 lg--gap-14 items-start lg:min-h-[38rem] pt-10 sm:pt-14">
        <!-- Left: headline + product chip + audience cards + trust bar -->
        <div>
          <div class="flex flex-col sm:flex-row sm:items-start gap-6 max-w-xl lg:max-w-none">
            <div class="flex-1 min-w-0">
              <h1 class="font-bold tracking-tight leading-[1.05] text-[clamp(1.9rem,4.5vw,3rem)]">
                Catheter-Free<br class="hidden sm:block" /> Bladder Instillation
              </h1>
              <p class="mt-4 text-slate-200 text-base sm:text-lg max-w-md">
                A simple way to perform bladder instillations without catheterization.
              </p>
            </div>
            <div class="shrink-0 w-28 sm:w-32 lg:w-40 aspect-4/3 flex items-center justify-center p-4">
              <img
                src={productImage}
                alt="UroDapter catheter-free bladder instillation device"
                width="410"
                height="276"
                class="w-full h-full object-contain -scale-x-100 drop-shadow-[0_10px_16px_rgba(0,0,0,0.30)]"
              />
            </div>
          </div>

          <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div id="patients" class="bg-patient/25 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <div class="flex items-center gap-2.5 mb-3">
                <span class="w-8 h-8 rounded-full bg-patient flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                </span>
                <h2 class="font-semibold text-sm">For Patients</h2>
              </div>
              <ul class="space-y-2 text-sm text-slate-200">
                {#each patientBenefits as benefit (benefit)}
                  <li class="flex items-start gap-2"><span class="text-sky-300 mt-0.5">✓</span>{benefit}</li>
                {/each}
              </ul>
            </div>

            <div id="clinicians" class="bg-clinician/25 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <div class="flex items-center gap-2.5 mb-3">
                <span class="w-8 h-8 rounded-full bg-clinician flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                </span>
                <h2 class="font-semibold text-sm">For Clinicians</h2>
              </div>
              <ul class="space-y-2 text-sm text-slate-200">
                {#each clinicianBenefits as benefit (benefit)}
                  <li class="flex items-start gap-2"><span class="text-emerald-300 mt-0.5">✓</span>{benefit}</li>
                {/each}
              </ul>
            </div>
          </div>

          <div class="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {#each trustStats as stat (stat.label)}
              <div class="flex items-start gap-2.5">
                <svg class="w-8 h-8 text-slate-300 shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d={stat.icon} />
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
        <div class="lg:justify-self-end lg:self-end lg:translate-y-8 w-full lg:max-w-sm space-y-3">
          <div class="inline-flex items-center gap-2 bg-navy-900/80 backdrop-blur border border-white/10 rounded-full pl-3 pr-4 py-2">
            <svg class="w-4 h-4 text-sky-300 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/></svg>
            <p class="text-xs font-semibold text-slate-200 whitespace-nowrap">Trusted by patients and clinicians worldwide</p>
          </div>

          <div class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl shadow-xl divide-y divide-white/10">
            {#each testimonials as testimonial (testimonial.author)}
              <blockquote class="p-4">
                <p class="text-sm leading-relaxed text-white">"{testimonial.quote}"</p>
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
  <main class="max-w-7xl mx-auto px-5 sm:px-8">
    <div class="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-14">
      {#each audienceCards as card (card.id)}
        <a href="#{card.id}" data-color={card.id} class="group audience-card transition-[background] rounded-2xl p-5 flex flex-col">
          <h3 class="font-semibold text-sm text-white">{card.title}</h3>
          <p class="text-xs text-white/80 mt-1.5 flex-1">{card.copy}</p>
          <span class="mt-3 text-sm text-white group-hover:translate-x-1 transition-transform">→</span>
        </a>
      {/each}

      <a href="#support" class="group bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/15 transition-colors rounded-2xl p-5 flex flex-col justify-between">
        <div class="flex items-start gap-2">
          <svg class="w-8 h-8 shrink-0 text-slate-500 dark:text-slate-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <p class="text-xs text-slate-600 dark:text-slate-300">Looking for publications, FAQs, videos, training or technical resources?</p>
        </div>
        <span class="mt-3 text-sm font-medium text-navy-950 dark:text-white flex items-center gap-1.5">Visit Support Center <span class="group-hover:translate-x-1 transition-transform">→</span></span>
      </a>
    </div>
  </main>
</div>

<style>
  /* .bg-page-gradient lives in layout.css — shared with subpages */

  /* Legibility overlay over the full-width hero photo: strong navy on the left
     (text side), fading toward the figures on the right; slight top/bottom fade */
  .hero-overlay {
    background:
      linear-gradient(90deg, rgba(8, 17, 31, 0.96) 0%, rgba(10, 21, 38, 0.9) 30%, rgba(13, 26, 48, 0.55) 55%, rgba(13, 26, 48, 0.14) 80%, rgba(13, 26, 48, 0.3) 100%),
      linear-gradient(180deg, rgba(8, 17, 31, 0.3) 0%, transparent 22%, transparent 72%, rgba(8, 17, 31, 0.4) 100%);
  }
  /* 63.9375rem (1023px at the default 16px root) instead of a raw px value,
     so this lines up exactly with Tailwind's `lg:` (64rem) breakpoint used
     elsewhere in this component — mixing units here previously threw off
     Tailwind's breakpoint sort order and broke unrelated lg: utilities. */
  @media (max-width: 63.9375rem) {
    .hero-overlay {
      background: linear-gradient(180deg, rgba(8, 17, 31, 0.9) 0%, rgba(10, 21, 38, 0.8) 45%, rgba(13, 26, 48, 0.6) 100%);
    }
  }

  /* Audience cards: dark base tone in the top-left corner, lightening
     toward the bottom-right, per color per card. On hover the gradient
     runs from a 10%-black-mixed shade of the base color to the base color. */
  .audience-card {
    background: linear-gradient(135deg, var(--color-patient) 0%, color-mix(in srgb, var(--color-patient) 85%, white) 100%);
  }
  .audience-card:hover {
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-patient) 85%, black) 0%, var(--color-patient) 100%);
  }
  .audience-card[data-color='clinician'] {
    background: linear-gradient(135deg, var(--color-clinician) 0%, color-mix(in srgb, var(--color-clinician) 85%, white) 100%);
  }
  .audience-card[data-color='clinician']:hover {
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-clinician) 85%, black) 0%, var(--color-clinician) 100%);
  }
  .audience-card[data-color='distributor'] {
    background: linear-gradient(135deg, var(--color-distributor) 0%, color-mix(in srgb, var(--color-distributor) 85%, white) 100%);
  }
  .audience-card[data-color='distributor']:hover {
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-distributor) 85%, black) 0%, var(--color-distributor) 100%);
  }
</style>

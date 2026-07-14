<script>
  import heroImage from '$lib/assets/hero/urodapter-hero.png?enhanced';
  import productImage from '$lib/assets/hero/urodapter-product.png';

  let mobileMenuOpen = $state(false);

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

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
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

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-14">
      <nav class="flex items-center justify-between">
        <a href="/" class="flex items-center text-white">
          <svg viewBox="0 0 1000 166" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="UroDapter®" fill="currentColor" class="h-5 w-auto"><path d="m102.54 0h20.5v83.62c.17 8.77-2.18 17.4-6.78 24.87-4.44 7.12-10.72 12.91-18.18 16.76-16 7.97-34.81 7.97-50.81 0-15.58-7.96-25.21-24.14-24.78-41.63v-83.62h20.67v83.08c-.04 4.98 1.34 9.87 4 14.09 5.43 8.78 15.08 14.06 25.4 13.9 5.35.09 10.63-1.2 15.34-3.74 4.4-2.39 8.08-5.89 10.69-10.16 2.61-4.23 3.97-9.12 3.93-14.09zm77.62 61.15c-3.48 2.97-6.3 6.65-8.26 10.78l-1.46-17.55h-18v75.45h19.78v-32.48c0-4.67 1.24-9.25 3.57-13.29 2.35-4.18 5.76-7.65 9.9-10.07 4.52-2.55 9.73-3.6 14.88-3l.89-20c-2.49 0-5.73.89-9.71 2.67-4.2 1.93-8.11 4.45-11.59 7.49zm111.07 9.54c6.77 12.89 6.77 28.3 0 41.19-3.38 6.11-8.42 11.15-14.53 14.53-6.3 3.56-13.67 5.34-22.11 5.34-7.57.15-15.06-1.54-21.84-4.9-6.23-3.14-11.44-8-15-14-3.63-6.07-5.45-13.27-5.44-21.58-.1-7.23 1.78-14.35 5.44-20.59 3.6-6.1 8.81-11.1 15.06-14.44 6.75-3.58 14.29-5.39 21.93-5.26 8.44 0 15.77 1.75 22 5.26 6.11 3.34 11.14 8.36 14.51 14.45zm-15.07 20.77c.06-4.23-.89-8.42-2.77-12.21-1.74-3.51-4.39-6.5-7.66-8.65-3.43-2.19-7.43-3.3-11.5-3.21-3.97-.06-7.86 1.09-11.15 3.3-3.26 2.19-5.93 5.17-7.75 8.65-3.8 7.6-3.8 16.56 0 24.16 1.81 3.52 4.51 6.5 7.84 8.64 3.29 2.13 7.14 3.25 11.06 3.21 4.07.09 8.07-1.02 11.5-3.21 3.27-2.15 5.92-5.13 7.66-8.64 1.87-3.74 2.82-7.86 2.77-12.04zm149.49-48.58c2.52 7.68 3.81 15.71 3.83 23.8.15 9-1.61 17.94-5.17 26.21-3.3 7.53-8.12 14.3-14.15 19.88-6.01 5.52-13.03 9.82-20.68 12.66-7.9 2.93-16.27 4.41-24.7 4.36h-43.13v-129.79h36.9c12.84 0 23.81 1.96 32.9 5.89s16.43 9.1 22 15.51c5.5 6.25 9.66 13.56 12.23 21.48zm-17.49 22.37c0-8.08-1.33-15-4-20.77-2.42-5.41-6.02-10.22-10.52-14.08-4.19-3.53-9-6.24-14.18-8-4.89-1.69-10.03-2.56-15.2-2.57h-21.75v90h18.54c6.42.07 12.81-.93 18.9-2.95 5.48-1.83 10.54-4.74 14.88-8.55 4.3-3.86 7.65-8.64 9.81-14 2.42-6.06 3.62-12.55 3.52-19.08zm105.5-10.87h18.36v75.45h-20v-11l-.81.89c-1.85 1.92-3.85 3.68-6 5.26-2.67 2.02-5.62 3.65-8.75 4.85-3.8 1.39-7.82 2.07-11.86 2-6.66.08-13.23-1.44-19.17-4.45-5.77-2.97-10.51-7.6-13.63-13.29-3.33-5.88-5-13.16-5-21.83 0-8.56 1.75-15.89 5.26-22 3.28-5.89 8.08-10.79 13.91-14.18 5.71-3.32 12.21-5.04 18.81-5 7.25 0 13.11 1.46 17.56 4.37 3.85 2.44 7.2 5.59 9.87 9.28zm-1.6 44.93v-16.41c-.92-3.02-2.5-5.79-4.64-8.11-2.17-2.34-4.81-4.19-7.75-5.44-3.19-1.35-6.62-2.03-10.08-2-3.98-.06-7.89.98-11.32 3-3.41 2.05-6.23 4.93-8.2 8.38-6.62 11.62-2.79 26.4 8.65 33.34 3.43 2.13 7.4 3.27 11.44 3.28 3.44.04 6.84-.64 10-2 2.89-1.25 5.45-3.14 7.49-5.53 2.06-2.49 3.56-5.39 4.41-8.51zm129.25-29.15c3.23 6.12 4.85 13.34 4.85 21.67s-1.75 15.46-5.26 21.39c-3.43 5.87-8.47 10.64-14.53 13.73-6.51 3.28-13.71 4.93-21 4.81-5.24 0-10.42-1.16-15.16-3.38-4.19-1.88-7.9-4.67-10.87-8.17v45.79h-19.79v-113h17.29l1.72 11.26c3.66-3.76 7.93-6.87 12.63-9.21 5.57-2.73 11.71-4.1 17.92-4 6.7-.11 13.3 1.62 19.08 5 5.61 3.39 10.15 8.27 13.12 14.11zm-15.33 22c.09-4.39-.98-8.73-3.12-12.57-2-3.54-4.88-6.49-8.38-8.56-3.54-2.09-7.57-3.17-11.68-3.12-3.61-.05-7.18.63-10.52 2-3.01 1.25-5.69 3.17-7.84 5.61-2.2 2.54-3.9 5.48-5 8.65v15.16c.8 3.15 2.26 6.09 4.28 8.64 2.03 2.57 4.67 4.59 7.67 5.89 3.15 1.38 6.56 2.08 10 2.05 4.26.04 8.46-.99 12.21-3 3.69-1.98 6.8-4.9 9-8.47 2.28-3.68 3.45-7.93 3.38-12.26zm68.64-71h-20v33.16h-13v15.69h13v59.82h20v-59.76h19.61v-15.69h-19.61zm114.63 64.18-58 19.56c1.83 2.78 4.3 5.09 7.19 6.74 3.6 2 7.66 3.01 11.77 2.94 3.01.01 6-.53 8.82-1.61 2.86-1.1 5.58-2.54 8.11-4.28l9.1 14.8c-4.03 2.55-8.38 4.57-12.93 6-4.35 1.42-8.89 2.17-13.46 2.22-8.91 0-16.52-1.72-22.82-5.17-6.1-3.24-11.12-8.2-14.44-14.26-3.42-6.41-5.14-13.59-5-20.86-.08-7.21 1.9-14.29 5.7-20.41s9.11-11.15 15.42-14.62c6.57-3.65 13.98-5.53 21.49-5.44 10.34 0 18.87 3 25.58 9s11.2 14.48 13.47 25.45zm-62 5c0 1 0 2 .14 3l39.53-14.07c-1.26-3.33-3.32-6.31-6-8.66-2.97-2.67-7.07-4-12.3-4-3.88-.07-7.7.97-11 3-3.22 2.04-5.84 4.9-7.58 8.29-1.96 3.87-2.93 8.16-2.83 12.49zm121-36.73c-4.2 1.93-8.1 4.45-11.59 7.49-3.48 2.97-6.29 6.65-8.25 10.78l-1.46-17.55h-18v75.5h19.79v-32.48c.08-9.6 5.17-18.46 13.42-23.36 4.52-2.55 9.73-3.6 14.89-3l.89-20c-2.52 0-5.78.89-9.78 2.67z"/><path d="m928.23 75.89c-7.04 0-13.5-1.64-19.38-4.91-5.89-3.28-10.56-7.79-14.01-13.56-3.46-5.76-5.19-12.28-5.19-19.56s1.73-13.77 5.19-19.47 8.13-10.19 14.01-13.47c5.88-3.28 12.34-4.91 19.38-4.91s13.65 1.64 19.47 4.91 10.46 7.77 13.92 13.47 5.19 12.19 5.19 19.47-1.73 13.77-5.19 19.47-8.1 10.22-13.92 13.56-12.32 5-19.47 5zm-.19-9.64c5.34 0 10.16-1.21 14.47-3.64s7.7-5.79 10.19-10.1 3.73-9.19 3.73-14.65-1.25-10.34-3.73-14.65c-2.49-4.31-5.89-7.7-10.19-10.19-4.31-2.49-9.13-3.73-14.47-3.73s-9.98 1.25-14.29 3.73c-4.31 2.49-7.71 5.89-10.19 10.19-2.49 4.31-3.73 9.19-3.73 14.65s1.24 10.35 3.73 14.65c2.49 4.31 5.88 7.68 10.19 10.1 4.31 2.43 9.07 3.64 14.29 3.64zm-13.65-48.23h15.29c4.37 0 7.76 1.06 10.19 3.19 2.43 2.12 3.64 5.19 3.64 9.19 0 3.28-1.06 6.25-3.18 8.92s-5.49 4-10.1 4h-6.19v13.47h-9.65zm13.29 17.83c2.18 0 3.67-.48 4.46-1.46.79-.97 1.18-2.18 1.18-3.64 0-1.58-.46-2.88-1.37-3.91s-2.21-1.55-3.91-1.55h-4v10.56zm8.74 5.28 7.28 15.65h-10.92l-6.19-15.47z"/></svg>
        </a>

        <ul class="hidden md:flex items-center gap-8 text-sm text-slate-200">
          <li><a href="#patients" class="hover:text-white transition-colors">For Patients</a></li>
          <li><a href="#clinicians" class="hover:text-white transition-colors">For Clinicians</a></li>
          <li><a href="#distributors" class="hover:text-white transition-colors">For Distributors</a></li>
          <li><a href="#support" class="hover:text-white transition-colors">Support Center</a></li>
        </ul>

        <button
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobileMenu"
          class="md:hidden p-2 -mr-2 rounded-md hover:bg-white/10 transition-colors"
          onclick={toggleMobileMenu}
        >
          {#if mobileMenuOpen}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          {:else}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          {/if}
        </button>
      </nav>

      {#if mobileMenuOpen}
        <div id="mobileMenu" class="md:hidden mt-3 pb-2 border-b border-white/10">
          <ul class="flex flex-col gap-1 text-sm text-slate-200">
            <li><a href="#patients" class="block py-2.5 hover:text-white">For Patients</a></li>
            <li><a href="#clinicians" class="block py-2.5 hover:text-white">For Clinicians</a></li>
            <li><a href="#distributors" class="block py-2.5 hover:text-white">For Distributors</a></li>
            <li><a href="#support" class="block py-2.5 hover:text-white">Support Center</a></li>
          </ul>
        </div>
      {/if}

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
            <div class="product-chip shrink-0 w-28 sm:w-32 lg:w-40 aspect-[4/3] rounded-2xl ring-1 ring-white/10 shadow-lg flex items-center justify-center p-4">
              <img
                src={productImage}
                alt="UroDapter catheter-free bladder instillation device"
                width="410"
                height="276"
                class="w-full h-full object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.30)]"
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
  /* Page background below the hero: light by default, dark on prefers-color-scheme: dark */
  .bg-page-gradient {
    background:
      radial-gradient(1000px 500px at 85% -10%, rgba(47, 111, 237, 0.1), transparent 60%),
      radial-gradient(700px 450px at 10% 110%, rgba(124, 79, 209, 0.08), transparent 60%),
      linear-gradient(180deg, #ffffff 0%, #f7f9fc 55%, #eef2f9 100%);
  }
  @media (prefers-color-scheme: dark) {
    .bg-page-gradient {
      background:
        radial-gradient(1200px 600px at 85% -10%, rgba(47, 111, 237, 0.35), transparent 60%),
        radial-gradient(800px 500px at 10% 110%, rgba(124, 79, 209, 0.18), transparent 60%),
        linear-gradient(135deg, #0a1526 0%, #0d1a30 45%, #101f3b 100%);
    }
  }

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

  /* .product-chip {
    background:
      radial-gradient(130% 120% at 28% 12%, rgba(255, 255, 255, 0.3), transparent 55%),
      linear-gradient(150deg, #1b2f54 0%, #2f6fed 78%, #3aa3cf 125%);
  } */

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

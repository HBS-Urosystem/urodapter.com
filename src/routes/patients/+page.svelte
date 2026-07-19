<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import PatientHero from '$lib/components/patients/PatientHero.svelte';
  import SectionBridge from '$lib/components/patients/SectionBridge.svelte';
  import HowItWorks from '$lib/components/patients/HowItWorks.svelte';
  import BenefitCard from '$lib/components/patients/BenefitCard.svelte';
  import IndicationsStrip from '$lib/components/patients/IndicationsStrip.svelte';
  import PatientStories from '$lib/components/patients/PatientStories.svelte';
  import EvidenceOutcomes from '$lib/components/patients/EvidenceOutcomes.svelte';
  import NextSteps from '$lib/components/patients/NextSteps.svelte';
  import {
    bridgeHowItWorks,
    bridgeWhyPrefer,
    bridgeStories,
    bridgeEvidence,
    bridgeNextSteps,
    whyPrefer,
  } from '$lib/content/patients';

  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'UroDapter for Patients — Catheter-Free Bladder Instillation',
      description:
        'How UroDapter delivers bladder instillation without a catheter, and why patients prefer the catheter-free approach.',
      audience: { '@type': 'Patient' },
      about: {
        '@type': 'MedicalDevice',
        name: 'UroDapter',
        description:
          'A small syringe adapter that allows medication to be delivered into the bladder without inserting a catheter.',
      },
    }) +
    '<' +
    '/script>';
</script>

<svelte:head>
  <title>For Patients — Catheter-Free Bladder Instillation | UroDapter®</title>
  <meta
    name="description"
    content="UroDapter is designed to allow bladder instillation without catheterization — a simple, catheter-free approach that may make repeated treatments more comfortable."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, locally built JSON-LD -->
  {@html jsonLd}
</svelte:head>

<div class="bg-page-gradient text-navy-950 dark:text-white transition-colors min-h-screen">
  <SiteHeader variant="solid" />

  <main class="pb-16">
    <!-- Section 1: brief value reminder -->
    <PatientHero />

    <SectionBridge variant={bridgeHowItWorks.variant} lead={bridgeHowItWorks.lead} emphasis={bridgeHowItWorks.emphasis} />

    <!-- Section 2: how it works -->
    <HowItWorks />

    <SectionBridge variant={bridgeWhyPrefer.variant} lead={bridgeWhyPrefer.lead} emphasis={bridgeWhyPrefer.emphasis} />

    <!-- Section 3: why patients prefer UroDapter -->
    <section aria-labelledby="why-prefer-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-patient dark:text-sky-300">
        {whyPrefer.eyebrow}
      </p>
      <h2
        id="why-prefer-heading"
        class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
      >
        {whyPrefer.heading}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
        {whyPrefer.intro}
      </p>

      <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each whyPrefer.benefits as benefit (benefit.title)}
          <BenefitCard title={benefit.title} body={benefit.body} icon={benefit.icon} />
        {/each}
      </div>

      <div use:reveal class="mt-6">
        <IndicationsStrip text={whyPrefer.indications.text} items={whyPrefer.indications.items} />
      </div>
    </section>

    <SectionBridge variant={bridgeStories.variant} lead={bridgeStories.lead} emphasis={bridgeStories.emphasis} />

    <!-- Section 4: patient experiences -->
    <PatientStories />

    <SectionBridge variant={bridgeEvidence.variant} lead={bridgeEvidence.lead} emphasis={bridgeEvidence.emphasis} />

    <!-- Section 5: evidence and outcomes -->
    <EvidenceOutcomes />

    <SectionBridge variant={bridgeNextSteps.variant} lead={bridgeNextSteps.lead} emphasis={bridgeNextSteps.emphasis} />

    <!-- Section 6: what happens next (includes the closing band) -->
    <NextSteps />
  </main>
</div>

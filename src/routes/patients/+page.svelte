<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import WaveBridge from '$lib/components/shared/WaveBridge.svelte';
  import PatientHero from '$lib/components/patients/PatientHero.svelte';
  import WhyChoose from '$lib/components/patients/WhyChoose.svelte';
  import PatientStories from '$lib/components/patients/PatientStories.svelte';
  import EvidenceOutcomes from '$lib/components/patients/EvidenceOutcomes.svelte';
  import NextSteps from '$lib/components/patients/NextSteps.svelte';
  import { bridgeStories, bridgeEvidence, bridgeNextSteps } from '$lib/content/patients';

  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'UroDapter for Patients — Catheter-Free Bladder Instillation',
      description:
        'Why patients choose UroDapter for bladder instillation without a catheter: benefits, patient experiences and the clinical evidence.',
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
    content="UroDapter is designed to allow bladder instillation without catheterization — a catheter-free approach that may make repeated treatments more comfortable, less stressful and easier to manage."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, locally built JSON-LD -->
  {@html jsonLd}
</svelte:head>

<!-- Canvas "Páciens oldal" board (2026-11-18), on white and mist bands with
     blush wave bridges (design system §15): PatientHero → the benefits (mist)
     → wave → stories → wave → evidence → wave → next steps and the closing
     band. The 0831 order is unchanged: the page opens at journey Step 4. -->
<div class="accent-patient bg-white dark:bg-navy-950 text-(--ink)">
  <SiteHeader variant="page" />

  <main>
    <PatientHero />

    <!-- Section 1: why patients choose UroDapter -->
    <WhyChoose />

    <WaveBridge
      lead={bridgeStories.lead}
      emphasis={bridgeStories.emphasis}
      next="stories"
      above="fill-[color-mix(in_srgb,var(--color-mist)_35%,white)] dark:fill-[#062536]"
    />

    <!-- Section 2: patient experiences -->
    <PatientStories />

    <WaveBridge lead={bridgeEvidence.lead} emphasis={bridgeEvidence.emphasis} next="evidence" />

    <!-- Section 3: evidence and outcomes -->
    <EvidenceOutcomes />

    <WaveBridge lead={bridgeNextSteps.lead} emphasis={bridgeNextSteps.emphasis} next="next-steps" />

    <!-- Section 4: what happens next (includes the closing band) -->
    <NextSteps />
  </main>
</div>

<script lang="ts">
  import ClinicianHero from '$lib/components/clinicians/ClinicianHero.svelte';
  import DarkBridge from '$lib/components/shared/DarkBridge.svelte';
  import ClinicalValue from '$lib/components/clinicians/ClinicalValue.svelte';
  import ClinicalEvidence from '$lib/components/clinicians/ClinicalEvidence.svelte';
  import SocialProof from '$lib/components/clinicians/SocialProof.svelte';
  import Implementation from '$lib/components/clinicians/Implementation.svelte';
  import NextSteps from '$lib/components/clinicians/NextSteps.svelte';
  import SupportClosing from '$lib/components/clinicians/SupportClosing.svelte';
  import {
    bridgeEvidence,
    bridgeSocialProof,
    bridgeImplementation,
    bridgeNextSteps,
  } from '$lib/content/clinicians';

  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'UroDapter for Clinicians — Catheter-Free Bladder Instillation',
      description:
        'The clinical value of catheter-free bladder instillation, what the evidence shows, who uses it, and how UroDapter fits into an existing instillation workflow.',
      audience: { '@type': 'MedicalAudience', audienceType: 'Clinician' },
      about: {
        '@type': 'MedicalDevice',
        name: 'UroDapter',
        description:
          'A urological syringe adapter designed to allow bladder instillation without catheterization.',
      },
    }) +
    '<' +
    '/script>';
</script>

<svelte:head>
  <title>For Clinicians — Catheter-Free Bladder Instillation | UroDapter®</title>
  <meta
    name="description"
    content="A better bladder instillation experience without changing your practice: the clinical value of UroDapter, what the published evidence shows, and how it fits into your existing workflow."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, locally built JSON-LD -->
  {@html jsonLd}
</svelte:head>

<!-- Canvas "Klinikus oldal" board (2026-11-18), the "cool" direction (design
     system §15): the header on the pine hero band, white / mist / graph-paper
     section bands, dark navy bridges and the pine closing band. The 0831 order
     is unchanged: Step 4 (clinical value) to Step 9 (Support Center). -->
<div class="accent-clinician bg-white dark:bg-navy-950 text-(--ink)">
  <ClinicianHero />

  <main>
    <!-- Section 1: clinical value for you and your patients -->
    <ClinicalValue />

    <DarkBridge lead={bridgeEvidence.lead} emphasis={bridgeEvidence.emphasis} next="c-evidence" />

    <!-- Section 2: what the clinical evidence shows -->
    <ClinicalEvidence />

    <DarkBridge lead={bridgeSocialProof.lead} emphasis={bridgeSocialProof.emphasis} next="c-social" />

    <!-- Section 3: social proof -->
    <SocialProof />

    <DarkBridge emphasis={bridgeImplementation.emphasis} next="c-impl" />

    <!-- Section 4: implementation -->
    <Implementation />

    <DarkBridge emphasis={bridgeNextSteps.emphasis} next="c-next" />

    <!-- Section 5: next steps, then Section 6 as the closing band -->
    <NextSteps />
    <SupportClosing />
  </main>
</div>

<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SectionBridge from '$lib/components/shared/SectionBridge.svelte';
  import ClinicianHero from '$lib/components/clinicians/ClinicianHero.svelte';
  import WhatIsIt from '$lib/components/clinicians/WhatIsIt.svelte';
  import Mechanism from '$lib/components/clinicians/Mechanism.svelte';
  import ClinicalBenefits from '$lib/components/clinicians/ClinicalBenefits.svelte';
  import Indications from '$lib/components/clinicians/Indications.svelte';
  import EvidenceApprovals from '$lib/components/clinicians/EvidenceApprovals.svelte';
  import Adoption from '$lib/components/clinicians/Adoption.svelte';
  import NextSteps from '$lib/components/clinicians/NextSteps.svelte';
  import SupportClosing from '$lib/components/clinicians/SupportClosing.svelte';
  import {
    bridgeWhatIsIt,
    bridgeMechanism,
    bridgeBenefits,
    bridgeIndications,
    bridgeEvidence,
    bridgeAdoption,
    bridgeNextSteps,
  } from '$lib/content/clinicians';

  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'UroDapter for Clinicians — Catheter-Free Bladder Instillation',
      description:
        'How UroDapter works, what it changes in clinical practice, the indications it covers, the evidence behind it, and how to evaluate it.',
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
    content="UroDapter is designed to allow bladder instillation without catheterization. See how it works, the conditions it covers, the clinical evidence and the regulatory position."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, locally built JSON-LD -->
  {@html jsonLd}
</svelte:head>

<div class="bg-persona-page accent-clinician text-navy-950 dark:text-white transition-colors min-h-screen">
  <SiteHeader variant="solid" />

  <main class="pb-16">
    <!-- Section 1: recognition -->
    <ClinicianHero />

    <SectionBridge variant={bridgeWhatIsIt.variant} emphasis={bridgeWhatIsIt.emphasis} />

    <!-- Section 2: what is the UroDapter -->
    <WhatIsIt />

    <SectionBridge variant={bridgeMechanism.variant} lead={bridgeMechanism.lead} emphasis={bridgeMechanism.emphasis} />

    <!-- Section 3: mechanism of action -->
    <Mechanism />

    <SectionBridge variant={bridgeBenefits.variant} lead={bridgeBenefits.lead} emphasis={bridgeBenefits.emphasis} />

    <!-- Section 4: benefits -->
    <ClinicalBenefits />

    <SectionBridge variant={bridgeIndications.variant} emphasis={bridgeIndications.emphasis} />

    <!-- Section 5: indications -->
    <Indications />

    <SectionBridge variant={bridgeEvidence.variant} emphasis={bridgeEvidence.emphasis} />

    <!-- Section 6: safe and effective -->
    <EvidenceApprovals />

    <SectionBridge variant={bridgeAdoption.variant} emphasis={bridgeAdoption.emphasis} />

    <!-- Section 7: real-world adoption -->
    <Adoption />

    <SectionBridge variant={bridgeNextSteps.variant} lead={bridgeNextSteps.lead} emphasis={bridgeNextSteps.emphasis} />

    <!-- Section 8: next steps, then the closing Support Center band -->
    <NextSteps />
    <SupportClosing />
  </main>
</div>

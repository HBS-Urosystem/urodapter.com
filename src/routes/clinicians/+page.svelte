<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SectionBridge from '$lib/components/shared/SectionBridge.svelte';
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

<!-- 0831 architecture: journey Steps 1–3 ("why should I care?", "what is it?",
     "how does it work?") are answered on the homepage, so this page opens at
     Step 4 (clinical value) and runs to Step 9 (Support Center). -->
<div class="bg-persona-page accent-clinician text-navy-950 dark:text-white transition-colors min-h-screen">
  <SiteHeader variant="solid" />

  <main class="pb-16">
    <!-- Section 1: clinical value for you and your patients -->
    <ClinicalValue />

    <SectionBridge variant={bridgeEvidence.variant} lead={bridgeEvidence.lead} emphasis={bridgeEvidence.emphasis} />

    <!-- Section 2: what the clinical evidence shows -->
    <ClinicalEvidence />

    <SectionBridge
      variant={bridgeSocialProof.variant}
      lead={bridgeSocialProof.lead}
      emphasis={bridgeSocialProof.emphasis}
    />

    <!-- Section 3: social proof -->
    <SocialProof />

    <SectionBridge variant={bridgeImplementation.variant} emphasis={bridgeImplementation.emphasis} />

    <!-- Section 4: implementation -->
    <Implementation />

    <SectionBridge variant={bridgeNextSteps.variant} emphasis={bridgeNextSteps.emphasis} />

    <!-- Section 5: next steps, then Section 6 as the closing band -->
    <NextSteps />
    <SupportClosing />
  </main>
</div>

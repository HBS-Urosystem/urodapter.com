<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SectionBridge from '$lib/components/shared/SectionBridge.svelte';
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

<!-- 0831 architecture: journey Steps 1–3 (relevance, hope, "how does it work?")
     are answered on the homepage, so this page opens at Step 4. Four sections,
     one bridge between each. -->
<div class="bg-persona-page accent-patient text-navy-950 dark:text-white transition-colors min-h-screen">
  <SiteHeader variant="solid" />

  <main class="pb-16">
    <!-- Section 1: why patients choose UroDapter -->
    <WhyChoose />

    <SectionBridge variant={bridgeStories.variant} lead={bridgeStories.lead} emphasis={bridgeStories.emphasis} />

    <!-- Section 2: patient experiences -->
    <PatientStories />

    <SectionBridge variant={bridgeEvidence.variant} lead={bridgeEvidence.lead} emphasis={bridgeEvidence.emphasis} />

    <!-- Section 3: evidence and outcomes -->
    <EvidenceOutcomes />

    <SectionBridge variant={bridgeNextSteps.variant} lead={bridgeNextSteps.lead} emphasis={bridgeNextSteps.emphasis} />

    <!-- Section 4: what happens next (includes the closing band) -->
    <NextSteps />
  </main>
</div>

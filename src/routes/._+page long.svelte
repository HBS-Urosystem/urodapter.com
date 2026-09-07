<script lang="ts">
  import UroDapterHero from '$lib/components/UroDapterHero.svelte';
  import SectionBridge from '$lib/components/shared/SectionBridge.svelte';
  import WhatItIs from '$lib/components/home/WhatItIs.svelte';
  import ProofStats from '$lib/components/home/ProofStats.svelte';
  import PersonaSection from '$lib/components/home/PersonaSection.svelte';
  import Voices from '$lib/components/home/Voices.svelte';
  import {
    bridgeProof,
    bridgePatients,
    bridgeClinicians,
    bridgeDistributors,
    bridgeVoices,
    patients,
    clinicians,
    distributors,
  } from '$lib/content/home';

  // Home serves all three audiences, so — unlike /patients — the JSON-LD
  // carries no `audience` key.
  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'UroDapter® — Catheter-Free Bladder Instillation',
      description:
        'UroDapter is a urological syringe adapter that allows bladder instillation without catheterization, for patients, clinicians and distributors.',
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
  <title>UroDapter® — Catheter-Free Bladder Instillation</title>
  <meta
    name="description"
    content="UroDapter is a urological syringe adapter which completely replaces the catheter for bladder instillation. Used in more than 1,000,000 procedures worldwide."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, locally built JSON-LD -->
  {@html jsonLd}
</svelte:head>

<div class="bg-page-gradient text-navy-950 dark:text-white transition-colors min-h-screen">
  <UroDapterHero />

  <main class="pb-16">
    <!-- Section 1: what the device is -->
    <WhatItIs />

    <SectionBridge variant={bridgeProof.variant} lead={bridgeProof.lead} emphasis={bridgeProof.emphasis} />

    <!-- Section 2: the credibility numbers -->
    <ProofStats />

    <!-- Sections 3–5: the three audience lanes. Each bridge wears the accent of
         the lane it introduces, so the colour hands over before the section does. -->
    <div class={patients.accentClass}>
      <SectionBridge variant={bridgePatients.variant} lead={bridgePatients.lead} emphasis={bridgePatients.emphasis} />
    </div>
    <PersonaSection {...patients} />

    <div class={clinicians.accentClass}>
      <SectionBridge variant={bridgeClinicians.variant} lead={bridgeClinicians.lead} emphasis={bridgeClinicians.emphasis} />
    </div>
    <PersonaSection {...clinicians} />

    <div class={distributors.accentClass}>
      <SectionBridge variant={bridgeDistributors.variant} lead={bridgeDistributors.lead} emphasis={bridgeDistributors.emphasis} />
    </div>
    <PersonaSection {...distributors} />

    <SectionBridge variant={bridgeVoices.variant} lead={bridgeVoices.lead} emphasis={bridgeVoices.emphasis} />

    <!-- Section 6: voices, regulatory highlights, Support Center -->
    <Voices />
  </main>
</div>

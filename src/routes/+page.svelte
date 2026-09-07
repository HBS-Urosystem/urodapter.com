<script lang="ts">
  import UroDapterHero from "$lib/components/UroDapterHero.svelte";
  import SectionBridge from "$lib/components/shared/SectionBridge.svelte";
  import WhatItIs from "$lib/components/home/WhatItIs.svelte";
  import ProofStats from "$lib/components/home/ProofStats.svelte";
  import PersonaSection from "$lib/components/home/PersonaSection.svelte";
  import Voices from "$lib/components/home/Voices.svelte";
  import {
    bridgeProof,
    bridgePatients,
    bridgeClinicians,
    bridgeDistributors,
    bridgeVoices,
    patients,
    clinicians,
    distributors,
  } from "$lib/content/home";

  // Home serves all three audiences, so — unlike /patients — the JSON-LD
  // carries no `audience` key.
  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "UroDapter® — Catheter-Free Bladder Instillation",
      description:
        "UroDapter is a urological syringe adapter that allows bladder instillation without catheterization, for patients, clinicians and distributors.",
      about: {
        "@type": "MedicalDevice",
        name: "UroDapter",
        description:
          "A small syringe adapter that allows medication to be delivered into the bladder without inserting a catheter.",
      },
    }) +
    "<" +
    "/script>";
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

<div
  class="bg-page-gradient text-navy-950 dark:text-white transition-colors min-h-screen"
>
  <UroDapterHero />
</div>

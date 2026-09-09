<script lang="ts">
  import UroDapterHero from '$lib/components/UroDapterHero.svelte';
  import SectionBridge from '$lib/components/shared/SectionBridge.svelte';
  import KeyBenefits from '$lib/components/home/KeyBenefits.svelte';
  import HowItWorks from '$lib/components/home/HowItWorks.svelte';
  import ChooseJourney from '$lib/components/home/ChooseJourney.svelte';
  import { bridgeHowItWorks, bridgeJourney } from '$lib/content/home';

  // Home serves all three audiences, so — unlike /patients — the JSON-LD
  // carries no `audience` key. The animation is declared as a VideoObject so
  // the 30-second explainer is discoverable.
  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'UroDapter® — Catheter-Free Bladder Instillation',
      description:
        'A simple way to perform bladder instillations without catheterization, for patients, clinicians and distributors.',
      about: {
        '@type': 'MedicalDevice',
        name: 'UroDapter',
        description:
          'A sterile, single-use syringe adapter that allows medication to be delivered into the bladder without inserting a catheter.',
      },
      video: {
        '@type': 'VideoObject',
        name: 'How UroDapter works',
        description:
          'A 30-second animation showing catheter-free bladder instillation with UroDapter.',
        thumbnailUrl: '/urodapter-animation-poster.webp',
        contentUrl: '/urodapter-animation.mp4',
        duration: 'PT30S',
      },
    }) +
    '<' +
    '/script>';
</script>

<svelte:head>
  <title>UroDapter® — Catheter-Free Bladder Instillation</title>
  <meta
    name="description"
    content="UroDapter is a sterile, single-use syringe adapter: a simple way to perform bladder instillations without catheterization. Used in more than 1,000,000 procedures worldwide."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, locally built JSON-LD -->
  {@html jsonLd}
</svelte:head>

<!-- 0831 architecture: the homepage answers journey Steps 1–3 for both
     personas and hands over to the journey pages. Structure follows
     "3. page_content.docx": hero (headline, subheadline, credibility and the
     two testimonials overlaid on the opening image) → key benefits → how it
     works → choose your journey. -->
<div class="bg-page-gradient text-navy-950 dark:text-white transition-colors min-h-screen">
  <UroDapterHero />

  <main class="pb-16">
    <!-- Section 1: key benefits, one card per audience -->
    <KeyBenefits />

    <SectionBridge variant={bridgeHowItWorks.variant} emphasis={bridgeHowItWorks.emphasis} />

    <!-- Section 2: how it works -->
    <HowItWorks />

    <SectionBridge variant={bridgeJourney.variant} lead={bridgeJourney.lead} emphasis={bridgeJourney.emphasis} />

    <!-- Section 3: choose your journey + Support Center shortcut -->
    <ChooseJourney />
  </main>
</div>

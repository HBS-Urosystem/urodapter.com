<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import HomeHero from '$lib/components/home/HomeHero.svelte';
  import HomeWhyItMatters from '$lib/components/home/HomeWhyItMatters.svelte';
  import HowItWorks from '$lib/components/home/HowItWorks.svelte';
  import HomeJourney from '$lib/components/home/HomeJourney.svelte';

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

<!-- Canvas "Főoldal" board (2026-11-18), on white bands instead of the page
     gradient (design system §15): hero + credibility strip → "Why it matters"
     band (the audience problems and the idea) → How It Works → Choose Your
     Journey band, the three journey cards and the Support Center band. The
     0831 journey-step order is unchanged. Parked by this rebuild:
     UroDapterHero (with QuoteRotator and HeroAudienceCards) and ChooseJourney. -->
<div class="bg-white dark:bg-navy-950 text-(--ink)">
  <SiteHeader variant="page" />

  <main>
    <HomeHero />
    <HomeWhyItMatters />
    <HowItWorks />
    <HomeJourney />
  </main>
</div>

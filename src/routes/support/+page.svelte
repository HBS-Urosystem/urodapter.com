<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SupportHero from '$lib/components/support/SupportHero.svelte';
  import UsingSection from '$lib/components/support/UsingSection.svelte';
  import EvidenceSection from '$lib/components/support/EvidenceSection.svelte';
  import TestimonialsSection from '$lib/components/support/TestimonialsSection.svelte';
  import VideosSection from '$lib/components/support/VideosSection.svelte';
  import FaqSection from '$lib/components/support/FaqSection.svelte';
  import ContactSection from '$lib/components/support/ContactSection.svelte';
  import PartnersSection from '$lib/components/support/PartnersSection.svelte';
  import ExplicitGateDialog from '$lib/components/support/ExplicitGateDialog.svelte';
  import { ExplicitGate } from '$lib/components/support/explicit-gate.svelte';
  import { faq } from '$lib/content/support';

  // One gate for the page: the real-life videos and the 45-minute instruction
  // video share it, so one confirmation unlocks both (for this visit only).
  const gate = new ExplicitGate();

  // FAQPage + MedicalWebPage: the questions and short answers are
  // machine-readable. Locally built, static JSON-LD.
  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          name: 'UroDapter® Support Center',
          about: { '@type': 'MedicalDevice', name: 'UroDapter' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faq.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.short },
          })),
        },
      ],
    }) +
    '<' +
    '/script>';
</script>

<svelte:head>
  <title>Support Center — Instructions, Evidence, Videos, FAQ | UroDapter®</title>
  <meta
    name="description"
    content="The UroDapter® Support Center: Instructions For Use, Tips & Tricks, the Web App, clinical publications, testimonials, videos, answers to frequent questions and a direct line to the UroDapter team."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, locally built JSON-LD -->
  {@html jsonLd}
</svelte:head>

<div class="bg-white dark:bg-navy-950 text-(--ink)">
  <SiteHeader variant="page" />
  <main>
    <SupportHero />
    <UsingSection {gate} />
    <EvidenceSection />
    <TestimonialsSection />
    <VideosSection {gate} />
    <FaqSection />
    <ContactSection />
    <PartnersSection />
  </main>
  <ExplicitGateDialog {gate} />
</div>

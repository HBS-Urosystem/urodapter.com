<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import ShopHero from '$lib/components/shop/ShopHero.svelte';
  import ShopInfo from '$lib/components/shop/ShopInfo.svelte';
  import { shop } from '$lib/content/shop';

  // Product + Offer, so the pack price is machine-readable. Locally built,
  // static JSON-LD (the same pattern as the journey pages).
  const jsonLd =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'UroDapter® · pack of 10',
      description: shop.intro,
      brand: { '@type': 'Brand', name: 'UroDapter' },
      manufacturer: { '@type': 'Organization', name: 'UroSystem Zrt.', url: 'https://www.urosystem.com' },
      offers: {
        '@type': 'Offer',
        price: shop.buy.pricePerPack,
        priceCurrency: 'EUR',
        seller: { '@type': 'Organization', name: 'UroSystem Zrt.' },
      },
    }) +
    '<' +
    '/script>';
</script>

<svelte:head>
  <title>Webshop — Buy UroDapter® | UroDapter®</title>
  <meta
    name="description"
    content="Buy UroDapter® directly from UroSystem: packs of 10 sterile, single-use syringe adapters, €99 per pack, sent by registered priority mail. Shipping, delivery times and your right of withdrawal."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, locally built JSON-LD -->
  {@html jsonLd}
</svelte:head>

<div class="bg-white dark:bg-navy-950 text-(--ink)">
  <SiteHeader variant="page" />
  <main>
    <ShopHero />
    <ShopInfo />
  </main>
</div>

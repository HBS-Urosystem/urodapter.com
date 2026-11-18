<script lang="ts">
  import { shop } from '$lib/content/shop';
  import productImage from '$lib/assets/product_features.png?enhanced';

  const { buy, firstPack } = shop;

  let packs = $state(1);

  const euro = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
  const euroWhole = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const subtotal = $derived(euro.format(packs * buy.pricePerPack));
  const shipping = $derived(euro.format(buy.shippingFor(packs)));
  const perPackWithVat = euro.format(buy.pricePerPack * (1 + buy.vatRate));
  const checkoutHref = $derived(buy.checkoutHref(packs));

  const stepClass =
    'grid place-items-center size-11 rounded-full transition-colors hover:bg-navy-900/8 dark:hover:bg-white/10 ' +
    'disabled:opacity-35 disabled:hover:bg-transparent disabled:cursor-not-allowed ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)';
</script>

<!-- Webshop hero (canvas "Webshop" board): the offer on the left — title,
     display line, facts and the first-pack offer, which shows before anyone
     reaches the checkout — and the purchase card on the right, where the
     shipping cost is listed before the checkout button (no hidden costs). -->
<section
  aria-labelledby="shop-h"
  class="bg-linear-to-b from-mist/35 to-mist/15 dark:from-[#041c29] dark:to-navy-950"
>
  <div
    class="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-12 sm:pb-20 grid gap-10 lg:gap-16 items-start
           grid-cols-[repeat(auto-fit,minmax(min(100%,28rem),1fr))]"
  >
    <div class="flex flex-col gap-6">
      <span class="eyebrow self-start">{shop.eyebrow}</span>
      <h1 class="display-title">{shop.title}</h1>
      <h2 id="shop-h" class="display-light -mt-2">{shop.heading}</h2>
      <p class="max-w-xl text-[clamp(1.125rem,1.5vw,1.3125rem)] leading-relaxed text-(--ink-soft) text-pretty">
        {shop.intro}
      </p>
      <ul class="flex flex-col gap-3 text-[17px] leading-snug text-(--ink)">
        {#each shop.facts as fact (fact)}
          <li class="flex items-start gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-[22px] shrink-0 mt-px text-(--brand-ink)">
              <path d={shop.tickIcon} />
            </svg>
            {fact}
          </li>
        {/each}
      </ul>

      <div
        id="first-pack"
        class="mt-2 scroll-mt-24 rounded-[20px] p-[clamp(1.375rem,2.6vw,1.875rem)] flex flex-col gap-3
               bg-white ring-1 ring-inset ring-blush shadow-[0_18px_40px_-28px_rgba(7,44,63,0.4)]
               dark:bg-navy-900 dark:ring-blush/30 dark:shadow-none"
      >
        <div class="flex items-center gap-3">
          <span aria-hidden="true" class="grid place-items-center size-11 shrink-0 rounded-[14px] bg-blush/40 text-navy-900 dark:bg-blush/15 dark:text-blush">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-[22px]">
              <path d={firstPack.icon} /><path d={firstPack.iconDot} />
            </svg>
          </span>
          <h3 class="text-[21px] leading-tight font-semibold text-(--ink)">{firstPack.heading}</h3>
        </div>
        <p class="leading-relaxed text-(--ink-soft)">{firstPack.body}</p>
        <a
          href={firstPack.link.href}
          class="group self-start inline-flex items-center gap-2 min-h-11 font-bold text-navy-900 dark:text-white rounded-sm
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
        >
          {firstPack.link.label}
          <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
        </a>
      </div>
    </div>

    <div
      role="region"
      aria-labelledby="buy-h"
      class="rounded-3xl p-[clamp(1.5rem,3vw,2.5rem)] flex flex-col gap-[22px]
             bg-white ring-1 ring-inset ring-mist/85 shadow-[0_30px_60px_-36px_rgba(7,44,63,0.55)]
             dark:bg-navy-900 dark:ring-white/10 dark:shadow-none"
    >
      <div class="h-[220px] rounded-2xl grid place-items-center overflow-hidden bg-linear-160 from-mist/55 to-mist/15 dark:from-white/12 dark:to-white/4">
        <enhanced:img
          src={productImage}
          alt={buy.imageAlt}
          sizes="(min-width: 1024px) 420px, 80vw"
          fetchpriority="high"
          class="block max-h-[180px] max-w-[80%] w-auto h-auto"
        />
      </div>

      <div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div class="flex flex-col gap-1">
          <h3 id="buy-h" class="text-2xl leading-tight font-semibold text-(--ink)">{buy.heading}</h3>
          <span class="text-[15px] text-(--ink-mute)">{buy.seller}</span>
        </div>
        <div class="flex flex-col items-end gap-1">
          <p class="flex items-baseline gap-1.5 text-(--ink)">
            <span class="text-[40px] leading-none font-bold tracking-[-0.02em]">{euroWhole.format(buy.pricePerPack)}</span>
            <span class="text-[15px] text-(--ink-mute)">{buy.perPack}</span>
          </p>
          <p class="text-sm text-(--ink-mute)">{buy.vatNote(perPackWithVat)}</p>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 border-y border-mist/85 dark:border-white/10">
        <span class="flex flex-col">
          <span id="qty-l" class="font-semibold text-(--ink)">{buy.quantityLabel}</span>
          <span id="qty-max" class="text-sm text-(--ink-mute)">{buy.maxNote}</span>
        </span>
        <div
          role="group"
          aria-labelledby="qty-l"
          aria-describedby="qty-max"
          class="inline-flex items-center gap-1 p-0.5 rounded-full ring-[1.5px] ring-inset ring-navy-900 text-navy-900 dark:ring-white/60 dark:text-white"
        >
          <button type="button" class={stepClass} aria-label={buy.fewer} disabled={packs <= 1} onclick={() => (packs = Math.max(1, packs - 1))}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" class="size-5"><path d="M5 12h14" /></svg>
          </button>
          <output aria-live="polite" class="min-w-8 text-center text-lg font-bold">{packs}</output>
          <button type="button" class={stepClass} aria-label={buy.more} disabled={packs >= buy.maxPacks} onclick={() => (packs = Math.min(buy.maxPacks, packs + 1))}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" class="size-5"><path d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </button>
        </div>
      </div>

      <dl class="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2.5 leading-snug">
        <dt class="text-(--ink-soft)">{buy.productsLabel(packs * buy.adaptersPerPack)}</dt>
        <dd class="font-bold text-(--ink) text-right tabular-nums">{subtotal}</dd>
        <dt class="text-(--ink-soft)">{buy.shippingLabel(packs)}</dt>
        <dd class="text-(--ink) text-right tabular-nums">{shipping}</dd>
      </dl>
      <p class="-mt-3 text-sm leading-normal text-(--ink-mute)">{buy.pricesNote}</p>

      <!-- Leaves the site for the Shopify checkout of urosystem.com: same tab,
           `rel="external"` so SvelteKit's router hands it to the browser. -->
      <a
        href={checkoutHref}
        rel="external"
        class="flex items-center justify-center gap-2.5 min-h-14 px-6 rounded-full text-lg font-bold transition-colors
               bg-navy-900 text-white hover:bg-navy-950 dark:bg-white dark:text-navy-950 dark:hover:bg-mist
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-[22px]">
          <path d={buy.checkoutIcon} />
        </svg>
        {buy.checkout}
      </a>
      <p class="-mt-2 text-sm leading-normal text-center text-(--ink-mute)">{buy.checkoutNote}</p>

      <div class="flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <span class="mr-1 text-[13px] font-bold tracking-[0.08em] uppercase text-(--ink-mute)">{buy.acceptLabel}</span>
        <ul class="contents">
          {#each buy.cards as card (card)}
            <li class="inline-flex items-center h-[30px] px-3 rounded-lg ring-1 ring-inset ring-mist/85 dark:ring-white/15 text-sm font-semibold text-(--ink)">
              {card}
            </li>
          {/each}
        </ul>
      </div>

      <a
        href="#first-pack"
        class="flex items-center gap-2.5 min-h-11 px-4 py-2.5 rounded-[14px] text-[15px] leading-snug transition-colors
               bg-blush/40 text-(--ink) hover:bg-blush/60 dark:bg-blush/12 dark:hover:bg-blush/20
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
      >
        <span class="flex-1"><strong>{buy.firstPackNudge.strong}</strong> {buy.firstPackNudge.rest}</span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>

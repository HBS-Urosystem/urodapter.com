<script lang="ts">
  import { hero, heroAudienceCards, heroTrustStats, heroRegulatory } from '$lib/content/home';
  import photo from '$lib/assets/home/hero-consultation.jpg?enhanced';
  import product from '$lib/assets/product/urodapter-on-syringe.png?enhanced';

  const [patientCard, clinicianCard] = heroAudienceCards;
</script>

{#snippet productImage(extra: string)}
  <!-- The product shot is flipped and tilted so the adapter points down-left,
       toward the copy, as on the canvas. -->
  <enhanced:img
    src={product}
    alt={hero.productAlt}
    sizes="(min-width: 1080px) 240px, 46vw"
    class="h-auto -scale-y-100 -rotate-6 drop-shadow-[0_18px_24px_rgba(11,59,84,0.3)] {extra}"
  />
{/snippet}

{#snippet quote(q: { text: string; author: string }, rule: string)}
  <figure class="relative mt-auto pt-3.5 border-t {rule} flex flex-col gap-1.5">
    <blockquote class="text-sm leading-normal italic font-light text-(--ink)">“{q.text}”</blockquote>
    <figcaption class="text-[13px] font-semibold text-(--ink-soft)">{q.author}</figcaption>
  </figure>
{/snippet}

{#snippet tick(round: boolean)}
  {#if round}
    <span aria-hidden="true" class="size-2 shrink-0 rounded-full bg-aqua"></span>
  {:else}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4 shrink-0 text-(--accent-ink)"><path d="m4.5 12.75 6 6 9-13.5" /></svg>
  {/if}
{/snippet}

<!-- Home hero (canvas "Főoldal" board, 2026-11-18). Left: the product name,
     the headline as the light display line, the intro and the two CTAs.
     Right: the consultation photo with the product shot over it, and the two
     audience cards overlapping its lower edge (md and up) — the patient card
     warm (blush, a soft blob), the clinician card cool (white, a square
     corner): the two "temperatures" of the brand. Each card carries one
     quote, which replaced the rotating quotes on the photo. -->
<section aria-labelledby="h-hero" class="max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(3rem,5vw,4.5rem)] flex flex-wrap items-start gap-[clamp(2.5rem,5vw,4rem)]">
  <div class="flex-[1_1_26rem] min-w-0 flex flex-col items-start gap-6 pt-[clamp(0rem,3vw,2.5rem)]">
    <h1 class="display-title text-(--brand-ink)!">{hero.title}</h1>
    <h2 id="h-hero" class="display-light -mt-2">{hero.headline}</h2>
    <p class="max-w-[30rem] text-[clamp(1.125rem,1.5vw,1.3125rem)] leading-relaxed text-(--ink-soft) text-pretty">{hero.intro}</p>
    <div class="flex flex-wrap gap-3">
      <a
        href={hero.primaryCta.href}
        class="group inline-flex items-center gap-2.5 h-13 px-6.5 rounded-full font-semibold bg-navy-900 text-white hover:bg-navy-950
               dark:bg-white dark:text-navy-950 dark:hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
      >
        {hero.primaryCta.label} <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
      </a>
      <a
        href={hero.secondaryCta.href}
        class="inline-flex items-center h-13 px-6 rounded-full font-semibold ring-[1.5px] ring-inset ring-navy-900 text-navy-900 hover:bg-navy-900/5
               dark:ring-white/70 dark:text-white dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
      >
        {hero.secondaryCta.label}
      </a>
    </div>
    <!-- enhanced:img renders a <picture>, so the wrapper carries the layout. -->
    <div class="self-center w-[min(46%,15rem)] mt-2 min-[1080px]:hidden">{@render productImage('w-full')}</div>
  </div>

  <div class="flex-[1.25_1_32.5rem] min-w-0 flex flex-col">
    <div class="relative">
      <enhanced:img
        src={photo}
        alt={hero.photoAlt}
        sizes="(min-width: 1280px) 700px, (min-width: 1080px) 55vw, 100vw"
        fetchpriority="high"
        class="block w-full aspect-[3/2] object-cover rounded-[28px]"
      />
      <div aria-hidden="true" class="hidden min-[1080px]:block absolute left-[5%] top-[16%] w-[26%]">
        {@render productImage('w-full')}
      </div>
    </div>

    <div class="relative mt-5 md:-mt-26 md:mx-[clamp(0.5rem,2vw,1.25rem)] grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(100%,15.5rem),1fr))]">
      <a
        href={patientCard.href}
        aria-labelledby="hero-card-patients"
        class="accent-patient group relative overflow-hidden flex flex-col gap-3.5 p-6 rounded-2xl text-(--ink)
               bg-[color-mix(in_srgb,var(--color-blush)_40%,white)] shadow-[0_18px_40px_rgba(11,59,84,0.14)]
               dark:bg-navy-900 dark:ring-1 dark:ring-blush/25 dark:shadow-none
               focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-ink)"
      >
        <div aria-hidden="true" class="absolute -top-[69px] -left-18 w-40 h-[150px] rounded-[58%_42%_55%_45%/52%_60%_40%_48%] bg-blush dark:bg-blush/15"></div>
        <div class="relative flex items-center justify-between gap-3">
          <span class="eyebrow">{patientCard.eyebrow}</span>
          <span aria-hidden="true" class="grid place-items-center size-11 rounded-full bg-white text-navy-900 dark:bg-white/10 dark:text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d={patientCard.icon} /></svg>
          </span>
        </div>
        <h2 id="hero-card-patients" class="relative text-2xl leading-tight font-light">{patientCard.title}</h2>
        <ul class="relative flex flex-col gap-2 text-[15px] leading-snug text-(--ink-soft)">
          {#each patientCard.items as item (item)}<li class="flex items-center gap-2.5">{@render tick(true)}{item}</li>{/each}
        </ul>
        {#if patientCard.quote}{@render quote(patientCard.quote, 'border-blush dark:border-blush/25')}{/if}
        <span class="relative mt-1 text-[15px] font-bold">{patientCard.linkLabel} <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span></span>
      </a>

      <a
        href={clinicianCard.href}
        aria-labelledby="hero-card-clinicians"
        class="accent-clinician group relative overflow-hidden flex flex-col gap-3.5 p-6 rounded-2xl text-(--ink)
               bg-white ring-1 ring-inset ring-mist shadow-[0_18px_40px_rgba(7,44,63,0.14)]
               dark:bg-navy-900 dark:ring-white/10 dark:shadow-none
               focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-ink)"
      >
        <div aria-hidden="true" class="absolute right-0 top-0 w-[150px] h-[110px] bg-mist/35 dark:bg-white/5 [clip-path:polygon(35%_0,100%_0,100%_100%)]"></div>
        <div class="relative flex items-center justify-between gap-3">
          <span class="eyebrow rounded-[2px]!">{clinicianCard.eyebrow}</span>
          <span aria-hidden="true" class="grid place-items-center size-11 rounded-[2px] bg-white ring-1 ring-inset ring-mist text-(--accent-ink) dark:bg-white/10 dark:ring-white/15">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-[26px]"><path d={clinicianCard.icon} /></svg>
          </span>
        </div>
        <h2 id="hero-card-clinicians" class="relative text-2xl leading-tight font-light">{clinicianCard.title}</h2>
        <ul class="relative flex flex-col gap-2 text-[15px] leading-snug text-(--ink-soft)">
          {#each clinicianCard.items as item (item)}<li class="flex items-center gap-2.5">{@render tick(false)}{item}</li>{/each}
        </ul>
        {#if clinicianCard.quote}{@render quote(clinicianCard.quote, 'border-mist dark:border-white/15')}{/if}
        <span class="relative mt-1 text-[15px] font-bold text-(--accent-ink)">{clinicianCard.linkLabel} <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span></span>
      </a>
    </div>
  </div>
</section>

<!-- Credibility strip: the four facts under a hairline, then the regulatory line. -->
<section aria-label="Why UroDapter can be trusted" class="max-w-7xl mx-auto px-5 sm:px-8 pb-[clamp(3rem,5vw,4.5rem)]">
  <ul class="pt-7 border-t border-mist dark:border-white/15 grid gap-x-8 gap-y-6 grid-cols-[repeat(auto-fit,minmax(min(100%,14.375rem),1fr))]">
    {#each heroTrustStats as stat (stat.title)}
      <li class="flex items-start gap-3.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-[26px] shrink-0 text-[#1d6788] dark:text-cerulean"><path d={stat.icon} /></svg>
        <div class="flex flex-col gap-0.5">
          <strong class="{stat.emphasis ? 'text-2xl leading-tight font-bold' : 'text-[17px] font-semibold'} text-(--ink)">{stat.title}</strong>
          {#if stat.sub}<span class="text-[15px] text-(--ink-soft)">{stat.sub}</span>{/if}
          {#if stat.link}
            <a href={stat.link.href} class="group inline-flex items-center gap-1 text-[15px] font-semibold text-(--brand-ink) underline-offset-4 hover:underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)">
              {stat.link.label} <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
            </a>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
  <p class="mt-6 text-[13px] leading-normal text-(--ink-soft)">{heroRegulatory}</p>
</section>

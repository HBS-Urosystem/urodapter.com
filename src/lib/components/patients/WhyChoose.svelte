<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { whyChoose, whyChooseItems } from '$lib/content/patients';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import IndicationsStrip from '$lib/components/shared/IndicationsStrip.svelte';

  // `whyChooseItems` is built from `whyChoose.benefits` in order; the pane
  // looks its benefit up by item id rather than by position.
  const benefitById = new Map(
    whyChooseItems.map((item, i) => [item.id, whyChoose.benefits[i]])
  );
</script>

<!-- Section 1 (0831 docx) — "Why patients choose UroDapter?". Canvas
     restyle 2026-11-18: a mist band with the eyebrow and the light display
     heading; the photo, headline and intro moved up into PatientHero. Then the
     four benefits (AutoAccordion, design system §6a) and the indications line. -->
<section aria-labelledby="p-why" class="bg-mist/35 dark:bg-[#062536]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(3.5rem,6vw,6rem)]">
  <div class="flex flex-col items-start gap-4 max-w-3xl">
    <p class="eyebrow">{whyChoose.eyebrow}</p>
    <h2 id="p-why" class="display-light">{whyChoose.heading}</h2>
  </div>

  <!-- Canvas (2026-11-18): from 768px the four benefits are four white cards
     side by side, all visible; below 768px the same cards sit in the
     AutoAccordion (design system §6a), whose header carries the title. The
     icon chips alternate blush (warm) and mist (cool). -->
  {#snippet benefitCard(benefit: (typeof whyChoose.benefits)[number], i: number, withTitle: boolean)}
    <article class="h-full rounded-[30px] p-7 flex flex-col gap-3.5 bg-white dark:bg-navy-900 dark:ring-1 dark:ring-white/10">
      <span
        aria-hidden="true"
        class="grid place-items-center size-14 rounded-full text-navy-900 dark:text-white {i % 2 === 0 ? 'bg-blush dark:bg-blush/15' : 'bg-mist/55 dark:bg-white/10'}"
      >
        <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon} /></svg>
      </span>
      {#if withTitle}<h3 class="text-[21px] leading-tight font-semibold text-(--ink)">{benefit.title}</h3>{/if}
      <p class="leading-relaxed text-(--ink-soft) text-pretty">{benefit.body}</p>
    </article>
  {/snippet}

  <ul use:reveal class="mt-10 hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-5">
    {#each whyChoose.benefits as benefit, i (benefit.title)}
      <li>{@render benefitCard(benefit, i, true)}</li>
    {/each}
  </ul>

  <div use:reveal class="mt-8 md:hidden">
    <AutoAccordion items={whyChooseItems} controlLabel="the patient benefits">
      {#snippet panel(item)}
        {@const benefit = benefitById.get(item.id)}
        {#if benefit}
          {@render benefitCard(benefit, whyChoose.benefits.indexOf(benefit), false)}
        {/if}
      {/snippet}
    </AutoAccordion>
  </div>

  <div use:reveal class="mt-6">
    <IndicationsStrip text={whyChoose.indications.text} items={whyChoose.indications.items} />
  </div>
  </div>
</section>

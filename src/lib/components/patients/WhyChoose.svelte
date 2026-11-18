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

  <!-- The four benefits are an AutoAccordion (design system §6a). The headers
       carry no icon chip on purpose — see `whyChooseItems`: chips would make
       this list taller than the grid it replaces. The icon moves to the pane. -->
  <div use:reveal class="mt-8">
    <AutoAccordion items={whyChooseItems} controlLabel="the patient benefits">
      {#snippet panel(item)}
        {@const benefit = benefitById.get(item.id)}
        {#if benefit}
          <div class="rounded-2xl surface-card p-6 sm:p-8 h-full flex flex-col justify-center">
            <span
              class="w-12 h-12 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon} /></svg>
            </span>
            <p class="mt-5 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200 text-pretty">
              {benefit.body}
            </p>
          </div>
        {/if}
      {/snippet}
    </AutoAccordion>
  </div>

  <div use:reveal class="mt-6">
    <IndicationsStrip text={whyChoose.indications.text} items={whyChoose.indications.items} />
  </div>
  </div>
</section>

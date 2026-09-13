<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { hero, whyChoose, whyChooseItems } from '$lib/content/patients';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import IndicationsStrip from '$lib/components/shared/IndicationsStrip.svelte';
  import patientImage from '$lib/assets/patients/patient-hero.jpg?enhanced';

  // `whyChooseItems` is built from `whyChoose.benefits` in order; the pane
  // looks its benefit up by item id rather than by position.
  const benefitById = new Map(
    whyChooseItems.map((item, i) => [item.id, whyChoose.benefits[i]])
  );
</script>

<!-- Section 1 (0831 docx) — "Why patients choose UroDapter?". One section:
     the headline sits ON the hero image, the intro sentence below it, then the
     four benefit cards and the indications line. The docx asks for the headline
     "on top/top-right" of the photo; in this asset the subject's face occupies
     the top-right, so the glass panel sits top-left (page plan, open items). -->
<section aria-labelledby="patient-hero-heading" class="max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-12">
  <div class="relative rounded-3xl overflow-hidden">
    <enhanced:img
      src={patientImage}
      alt=""
      aria-hidden="true"
      sizes="(min-width: 1280px) 76rem, 100vw"
      fetchpriority="high"
      class="w-full h-[26rem] sm:h-[24rem] lg:h-[30rem] object-cover object-[72%_28%]"
    />

    <!-- Glass headline panel — the same vocabulary as the home hero's audience
         cards, so the message stays legible over any future photo. -->
    <div class="absolute inset-0 p-4 sm:p-7 lg:p-9 flex pointer-events-none">
      <div
        class="self-end sm:self-start w-full sm:max-w-md lg:max-w-lg rounded-2xl bg-white/85 dark:bg-navy-950/80 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg p-5 sm:p-7"
      >
        <h1
          id="patient-hero-heading"
          class="font-display font-semibold text-navy-950 dark:text-white leading-[1.15] text-balance text-[clamp(1.6rem,3.6vw,2.5rem)]"
        >
          {hero.headline}
        </h1>
        <div class="mt-5 h-0.5 w-12 rounded-full bg-patient/60 dark:bg-sky-300/60" aria-hidden="true"></div>
      </div>
    </div>
  </div>

  <p class="mt-8 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {hero.body}
  </p>

  <div class="mt-12">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-patient dark:text-sky-300">
      {whyChoose.eyebrow}
    </p>
    <h2
      class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
    >
      {whyChoose.heading}
    </h2>
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
</section>

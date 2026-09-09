<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { hero, clinicalValue } from '$lib/content/clinicians';
  import BenefitCard from '$lib/components/shared/BenefitCard.svelte';
  import ImagePlaceholder from '$lib/components/shared/ImagePlaceholder.svelte';
</script>

<!-- Section 1 (0831 docx) — "Clinical Value for You and Your Patients".
     Hero sub-title + the two intro paragraphs, then the two labelled benefit
     groups. The docx asks for the groups to stay separated so they read well on
     mobile; two labelled rows do that without nesting cards inside a box.
     The hero photo is still a pending client asset, so the slot states what it
     should show — apply the patient page's on-image headline once it lands. -->
<section aria-labelledby="clinician-hero-heading" class="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16">
  <div class="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 lg:gap-12 items-center">
    <div class="lg:pr-6">
      <h1
        id="clinician-hero-heading"
        class="font-display font-semibold text-navy-950 dark:text-white leading-[1.15] text-balance text-[clamp(1.6rem,3.4vw,2.4rem)]"
      >
        {hero.headline}
      </h1>
      <div class="mt-7 h-0.5 w-12 rounded-full bg-(--accent-ink)/60" aria-hidden="true"></div>
      {#each hero.intro as paragraph, i (paragraph)}
        <p
          class="{i === 0 ? 'mt-7' : 'mt-4'} text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-md text-pretty"
        >
          {paragraph}
        </p>
      {/each}
    </div>

    <div class="w-full">
      <ImagePlaceholder description={hero.image.description} ratio="aspect-[3/2]" />
    </div>
  </div>

  <div class="mt-14">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
      {clinicalValue.eyebrow}
    </p>
    <h2
      class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
    >
      {clinicalValue.heading}
    </h2>
  </div>

  {#each clinicalValue.groups as group (group.title)}
    <div class="mt-10">
      <h3 class="font-display font-semibold text-navy-950 dark:text-white text-xl">{group.title}</h3>
      <div use:reveal class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each group.items as item (item.title)}
          <BenefitCard title={item.title} body={item.body} icon={item.icon} />
        {/each}
      </div>
    </div>
  {/each}
</section>

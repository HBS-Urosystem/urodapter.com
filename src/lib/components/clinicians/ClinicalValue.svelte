<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { hero, clinicalValue, clinicalValueItems } from '$lib/content/clinicians';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import ImagePlaceholder from '$lib/components/shared/ImagePlaceholder.svelte';

  // Each accordion item is one group, so the pane looks its three benefits up
  // by the group title rather than by position.
  const benefitsByGroup = new Map(clinicalValue.groups.map((group) => [group.title, group.items]));
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

  <!-- The docx's own compression ask for this section: "the 3-3 cards/group can
       be placed on a shared box (1 box for the 3 patient benefit, 1 box for the
       clinician benefit) … can be sliders as well to save space". The
       AutoAccordion (§6a) is that shared box: one group open at a time, its
       three benefits in the pane. The group headers carry no body, so the list
       never changes height. -->
  <div use:reveal class="mt-10">
    <AutoAccordion items={clinicalValueItems} controlLabel="the clinical benefits">
      {#snippet panel(item)}
        <div class="rounded-2xl surface-card p-6 sm:p-8 h-full">
          <ul class="space-y-6">
            {#each benefitsByGroup.get(item.title) ?? [] as benefit (benefit.title)}
              <li class="flex items-start gap-4">
                <span
                  class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon} /></svg>
                </span>
                <div>
                  <h4 class="font-semibold text-navy-950 dark:text-white text-pretty">{benefit.title}</h4>
                  <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
                    {benefit.body}
                  </p>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/snippet}
    </AutoAccordion>
  </div>
</section>

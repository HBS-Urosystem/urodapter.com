<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { whatIsIt } from '$lib/content/clinicians';
  import ProductCallouts from '$lib/components/shared/ProductCallouts.svelte';
</script>

<!-- Section 2 — the device itself. The client's own "Product Features" figure
     (embedded in the docx) supplies the four labels and their technical notes;
     the notes are hidden inside the 3×3 diagram below `sm` and repeated as a
     plain list there instead. -->
<section aria-labelledby="what-is-it-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <div class="text-center max-w-3xl mx-auto">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
      {whatIsIt.eyebrow}
    </p>
    <h2
      id="what-is-it-heading"
      class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
    >
      {whatIsIt.heading}
    </h2>
    <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
      {whatIsIt.intro}
    </p>
    <p class="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
      {whatIsIt.spec}
    </p>
  </div>

  <div use:reveal class="mt-10 max-w-4xl mx-auto rounded-2xl surface-card p-6 sm:p-10">
    <ProductCallouts callouts={whatIsIt.callouts} />
  </div>

  <!-- Narrow viewports: the diagram keeps the labels, the notes move here -->
  <dl class="sm:hidden mt-6 space-y-4">
    {#each whatIsIt.callouts as callout (callout.label)}
      <div>
        <dt class="text-sm font-semibold text-navy-950 dark:text-white">{callout.label}</dt>
        <dd class="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{callout.description}</dd>
      </div>
    {/each}
  </dl>
</section>

<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { socialProof } from '$lib/content/clinicians';
  import StatCard from '$lib/components/shared/StatCard.svelte';
  import TestimonialCard from '$lib/components/shared/TestimonialCard.svelte';
  import SupportCenterCard from '$lib/components/shared/SupportCenterCard.svelte';
</script>

<!-- Section 3 (0831 docx) — social proof, in the docx's own order: clinician
     testimonials, then the "Trusted Worldwide" numbers, then patient
     testimonials. The adoption block's title and sentence serve as the section
     header so the docx wording appears once. Grids, not sliders — the quotes
     stay visible (design system §6). -->
<section aria-labelledby="social-proof-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
    {socialProof.eyebrow}
  </p>
  <h2
    id="social-proof-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {socialProof.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {socialProof.intro}
  </p>

  <h3 class="mt-12 font-display font-semibold text-navy-950 dark:text-white text-xl">
    {socialProof.clinicians.heading}
  </h3>

  <div use:reveal class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each socialProof.clinicians.items as t (t.author)}
      <TestimonialCard theme={t.theme} icon={t.icon} quote={t.quote} author={t.author} meta={t.meta} />
    {/each}
  </div>

  <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">{socialProof.clinicians.disclaimer}</p>

  <div use:reveal class="mt-6">
    <SupportCenterCard
      variant="tint"
      heading={socialProof.clinicians.more.heading}
      body={socialProof.clinicians.more.body}
      linkLabel={socialProof.clinicians.more.linkLabel}
      href={socialProof.clinicians.more.href}
    />
  </div>

  <!-- "Trusted Worldwide" figures -->
  <div use:reveal class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each socialProof.stats as stat (stat.label)}
      <StatCard highlight={stat.value} rest={stat.label} source={stat.source} icon={stat.icon} />
    {/each}
  </div>

  <h3 class="mt-12 font-display font-semibold text-navy-950 dark:text-white text-xl">
    {socialProof.patients.heading}
  </h3>

  <div use:reveal class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each socialProof.patients.items as t (t.author)}
      <TestimonialCard theme={t.theme} icon={t.icon} quote={t.quote} author={t.author} meta={t.meta} />
    {/each}
  </div>

  <div use:reveal class="mt-6">
    <SupportCenterCard
      heading={socialProof.patients.more.heading}
      body={socialProof.patients.more.body}
      linkLabel={socialProof.patients.more.linkLabel}
      href={socialProof.patients.more.href}
    />
  </div>
</section>

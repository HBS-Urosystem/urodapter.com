<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { adoption } from '$lib/content/clinicians';
  import StatCard from '$lib/components/shared/StatCard.svelte';
  import TestimonialCard from '$lib/components/shared/TestimonialCard.svelte';
  import SupportCenterCard from '$lib/components/shared/SupportCenterCard.svelte';
</script>

<!-- Section 7 — real-world adoption: the numbers the client asked to "throw
     around", the international partners named in the docx, and the clinician /
     KOL testimonials. A grid, not a slider — the quotes stay visible. -->
<section aria-labelledby="adoption-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
    {adoption.eyebrow}
  </p>
  <h2
    id="adoption-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {adoption.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {adoption.intro}
  </p>

  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each adoption.stats as stat (stat.highlight)}
      <StatCard highlight={stat.highlight} rest={stat.rest} source={stat.source} icon={stat.icon} />
    {/each}
  </div>

  <div use:reveal class="mt-6 rounded-2xl surface-panel p-6 sm:p-7">
    <h3 class="font-semibold text-navy-950 dark:text-white">{adoption.partners.heading}</h3>
    <ul class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
      {#each adoption.partners.items as partner (partner.name)}
        <li class="flex items-start gap-3">
          <span
            class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={partner.icon} /></svg>
          </span>
          <div>
            <p class="text-sm font-semibold text-navy-950 dark:text-white">{partner.name}</p>
            <p class="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">{partner.detail}</p>
          </div>
        </li>
      {/each}
    </ul>
  </div>

  <h3 class="mt-12 font-display font-semibold text-navy-950 dark:text-white text-xl">
    {adoption.testimonials.heading}
  </h3>

  <div use:reveal class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each adoption.testimonials.items as t (t.author)}
      <TestimonialCard theme={t.theme} icon={t.icon} quote={t.quote} author={t.author} meta={t.meta} />
    {/each}
  </div>

  <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">{adoption.testimonials.disclaimer}</p>

  <div use:reveal class="mt-6">
    <SupportCenterCard
      heading={adoption.testimonials.more.heading}
      body={adoption.testimonials.more.body}
      linkLabel={adoption.testimonials.more.linkLabel}
      href={adoption.testimonials.more.href}
    />
  </div>
</section>

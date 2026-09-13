<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { socialProof, socialProofItems } from '$lib/content/clinicians';
  import AutoAccordion from '$lib/components/shared/AutoAccordion.svelte';
  import StatCard from '$lib/components/shared/StatCard.svelte';
  import SupportCenterCard from '$lib/components/shared/SupportCenterCard.svelte';

  // The accordion flattens both quote sets into one list, in the same order
  // `socialProofItems` is built; the pane looks its quote up by item id rather
  // than by position.
  const allQuotes = [...socialProof.clinicians.items, ...socialProof.patients.items];
  const quoteById = new Map(socialProofItems.map((item, i) => [item.id, allQuotes[i]]));
</script>

<!-- Section 3 (0831 docx) — social proof, in the docx's own order: clinician
     testimonials, then the "Trusted Worldwide" numbers, then patient
     testimonials. The adoption block's title and sentence serve as the section
     header so the docx wording appears once.

     The two quote grids are one AutoAccordion (design system §6a) since
     2026-09-13. This reverses §6's earlier "a grid beats a carousel, the
     quotes stay visible" call for *this* section — see §6a. What kept the old
     objection honest: the quote is the pane, which is always on screen rather
     than collapsed, and the clinician/patient split survives as the
     accordion's two labelled groups. The numbers row stays outside the
     accordion: it is the glanceable trust signal and only costs ~150px. -->
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

  <!-- "Trusted Worldwide" figures -->
  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each socialProof.stats as stat (stat.label)}
      <StatCard highlight={stat.value} rest={stat.label} source={stat.source} icon={stat.icon} />
    {/each}
  </div>

  <div use:reveal class="mt-12">
    <AutoAccordion items={socialProofItems} controlLabel="the testimonials">
      {#snippet panel(item)}
        {@const quote = quoteById.get(item.id)}
        {#if quote}
        <div class="rounded-2xl surface-card p-6 sm:p-8 h-full flex flex-col justify-center">
          <span class="font-display text-4xl leading-none text-(--accent-ink)" aria-hidden="true">&ldquo;</span>
          <blockquote class="mt-3">
            <p class="text-base sm:text-lg leading-relaxed text-navy-900 dark:text-slate-100 text-pretty">
              {quote.quote}
            </p>
            <footer class="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 text-sm">
              <span class="font-semibold text-navy-950 dark:text-white">{quote.author}</span>
              <span class="block mt-0.5 text-xs text-slate-500 dark:text-slate-400">{quote.meta}</span>
            </footer>
          </blockquote>
        </div>
        {/if}
      {/snippet}
    </AutoAccordion>
  </div>

  <p class="mt-6 text-xs text-slate-500 dark:text-slate-400">{socialProof.clinicians.disclaimer}</p>

  <!-- Both "read more" destinations are real and distinct (clinician
       collection vs. the patient journey), so they sit side by side rather
       than stacked — the audit's §4.4 merge still needs the client to say
       which copy survives. -->
  <div use:reveal class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
    <SupportCenterCard
      variant="tint"
      heading={socialProof.clinicians.more.heading}
      body={socialProof.clinicians.more.body}
      linkLabel={socialProof.clinicians.more.linkLabel}
      href={socialProof.clinicians.more.href}
    />
    <SupportCenterCard
      heading={socialProof.patients.more.heading}
      body={socialProof.patients.more.body}
      linkLabel={socialProof.patients.more.linkLabel}
      href={socialProof.patients.more.href}
    />
  </div>
</section>

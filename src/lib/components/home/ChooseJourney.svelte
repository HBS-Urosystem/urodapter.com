<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { journey } from '$lib/content/home';
  import SupportCenterCard from '$lib/components/shared/SupportCenterCard.svelte';

  const accentClass: Record<string, string> = {
    patient: 'accent-patient',
    clinician: 'accent-clinician',
    distributor: 'accent-distributor',
  };
</script>

<!-- Section 3 (0831 page_content docx) — "Choose Your Journey" plus the Support
     Center shortcut. Cards use `.accent-pill` (a flat solid fill), not the
     `.surface-solid` gradient: at card size the label sits across the whole
     sweep, where clinician teal and distributor violet drop white text under
     4.5:1 (design system §4). -->
<section aria-labelledby="journey-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <h2
    id="journey-heading"
    class="font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {journey.heading}
  </h2>

  <div use:reveal class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each journey.cards as card (card.id)}
      <div class={accentClass[card.id]}>
        <a
          href={card.href}
          class="group accent-pill transition-[background] rounded-2xl p-6 flex flex-col h-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <h3 class="font-semibold">{card.title}</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/85 flex-1 text-pretty">{card.copy}</p>
          <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
            Explore
            <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    {/each}
  </div>

  <!-- `#support` is the target of the header's "Support Center" nav item and of
       every pending "learn more" link on the site. Until a real Support Center
       route exists, this block is what those links resolve to — without the id
       they scroll nowhere. -->
  <div use:reveal id="support" class="mt-6 scroll-mt-24">
    <SupportCenterCard
      variant="tint"
      heading={journey.support.heading}
      body={journey.support.body}
      linkLabel={journey.support.linkLabel}
      href={journey.support.href}
    />
  </div>
</section>

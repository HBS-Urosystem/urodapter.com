<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { partners, type Partner } from '$lib/content/support';

  const { strategic, icons } = partners;
  const linkClass =
    'inline-flex items-center gap-1.5 min-h-11 font-semibold text-navy-900 dark:text-white underline-offset-4 hover:underline rounded-sm ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)';
</script>

{#snippet icon(d: string)}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4 shrink-0">
    {#each d.split(' M') as part, i (i)}<path d={i ? `M${part}` : part} />{/each}
  </svg>
{/snippet}

{#snippet partnerCard(p: Partner)}
  <article class="h-full rounded-[20px] p-5 flex items-center gap-4 bg-white ring-1 ring-inset ring-mist/85 dark:bg-navy-900 dark:ring-white/10">
    <!-- Logos are on white in both schemes: they are the partners' own artwork. -->
    <span class="grid place-items-center w-28 h-16 shrink-0 rounded-xl bg-white p-2 ring-1 ring-mist/55">
      <enhanced:img src={p.logo} alt={p.logoAlt} sizes="112px" loading="lazy" class="max-w-full max-h-full w-auto h-auto object-contain" />
    </span>
    <div class="flex-1 min-w-0 flex flex-col gap-1">
      <h4 class="font-semibold leading-tight text-(--ink)">{p.name}</h4>
      <span class="inline-flex items-center gap-1 text-sm text-(--ink-mute)">{@render icon(icons.pin)}{p.country}</span>
      {#if p.href}
        <a href={p.href} target="_blank" rel="external noopener noreferrer" class="{linkClass} self-start">
          {partners.visitWebsite}<span class="sr-only">: {p.name} (opens in a new tab)</span> {@render icon(icons.external)}
        </a>
      {/if}
    </div>
  </article>
{/snippet}

<!-- "Partners" (canvas board 2/2): the strategic partner (IBSA), the clinical
     partner and the distributors; the closing link goes to the distributor
     journey (lilac — the distributor's colour). -->
<section id="partners" aria-labelledby="partners-h" class="scroll-mt-6 bg-white dark:bg-navy-950">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 id="partners-h" class="display-light">{partners.heading}</h2>
      <p class="max-w-3xl text-lg leading-relaxed text-(--ink-soft)">{partners.intro}</p>
    </div>

    <article use:reveal class="rounded-3xl p-[clamp(1.5rem,3vw,2.5rem)] grid gap-6 md:grid-cols-[auto_1fr] items-center bg-mist/15 ring-1 ring-inset ring-mist/55 dark:bg-white/5 dark:ring-white/10">
      <enhanced:img src={strategic.image} alt="" sizes="220px" loading="lazy" class="hidden md:block w-52 h-auto" />
      <div class="flex flex-col items-start gap-3">
        <span class="eyebrow">{strategic.tag}</span>
        <h3>
          <span class="sr-only">{strategic.logoAlt}</span>
          <span aria-hidden="true" class="inline-grid place-items-center h-16 px-4 rounded-xl bg-white ring-1 ring-mist/55">
            <enhanced:img src={strategic.logo} alt="" sizes="160px" loading="lazy" class="h-11 w-auto" />
          </span>
        </h3>
        <p class="max-w-2xl leading-relaxed text-(--ink-soft)">{strategic.body}</p>
        <a href={strategic.href} target="_blank" rel="external noopener noreferrer" class={linkClass}>
          {partners.visitWebsite}<span class="sr-only">: IBSA (opens in a new tab)</span> {@render icon(icons.external)}
        </a>
      </div>
    </article>

    <h3 class="text-2xl font-semibold text-(--ink)">{partners.clinicalHeading}</h3>
    <ul use:reveal class="-mt-3 grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))]">
      {#each partners.clinical as p (p.name)}<li>{@render partnerCard(p)}</li>{/each}
    </ul>
    <h3 class="text-2xl font-semibold text-(--ink)">{partners.distributorsHeading}</h3>
    <ul use:reveal class="-mt-3 grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))]">
      {#each partners.distributors as p (p.name)}<li>{@render partnerCard(p)}</li>{/each}
    </ul>

    <div class="accent-distributor flex flex-wrap items-center justify-between gap-4 rounded-[20px] px-6 py-5 bg-lilac/10 ring-1 ring-inset ring-lilac/45 dark:bg-lilac/10 dark:ring-lilac/30">
      <span class="text-lg font-semibold text-(--ink)">{partners.cta.text}</span>
      <a href={partners.cta.href} class="group inline-flex items-center gap-2 min-h-12 px-5 rounded-full font-bold accent-pill text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-ink)">
        {partners.cta.link} <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
      </a>
    </div>
  </div>
</section>

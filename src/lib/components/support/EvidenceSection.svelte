<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { evidence, using } from '$lib/content/support';

  type Publication = (typeof evidence.studies)[number] | (typeof evidence.guidelines)[number];
  const linkClass =
    'inline-flex items-center gap-1.5 min-h-11 font-semibold text-navy-900 dark:text-white underline-offset-4 hover:underline rounded-sm ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)';
</script>

{#snippet icon(d: string)}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-[18px] shrink-0"><path {d} /></svg>
{/snippet}

{#snippet card(p: Publication, guideline: boolean)}
  <article
    class="h-full rounded-[20px] p-6 flex flex-col gap-3 ring-1 ring-inset
           {guideline ? 'bg-white ring-aqua/60 dark:bg-navy-900 dark:ring-aqua/30' : 'bg-white ring-mist/85 dark:bg-navy-900 dark:ring-white/10'}"
  >
    <span class="self-start inline-flex items-center h-7 px-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase
                 {guideline ? 'bg-aqua/25 text-navy-950 dark:bg-aqua/20 dark:text-white' : 'bg-mist/55 text-navy-900 dark:bg-white/10 dark:text-mist'}">{p.type}</span>
    <h4 class="text-xl font-semibold leading-tight text-(--ink)">{p.title}</h4>
    {#if 'source' in p}<p class="font-semibold text-(--ink-soft)">{p.source}</p>{/if}
    {#if guideline && 'citation' in p}<p class="text-sm text-(--ink-mute)">{p.citation}</p>{/if}
    <p class="leading-relaxed text-(--ink-soft)">{p.body}</p>
    {#if !guideline && 'citation' in p}<p class="text-sm italic text-(--ink-mute)">{p.citation}</p>{/if}
    <div class="mt-auto pt-2 flex flex-wrap gap-x-6 gap-y-1">
      <a href={p.online.href} target="_blank" rel="external noopener noreferrer" class={linkClass}>
        {p.online.label}<span class="sr-only"> (opens in a new tab)</span> {@render icon(using.icons.external)}
      </a>
      {#if 'pdf' in p && p.pdf}
        <a href={p.pdf.href} download rel="external" class={linkClass}>
          {@render icon(using.icons.download)} {p.pdf.label}<span class="sr-only">, {p.title}</span>
          <span class="font-normal text-(--ink-mute)">({p.pdf.size})</span>
        </a>
      {:else if 'contact' in p && p.contact}
        <a href="#contact" class={linkClass}>{p.contact.label} <span aria-hidden="true">→</span></a>
      {/if}
    </div>
  </article>
{/snippet}

<!-- "Clinical Evidence" (canvas board 1/2): three published studies, then the
     two guideline / consensus documents (aqua: the clinician's colour). -->
<section id="evidence" aria-labelledby="evidence-h" class="scroll-mt-6 bg-mist/15 dark:bg-[#062536]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 id="evidence-h" class="display-light">{evidence.heading}</h2>
      <p class="max-w-3xl text-lg leading-relaxed text-(--ink-soft) text-pretty">{evidence.intro}</p>
    </div>
    <h3 class="text-2xl font-semibold text-(--ink)">{evidence.studiesHeading}</h3>
    <ul use:reveal class="-mt-3 grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))]">
      {#each evidence.studies as study (study.title)}<li>{@render card(study, false)}</li>{/each}
    </ul>
    <h3 class="text-2xl font-semibold text-(--ink)">{evidence.guidelinesHeading}</h3>
    <ul use:reveal class="-mt-3 grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,26rem),1fr))]">
      {#each evidence.guidelines as guideline (guideline.title)}<li>{@render card(guideline, true)}</li>{/each}
    </ul>
  </div>
</section>

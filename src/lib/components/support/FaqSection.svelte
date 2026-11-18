<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { faq, type Rich } from '$lib/content/support';
</script>

{#snippet chevron()}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
    class="size-5 shrink-0 transition-transform motion-reduce:transition-none group-open:rotate-180"><path d={faq.chevron} /></svg>
{/snippet}

{#snippet rich(paragraph: Rich)}
  {#each paragraph as part, i (i)}
    {#if typeof part === 'string'}{part}{:else}<a href={part.href} target="_blank" rel="external noopener noreferrer" class="font-semibold text-(--brand-ink) underline underline-offset-2">{part.text}<span class="sr-only"> (opens in a new tab)</span></a>{/if}
  {/each}
{/snippet}

<!-- "Frequently Asked Questions" (canvas board 1/2): each question is a
     <details> with the short answer visible and the detailed answer one more
     <details> deep; the first is open. The aside sends unanswered questions
     to the contact form. -->
<section id="faq" aria-labelledby="faq-h" class="scroll-mt-6 bg-white dark:bg-navy-950">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 id="faq-h" class="display-light">{faq.heading}</h2>
      <p class="max-w-3xl text-lg leading-relaxed text-(--ink-soft)">{faq.intro}</p>
    </div>
    <div class="grid gap-6 lg:grid-cols-3 items-start">
      <div use:reveal class="lg:col-span-2 flex flex-col gap-3">
        {#each faq.items as item, i (item.question)}
          <details open={i === 0} class="group rounded-[20px] bg-mist/15 ring-1 ring-inset ring-mist/55 dark:bg-white/5 dark:ring-white/10">
            <summary class="flex items-center justify-between gap-4 p-5 sm:px-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-lg font-semibold leading-snug text-(--ink) rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)">
              {item.question}
              {@render chevron()}
            </summary>
            <div class="px-5 sm:px-6 pb-5 flex flex-col gap-3">
              <p class="leading-relaxed text-(--ink-soft)"><strong class="block text-sm uppercase tracking-[0.1em] text-(--ink-mute)">{faq.shortLabel}</strong>{item.short}</p>
              <details class="group/more">
                <summary class="inline-flex items-center gap-1.5 min-h-11 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold text-(--brand-ink) rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)">
                  {faq.detailLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4 transition-transform motion-reduce:transition-none group-open/more:rotate-180"><path d={faq.chevron} /></svg>
                </summary>
                <div class="mt-2 flex flex-col gap-3 leading-relaxed text-(--ink-soft)">
                  {#each item.detail as paragraph, j (j)}<p>{@render rich(paragraph)}</p>{/each}
                </div>
              </details>
            </div>
          </details>
        {/each}
      </div>
      <aside class="lg:sticky lg:top-6 rounded-[20px] p-6 flex flex-col items-start gap-3 bg-navy-900 text-white dark:ring-1 dark:ring-white/10">
        <span aria-hidden="true" class="grid place-items-center size-12 rounded-[14px] bg-white/10 text-aqua">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d={faq.aside.icon} /></svg>
        </span>
        <h3 class="text-xl font-semibold">{faq.aside.heading}</h3>
        <p class="leading-relaxed text-mist">{faq.aside.body}</p>
        <a href="#contact" class="mt-1 inline-flex items-center gap-2 min-h-12 px-5 rounded-full font-bold bg-white text-navy-950 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua">
          {faq.aside.link} <span aria-hidden="true">→</span>
        </a>
      </aside>
    </div>
  </div>
</section>

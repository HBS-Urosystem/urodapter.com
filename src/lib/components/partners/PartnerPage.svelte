<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { partnerPage as page } from '$lib/content/home';
  import product from '$lib/assets/product/urodapter-on-syringe.png?enhanced';

  // The plus of the UroDapter logo (UroDapterLogo, horizontal), as the hero's
  // decoration — the same device as the Support Center hero.
  const plus =
    'm569.37 223.06h-34.87v-37.27c0-18.86-15.29-34.16-34.16-34.16h-.71c-18.86 0-34.16 15.29-34.16 34.16v37.27h-34.87c-18.86 0-34.15 15.29-34.15 34.15v.71c0 18.86 15.29 34.15 34.15 34.15h34.87v32.48c0 18.86 15.29 34.15 34.16 34.15h.71c18.86 0 34.16-15.29 34.16-34.15v-32.48h34.87c18.86 0 34.15-15.29 34.15-34.15v-.71c0-18.86-15.29-34.15-34.15-34.15z';
</script>

<!-- Distributor page (canvas "Partner oldal" board, 2026-11-18). Still a
     placeholder journey — it says what is coming rather than pretending to be
     finished — now in the canvas layout: the header on a navy → plum band
     (dark in both schemes), then one lilac-10 hero band with the logo plus,
     the eyebrow, title, headline, rule and intro, and two cards: the roadmap
     (white, lilac ring) and the B2B invitation (solid plum ink, product shot).
     14px corners: the distributor's shape, between the patient's round and
     the clinician's square. -->
<div class="{page.accentClass} bg-white dark:bg-navy-950 text-(--ink)">
  <div class="bg-[linear-gradient(100deg,var(--color-navy-950)_0%,var(--accent-ink)_100%)] dark:bg-[linear-gradient(100deg,var(--color-navy-950)_0%,color-mix(in_srgb,var(--color-distributor)_80%,black)_100%)]">
    <SiteHeader variant="dark" />
  </div>

  <main>
    <section aria-labelledby="d-hero" class="relative overflow-hidden bg-lilac/10 dark:bg-[#062536]">
      <svg viewBox="397 151.5 207 207" aria-hidden="true" class="absolute -right-10 -top-15 size-[460px] fill-lilac/20 dark:fill-lilac/8"><path d={plus} /></svg>
      <div class="relative max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3rem,6vw,6rem)] flex flex-col gap-7">
        <span class="eyebrow self-start rounded-lg!">{page.eyebrow}</span>
        <h1 class="display-title text-(--accent-ink)!">{page.title}</h1>
        <h2 id="d-hero" class="display-light -mt-2 max-w-[61.25rem]">{page.heading}</h2>
        <span aria-hidden="true" class="w-12 h-0.5 rounded-full bg-(--brand-ink)/60"></span>
        <p class="max-w-3xl text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-relaxed text-(--ink-soft) text-pretty">{page.body}</p>

        <div class="mt-3 grid gap-6 items-start grid-cols-[repeat(auto-fit,minmax(min(100%,23.75rem),1fr))]">
          <div class="rounded-[20px] p-[clamp(1.5rem,3vw,2.25rem)] flex flex-col gap-5 bg-white ring-1 ring-inset ring-lilac/45 shadow-[0_18px_40px_-26px_rgba(61,53,80,0.45)] dark:bg-navy-900 dark:ring-lilac/25 dark:shadow-none">
            <div class="flex flex-col gap-1.5">
              <h2 class="text-[22px] leading-tight font-semibold text-(--ink)">{page.roadmap.heading}</h2>
              <p class="leading-relaxed text-(--ink-soft)">{page.roadmap.body}</p>
            </div>
            <ul class="grid gap-x-6 gap-y-4 grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]">
              {#each page.roadmap.items as item (item.label)}
                <li class="flex items-center gap-3.5">
                  <span aria-hidden="true" class="grid place-items-center size-11 shrink-0 rounded-[14px] bg-lilac/20 text-(--accent-ink) dark:bg-lilac/15">
                    <svg class="size-[22px]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg>
                  </span>
                  <span class="font-semibold text-(--ink)">{item.label}</span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="relative overflow-hidden rounded-[20px] p-[clamp(1.5rem,3vw,2.25rem)] flex flex-col gap-3.5 bg-(--accent-solid) text-white dark:ring-1 dark:ring-lilac/25">
            <!-- Hidden below sm: on a phone it would sit on the button. -->
            <div aria-hidden="true" class="hidden sm:block absolute right-3.5 bottom-4.5 w-[120px]">
              <enhanced:img src={product} alt="" sizes="120px" class="w-full h-auto -scale-y-100 -rotate-6 drop-shadow-[0_12px_16px_rgba(0,0,0,0.3)]" />
            </div>
            <h2 class="relative text-2xl leading-tight font-light">{page.cta.heading}</h2>
            <p class="relative mr-0 sm:mr-[164px] leading-relaxed">{page.cta.body}</p>
            <a
              href={page.cta.href}
              class="group relative self-start mt-1.5 inline-flex items-center gap-2 h-12 px-5 rounded-[14px] font-semibold bg-white text-navy-900 hover:bg-mist
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {page.cta.linkLabel} <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

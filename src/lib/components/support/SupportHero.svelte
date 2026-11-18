<script lang="ts">
  import { resolve } from '$app/paths';
  import type { ResolvedPathname } from '$app/types';
  import { supportHero } from '$lib/content/support';

  const topics = supportHero.topics.map((topic) => ({
    ...topic,
    href: (resolve('/support') + topic.hash) as ResolvedPathname,
  }));
</script>

<!-- Support Center hero (canvas board 1/2): title, display line, intro and the
     seven topic cards — in-page links to the sections below. -->
<section
  aria-labelledby="s-hero"
  class="relative overflow-hidden bg-linear-to-b from-mist/35 to-mist/15 dark:from-[#041c29] dark:to-navy-950"
>
  <div class="relative max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-12 sm:pb-20 flex flex-col gap-6">
    <span class="eyebrow self-start">{supportHero.eyebrow}</span>
    <h1 class="display-title text-(--brand-ink)!">{supportHero.title}</h1>
    <h2 id="s-hero" class="display-light -mt-2">{supportHero.heading}</h2>
    <p class="max-w-2xl text-[clamp(1.125rem,1.5vw,1.3125rem)] leading-relaxed text-(--ink-soft) text-pretty">
      {supportHero.intro}
    </p>
    <nav aria-label={supportHero.navLabel} class="mt-3">
      <ul class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,17.5rem),1fr))]">
        {#each topics as topic (topic.hash)}
          <li>
            <a
              href={topic.href}
              class="group h-full flex items-start gap-4 p-5 rounded-2xl transition-colors
                     bg-white ring-1 ring-inset ring-mist hover:ring-(--brand-ink)/40
                     dark:bg-white/5 dark:ring-white/10 dark:hover:ring-(--brand-ink)/50
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
            >
              <span aria-hidden="true" class="grid place-items-center size-12 shrink-0 rounded-[14px] bg-mist/55 text-(--brand-ink) dark:bg-white/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6">
                  {#each [topic.icon].flat() as d (d)}<path {d} />{/each}
                </svg>
              </span>
              <span class="flex flex-col gap-1 min-w-0">
                <span class="text-lg font-semibold leading-tight text-(--ink)">
                  {topic.title}
                  <span aria-hidden="true" class="inline-block text-(--brand-ink) transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
                </span>
                <span class="text-[15px] leading-snug text-(--ink-soft)">{topic.body}</span>
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</section>

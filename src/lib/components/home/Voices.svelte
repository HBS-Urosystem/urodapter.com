<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { voices } from '$lib/content/home';
  import TestimonialCard from '$lib/components/shared/TestimonialCard.svelte';
</script>

<!-- Section 6: mixed patient + clinician quotes (each card retinted by its own
     .accent-* wrapper), the regulatory bullets, and the Support Center band the
     nav's #support link finally lands on. -->
<section id="stories" aria-labelledby="stories-heading" class="max-w-7xl mx-auto px-5 sm:px-8 scroll-mt-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">{voices.eyebrow}</p>
  <h2
    id="stories-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {voices.heading}
  </h2>
  <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl text-pretty">
    {voices.intro}
  </p>

  <div use:reveal class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each voices.testimonials as testimonial (testimonial.author)}
      <div class={testimonial.accentClass}>
        <TestimonialCard
          theme={testimonial.theme}
          icon={testimonial.icon}
          quote={testimonial.quote}
          author={testimonial.author}
          meta={testimonial.meta}
          linkLabel={testimonial.linkLabel}
          href={testimonial.href}
        />
      </div>
    {/each}
  </div>

  <div use:reveal class="mt-6 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 items-start">
    <div class="rounded-2xl surface-panel p-6">
      <div class="flex items-center gap-3">
        <span
          class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={voices.regulatory.icon} /></svg>
        </span>
        <h3 class="font-semibold text-navy-950 dark:text-white">{voices.regulatory.heading}</h3>
      </div>
      <ul class="mt-4 space-y-3">
        {#each voices.regulatory.items as item (item)}
          <li class="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-(--accent-ink) shrink-0" aria-hidden="true"></span>
            <span class="text-pretty">{item}</span>
          </li>
        {/each}
      </ul>
    </div>

    <div id={voices.support.id} class="rounded-2xl surface-solid p-6 sm:p-8 text-white scroll-mt-8">
      <div class="flex items-start gap-4">
        <span class="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0" aria-hidden="true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={voices.support.icon} /></svg>
        </span>
        <div>
          <h3 class="font-semibold text-lg">{voices.support.heading}</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/85 text-pretty">{voices.support.body}</p>
          <ul class="mt-5 flex flex-wrap gap-2.5">
            {#each voices.support.links as link (link.href)}
              <li>
                <a
                  href={link.href}
                  class="group inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {link.label}
                  <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

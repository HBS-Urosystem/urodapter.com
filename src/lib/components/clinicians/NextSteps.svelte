<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { nextSteps } from '$lib/content/clinicians';
</script>

<!-- Section 8 — the three docx CTA tiers. The middle tier carries two buttons
     (the docx's "For patients – for clinicians"); the client wants those to
     become share/e-mail forms once they exist. -->
<section aria-labelledby="next-steps-heading" class="max-w-7xl mx-auto px-5 sm:px-8">
  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-ink)">
    {nextSteps.eyebrow}
  </p>
  <h2
    id="next-steps-heading"
    class="mt-3 font-display font-semibold text-navy-950 dark:text-white leading-tight text-balance text-[clamp(1.6rem,3.2vw,2.25rem)]"
  >
    {nextSteps.heading}
  </h2>

  <div use:reveal class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each nextSteps.ctas as cta (cta.title)}
      {#if cta.tier === 'primary'}
        <div class="accent-pill rounded-2xl p-6 flex flex-col text-white">
          <span class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0" aria-hidden="true">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={cta.icon} /></svg>
          </span>
          <h3 class="mt-4 font-semibold">{cta.title}</h3>
          <p class="mt-1.5 text-sm text-white/85 leading-relaxed flex-1">{cta.body}</p>
          <div class="mt-5 flex flex-wrap gap-2">
            {#each cta.links as link (link.label)}
              <a
                href={link.href}
                class="group inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {link.label}
                <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </a>
            {/each}
          </div>
        </div>
      {:else}
        <div class="rounded-2xl surface-card p-6 flex flex-col">
          <span
            class="w-10 h-10 rounded-full bg-(--accent-soft) border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={cta.icon} /></svg>
          </span>
          <h3 class="mt-4 font-semibold text-navy-950 dark:text-white">{cta.title}</h3>
          <p class="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1 text-pretty">{cta.body}</p>
          <div class="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {#each cta.links as link (link.label)}
              <a
                href={link.href}
                class="group inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-ink) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink) rounded-sm py-1"
              >
                {link.label}
                <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</section>

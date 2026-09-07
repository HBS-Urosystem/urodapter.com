<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { closing } from '$lib/content/clinicians';
</script>

<!-- Closing band. The docx's last bridge line and its "Dive deep" Support
     Center box are rendered as ONE full-bleed band: a bridge immediately
     followed by the closing band would stack two tinted bands on top of each
     other. Bridge typography (quote chip + serif line) is preserved. -->
<div class="tint-band mt-12 sm:mt-16">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
    <div use:reveal class="max-w-3xl mx-auto text-center">
      <span
        class="mx-auto w-14 h-14 rounded-full bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center"
        aria-hidden="true"
      >
        <span class="font-display text-4xl leading-none text-(--accent-ink) translate-y-2">&ldquo;</span>
      </span>
      <p class="mt-6 font-display font-semibold text-navy-950 dark:text-white text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug text-balance">
        {closing.lead}
      </p>
      <div class="mt-6 h-0.5 w-12 mx-auto rounded-full bg-(--accent-ink)/50 dark:bg-(--accent-ink)/60" aria-hidden="true"></div>
    </div>

    <div use:reveal class="mt-10 rounded-2xl surface-panel p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-10 gap-y-6 items-center">
      <div>
        <h2 class="font-semibold text-navy-950 dark:text-white">{closing.heading}</h2>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">{closing.body}</p>
        <a
          href={closing.href}
          class="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--accent-ink) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-ink) rounded-sm"
        >
          {closing.linkLabel}
          <span class="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
        </a>
      </div>
      <ul class="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-5">
        {#each closing.items as item (item.label)}
          <li class="flex flex-col items-center gap-2 text-center">
            <span
              class="w-10 h-10 rounded-full bg-white dark:bg-navy-800 border border-(--accent-ink)/20 dark:border-(--accent-ink)/25 text-(--accent-ink) flex items-center justify-center"
              aria-hidden="true"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg>
            </span>
            <span class="text-xs font-medium leading-snug text-slate-700 dark:text-slate-200">{item.label}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

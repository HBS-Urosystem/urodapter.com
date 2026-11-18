<script lang="ts">
  import { siteFooter } from '$lib/content/site';
  import UroSystemLogo from '$lib/components/UroSystemLogo.svelte';

  const { company, regulatory, links, ifu, legal } = siteFooter;

  const linkClass =
    'inline-flex items-center min-h-11 text-mist underline-offset-4 decoration-mist/40 hover:underline hover:text-white ' +
    'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-bright)';
</script>

<!-- Site footer (canvas, every board): navy-950 in both colour schemes, so its
     colours are fixed — mist text, the bright brand teal for focus rings.
     Task list 2026-11-18, rows 6–11: the UroSystem company logo with a
     "Company" label, the Support Center / Webshop / Contact us links, the IFU,
     and the legal documents in their own row. -->
<!-- In dark mode the page canvas ends in navy-950 too, so a hairline marks the edge. -->
<footer class="bg-navy-950 text-mist dark:border-t dark:border-white/10">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-12">
    <div class="flex flex-wrap items-start justify-between gap-x-12 gap-y-8">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-4">
          <a
            href={company.href}
            target="_blank"
            rel="external noopener noreferrer"
            class="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-bright)"
          >
            <UroSystemLogo class="block h-8 w-auto" />
            <span class="sr-only">{company.ariaLabel} (opens in a new tab)</span>
          </a>
          <span
            class="border-l border-mist/30 pl-4 text-xs font-semibold uppercase tracking-[0.16em] text-powder"
            >{company.label}</span
          >
        </div>
        <p class="text-sm text-powder">{company.productOf}</p>
      </div>

      <nav aria-label="Footer">
        <ul class="flex flex-wrap gap-x-7 gap-y-1 text-[15px] font-semibold">
          {#each links as link (link.label)}
            <li><a href={link.href} class={linkClass}>{link.label}</a></li>
          {/each}
          <li>
            <!-- A static file, not a route: `rel="external"` hands it to the browser. -->
            <a href={ifu.href} download rel="external" class={linkClass}>
              {ifu.label}<span class="ml-1.5 font-normal text-powder">({ifu.note})</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div
      class="mt-8 pt-6 border-t border-mist/15 flex flex-wrap items-center justify-between gap-x-10 gap-y-3 text-sm"
    >
      <p class="text-powder">{regulatory}</p>
      <nav aria-label={legal.heading}>
        <ul class="flex flex-wrap gap-x-6">
          {#each legal.links as link (link.label)}
            <li>
              <a href={link.href} target="_blank" rel="external noopener noreferrer" class={linkClass}>
                {link.label}<span class="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </div>
</footer>

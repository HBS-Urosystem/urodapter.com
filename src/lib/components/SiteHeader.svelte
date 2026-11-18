<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import type { Attachment } from 'svelte/attachments';
  import UroDapterLogo from '$lib/components/UroDapterLogo.svelte';
  import { siteNav } from '$lib/content/site';

  // `page` sits transparent on the page gradient (home, where the hero is no
  // longer a photo band), so its text follows the colour scheme; `solid` is the
  // subpage bar, white on its own navy→accent gradient.
  let { variant = 'solid' }: { variant?: 'page' | 'solid' } = $props();

  let mobileMenuOpen = $state(false);

  // Whether the links collapse into the menu button. `null` until measured:
  // the server render and the pre-hydration frame fall back to the md
  // breakpoint (the classes below), so the header always has a working menu.
  let collapsed = $state<boolean | null>(null);

  // Labels and targets: the canvas header (2026-11-18) — "Patients",
  // "Clinicians", "Distributors", "Support Center", and "Contact us", which
  // opens the contact form on the Support Center page.
  const navLinks = siteNav.links;
  const contactLink = siteNav.contact;

  // The current page's link is marked (aria-current + a teal dot on the light
  // header, an underline in the persona pop on the dark one), as on the canvas.
  const isCurrent = (href: string) => page.url.pathname === href;

  const onPage = $derived(variant === 'page');

  // Width : height of the stacked logo's ink box (UroDapterLogo).
  const STACKED_RATIO = 855.43 / 792.3;

  // The links collapse only when they no longer fit beside the narrowest logo —
  // the same "switch when it would touch" rule as the logo swap, measured
  // rather than set at a viewport width (owner direction 2026-09-28). CSS can
  // query the slot the logo is left with, but not whether the link row's own
  // max-content width fits, so this one is measured.
  const fitLinks: Attachment<HTMLElement> = (nav) => {
    const links = nav.querySelector<HTMLElement>('[data-nav-links]');
    const logo = nav.querySelector<HTMLElement>('[data-nav-logo]');
    if (!links || !logo) return;

    function measure() {
      if (!links || !logo) return;
      // The row's max-content width, whatever state it is in: lay it out
      // out-of-flow and unpainted for one synchronous read, then restore.
      const previous = links.style.cssText;
      links.style.cssText += ';display:flex;position:absolute;visibility:hidden';
      const linksWidth = links.getBoundingClientRect().width;
      links.style.cssText = previous;

      const gap = parseFloat(getComputedStyle(nav).columnGap) || 0;
      const stackedLogoWidth = logo.getBoundingClientRect().height * STACKED_RATIO;
      collapsed = linksWidth + gap + stackedLogoWidth > nav.getBoundingClientRect().width;
      if (!collapsed) mobileMenuOpen = false;
    }

    // Decide before the first paint, then on every resize of the nav or the
    // row (viewport, text zoom, label changes) and once the fonts are in.
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
    observer?.observe(nav);
    observer?.observe(links);
    document.fonts?.ready.then(measure);
    return () => observer?.disconnect();
  };

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<!-- `solid`: white text on its own navy→accent gradient band. `page`:
     transparent on the page gradient, so every colour comes as a light/dark pair.
     Both variants share the 20px top padding, so the logo and links sit at the
     same height on every page; only `solid` needs the bottom padding to close
     its band. -->
<header class={onPage ? 'text-navy-950 dark:text-white' : 'text-white nav-gradient'}>
  <div class="max-w-7xl mx-auto px-5 sm:px-8 pt-5 {onPage ? '' : 'pb-5'}">
    <nav {@attach fitLinks} class="relative flex items-center justify-between gap-6">
      <!-- The logo slot takes whatever the row leaves beside the links, and is
           a size container: the horizontal logo shows whenever the slot is at
           least its width (141.6px at the 56px md+ height → 8.875rem), the
           stacked one when it is not — i.e. only where the horizontal logo
           would run into the links. Once the links collapse into the menu
           button the slot is wide again and the horizontal logo returns.
           Height is fluid below md (44px at 375 → 56px at 768) and fixed from
           there.
           Colour (owner direction 2026-09-28), focus ring included: on the
           `page` variant the brand colour (`text-brand` — #09979d light,
           #6fc6ca dark, the brand guideline's teals since 2026-10-05; the
           light ring is 3.54:1 on white, clear of WCAG 2.4.11's 3:1). The
           `solid` bar is dark in both schemes, so it always takes the bright
           teal, --brand-bright (#6fc6ca, 7.36:1 on navy-950). -->
      <div class="@container flex-1 min-w-0">
        <a
          href={resolve('/')}
          aria-label="UroDapter home"
          data-nav-logo
          class="inline-flex align-top rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current
                 {onPage ? 'text-brand' : 'text-(--brand-bright)'}"
        >
          <UroDapterLogo
            variant="horizontal"
            class="hidden @min-[8.875rem]:block w-auto h-[clamp(2.75rem,2.03rem+3.05vw,3.5rem)]"
          />
          <UroDapterLogo
            variant="stacked"
            class="block @min-[8.875rem]:hidden w-auto h-[clamp(2.75rem,2.03rem+3.05vw,3.5rem)]"
          />
        </a>
      </div>

      <!-- The gap is fluid (16px at the narrowest → 32px on wide screens). -->
      <!-- Canvas header (2026-11-18): 16px semibold links. The light (`page`)
           header marks the current page with a brand-teal dot and fills
           "Contact us" in navy; the dark (`solid`) header underlines the
           current page in the persona's pop and outlines "Contact us" in the
           persona's bright colour. -->
      <ul
        data-nav-links
        class="shrink-0 items-center gap-x-[clamp(1rem,2.5vw-0.5rem,1.75rem)] text-base font-semibold whitespace-nowrap
               {collapsed === null ? 'hidden md:flex' : collapsed ? 'hidden' : 'flex'}
               {onPage ? 'text-navy-900/85 dark:text-slate-300' : 'text-slate-200'}"
      >
        {#each navLinks as link (link.label)}
          {@const current = isCurrent(link.href)}
          <li>
            <a
              href={link.href}
              aria-current={current ? 'page' : undefined}
              class="inline-flex items-center gap-2 min-h-11 transition-colors rounded-sm
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)
                     {onPage
                ? `hover:text-navy-950 dark:hover:text-white ${current ? 'text-navy-950 dark:text-white' : ''}`
                : `hover:text-white ${current ? 'text-white shadow-[inset_0_-2px_0_var(--accent-pop)]' : ''}`}"
            >
              {#if current && onPage}<span class="size-2 rounded-full bg-brand" aria-hidden="true"></span>{/if}
              {link.label}
            </a>
          </li>
        {/each}
        <li>
          <a
            href={contactLink.href}
            class="inline-flex h-11 px-5 items-center rounded-full transition-colors
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)
                   {onPage
              ? 'bg-navy-900 text-white hover:bg-navy-950 dark:bg-white dark:text-navy-950 dark:hover:bg-mist'
              : 'text-white shadow-[inset_0_0_0_1.5px_var(--surface-accent,var(--color-cerulean))] hover:bg-white/10'}"
            >{contactLink.label}</a
          >
        </li>
      </ul>

      <button
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobileMenu"
        class="p-2 -mr-2 rounded-md transition-colors
               {collapsed === null ? 'md:hidden' : collapsed ? '' : 'hidden'}
               {onPage ? 'hover:bg-navy-950/5 dark:hover:bg-white/10' : 'hover:bg-white/10'}"
        onclick={toggleMobileMenu}
      >
        {#if mobileMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        {/if}
      </button>
    </nav>

    {#if mobileMenuOpen && collapsed !== false}
      <div
        id="mobileMenu"
        class="mt-3 pb-2 border-b {collapsed === null ? 'md:hidden' : ''}
               {onPage ? 'border-navy-950/10 dark:border-white/10' : 'border-white/10'}"
      >
        <ul class="flex flex-col gap-1 text-base font-semibold {onPage ? 'text-navy-900/85 dark:text-slate-300' : 'text-slate-200'}">
          {#each [...navLinks, contactLink] as link (link.label)}
            {@const current = isCurrent(link.href)}
            <li>
              <a
                href={link.href}
                aria-current={current ? 'page' : undefined}
                class="flex items-center gap-2 py-2.5 {onPage ? 'hover:text-navy-950 dark:hover:text-white' : 'hover:text-white'}
                       {current ? (onPage ? 'text-navy-950 dark:text-white' : 'text-white') : ''}"
              >
                {#if current}<span class="size-2 rounded-full {onPage ? 'bg-brand' : 'bg-(--accent-pop)'}" aria-hidden="true"></span>{/if}
                {link.label}</a
              >
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</header>

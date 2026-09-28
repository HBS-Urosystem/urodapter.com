<script lang="ts">
  import { resolve } from '$app/paths';
  import type { ResolvedPathname } from '$app/types';
  import UroDapterLogo from '$lib/components/UroDapterLogo.svelte';

  // `page` sits transparent on the page gradient (home, where the hero is no
  // longer a photo band), so its text follows the colour scheme; `solid` is the
  // subpage bar, white on its own navy→accent gradient.
  let { variant = 'solid' }: { variant?: 'page' | 'solid' } = $props();

  let mobileMenuOpen = $state(false);

  // Cross-page fragment targets: resolve() the route, keep the fragment
  const fragment = (hash: string) => (resolve('/') + hash) as ResolvedPathname;

  const navLinks = [
    { href: resolve('/patients'), label: 'For Patients' },
    { href: resolve('/clinicians'), label: 'For Clinicians' },
    { href: resolve('/partners'), label: 'For Distributors' },
    { href: fragment('#support'), label: 'Support Center' },
  ];

  // Owner-approved mockup copy (2026-09-27).
  // TODO(placeholder): contact route — pending links resolve to #support until it exists
  const contactLink = { href: fragment('#support'), label: 'Contact us' };

  const onPage = $derived(variant === 'page');

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<!-- `solid`: white text on its own navy→accent gradient band. `page`:
     transparent on the page gradient, so every colour comes as a light/dark pair. -->
<header class={onPage ? 'text-navy-950 dark:text-white' : 'text-white nav-gradient'}>
  <div class="max-w-7xl mx-auto px-5 sm:px-8 {onPage ? 'pt-6' : 'py-5'}">
    <nav class="flex items-center justify-between gap-6">
      <!-- The logo slot takes whatever the row leaves beside the nav, and is a
           size container: the horizontal logo shows whenever the slot is at
           least its width (141.6px at the 56px md+ height → 8.875rem), the
           stacked one when it is not — i.e. only where the horizontal logo
           would run into the menu. With the system font that is 768–770px;
           wider fonts, longer labels or text zoom move the switch with them.
           Height is fluid below md (44px at 375 → 56px at 768) and fixed from
           there, so the threshold holds wherever the nav is visible.
           Colour: the logo's own #75c6c9 in every scheme and variant, focus
           ring included (owner direction 2026-09-28). On the light page that
           ring measures 1.97:1 against white — under WCAG 2.4.11's 3:1 — which
           the owner accepted over the darker --brand-ink ring. -->
      <div class="@container flex-1 min-w-0">
        <a
          href={resolve('/')}
          aria-label="UroDapter home"
          class="inline-flex align-top rounded-sm text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
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

      <!-- The gap is fluid (16px at md → 32px on wide screens) so the four links
           and the Contact pill fit the row at 768px without a breakpoint step. -->
      <ul
        class="hidden md:flex shrink-0 items-center gap-x-[clamp(1rem,2.5vw-0.5rem,2rem)] text-sm whitespace-nowrap
               {onPage ? 'text-slate-600 dark:text-slate-300' : 'text-slate-200'}"
      >
        {#each navLinks as link (link.label)}
          <li>
            <a
              href={link.href}
              class="transition-colors {onPage ? 'hover:text-navy-950 dark:hover:text-white' : 'hover:text-white'}"
              >{link.label}</a
            >
          </li>
        {/each}
        <li>
          <a
            href={contactLink.href}
            class="inline-flex h-11 px-5 items-center rounded-full font-medium border transition-colors
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)
                   {onPage
              ? 'border-navy-950/20 text-navy-950 hover:bg-navy-950/5 dark:border-white/25 dark:text-white dark:hover:bg-white/5'
              : 'border-white/30 text-white hover:bg-white/10'}">{contactLink.label}</a
          >
        </li>
      </ul>

      <button
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobileMenu"
        class="md:hidden p-2 -mr-2 rounded-md transition-colors {onPage
          ? 'hover:bg-navy-950/5 dark:hover:bg-white/10'
          : 'hover:bg-white/10'}"
        onclick={toggleMobileMenu}
      >
        {#if mobileMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        {/if}
      </button>
    </nav>

    {#if mobileMenuOpen}
      <div
        id="mobileMenu"
        class="md:hidden mt-3 pb-2 border-b {onPage ? 'border-navy-950/10 dark:border-white/10' : 'border-white/10'}"
      >
        <ul class="flex flex-col gap-1 text-sm {onPage ? 'text-slate-600 dark:text-slate-300' : 'text-slate-200'}">
          {#each [...navLinks, contactLink] as link (link.label)}
            <li>
              <a
                href={link.href}
                class="block py-2.5 {onPage ? 'hover:text-navy-950 dark:hover:text-white' : 'hover:text-white'}"
                >{link.label}</a
              >
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</header>

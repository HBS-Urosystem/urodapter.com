<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import { explicitGate } from '$lib/content/support';
  import type { ExplicitGate } from './explicit-gate.svelte';

  let { gate }: { gate: ExplicitGate } = $props();

  // A native modal <dialog>: focus is trapped and Escape closes it ("cancel").
  // The attachment re-runs whenever `gate.open` changes.
  const syncOpen: Attachment<HTMLDialogElement> = (dialog) => {
    if (gate.open && !dialog.open) {
      dialog.showModal();
      // Start on the heading, not on either answer: neither choice is pre-selected.
      dialog.querySelector<HTMLElement>('#gate-h')?.focus();
    }
    if (!gate.open && dialog.open) dialog.close();
  };
</script>

<dialog
  {@attach syncOpen}
  aria-labelledby="gate-h"
  oncancel={() => gate.decline()}
  class="m-auto w-[min(34rem,calc(100%-2rem))] rounded-3xl p-[clamp(1.5rem,4vw,2.5rem)] bg-white text-(--ink) shadow-2xl
         backdrop:bg-navy-950/70 dark:bg-navy-900 dark:ring-1 dark:ring-white/10"
>
  <span aria-hidden="true" class="grid place-items-center size-12 rounded-full bg-coral/20 text-navy-950 dark:bg-coral/25 dark:text-white">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6"><path d={explicitGate.icon} /></svg>
  </span>
  <h2 id="gate-h" tabindex="-1" class="outline-none mt-4 text-2xl font-semibold leading-tight">{explicitGate.heading}</h2>
  <p class="mt-3 leading-relaxed text-(--ink-soft)">{explicitGate.body}</p>
  <div class="mt-6 flex flex-col gap-3">
    <button type="button" onclick={() => gate.accept()} class="min-h-12 px-5 py-3 rounded-2xl font-bold text-left bg-navy-900 text-white hover:bg-navy-950 dark:bg-white dark:text-navy-950 dark:hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)">
      {explicitGate.accept}
    </button>
    <button type="button" onclick={() => gate.decline()} class="min-h-12 px-5 py-3 rounded-2xl font-semibold text-left ring-[1.5px] ring-inset ring-navy-900/30 hover:bg-navy-900/5 dark:ring-white/30 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)">
      {explicitGate.decline}
    </button>
  </div>
</dialog>

<script lang="ts">
  import productImage from '$lib/assets/product_features.png';

  let { callouts }: { callouts: { label: string; icon: string }[] } = $props();

  type Corner = {
    label: string;
    place: string;
    side: 'left' | 'right';
    pos: 'top' | 'bottom';
  };

  // 3×3 grid: device in the center cell, one label in each corner cell.
  // Corners stretch to fill their cell (self-stretch) so the label can pin to
  // the inner vertical edge when the cell is taller than the text.
  const corners: Corner[] = $derived([
    { label: callouts[0]?.label, place: 'col-start-1 row-start-1 justify-self-end self-stretch', side: 'left', pos: 'top' },
    { label: callouts[2]?.label, place: 'col-start-3 row-start-1 justify-self-start self-stretch', side: 'right', pos: 'top' },
    { label: callouts[1]?.label, place: 'col-start-1 row-start-3 justify-self-end self-stretch', side: 'left', pos: 'bottom' },
    { label: callouts[3]?.label, place: 'col-start-3 row-start-3 justify-self-start self-stretch', side: 'right', pos: 'bottom' },
  ]);
</script>

<!-- Diagonal leader line: angles from the label toward the device in the
     center cell, converging on it. Dot marks the device end. -->
{#snippet leader(side: 'left' | 'right', pos: 'top' | 'bottom')}
  <svg
    class="block shrink-0 w-8 h-6 sm:w-12 sm:h-9 text-patient/45 dark:text-sky-300/45 {pos === 'top' ? 'self-end' : 'self-start'}"
    viewBox="0 0 48 36"
    fill="none"
    aria-hidden="true"
  >
    {#if side === 'left' && pos === 'top'}
      <line x1="2" y1="4" x2="44" y2="32" stroke="currentColor" stroke-width="1.25" />
      <circle cx="44" cy="32" r="2.5" fill="currentColor" />
    {:else if side === 'left'}
      <line x1="2" y1="32" x2="44" y2="4" stroke="currentColor" stroke-width="1.25" />
      <circle cx="44" cy="4" r="2.5" fill="currentColor" />
    {:else if side === 'right' && pos === 'top'}
      <line x1="46" y1="4" x2="4" y2="32" stroke="currentColor" stroke-width="1.25" />
      <circle cx="4" cy="32" r="2.5" fill="currentColor" />
    {:else}
      <line x1="46" y1="32" x2="4" y2="4" stroke="currentColor" stroke-width="1.25" />
      <circle cx="4" cy="4" r="2.5" fill="currentColor" />
    {/if}
  </svg>
{/snippet}

<div class="grid grid-cols-3 grid-rows-[auto_auto_auto] items-center">
  {#each corners as corner (corner.label)}
    <div class="{corner.place} flex gap-2 sm:gap-3 {corner.side === 'left' ? 'flex-row-reverse text-right' : ''}">
      {@render leader(corner.side, corner.pos)}
      <!-- Padding is on the text only, so the leader still reaches the device
           (the arrow overshoots past the label toward the center). -->
      <span class="text-xs sm:text-sm leading-snug text-slate-700 dark:text-slate-200 {corner.pos === 'top' ? 'self-start pb-6' : 'self-end pt-6'}">{corner.label}</span>
    </div>
  {/each}

  <div class="col-start-2 row-start-2 flex items-center justify-center">
    <img
      src={productImage}
      alt="The UroDapter device: a small conical syringe adapter with a short rounded tip"
      width="400"
      height="288"
      loading="lazy"
      class="w-full max-w-52 h-auto object-contain"
    />
  </div>
</div>

<script lang="ts">
  import productImage from '$lib/assets/product_features.png?enhanced';

  // `description` is optional (clinician page: the client's own "Product
  // Features" figure labels each part with a one-line technical note). It is
  // hidden below `sm`, where a corner cell is only ~80px wide — the clinician
  // section repeats the same lines as a plain list at that width instead.
  let {
    callouts,
  }: { callouts: { label: string; description?: string; icon: string }[] } = $props();

  type Corner = {
    label: string;
    description?: string;
    place: string;
    side: 'left' | 'right';
    pos: 'top' | 'bottom';
  };

  // 5 columns, and every interior column edge is a leader anchor: each leader
  // meets the photo at the part its label names. The widths come from
  // `product_features.png` (1251x262), measured as fractions of its width:
  //
  //   edge 1|2  0.000  rounded tip     <- bottom-left leader
  //   edge 2|3  0.088  flange          <- top-left leader
  //   edge 3|4  0.215  sealing collar  <- bottom-right leader
  //   edge 4|5  0.300  luer ribs       <- top-right leader
  //
  // Each leader's dot sits ~4px inside its cell edge (cx 4/44 of the 48-wide
  // viewBox), which nudges the left dots left and the right dots right — the
  // flange edge is set a touch wide (0.088 vs the flange's own 0.082) to land
  // the dot on the part rather than beside it.
  // The photo keeps 60% of the width (as under the old 2-1-2) and the label
  // columns 40%, so the track list is 400 / 53 / 76 / 51 / 420 per 1000.
  // **No column gap**: a uniform gap sits inside the photo's span too and
  // would push all four anchors off their parts. Re-derive the tracks if the
  // photo is re-cropped.
  // Corners stretch to fill their cell (self-stretch) so the label can pin to
  // the inner vertical edge when the cell is taller than the text.
  const corners: Corner[] = $derived([
    { label: callouts[0]?.label, description: callouts[0]?.description, place: 'col-start-1 col-span-2 row-start-1 justify-self-end self-stretch', side: 'left', pos: 'top' },
    { label: callouts[2]?.label, description: callouts[2]?.description, place: 'col-start-5 row-start-1 justify-self-start self-stretch', side: 'right', pos: 'top' },
    { label: callouts[1]?.label, description: callouts[1]?.description, place: 'col-start-1 row-start-3 justify-self-end self-stretch', side: 'left', pos: 'bottom' },
    { label: callouts[3]?.label, description: callouts[3]?.description, place: 'col-start-4 col-span-2 row-start-3 justify-self-start self-stretch', side: 'right', pos: 'bottom' },
  ]);
</script>

<!-- Diagonal leader line: angles from the label toward the device in the
     center cell, converging on it. Dot marks the device end. -->
{#snippet leader(side: 'left' | 'right', pos: 'top' | 'bottom')}
  <svg
    class="block shrink-0 w-8 h-6 sm:w-12 sm:h-9 text-(--accent-ink)/45 {pos === 'top' ? 'self-end' : 'self-start'}"
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

<div class="grid grid-cols-[minmax(0,400fr)_minmax(0,53fr)_minmax(0,76fr)_minmax(0,51fr)_minmax(0,420fr)] grid-rows-[auto_auto_auto] items-center">
  {#each corners as corner (corner.label)}
    <div class="{corner.place} flex gap-2 sm:gap-3 {corner.side === 'left' ? 'flex-row-reverse text-right' : ''}">
      {@render leader(corner.side, corner.pos)}
      <!-- Padding is on the text only, so the leader still reaches the device
           (the arrow overshoots past the label toward the center). -->
      <span class="text-xs sm:text-sm leading-snug text-slate-700 dark:text-slate-200 {corner.pos === 'top' ? 'self-start pb-6' : 'self-end pt-6'}">
        {#if corner.description}
          <span class="block font-semibold text-navy-950 dark:text-white">{corner.label}</span>
          <span class="hidden sm:block mt-1 text-xs text-slate-600 dark:text-slate-300">{corner.description}</span>
        {:else}
          {corner.label}
        {/if}
      </span>
    </div>
  {/each}

  <!-- The device spans the label-free middle row across columns 2-5, i.e. the
       whole anchor grid: the photo is 1251x262 (≈4.8:1), so in a single column
       it rendered barely 40px tall. `product_features.png` is already cropped
       tight to the device — no transparent padding to clip, so this is a plain
       image. -->
  <!-- No flex wrapper here: <enhanced:img> emits a <picture>, and as a flex
       item that shrink-wraps to the img, whose percentage width then resolves
       against the picture — a circular width that collapses to 0 before the
       image loads. On a plain block cell it resolves against the cell. -->
  <div class="col-start-2 col-span-4 row-start-2 self-center">
    <enhanced:img
      src={productImage}
      alt="The UroDapter device: a small conical syringe adapter with a short rounded tip"
      sizes="(min-width: 1024px) 31rem, 45vw"
      loading="lazy"
      class="block w-full h-auto"
    />
  </div>
</div>

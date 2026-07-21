<script lang="ts">
  // A deliberately "unfilled" placeholder: dashed accent frame + photo icon +
  // the proposed image description, so the client knows what to supply. Swap
  // for an <enhanced:img> once the real asset lands.
  let {
    description,
    ratio = 'aspect-[4/3]',
  }: { description: string; ratio?: string } = $props();
</script>

<figure
  class="{ratio} rounded-2xl border-2 border-dashed border-patient/30 dark:border-sky-300/30 bg-(--color-patient-soft) dark:bg-white/[0.04] flex flex-col items-center justify-center text-center gap-2.5 p-5"
>
  <span
    class="w-11 h-11 rounded-full bg-white/70 dark:bg-navy-800/70 text-patient dark:text-sky-300 flex items-center justify-center"
    aria-hidden="true"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
  </span>
  <figcaption class="max-w-[28ch]">
    <span class="block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-patient/70 dark:text-sky-300/70 mb-1">
      Image placeholder
    </span>
    <span class="text-xs leading-snug text-slate-600 dark:text-slate-300">{description}</span>
  </figcaption>
</figure>

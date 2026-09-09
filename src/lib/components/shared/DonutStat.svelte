<script lang="ts">
  // A single-value completion ring (0831 clinician docx: "a large 74%
  // continuation ring"). The arc is decoration — the figure and its caption are
  // real text, so the value is available to assistive tech and to search.
  // Series colour is the validated `--chart-continuing` token; never the raw
  // persona accent (design system §1).
  let {
    value,
    caption,
  }: { value: number; caption: string } = $props();

  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const arc = $derived((Math.min(Math.max(value, 0), 100) / 100) * CIRCUMFERENCE);
</script>

<figure class="flex flex-col items-center text-center gap-3">
  <div class="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0">
    <svg viewBox="0 0 128 128" class="w-full h-full -rotate-90" aria-hidden="true">
      <circle
        cx="64"
        cy="64"
        r={RADIUS}
        fill="none"
        stroke-width="12"
        class="stroke-slate-200 dark:stroke-white/15"
      />
      <circle
        cx="64"
        cy="64"
        r={RADIUS}
        fill="none"
        stroke-width="12"
        stroke-linecap="round"
        stroke-dasharray="{arc} {CIRCUMFERENCE}"
        class="stroke-(--chart-continuing)"
      />
    </svg>
    <span class="absolute inset-0 flex items-center justify-center">
      <span class="font-display font-semibold text-3xl sm:text-4xl text-navy-950 dark:text-white tabular-nums">
        {value}%
      </span>
    </span>
  </div>
  <figcaption class="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-[22ch] text-pretty">
    {caption}
  </figcaption>
</figure>

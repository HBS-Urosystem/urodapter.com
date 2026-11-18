<script lang="ts">
  import { bridgeHowItWorks } from '$lib/content/home';
</script>

<!-- "Why it matters" band (canvas "Főoldal" board): the two audience problems —
     the patient's under a rounded powder pill, the clinician's under a square
     sun one — then the idea that answers them, in the light display weight.
     A blush blob (warm) and a mist corner (cool) frame the band. -->
<section aria-label="Why it matters" class="relative overflow-hidden bg-mist/35 dark:bg-[#062536]">
  <div aria-hidden="true" class="absolute -left-[90px] -bottom-[110px] w-80 h-[280px] rounded-[58%_42%_55%_45%/52%_60%_40%_48%] bg-blush/70 dark:bg-blush/10"></div>
  <div aria-hidden="true" class="absolute right-0 top-0 w-[360px] h-[220px] bg-mist/85 dark:bg-white/5 [clip-path:polygon(40%_0,100%_0,100%_100%)]"></div>
  <div class="relative max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3rem,5vw,4.5rem)] flex flex-col gap-10">
    <div class="grid gap-x-16 gap-y-8 grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))]">
      {#each bridgeHowItWorks.problems as p (p.id)}
        <div class="{p.accentClass} flex flex-col items-start gap-4">
          <span class="eyebrow {p.id === 'clinicians' ? 'rounded-[2px]!' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-4"><path d={p.icon} /></svg>
            {p.label}
          </span>
          <p class="text-[clamp(1.1875rem,1.6vw,1.375rem)] leading-normal text-(--ink)">{p.text}</p>
        </div>
      {/each}
    </div>
    <div class="flex flex-col items-center gap-6 text-center">
      <span aria-hidden="true" class="w-12 h-0.5 rounded-full bg-(--brand-ink)/60"></span>
      <p class="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-light tracking-[-0.02em] text-(--ink) text-balance">{bridgeHowItWorks.emphasis}</p>
    </div>
  </div>
</section>

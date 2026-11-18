<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { closing } from '$lib/content/clinicians';
</script>

<!-- Section 6 (0831 docx) — "I want more information" + the closing statement,
     as ONE full-bleed band. Canvas restyle 2026-11-18: a pine band (dark in
     both schemes) with a translucent pine → lagoon corner; the heading in the
     light display weight, a square aqua button, the topics as outlined
     square chips, then the docx's closing statement under a hairline. -->
<section aria-labelledby="c-support" class="relative overflow-hidden bg-pine">
  <div aria-hidden="true" class="absolute right-0 top-0 w-[40%] h-full opacity-20 bg-linear-45 from-pine to-lagoon [clip-path:polygon(45%_0,100%_0,100%_100%,0_100%)]"></div>
  <div class="relative max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-10">
    <div class="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
      <div class="flex-[1_1_32.5rem] min-w-0 flex flex-col gap-4">
        <h2 id="c-support" class="display-light text-white!">{closing.heading}</h2>
        <p class="text-lg leading-relaxed text-mist text-pretty">{closing.body}</p>
      </div>
      <a
        href={closing.href}
        class="group inline-flex items-center gap-2.5 h-13 px-6 rounded-[3px] font-bold bg-aqua text-navy-950 hover:bg-white
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
      >
        {closing.linkLabel} <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span>
      </a>
    </div>
    <ul use:reveal class="flex flex-wrap gap-2.5">
      {#each closing.items as item (item.label)}
        <li class="inline-flex items-center gap-2 h-10 px-3.5 rounded-[2px] ring-1 ring-inset ring-mist/30 text-sm font-semibold text-white">
          <svg class="size-[18px] text-aqua" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d={item.icon} /></svg>
          {item.label}
        </li>
      {/each}
    </ul>
    <div use:reveal class="pt-8 border-t border-mist/20 flex flex-col gap-3 max-w-[53.75rem]">
      <h3 class="text-[clamp(1.375rem,2.2vw,1.75rem)] leading-tight font-light text-white">{closing.final.heading}</h3>
      <p class="leading-relaxed text-mist text-pretty">{closing.final.body}</p>
    </div>
  </div>
</section>

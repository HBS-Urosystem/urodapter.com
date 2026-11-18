<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import { hero } from '$lib/content/clinicians';
  import photo from '$lib/assets/clinicians/hero-urologist.jpg?enhanced';
  import product from '$lib/assets/product/urodapter-on-syringe.png?enhanced';
</script>

<!-- Clinician hero (canvas "Klinikus oldal" board, 2026-11-18) — the "cool"
     direction: the header and the hero share one pine band (dark in both
     schemes). Eyebrow as a rule + caps label, the product name in aqua, the
     docx sub-title as the light display line in white, the two intro
     paragraphs in mist; on the right the urologist photo with a cut corner
     and the product shot over its edge. The eyebrow text is mist, not the
     canvas's aqua: aqua on pine is 3.2:1, too low for 13px text. -->
<div class="bg-pine">
  <SiteHeader variant="dark" />
  <section aria-labelledby="c-hero" class="max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(2.5rem,5vw,4.5rem)]">
    <div class="flex flex-wrap items-center gap-[clamp(2.5rem,5vw,5rem)]">
      <div class="flex-[1_1_30rem] min-w-0 flex flex-col items-start gap-6 pb-[clamp(3rem,6vw,5.5rem)]">
        <p class="flex items-center gap-3 text-[13px] font-bold tracking-[0.18em] uppercase text-mist">
          <span aria-hidden="true" class="w-10 h-px bg-aqua"></span>{hero.eyebrow}
        </p>
        <h1 class="display-title text-aqua!">{hero.title}</h1>
        <h2 id="c-hero" class="display-light text-white! -mt-2">{hero.headline}</h2>
        {#each hero.intro as paragraph (paragraph)}
          <p class="max-w-[36rem] text-[clamp(1.0625rem,1.35vw,1.1875rem)] leading-relaxed text-mist text-pretty">{paragraph}</p>
        {/each}
      </div>
      <div class="relative flex-[1_1_23.75rem] min-w-0 max-w-[32.5rem] mx-auto self-end">
        <div class="absolute z-10 -left-[3.8%] top-[2.6%] w-[24%]">
          <enhanced:img
            src={product}
            alt={hero.productAlt}
            sizes="130px"
            class="w-full h-auto -scale-y-100 drop-shadow-[0_16px_22px_rgba(0,0,0,0.4)]"
          />
        </div>
        <enhanced:img
          src={photo}
          alt={hero.photoAlt}
          sizes="(min-width: 1024px) 520px, 100vw"
          fetchpriority="high"
          class="relative block w-full aspect-[4/5] object-cover object-[50%_25%] [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%,0_30%)]"
        />
      </div>
    </div>
  </section>
</div>

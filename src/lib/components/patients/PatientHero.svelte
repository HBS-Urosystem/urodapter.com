<script lang="ts">
  import { hero } from '$lib/content/patients';
  import photo from '$lib/assets/patients/patient-hero.jpg?enhanced';
  import product from '$lib/assets/product/urodapter-on-syringe.png?enhanced';
</script>

<!-- Patient hero (canvas "Páciens oldal" board, 2026-11-18): eyebrow, the
     product name, the docx headline as the light display line and the docx
     intro; on the right the sofa photo with the product shot over it and a
     patient quote card overlapping its lower-left edge. -->
<section aria-labelledby="p-hero" class="max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(1.5rem,4vw,3.5rem)] pb-[clamp(3rem,6vw,5.5rem)] flex flex-wrap items-center gap-[clamp(2.5rem,5vw,4.5rem)]">
  <div class="flex-[1_1_27.5rem] min-w-0 flex flex-col items-start gap-6">
    <span class="eyebrow">{hero.eyebrow}</span>
    <h1 class="display-title text-(--brand-ink)!">{hero.title}</h1>
    <h2 id="p-hero" class="display-light -mt-2">{hero.headline}</h2>
    <p class="max-w-[35rem] text-[clamp(1.0625rem,1.4vw,1.1875rem)] leading-relaxed text-(--ink-soft) text-pretty">{hero.body}</p>
  </div>
  <div class="flex-[1_1_25rem] min-w-0 max-w-[37.5rem] mx-auto">
    <div class="relative">
      <enhanced:img
        src={photo}
        alt={hero.photoAlt}
        sizes="(min-width: 1024px) 600px, 100vw"
        fetchpriority="high"
        class="block w-full aspect-[3/2] object-cover object-[80%_50%] rounded-[28px]"
      />
      <div class="absolute left-[4%] top-[12%] w-[24%]">
        <enhanced:img
          src={product}
          alt={hero.productAlt}
          sizes="150px"
          class="w-full h-auto -scale-y-100 -rotate-6 drop-shadow-[0_14px_18px_rgba(11,59,84,0.35)]"
        />
      </div>
    </div>
    <figure class="relative -mt-18 ml-4 max-w-[25rem] rounded-[26px] px-6 py-5.5 flex flex-col gap-2.5 bg-white shadow-[0_20px_44px_rgba(11,59,84,0.14)] dark:bg-navy-900 dark:ring-1 dark:ring-white/10 dark:shadow-none">
      <div aria-hidden="true" class="h-6 text-[54px] leading-[0.6] font-bold text-steel dark:text-powder">“</div>
      <blockquote class="text-lg leading-snug italic font-light text-(--ink)">{hero.quote.text}</blockquote>
      <figcaption class="text-sm font-semibold text-(--ink-soft)">{hero.quote.author}</figcaption>
    </figure>
  </div>
</section>

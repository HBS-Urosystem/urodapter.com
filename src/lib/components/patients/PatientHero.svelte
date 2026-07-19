<script lang="ts">
  import { hero } from '$lib/content/patients';
  import patientImage from '$lib/assets/patients/patient-hero.jpg?enhanced';
</script>

<section aria-labelledby="patient-hero-heading" class="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16">
  <div class="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 lg:gap-12 items-center">
    <div class="lg:pr-6">
      <h1
        id="patient-hero-heading"
        class="font-display font-semibold text-navy-950 dark:text-white leading-[1.15] text-balance text-[clamp(1.75rem,3.8vw,2.6rem)]"
      >
        {hero.headline}
      </h1>
      <div class="mt-7 h-0.5 w-12 rounded-full bg-patient/60 dark:bg-sky-300/60" aria-hidden="true"></div>
      <p class="mt-7 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-md text-pretty">
        {hero.body}
      </p>
    </div>

    <!-- The message lives in the text; the photo sets the tone -->
    <div class="relative rounded-3xl overflow-hidden min-h-64 sm:min-h-80 lg:min-h-[28rem]">
      <enhanced:img
        src={patientImage}
        alt=""
        aria-hidden="true"
        sizes="(min-width: 1024px) 55vw, 100vw"
        fetchpriority="high"
        class="absolute inset-0 w-full h-full object-cover object-[65%_30%]"
      />
    </div>
  </div>
</section>

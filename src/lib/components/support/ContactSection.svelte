<script lang="ts">
  import { contact, countries } from '$lib/content/support';

  const { fields } = contact;
  // Netlify Forms (see static/__forms.html): without JavaScript the form posts
  // there directly; with it, the post happens in the background and the
  // result is announced here.
  const action = '/__forms.html';

  let status = $state<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    status = 'sending';
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const response = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      status = response.ok ? 'sent' : 'failed';
      if (response.ok) form.reset();
    } catch {
      status = 'failed';
    }
  }

  const inputClass =
    'mt-1.5 block w-full min-h-12 rounded-xl border-0 px-4 py-3 text-base text-(--ink) bg-white ring-1 ring-inset ring-mist ' +
    'placeholder:text-(--ink-mute) focus:ring-2 focus:ring-(--brand-ink) dark:bg-navy-950 dark:ring-white/20';
  const labelClass = 'block font-semibold text-(--ink)';
  const hintClass = 'ml-2 text-sm font-normal text-(--ink-mute)';
</script>

{#snippet req()}<span aria-hidden="true" class="text-(--brand-ink)"> *</span>{/snippet}

<!-- "Help and Contact" (canvas board 2/2): the contact form, with two short
     routes beside it — the Shop and the FAQ. -->
<section id="contact" aria-labelledby="contact-h" class="scroll-mt-6 bg-mist/15 dark:bg-[#062536]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-8">
    <div class="flex flex-col gap-3">
      <h2 id="contact-h" class="display-light">{contact.heading}</h2>
      <p class="max-w-3xl text-lg leading-relaxed text-(--ink-soft) text-pretty">{contact.intro}</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3 items-start">
      <form
        name={contact.formName}
        method="POST"
        {action}
        onsubmit={submit}
        class="lg:col-span-2 rounded-3xl p-[clamp(1.5rem,3vw,2.5rem)] flex flex-col gap-5 bg-white ring-1 ring-inset ring-mist/85 shadow-[0_30px_60px_-40px_rgba(7,44,63,0.5)] dark:bg-navy-900 dark:ring-white/10 dark:shadow-none"
      >
        <input type="hidden" name="form-name" value={contact.formName} />
        <p class="hidden"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off" /></label></p>

        <div class="grid gap-5 sm:grid-cols-2">
          <label class={labelClass}>{fields.name}{@render req()}
            <input type="text" name="name" required autocomplete="name" class={inputClass} />
          </label>
          <label class={labelClass}>{fields.email}{@render req()}
            <input type="email" name="email" required autocomplete="email" class={inputClass} />
          </label>
          <label class={labelClass}>{fields.phone}<span class={hintClass}>{fields.optional}</span>
            <input type="tel" name="phone" autocomplete="tel" class={inputClass} />
          </label>
          <label class={labelClass}>{fields.country}{@render req()}<span class={hintClass}>{fields.countryHint}</span>
            <input type="text" name="country" required list="countries" autocomplete="country-name" class={inputClass} />
          </label>
        </div>
        <datalist id="countries">
          {#each countries as country (country)}<option value={country}></option>{/each}
        </datalist>
        <label class={labelClass}>{fields.website}<span class={hintClass}>{fields.optional}</span>
          <input type="url" name="website" placeholder="https://" class={inputClass} />
        </label>
        <label class={labelClass}>{fields.subject}{@render req()}
          <span class="relative block">
            <select name="subject" required class="{inputClass} appearance-none pr-12">
              <option value="">{fields.subjectPlaceholder}</option>
              {#each contact.subjects as subject (subject)}<option>{subject}</option>{/each}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="pointer-events-none absolute right-4 top-1/2 mt-0.5 -translate-y-1/2 size-5 text-(--ink-mute)"><path d={contact.chevron} /></svg>
          </span>
        </label>
        <label class={labelClass}>{fields.message}{@render req()}
          <textarea name="message" rows="6" required class={inputClass}></textarea>
        </label>
        <label class="flex items-start gap-3 text-(--ink-soft)">
          <input type="checkbox" name="privacy" required class="mt-0.5 size-5 shrink-0 rounded border-mist text-navy-900 focus:ring-(--brand-ink) dark:border-white/30 dark:bg-navy-950" />
          <span>
            {contact.privacy.before}<a href={contact.privacy.href} target="_blank" rel="external noopener noreferrer" class="font-semibold text-(--brand-ink) underline underline-offset-2">{contact.privacy.link}<span class="sr-only"> (opens in a new tab)</span></a>{contact.privacy.after}{@render req()}
          </span>
        </label>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <span class="text-sm text-(--ink-mute)"><span aria-hidden="true" class="text-(--brand-ink)">*</span> {contact.required}</span>
          <button
            type="submit"
            disabled={status === 'sending'}
            class="inline-flex items-center gap-2 min-h-12 px-6 rounded-full font-bold bg-navy-900 text-white hover:bg-navy-950 disabled:opacity-60 dark:bg-white dark:text-navy-950 dark:hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
          >
            {status === 'sending' ? contact.sending : contact.submit} <span aria-hidden="true">→</span>
          </button>
        </div>
        <p role="status" class="empty:hidden font-semibold {status === 'failed' ? 'pl-3 border-l-4 border-coral text-(--ink)' : 'text-(--brand-ink)'}">{status === 'sent' ? contact.sent : status === 'failed' ? contact.failed : ''}</p>
      </form>

      <div class="flex flex-col gap-4">
        {#each contact.side as item (item.link)}
          <a
            href={item.href}
            class="group flex items-start gap-4 rounded-[20px] p-5 bg-white ring-1 ring-inset ring-mist/85 hover:ring-(--brand-ink)/40 dark:bg-navy-900 dark:ring-white/10
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-ink)"
          >
            <span aria-hidden="true" class="grid place-items-center size-11 shrink-0 rounded-[14px] bg-mist/55 text-(--brand-ink) dark:bg-white/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-[22px]"><path d={item.icon} /></svg>
            </span>
            <span class="flex flex-col gap-1">
              <span class="text-(--ink-soft)">{item.text}</span>
              <span class="font-bold text-(--ink)">{item.link} <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">→</span></span>
            </span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

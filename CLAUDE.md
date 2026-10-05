## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Add-ons**: eslint, tailwindcss, sveltekit-adapter, mcp

---

## Design system — read before building UI

**[docs/design-system.md](docs/design-system.md) is the binding reference.** Read it before adding
any section, page, or component — it records decisions that *reversed* earlier approaches, so
guessing from the existing code alone will reintroduce discarded patterns. Page plans, client
decisions and open items: **[docs/patient-journey-page-plan.md](docs/patient-journey-page-plan.md)**,
**[docs/home-page-plan.md](docs/home-page-plan.md)** and
**[docs/clinician-journey-page-plan.md](docs/clinician-journey-page-plan.md)**.

Non-negotiables (rationale + specifics in the design system doc):

- **Sections are not cards.** Section content sits directly on `.bg-page-gradient`; the full-bleed
  `SectionBridge` bands are what separate sections. Exactly one bridge between two sections.
  Container is always `max-w-7xl mx-auto px-5 sm:px-8`.
- **Colours come only from the client's brand palette** — the UroSystem Brand Guideline 1.0 plus
  lilac / plum from the UroDapter brand book — used **60% primary (UroSystem) / 30% complementary
  (UroDapter) / 10% secondary (warm pops)** (design system §1, 2026-10-05). Each persona is a deep + bright pair
  (patient `#0b3b54`/cerulean, clinician `#166b6a`/aqua, distributor `#8376a3`/lilac); eyebrows
  are `class="eyebrow"` pills in the persona's secondary pop. Persona colours may appear on each
  other's pages — scope the other audience's block with its `.accent-*` class.
- **Dark mode ships with every component.** The deep persona colours *vanish* against the dark
  canvas — write accents as `text-(--accent-ink)` etc.; the scope swaps them to the bright
  partner in dark. Driven by `prefers-color-scheme`; there is no toggle.
- **One typeface: Source Sans 3** (the brand guideline, 2026-10-05) for body, UI, labels and
  headlines alike. `font-display` stays on display headlines as the role token — it is the same
  family. A headline is one sentence in one element: never split it into an eyebrow + remainder.
  Eyebrows are separate short labels. Never render "SECTION n" (docx numbering is internal-only).
- **Copy lives in `src/lib/content/*.ts`** as typed objects, never inline in components. The client
  docx is the source of truth for wording, and **claims must never be strengthened** — preserve
  "may", "designed to", "many patients". This is a regulated medical device.
- **Icons: heroicons outline, plus the client's vector brand pictograms** where heroicons can't
  draw the thing (conditions, catheter, bladder) — design system §5. Inline the `d` string, draw
  with `currentColor` (heroicons: stroke 1.5–2; brand pictograms: `fill`). **Never the Canva-export
  SVGs** from the client's icon folder (bitmap masks — use the heroicon). No icon fonts, no third set.
- **Motion has exactly three verbs**: the `use:reveal` action, the `→` link-arrow nudge, and the
  bridge arrow. Use `use:reveal` ([src/lib/actions/reveal.ts](src/lib/actions/reveal.ts)) — *not*
  CSS `animation-timeline: view()`, which caused blank compositor paints in Chromium.
- **Internal links must use `resolve()`** from `$app/paths` — eslint's
  `no-navigation-without-resolve` fails the build otherwise. URL props are typed `ResolvedPathname`.
- **Persona colours are parameterised** (`--color-patient` / `-clinician` / `-distributor`). Shared
  components take the accent from the page; don't hardcode patient blue.
- **`static/**` cannot be imported** (Vite forbids importing from the public dir): reference by
  root URL and URL-encode spaces/`®`. `src/lib/assets/**` is imported + `enhanced:img`.

### Definition of done

Dark variant + 375px mobile + reduced-motion behaviour + `svelte-autofixer` clean +
`npm run check` (0 errors) + `npm run lint` + **verified in the browser** (light/dark,
375/768/1280) — not just typechecked.

> Preview quirk: on the patient page, *scrolled* screenshots often capture a blank grey band
> (compositor paint). Use a tall viewport (`resize_window` 1280×3100) and shoot the full page in
> one go. A washed-out capture right after HMR is just the reveal transition mid-flight — re-shoot.

**Keep the docs current.** When a structural or design decision changes, update
`docs/design-system.md` (and the page plan) in the same change, so neither drifts from the code.

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Add-ons**: eslint, tailwindcss, sveltekit-adapter, mcp

---

## Read these before building UI

To avoid drift, the rules live in one place each — this file only points at them:

| Doc | What it holds |
|---|---|
| **[CLAUDE.md](CLAUDE.md)** | The non-negotiable rules + definition of done. Start here. |
| **[docs/design-system.md](docs/design-system.md)** | Binding design reference: tokens, page rhythm, typography, surfaces, icons, motion, component inventory, copy rules, a11y. |
| **[docs/patient-journey-page-plan.md](docs/patient-journey-page-plan.md)** | Patient page plan, client decisions, Sections 4–6 guidance, open items. |
| **[docs/home-page-plan.md](docs/home-page-plan.md)** | Home page plan: the six sections below the hero, CMS copy provenance, claims flagged to the client, missing assets. |
| **[docs/clinician-journey-page-plan.md](docs/clinician-journey-page-plan.md)** | Clinician page plan: section-by-section structure, what each client docx comment turned into, copy provenance, open items. |
| **[src/routes/layout.css](src/routes/layout.css)** | Source of truth for design tokens. |

Several decisions **reversed** an earlier approach (section cards removed, serif adopted and
then retired for the brand guideline's Source Sans 3, CSS scroll-timeline replaced by a JS action). Reading the code alone will reintroduce discarded
patterns — read the design system doc first.

**Layout note:** shared components live in `src/lib/components/shared/` and take their accent from
an enclosing `.accent-patient` / `.accent-clinician` / `.accent-distributor` scope. Never hardcode
patient blue in them, and never declare `--surface-accent` / `--band-accent` / `--nav-accent` on a
styled element — that breaks retinting (design system §1).

**Palette (2026-10-05):** every colour comes from the UroSystem Brand Guideline 1.0 (plus lilac /
plum from the UroDapter brand book) — 60% primary UroSystem (`#072c3f` `#0b3b54` `#52b2d6`
`#c7e1f0`), 30% complementary UroDapter (pine, lagoon, `#09979d`, aqua, powder, steel; lilac /
plum), 10% secondary (sun, coral, blush as pops: the `eyebrow` pills).

**Type (2026-10-05):** Source Sans 3 only (`@fontsource-variable/source-sans-3`, Tailwind's
`--font-sans`); `--font-display` is the same family, kept as the display-headline role token.

**Icons (2026-10-05):** heroicons outline, plus the client's *vector* brand pictograms where
heroicons can't draw it; never the Canva-export SVGs (bitmap masks). Design system §5. Personas are deep + bright pairs; persona
colours may appear on each other's pages via a scoped `.accent-*` class. Design system §1.

**Brand highlight:** `--brand-ink` / `--brand-fill` / `--brand-soft` / `.brand-pill` are the logo
teal (`--color-brand`: `#09979d` light, `#6fc6ca` dark). They are *page-independent* — declared once on `:root`, never
inside an `.accent-*` scope — and carry the interaction affordances and highlight marks
(accordion rail and chips, bridge icons, story links, headline rules). Persona CTAs keep their
audience colour. Full rationale, measurements and the clinician-page caveat: design system §1.

When a structural or design decision changes, update `docs/design-system.md` (and the page plan)
in the same change so the docs don't drift from the code.

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

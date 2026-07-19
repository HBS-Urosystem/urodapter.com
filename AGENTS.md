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
| **[src/routes/layout.css](src/routes/layout.css)** | Source of truth for design tokens. |

Several decisions **reversed** an earlier approach (section cards removed, serif adopted, CSS
scroll-timeline replaced by a JS action). Reading the code alone will reintroduce discarded
patterns — read the design system doc first.

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

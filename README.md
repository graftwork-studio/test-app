# Graftwork test app

The canary for the Graftwork design system, created from [`app-template`](https://github.com/graftwork-studio/app-template). Renovate brings each design-system release here with no delay, and the release merges itself once every check passes. Real apps use the same setup with a 3-day delay.

## What's set up

- **Next.js** (App Router) with strict TypeScript.
- **Components:** `@graftwork/ui`, with its stylesheet and Noto Sans, imported in `app/globals.css`.
- **Theme toggle:** in the header. Light, dark and high contrast follow the operating system until the user chooses.
- **Sample page:** `app/page.tsx`, which uses every component.
- **Checks on every pull request:** lint (including `jsx-a11y` and the design-system rules), build, type-check, Playwright journeys with axe, and visual snapshots at 320, 768 and 1280px in every theme.
- **Renovate:** extends the shared preset from the design system. Design-system releases arrive as one pull request, and minor and patch updates merge themselves when checks pass.
- **`CLAUDE.md`:** the rules for building with the design system.

## After creating a repository from this template

1. **Protect `main`:** require pull requests and these checks: `Build and type-check` and `End-to-end, axe and visual snapshots`.
2. **Turn on auto-merge:** Settings → General → **Allow auto-merge**, so Renovate can merge its own pull requests.
3. **Create the label:** add an `update-snapshots` label.

## Working on it

```bash
pnpm install
```

```bash
pnpm dev
```

```bash
pnpm build && pnpm test:e2e
```

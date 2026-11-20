# Working in this app

This app is built on the Graftwork design system. These rules apply to every change.

## Build only with the design system

- **Use `@graftwork/ui` components** for every control, card, table, chart and theme setting. Don't run `shadcn add` and don't write your own versions of components that exist there. If something is missing, say so: it gets added to `@graftwork/ui` in `graftwork-studio/design-system`, not here.
- **Use semantic tokens only.** Colours come from the token classes (`text-text-default`, `text-text-secondary`, `bg-surface-raised`, `border-border-default` and so on). Tailwind's default palette has been removed, so classes like `bg-blue-500` don't exist.
- **No raw colours and no one-off styles.** No hex, rgb or hsl values, no arbitrary colour classes such as `bg-[#2883de]`, no `style` attributes and no new CSS files. Lint fails on all of these.
- Layout utilities (flex, grid, gap, padding, widths, responsive prefixes) are fine. Spacing uses Tailwind's numeric scale, which is driven by the `space.2xs` token.

## Figma

Map Figma components to code by matching names. A Figma component called `Button` with `variant=secondary` and `size=sm` is `<Button variant="secondary" size="sm">`. Property names and values match exactly:

| Figma component | Code |
| --- | --- |
| Button | `variant`: primary, secondary, ghost, destructive · `size`: sm, md, lg |
| Input | `label`, `description`, `placeholder`, `errorMessage`, `isInvalid`, `isDisabled`, `isRequired` |
| Select | same as Input; options are `SelectItem` |
| Card | CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| Table | `density`: comfortable, compact |
| BarChart | `view`: chart, table |
| ThemeToggle | `value`: system, light, dark, high-contrast |

Use Figma variables by their token names. A fill bound to `text/secondary` is `text-text-secondary`.

## Accessibility

The components already meet the standard. Keep it that way:

- Every input has a visible label. Errors are text, linked to the field (pass `errorMessage` and `isInvalid`).
- Headings go in order and every page has one `h1`.
- Links are underlined (the default). Don't remove the underline.
- Charts need a written `summary`.
- Pages must work from 320px wide without sideways scrolling.

## Checks

Every pull request runs lint, build, type-check, Playwright journeys with axe, and visual snapshots at 320, 768 and 1280px in light, dark and high contrast. When a change alters how a screen looks, add the `update-snapshots` label to the pull request, download the `visual-snapshots` artifact, check the images and commit them to `tests/__screenshots__`.

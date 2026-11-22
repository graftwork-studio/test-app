# Working in this app

This app is built on the Graftwork design system. These rules apply to every change.

## Build only with the design system

- **Use `@graftwork/ui` components** for every control, card, table, chart and theme setting. Don't run `shadcn add` and don't write your own versions of components that exist there. If something is missing, say so: it gets added to `@graftwork/ui` in `graftwork-studio/design-system`, not here.
- **Use semantic tokens only.** Colours come from the token classes (`text-text-default`, `text-text-secondary`, `bg-surface-raised`, `border-border-default` and so on). Tailwind's default palette has been removed, so classes like `bg-blue-500` don't exist.
- **No raw colours and no one-off styles.** No hex, rgb or hsl values, no arbitrary colour classes such as `bg-[#2883de]`, no `style` attributes and no new CSS files. Lint fails on all of these.
- Layout utilities (flex, grid, gap, padding, widths, responsive prefixes) are fine. Spacing uses Tailwind's numeric scale, which is driven by the `space.2xs` token.

## Figma

Map Figma components to code by matching names. A Figma component called `Button` with `variant=secondary` and `size=sm` is `<Button variant="secondary" size="sm">`. Property names and values match, with the differences listed below the table:

| Figma component | Code |
| --- | --- |
| Button | `variant`: primary, secondary, ghost, destructive · `size`: sm, md, lg |
| Input | `label`, `description`, `placeholder`, `errorMessage`, `isInvalid`, `isDisabled`, `isRequired` |
| Select | same as Input; options are `SelectItem` |
| Card | CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| Table | `density`: comfortable, compact |
| BarChart | `view`: chart, table |
| ThemeToggle | `value`: system, light, dark, high-contrast |
| Accordion | `allowsMultipleExpanded` · AccordionItem `isExpanded`, `isDisabled`, `title`, `content` |
| Alert | `variant`: info, success, warning, error · `title`, `children`, `action` |
| AlertDialog | `size`: sm, md, lg · `AlertDialogTitle`, `AlertDialogDescription` |
| Avatar | `size`: sm, md, lg · `initials` · AvatarGroup `more` |
| Badge | `variant`: neutral, info, success, warning, error, outline · `children` |
| Breadcrumb | BreadcrumbItem `isCurrent`, `children` |
| Checkbox | `isSelected`, `isIndeterminate`, `isInvalid`, `isDisabled`, `label` · CheckboxGroup `label`, `description`, `errorMessage`, `isRequired`, `isInvalid`, `isDisabled` |
| Collapsible | `isExpanded`, `isDisabled`, `trigger`, `content` |
| Combobox | same as Input · ComboboxItem `label`, `isSelected`, `isDisabled` |
| Dialog | `size`: sm, md, lg · `showCloseButton`, `DialogTitle`, `DialogDescription` |
| DropdownMenu | `selectionMode`: none, single · DropdownMenuItem `variant`: default, destructive, `isSelected`, `isDisabled`, `label`, `shortcut`, `showShortcut`, `hasSubmenu` |
| Empty | `title`, `description`, `icon`, `action` |
| InputGroup | same as Input, plus `startAddon`, `startAddonText`, `endAddon`, `endAddonText` |
| Kbd | `children` |
| Label | `children` |
| Pagination | a fixed example; `page` and `pageCount` are set in code |
| Popover | `placement`: bottom, top · `PopoverTitle`, `PopoverText` |
| Progress | `isIndeterminate`, `label`, `value`, `showValue` |
| RadioGroup | `orientation`: vertical, horizontal · `label`, `description`, `errorMessage`, `isRequired`, `isInvalid`, `isDisabled` · Radio `isSelected`, `isDisabled`, `label` |
| Separator | `orientation`: horizontal, vertical |
| Sheet | `side`: right, left, top, bottom · `showCloseButton`, `SheetTitle`, `SheetDescription` |
| Skeleton | resize it to the shape you need |
| Slider | `isDisabled`, `label`, `description`, `value`, `showValue` |
| Spinner | `size`: sm, md, lg |
| Switch | `isSelected`, `isDisabled`, `label` |
| Tabs | `orientation`: horizontal, vertical · `TabPanel` · Tab `orientation`, `isSelected`, `isDisabled`, `label` |
| Textarea | same as Input |
| Toast | `variant`: info, success, warning, error · `title`, `description`, `showDescription` |
| Toggle | `variant`: ghost, secondary · `size`: sm, md, lg · `isSelected`, `isDisabled`, `children` |
| Tooltip | `children` |

Where Figma and code differ:

- **Labels:** `label` on Checkbox, Radio and Switch is `children` in code. On Toggle, Badge, Kbd, Label and Tooltip, `children` is the text.
- **Layers, not props:** `DialogTitle`, `SheetTitle`, `PopoverTitle`, `TabPanel` and similar are the matching code components. Accordion's `title` and `content` are AccordionTrigger and AccordionContent. Collapsible's `trigger` and `content` are CollapsibleTrigger and CollapsibleContent.
- **Slots:** Figma can't take a component as a property. `startAddon`, `endAddon`, `action`, `icon` and `showShortcut` show or hide a slot, and `startAddonText` and `endAddonText` hold its text. In code, pass the content itself (`shortcut`, `startAddon`, `action`).
- **Avatar:** `initials` come from `name` in code. Add a photo in Figma as an image fill; in code it's `src`.
- **Breadcrumb:** `isCurrent` means the item has no `href` in code.
- **Toast:** pass `title`, `description` and `variant` to `toast()`, with one `<Toaster />` in the app.
- **Code only:** Slider's two-thumb range and Tooltip's `placement`.

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

Design-system updates are the exception. On Renovate's design-system pull request, a workflow refreshes the snapshots and commits them, because those visual changes are reviewed in the design-system repo. Every other check still has to pass.

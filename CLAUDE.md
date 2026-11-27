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
| BarChart | `view`: chart, table · `orientation`: vertical, horizontal · `stacking`: none, stacked · `labels`: values, none, inside · `colourBy`: series, category · `negatives`: same, distinct · `highlight` · `icons` |
| LineChart | `view`: chart, table · `curve`: smooth, linear, step · `points`: none, dots, values, names, icons · `colourBy`: series, category · `icons` |
| AreaChart | `view`: chart, table · `curve`: smooth, linear, step · `stacking`: stacked, percent · `fill`: flat, gradient · `icons` |
| PieChart | `view`: chart, table · `variant`: pie, donut · `labels`: none, values, names · `rings`: 1, 2 · `totalLabel`, `showTotal`, `highlight` |
| RadialChart | `view`: chart, table · `shape`: full, half · `labels`: none, names · `rings`: several, single, stacked · `totalLabel`, `showTotal` |
| RadarChart | `view`: chart, table · `variant`: filled, lines · `points`: none, dots · `grid`: polygon, circle, none · `axisLabels`: names, values · `scale`: none, values · `icons` |
| ThemeToggle | `value`: system, light, dark, high-contrast |
| Accordion | `allowsMultipleExpanded` · AccordionItem `isExpanded`, `isDisabled`, `title`, `content` |
| Alert | `variant`: info, success, warning, error · `title`, `children`, `action` |
| AlertDialog | `size`: sm, md, lg · `AlertDialogTitle`, `AlertDialogDescription` |
| AppShell | `variant`: sidebar, floating, inset · `state`: expanded, collapsed · `showSidebarEnd` · AppShellHeader `showActions` |
| AuthLayout | `layout`: centered, split · `background`: default, muted · `size`: sm, lg · `showBrand`, `showFooter`, `showAside` |
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
| QrCode | `value` · `size`: sm, md, lg |
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
| Field | `orientation`: vertical, horizontal, responsive · `isInvalid` · `label`, `description`, `showDescription` · FieldSet `legend` |
| ToggleGroup | `variant`: ghost, secondary · `size`: sm, md, lg · `spacing`: 0, 1, 2 · `item1`, `item2`, `item3` |
| ButtonGroup | `orientation`: horizontal, vertical · `style`: buttons, text-and-separator |
| NativeSelect | `size`: sm, md · `isInvalid`, `isDisabled` · `label`, `description`, `showDescription` |
| ScrollArea | no Figma properties; `aria-label` and `children` are set in code |
| Item | `variant`: default, outline, muted · `size`: md, sm, xs · `title`, `description`, `showMedia`, `showDescription`, `showActions` |
| Sidebar | `side`: left, right · `variant`: sidebar, floating, inset · `state`: expanded, collapsed · SidebarMenuButton `size`: sm, md, lg, `variant`: default, outline, `isActive`, `label`, `showLabel`, `icon` |
| Command | `state`: results, empty · `placeholder` · CommandItem `isFocused`, `isDisabled`, `label`, `shortcut`, `showShortcut`, `icon` |
| Message | `align`: start, end · `sender`, `time`, `showAvatar`, `showHeader`, `showFooter` |
| MessageScroller | `direction`: end, start · `showButton` |
| Bubble | `variant`: default, secondary, muted, tinted, outline, ghost, destructive · `align`: start, end · `text`, `showReactions` |
| Attachment | `state`: idle, uploading, processing, error, done · `size`: md, sm, xs · `orientation`: horizontal, vertical · `title`, `showDescription` |
| Marker | `variant`: default, separator, border · `text` |
| Questionnaire | `type`: single, multiple, text · `hasError` · `title`, `progress`, `description`, `showDescription`, `showPrevious` · QuestionnaireChoice `type`: radio, checkbox, `isSelected`, `isInvalid`, `label`, `description`, `showDescription` |
| Trace | TraceLine `status`: default, running, error, pending, `title`, `description`, `showDescription` · TraceCollapsible `isExpanded`, `title` |
| Calendar | `numberOfMonths`: 1, 2 · RangeCalendar `numberOfMonths`: 1, 2 · CalendarDay `state`: default, today, selected, rangeStart, rangeMiddle, rangeEnd, outside, unavailable, disabled, `day` |
| DatePicker | `state`: default, open, invalid, disabled · `label`, `description`, `showDescription`, `value` · DateRangePicker has the same properties |
| DataTable | `density`: comfortable, compact · `selectionMode`: none, multiple · `showFilter`, `showColumnToggle`, `showPagination`, `showDragHandle` |
| ContextMenu | `isOpen`, `triggerText` · items use DropdownMenuItem: `variant`: default, destructive, `shortcut`, `isDisabled` |
| CodeBlock | `variant`: default, destructive · `size`: md, sm · `title`, `footer`, `showHeader`, `showFooter` · CodeBlockLine `variant`: default, added, removed, highlighted, `size`, `code`, `lineNumber`, `showLineNumber` |
| AspectRatio | `ratio`: 1:1, 4:3, 16:9, 21:9 |
| Carousel | `orientation`: horizontal, vertical · `position`: first, middle, last |
| DirectionProvider | `direction`: ltr, rtl |
| Drawer | `side`: bottom, top, left, right · `title`, `description`, `showDescription`, `showCloseButton` |
| HoverCard | `isOpen`, `trigger` |
| InputOTP | `state`: default, focused, complete, invalid, disabled · `label`, `description`, `showDescription` · InputOTPSlot `state`: empty, active, filled, invalid, `char` |
| Menubar | `isOpen` · items use DropdownMenuItem: `variant`: default, destructive, `shortcut`, `isDisabled` |
| NavigationMenu | `isOpen`, `trigger` |
| Resizable | `orientation`: horizontal, vertical · `withHandle` |
| Typography | `variant`: default, chat, docs |

Where Figma and code differ:

- **Labels:** `label` on Checkbox, Radio and Switch is `children` in code. On Toggle, Badge, Kbd, Label and Tooltip, `children` is the text.
- **Layers, not props:** `DialogTitle`, `SheetTitle`, `PopoverTitle`, `TabPanel` and similar are the matching code components. Accordion's `title` and `content` are AccordionTrigger and AccordionContent. Collapsible's `trigger` and `content` are CollapsibleTrigger and CollapsibleContent.
- **Slots:** Figma can't take a component as a property. `startAddon`, `endAddon`, `action`, `icon` and `showShortcut` show or hide a slot, and `startAddonText` and `endAddonText` hold its text. In code, pass the content itself (`shortcut`, `startAddon`, `action`). AppShell's `showSidebarEnd` is its `sidebarEnd` slot and AppShellHeader's `showActions` is `actions`; AuthLayout's `showBrand`, `showFooter` and `showAside` are `brand`, `footer` and `aside`. AppShell's `variant` and `state` are set on the Sidebar you pass in.
- **Avatar:** `initials` come from `name` in code. Add a photo in Figma as an image fill; in code it's `src`.
- **Breadcrumb:** `isCurrent` means the item has no `href` in code.
- **Toast:** pass `title`, `description` and `variant` to `toast()`, with one `<Toaster />` in the app.
- **Code only:** Slider's two-thumb range and Tooltip's `placement`.
- **QrCode:** Figma shows a sample code; in code the modules are drawn from `value`. Its accessible name, `label`, is set in code.
- **Set in code:** ToggleGroup's vertical `orientation` and `selectionMode`, Sidebar's `collapsible` behaviour (Figma shows `state`: expanded, collapsed) and CommandDialog, which is Command inside a modal.
- **Figma helpers:** SidebarMenuButton, CommandItem, QuestionnaireChoice, TraceLine, TraceCollapsible, CalendarDay and CodeBlockLine are their own Figma components so rows can be reused.
- **Figma states:** DatePicker and DateRangePicker use `state`: default, open, invalid, disabled. Command uses `state`, Questionnaire uses `hasError`, and ContextMenu uses `isOpen`. In code these come from props, validation and user interaction.
- **Example content:** `show…` properties hide a part of the design; in code, leave that part out. ButtonGroup's `style` picks an example layout, and text such as `item1`, `sender`, `time` and `value` is the content you pass in code.
- **Newest components:** Figma's Direction is `DirectionProvider` in code. Carousel's `position`, InputOTP's `state` and `isOpen` on HoverCard, Menubar and NavigationMenu show states that come from interaction in code. Set `href`, `placement`, `maxLength`, `errorMessage`, `defaultSize`, `minSize`, `locale` and CarouselItem's `aria-label` in code.
- **Charts:** `highlight` is a category value in code; in Figma it's a boolean that highlights an example bar or slice. `showTotal` shows `totalLabel` in the middle; in code, pass `totalLabel`. `rings` exists only in Figma: in code it comes from the number of series and rows. RadialChart's `max` is set in code. `icons` in code is an `icon` on each series; in Figma it's a boolean that shows the legend icons, which you swap on the instance. Tooltip options (`tooltipIndicator`, `tooltipLabel`, `tooltipTotal`) and `formatCategory` are code only.
- **Code only:** DataTable's filtering, sorting and paging, and CodeBlock's syntax highlighting, wrapping and `startLine`.
- **DataTable reordering:** `showDragHandle` in Figma means passing `onReorder` in code. It's called with every row id in the new order. Columns can't be sorted while it's set.

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

The snapshot workflow only runs when the label is added. If you push a change that affects the images, remove the label and add it again.

Design-system updates are the exception. On Renovate's design-system pull request, a workflow refreshes the snapshots and commits them, because those visual changes are reviewed in the design-system repo. Every other check still has to pass.

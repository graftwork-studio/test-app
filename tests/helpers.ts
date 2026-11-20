import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

export const THEMES = [
  { name: "light", colorScheme: "light", contrast: "no-preference" },
  { name: "dark", colorScheme: "dark", contrast: "no-preference" },
  { name: "high-contrast", colorScheme: "light", contrast: "more" },
] as const;

export type Theme = (typeof THEMES)[number];

export const WIDTHS = [320, 768, 1280] as const;

/** Opens a page in a theme, the way a user's operating system would ask for it. */
export async function openInTheme(page: Page, path: string, theme: Theme) {
  await page.emulateMedia({ colorScheme: theme.colorScheme, contrast: theme.contrast, reducedMotion: "reduce" });
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
}

/** axe with WCAG 2.2 A/AA plus AAA contrast. */
export async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "wcag2aaa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}

/** WCAG 1.4.10: the page never scrolls sideways. Polled, because charts resize a moment after the viewport. */
export async function expectNoSidewaysScroll(page: Page) {
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), {
      message: "page scrolls sideways",
    })
    .toBeLessThanOrEqual(0);
}

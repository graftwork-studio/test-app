import { expect, test } from "@playwright/test";
import { expectNoSidewaysScroll, openInTheme, THEMES, WIDTHS } from "./helpers";

// Key screens at 320, 768 and 1280px in every theme. Add your app's key screens here.
const SCREENS = [
  { name: "home", path: "/" },
  { name: "chat", path: "/chat" },
] as const;

for (const screen of SCREENS) {
  for (const theme of THEMES) {
    test(`${screen.name} in ${theme.name}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await openInTheme(page, screen.path, theme);
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        await expectNoSidewaysScroll(page);
        await expect(page).toHaveScreenshot(`${screen.name}--${theme.name}--${width}.png`, { fullPage: true });
      }
    });
  }
}

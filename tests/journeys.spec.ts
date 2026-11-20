import { expect, test } from "@playwright/test";
import { expectNoAxeViolations, openInTheme, THEMES } from "./helpers";

// Key journeys on the sample page. Replace these with your app's own journeys.

// An unstyled page passes axe (black on white is high contrast), so check the
// design-system stylesheet and Noto Sans really loaded.
test("the design-system stylesheet and Noto Sans are loaded", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const styles = await page.evaluate(() => {
    const html = getComputedStyle(document.documentElement);
    return {
      surfaceToken: html.getPropertyValue("--gw-color-surface-default").trim(),
      background: getComputedStyle(document.body).backgroundColor,
      fontFamily: getComputedStyle(document.body).fontFamily,
      notoLoaded: document.fonts.check('1rem "Noto Sans Variable"'),
      buttonRadius: getComputedStyle(document.querySelector('[data-slot="button"]') as Element).borderRadius,
    };
  });
  expect(styles.surfaceToken).not.toBe("");
  expect(styles.background).toBe("rgb(255, 255, 255)");
  expect(styles.fontFamily).toContain("Noto Sans Variable");
  expect(styles.notoLoaded).toBe(true);
  expect(styles.buttonRadius).toBe("6px");
});

for (const theme of THEMES) {
  test(`home page has no axe violations in ${theme.name}`, async ({ page }) => {
    await openInTheme(page, "/", theme);
    await expectNoAxeViolations(page);
  });
}

test("creating a project: errors are shown as text and linked to their fields", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Create project" }).click();

  const name = page.getByRole("textbox", { name: /Project name/ });
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toHaveAccessibleDescription(/Enter a project name\./);
  await expect(page.getByText("Choose a region.")).toBeVisible();
  await expectNoAxeViolations(page);

  // Fill the form with the keyboard only.
  await name.focus();
  await page.keyboard.type("Atlas");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /Region/ })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await page.getByRole("option", { name: "Europe" }).press("Enter");
  await page.getByRole("button", { name: "Create project" }).focus();
  await page.keyboard.press("Enter");

  await expect(page.getByRole("status")).toHaveText("Created “Atlas”.");
});

test("theme toggle overrides the system theme and is remembered", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  // Users click the option's label; React Aria keeps the real radio input visually hidden.
  await page.locator("label", { hasText: "Dark" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("radio", { name: "Dark" })).toBeChecked();

  await page.locator("label", { hasText: "System" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme");
});

test("chart data is reachable from the keyboard through the table view", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "View as table" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  const table = page.getByRole("grid", { name: "Sign-ups and upgrades" });
  await expect(table.getByRole("rowheader", { name: "Oct" })).toBeVisible();
  await expect(table.getByText("620")).toBeVisible();
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

for (const theme of THEMES) {
  test(`chat page has no axe violations in ${theme.name}`, async ({ page }) => {
    await openInTheme(page, "/chat", theme);
    await expectNoAxeViolations(page);
  });
}

test("chat: a suggestion fills the message and enables Send", async ({ page }) => {
  await page.goto("/chat");
  const send = page.getByRole("button", { name: "Send message" });
  await expect(send).toBeDisabled();
  await page.getByRole("button", { name: "Review our pricing page" }).click();
  const message = page.getByRole("textbox", { name: "Message" });
  await expect(message).toHaveValue("Review our pricing page");
  await expect(message).toBeFocused();
  await expect(send).toBeEnabled();
  await send.click();
  await expect(message).toHaveValue("");
});

test("chat: the sidebar can be hidden and shown again", async ({ page }) => {
  await page.goto("/chat");
  const sidebar = page.getByRole("complementary", { name: "Chats" });
  await expect(sidebar).toBeVisible();
  await page.getByRole("button", { name: "Hide sidebar" }).click();
  await expect(sidebar).toBeHidden();
  await page.getByRole("button", { name: "Show sidebar" }).click();
  await expect(sidebar).toBeVisible();
});

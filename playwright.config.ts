import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

/*
 * End-to-end tests of key journeys (with axe), and visual snapshots of key
 * screens at 320, 768 and 1280px in light, dark and high contrast.
 *
 * Runs against the production build: `pnpm build` first.
 * Snapshots are rendered on Linux in the Playwright container, so baselines come
 * from CI. Add the "update-snapshots" label to a pull request to regenerate them.
 */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  updateSnapshots: process.env.CI ? "none" : "missing",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: "disabled", caret: "hide" } },
  use: { baseURL: `http://127.0.0.1:${PORT}`, ...devices["Desktop Chrome"] },
  webServer: {
    command: `pnpm start -p ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});

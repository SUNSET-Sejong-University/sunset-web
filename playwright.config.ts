import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // 2 local workers: 4 starved the production server on the dev machine and
  // produced spurious 30s timeouts across the suite.
  workers: process.env.CI ? 1 : 2,
  timeout: 60_000,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    // The site honors prefers-color-scheme; pin the brand-default dark theme
    // so tests are deterministic. Light-mode tests emulate "light" explicitly.
    colorScheme: "dark",
  },
  webServer: {
    command: "node node_modules/next/dist/bin/next start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

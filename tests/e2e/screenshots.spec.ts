import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

const outputDir = join(process.cwd(), "artifacts", "screenshots");
const archiveDir = join(process.cwd(), "artifacts", "screenshots-archive");

const viewports = {
  "home-1440": { width: 1440, height: 900, path: "/en" },
  "home-768": { width: 768, height: 1024, path: "/en" },
  "home-390": { width: 390, height: 844, path: "/en" },
  "home-320": { width: 320, height: 568, path: "/en" },
  "about-1440": { width: 1440, height: 900, path: "/en/about" },
  "about-390": { width: 390, height: 844, path: "/en/about" },
  "projects-1440": { width: 1440, height: 900, path: "/en/projects" },
  "projects-390": { width: 390, height: 844, path: "/en/projects" },
  "people-1440": { width: 1440, height: 900, path: "/en/people" },
  "timeline-1440": { width: 1440, height: 900, path: "/en/timeline" },
  "join-1440": { width: 1440, height: 900, path: "/en/join" },
  "grip-5-1440": { width: 1440, height: 900, path: "/en/projects/grip-5" },
  "grip-5-390": { width: 390, height: 844, path: "/en/projects/grip-5" },
  "tolqyn-1440": { width: 1440, height: 900, path: "/en/projects/tolqyn" },
  "moodflix-1440": { width: 1440, height: 900, path: "/en/projects/moodflix" },
  "naeonair-wisdrone-1440": {
    width: 1440,
    height: 900,
    path: "/en/projects/naeonair-wisdrone",
  },
  "probe-open-dark-1440": {
    width: 1440,
    height: 900,
    path: "/en",
    action: "probe" as const,
  },
  "probe-open-light-1440": {
    width: 1440,
    height: 900,
    path: "/en",
    action: "probe" as const,
    scheme: "light" as const,
  },
  "probe-open-390": {
    width: 390,
    height: 844,
    path: "/en",
    action: "probe" as const,
  },
  "header-controls-dark-1440": {
    width: 1440,
    height: 900,
    path: "/en",
    clip: "header" as const,
  },
  "header-controls-light-1440": {
    width: 1440,
    height: 900,
    path: "/en",
    clip: "header" as const,
    scheme: "light" as const,
  },
  "header-controls-mobile-390": {
    width: 390,
    height: 844,
    path: "/en",
    clip: "header" as const,
  },
  "about-without-errata-1440": {
    width: 1440,
    height: 900,
    path: "/en/about",
  },
  "home-cta-dark-1440": {
    width: 1440,
    height: 900,
    path: "/en",
    clip: "cta" as const,
  },
  "home-cta-light-1440": {
    width: 1440,
    height: 900,
    path: "/en",
    clip: "cta" as const,
    scheme: "light" as const,
  },
  "light-home-1440": {
    width: 1440,
    height: 900,
    path: "/en",
    scheme: "light" as const,
  },
  "light-projects-1440": {
    width: 1440,
    height: 900,
    path: "/en/projects",
    scheme: "light" as const,
  },
  "light-case-study-1440": {
    width: 1440,
    height: 900,
    path: "/en/projects/grip-5",
    scheme: "light" as const,
  },
  "header-desktop-1440": {
    width: 1440,
    height: 900,
    path: "/en",
    clip: "header" as const,
  },
  "header-tablet-768": {
    width: 768,
    height: 1024,
    path: "/en/projects",
    clip: "header" as const,
  },
  "header-mobile-390": {
    width: 390,
    height: 844,
    path: "/en",
    clip: "header" as const,
  },
  "header-mobile-320": {
    width: 320,
    height: 568,
    path: "/en",
    clip: "header" as const,
  },
  "footer-desktop-1440": {
    width: 1440,
    height: 900,
    path: "/en/about",
    clip: "footer" as const,
  },
  "footer-mobile-390": {
    width: 390,
    height: 844,
    path: "/ko/people",
    clip: "footer" as const,
  },
  "skip-link-focused": {
    width: 1440,
    height: 900,
    path: "/en",
    action: "skip" as const,
  },
  "navigation-projects-visible": {
    width: 1440,
    height: 900,
    path: "/en",
    action: "nav-projects" as const,
  },
  "navigation-about-visible": {
    width: 1440,
    height: 900,
    path: "/en/projects/grip-5",
    action: "nav-about" as const,
  },
  "navigation-ko-projects-visible": {
    width: 1440,
    height: 900,
    path: "/ko",
    action: "nav-ko-projects" as const,
  },
  "projects-filtered-1440": {
    width: 1440,
    height: 900,
    path: "/en/projects",
    action: "filter" as const,
  },
  "projects-empty-1440": {
    width: 1440,
    height: 900,
    path: "/en/projects",
    action: "empty" as const,
  },
} as const;
test.describe("screenshots", () => {
  test.beforeAll(() => {
    mkdirSync(outputDir, { recursive: true });
    mkdirSync(archiveDir, { recursive: true });
    for (const legacy of [
      "grip-5-desktop.png",
      "grip-5-mobile.png",
      "moodflix-desktop.png",
      "naeonair-desktop.png",
      "naeonair-mobile.png",
      "tolqyn-desktop.png",
      "tolqyn-mobile.png",
      "probe-open-1440.png",
    ]) {
      rmSync(join(outputDir, legacy), { force: true });
    }
  });

  for (const [name, config] of Object.entries(viewports)) {
    test(`capture ${name}`, async ({ page }) => {
      await page.setViewportSize({
        width: config.width,
        height: config.height,
      });
      // Reduced motion reveals all sections instantly so full-page captures
      // show real content instead of below-the-fold reveal placeholders.
      await page.emulateMedia({
        reducedMotion: "reduce",
        colorScheme: "scheme" in config && config.scheme === "light" ? "light" : "dark",
      });
      await page.goto(config.path);
      await page.waitForLoadState("networkidle");

      if ("action" in config && config.action === "filter") {
        await page.getByLabel(/Tier|등급/i).selectOption("flagship");
        await page.waitForTimeout(300);
      }

      if ("action" in config && config.action === "empty") {
        await page.getByRole("searchbox").fill("zzzz-no-match");
        await page.waitForTimeout(300);
      }

      if ("action" in config && config.action === "probe") {
        await page.keyboard.press("Control+K");
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.waitForTimeout(300);
      }

      if ("action" in config && config.action === "skip") {
        await page.keyboard.press("Tab");
        await expect(page.getByRole("link", { name: /skip to content|본문으로/i })).toBeFocused();
        await page.waitForTimeout(150);
      }

      if ("action" in config && config.action === "nav-projects") {
        await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
        await expect(page).toHaveURL(/\/en\/projects$/);
        await page.waitForTimeout(300);
      }

      if ("action" in config && config.action === "nav-about") {
        await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();
        await expect(page).toHaveURL(/\/en\/about$/);
        await page.waitForTimeout(300);
      }

      if ("action" in config && config.action === "nav-ko-projects") {
        await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: /프로젝트|Projects/i }).click();
        await expect(page).toHaveURL(/\/ko\/projects$/);
        await page.waitForTimeout(300);
      }

      if ("clip" in config && config.clip === "header") {
        await page.locator(".site-header").screenshot({
          path: join(outputDir, `${name}.png`),
        });
        return;
      }

      if ("clip" in config && config.clip === "footer") {
        await page.locator("footer.site-footer").screenshot({
          path: join(outputDir, `${name}.png`),
        });
        return;
      }

      if ("clip" in config && config.clip === "cta") {
        const cta = page.locator("section#join");
        await cta.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await cta.screenshot({
          path: join(outputDir, `${name}.png`),
        });
        return;
      }

      await page.screenshot({
        path: join(outputDir, `${name}.png`),
        fullPage: true,
      });
    });
  }
});

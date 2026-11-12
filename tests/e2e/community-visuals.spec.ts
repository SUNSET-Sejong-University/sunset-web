import { expect, test } from "@playwright/test";
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";

const output = join(process.cwd(), "artifacts", "community-refinement");
test.beforeAll(() => { mkdirSync(output, { recursive: true }); });

for (const locale of ["en", "ko"] as const) {
  test(`${locale} manual brand rail: both organizations, arrows, keyboard, announcements`, async ({ page }) => {
    await page.goto(`/${locale}/partners`);
    const rail = page.locator(".partner-showcase");
    const contacts = rail.locator(".brand-rail-contacts button");
    await expect(contacts).toHaveCount(2);
    await expect(contacts.nth(0)).toContainText("PCBWay");
    await expect(contacts.nth(1)).toContainText("Tuya");
    await expect(contacts.nth(0)).toHaveAttribute("aria-pressed", "true");
    await contacts.nth(1).click();
    await expect(rail.getByRole("status")).toContainText(`02 / 02 · Tuya · ${locale === "en" ? "Sponsor" : "후원사"}`);
    await expect(rail.locator(".brand-slide h2")).toHaveText("Tuya");
    await contacts.nth(1).press("ArrowLeft");
    await expect(rail.getByRole("status")).toContainText("PCBWay");
    await contacts.nth(0).press("End");
    await expect(contacts.nth(1)).toHaveAttribute("aria-pressed", "true");
    await rail.getByRole("button", { name: locale === "en" ? "Next organization" : "다음 기업" }).click();
    await expect(contacts.nth(0)).toHaveAttribute("aria-pressed", "true");
    await contacts.nth(0).press("Home");
    await expect(rail.locator(".brand-slide h2")).toHaveText("PCBWay");
    await expect(page.locator(".organization-entry")).toHaveCount(2);
    expect((await new AxeBuilder({ page }).include(".partner-showcase").analyze()).violations).toEqual([]);
  });

  test(`${locale} reduced motion and touch swipe update selection without movement`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}/partners`);
    const stage = page.locator(".brand-stage");
    await stage.dispatchEvent("pointerdown", { pointerType: "touch", clientX: 290, clientY: 300 });
    await stage.dispatchEvent("pointerup", { pointerType: "touch", clientX: 150, clientY: 305 });
    await expect(page.locator(".brand-slide h2")).toHaveText("Tuya");
    expect(await page.locator(".brand-slide").evaluate((element) => getComputedStyle(element).transform)).toBe("none");
    await page.screenshot({ path: join(output, `${locale}-brand-sponsor-390.png`), fullPage: true });
  });

  test(`${locale} section map and code-derived pipeline expose real content`, async ({ page }) => {
    await page.goto(`/${locale}/sections`);
    await expect(page.locator(".pathway-map-board a")).toHaveCount(6);
    await page.locator('.pathway-map-board a[href="#creative-arts"]').click();
    await expect(page).toHaveURL(/#creative-arts$/);
    await expect(page.locator("#creative-arts")).toContainText("Arif Anzum");
    await page.goto(`/${locale}/achievements`);
    const pipeline = page.locator(".gitguardian-pipeline");
    await expect(pipeline.locator("li")).toHaveCount(5);
    await pipeline.getByRole("button").nth(4).click();
    await expect(pipeline.locator(".pipeline-readout")).toContainText("generate_analysis");
    await expect(pipeline.locator('a[href$="/apps/agent/graph.py"]')).toBeVisible();
    await expect(page.locator(".achievement-award")).toContainText("Track Winner");
  });

  test(`${locale} no-JavaScript directory keeps both profiles discoverable`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`/${locale}/partners`);
    for (const slug of ["pcbway", "tuya"]) {
      await page.locator(`.organization-entry a[href="/${locale}/partners/${slug}"]`).last().click();
      await expect(page.locator("main h1")).toHaveText(slug === "pcbway" ? "PCBWay" : "Tuya");
      await page.locator(`main a[href="/${locale}/partners"]`).click();
    }
    await context.close();
  });
}

for (const locale of ["en", "ko"] as const) {
  for (const colorScheme of ["dark", "light"] as const) {
    for (const width of [1440, 1024, 768, 390, 320]) {
      test(`${locale} ${colorScheme} visual review at ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
        const consoleErrors: string[] = [];
        const failedAssets: string[] = [];
        page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
        page.on("response", (response) => { if (response.status() >= 400) failedAssets.push(`${response.status()} ${new URL(response.url()).pathname}`); });
        for (const segment of ["", "sections", "partners", "partners/pcbway", "partners/tuya", "achievements", "join"]) {
          await page.goto(`/${locale}${segment ? `/${segment}` : ""}`);
          await expect(page.locator("main h1")).toBeVisible();
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
          await page.screenshot({ path: join(output, `${locale}-${colorScheme}-${width}-${segment.replaceAll("/", "-") || "home"}.png`), fullPage: true });
        }
        writeFileSync(join(output, `${locale}-${colorScheme}-${width}-diagnostics.json`), JSON.stringify({ consoleErrors, failedAssets }, null, 2));
      });
    }
  }

  test(`${locale} SUNSET form frame and fallback pass accessibility with Google document audited separately`, async ({ page }) => {
    await page.goto(`/${locale}/join`);
    // Keep the full-page axe assertions in community.spec.ts and site.spec.ts.
    // This additional audit isolates the markup we own, including frame title and fallback.
    const owned = await new AxeBuilder({ page }).include("main").exclude(".join-form-frame iframe").analyze();
    expect(owned.violations).toEqual([]);
    await page.locator(".join-form-toolbar button").click();
    expect((await new AxeBuilder({ page }).include("main").analyze()).violations).toEqual([]);
  });

  test(`${locale} blocked Google frame retains a usable fallback`, async ({ page }) => {
    await page.route("https://docs.google.com/forms/**", (route) => route.abort());
    await page.goto(`/${locale}/join`);
    await expect(page.locator(".join-form-heading a")).toHaveAttribute("href", "https://forms.gle/8yM9cvjNWBpxJLZw7");
    if (await page.locator(".join-form-frame iframe").count()) await page.locator(".join-form-toolbar button").click();
    await expect(page.locator(".join-form-fallback")).toBeVisible();
    await expect(page.locator(".join-form-fallback")).toContainText(locale === "en" ? "cannot confirm" : "확인할 수 없습니다");
  });
}

test("homepage community uses the page/footer surface in both themes", async ({ page }) => {
  for (const colorScheme of ["dark", "light"] as const) {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en");
      const community = page.locator(".home-community");
      const surfaces = await community.evaluate((element) => ({
        background: getComputedStyle(element).backgroundColor,
        page: getComputedStyle(document.body).backgroundColor,
      }));
      expect(surfaces.background).toBe(surfaces.page);
      await community.screenshot({ path: join(output, `home-community-${colorScheme}-${width}.png`) });
    }
  }
});

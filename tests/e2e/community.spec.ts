import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const segments = ["join", "people", "sections", "partners", "partners/pcbway", "partners/tuya", "achievements"];
const output = join(process.cwd(), "artifacts", "community");

test.beforeAll(() => { mkdirSync(output, { recursive: true }); });

for (const locale of ["en", "ko"] as const) {
  for (const width of [1440, 320]) {
    for (const segment of segments) {
      test(`${locale}/${segment} at ${width}: accessible, responsive, and rendered`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        const exceptions: string[] = [];
        page.on("pageerror", (error) => exceptions.push(error.message));
        const response = await page.goto(`/${locale}/${segment}`);
        expect(response?.status()).toBe(200);
        await expect(page.locator("main h1")).toBeVisible();
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/${locale}/${segment}$`));
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", new RegExp(`/en/${segment}$`));
        await expect(page.locator('link[rel="alternate"][hreflang="ko"]')).toHaveAttribute("href", new RegExp(`/ko/${segment}$`));
        await expect(page.locator(`[data-locale="${locale}"]`)).toHaveAttribute("lang", locale);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
        for (const image of await page.locator("main img").all()) {
          expect(await image.evaluate((element) => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBeTruthy();
        }
        expect(exceptions).toEqual([]);
        const accessibility = await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
        await page.screenshot({ path: join(output, `${locale}-${segment.replaceAll("/", "-")}-${width}.png`), fullPage: true });
        expect(accessibility.violations).toEqual([]);
      });
    }
  }

  for (const width of [390, 768, 1024]) {
    test(`${locale} intermediate layouts at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce", colorScheme: width === 768 ? "light" : "dark" });
      const errors: string[] = [];
      const failedAssets: string[] = [];
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      page.on("response", (response) => { if (response.status() >= 400) failedAssets.push(`${response.status()} ${new URL(response.url()).pathname}`); });
      for (const segment of ["", ...segments]) {
        await page.goto(`/${locale}${segment ? `/${segment}` : ""}`);
        await expect(page.locator("main h1")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
        await page.screenshot({ path: join(output, `${locale}-${segment.replaceAll("/", "-") || "home"}-${width}.png`), fullPage: true });
      }
      await test.info().attach("browser-diagnostics", { body: JSON.stringify({ errors, failedAssets }, null, 2), contentType: "application/json" });
      // The existing site-wide console-error test checks console output without exceptions.
      // Keep diagnostics here to distinguish inherited asset failures from layout assertions.
    });
  }

  test(`${locale} founder status and functional roles stay separate`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}/people`);
    const founding = page.locator("#founding-members");
    await expect(founding.getByRole("article")).toHaveCount(3);
    for (const name of ["Prithwis Das", "최종우", "Odina Yusupova"]) {
      const card = founding.getByRole("article").filter({ has: page.getByRole("heading", { name, exact: true }) });
      await expect(card.locator(".founder-label")).toHaveText(locale === "en" ? "Founder" : "창립자");
      if (name === "최종우") await expect(card.locator(".role")).toContainText("HR");
      if (name === "Odina Yusupova") await expect(card.locator(".role")).toHaveText(locale === "en" ? "Business & Marketing" : "비즈니스 및 마케팅");
      if (name === "Prithwis Das") await expect(card.locator(".role")).toHaveCount(0);
    }
    await expect(page.getByRole("heading", { name: locale === "en" ? "Mentors" : "멘토", exact: true })).toBeVisible();
    await expect(page.locator("main")).not.toContainText(/Industry Mentors|업계 멘토/);
  });

  test(`${locale} join embeds the official form with an accessible fallback`, async ({ page }) => {
    await page.goto(`/${locale}/join`);
    await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Proposal process|제안 절차/ })).toHaveCount(0);
    const frame = page.locator(".join-form-frame iframe");
    await expect(frame).toHaveAttribute("src", "https://docs.google.com/forms/d/e/1FAIpQLSfAw5G4yC7mCMfiPtNRx5nROGNdxZvbhdzpurYmk_UXUSr6ag/viewform?embedded=true");
    await expect(frame).toHaveAttribute("title", locale === "en" ? "SUNSET recruitment — official Google Form" : "SUNSET 모집 — 공식 Google 설문지");
    const fallback = page.locator('.join-form-heading a');
    await expect(fallback).toHaveAttribute("href", "https://forms.gle/8yM9cvjNWBpxJLZw7");
    await expect(fallback).toHaveAttribute("target", "_blank");
    await expect(fallback).toHaveAttribute("rel", "noopener noreferrer");
    await page.locator(".join-form-toolbar button").click();
    await expect(page.locator(".join-form-fallback")).toContainText(locale === "en" ? "cannot confirm" : "확인할 수 없습니다");
    await expect(page.locator(".join-form-fallback a")).toHaveAttribute("href", "https://forms.gle/8yM9cvjNWBpxJLZw7");
    await expect(frame).toHaveCount(0);
    await page.locator(".join-form-toolbar button").click();
    await expect(frame).toBeVisible();
  });

  test(`${locale} achievement credits the existing member and canonical repository`, async ({ page }) => {
    await page.goto(`/${locale}/achievements`);
    await expect(page.locator(".achievement-award")).toContainText("Track Winner");
    await expect(page.locator(".achievement-award")).not.toContainText(/grand prize|first place|champion/i);
    await expect(page.locator(".achievement-record")).toContainText("2025");
    await expect(page.locator(".achievement-person")).toHaveAttribute("href", `/${locale}/people#person-azizbek-arzikulov`);
    await expect(page.locator('main a[href="https://github.com/azizbekdevuz/gitguardian"]')).toBeVisible();
    await page.locator(".achievement-person").click();
    await expect(page.locator("#person-azizbek-arzikulov")).toContainText("Azizbek Arzikulov");
  });

  test(`${locale} homepage, header, profiles, footer, and mobile PROBE link the archive`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    await page.locator(`.home-partners a[href="/${locale}/partners"]`).click();
    await expect(page).toHaveURL(`/${locale}/partners`);
    for (const slug of ["pcbway", "tuya"]) {
      await page.locator(`main a[href="/${locale}/partners/${slug}"]`).first().click();
      await expect(page).toHaveURL(`/${locale}/partners/${slug}`);
      await page.locator(`main a[href="/${locale}/partners"]`).click();
    }
    await page.goto(`/${locale}`);
    await page.locator(".home-achievement .text-link").click();
    await expect(page).toHaveURL(`/${locale}/achievements`);
    await page.locator(".community-menu-toggle").click();
    await page.locator(`#community-menu a[href="/${locale}/sections"]`).click();
    await expect(page).toHaveURL(`/${locale}/sections`);
    await page.locator('.section-pathway .text-link').first().click();
    await expect(page).toHaveURL(`/${locale}/join`);
    await page.locator(`footer a[href="/${locale}/achievements"]`).click();
    await expect(page).toHaveURL(`/${locale}/achievements`);
    await page.getByRole("link", { name: /Switch language|언어 전환/ }).click();
    await expect(page).toHaveURL(`/${locale === "en" ? "ko" : "en"}/achievements`);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}`);
    for (const [segment, label] of [["sections", locale === "en" ? "Sections" : "활동 분야"], ["partners", locale === "en" ? "Partners & Sponsors" : "파트너 및 후원사"], ["achievements", locale === "en" ? "Achievements" : "성과 기록"]]) {
      await page.locator(".probe-trigger").click();
      await page.getByRole("combobox").fill(label ?? "");
      if (segment === "sections") await page.screenshot({ path: join(output, `${locale}-probe-390.png`) });
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(`/${locale}/${segment}`);
    }
    await page.locator(".nav-toggle").click();
    await page.locator(".community-menu-toggle").click();
    await page.screenshot({ path: join(output, `${locale}-mobile-menu-390.png`) });
    await page.locator(`#community-menu a[href="/${locale}/partners"]`).click();
    await expect(page).toHaveURL(`/${locale}/partners`);
    await expect(page.locator(".nav-toggle")).toHaveAttribute("aria-expanded", "false");
  });
}

test("community navigation supports keyboard and Escape", async ({ page }) => {
  await page.goto("/en");
  await page.locator(".community-menu-toggle").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#community-menu")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator('#community-menu a[href="/en/people"]')).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#community-menu")).toBeHidden();
});

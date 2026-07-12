import { expect, test, type Page } from "@playwright/test";

async function expectMainContentVisible(page: Page) {
  const main = page.locator("main#main-content");
  await expect(main).toBeVisible();

  const mainOpacity = await main.evaluate((node) => window.getComputedStyle(node).opacity);
  expect(Number(mainOpacity)).toBeGreaterThan(0);

  const heading = main.locator("h1").first();
  await expect(heading).toBeVisible();

  const headingOpacity = await heading.evaluate((node) => window.getComputedStyle(node).opacity);
  expect(Number(headingOpacity)).toBeGreaterThan(0);

  const headingTransform = await heading.evaluate((node) => window.getComputedStyle(node).transform);
  expect(headingTransform).not.toMatch(/matrix\(1, 0, 0, 1, 0, -?\d{2,}\)/);

  const reveal = main.locator(".reveal").first();
  if ((await reveal.count()) > 0) {
    // Reveal sections animate in when scrolled into view; below-the-fold
    // sections are legitimately hidden until then.
    await reveal.scrollIntoViewIfNeeded();
    await expect
      .poll(
        async () => Number(await reveal.evaluate((node) => window.getComputedStyle(node).opacity)),
        { timeout: 5000 },
      )
      .toBeGreaterThan(0);
  }
}

async function expectSkipLinkHiddenUntilFocus(page: Page) {
  const skip = page.getByRole("link", { name: /skip to content|본문으로/i });
  await expect(skip).toBeAttached();

  const offscreen = await skip.evaluate((node) => {
    const style = window.getComputedStyle(node);
    const transform = style.transform;
    return transform !== "none" && !transform.includes("matrix(1, 0, 0, 1, 0, 0)");
  });
  expect(offscreen).toBe(true);

  const box = await skip.boundingBox();
  expect(box).not.toBeNull();
  if (box) {
    expect(box.y).toBeLessThan(0);
  }
}

test.describe("client navigation visibility", () => {
  test("english route chain stays visible without refresh", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await expectMainContentVisible(page);

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/en\/projects$/);
    await expectMainContentVisible(page);

    await page.getByRole("link", { name: /GRIP-5/i }).first().click();
    await expect(page).toHaveURL(/\/en\/projects\/grip-5$/);
    await expectMainContentVisible(page);

    await page.locator("footer.site-footer").getByRole("link", { name: "People" }).click();
    await expect(page).toHaveURL(/\/en\/people$/);
    await expectMainContentVisible(page);

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/en\/about$/);
    await expectMainContentVisible(page);

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Join" }).click();
    await expect(page).toHaveURL(/\/en\/join$/);
    await expectMainContentVisible(page);

    await page.getByRole("link", { name: /Switch language|언어 전환/i }).click();
    await expect(page).toHaveURL(/\/ko\/join$/);
    await expectMainContentVisible(page);

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: /프로젝트|Projects/i }).click();
    await expect(page).toHaveURL(/\/ko\/projects$/);
    await expectMainContentVisible(page);
  });

  test("mobile route chain includes timeline without refresh", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");

    const openMenu = async () => {
      await page.getByRole("button", { name: /Open menu|메뉴 열기/i }).click();
    };

    await openMenu();
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/en\/projects$/);
    await expectMainContentVisible(page);

    await openMenu();
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "People" }).click();
    await expect(page).toHaveURL(/\/en\/people$/);
    await expectMainContentVisible(page);

    await openMenu();
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Timeline" }).click();
    await expect(page).toHaveURL(/\/en\/timeline$/);
    await expectMainContentVisible(page);
  });

  test("korean route chain and browser history stay visible", async ({ page }) => {
    await page.goto("/ko");
    await expectMainContentVisible(page);

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: /프로젝트|Projects/i }).click();
    await expect(page).toHaveURL(/\/ko\/projects$/);
    await expectMainContentVisible(page);

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: /소개|About/i }).click();
    await expect(page).toHaveURL(/\/ko\/about$/);
    await expectMainContentVisible(page);

    await page.goBack();
    await expect(page).toHaveURL(/\/ko\/projects$/);
    await expectMainContentVisible(page);

    await page.goForward();
    await expect(page).toHaveURL(/\/ko\/about$/);
    await expectMainContentVisible(page);
  });
});

const CONTROL_SELECTORS = [".nav-cta", ".lang-switch", ".probe-trigger", ".theme-toggle"] as const;

test.describe("header shell", () => {
  test("desktop header controls fit within viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");

    const header = page.locator(".site-header-inner");
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeLessThanOrEqual(1440);
      expect(box.height).toBeCloseTo(72, 0);
    }

    const cta = page.locator(".nav-cta");
    await expect(cta).toBeVisible();
    const contrast = await cta.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return { color: style.color, background: style.backgroundColor };
    });
    expect(contrast.background).toMatch(/rgb\(217, 122, 77\)|#d97a4d/i);
    expect(contrast.color).toMatch(/rgb\(5, 6, 7\)|#050607/i);

    await expect(page.getByRole("button", { name: /Open command palette|명령 팔레트/i })).toBeVisible();
  });

  test("shell controls share a comfortable control-rail geometry", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");

    const boxes: { selector: string; x: number; width: number; height: number; y: number }[] = [];
    for (const selector of CONTROL_SELECTORS) {
      const control = page.locator(selector);
      await expect(control, `${selector} should be visible`).toBeVisible();
      const box = await control.boundingBox();
      expect(box, `${selector} should have a bounding box`).not.toBeNull();
      if (!box) continue;
      // consistent minimum height, no cramped controls
      expect(box.height, `${selector} height`).toBeGreaterThanOrEqual(38);
      expect(box.height, `${selector} height`).toBeLessThanOrEqual(48);
      boxes.push({ selector, ...box });

      const padding = await control.evaluate((node) => {
        const style = window.getComputedStyle(node);
        return {
          left: parseFloat(style.paddingLeft),
          right: parseFloat(style.paddingRight),
        };
      });
      if (selector !== ".theme-toggle") {
        expect(padding.left, `${selector} inline padding`).toBeGreaterThanOrEqual(12);
        expect(padding.right, `${selector} inline padding`).toBeGreaterThanOrEqual(12);
      }
    }

    // controls must not overlap each other
    const sorted = [...boxes].sort((a, b) => a.x - b.x);
    for (let i = 1; i < sorted.length; i += 1) {
      const prev = sorted[i - 1];
      const current = sorted[i];
      if (!prev || !current) continue;
      expect(
        prev.x + prev.width,
        `${prev.selector} must not overlap ${current.selector}`,
      ).toBeLessThanOrEqual(current.x + 1);
    }
  });

  test("nav link styles do not leak into shell controls", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");

    // CTA keeps its filled-button ink even though it lives inside the nav
    const ctaColor = await page
      .locator(".nav-cta")
      .evaluate((node) => window.getComputedStyle(node).color);
    const navLinkColor = await page
      .locator(".main-nav ul a")
      .first()
      .evaluate((node) => window.getComputedStyle(node).color);
    expect(ctaColor).not.toBe(navLinkColor);
  });

  test.describe("header does not overflow at narrow widths", () => {
    for (const width of [320, 390, 768, 1024]) {
      test(`no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/en");
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
        await expect(page.locator(".site-header")).toBeVisible();
      });
    }
  });

  test("theme toggle switches and persists the theme", async ({ page }) => {
    await page.goto("/en");
    const toggle = page.locator(".theme-toggle");
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    const lightBg = await page.evaluate(
      () => window.getComputedStyle(document.body).backgroundColor,
    );
    expect(lightBg).toBe("rgb(244, 239, 227)");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const darkBg = await page.evaluate(
      () => window.getComputedStyle(document.body).backgroundColor,
    );
    expect(darkBg).toBe("rgb(5, 6, 7)");
  });

  test("mobile header keeps probe and menu independent", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");

    const probe = page.getByRole("button", { name: /Open command palette|명령 팔레트/i });
    const menu = page.getByRole("button", { name: /Open menu|메뉴 열기/i });
    await expect(probe).toBeVisible();
    await expect(menu).toBeVisible();

    const probeBox = await probe.boundingBox();
    const menuBox = await menu.boundingBox();
    expect(probeBox).not.toBeNull();
    expect(menuBox).not.toBeNull();
    if (probeBox && menuBox) {
      expect(probeBox.x + probeBox.width).toBeLessThanOrEqual(menuBox.x + 1);
    }

    await menu.click();
    await expect(page.getByRole("button", { name: /Close menu|메뉴 닫기/i })).toBeVisible();
    await probe.click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});

test.describe("footer shell", () => {
  test("footer grid is visible without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");

    const footer = page.locator("footer.site-footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByRole("heading", { name: "Navigate" })).toBeVisible();
    await expect(footer.getByText(/independent student-led collective/i)).toBeVisible();

    const width = await footer.evaluate((node) => node.scrollWidth);
    expect(width).toBeLessThanOrEqual(1440);
  });

  test("footer stacks on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ko/people");

    const grid = page.locator(".footer-grid");
    const columns = await grid.evaluate((node) => window.getComputedStyle(node).gridTemplateColumns);
    expect(columns.split(" ").length).toBe(1);

    await expect(page.locator("footer.site-footer")).toBeVisible();
  });
});

test.describe("skip link", () => {
  test("is off-screen until focused and targets main content", async ({ page }) => {
    await page.goto("/en/projects");
    await expectSkipLinkHiddenUntilFocus(page);

    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content|본문으로/i });
    await expect(skip).toBeFocused();

    const focusedBox = await skip.boundingBox();
    expect(focusedBox).not.toBeNull();
    if (focusedBox) {
      expect(focusedBox.y).toBeGreaterThanOrEqual(0);
    }

    await skip.click();
    await expect(page.locator("#main-content")).toBeFocused();
  });
});

test.describe("reveal fallback", () => {
  test("reduced motion keeps route content visible after navigation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/en\/projects$/);
    await expectMainContentVisible(page);
  });
});

test.describe("probe open state", () => {
  async function expectProbePolished(page: Page) {
    await page.keyboard.press("Control+K");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const input = dialog.getByRole("combobox");
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();

    const inputRow = dialog.locator(".probe-input-row");
    const rowPadding = await inputRow.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return {
        left: parseFloat(style.paddingLeft),
        top: parseFloat(style.paddingTop),
      };
    });
    expect(rowPadding.left).toBeGreaterThanOrEqual(14);
    expect(rowPadding.top).toBeGreaterThanOrEqual(12);

    const firstItem = dialog.getByRole("option").first();
    await expect(firstItem).toBeVisible();
    const itemPadding = await firstItem.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return {
        left: parseFloat(style.paddingLeft),
        top: parseFloat(style.paddingTop),
      };
    });
    expect(itemPadding.left).toBeGreaterThanOrEqual(10);
    expect(itemPadding.top).toBeGreaterThanOrEqual(10);

    // keyboard hints are visible with bordered inner spacing
    const escHint = dialog.locator(".probe-esc");
    await expect(escHint).toBeVisible();
    const footKbds = dialog.locator(".probe-foot kbd");
    expect(await footKbds.count()).toBeGreaterThanOrEqual(3);
    const kbdPadding = await footKbds.first().evaluate((node) => {
      const style = window.getComputedStyle(node);
      return {
        inline: parseFloat(style.paddingLeft),
        border: style.borderTopWidth,
      };
    });
    expect(kbdPadding.inline).toBeGreaterThanOrEqual(4);
    expect(kbdPadding.border).not.toBe("0px");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  }

  test("open probe is comfortable in dark mode at 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await expectProbePolished(page);
  });

  test("open probe is comfortable in light mode at 1440", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await expectProbePolished(page);
  });

  for (const width of [320, 390]) {
    test(`open probe fits mobile viewport at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/en");
      await page.keyboard.press("Control+K");
      const panel = page.locator(".probe-panel");
      await expect(panel).toBeVisible();
      const box = await panel.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
      }
    });
  }

  test("probe trigger does not shift when probe opens", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    const trigger = page.locator(".probe-trigger");
    const before = await trigger.boundingBox();
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const after = await trigger.boundingBox();
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    if (before && after) {
      expect(Math.abs(before.x - after.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(before.y - after.y)).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("about page without errata", () => {
  test("errata section is gone and the page flow is intact", async ({ page }) => {
    await page.goto("/en/about");

    const body = page.locator("body");
    await expect(body).not.toContainText(/errata/i);
    await expect(body).not.toContainText(/blacklist/i);
    await expect(body).not.toContainText(/SEV: FATAL/i);
    await expect(page.locator(".errata-panel")).toHaveCount(0);

    // page still flows: hero → stats → origin → values → people → join CTA
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".stat-strip")).toBeVisible();
    await expect(page.locator("#story")).toBeVisible();
    await expect(page.locator("#values")).toBeVisible();
    await expect(page.locator("#people")).toBeVisible();
    await expect(page.locator("#join-cta")).toBeVisible();
  });
});

test.describe("light mode", () => {
  const lightRoutes = ["/en", "/en/projects", "/en/about", "/en/projects/grip-5", "/ko", "/ko/projects"];

  for (const route of lightRoutes) {
    test(`light theme renders readable shell on ${route}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(route);

      const bodyBg = await page.evaluate(
        () => window.getComputedStyle(document.body).backgroundColor,
      );
      expect(bodyBg).toBe("rgb(244, 239, 227)");

      await expectMainContentVisible(page);
      await expect(page.locator(".site-header")).toBeVisible();
      await expect(page.locator("footer.site-footer")).toBeVisible();

      // body text must be dark ink, not the dark-theme light solder value
      const bodyColor = await page.evaluate(
        () => window.getComputedStyle(document.body).color,
      );
      expect(bodyColor).toBe("rgb(35, 37, 31)");
    });
  }
});

test.describe("homepage join CTA integration", () => {
  test("CTA section shares the wrap grid and has breathing room", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");

    const section = page.locator("section#join");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();

    const sectionPadding = await section.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return {
        top: parseFloat(style.paddingTop),
        bottom: parseFloat(style.paddingBottom),
      };
    });
    expect(sectionPadding.top).toBeGreaterThanOrEqual(60);
    expect(sectionPadding.bottom).toBeGreaterThanOrEqual(60);

    // aligned to the same content grid as the other standard sections
    const wrapBox = await section.locator(".wrap").last().boundingBox();
    const missionWrapBox = await page.locator("section#mission .wrap").boundingBox();
    expect(wrapBox).not.toBeNull();
    expect(missionWrapBox).not.toBeNull();
    if (wrapBox && missionWrapBox) {
      expect(Math.abs(wrapBox.x - missionWrapBox.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(wrapBox.width - missionWrapBox.width)).toBeLessThanOrEqual(1);
    }

    // handoff rail motif introduces the module
    await expect(section.locator(".handoff-rail")).toBeVisible();

    // no overlap with the footer
    const sectionBox = await section.boundingBox();
    const footerBox = await page.locator("footer.site-footer").boundingBox();
    expect(sectionBox).not.toBeNull();
    expect(footerBox).not.toBeNull();
    if (sectionBox && footerBox) {
      expect(sectionBox.y + sectionBox.height).toBeLessThanOrEqual(footerBox.y + 1);
    }

    // actions keep comfortable padding
    const primary = section.locator(".btn-primary");
    await expect(primary).toBeVisible();
    const buttonPadding = await primary.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return {
        left: parseFloat(style.paddingLeft),
        top: parseFloat(style.paddingTop),
      };
    });
    expect(buttonPadding.left).toBeGreaterThanOrEqual(16);
    expect(buttonPadding.top).toBeGreaterThanOrEqual(10);
  });
});

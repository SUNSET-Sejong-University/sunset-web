import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const mainRoutes = [
  "/en",
  "/ko",
  "/en/projects",
  "/ko/projects",
  "/en/people",
  "/ko/people",
  "/en/people/structure",
  "/ko/people/structure",
  "/en/timeline",
  "/en/about",
  "/en/join",
];

const projectSlugs = [
  "grip-5",
  "tolqyn",
  "moodflix",
  "naeonair-wisdrone",
  "intellichair",
  "buildin",
  "ikumplay",
  "roastivator",
  "dsnsim",
  "aura",
  "learning-structures",
];

test.describe("routing", () => {
  test("root redirects to English home", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
  });

  test("unsupported locale returns 404", async ({ page }) => {
    const response = await page.goto("/fr/projects");
    expect(response?.status()).toBe(404);
  });

  test("unknown project returns 404", async ({ page }) => {
    const response = await page.goto("/en/projects/dummy-files");
    expect(response?.status()).toBe(404);
  });

  for (const route of mainRoutes) {
    test(`loads ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
    });
  }

  for (const slug of projectSlugs) {
    test(`loads project ${slug}`, async ({ page }) => {
      const response = await page.goto(`/en/projects/${slug}`);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("h1")).toBeVisible();
    });
  }

  test("sitemap and robots are available", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const body = await sitemap.text();
    expect(body).toContain("/en/projects/grip-5");
    expect(body).not.toContain("dummy-files");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
  });
});

test.describe("navigation and localization", () => {
  test("desktop navigation reaches projects", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/en");
    await page.getByLabel("Primary").getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/projects$/);
  });

  test("language switch preserves path", async ({ page }) => {
    await page.goto("/en/projects/grip-5");
    await page.getByRole("link", { name: /Switch language|언어 전환/i }).click();
    await expect(page).toHaveURL(/\/ko\/projects\/grip-5$/);
  });

  test("mobile menu opens and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const menuToggle = page.getByRole("button", {
      name: /Open menu|Close menu|메뉴 열기|메뉴 닫기/i,
    });
    await menuToggle.click();
    await expect(page.getByRole("button", { name: /Close menu|메뉴 닫기/i })).toBeVisible();
    await expect(nav).toHaveClass(/is-open/);
    await expect(nav.getByRole("link", { name: "People" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: /Open menu|메뉴 열기/i })).toBeVisible();
    await expect(nav).not.toHaveClass(/is-open/);
  });
});

test.describe("project filters", () => {
  test("search, filters, count, and empty state", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page.getByText(/\d+ projects?|프로젝트/)).toBeVisible();

    await page.getByRole("searchbox").fill("GRIP-5");
    await expect(page.getByRole("link", { name: /GRIP-5/i })).toBeVisible();

    await page.getByRole("searchbox").fill("zzzz-not-found");
    await expect(page.getByText(/No projects match|조건에 맞는 프로젝트가 없습니다/)).toBeVisible();

    await page.getByRole("button", { name: /Clear filters|필터 초기화/i }).click();
    await page.getByLabel(/Tier|등급/i).selectOption("flagship");
    await expect(page.getByRole("link", { name: /Tolqyn/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /BuildIn/i })).toHaveCount(0);
  });

  test("excluded repositories are absent", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page.locator("body")).not.toContainText("dummy-files");
    await expect(page.locator("body")).not.toContainText("pixel-231a6fa7");
  });

  test("combined drone page is present once", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page.getByRole("link", { name: /NaeonAir/i })).toHaveCount(1);
  });
});

test.describe("content invariants", () => {
  test("footer disclaimer is visible", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("footer")).toContainText(/independent student-led collective/i);
  });

  test("grip-5 limitations are visible", async ({ page }) => {
    await page.goto("/en/projects/grip-5");
    await expect(page.locator("main")).toContainText(/Known limitations|알려진 한계/);
    await expect(page.locator("main")).toContainText(/medical validation|의료 검증/);
  });

  test("no console errors on representative routes", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        errors.push(message.text());
      }
    });

    for (const route of ["/en", "/en/projects", "/en/projects/naeonair-wisdrone"]) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
    }

    expect(errors).toEqual([]);
  });
});

test.describe("people groups and organization structure", () => {
  const groupTitles = {
    en: ["Founding Members", "Section Leads", "Advisory Committee", "Industry Mentors"],
    ko: ["창립 멤버", "섹션 리드", "자문위원회", "업계 멘토"],
  } as const;

  for (const lang of ["en", "ko"] as const) {
    test(`${lang} people page shows all four groups`, async ({ page }) => {
      await page.goto(`/${lang}/people`);
      for (const title of groupTitles[lang]) {
        await expect(page.getByRole("heading", { level: 3, name: title, exact: true })).toBeVisible();
      }
    });

    test(`${lang} structure page lists all four groups and unverified relationships`, async ({
      page,
    }) => {
      await page.goto(`/${lang}/people/structure`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      for (const title of groupTitles[lang]) {
        await expect(page.getByRole("heading", { level: 3, name: title, exact: true })).toBeVisible();
      }
    });
  }

  test("only confirmed members are listed in each group", async ({ page }) => {
    await page.goto("/en/people");
    const founding = page.locator("#founding-members");
    await expect(founding.getByRole("heading", { level: 4, name: "Prithwis Das" })).toBeVisible();

    const leads = page.locator("#section-leads");
    await expect(leads.getByRole("article")).toHaveCount(2);
    await expect(leads.getByRole("heading", { level: 4, name: "Azizbek Arzikulov" })).toBeVisible();
    await expect(leads).toContainText("Full-Stack Development / Engineering");
    await expect(leads.getByRole("heading", { level: 4, name: "Odina Yusupova" })).toBeVisible();
    await expect(leads).toContainText("Business");
    await expect(leads.getByRole("link", { name: /Azizbek Arzikulov — LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/azizbek-arzikulov",
    );
    // Private contact details are never rendered on the page.
    await expect(page.locator("body")).not.toContainText("gmail.com");

    for (const id of ["advisory-committee", "industry-mentors"]) {
      const group = page.locator(`#${id}`);
      await expect(group.getByRole("article")).toHaveCount(0);
      await expect(group).toContainText(/No members published yet/);
    }
  });

  test("structure page is reachable from people page, footer, and probe", async ({ page }) => {
    await page.goto("/en/people");
    await page.locator("main").getByRole("link", { name: "Organization structure →" }).first().click();
    await expect(page).toHaveURL(/\/en\/people\/structure$/);

    await page.goto("/en");
    await page
      .locator("footer.site-footer")
      .getByRole("link", { name: "Organization structure" })
      .click();
    await expect(page).toHaveURL(/\/en\/people\/structure$/);

    await page.goto("/en");
    await page.keyboard.press("Control+K");
    await page.getByRole("combobox").fill("structure");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/en\/people\/structure$/);
  });

  test("language switch preserves the structure path", async ({ page }) => {
    await page.goto("/en/people/structure");
    await page.getByRole("link", { name: /Switch language|언어 전환/i }).click();
    await expect(page).toHaveURL(/\/ko\/people\/structure$/);
  });

  test("sitemap includes the structure page in both locales", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    expect(body).toContain("/en/people/structure");
    expect(body).toContain("/ko/people/structure");
  });
});

test.describe("mobile gutters", () => {
  const mobileWidths = [320, 390, 768] as const;
  const routes = ["/en", "/ko", "/en/people", "/en/people/structure", "/en/join", "/en/timeline"];

  for (const width of mobileWidths) {
    for (const route of routes) {
      test(`${route} has side gutters and no overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        await page.waitForLoadState("networkidle");

        const result = await page.evaluate(() => {
          const root = document.documentElement;
          const wraps = Array.from(document.querySelectorAll<HTMLElement>("main .wrap"));
          const minGutter = Math.min(
            ...wraps.map((node) => {
              const style = window.getComputedStyle(node);
              return Math.min(parseFloat(style.paddingLeft), parseFloat(style.paddingRight));
            }),
          );
          return {
            overflow: root.scrollWidth - root.clientWidth,
            minGutter,
            wrapCount: wraps.length,
          };
        });

        expect(result.wrapCount).toBeGreaterThan(0);
        expect(result.overflow).toBeLessThanOrEqual(0);
        expect(result.minGutter).toBeGreaterThanOrEqual(16);
      });
    }
  }
});

test.describe("probe palette", () => {
  test("opens with keyboard shortcut, filters, and closes with Escape", async ({ page }) => {
    await page.goto("/en");
    await page.keyboard.press("Control+K");
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("combobox")).toBeFocused();

    await page.getByRole("combobox").fill("GRIP");
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("option", { name: /GRIP-5/i }).first()).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

async function expectNoSeriousAxeViolations(page: import("@playwright/test").Page) {
  await page.waitForFunction(() => document.documentElement.classList.contains("reveal-ready"));

  const results = await new AxeBuilder({ page })
    .exclude(".reveal:not(.is-visible)")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );

  expect(serious).toEqual([]);
}

test.describe("accessibility", () => {
  test("english home", async ({ page }) => {
    await page.goto("/en");
    await expectNoSeriousAxeViolations(page);
  });

  test("korean home", async ({ page }) => {
    await page.goto("/ko");
    await expectNoSeriousAxeViolations(page);
  });

  test("projects directory", async ({ page }) => {
    await page.goto("/en/projects");
    await expectNoSeriousAxeViolations(page);
  });

  test("grip-5 case study", async ({ page }) => {
    await page.goto("/en/projects/grip-5");
    await expectNoSeriousAxeViolations(page);
  });

  test("tolqyn case study", async ({ page }) => {
    await page.goto("/en/projects/tolqyn");
    await expectNoSeriousAxeViolations(page);
  });

  test("moodflix case study", async ({ page }) => {
    await page.goto("/en/projects/moodflix");
    await expectNoSeriousAxeViolations(page);
  });

  test("naeonair case study", async ({ page }) => {
    await page.goto("/en/projects/naeonair-wisdrone");
    await expectNoSeriousAxeViolations(page);
  });

  test("open mobile navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    await page.getByRole("button", { name: /Open menu|메뉴 열기/i }).click();
    await expectNoSeriousAxeViolations(page);
  });

  test("about page", async ({ page }) => {
    await page.goto("/en/about");
    await expectNoSeriousAxeViolations(page);
  });

  test("people page", async ({ page }) => {
    await page.goto("/en/people");
    await expectNoSeriousAxeViolations(page);
  });

  test("organization structure page", async ({ page }) => {
    await page.goto("/en/people/structure");
    await expectNoSeriousAxeViolations(page);
  });

  test("korean organization structure page", async ({ page }) => {
    await page.goto("/ko/people/structure");
    await expectNoSeriousAxeViolations(page);
  });

  test("timeline page", async ({ page }) => {
    await page.goto("/en/timeline");
    await expectNoSeriousAxeViolations(page);
  });

  test("join page", async ({ page }) => {
    await page.goto("/en/join");
    await expectNoSeriousAxeViolations(page);
  });

  test("probe dialog open", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: /Open command palette|명령 팔레트/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expectNoSeriousAxeViolations(page);
  });
});

test.describe("accessibility in light mode", () => {
  for (const route of ["/en", "/en/projects", "/en/about", "/en/projects/grip-5", "/ko"]) {
    test(`light theme ${route}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(route);
      await expectNoSeriousAxeViolations(page);
    });
  }

  test("light theme probe dialog", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/en");
    await page.getByRole("button", { name: /Open command palette|명령 팔레트/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expectNoSeriousAxeViolations(page);
  });
});

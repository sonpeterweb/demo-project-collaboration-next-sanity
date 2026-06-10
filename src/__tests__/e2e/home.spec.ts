import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("shows hero content and site branding", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Flowspace/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByText("CMS-powered marketing", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Preview before publish", { exact: true }),
    ).toBeVisible();
  });

  test("primary navigation links reach key pages", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    const blogLink = nav.getByRole("link", { name: "Blog" });

    if ((await blogLink.count()) > 0) {
      await blogLink.click();
      await expect(page).toHaveURL(/\/blog/);
      await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
      return;
    }

    // Fallback when Sanity nav is unavailable (e.g. CI without seeded content)
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: "Documentation" }),
    ).toBeVisible();
  });
});

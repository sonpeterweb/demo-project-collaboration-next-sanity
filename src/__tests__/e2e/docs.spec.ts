import { expect, test } from "@playwright/test";

test.describe("Docs page", () => {
  test("loads the documentation hub", async ({ page }) => {
    await page.goto("/docs");

    const main = page.getByRole("main");

    await expect(page).toHaveTitle(/Docs/);
    await expect(
      main.getByRole("heading", { name: "Documentation", exact: true }),
    ).toBeVisible();
    await expect(
      main.getByRole("button", { name: "Search documentation" }),
    ).toBeVisible();

    const docLinkCount = await main
      .getByRole("link")
      .filter({ hasNotText: /^Search/ })
      .count();
    if (docLinkCount > 0) {
      await expect(main.getByRole("link").first()).toBeVisible();
    }
  });
});

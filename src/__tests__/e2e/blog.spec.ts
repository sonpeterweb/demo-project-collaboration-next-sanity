import { expect, test } from "@playwright/test";

test.describe("Blog page", () => {
  test("loads the blog listing", async ({ page }) => {
    await page.goto("/blog");

    const main = page.getByRole("main");

    await expect(page).toHaveTitle(/Blog/);
    await expect(
      main.getByRole("heading", { name: "Blog", exact: true }),
    ).toBeVisible();

    const postCount = await main.locator("article").count();
    if (postCount > 0) {
      await expect(main.locator("article").first()).toBeVisible();
    } else {
      await expect(
        main.getByText("No posts found", { exact: true }),
      ).toBeVisible();
    }
  });
});

import { expect, test } from "@playwright/test";

test.describe("Blog page", () => {
  test("loads the blog listing", async ({ page }) => {
    await page.goto("/blog");

    await expect(page).toHaveTitle(/Blog/);
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();

    const postCards = page.locator("article");
    const emptyState = page.getByText(/No posts found|Check back later/);

    await expect(postCards.first().or(emptyState)).toBeVisible();
  });
});

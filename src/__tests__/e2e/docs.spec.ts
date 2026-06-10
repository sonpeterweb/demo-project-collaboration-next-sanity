import { expect, test } from "@playwright/test";

test.describe("Docs page", () => {
  test("loads the documentation hub", async ({ page }) => {
    await page.goto("/docs");

    await expect(page).toHaveTitle(/Docs/);
    await expect(
      page.getByRole("heading", { name: "Documentation" }),
    ).toBeVisible();

    const docLinks = page.getByRole("link").filter({ hasText: /./ });
    const emptyHint = page.getByText(/documentation|guides/i);

    await expect(docLinks.first().or(emptyHint)).toBeVisible();
  });
});

import { expect, test } from "@playwright/test";

test.describe("Contact form", () => {
  test("shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/contact");

    await expect(
      page.getByRole("heading", { name: "Get in Touch" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Invalid email address")).toBeVisible();
    await expect(page.getByText("Company is required")).toBeVisible();
    await expect(
      page.getByText("Message must be at least 10 characters"),
    ).toBeVisible();
  });
});

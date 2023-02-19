import { expect, test } from "@playwright/test";

test("Logout", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Private page" }).click();
  await page.locator('[data-test="usernameInput"]').click();
  await page.locator('[data-test="usernameInput"]').fill("user_test");
  await page.locator('[data-test="usernameInput"]').press("Tab");
  await page.locator('[data-test="passwordInput"]').fill("user_test");
  await page.locator('[data-test="passwordInput"]').press("Enter");
  await page.getByRole("link", { name: "Private page" }).click();
  await page.getByText(/Private Page/);
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page.getByText("User logged user_test")).toHaveCount(0);
  await page.getByText(/Home Page/);
});

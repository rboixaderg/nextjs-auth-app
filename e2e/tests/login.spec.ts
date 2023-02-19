import { expect, test } from "@playwright/test";

test("Login ok", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Go to Log in" }).click();
  await page.locator('[data-test="usernameInput"]').click();
  await page.locator('[data-test="usernameInput"]').fill("user_test");
  await page.locator('[data-test="usernameInput"]').press("Tab");
  await page.locator('[data-test="passwordInput"]').fill("user_test");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText("User logged user_test");
});

test("Login fail", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Go to Log in" }).click();
  await page.locator('[data-test="usernameInput"]').click();
  await page.locator('[data-test="usernameInput"]').fill("user_test");
  await page.locator('[data-test="usernameInput"]').press("Tab");
  await page.locator('[data-test="passwordInput"]').fill("errorpassword");
  await page.locator('[data-test="passwordInput"]').press("Enter");
  await page
    .getByText("Sign in failed. Check the details you provided are correct.")
    .click();
});

test("Auto logout after 20 seconds, home to private page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Go to Log in" }).click();
  await page.locator('[data-test="usernameInput"]').click();
  await page.locator('[data-test="usernameInput"]').fill("user_test");
  await page.locator('[data-test="usernameInput"]').press("Tab");
  await page.locator('[data-test="passwordInput"]').fill("user_test");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText("User logged user_test");
  await page.waitForTimeout(25000); // 25 seconds
  await page.getByRole("link", { name: "Private page" }).click();
  await expect(page.getByText("User logged user_test")).toHaveCount(0);
});

test("Auto logout after 20 seconds, private page to home page", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Go to Log in" }).click();
  await page.locator('[data-test="usernameInput"]').click();
  await page.locator('[data-test="usernameInput"]').fill("user_test");
  await page.locator('[data-test="usernameInput"]').press("Tab");
  await page.locator('[data-test="passwordInput"]').fill("user_test");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText("User logged user_test");
  await page.getByRole("link", { name: "Private page" }).click();
  await page.waitForTimeout(25000); // 25 seconds
  await page.getByRole("link", { name: "Home page" }).click();
  await expect(page.getByText("User logged user_test")).toHaveCount(0);
});

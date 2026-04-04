// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('/');
  // Good: toHaveTitle has built-in waiting
  await expect(page).toHaveTitle(/Learn Jenkins/);
});

test('has Jenkins in the body', async ({ page }) => {
  await page.goto('/');

  // FIXED: Changed from .isVisible() boolean check to a web-first assertion
  const linkLocator = page.locator('a:has-text("Learn Jenkins on Udemy")');
  await expect(linkLocator).toBeVisible();
});

test('has expected app version', async ({ page }) => {
  await page.goto('/');

  // Logic is correct: checks environment variable or defaults to '1'
  const expectedAppVersion = process.env.REACT_APP_VERSION ? process.env.REACT_APP_VERSION : '1';
  console.log(`Checking for version: ${expectedAppVersion}`);

  // CORRECT: Using getByText with { exact: false } is the most resilient way
  const versionText = `Application version: ${expectedAppVersion}`;
  await expect(page.getByText(versionText, { exact: false })).toBeVisible();
});
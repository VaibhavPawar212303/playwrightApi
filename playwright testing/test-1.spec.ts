import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=orangehrm&oq=orangehrm+&aqs=chrome..69i57.8453j0j2&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'OrangeHRM HR Software | Free & Open Source HR Software ... https://www.orangehrm.com' }).click();
  await page.getByRole('link', { name: 'OrangeHRM Logo' }).click();
});
// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './FirstProject',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
   
  },
  fullyParallel: true,

  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {
    
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5000/api/user',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    headless:false,
  
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
};

module.exports = config;

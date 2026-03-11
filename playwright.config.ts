import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    testIdAttribute: 'data-test',
    baseURL: process.env.APP_BASE_URL,
    headless: true,
  },

  projects: [
    // Setup runs once and produces .auth/user.json
    {
    name: 'setup',
    testDir: './tests/setup',
    testMatch: /.*\.setup\.ts/,
  },

  // 2) Public suite (no storageState)
  {
    name: 'public-chromium',
    testDir: './tests',
    testMatch: /.*\.guest\.spec\.ts/,
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'public-firefox',
    testDir: './tests',
    testMatch: /.*\.guest\.spec\.ts/,
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'public-webkit',
    testDir: './tests',
    testMatch: /.*\.guest\.spec\.ts/,
    use: { ...devices['Desktop Safari'] },
  },

  // 3) Auth suite (depends on setup; uses storageState)
  {
    name: 'auth-chromium',
    testDir: './tests',
    testMatch: /.*\.authenticated\.spec\.ts/,
    dependencies: ['setup'],
    use: {
      ...devices['Desktop Chrome'],
      storageState: '.auth/user.json',
      extraHTTPHeaders: process.env.ACCESS_TOKEN
        ? { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
        : undefined,
        launchOptions: {
          slowMo: 200
        }
    },
  },
  {
    name: 'auth-firefox',
    testDir: './tests',
    testMatch: /.*\.authenticated\.spec\.ts/,
    dependencies: ['setup'],
    use: {
      ...devices['Desktop Firefox'],
      storageState: '.auth/user.json',
      extraHTTPHeaders: process.env.ACCESS_TOKEN
        ? { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
        : undefined,
    },
  },
  {
    name: 'auth-webkit',
    testDir: './tests',
    testMatch: /.*\.authenticated\.spec\.ts/,
    dependencies: ['setup'],
    use: {
      ...devices['Desktop Safari'],
      storageState: '.auth/user.json',
      extraHTTPHeaders: process.env.ACCESS_TOKEN
        ? { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
        : undefined,
    },
  },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
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
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // extraHTTPHeaders: {
    //   'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    // {name: 'setup', testMatch: 'auth.setup.ts' },         // setup authentication trước khi thực hiện các phương thức API cần xác thực
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],},
        // storageState:'.auth/user.json'} ,             // đọc trạng thái 
      // dependencies: ['setup']     
      //                      // trước khi chạy chrom sẽ setup trước
    },
    //   {
    //   name: 'Chrome',
    //   use: {
    //     browserName: 'chromium',
    //     channel: 'chrome',
    //     headless: false,
    //     launchOptions: {
    //       args: [
    //         '--user-data-dir=C:\\Users\\haiGD\\AppData\\Local\\Google\\Chrome\\User Data',
    //         '--profile-directory=Default'
    //       ]
    //     }
    //   }
    // }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

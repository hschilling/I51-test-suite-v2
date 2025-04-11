// playwright.config.js
import { defineConfig } from '@playwright/test';
import fs from 'fs';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    actionTimeout: 10000,
    navigationTimeout: 15000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ],
  webServer: process.env.CI ? {
    command: 'npx sirv public --host 0.0.0.0 --port 8080 --dev',
    url: 'http://localhost:8080',
    reuseExistingServer: false,
    timeout: 120 * 1000,
  } : {
    command: 'npm run dev:server',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
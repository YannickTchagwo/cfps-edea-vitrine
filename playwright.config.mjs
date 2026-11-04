import { defineConfig } from '@playwright/test';
const base = process.env.SITE_BASE || '/';
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: `http://127.0.0.1:4322${base}`,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node tests/serve.mjs',
    url: `http://127.0.0.1:4322${base}`,
    reuseExistingServer: Boolean(process.env.QA_REUSE_SERVER),
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', channel: 'chrome' } },
    ...(process.env.ALL_BROWSERS
      ? [
          { name: 'firefox', use: { browserName: 'firefox' } },
          { name: 'webkit', use: { browserName: 'webkit' } },
        ]
      : []),
  ],
});

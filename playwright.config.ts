import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    workers: 2,
    retries: process.env.CI ? 1 : 0,
    reporter: 'list',
    use: { baseURL: 'http://127.0.0.1:4173', reducedMotion: 'reduce', trace: 'retain-on-failure' },
    webServer: [
        { command: 'node scripts/serve-e2e.mjs configured', url: 'http://127.0.0.1:4173', timeout: 120000 },
        { command: 'node scripts/serve-e2e.mjs unconfigured', url: 'http://127.0.0.1:4174', timeout: 120000 },
    ],
    projects: [
        { name: 'desktop', testMatch: ['site.spec.ts', 'animations.spec.ts', 'images.spec.ts'], use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile', testMatch: ['site.spec.ts', 'animations.spec.ts', 'images.spec.ts'], use: { ...devices['Pixel 7'] } },
        { name: 'unconfigured', testMatch: 'unconfigured.spec.ts', use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4174' } },
    ],
});

import { defineConfig, devices } from '@playwright/test';
import base from './playwright.config';

export default defineConfig({
    ...base,
    outputDir: './test-results/windows',
    projects: [
        { name: 'chrome', testMatch: ['animations.spec.ts', 'images.spec.ts'], use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
        { name: 'edge', testMatch: ['animations.spec.ts', 'images.spec.ts'], use: { ...devices['Desktop Chrome'], channel: 'msedge' } },
    ],
});

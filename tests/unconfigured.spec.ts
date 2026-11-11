import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('https://fonts.googleapis.com/**', route => route.abort());
    await page.route('https://fonts.gstatic.com/**', route => route.abort());
});

for (const url of ['/', '/contact']) {
    test(`${url} offers direct contact when Formspree is unconfigured`, async ({ page }) => {
        let submissions = 0;
        await page.route('https://formspree.io/**', route => { submissions++; return route.abort(); });
        await page.goto(url);
        const form = page.getByRole('form');
        await expect(form.getByRole('status')).toContainText('Online inquiries are currently unavailable.');
        await expect(form.getByRole('button', { name: 'Request a conversation' })).toBeDisabled();
        await expect(form.getByRole('link', { name: 'email us' })).toHaveAttribute('href', 'mailto:landscapesindia2015@gmail.com');
        expect(submissions).toBe(0);
    });
}

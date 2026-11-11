import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const endpoint = 'https://formspree.io/f/testform';

test.beforeEach(async ({ page }) => {
    // Fonts are external decoration; do not make smoke tests depend on that service.
    await page.route('https://fonts.googleapis.com/**', route => route.abort());
    await page.route('https://fonts.gstatic.com/**', route => route.abort());
});

async function fillInquiry(page: Page, home: boolean) {
    const form = page.getByRole('form', { name: home ? 'Homepage inquiry' : 'Contact inquiry' });
    await form.getByLabel('Name *', { exact: true }).fill('Test Visitor');
    await form.getByLabel('Email address *', { exact: true }).fill('visitor@example.com');
    if (!home) await form.getByLabel('Interested service').selectOption('consultation');
    await form.getByLabel('Tell us about your space').fill('A small garden.');
    return form;
}

test('routes, project images, and fallback pages load directly', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [url, heading] of [['/projects', 'Our Portfolio'], ['/about', 'The Art of Nature'], ['/contact', "Let's create your sanctuary."], ['/missing', 'Page not found'], ['/projects/missing', 'Project Not Found']]) {
        await page.goto(url);
        await expect(page.getByRole('heading', { level: 1 })).toContainText(heading, { ignoreCase: true });
    }
    await page.goto('/projects/ramvatika');
    await page.getByRole('button', { name: 'Open Ramvatika featured image' }).click();
    const viewer = page.getByRole('dialog', { name: 'Ramvatika image viewer' });
    await expect(viewer).toBeVisible();
    await expect.poll(() => viewer.locator('img').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    await page.keyboard.press('ArrowRight');
    await expect(viewer).toContainText('Image 2 of 8');
    await page.keyboard.press('Escape');
    await expect(viewer).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open Ramvatika featured image' })).toBeFocused();
    expect(errors).toEqual([]);
});

test('featured projects, services anchor, and comparison keyboard control work', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.getByAltText('Lush landscape', { exact: true }).evaluate((image: HTMLImageElement) => image.decode());
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toHaveCSS('transform', 'none');
    await page.screenshot({ path: testInfo.outputPath('home.png') });
    const carousel = page.getByRole('region', { name: 'Featured projects' });
    await carousel.focus();
    await page.keyboard.press('ArrowRight');
    await expect(carousel.getByRole('link', { name: 'View Ramvatika', exact: true })).toBeVisible();
    await expect(carousel).toBeFocused();
    const previous = carousel.getByRole('button', { name: 'Previous project' });
    await previous.click();
    await expect(previous).toBeFocused();
    await page.getByRole('link', { name: 'View Jay Baug', exact: true }).click();
    await expect(page).toHaveURL(/\/projects\/jay_baug$/);
    await page.getByRole('link', { name: 'Services', exact: true }).click();
    await expect(page).toHaveURL(/\/#services$/);
    await expect(page.locator('#services')).toBeInViewport();
    const slider = page.getByRole('slider', { name: 'Landscape comparison position' });
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await expect(slider).toHaveValue('51');
});

test('narrow layouts fit and the mobile menu contains focus', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/projects/tej');
    const tiles = page.getByRole('button', { name: /Open Tej gallery image/ });
    for (const tile of await tiles.all()) {
        const bounds = await tile.boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    }
    const open = page.getByRole('button', { name: 'Open menu' });
    await open.click();
    const menu = page.getByRole('dialog', { name: 'Mobile navigation' });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('button', { name: 'Close menu' })).toBeFocused();
    await page.screenshot({ path: testInfo.outputPath('mobile-menu.png') });
    await page.keyboard.press('Shift+Tab');
    await expect(menu.getByRole('link', { name: 'Call Landscapes India' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(menu.getByRole('button', { name: 'Close menu' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(open).toBeFocused();
    await open.click();
    await menu.getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(menu).toHaveCount(0);
    await expect.poll(() => page.locator('body').evaluate(body => body.style.overflow)).toBe('');
    await page.screenshot({ path: testInfo.outputPath('mobile-contact.png') });
});

for (const home of [true, false]) {
    const label = home ? 'homepage' : 'contact';
    test(`${label} inquiry validates and submits once, clearing only on success`, async ({ page }) => {
        let requests = 0;
        let body = '';
        await page.route(endpoint, async route => {
            requests++;
            body = route.request().postData() ?? '';
            await new Promise(resolve => setTimeout(resolve, 300));
            await route.fulfill({ json: { ok: true } });
        });
        await page.goto(home ? '/' : '/contact');
        const form = page.getByRole('form', { name: home ? 'Homepage inquiry' : 'Contact inquiry' });
        await form.getByRole('button', { name: 'Request a conversation' }).click();
        await expect(form).toContainText('Please enter your name.');
        await form.getByLabel('Name *', { exact: true }).fill('   ');
        await form.getByLabel('Email address *', { exact: true }).fill('invalid');
        await form.getByRole('button', { name: 'Request a conversation' }).click();
        await expect(form).toContainText('Please enter a valid email address.');
        expect(requests).toBe(0);
        await fillInquiry(page, home);
        await form.getByRole('button', { name: 'Request a conversation' }).click();
        await expect(form.getByRole('button', { name: 'Sending' })).toBeDisabled();
        await expect(form.getByRole('status')).toHaveText('Thanks! Your message has been sent.');
        await expect(form.getByLabel('Name *', { exact: true })).toHaveValue('');
        expect(requests).toBe(1);
        expect(body).toContain('Test Visitor');
        expect(body).toContain('_gotcha');
        expect(body).toContain(home ? 'Homepage' : 'Contact page');
    });

    for (const failure of ['service', 'network', 'malformed']) {
        test(`${label} inquiry preserves input after ${failure} failure`, async ({ page }) => {
            await page.route(endpoint, route => failure === 'network' ? route.abort() : failure === 'malformed' ? route.fulfill({ status: 200, contentType: 'text/html', body: 'Unexpected response' }) : route.fulfill({ status: 429, json: { errors: [{ message: 'Limit reached' }] } }));
            await page.goto(home ? '/' : '/contact');
            const form = await fillInquiry(page, home);
            await form.getByRole('button', { name: 'Request a conversation' }).click();
            await expect(form.getByRole('alert')).toContainText('Your message could not be sent.');
            await expect(form.getByLabel('Name *', { exact: true })).toHaveValue('Test Visitor');
            await expect(form.getByRole('button', { name: 'Request a conversation' })).toBeEnabled();
        });
    }
}

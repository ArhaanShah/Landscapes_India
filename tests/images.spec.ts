import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

test.beforeEach(async ({ page }) => {
    await page.route('https://fonts.googleapis.com/**', route => route.abort());
    await page.route('https://fonts.gstatic.com/**', route => route.abort());
});

for (const [url, alt, asset] of [
    ['/projects', 'Aneri', 'an1_lg-*.webp'],
    ['/', 'Lush landscape', 'herobg_lg-*.webp'],
    ['/contact', 'Lush tropical leaves', 'leaftexture-*.png'],
    ['/about', 'Premium modern landscape design featuring reflection pool', 'about_banner-*.png'],
]) {
    test(`a transient image failure recovers on ${url}`, async ({ page }) => {
        const requests: { url: string; time: number }[] = [];
        await page.route(`**/assets/${asset}*`, route => {
            requests.push({ url: route.request().url(), time: Date.now() });
            return requests.length === 1 ? route.abort('failed') : route.continue();
        });
        await page.goto(url);
        const image = page.getByAltText(alt, { exact: true });
        await image.locator('..').scrollIntoViewIfNeeded();
        await expect(image.locator('..')).toHaveAttribute('data-image-state', 'loaded');
        expect(requests).toHaveLength(2);
        expect(new URL(requests[1].url).searchParams.has('_image_retry')).toBe(true);
        expect(requests[1].time - requests[0].time).toBeGreaterThanOrEqual(450);
        expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    });
}

test('an invalid image response gets one retry and a stable accessible fallback', async ({ page }, testInfo) => {
    let requests = 0;
    await page.route('**/assets/an1_lg-*.webp*', route => {
        requests++;
        // Reproduce the old deployment's HTML response to an image request.
        return route.fulfill({ status: 200, contentType: 'text/html', body: '<html>Not an image</html>' });
    });
    await page.goto('/projects');
    const image = page.getByAltText('Aneri', { exact: true });
    const frame = image.locator('..');
    await expect(frame).toHaveAttribute('data-image-state', 'error');
    await expect(frame.getByRole('img', { name: 'Aneri — image unavailable' })).toBeVisible();
    const bounds = await frame.boundingBox();
    expect(bounds!.width).toBeGreaterThan(0);
    expect(bounds!.width / bounds!.height).toBeCloseTo(4 / 3, 1);
    await page.waitForTimeout(700);
    expect(requests).toBe(2);
    expect(await frame.locator('button').count()).toBe(0);
    await frame.screenshot({ path: testInfo.outputPath('image-unavailable.png') });
});

test('cached gallery images settle and changing the viewer source cancels its old retry', async ({ page }) => {
    const retries: string[] = [];
    page.on('request', request => {
        if (new URL(request.url()).searchParams.has('_image_retry')) retries.push(request.url());
    });
    await page.goto('/projects/aneri');
    const featured = page.getByRole('button', { name: 'Open Aneri featured image' });
    await expect(featured.locator('.image-frame')).toHaveAttribute('data-image-state', 'loaded');
    await featured.click();
    const viewer = page.getByRole('dialog', { name: 'Aneri image viewer' });
    await expect(viewer.locator('.image-frame')).toHaveAttribute('data-image-state', 'loaded');
    const firstSource = await viewer.locator('img').getAttribute('src');
    // Schedule an error for this mounted image, then replace it before 500 ms.
    await viewer.locator('img').dispatchEvent('error');
    await page.keyboard.press('ArrowRight');
    await expect(viewer).toContainText('Image 2 of 3');
    await expect(viewer.locator('.image-frame')).toHaveAttribute('data-image-state', 'loaded');
    await page.waitForTimeout(700);
    expect(await viewer.locator('img').getAttribute('src')).not.toBe(firstSource);
    expect(retries).toEqual([]);
    await page.keyboard.press('Escape');
    await featured.click();
    await expect(viewer.locator('.image-frame')).toHaveAttribute('data-image-state', 'loaded');
});

test('leaving a page cancels a pending image retry', async ({ page }) => {
    const retries: string[] = [];
    page.on('request', request => {
        if (new URL(request.url()).searchParams.has('_image_retry')) retries.push(request.url());
    });
    await page.goto('/contact');
    const texture = page.getByAltText('Lush tropical leaves');
    await expect(texture.locator('..')).toHaveAttribute('data-image-state', 'loaded');
    await texture.dispatchEvent('error');
    await page.locator('footer').getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page.locator('[data-page="/projects"]')).toHaveCSS('opacity', '1');
    await page.waitForTimeout(700);
    expect(retries).toEqual([]);
});

test('content images decode and retain dimensions while navigating and scrolling', async ({ page }) => {
    test.setTimeout(90000);
    const failed: string[] = [];
    page.on('requestfailed', request => {
        if (request.resourceType() === 'image') failed.push(request.url());
    });
    for (const url of ['/', '/projects', '/about', '/contact', '/projects/arpanbhai', '/projects/ramvatika']) {
        await page.goto(url);
        for (const image of await page.locator('main img').all()) {
            await image.scrollIntoViewIfNeeded();
            await expect(image.locator('..')).toHaveAttribute('data-image-state', 'loaded');
            await image.evaluate((img: HTMLImageElement) => img.decode());
            const bounds = await image.boundingBox();
            expect(bounds!.width).toBeGreaterThan(0);
            expect(bounds!.height).toBeGreaterThan(0);
            await expect.poll(() => image.evaluate(img => {
                let element: Element | null = img;
                while (element) {
                    if (Number(getComputedStyle(element).opacity) === 0) return false;
                    element = element.parentElement;
                }
                return true;
            })).toBe(true);
        }
    }
    expect(failed).toEqual([]);
});

test('the SPA fallback excludes static assets and valid assets keep their image MIME type', async ({ page, request }) => {
    const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
    const pattern = new RegExp(`^${config.rewrites[0].source.replace('/:path(', '/(')}$`);
    for (const path of ['/', '/about', '/contact', '/projects/aneri', '/missing-page']) expect(pattern.test(path)).toBe(true);
    for (const path of ['/assets/missing.webp', '/assets/missing.png', '/assets/missing.js', '/favicon.svg']) expect(pattern.test(path)).toBe(false);
    await page.goto('/projects');
    const source = await page.getByAltText('Aneri', { exact: true }).getAttribute('src');
    for (const url of [source!, `${source}?_image_retry=verification`]) {
        const response = await request.get(url);
        expect(response.ok()).toBe(true);
        expect(response.headers()['content-type']).toMatch(/^image\/webp/);
    }
});

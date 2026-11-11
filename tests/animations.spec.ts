import { test, expect } from '@playwright/test';
import type { Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('https://fonts.googleapis.com/**', route => route.abort());
    await page.route('https://fonts.gstatic.com/**', route => route.abort());
});

const scale = (image: Locator) => image.evaluate(element => {
    const transform = getComputedStyle(element).transform;
    return transform === 'none' ? 1 : new DOMMatrixReadOnly(transform).a;
});

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
test.describe(`hovers with motion preference: ${reducedMotion}`, () => {
    test.use({ reducedMotion });

    test('original two-stroke drawing and withdrawal remain opaque', async ({ page, isMobile }, testInfo) => {
        test.skip(isMobile, 'Mouse hover requires a device with a mouse.');
        test.setTimeout(60000);
        await page.goto('/projects');
        const frames = page.locator('main [class~="group/project"]');
        // The first three projects cover all three project-stroke colors.
        for (const index of [0, 1, 2]) {
            const frame = frames.nth(index);
            const image = frame.locator('img');
            const layers = frame.locator('.project-svg-stroke');
            const paths = layers.locator('path');
            const offsets = () => paths.evaluateAll(elements => elements.map(path => Number.parseFloat(getComputedStyle(path).strokeDashoffset)));
            await frame.scrollIntoViewIfNeeded();
            await expect(frame.locator('..')).toHaveCSS('opacity', '1');
            await image.evaluate((img: HTMLImageElement) => img.decode());
            await page.mouse.move(0, 0);
            const hiddenOffsets = await offsets();
            expect(hiddenOffsets.length).toBe(2);
            expect(hiddenOffsets.every(offset => offset > 1000)).toBe(true);
            await frame.screenshot({ path: testInfo.outputPath(`project-${index}-idle.png`) });

            await frame.hover();
            await expect.poll(async () => (await offsets()).every((offset, i) => offset > 0 && offset < hiddenOffsets[i])).toBe(true);
            await frame.screenshot({ path: testInfo.outputPath(`project-${index}-drawing.png`) });
            await expect.poll(offsets).toEqual([0, 0]);
            await expect.poll(() => paths.evaluateAll(elements => elements.map(path => path.getAttribute('stroke-width')))).toEqual(['700', '700']);
            const overlayZ = await frame.locator('a > div').first().evaluate(element => Number(getComputedStyle(element).zIndex));
            for (const layer of await layers.all()) {
                expect(await layer.evaluate(element => Number(getComputedStyle(element).zIndex))).toBeGreaterThan(overlayZ);
                await expect(layer).toHaveCSS('opacity', '1');
            }
            await frame.screenshot({ path: testInfo.outputPath(`project-${index}-drawn.png`) });
            await page.mouse.move(0, 0);
            await expect.poll(offsets).toEqual(hiddenOffsets);
            await expect.poll(() => paths.evaluateAll(elements => elements.map(path => path.getAttribute('stroke-width')))).toEqual(['200', '200']);
            await frame.screenshot({ path: testInfo.outputPath(`project-${index}-withdrawn.png`) });
        }
    });

    test('project focus and interrupted hovers restore the photo', async ({ page, isMobile }) => {
        await page.goto('/projects');
        const frame = page.locator('main [class~="group/project"]').first();
        const paths = frame.locator('.project-svg-stroke path');
        const offsets = () => paths.evaluateAll(elements => elements.map(path => Number.parseFloat(getComputedStyle(path).strokeDashoffset)));
        await frame.scrollIntoViewIfNeeded();
        await page.mouse.move(0, 0);
        const hiddenOffsets = await offsets();
        await frame.getByRole('link').focus();
        await expect.poll(offsets).toEqual([0, 0]);
        await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link').first().focus();
        await expect.poll(offsets).toEqual(hiddenOffsets);
        if (!isMobile) {
            await frame.hover();
            await page.mouse.move(0, 0);
            await frame.hover();
            await page.mouse.move(0, 0);
            await expect.poll(offsets).toEqual(hiddenOffsets);
        }
    });

    test('contact texture animates when interacting with the form', async ({ page, isMobile }, testInfo) => {
        await page.goto('/contact');
        const image = page.getByAltText('Lush tropical leaves');
        const email = page.getByRole('form', { name: 'Contact inquiry' }).getByLabel('Email address *', { exact: true });
        await page.mouse.move(0, 0);
        await expect.poll(() => scale(image)).toBe(1);
        if (!isMobile) {
            await email.hover();
            await expect.poll(() => scale(image)).toBeCloseTo(1.05, 3);
            await page.mouse.move(0, 0);
            await expect.poll(() => scale(image)).toBe(1);
        }
        await email.focus();
        await expect.poll(() => scale(image)).toBeCloseTo(1.05, 3);
        await page.locator('[class~="group/contact"]').screenshot({ path: testInfo.outputPath('contact-texture.png') });
        await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link').first().focus();
        await expect.poll(() => scale(image)).toBe(1);
    });
});
}

test.describe('motion enabled', () => {
    test.use({ reducedMotion: 'no-preference' });

    test('page fades preserve the outgoing scroll and reset the incoming page', async ({ page }) => {
        await page.goto('/projects');
        const contact = page.locator('footer').getByRole('link', { name: 'Contact', exact: true });
        await contact.scrollIntoViewIfNeeded();
        const { frames, fades } = await contact.evaluate(async link => {
            const frames: { path: string | null; scroll: number }[] = [];
            const fades: { path: string | null; opacity: string[]; duration: number }[] = [];
            const animate = Element.prototype.animate;
            // Record the browser's animations: a busy renderer can skip every
            // sampled frame of the short exit fade while the compositor runs it.
            Element.prototype.animate = function (keyframes, options) {
                const animation = animate.call(this, keyframes, options);
                if (this.hasAttribute('data-page')) {
                    const effect = animation.effect as KeyframeEffect;
                    fades.push({
                        path: this.getAttribute('data-page'),
                        opacity: effect.getKeyframes().map(frame => String(frame.opacity)),
                        duration: Number(effect.getTiming().duration),
                    });
                }
                return animation;
            };
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
            const start = performance.now();
            while (performance.now() - start < 10000) {
                const pageElement = document.querySelector('[data-page]');
                if (pageElement) frames.push({
                    path: pageElement.getAttribute('data-page'),
                    scroll: window.scrollY,
                });
                if (pageElement?.getAttribute('data-page') === '/contact' && getComputedStyle(pageElement).opacity === '1') break;
                await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
            }
            Element.prototype.animate = animate;
            return { frames, fades };
        });
        const outgoing = frames.filter(frame => frame.path === '/projects');
        const incoming = frames.filter(frame => frame.path === '/contact');
        expect(outgoing.length).toBeGreaterThan(0);
        expect(fades.some(fade => fade.path === '/projects' && fade.opacity.at(-1) === '0' && fade.duration > 0)).toBe(true);
        expect(outgoing.every(frame => frame.scroll > 0)).toBe(true);
        expect(incoming.length).toBeGreaterThan(0);
        expect(fades.some(fade => fade.path === '/contact' && fade.opacity.at(-1) === '1' && fade.duration > 0)).toBe(true);
        expect(incoming.every(frame => frame.scroll === 0)).toBe(true);
        await expect(page.locator('[data-page="/contact"]')).toHaveCSS('opacity', '1');

        await page.goBack();
        await expect(page.locator('[data-page="/projects"]')).toHaveCSS('opacity', '1');
        await page.goForward();
        await expect(page.locator('[data-page="/contact"]')).toHaveCSS('opacity', '1');
        await page.getByRole('link', { name: 'Services', exact: true }).click();
        await expect(page.locator('[data-page="/"]')).toHaveCSS('opacity', '1');
        await expect(page.locator('#services')).toBeInViewport();
        await expect(page.getByRole('navigation', { name: 'Main navigation' })).toHaveCSS('top', '0px');
    });
});

test('reduced motion still disables automatic rotation and keeps page navigation usable', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('link', { name: 'Services', exact: true }).click();
    await expect(page.locator('[data-page="/"]')).toHaveCSS('opacity', '1');
    await expect(page.getByRole('button', { name: 'Automatic rotation off (reduced motion)' })).toBeDisabled();
});

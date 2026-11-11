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

test.describe('motion enabled', () => {
    test.use({ reducedMotion: 'no-preference' });

    test('project strokes remain visible above the overlay and reverse on leave', async ({ page, isMobile }, testInfo) => {
        test.skip(isMobile, 'Mouse hover requires a device with a mouse.');
        await page.goto('/projects');
        const image = page.locator('main a img').first();
        const card = image.locator('xpath=../../..');
        const layers = card.locator('.project-svg-stroke');
        const paths = layers.locator('path');
        const offsets = () => paths.evaluateAll(elements => elements.map(path => Number.parseFloat(getComputedStyle(path).strokeDashoffset)));
        await image.scrollIntoViewIfNeeded();
        await expect(card).toHaveCSS('opacity', '1');
        const hiddenOffsets = await offsets();
        expect(hiddenOffsets.every(offset => offset > 1000)).toBe(true);

        // Hovering the caption must drive the same effect as hovering the image.
        await card.getByRole('heading').hover();
        await expect.poll(offsets).toEqual([0, 0]);
        const overlayZ = await image.locator('xpath=preceding-sibling::div').evaluate(element => Number(getComputedStyle(element).zIndex));
        for (const layer of await layers.all()) {
            expect(await layer.evaluate(element => Number(getComputedStyle(element).zIndex))).toBeGreaterThan(overlayZ);
            await expect(layer).toHaveCSS('opacity', '0.18');
        }
        await page.screenshot({ path: testInfo.outputPath('project-hover.png') });
        await page.mouse.move(0, 0);
        await expect.poll(offsets).toEqual(hiddenOffsets);

        // Keyboard users get the same animation, including when focus moves within the card.
        const links = card.getByRole('link');
        await links.first().focus();
        await expect.poll(offsets).toEqual([0, 0]);
        await links.last().focus();
        await expect.poll(offsets).toEqual([0, 0]);
        await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).focus();
        await expect.poll(offsets).toEqual(hiddenOffsets);

        // Interrupting an animation must still restore the original image.
        await card.getByRole('heading').hover();
        await page.mouse.move(0, 0);
        await card.getByRole('heading').hover();
        await page.mouse.move(0, 0);
        await expect.poll(offsets).toEqual(hiddenOffsets);
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
        await page.screenshot({ path: testInfo.outputPath('contact-texture.png') });
        await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link').first().focus();
        await expect.poll(() => scale(image)).toBe(1);
    });

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

test('reduced motion keeps hover content and navigation usable without zooming', async ({ page, isMobile }) => {
    await page.goto('/projects');
    await expect(page.locator('.project-svg-stroke').first()).toBeHidden();
    const image = page.locator('main a img').first();
    if (!isMobile) await image.hover();
    await expect.poll(() => scale(image)).toBe(1);
    await page.locator('footer').getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page.locator('[data-page="/contact"]')).toHaveCSS('opacity', '1');
    const texture = page.getByAltText('Lush tropical leaves');
    await page.getByRole('form', { name: 'Contact inquiry' }).getByLabel('Email address *', { exact: true }).focus();
    await expect.poll(() => scale(texture)).toBe(1);
});

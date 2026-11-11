# Landscapes India

A personal landscape design portfolio demo built with React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and GSAP.

## Development

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Routes: `/`, `/projects`, `/projects/:projectId`, `/about`, and `/contact`. Unknown URLs show a fallback page.

## Inquiry configuration

Copy `.env.example` to `.env.local` and set `VITE_FORMSPREE_ENDPOINT` to your public Formspree form address. Restart Vite after editing it. Without a valid endpoint, both forms show direct contact alternatives and disable submission. Set the same variable in Vercel and rebuild when it changes. Never put a private key or password in a `VITE_` variable.

Both forms validate input, prevent duplicate submissions, preserve entries on errors, and clear after service acceptance. The displayed email/phone details should belong to the person receiving inquiries.

## Checks

```sh
npm run check:assets
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests cover desktop/mobile navigation, galleries, responsive layout, configured/unconfigured forms, project and contact hovers, and page fades with normal and reduced motion. Requests to the test Formspree endpoint are mocked. Dedicated test builds are stored in `.test-dist/`; production output is `dist/`.

On Windows, check the installed Chrome and Edge browsers with `npx playwright test --config playwright.windows.config.ts`. The hover checks capture idle, drawing, completed, and withdrawn strokes for each project color, including with reduced motion enabled. These two user-triggered hovers always animate; page transitions and automatic testimonial rotation continue to respect reduced motion.

Content images retry one failed request after 500 ms, then show an accessible placeholder if recovery fails. Image checks cover failed/invalid responses, cached images, navigation during a retry, gallery source changes, and loading while scrolling. Vercel's SPA fallback excludes `/assets/` and `/favicon.svg`; verify missing-asset 404s on a Vercel preview before release, since Vite's local preview does not use Vercel routing.

GitHub Actions repeats the checks on a clean Linux checkout. WebP project photos must be included in Git; local JPEG originals are ignored. `src/data/projects.ts` supplies project data, and `src/components/InquiryForm.tsx` supplies both forms.

## Deployment

The repository includes Vercel settings for Vite, reproducible installs, and SPA deep links. See [deployment and Orderbox DNS instructions](docs/Deployment.md) for account setup, Formspree activation, deployment validation, and safe custom-domain configuration.

This is a personal hobby demo with clearly labelled sample content. Vercel Hobby is restricted to non-commercial use. No backend, database, or paid subscription is required.

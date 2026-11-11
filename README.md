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

GitHub Actions repeats the checks on a clean Linux checkout. WebP project photos must be included in Git; local JPEG originals are ignored. `src/data/projects.ts` supplies project data, and `src/components/InquiryForm.tsx` supplies both forms.

## Deployment

The repository includes Vercel settings for Vite, reproducible installs, and SPA deep links. See [deployment and Orderbox DNS instructions](docs/Deployment.md) for account setup, Formspree activation, deployment validation, and safe custom-domain configuration.

This is a personal hobby demo with clearly labelled sample content. Vercel Hobby is restricted to non-commercial use. No backend, database, or paid subscription is required.

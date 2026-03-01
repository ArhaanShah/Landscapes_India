# Landscapes India Website

A responsive marketing website for a landscaping and outdoor design business.

The project focuses on showcasing featured landscape projects, explaining the design/build process, and converting visitors through a contact flow.

## Highlights

- Landing page with modular sections (hero, value strip, projects carousel, process timeline, testimonials, CTA)
- Projects listing and project detail pages
- Contact page with a validated inquiry form UI
- Mobile-first responsive layout using Tailwind CSS
- React Router based navigation with scroll-to-top behavior

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React icons
- ESLint

## Routes

- `/` → Landing page
- `/projects` → Projects listing
- `/projects/:projectId` → Project details
- `/contact` → Contact & inquiry form

## Project Structure

```text
Landscapes_India/
├─ docs/                         # Architecture, setup notes, design references, user stories
├─ src/
│  ├─ components/
│  │  └─ home/                   # Home page section components
│  ├─ content/                   # Static content assets by page
│  ├─ data/                      # Data models (e.g., projects)
│  ├─ pages/                     # Route-level pages
│  ├─ App.tsx                    # App routes
│  └─ main.tsx                   # App entrypoint
├─ index.html
├─ tailwind.config.js
├─ vite.config.ts
└─ package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL shown in terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — type-check and create production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint checks

## Editing Content

- Home page composition: `src/pages/LandingPage.tsx`
- Contact page form UI/validation: `src/pages/ContactUs.tsx`
- Project data source: `src/data/projects.ts`
- Home section components: `src/components/home/*`

If you are adding new projects, keep slugs and IDs stable to avoid breaking project detail links.

## Roadmap (from product docs)

- Sprint 1 (MVP): launch-ready static site with landing, projects, project details, about/contact, and inquiry flow
- Sprint 2: CMS-ready content structure, spam protection, SEO basics, analytics, media optimization
- Sprint 3: CMS integration, access control, media management, backups/audit support
- Sprint 4: performance tuning, cross-browser QA, automated tests, stronger loading/error states

## Deployment

This project builds as a static site.

```bash
npm run build
```

Deploy the generated `dist/` folder to your static hosting provider (for example: Vercel, Netlify, Cloudflare Pages, or S3 + CDN).

## Notes

- Current contact form submission is front-end only (ready for backend/email integration).
- Keep visual tokens and styles consistent with the existing Tailwind/theme setup.


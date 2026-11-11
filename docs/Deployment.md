# Deploy to Vercel and connect your Orderbox domain

This is a personal hobby demo. Vercel Hobby is limited to personal, non-commercial use: https://vercel.com/docs/plans/hobby. No paid services are required by this setup.

## 1. Verify and publish the source

Use Node.js 24 (`.nvmrc` and `package.json` agree):

```sh
npm ci
npm run check:assets
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The asset check includes new, unignored files before committing. Include every new file shown by `git status`, especially the 38 WebP project photos. JPEG originals remain local and ignored. Commit the reviewed changes and push to the existing repository, `ArhaanShah/Landscapes_India`. GitHub Actions repeats checks from a clean checkout on pushes and pull requests.

Browser tests build isolated configured and unconfigured versions under `.test-dist/`, mock Formspree requests, and never send real messages. `dist/` remains the production build.

## 2. Activate Formspree

1. Create a free account at https://formspree.io and create one form.
2. Set and verify the recipient email you control. The email displayed on the demo site is `landscapesindia2015@gmail.com`; verify it or update the displayed contact details to match your chosen recipient.
3. Copy the public endpoint, such as `https://formspree.io/f/abcdefgh`. This is a form address, not an account credential.
4. For local use, copy `.env.example` to `.env.local`, replace the placeholder, and restart Vite.
5. For deployment, add `VITE_FORMSPREE_ENDPOINT` in Vercel's environment settings for Production and Preview, then redeploy. Vite embeds this public setting at build time.

Both inquiry forms use this endpoint. Without a valid endpoint, submission is disabled and visitors see email/phone alternatives. No SMTP password or private API key belongs in any `VITE_` variable.

The free tier currently starts at 50 submissions per month: https://help.formspree.io/articles/account-management/account-limits. Review the dashboard allowance and any spam/CAPTCHA settings. A success message means the service accepted the submission; confirm inbox delivery during the real launch test.

## 3. Create your Vercel project

1. Create your account at https://vercel.com/signup using GitHub.
2. Choose **Add New → Project** and authorize access to `ArhaanShah/Landscapes_India`.
3. Import that repository. Keep the root directory at the repository root and select **Vite**. Use Node.js **24.x** in project settings.
4. `vercel.json` supplies `npm ci`, `npm run build`, `dist`, and the SPA rewrite. Do not enable `cleanUrls` alongside the current rewrite.
5. Add the Formspree environment setting, then deploy. Check the resulting `*.vercel.app` URL before changing DNS.
6. Open `/contact` and `/projects/ramvatika` directly, refresh both, check image loading and mobile navigation, and submit one clearly marked test inquiry. Verify it appears in Formspree and the verified recipient's inbox.

Reference: https://vercel.com/docs/frameworks/frontend/vite

## 4. Connect the domain in Orderbox

The exact domain name has not yet been supplied. Keep its existing registrar, nameservers, and DNS provider. Orderbox may be managed through a reseller's dashboard; use the DNS management area for this domain, not a domain transfer.

1. Inspect the current DNS records and save their values before editing. Confirm that this dashboard manages the domain's authoritative nameservers.
2. In Vercel **Project → Settings → Domains**, add both the root domain and `www` hostname. Use `www` as primary and redirect the root domain to it.
3. Copy the exact records Vercel displays. Typical records are:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` or the root hostname | Exact root-domain address supplied by Vercel |
| CNAME | `www` | Exact project-specific target supplied by Vercel |
| TXT, if requested | Exact verification host | Exact ownership value supplied by Vercel |

4. In Orderbox DNS management, update only the web records that conflict with those hostnames. Preserve MX, SPF, DKIM, DMARC, other TXT records, and unrelated subdomains. A CNAME cannot coexist with other records at the same hostname.
5. Wait for Vercel to report valid configuration and provision HTTPS. Use its domain diagnostics if verification is delayed; do not substitute guessed IP addresses or change nameservers.
6. Confirm that HTTPS loads at `www`, the root hostname redirects to `www`, and deep links refresh correctly. If there are existing CAA restrictions or conflicting AAAA records, inspect Vercel's exact diagnosis before changing them.

Reference: https://vercel.com/docs/domains/set-up-custom-domain

## Dependency maintenance

The lockfile includes compatible security updates. A scoped npm override selects patched `minimatch` 11.0.1+ for `@typescript-eslint/typescript-estree`, whose current release still requests the affected 10.x line. Node.js 24 satisfies the patched package requirements. Remove this override when the upstream dependency adopts a patched release. Advisory: https://github.com/advisories/GHSA-g3hv-75wg-m249

## Handoff and rollback

Account creation, recipient verification, the public form endpoint, and the exact domain/DNS records are the remaining user inputs. Passwords and account tokens should not be pasted into chat or committed. Use provider login screens for authorization.

After deployment, watch Vercel build status and Formspree usage/delivery. Keep auto-upgrades and paid subscriptions off unless separately approved. To roll back an application release, promote the last working deployment in Vercel. If a DNS cutover fails, restore only the saved web records changed during that cutover.

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

Deferred at the owner's request. Leave `VITE_FORMSPREE_ENDPOINT` unset for the initial deployment; both forms will show email/phone alternatives. Complete this section only when online inquiries are wanted.

1. Create a free account at https://formspree.io and create one form.
2. Set and verify the recipient email you control. The email displayed on the demo site is `landscapesindia2015@gmail.com`; verify it or update the displayed contact details to match your chosen recipient.
3. Copy the public endpoint, such as `https://formspree.io/f/abcdefgh`. This is a form address, not an account credential.
4. For local use, copy `.env.example` to `.env.local`, replace the placeholder, and restart Vite.
5. For deployment, add `VITE_FORMSPREE_ENDPOINT` in Vercel's environment settings for Production and Preview, then redeploy. Vite embeds this public setting at build time.

Both inquiry forms use this endpoint. Without a valid endpoint, submission is disabled and visitors see email/phone alternatives. No SMTP password or private API key belongs in any `VITE_` variable.

The free tier currently starts at 50 submissions per month: https://help.formspree.io/articles/account-management/account-limits. Review the dashboard allowance and any spam/CAPTCHA settings. A success message means the service accepted the submission; confirm inbox delivery during the real launch test.

## 3. Create your Vercel project

The initial deployment is now available at https://landscapes-india.vercel.app/. Use its existing project for domain setup; do not create a second project. The setup steps below are retained for reference.

1. The Vercel account has been created. Sign in at https://vercel.com using that account.
2. Choose **Add New â†’ Project** and authorize access to `ArhaanShah/Landscapes_India`.
3. Import that repository. Keep the root directory at the repository root and select **Vite**. Use Node.js **24.x** in project settings.
4. `vercel.json` supplies `npm ci`, `npm run build`, `dist`, and the SPA rewrite. Do not enable `cleanUrls` alongside the current rewrite.
5. Leave the Formspree environment setting unset for now, then deploy. Check the resulting `*.vercel.app` URL before changing DNS.
6. Open `/contact` and `/projects/ramvatika` directly, refresh both, and check image loading and mobile navigation. Confirm that inquiry forms show direct contact alternatives. When Formspree is activated later, send one clearly marked test inquiry and verify it appears in Formspree and the verified recipient's inbox.

Reference: https://vercel.com/docs/frameworks/frontend/vite

## 4. Custom domain: connected

The production address is https://www.landscapesindia.com/. The root address, https://landscapesindia.com/, redirects to it with HTTP 308. The initial deployment remains at https://landscapes-india.vercel.app/.

Verified on 11 November 2026: Google and Cloudflare public DNS both return the intended configuration. Direct connections to Vercel with certificate verification enabled confirmed valid HTTPS certificates for both custom hostnames, an HTTP 308 redirect from the root domain, and HTTP 200 from `www`.

The domain remains registered through Orderbox and now uses its activated DNS service with these four nameservers:

```text
doma733866.mars.orderbox-dns.com
doma733866.earth.orderbox-dns.com
doma733866.venus.orderbox-dns.com
doma733866.mercury.orderbox-dns.com
```

The former `ns7.indiawebhosting.com` / `ns8.indiawebhosting.com` assignment returned refused queries. Replacing that assignment with the DNS Management service's required list resolved the public DNS failure. No further nameserver changes are needed for this deployment.

The web records configured in **Manage DNS** are:

| Type | Host Name in Orderbox | Destination / Value |
| --- | --- | --- |
| A | Leave blank for the root domain | `216.198.79.1` |
| CNAME | `www` | `a3a588dc573253a9.vercel-dns-017.com.` |

Keep the provider's default TTL. These values came from the project's Vercel Domains settings and were confirmed by public DNS. If Vercel later changes a recommendation, use its current project settings. Preserve unrelated DNS and email records when maintaining the zone.

On Vercel, `www.landscapesindia.com` is assigned to Production and `landscapesindia.com` redirects to it. HTTPS is automatically provisioned and renewed by Vercel.

If a device still reports a DNS error immediately after activation, its local or upstream resolver may have cached the earlier failure. Try a separate network, such as mobile data. On Windows, `ipconfig /flushdns` clears the local DNS cache; fully restart the browser afterward. This does not clear a cache held by the ISP's resolver, which must expire separately. Do not repeatedly change working DNS records to address cached responses.

References:

- https://vercel.com/docs/domains/set-up-custom-domain
- https://vercel.com/docs/domains/working-with-ssl
- https://manage.resellerclub.com/kb/servlet/KBServlet/faq580.html
- https://manage.es.resellerclub.com/kb/servlet/KBServlet/faq471.html

## Dependency maintenance

The lockfile includes compatible security updates. A scoped npm override selects patched `minimatch` 11.0.1+ for `@typescript-eslint/typescript-estree`, whose current release still requests the affected 10.x line. Node.js 24 satisfies the patched package requirements. Remove this override when the upstream dependency adopts a patched release. Advisory: https://github.com/advisories/GHSA-g3hv-75wg-m249

## Handoff and rollback

The Vercel deployment, custom-domain DNS, HTTPS certificates, and canonical redirect are verified. Formspree activation is deferred; the forms continue to offer direct email/phone alternatives. Passwords and account tokens should not be pasted into chat or committed. Use provider login screens for authorization.

After deployment, watch Vercel build status and Formspree usage/delivery. Keep auto-upgrades and paid subscriptions off unless separately approved. To roll back an application release, promote the last working deployment in Vercel. If a DNS cutover fails, restore only the saved web records changed during that cutover.

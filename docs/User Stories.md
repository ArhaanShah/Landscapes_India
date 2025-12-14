# User Stories

---

## Sprint 1: Launch Ready Static Site (MVP)

**Focus**: Build a fast, responsive static site with Landing, Projects, About, Contact us, Navigation Header, Inquiry form to send a mail, Footer.

1. **Landing Page** (Very High)

   - *User story:* As a visitor, I want to see a clear homepage that explains what the website does, so that I quickly know the services offered.
   - *Acceptance criteria:* Hero section (maybe with one-line value prop ?); Call-to-Action to Projects/Contact us/Inquiry form; A few featured projects displayed; Header + footer.

2. **Projects listing page** (Very High)

   - *User story:* As a visitor, I want a Projects listing page, so that I can browse previous projects.
   - *Acceptance criteria:* Grid/list/slideshow of project cards (image + title); Lazy loading if too many projects; Cards link to corresponding project details pages.

3. **Project details page** (High)

   - *User story:* As a visitor, I want a Project details page, so that I can view all project images and other details.
   - *Acceptance criteria:* Title, metadata like year, location, etc; image gallery with lightbox; detailed description; stable slug URL; navigation to return to project list.

4. **About page** (High)

   - *User story:* As a visitor, I want an About page so that I can learn more about the firm and its approach to know if we are a good fit.
   - *Acceptance criteria:* Short bio + picture of CEO; mission/approach; (maybe team photos or credentials ?); contact link.

5. **Contact us page + simple form** (High)

   - *User story:* As a visitor, I want a Contact page with a simple form (name, email, phone, message), so I can request a quote.
   - *Acceptance criteria:* Fields: valid name, valid email, optional phone, optional message; (set endpoint to send email but implement that functionality later); confirmation shown for successful submission.

6. **Responsive & mobile-friendly UI** (High)

   - *User story:* As a visitor on mobile or desktop, I want the site layout to be responsive, so the site is usable on any device.
   - *Acceptance criteria:* Layout adapts; readable text; big clickable buttons on mobile; fast site loading (lighthouse mobile performance target 70+).

7. **Accessible navigation & semantic HTML** (Medium)

   - *User story:* As a visitor, I want accessible navigation so that the site is usable for everyone.
   - *Acceptance criteria:* Aria labels; alt text to images; keyboard navigation; (maybe semantic tags?).

8. **Contact submission delivery** (Medium)

   - *User story:* As an admin, I want contact form submissions emailed to the business's email inbox, so that leads don’t get lost.
   - *Acceptance criteria:* Email delivered to configured inbox; basic logging of submissions for recovery (store a minimal record of each submission like name, email, timestamp for 30 days).

---

## Sprint 2: CMS prep & operational improvements

**Focus**: Prepare site structure for later CMS (Content Management System) integration, add monitoring, spam protection (low friction), SEO (Search Engine Optimization) and refresh hooks.

9. **Structured content files (CMS prep)** (High)

   - *User story:* As an editor, I want content stored in structured files (MD/JSON) with metadata, so that I can later edit them easily.
   - *Acceptance criteria:* Projects in `/content/projects/*.md` or `/content/projects/*.json` with fields: title, slug, date, location, description, images, etc.

10. **Spam protection** (Medium)

    - *User story:* As an admin, I want spam protection on forms with minimal friction, so that real users don't need to go through extra steps but the site is still protected.
    - *Acceptance criteria:* Implement invisible honeypot field; server-side validation to reject honeypot-filled submissions; (maybe reCAPTCHA v3 if it doesnt work well ?).

11. **SEO basics** (High)

    - *User story:* As an admin, I want basic SEO improvements, so that search engines can index the site.
    - *Acceptance criteria:* `sitemap.xml` generated; `robots.txt` present; meta title/description and OpenGraph tags on each page.

12. **Analytical tracking** (Medium)

    - *User story:* As an admin, I want analytics installed (privacy friendly), so I can measure traffic.
    - *Acceptance criteria:* Google Analytics integrated; minimal cookie handling implemented as required.

13. **Site refresh** (Low)

    - *User story:* As an admin, I want the site to rebuild automatically whenever new content is published in the CMS so that its up to date.
    - *Acceptance criteria:* Vercel deploy hook is set up; secret URL stored in `.env`; CMS triggers the hook on publish.

14. **Media optimization** (Very High)

    - *User story:* As a visitor, I want responsive images, so that pages load faster.
    - *Acceptance criteria:* Use framework image components so different image sizes are used for different screen sizes; lazy loading; generate multiple sizes/formats; ensure page doesn't jump when loading.

---

## Sprint 3: CMS integration + Security

**Focus**: Integration of CMS, simple authentication, media management, backups, and admin protection.

15. **CMS configuration** (Very High)

    - *User story:* As an editor, I want to add/edit projects via a CMS UI, so that I can update the portfolio.
    - *Acceptance criteria:* CMS configured with schema matching metadata for projects; publishing triggers the site refresh deploy hook.

16. **Authentication & Access Control** (Very High)

    - *User story:* As an admin, I want a simple authentication method so that I can edit but unauthorized people can't.
    - *Acceptance criteria:* Admin UI accessible via private URL  only; Not linked from public site (hidden); public signup disabled; HTTPS enforced; login only permitted for whitelisted emails; (maybe necessary 2FA? )

17. **CMS media management** (Very High)

    - *User story:* As an editor, I want to easily upload and manage project images inside the CMS.
    - *Acceptance criteria:* CMS image storage is set up; the site uses the image URLs provided by the CMS; images load in the right size automatically.

18. **Content backups & audit logs** (High)

    - *User story:* As an admin, I want audit logs and backups of content, so I can recover accidental changes.
    - *Acceptance criteria:* CMS audit logs enabled; periodic backup or Git history preserved; clear recovery procedure.

---

## **Sprint 4: Testing & Optimization**

**Focus:** Ensure performance, compatibility and consistency for different scenarios.

19. **Performance optimization** (High)
    - *User story:* As a visitor, I want fast load times even on slow mobile networks.
    - *Acceptance criteria:* Implement code splitting and tree shaking; set performance budget/size limit for bundles; lazy load non critical stuff;

20. **Cross-browser testing** (High)
    - *User story:* As an admin, I want the site to work across supported browsers, so that visitors have a consistent experience.
    - *Acceptance criteria:* Test and confirm layout and interactions on Chrome, Firefox, Safari, and mobile browsers; (maybe polyfills included if necessary?)

21. **Automated tests (unit/integration/E2E)** (Very High)
    - *User story:* As a developer, I want automated tests so that critical flows keep working during changes.
    - *Acceptance criteria:* Unit tests for key UI components; integration tests for Projects list + CMS flow; End to end test for contact form submission; tests run in CI.

22. **Error states & UX for slow/failing networks** (Medium)
    - *User story:* As a visitor, I want clear loading indicators and helpful error messages when things fail, so that I understand what happened and what to do next.
    - *Acceptance criteria:* Use skeletons for image heavy pages; display error messages if form submission fails with retry guidance; fallback UI for missing images.

---
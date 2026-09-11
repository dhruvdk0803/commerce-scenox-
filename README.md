# Scenox Commerce — commerce.scenoxstudios.com

Production marketing site for Scenox Commerce (part of Scenox Studios): ecommerce catalog operations. Messy product data in, structured store-ready catalogs out, on Shopify, WooCommerce and custom platforms.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 with a token-based theme in `src/app/globals.css`
- `motion/react` for UI motion (opacity/transform only, custom ease-out curves, reduced-motion aware)
- Geist Sans / Geist Mono via `next/font`
- Lucide icons (used sparingly)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

Copy `.env.example` to `.env.local` to configure the lead webhook and analytics IDs.

## Structure

```
src/app/                     routes (one folder per page) + sitemap.ts, robots.ts, api/lead
src/components/ui/           primitives: Button, Section, Eyebrow/Tag, Reveal, Status, Accordion, Wordmark
src/components/layout/       Header (services dropdown, condensing sticky), MobileNav, Footer, StickyMobileCTA
src/components/home/         homepage sections; pipeline/ holds the animated hero system
src/components/pages/        page-specific visual modules (ProcessExplorer, CleanupDiff, MigrationFlow, …)
src/components/forms/        LeadForm (4-step), SampleForm, field primitives, option lists
src/content/                 copy data: pricing tiers, FAQs, service examples
src/lib/                     site config, SEO helpers, analytics hooks, lead validation/forwarding
```

## Routes

`/` · `/catalog` (ads landing) · `/sample` (cold outbound) · `/catalog-cleanup` · `/migration` · `/wholesale-catalog` · `/how-it-works` · `/pricing` · `/case-studies` · `/about` · `/contact` · `/get-started` · `/data-handling` · `/privacy` · `/terms`

`/dev/[section]` renders a single homepage section for visual QA. It 404s in production.

## Leads and form delivery

All three forms (Get Started, Send 10 Products, Contact) post to `POST /api/lead`, validated in `src/lib/leads.ts`. Phone is required on every form. Each submission is:

1. **Logged** server-side (always).
2. **Emailed** to you via [Resend](https://resend.com) when `RESEND_API_KEY` and `LEAD_TO_EMAIL` are set. The visitor's address is set as Reply-To, so replying to the notification replies to them. Sample files (≤ 5 MB) arrive as attachments.
3. **Forwarded** as JSON to `LEAD_WEBHOOK_URL` when set (Zapier, Make, Slack, Google Sheets, any CRM).

Email setup, choose one:

- **Google Workspace SMTP (no DNS changes).** In the Workspace mailbox that will send, enable 2-Step Verification and create an App Password (myaccount.google.com/apppasswords). Copy `.env.example` to `.env.local`, set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER` to that mailbox, `SMTP_PASS` to the app password, and `LEAD_TO_EMAIL` to where notifications should land (comma-separated for several). Add the same variables on your host (Vercel → Project → Settings → Environment Variables). Workspace allows roughly 2,000 sends a day per mailbox, far more than a lead form needs.
- **Resend on a subdomain.** If you would rather not use an app password, add `notify.scenoxstudios.com` as a sending domain in Resend. Its SPF/DKIM records apply only to that subdomain and do not affect Workspace mail on the root domain. Set `RESEND_API_KEY` and `LEAD_FROM_EMAIL="Scenox Commerce <leads@notify.scenoxstudios.com>"` and leave `SMTP_HOST` empty.

No store credentials are ever requested; notes containing password/key patterns are rejected.

## Analytics

`src/lib/analytics.ts` exposes `track()` for UI events and `trackConversion()` which is the only place a `Lead` / `generate_lead` event fires, after a confirmed successful submission. Wire GA4 / Meta Pixel scripts in `src/app/layout.tsx` when IDs are available.

## Content rules baked in

- The 48-hour claim is always paired with the eligibility qualifier.
- No fabricated testimonials, logos, stats or certifications. Proof modules are labelled as sample workflows until real case studies exist (`CaseStudy` type in `ProofModule.tsx` is ready for them).
- Pricing is shown as public starting prices; final quotes follow inspection.

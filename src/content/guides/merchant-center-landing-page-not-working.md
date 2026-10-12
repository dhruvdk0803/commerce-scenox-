---
title: "Merchant Center Landing Page Not Working: Fix"
heading: "Merchant Center landing page not working or unavailable: causes and fixes"
description: "Fix Merchant Center landing page not working, page not found (404), and unavailable desktop or mobile landing page errors on Shopify and other platforms."
category: fixes
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "Landing page errors mean Google could not load the product URL in your data: a 404, a 5xx error, too many redirects, a page under construction, a robots.txt block or a bot-protection wall. Test the URL in a private window and with the URL Inspection Tool, fix the cause and request a review. Recrawls usually take 24 to 48 hours."
faqs:
  - q: "What is the difference between landing page not working and page not found?"
    a: "Page not found (404) means the URL returns that specific error, usually from a broken or outdated link. Landing page not working is the wider policy covering pages that fail to load, are under construction, return other 4xx or 5xx errors, or do not allow customers to reach checkout."
  - q: "Why does it say desktop or mobile landing page unavailable?"
    a: "Google crawls the link and mobile link templates separately. If the page fails for the desktop or smartphone crawler, it cannot be accessed. Google notes that a crawl error on either device can disapprove the item for both until the page loads successfully."
  - q: "How many redirects are too many?"
    a: "Google's guidance is no more than two redirects between the feed URL and the final page. Long chains, often left by migrations and tracking redirects, cause crawl failures. Point the feed straight at the final URL."
  - q: "Can robots.txt or security tools cause this?"
    a: "Yes. Google says robots.txt must allow Googlebot, used for landing pages, and Googlebot-Image, used for images. Firewalls and bot-protection services that challenge unfamiliar crawlers can also block them, so check allowlists and rate limits."
---

When Google cannot load your product page, the item cannot be shown. This is also the issue most often caused by something outside the feed, such as a migration, a security setting or a slow server. This guide covers the variants, how to diagnose them and the fixes. For other disapprovals, see the [Merchant Center disapprovals guide](/guides/google-merchant-center-disapprovals).

## How the issue appears

In **Products**, then **Needs attention**, you may see "Landing page not working", "Page not found (404)", "Unavailable desktop landing page" or "Unavailable mobile landing page". Google's help pages on the [landing page not working policy](https://support.google.com/merchants/answer/10249083) and the [unavailable desktop landing page](https://support.google.com/merchants/answer/15485616) issue describe each. The desktop variant relates to the `[link_template]` attribute, the mobile variant to `[mobile_link_template]`, and each can be tested with the URL Inspection Tool in Search Console using the matching fetch type.

## What triggers it

- **404 or other 4xx or 5xx status.** Deleted, renamed or unpublished products, or server errors.
- **Redirect problems.** Google's guidance is no more than two redirects. Chains left by a migration cause failures.
- **Robots.txt blocks.** Googlebot and Googlebot-Image must be able to crawl the site.
- **Bot protection.** A firewall or CDN that challenges crawlers.
- **Page under construction or password protected.**
- **Slow loads.** Timeouts during the crawl.
- **Checkout unreachable.** Google expects customers to be able to get from the landing page to checkout.
- **Variant URLs** that do not resolve.

## How to find affected items

1. Filter **Needs attention** by the landing page issue and download the CSV.
2. Open the URLs in a private window, on desktop and mobile. Use a tool that shows status codes and redirect chains.
3. Run important ones through the URL Inspection Tool and check what Google sees.
4. Check your server logs for Googlebot requests that returned errors.
5. Look for a date pattern. A sudden cluster usually follows a migration, theme change or security update.

## Fix steps for Shopify

1. Check deleted or archived products. A product removed from the store but still in the feed returns 404. Either restore it or remove it from the feed.
2. If you changed handles, Shopify normally keeps redirects from old URLs, but confirm they exist for the affected products. A feed that still points at an old URL passes through a redirect, so update the feed to the final URL.
3. Remove password protection from the storefront if it is still on.
4. Check apps that add geo-redirects or age gates, which can bounce crawlers.
5. Resync the sales channel and check Needs attention.

## Fix steps for other platforms and feeds

- Regenerate the feed after any URL change and point links directly at final HTTPS URLs.
- Allow Googlebot and Googlebot-Image in robots.txt and in the firewall or CDN. Verify with the URL Inspection Tool.
- Cut redirect chains to two or fewer, ideally zero.
- Improve server response times and avoid heavy scripts that delay rendering.
- Check the mobile template link separately if you use one.
- After a platform change, map old URLs with 301 redirects. See our [301 redirect guide](/guides/migration-301-redirects) and the [store migration service](/store-migration).

## Re-review and recrawl expectations

Google says that once technical fixes are live, a small edit to the item or a review request can trigger a fresh crawl, which usually resolves within 24 to 48 hours. It also says products may take up to 48 hours to reappear after the page is accessible. If a review limit applies, Merchant Center states it, so fix everything before requesting.

## Prevention

- Rebuild the feed after every URL, theme or platform change.
- Monitor for 404s on product URLs and remove or redirect them.
- Review firewall rules after security changes.
- Keep redirects direct and documented.

## When to do it yourself and when to hand it off

If one broken URL or a single redirect is behind the issue, fixing the link and requesting a recrawl is a quick, do-it-yourself job.

Hand it off when a migration or URL change left many product pages broken and you need redirects and the feed fixed together. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

---
title: "Replatforming Without Losing Rankings: A Practical SEO Plan"
heading: "Replatforming without losing rankings: what to do before, during and after"
description: "A practical SEO plan for moving to Shopify: baseline data, URL and content parity, redirects, launch checks and a post-launch monitoring routine."
category: migration
service: migration
published: 2026-10-12
updated: 2026-10-12
summary: "Protect rankings in a replatform by keeping what already works: record a baseline, keep titles, descriptions and content, map every important URL with a 301 redirect, avoid launching during peak season, then monitor Search Console daily for two weeks. Some movement is normal; unexplained loss is usually a missed redirect or a blocked crawler."
faqs:
  - q: "Will I lose rankings when I migrate to Shopify?"
    a: "Some fluctuation is normal for a few weeks after any replatform. Large, lasting losses usually come from avoidable mistakes: missing redirects, changed content or titles, a robots block left on, or lost internal links. Keep the content, map the URLs and check the technical basics, and the dip is usually small."
  - q: "How long does it take to recover after a migration?"
    a: "It varies with the size of the site, how much changed and how quickly search engines recrawl. We would not promise a timeframe. Track clicks and impressions in Search Console against your baseline weekly, and investigate any page group that stays down after a few weeks."
  - q: "Should I change my URLs, titles and content during the migration?"
    a: "Avoid it if you can. Changing the platform is already a large change for search engines to process. Keep titles, descriptions, headings and body copy the same on launch, and run redesigns or rewrites as separate projects afterwards, so you can tell what caused any movement."
  - q: "When is the best time to launch a migrated store?"
    a: "Outside your peak trading window. A launch two weeks before a major sale leaves no time to fix problems while traffic is highest. Pick a quieter period, plan a freeze on content changes for the week before and keep people available for the first few days."
  - q: "Do I need to submit anything to Google after migrating?"
    a: "Submit your new sitemap in Search Console, which Shopify generates at /sitemap.xml. If your domain stays the same, no Change of Address tool is needed. If you move to a new domain, Google's Change of Address tool is part of the process. Check the Search Console help for the current steps."
---

A replatform changes the code, the URL structure and often the content templates, all at the same moment. Search engines then have to re-read your site and decide whether it is still the page they ranked yesterday. The aim of an SEO-safe migration is to give them as little reason as possible to decide it is not.

This guide is the plan we would follow for a move to Shopify. It is written for the store owner who needs to know what to ask for, whether you do the work or someone else does.

## Principle: change the platform, not the pages

Search engines handle a clean move better than a move plus a redesign plus a rewrite. Keep as much as you can identical on launch day: page titles, meta descriptions, headings, body copy, image alt text, internal links and the structure of the navigation. A move onto a new theme is already a large layout change.

If you plan a rebrand or content overhaul, schedule it for after the dust settles. Then, if rankings shift, you know which change did it.

## Before: record the baseline

You cannot measure a loss without a before picture. Capture, at least a month before launch:

- **Search Console performance** by page and query: clicks, impressions, average position, for the last 12 months.
- **Analytics landing pages** with organic sessions and revenue.
- **A full crawl** of the old site: URL, status, title, meta description, H1, canonical, indexability, word count.
- **Backlinks** to your site, by target URL.
- **Top 20 ranking keywords** and the pages that rank for them.
- **Site speed** for key templates (home, category, product).

Store these in a spreadsheet and do not rely on the old platform still being around to re-run them. Once the old site is gone, the crawl is gone too.

## Before: URL and redirect plan

URLs will change, since Shopify uses `/products/<handle>` and `/collections/<handle>`. Every URL that has traffic, links or an indexed page needs a 301 redirect to its closest equivalent. Build the map from your sitemap, crawl, Search Console and backlinks, and test it on a sample. Our [301 redirect guide](/guides/migration-301-redirects) has the CSV template and URL patterns for Magento, WooCommerce, BigCommerce, Wix and Squarespace.

Two Shopify specifics matter. Only broken URLs can be redirected, and certain paths are restricted. And Shopify's limit is 100,000 redirects, or 20 million on Plus, which covers most stores comfortably.

## Before: content and on-page parity

Move the SEO elements deliberately, not by accident.

1. **Titles and descriptions.** Shopify has SEO title and description fields on products, collections, pages and blog posts. Its CSV documentation lists limits of 70 characters for SEO title and 320 for description. Check that migrated values fit and are not truncated.
2. **Headings and body copy.** Confirm the theme outputs a single H1 per page, and that descriptions, collection copy and long-form content arrive intact.
3. **Image alt text.** Shopify's CSV supports alt text per image, so carry it across. Old files often have none; adding it is a good post-launch task, not a launch blocker.
4. **Structured data.** Check that the new theme outputs product markup (price, availability, reviews if you have them) and test a sample with Google's Rich Results Test.
5. **Canonical tags.** Product pages reached through a collection path should canonicalise to the main product URL. Shopify themes normally handle this; verify on a few.
6. **Blog and informational pages.** These are often a store's best rankers. Migrate every one, with the same slugs where you can, or a redirect where you cannot.

## Before: handle the things that quietly break

Several items rarely feature in a project plan and cause most surprises:

- **Staging blocks.** If you build on a staging copy with search engines blocked, make sure the block is gone at launch. Shopify's storefront password lives under Online Store preferences; confirm it is off.
- **Robots.txt and sitemap.** Shopify generates both. If you customise robots, test the result.
- **Hreflang and markets.** If the old store had language or country versions, rebuild them before launch rather than after.
- **Internal links.** Links inside descriptions and blog posts still point at old URLs. They will redirect, but update them to the new paths to save a hop.
- **Pagination and filters.** Old filtered or paginated URLs with traffic may need individual redirects.
- **Tracking.** Reinstall analytics, Search Console verification and ad pixels before launch, not after.
- **Feeds.** Update product feed URLs in Merchant Center and other channels if the feed source changes.

## During: launch day

Keep the launch boring.

1. Freeze content changes on the old site 24 to 48 hours before.
2. Do a final product and order sync if the store is live.
3. Import the redirect file.
4. Point the domain, and confirm the SSL certificate is active.
5. Check the sample of 30 redirects by hand, then run the full list through a bulk status checker.
6. Submit the new sitemap in Search Console.
7. Crawl the new site and compare against the baseline crawl: missing pages, changed titles, noindex tags, 404s.

Avoid launching right before a major sale or the holiday trading period. Give yourself two weeks of normal traffic to find and fix problems before the busy window.

## After: the first two weeks

Check Search Console daily for two weeks, then weekly.

- **Pages report.** Watch for a rise in "Not found (404)", "Redirect error" or "Blocked by robots.txt". A rise means the map is missing URLs.
- **Performance report.** Compare clicks and impressions with the same period and your baseline. Group by page type: a drop confined to category pages points at a category redirect or template issue.
- **Crawl stats.** A sudden fall in crawl requests can mean search engines are hitting errors.
- **404 logs.** Shopify's redirect tooling and analytics show visited missing URLs; add redirects for those that had traffic.
- **Rankings.** Track your top keywords weekly. Movement of a few positions in the first fortnight is common; treat sustained losses on specific pages as a bug to investigate.

### What not to do in those weeks

Do not rewrite titles in a panic, change your URL structure again or launch a redesign. Every extra change makes it harder to find out what caused any dip, and search engines are still processing the first one.

## Setting expectations with the people who sign off

Tell the owner, the marketing lead and anyone reading the numbers that some movement is normal after a replatform, and agree in advance what you will investigate. A sensible rule: if a page group, such as all category pages, is clearly below baseline after the first couple of weeks, you open an investigation. If a few long-tail product pages wobble, you note it and keep watching.

Keep a launch log: what changed, when, and who did it. When a number moves, the log is how you find out why. It also stops three people each making a well-meant tweak in the same week.

## A short checklist you can print

| Stage | Check |
|---|---|
| Before | Baseline exports saved (Search Console, analytics, crawl, backlinks) |
| Before | Redirect map covers all URLs with traffic or links |
| Before | Titles, descriptions, headings and body copy migrated unchanged |
| Before | Structured data, canonicals and alt text checked on samples |
| Before | Tracking, Search Console and feeds ready |
| Launch | Password off, redirects imported, sitemap submitted |
| Launch | Crawl compared with the baseline |
| After | Search Console reviewed daily for two weeks |
| After | 404s with traffic redirected, content changes held back |

## When to do it yourself and when to hand it off

For a small store with a few dozen products and little organic traffic, you can follow this checklist yourself. The redirect map is short and the risk is modest.

When organic search drives meaningful revenue, or the old site has thousands of URLs on a platform with unusual patterns, the redirect map and parity checks are the bulk of the job. Our [store migration service](/store-migration) covers product data, redirects and parity checks, with a person reviewing every output and you approving before anything goes live. Fixed quotes follow a look at your files, before work starts; see [pricing](/pricing) or send ten products through the [free sample](/free-sample).

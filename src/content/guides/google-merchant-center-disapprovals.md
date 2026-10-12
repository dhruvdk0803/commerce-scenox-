---
title: "Google Merchant Center Disapproved Products: Causes and Fixes"
heading: "Google Merchant Center disapproved products: causes and fixes"
description: "Why Merchant Center disapproves products and how to fix each cause: price mismatch, missing GTIN, image overlays, shipping, landing page and policy errors."
category: feeds
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "Merchant Center disapproves products mainly for price or availability that differs from the landing page, missing identifiers such as GTIN, image problems like promotional overlays, missing shipping data, landing page errors and policy violations. Open Products, then Needs attention, fix the cause in the feed or site, and request a re-review. Rechecks typically take 24 to 48 hours."
faqs:
  - q: "Where do I see disapproved products in Merchant Center?"
    a: "Go to Products under Products and store, then open the Needs attention tab. You can filter by impact, label, status and issue type, download the list as a CSV, or open a single product to see its issues. Account-level problems appear in a banner at the top."
  - q: "How long does Google take to re-review fixed products?"
    a: "Google's help pages say that after technical fixes are live, a small edit or an appeal starts a fresh crawl, which usually finishes within 24 to 48 hours. Some violations need extra verification or limit how many reviews you can request, so it can take longer."
  - q: "Do I need a GTIN for every product?"
    a: "Not for every product, but for most branded goods that have one. If a manufacturer assigned a GTIN, supply it. Custom, handmade or private-label products without one can use identifier_exists set to no, with a brand and MPN where available. Wrong or invented GTINs cause disapprovals."
  - q: "Why does Merchant Center say my price does not match the landing page?"
    a: "The price or availability in the feed differs from what Google sees on the product page. Common causes are stale feed data, currency or tax display differences, sale prices applied only on the site, or JavaScript that changes the price after load. Fix by syncing the feed more often."
  - q: "Can one disapproval affect my whole account?"
    a: "Yes, for account-level issues such as misrepresentation or website policy problems. Those show as a banner and can pause all products. Product-level issues only affect the specific item. Read the issue text carefully, because the fix and the review path differ for each type."
---

A disapproved product is not shown in Shopping ads or free listings, so every one is lost visibility. The good news is that a handful of causes account for most disapprovals, and nearly all of them are fixed in the feed or on the product page. This guide lists the common ones, how to find them in Merchant Center, the fix for each, and how to stop them returning.

## Find the problem first

In Merchant Center, go to **Products** under Products and store, then open the **Needs attention** tab. Per [Google's help documentation](https://support.google.com/merchants/answer/2948694), you can filter by impact, label, status, title or issue type, and download a CSV of everything affected. Open a single product and check its Needs attention section for the exact issues. Account-level problems appear in a banner at the top, and under the same tab through "View setup and policy issues".

Work from the issue that affects the most products. One fix at feed level, such as a missing shipping setting, can clear hundreds of items at once. Fixing products one by one while a systemic cause remains is the slowest route.

## Issue, cause and fix

| Issue | Typical cause | Fix |
|---|---|---|
| Price mismatch (feed vs landing page) | Feed is stale, sale price live on site only, currency or tax shown differently, price changed by script | Sync the feed daily or more often; match the displayed price; use a sale price attribute with dates |
| Availability mismatch | Item sells out on site but feed says in stock | Update inventory automatically; send availability from the live platform |
| Missing GTIN or identifiers | Branded product without GTIN, wrong barcode, no brand or MPN | Add the manufacturer GTIN, brand and MPN; set identifier_exists to no only if none exists |
| Invalid GTIN | Typos, wrong length, internal codes | Check the barcode against the packaging or supplier data; remove made-up values |
| Image issues | Promotional overlay, watermark, placeholder, too small | Replace with a clean product image that meets size rules |
| Missing or invalid shipping | No shipping settings at account level, or the item has none for a target country | Configure shipping in Merchant Center for each target country |
| Landing page errors | Broken link, 404, redirect loop, blocked crawling, page requires login | Fix the URL; check robots.txt and bot protection allow Google's crawler |
| Misrepresentation | Missing contact details, unclear returns policy, unclear business info | Add clear business, returns and contact information on the site |
| Policy violations | Restricted or prohibited product, misleading claims | Remove or edit the product; read the specific policy cited |

## The fixes in more detail

### Price and availability mismatches

This is the most common one. Google compares the feed value with what its crawler finds on the page. A feed that updates once a day will mismatch whenever you run a flash sale or an item sells out in between. The fix is structural: schedule the feed to update more often than your prices change, or use an API or app that pushes updates when inventory or price changes.

Check what a crawler sees, not what you see. If your theme adds a market-specific price with JavaScript, or shows tax-inclusive prices to a visitor in one country and tax-exclusive to another, Google may read a different number from your feed.

### Missing GTIN and identifiers

If a product has a manufacturer barcode, the feed should include it, along with brand and MPN. Do not invent a GTIN to clear the warning: wrong values create worse disapprovals than missing ones. For handmade, custom or own-brand products, set identifier_exists to no and keep the brand field filled in.

### Image issues

The [image requirements on Google's help page](https://support.google.com/merchants/answer/6324350) rule out promotional text, prices, logos, watermarks and borders on the main image, and also placeholder images such as "coming soon" graphics or one stand-in photo reused across different products. Replace the image with a clean shot of the product itself. Our [product image requirements guide](/guides/product-image-requirements) has the sizes and formats.

### Shipping

If shipping is not configured for a target country, products there are disapproved. Set shipping at account level in Merchant Center for each country you sell to, and check that rates, delivery times and any free-shipping thresholds match the website.

### Landing page errors

Open the product link from the feed in a private window. A 404, a login wall, a redirect chain or a page that serves an error to bots will each fail the check. If you use a bot-protection service, make sure Google's crawlers are allowed. After a migration or URL change, the feed link often still points at the old URL, which is why feeds should be rebuilt after any [store migration](/store-migration).

### Misrepresentation and policy

These are the serious ones. They are about trust in the business, not a single field. Check your site shows who you are, how to contact you, your returns and refund terms, and your payment and shipping information, and that product claims are accurate. Read the exact policy named in the issue and fix that, rather than guessing.

## How long re-review takes

After your fixes are live, [Google says](https://support.google.com/merchants/answer/2948694) that a small edit to the item or selecting Appeal starts a fresh crawl, and that this typically finishes within 24 to 48 hours. Some violations need extra verification or limit how many reviews you can request, so build in slack. Do not request repeated reviews without fixing the cause first.

## Prevent disapprovals with a clean feed

Most disapprovals are preventable at the source. The checks we run before a feed goes live:

1. Every product has a unique title, a working HTTPS link and a main image without text or watermarks.
2. Price and availability in the feed are generated from the live store, not typed into a spreadsheet.
3. GTIN, brand and MPN are populated where they exist, and verified.
4. Shipping and returns are configured per country.
5. Titles and descriptions are accurate to the product, with no promotional wording.
6. The feed is re-tested after any theme, URL or app change.

A rules-based feed tool or a managed feed can enforce most of this automatically, but the underlying product data still has to be clean. That is a catalog problem as much as a feed problem.

## When to do it yourself and when to hand it off

For a store with a few dozen products and one disapproval type, fixing it yourself is fine: follow the table, correct the data, request a review. Merchant Center's diagnostics are clear enough for that.

It makes sense to hand it off when thousands of items are disapproved for mixed reasons, your source data is messy, you sell across several countries, or you want ongoing monitoring. Our [feed management service](/product-feed-management) handles setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, not your passwords. Feed and marketplace setup starts from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround starts from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can request the [free 10-product sample](/free-sample) if the project is a fit.

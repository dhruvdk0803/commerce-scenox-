---
title: "Merchant Center Availability Mismatch: Fix It"
heading: "Merchant Center mismatched value (page crawl) [availability]: causes and fixes"
description: "Google found a different stock status on your page than in your feed. Learn what triggers the availability mismatch and how to fix it on Shopify and feeds."
category: fixes
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "Mismatched value (page crawl) [availability] means the stock status in your product data differs from the landing page, structured data or checkout. It usually comes from stale inventory feeds or variant URLs that open the wrong variant. Make all three agree, sync inventory automatically and request a review. Google says to allow at least 24 hours."
faqs:
  - q: "What does the availability mismatch mean?"
    a: "Google found that a product is in stock in your data but out of stock on the page, or the reverse. It checks the landing page, structured data and checkout against your data source. All three need to agree, otherwise the item is disapproved until they do."
  - q: "Which availability values are allowed?"
    a: "Google's product data specification lists in_stock, out_of_stock, preorder and backorder. Preorder and backorder items also need an availability date. Using a value that contradicts the page, for example in_stock when the page says pre-order, will cause a mismatch."
  - q: "Why does only one variant mismatch?"
    a: "The feed row for a variant probably links to a URL that opens a different default variant. If the default is sold out and the variant in the feed is in stock, Google reads the wrong status. Each variant URL should load pre-selected on that variant."
  - q: "How quickly are products re-approved?"
    a: "Google's guidance is to allow at least 24 hours after the fix before the offer is re-approved. A small edit or review request can start a fresh crawl, which typically resolves within one to two days if the data now agrees."
---

A shopper clicking an ad for something sold out is the experience Google is trying to prevent, so it compares your stated availability with what its crawler sees. When they disagree, the item is disapproved. This guide covers the issue as shown in Merchant Center, what triggers it and the fix. The wider picture is in the [Merchant Center disapprovals guide](/guides/google-merchant-center-disapprovals); the sibling issue for price is in the [price mismatch guide](/guides/merchant-center-price-mismatch).

## How the issue appears

In **Products** then **Needs attention**, the issue is shown as "Mismatched value (page crawl) [availability]". Google's [help page on the availability attribute](https://support.google.com/merchants/answer/6324448) describes what to check: the same status across your landing page, structured data, checkout page and data source.

## What triggers it

- **Delayed inventory sync.** Stock sells out between feed updates.
- **Structured data out of step.** The schema.org availability markup is cached or hard-coded to InStock.
- **Variant URL problems.** The feed row points at a product URL, but the page opens another variant first.
- **Preorder and backorder handling.** The page says pre-order, the feed says in_stock, or no availability date is supplied.
- **Hidden sold-out logic.** The theme shows a sold-out label only after an add-to-cart click or script.
- **Checkout differences.** The product page says available, but checkout reports no stock, often because of inventory settings by location or market.

## How to find affected items

1. Open **Products**, then **Needs attention**, and filter by the availability mismatch issue.
2. Download the list as a CSV.
3. Check five items across variants and locations. Compare the feed value, the page, the structured data (any rich-results testing tool will show it) and add-to-cart behaviour.
4. Note the pattern: all sold-out items, all variants, one market, or items with continue-selling-when-out-of-stock turned on.

## Fix steps for Shopify

1. If you use the Google & YouTube app, confirm the sync is current. Typically inventory updates flow through it, so look for sync errors first.
2. Check that variant links open on the matching variant. Unpublished variants, and products not on the sales channel, are common culprits.
3. Look at the inventory policy, in particular "continue selling when out of stock". If it is on, the page may show available while the feed says out of stock, or the reverse.
4. Check your theme's structured data. Many themes generate availability markup from inventory, but some apps override it.
5. When the data agrees, request a review for the issue.

## Fix steps for other platforms and feeds

- **Generate availability from live stock.** In WooCommerce, Magento or BigCommerce, use a feed plugin or API connection that reads stock status when the feed is built, not a CSV someone exported last week.
- **Use the right values.** `in_stock`, `out_of_stock`, `preorder` and `backorder` per the [product data specification](https://support.google.com/merchants/answer/7052112), and add an availability date for the last two.
- **Fix variant URLs.** Each variant should have a unique URL that loads pre-selected.
- **Align schema markup.** The `availability` property should match the visible status.

Merchant Center's automatic item updates can adjust availability from what the landing page reports. It helps when your feed lags, but it will not repair a page that is itself inconsistent.

## Re-review and recrawl expectations

Allow at least 24 hours after the data is aligned. Google's pages say a small edit or a review request typically triggers a fresh crawl, which usually finishes within 24 to 48 hours. If the item comes back disapproved, look for a second cause before requesting again.

## Prevention

- Update inventory as often as you sell. For fast-moving products, use push updates rather than a daily schedule.
- Drive the feed, page and markup from the same stock number.
- Retire discontinued products on the site and in the feed together.
- After any theme change, recheck the markup on a sold-out product.

## When to do it yourself and when to hand it off

When a handful of items show the wrong stock status, correcting the inventory setting and triggering a fresh fetch is usually enough, and you can do it yourself.

Hand it off when stock moves fast, comes from several warehouses or suppliers, or the mismatch keeps coming back after every fix. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

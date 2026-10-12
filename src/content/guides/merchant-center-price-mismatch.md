---
title: "Merchant Center Mismatched Value [price]: Fix It"
heading: "Merchant Center mismatched value (page crawl) [price]: causes and fixes"
description: "Why Google disapproves products for a price that differs from your landing page, how to find them, and how to fix Shopify and feed-based stores."
category: fixes
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "Mismatched value (page crawl) [price] means the price in your product data differs from the price Google finds on the landing page. Typical causes are stale feeds, sale prices shown only on the site, tax or currency display differences and prices changed by scripts. Sync the feed to the live store, match tax settings, then request a review."
faqs:
  - q: "What does mismatched value (page crawl) [price] mean?"
    a: "Google crawled the landing page for a product and found a price that does not match the price in your feed or data source. The item is disapproved until the two agree. It is an item-level issue, so only the affected products drop out of Shopping ads and free listings."
  - q: "Can a sale cause a price mismatch?"
    a: "Yes. If the sale price shows on your site but the feed still carries the old price, or the reverse, the values differ. Update the feed when the sale starts and ends, or use the sale_price attribute with an effective date range so the feed and page change together."
  - q: "Do taxes and currency affect the match?"
    a: "They can. If the page shows a tax-inclusive price to visitors in one country and the feed has a tax-exclusive one, or the page converts currency by location, Google may read a different number. Check Merchant Center tax settings for your target country and how your theme renders prices."
  - q: "How long until products come back after a fix?"
    a: "Typically within a day or two once the corrected data is live and Google recrawls the page. A small edit to the item or a review request can prompt a fresh crawl. If the cause is still present, the issue will return, so fix the source first."
---

A price mismatch is the single most common reason a healthy product stops showing in Google Shopping. The feed says one number, the page says another, and Google trusts the page. This guide covers what the issue looks like, what triggers it, and how to fix it on Shopify and on other platforms. For the wider list of disapprovals, see the [Merchant Center disapprovals guide](/guides/google-merchant-center-disapprovals).

## How the issue appears

In Merchant Center, open **Products**, then the **Needs attention** tab. The issue is listed as "Mismatched value (page crawl) [price]". Google's own [price troubleshooter](https://support.google.com/merchants/troubleshooter/14280358) treats it as an item-level disapproval, separate from account-level warnings about inaccurate prices. Related variants exist for regional prices and loyalty programme prices, which follow the same logic.

## What triggers it

Google compares the `[price]` value in your data source with what its crawler reads on the landing page. They must agree. The usual causes:

- **Stale feed.** The feed refreshes once a day, but prices change more often.
- **Sale price on one side only.** The site shows a discount and the feed has the original, or the other way round.
- **Tax display.** Tax-inclusive on the page, tax-exclusive in the feed, or tax settings in Merchant Center that do not match the target country.
- **Currency conversion.** The theme or an app converts prices by visitor location, so the crawler sees something else.
- **Variant prices.** The feed row carries one variant price, but the URL opens the default variant.
- **Script-changed prices.** A price rewritten by JavaScript after load, which the crawler may read differently.

## How to find affected items

1. Go to **Products**, then **Needs attention**.
2. Filter by the issue name. Download the list as a CSV with the download icon.
3. Open three or four examples. Compare the feed price in the product detail with the price on the live page, in a private window and ideally from the target country.
4. Group the CSV by cause. If every affected item is on sale, it is a sale-timing problem. If only one country is affected, it is tax or currency.

## Fix steps for Shopify

1. If you use the Google & YouTube app, confirm the sync is active and that the markets and currencies match what the store shows. Typically the app pushes price changes automatically, so check for sync errors before anything else.
2. Check Shopify tax settings, particularly whether prices include tax, against the tax settings for the same country in Merchant Center.
3. If a currency or market app rewrites prices on the page, make sure it renders the right price in the HTML, not only after load.
4. Make sure variant URLs open the right variant. A link with the `?variant=` parameter should show that variant's price.
5. Open the issue in Merchant Center and request a review once everything matches.

## Fix steps for other platforms and feeds

- **WooCommerce and other plugin feeds:** raise the update frequency above how often prices change, or use a plugin that pushes changes as they happen.
- **Spreadsheet or file feeds:** a price typed into a sheet will drift. Generate it from the live store or database instead.
- **Sale prices:** send `[price]` as the regular price and `[sale_price]` as the discounted one, with the effective dates. Google's [product data specification](https://support.google.com/merchants/answer/7052112) sets the format: a number, a period as decimal separator and an ISO currency code, such as `15.00 USD`.
- **Structured data:** make sure the schema.org price on the page matches the visible price.

Google also offers automatic item updates in Merchant Center, which use the landing page to adjust price and availability. Treat it as a safety net, not a substitute for a correct feed.

## Re-review and recrawl expectations

After the fix is live, a small edit to the item or a review request typically triggers a fresh crawl, and these usually resolve within 24 to 48 hours. If the item returns with the same issue, the underlying cause is still there. Do not keep requesting reviews.

## Prevention

- Schedule feed updates more often than your prices change.
- Start and end sales in the store and feed together.
- Test one product per country after any theme, tax or currency app change.
- Review tax settings in Merchant Center and the store whenever you open a new market.

## When to do it yourself and when to hand it off

If the mismatch comes from one cause, such as a sale price that never reached the feed, you can fix it in an afternoon: correct the price source, wait for the next fetch and check the diagnostics again.

Hand it off when prices change daily across thousands of SKUs, several currencies are involved or the store and feed keep drifting apart. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

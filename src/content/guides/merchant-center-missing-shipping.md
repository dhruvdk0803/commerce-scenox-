---
title: "Merchant Center Missing Shipping Value: Fix It"
heading: "Merchant Center missing value [shipping]: how to fix shipping errors"
description: "Why Merchant Center flags missing shipping information, how account-level and item-level shipping interact, and the fix for Shopify and feed-based stores."
category: fixes
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "Missing value [shipping] appears when Google cannot find shipping information for a product in a target country. Set shipping services at account level in Merchant Center, or send the shipping attribute in your feed. If a shipping attribute is supplied, it overrides the account-level rate. Check that costs match your checkout."
faqs:
  - q: "Do I set shipping in Merchant Center or in the feed?"
    a: "Either works. Account-level shipping services apply to all products, and a shipping attribute in the feed overrides them for that item, as Google's pages describe. Most stores set account-level rates and use item-level overrides only for exceptions, such as heavy items or free shipping lines."
  - q: "Why is shipping flagged for one country only?"
    a: "Shipping must exist for each country you target. A service set up for the UK does not cover Australia. Add a shipping service for each target country, and check that the product is not excluded by a weight, price or delivery area rule."
  - q: "What is the difference between missing and inaccurate shipping?"
    a: "Missing means Google found no shipping data for the item. Inaccurate shipping costs is a separate issue where the cost in your data differs from what the checkout shows. Both are fixed by aligning your Merchant Center settings and feed with the real checkout."
  - q: "Does free shipping still need to be set up?"
    a: "Yes. Free shipping is a value, not an absence of data. Set a shipping service with a rate of zero, or a free-over-threshold rule. Leaving it blank leads to the missing value issue, so state it explicitly."
---

Google needs to show a shipping cost and delivery estimate alongside a product in many countries. When it cannot find one, the item is warned or disapproved. This guide covers what the issue looks like, the usual causes and the fix. See the [disapprovals guide](/guides/google-merchant-center-disapprovals) for other issue types.

## How the issue appears

In **Products**, then **Needs attention**, the issue is shown as "Missing value [shipping]" and can be a warning or a disapproval at item level. Google's [shipping troubleshooter](https://support.google.com/merchants/troubleshooter/12762503) walks through the same decisions: whether shipping is set at account level, item level or both, which rate method you use, and whether the page matches the Shipping Preview Tool.

## What triggers it

- No shipping service configured for a target country.
- A shipping service whose conditions exclude the product, such as a weight or order-value limit.
- Carrier-calculated or weight-based tables that do not cover the item's weight.
- An item-level shipping attribute that is malformed or incomplete.
- A new market or channel added without shipping rules.
- Shopify store shipping zones that do not match the countries targeted in the Google channel.

## How to find affected items

1. Filter **Needs attention** by the shipping issue and download the CSV.
2. Group by country. One affected country points to account settings. All countries point to an item-level or feed-wide problem.
3. Use the Shipping Preview Tool in Merchant Center to test an example product and country.
4. Compare the result with your actual checkout, because Google also checks that landing page shipping information matches.

## Fix steps for Shopify

1. If you use the Google & YouTube app, check how it provides shipping. The troubleshooter notes that the app handles shipping differently depending on your setup, so confirm the app's shipping setting.
2. Make sure each country you sell Google products to has a shipping zone and rate in Shopify.
3. Check Merchant Center's shipping and returns settings for the same countries, and add services where missing.
4. If you use weight-based rates, check products have weights set. A missing weight is a common reason an item falls outside a rate table.
5. Re-sync and look at Needs attention after processing.

## Fix steps for other platforms and feeds

- **Account level:** in Merchant Center, open the shipping and returns settings and add a shipping service per country with a rate type that covers all your products.
- **Item level:** send the `[shipping]` attribute with country, price and, where used, service. Google's pages note it overrides account-level rates, so make sure it is complete.
- **Free shipping:** set an explicit zero rate or a free-over-threshold service.
- **Delivery times:** add handling and transit time so delivery estimates can show.
- Keep the checkout and the feed in step. If rates differ, you will move from missing to inaccurate shipping costs.

## Re-review and recrawl expectations

Account-level changes typically apply to items on the next processing, usually within a day or two. Feed changes follow your feed schedule. If the issue persists after that, test an affected product with the Shopping preview tool.

## Prevention

- Add shipping rules at the same time as you add a market.
- Make sure every product has a weight if you use weight tables.
- Review Merchant Center shipping settings whenever you change carriers or rates.
- Compare a test order's shipping at checkout with the preview tool once a quarter.

## When to do it yourself and when to hand it off

Setting up one shipping service for one country takes minutes in Merchant Center, so a small store can sort this alone.

Hand it off when you ship to several countries with different rates, weights and carriers and the settings need to match your checkout. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

---
title: "Merchant Center Invalid Google Product Category"
heading: "Merchant Center invalid value [google_product_category]: causes and fixes"
description: "How to fix invalid Google product category errors in Merchant Center: use the numeric ID or full path, avoid last-segment values, with Shopify and feed steps."
category: fixes
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "An invalid google_product_category means the value does not match Google's product taxonomy. Use the numeric ID, such as 1580, or the full category path exactly as listed. A last segment alone, such as Tuxedos, is rejected. If you leave the attribute out, Google assigns a category itself using other signals."
faqs:
  - q: "Should I use the category ID or the full path?"
    a: "Either is accepted. The numeric ID is safer in a feed because it avoids typos and punctuation differences. If you use the path, copy it exactly from Google's taxonomy file, including the greater-than separators and spacing, and never just the last segment."
  - q: "Is google_product_category required?"
    a: "It is required for some categories and countries, and recommended generally. Google says that if you leave it out it uses internal signals to pick a category. A correct value you supply is usually safer than relying on the guess, particularly for apparel and ambiguous products."
  - q: "Is Google product category the same as product type?"
    a: "No. google_product_category must come from Google's fixed taxonomy. product_type is your own free-text classification, such as your site's breadcrumb. Mixing them up, for instance pasting your collection name into the Google category field, is a common cause of this error."
  - q: "Can I set the category for many products at once?"
    a: "Yes. Use a supplemental feed, or a feed rule that maps your own categories to Google IDs, or the category field in your feed app. Map at collection or product type level first, then override exceptions individually."
---

Google's category taxonomy is a fixed list. Anything that is not on it, or is written slightly wrong, triggers an invalid value error. This guide covers what the issue looks like, what causes it and how to fix it. For a full explanation of choosing the right category, see the [Google product category guide](/guides/google-product-category); for the wider list of issues, the [disapprovals guide](/guides/google-merchant-center-disapprovals).

## How the issue appears

In **Products**, then **Needs attention**, the issue is shown as "Invalid product category" or an invalid value on `[google_product_category]`. Google's [help page for the issue](https://support.google.com/merchants/answer/12469137) says the value you gave does not match the taxonomy, and gives the fix: submit the correct numeric ID or the full path.

## What triggers it

- A last segment only, such as "Tuxedos", instead of the full path or ID.
- Your own category names pasted into the field.
- A path with different spacing, spelling or separators than the taxonomy file.
- An outdated category that Google has renamed or retired.
- A category in a different language from the one of your feed target.
- A spreadsheet that turned an ID into a decimal or added a trailing space.

## How to find affected items

1. Filter **Needs attention** by the category issue and download the CSV.
2. Group by the submitted value. Often a handful of distinct bad values account for hundreds of products.
3. Compare each to Google's published taxonomy file for your language.

## Fix steps for Shopify

1. If you use the Google & YouTube app, Shopify's standard product taxonomy typically maps to Google's category. Check the product's category field in admin and set a Shopify product category, not just a collection.
2. For overrides, use the app's category mapping or a metafield where supported.
3. For many products, export, add a correct category column, re-import and let the sync carry it. Our [CSV import errors guide](/guides/shopify-csv-import-errors) covers format traps.
4. Save, then check the issue disappears from Needs attention after the next sync.

## Fix steps for other platforms and feeds

- Use the numeric ID in the `[google_product_category]` column. It is shorter and removes punctuation errors.
- Keep your own classification in `[product_type]`, not here.
- Build a mapping table from your categories to Google IDs and apply it in a feed rule or supplemental feed. This fixes hundreds of items at once.
- Pick the most specific category that is accurate. If you are unsure, a broader correct category beats a wrong specific one.
- Download the current taxonomy file in the right language rather than copying categories from old documents.

## Re-review and recrawl expectations

Once corrected data is processed, items are typically re-evaluated within a day or two. Category changes can alter where your products are shown and which attributes become required, so after a mass change check Needs attention again for new warnings, for example on apparel attributes.

## Prevention

- Store the Google category ID alongside each of your categories, not as free text on each product.
- Validate against the taxonomy at import.
- Re-check mapping when you add new product types.
- Review Google's announcements for taxonomy changes before big catalog updates.

## When to do it yourself and when to hand it off

Remapping a few products to the right Google category is simple enough to do by hand in your feed or channel app.

Hand it off when your own categories do not map cleanly to Google's taxonomy and thousands of products need a consistent mapping. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

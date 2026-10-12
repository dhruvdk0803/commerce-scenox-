---
title: "Merchant Center Invalid Title and Text Too Long"
heading: "Merchant Center invalid value [title] and text too long: how to fix both"
description: "Fix invalid title and text too long issues in Merchant Center: promotional text, all caps, the 150 character limit and what Google actually shows."
category: fixes
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "Invalid value [title] is raised for promotional text, all capitals or gimmicks in a title. Text too long means a title or description exceeds the limit. Google accepts titles up to 150 characters but shows about 70 in Shopping ads and free listings. Write a plain, accurate title with the distinguishing details first."
faqs:
  - q: "What is the title character limit?"
    a: "Google's specification allows titles up to 150 characters and descriptions up to 5,000. In Shopping ads and free product listings only around 70 characters of the title are displayed, so Google recommends 70 or fewer where possible, with the most distinctive attributes at the beginning."
  - q: "What counts as an invalid title?"
    a: "Promotional text such as free shipping, all capital letters, and other gimmicks. Google asks for an accurate, concise description of the product. For variants, include the specific colour or distinguishing feature so each title is distinct."
  - q: "Will a long title stop my product showing?"
    a: "The text too long issue says the text is being truncated when shown on Google. It is mainly a quality problem, but a truncated title can hide the detail that makes the product relevant. Putting brand, product type and key attributes first avoids it."
  - q: "Can I change the feed title without changing my site title?"
    a: "Yes. The feed title can differ from the page title, for instance to add size or colour. Keep it accurate and consistent with the product. Use feed rules or a feed app to build titles from attributes instead of editing every product."
---

Titles are the most-read field in a Shopping listing, and the one stores most often stuff with promotion or keywords. Google flags two related problems: promotional or malformed titles, and titles that run past the limits. This guide covers both. For writing better titles beyond clearing errors, see the [product title SEO guide](/guides/product-title-seo), and for other issues the [disapprovals guide](/guides/google-merchant-center-disapprovals).

## How the issue appears

In **Products**, then **Needs attention**, look for "Invalid value [title]" and "Text too long". Google's [invalid title page](https://support.google.com/merchants/answer/12470366) says to give an accurate, concise description and avoid promotional text such as "free shipping", all capitals and other gimmicks. The [text too long page](https://support.google.com/merchants/answer/14989281) says the title, description or both exceed the maximum and are being truncated.

## What triggers it

- Promotional phrases in the title: "free shipping", "sale", "best price".
- All-capital titles.
- Repeated keywords, symbols or emoji used for emphasis.
- Variant products sharing the same title with no colour or size.
- Titles longer than 150 characters, or descriptions over 5,000.
- Titles that begin with the brand repeated, bury the product type or put the key attribute at the end.

## How to find affected items

1. Filter **Needs attention** by each issue and download the CSVs.
2. In a spreadsheet, add a character length column for the title. Sort descending.
3. Search for banned phrases: "free", "sale", "%", "off", "best".
4. Find all-capital titles by comparing the title to its uppercase version.
5. Group duplicates by title to find variants with no distinguishing detail.

## Fix steps for Shopify

1. Edit the product title in admin, or if you do not want to change your storefront title, use a feed app's title rules to build the Google title separately.
2. Remove promotional wording from the title field. Put promotions in the description or in sale price and promotion settings.
3. Include colour or size in variant titles where your feed app supports it.
4. For many products, export, fix the `Title` column and re-import. Our [CSV import errors guide](/guides/shopify-csv-import-errors) covers the format.
5. Check the Google & YouTube app after the next sync.

## Fix steps for other platforms and feeds

- Build the feed title from attributes: brand, product type, key attribute, colour, size. A formula applied across the feed beats hand-editing.
- Keep it under 70 characters where possible, since that is roughly what is displayed, and certainly under the 150 limit in the [product data specification](https://support.google.com/merchants/answer/7052112).
- Put distinctive attributes first, per Google's guidance.
- Use sentence or title case, not all capitals.
- Add a separate `[title]` for each variant so the colour or size is visible.
- Truncate descriptions at 5,000 characters, cleanly at a sentence break.

An example, before and after:

```
Before: BEST PRICE!! Mens Running Shoes Free Shipping SALE Sneakers Trainers Gym Walking
After:  Nike Pegasus 41 Men's Road Running Shoes, Black, Size 9
```

## Re-review and recrawl expectations

Edited titles are typically reprocessed within a day or two. A title issue is usually a data-only check, so it often clears without a landing page recrawl. If it persists, look for a second violation such as promotional text in the description.

## Prevention

- Use a title template per category so every product follows the same order.
- Block promotional words with a feed rule or import validation.
- Review titles of new suppliers before upload.
- Check length when titles are generated by AI or merged from several fields.

## When to do it yourself and when to hand it off

Shortening or cleaning up a dozen titles is a reasonable job to do yourself, as long as the new titles still describe the product accurately.

Hand it off when titles come straight from a supplier file and the whole catalog needs a consistent, rule-based rewrite. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

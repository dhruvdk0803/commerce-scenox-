---
title: "Catalog Data Quality Checklist: A Copyable Audit"
heading: "A catalog data quality audit checklist you can copy and run today"
description: "A practical ecommerce catalog audit: field-by-field checks, spreadsheet formulas to find problems, severity ratings and a template to track fixes."
category: content
service: cleanup
published: 2026-10-12
updated: 2026-10-12
summary: "A catalog data audit checks identifiers, titles, descriptions, pricing, images, attributes, categories and URLs for blanks, duplicates and inconsistency. Run the checks on an export in a spreadsheet, rate each issue by severity, fix blockers first, and re-run the audit after every large import."
faqs:
  - q: "How often should I audit my product catalog?"
    a: "Run a full audit before any migration or large import, and a lighter one each quarter. Run the quick checks, such as blanks and duplicates, after every bulk change. Catalogs drift slowly, so a regular schedule catches problems early."
  - q: "What are the most serious catalog data errors?"
    a: "Duplicate or missing SKUs, wrong prices, missing images, products in the wrong category and invalid identifiers. These cause lost sales, feed disapprovals or wrong orders. Spelling and formatting inconsistencies matter less but add up over a large catalog."
  - q: "Can I run a catalog audit in Excel or Google Sheets?"
    a: "Yes. Export the products as CSV, then use filters, conditional formatting, COUNTIF for duplicates and LEN for length checks. For a catalog up to a few thousand rows that is enough. Beyond that, scripts or tooling make it faster."
  - q: "What should I check first?"
    a: "Start with identifiers and prices: duplicate SKUs, blank SKUs, zero or missing prices. Then check images and titles. These affect orders and feeds directly, so fixing them first gives the biggest reduction in risk."
  - q: "How do I know if my catalog data is good enough?"
    a: "Set thresholds, for example no duplicate SKUs, no products without images, every product in a category, and at least 95 per cent of key attributes filled. Pick numbers that fit your business and track them over time."
---

Catalog problems rarely announce themselves. A duplicate SKU shows up as an oversold item. A missing image shows up as a feed disapproval. A price of zero shows up as a very good day followed by a very bad week. An audit finds these before the customer does.

This page is the checklist, ready to use. Export your products, work through it in order, and keep a log of what you find.

## How to run the audit

1. **Export everything.** From Shopify, use Products > Export and choose all products, CSV for Excel. From WooCommerce, use the product export tool. You want every product and every variant row.
2. **Work on a copy.** Never edit the only copy of your catalog.
3. **Format columns as text** where needed: SKU, barcode, handle. This stops spreadsheet software from dropping leading zeros or turning long numbers into scientific notation.
4. **Add a column** called `Issues` and note the check number next to any failing row.
5. **Rate each issue** as Blocker, Major or Minor (definitions below).
6. **Fix in severity order**, then re-export and re-run the checks.

## Severity ratings

| Level | Meaning | Examples |
| --- | --- | --- |
| Blocker | Causes wrong orders, lost revenue or rejected feeds | Duplicate SKU, price zero, missing image, invalid GTIN |
| Major | Hurts search, filtering or conversion | Missing category, thin description, inconsistent colours |
| Minor | Cosmetic or consistency | Capitalisation, extra spaces, inconsistent units |

## The checklist

Copy this list into a sheet. Each line is a check, how to run it and a typical severity.

### A. Identifiers

- [ ] **A1. No blank SKUs.** Filter the SKU column for blanks. Blocker if inventory is tracked.
- [ ] **A2. No duplicate SKUs.** In a helper column: `=COUNTIF(B:B,B2)>1`. Filter for TRUE. Blocker.
- [ ] **A3. SKU format is consistent.** Check length and allowed characters. A rough test for letters, digits and hyphens: `=REGEXMATCH(B2,"^[A-Z0-9-]+$")` in Google Sheets. Minor to Major. See [SKU naming conventions](/guides/sku-naming-conventions).
- [ ] **A4. No leading or trailing spaces.** `=B2<>TRIM(B2)` flags problems. Major, because it breaks matching.
- [ ] **A5. Barcodes are valid.** Check length (8, 12, 13 or 14 digits for GTINs) with `=LEN(C2)`. Blocker for feeds that require GTIN.
- [ ] **A6. Handles are unique and lowercase.** Same duplicate check on the handle column, excluding rows that are variants of one product. Blocker.

### B. Titles

- [ ] **B1. No blank titles.** Blocker.
- [ ] **B2. Length within limits.** `=LEN(D2)`. Flag anything over 150 characters or under 20. Major.
- [ ] **B3. No promotional text.** Search for "sale", "free shipping", "offer", "new arrival". Major for feeds.
- [ ] **B4. No all-capitals titles.** `=EXACT(D2,UPPER(D2))`. Minor to Major.
- [ ] **B5. Same pattern within a category.** Sort by category and read ten rows. Major. See [product title formulas](/guides/product-title-seo).
- [ ] **B6. No duplicate titles across different products.** `=COUNTIF(D:D,D2)>1`. Major, since identical titles compete in search.

### C. Descriptions

- [ ] **C1. No blank descriptions.** Blocker for feeds on some channels, Major otherwise.
- [ ] **C2. Minimum length.** Flag under 150 characters. Major.
- [ ] **C3. No copied supplier text** shared with other stores. Check a sample by searching a distinctive sentence. Major for search.
- [ ] **C4. No leftover HTML junk** such as empty paragraphs, inline styles or stray tags. Search for `<span`, `&nbsp;`. Minor.
- [ ] **C5. No placeholder text** such as "Lorem ipsum", "TBD", "description here". Blocker.

### D. Pricing and inventory

- [ ] **D1. Price is present and greater than zero.** Blocker.
- [ ] **D2. Compare-at price is higher than price** where used. Major.
- [ ] **D3. Price has the right decimal format.** No commas as decimals, no currency symbols in the price column. Blocker on import.
- [ ] **D4. Outliers reviewed.** Sort by price and read the top and bottom 20. A shirt at 100 times the usual price is usually a typo. Major.
- [ ] **D5. Inventory is numeric** and not negative unless you allow overselling deliberately. Major.
- [ ] **D6. Weight is filled** if shipping uses weight-based rates. Major.

### E. Images

- [ ] **E1. Every product has at least one image.** Blocker.
- [ ] **E2. Image URLs resolve.** Open a sample of URLs, or test them in bulk with a link checker. Blocker.
- [ ] **E3. Image alt text present.** Filter blanks in `Image Alt Text`. Major for accessibility and SEO.
- [ ] **E4. Consistent dimensions and background** within a category. Minor to Major.
- [ ] **E5. Variant images are linked** to the right variant (for colour). Major.

See [product image requirements](/guides/product-image-requirements) for channel-specific specs.

### F. Attributes and variants

- [ ] **F1. Option names are consistent.** "Colour", "Color" and "colour" in one catalog is a problem. Major.
- [ ] **F2. Option values are controlled.** Get a unique list per option and review it. Major. See [attributes and taxonomy](/guides/product-attributes-taxonomy).
- [ ] **F3. No variants with all options blank** unless it is a single-variant product. Major.
- [ ] **F4. Every variant has its own SKU and price.** Blocker.
- [ ] **F5. Required feed attributes are filled:** brand, gender, age group, material where relevant. Major.

### G. Categories and tags

- [ ] **G1. Every product has a category** (product type and standard category). Major.
- [ ] **G2. No "Other" or "Uncategorised" bucket** holding more than a handful of products. Major.
- [ ] **G3. Vendor/brand field is filled and consistent.** "Nike", "NIKE" and "Nike Inc." are one brand. Major.
- [ ] **G4. Tags are used on purpose.** Review the unique tag list for typos and one-off tags. Minor.

### H. URLs and SEO

- [ ] **H1. Handles are readable** and keyword-based, not "product-123". Minor to Major.
- [ ] **H2. SEO title and meta description set** for top products. Major.
- [ ] **H3. No duplicate meta descriptions.** Major.
- [ ] **H4. Redirects exist** for any URL changed. Blocker for ranking. See [301 redirect mapping](/guides/migration-301-redirects).

## Formulas worth keeping

Put these in helper columns and filter on the result.

```
Duplicate check:         =COUNTIF($B:$B,B2)>1
Leading/trailing space:  =B2<>TRIM(B2)
Length:                  =LEN(D2)
Blank check:             =ISBLANK(E2)
All caps:                =EXACT(D2,UPPER(D2))
Price present and > 0:   =AND(ISNUMBER(F2),F2>0)
```

On a large sheet, `COUNTIF` over a whole column is slow. Sort first, then compare each row with the one above it.

## An issue log template

Track what you find so you can show progress and avoid fixing the same thing twice.

| Check | Rows affected | Severity | Owner | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| A2 duplicate SKUs | 14 | Blocker | Ops | Open | Two suppliers used the same codes |
| E1 missing image | 37 | Blocker | Design | In progress | New range, photos due |
| B3 promo text | 22 | Major | Content | Open | |

Count rows affected as a percentage of the catalog. Ten blank images in a catalog of 100 is a different problem from ten in 10,000.

## Set thresholds

Decide what "good" means for your store and write the numbers down. For example:

- Zero duplicate SKUs
- Zero products without images
- 100 per cent of products in a category
- At least 95 per cent of required attributes filled
- Zero titles with promotional text

These are examples, not benchmarks. Pick numbers you can hold yourself to.

## When to do it yourself and when to hand it off

Audit it yourself if the catalog is a few hundred products and you have an afternoon. The formulas above find most blockers, and fixing them is typing and pasting.

It becomes a project when there are thousands of rows, several suppliers' formats, and fixes that need judgement: rewriting titles, mapping attributes, deciding what a "sensible" price is. Our [catalog cleanup service](/catalog-cleanup) runs this audit, fixes what it finds with an AI engine, has a person review every output and asks you to approve before anything goes live. It starts from ₹4,999 / $129 / £99 / A$199 for up to 250 products, with a fixed quote after we inspect your files. For a feel of the output, use the [free sample](/free-sample), and see [catalog management service vs PIM software](/guides/catalog-management-service-vs-pim) for how this compares to buying software.

---
title: "Merchant Center Missing or Incorrect GTIN: Fix"
heading: "Merchant Center missing or incorrect GTIN [gtin]: what to do"
description: "How to fix missing or invalid GTIN, MPN and brand errors in Merchant Center, with correct digit lengths, identifier_exists rules and Shopify steps."
category: fixes
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "Merchant Center flags a missing or incorrect GTIN when unique product identifiers are absent or invalid. Provide the manufacturer GTIN, or a brand together with an MPN. Only set identifier_exists to false for items with no identifier, such as handmade or one-of-a-kind goods. Never invent a barcode to clear the warning."
faqs:
  - q: "How long should a GTIN be?"
    a: "Google's specification lists UPC as 12 digits, EAN as 13, JAN as 8 or 13, ISBN as 13 and ITF-14 for multipacks as 14. Convert 8-digit UPC-E to 12-digit UPC-A and ISBN-10 to ISBN-13. Spaces, dashes and letters are not valid."
  - q: "What if my product has no GTIN?"
    a: "Not every product has one. Supply a brand and MPN if you have them. For one-of-a-kind, vintage or custom items, Google's guidance is to set identifier_exists to false. For branded products that do have a manufacturer barcode, get it from the supplier."
  - q: "Can I use my own SKU as the GTIN?"
    a: "No. A GTIN is a manufacturer barcode registered in the GS1 system. Internal SKUs and invented numbers are not valid and cause incorrect-value disapprovals. Put your SKU in the id attribute and keep the GTIN field for the real barcode."
  - q: "Is a missing GTIN always a disapproval?"
    a: "Not always. Depending on the target country and category, identifiers may be required or simply improve matching. Merchant Center shows whether yours is a warning or a disapproval. Warnings can still limit how widely a product is shown, so fix them where a real identifier exists."
---

Identifiers tell Google which exact product you are selling, so it can match your offer to the right listing. When they are missing or wrong, items are warned or disapproved. This guide covers how it appears, what triggers it and the fixes. For the full identifier decision tree, read the [GTIN, MPN and brand guide](/guides/gtin-mpn-brand); for the wider list, see the [disapprovals guide](/guides/google-merchant-center-disapprovals).

## How the issue appears

In **Products**, then **Needs attention**, look for "Missing or incorrect GTIN" or a missing value on the `[gtin]` attribute, along with related items such as an incorrect MPN. Google's help page on the issue says it happens when one or more unique product identifiers are missing or not recognised as valid, and that depending on the country and category you may need to supply them or state that none exist. Whether you see a warning or a disapproval depends on the item.

## What triggers it

- A branded product with no barcode in the feed.
- A GTIN with the wrong number of digits, or with spaces and dashes.
- An internal code or SKU entered in the GTIN column.
- A barcode that belongs to a different product, such as a case or multipack.
- Brand missing, so the MPN has nothing to pair with.
- Handmade or custom goods without `identifier_exists` set to false.

## How to find affected items

1. Filter **Needs attention** by the identifier issue and download the CSV.
2. Sort by brand. A clustered list usually means one supplier whose barcodes never reached your catalog.
3. Check digit lengths in a spreadsheet. Valid GTINs are 8, 12, 13 or 14 digits. Anything else is an error.

## Fix steps for Shopify

1. Barcodes live in the **Barcode** field on each variant. If you use the Google & YouTube app, that field typically feeds the GTIN, so fix it at the variant, not in Merchant Center.
2. Add the brand in the **Vendor** field, and an MPN through the app's or a metafield mapping where your setup supports it.
3. For many products, export, add a clean `Variant Barcode` column, re-import and let the sync carry it over. Our [CSV import errors guide](/guides/shopify-csv-import-errors) covers format traps such as barcodes losing leading zeros in spreadsheets.
4. For products that truly have no identifier, mark them as such in your feed app's identifier setting.

## Fix steps for other platforms and feeds

- Add the manufacturer's GTIN to the product record or a dedicated attribute, and map it to `[gtin]`.
- Provide `[brand]` and `[mpn]` as a pair when there is no GTIN.
- Use `[identifier_exists]` set to `false` only where no identifier exists. It is not a shortcut for products where you have not yet looked up the barcode.
- Ask the supplier for GTINs. Google's [GTIN page](https://support.google.com/merchants/answer/6219078) suggests contacting the manufacturer, and advises checking that any third-party lookup source is legitimate.
- Store barcodes as text, not numbers, so spreadsheets do not strip zeros or convert to scientific notation.

## Re-review and recrawl expectations

Edited items are typically reprocessed within a day or two of the corrected data arriving. Google notes that updates can take time to show on the Needs attention page, so check again after the next feed processing before assuming the fix failed.

## Prevention

- Capture the barcode at supplier onboarding, not after launch.
- Validate digit lengths on import.
- Keep a clear rule for no-identifier products and record who decided it.
- Check new suppliers' files for missing barcodes before uploading.

## When to do it yourself and when to hand it off

If you only sell a few branded items, finding their barcodes and adding them to the feed is a manageable task to do yourself.

Hand it off when thousands of products are missing identifiers and someone has to work out which are branded, which are exempt and which need barcodes. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

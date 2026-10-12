---
title: "Shopify 'Did Not Contain Product Data' CSV Error"
heading: "Shopify 'Ignored line because it did not contain product data': fix it"
description: "Why Shopify says 'Ignored line because it did not contain product data', the handle and title rules behind it, plus a broken and fixed CSV row."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Shopify ignores a CSV line with 'did not contain product data' when a handle has no title. For a new product, add a title. For a variant or image row, make the handle match the product's first row exactly, with no trailing space, different case or stray character."
faqs:
  - q: "Do variant rows need a title?"
    a: "No. Only the first row of a product needs a title. Later variant and image rows leave Title empty but must repeat the identical handle so Shopify attaches them to the right product."
  - q: "Why was my variant row treated as a new product?"
    a: "Because its handle did not match exactly. A trailing space, a capital letter or a different hyphen makes it a different handle, and with no title Shopify has no product to create."
  - q: "Can blank rows at the end of the file cause this?"
    a: "Yes. Rows that contain only commas, left by a spreadsheet, can be read as lines with no usable data. Delete empty rows below your last product before exporting."
  - q: "Does the order of rows matter?"
    a: "Yes. Keep all rows of a handle together, with the titled row first. Scattering them risks later rows being read as separate products."
---

"Ignored line #-## because it did not contain product data" appears after an import that otherwise ran. Certain rows were skipped, usually variants or images that did not attach. The cause is nearly always a handle and title mismatch. The full set of errors is in the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors).

## What it means

Shopify decides what a row is by its handle and title. A row with a new handle and a title creates a product. A row whose handle matches an earlier product adds a variant or an image to it. A row with a handle that is not recognised and no title is neither, so Shopify ignores it. Its help documentation describes the cause as a product that has a handle but no title.

## Causes

- **A new product with no title.** Someone left the Title cell empty on the first row.
- **A handle that almost matches.** Trailing space, capital letter, a different hyphen or an invisible character.
- **Rows out of order**, with a variant row appearing before or far from its product.
- **Empty rows** left at the bottom of a spreadsheet.
- **Image-only rows with a typo** in the handle.
- **A copy and paste from a web page** that brought a non-breaking space into the handle.

## Broken row and fixed row

The second row has a trailing space in the handle, so it does not match the first.

Broken:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant Price
linen-shirt,Linen Shirt,Size,S,49.00
linen-shirt ,,Size,M,49.00
```

Fixed:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant Price
linen-shirt,Linen Shirt,Size,S,49.00
linen-shirt,,Size,M,49.00
```

Another version of the same mistake is a new product with the title forgotten:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant Price
canvas-tote,,Colour,Natural,18.00
```

Add the title on that first row.

## Step-by-step fix

1. Note the line numbers in the message and open the CSV in a text editor.
2. For each line, find the handle and look for the first row with the same handle.
3. If no titled row exists, add a title to the first row of the product.
4. If a titled row exists, compare the handles character by character. Trim spaces and fix case or hyphens.
5. In a spreadsheet, use a trim formula on the Handle column, and compare it to the original with an exact-match test to find hidden differences.
6. Move each product's rows next to each other, titled row first.
7. Delete empty rows at the bottom.
8. Re-import. Use overwrite if some of the product's rows already created it.

## Prevention

Generate the Handle column once and fill it down by formula, rather than typing it on each row. Add a check column that flags any row where the handle is new but the title is blank. Sort by handle before export so rows of one product stay together.

Always compare the number of products and variants in Shopify with your file after import. Skipped lines are reported, but the summary is easy to scroll past.

## When to do it yourself and when to hand it off

If you have a handful of ignored lines, the checks above will find them in minutes. For large catalogs with variants built from multiple supplier files, mismatched handles multiply, and the work of rebuilding clean product groups is real. Our [bulk product upload](/bulk-product-upload) service builds the product and variant structure for you. A person reviews every output and you approve before anything is loaded. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

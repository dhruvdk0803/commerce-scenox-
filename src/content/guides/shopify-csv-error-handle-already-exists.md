---
title: "Shopify 'Ignored Line Because Handle Already Exists'"
heading: "Shopify 'Ignored line because handle already exists': why it happens and how to fix it"
description: "Shopify skips rows with 'Ignored line because handle already exists'. See the causes, a broken and fixed CSV example and how to update or add products."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Shopify prints 'Ignored line because handle already exists' when a handle in your CSV is already taken, either by another product in the file or by one already in the store. Give each new product a unique handle, or tick the overwrite option when you mean to update existing products."
faqs:
  - q: "Is this error a failure or a warning?"
    a: "It is closer to a warning. Shopify skips the named lines and carries on, so some products may import while others do not. Check the import summary and compare the count with your file, because skipped rows are easy to miss."
  - q: "How do I update existing products instead of skipping them?"
    a: "Tick the option to overwrite products with matching handles on the import screen. Shopify then updates the existing product from your row. Take an export first as a backup, because overwrite replaces the values in the columns you supply."
  - q: "Why does a variant row trigger this error?"
    a: "Variant rows share the handle of their product on purpose. If the first row of that handle is separated from the rest by a different product, or the handle is already in the store, the group can be treated as a duplicate."
  - q: "How should handles be formatted?"
    a: "Lowercase letters, numbers and hyphens, no spaces, and unique per product. Shopify builds the product URL from the handle, so pick something readable and stable."
---

The import finishes, but the summary shows fewer products than your file contains and a message like "Ignored line #-## because handle `example` already exists". Shopify did not crash. It skipped those rows. This page explains why and how to get them in. More errors of this kind are in the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors).

## What it means

In a Shopify CSV the handle identifies a product. The first row for a handle creates the product, and later rows with the same handle add variants or images to it. If a handle is already used by another product, the importer ignores the line instead of creating a clash. Shopify's help documentation says to make sure each product has a unique handle.

## Causes

1. **Two different products share a handle.** Common when titles are similar, such as two shirts both called "classic-tee".
2. **The product is already in the store** and you imported without the overwrite option.
3. **You imported the same file twice**, perhaps after a first partial run.
4. **Variant rows are split up.** A product's rows are scattered through the file, so a later row looks like a new product with a used handle.
5. **Case or spacing differences.** `Linen-Shirt` and `linen-shirt ` may be meant as the same product but are not read as identical.
6. **A generated handle collides.** A formula that builds handles from a title or SKU produces duplicates for similar items.

## Broken row and fixed row

Two different products were given the same handle.

Broken:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant Price
classic-tee,Classic Tee Crew,Size,M,20.00
classic-tee,Classic Tee V-Neck,Size,M,22.00
```

Fixed:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant Price
classic-tee-crew,Classic Tee Crew,Size,M,20.00
classic-tee-v-neck,Classic Tee V-Neck,Size,M,22.00
```

If the two lines were meant to be one product with two variants, the second row would have an empty Title and a different option value instead.

## Step-by-step fix

1. Note the handle named in the message.
2. Search your CSV for that handle. If it appears on rows that belong to different products, give each product its own handle.
3. If it appears only on rows of one product, check that those rows sit together and that any variant rows have identical handle text.
4. Open Products in Shopify and search for the handle. If the product exists and you want it updated, export it for a backup.
5. Re-import with the overwrite option ticked.
6. If you wanted a second, separate product, change the handle and import again.
7. Compare the number of products in Shopify with the unique handles in your file.

## Prevention

Generate handles once, in a dedicated column, and check them for duplicates with a spreadsheet count formula before every import. Keep each product's rows together. When you re-import a catalog, decide up front whether you are adding or updating, and tick overwrite only for updates.

Keep a record of what was imported and when. It is easy to run the same file twice during a busy launch week.

## When to do it yourself and when to hand it off

For a few dozen products, a duplicate check and a handle column are enough. For thousands of products from several suppliers, duplicate handles are a data problem that shows up in many forms, and unpicking them is slow. Our [catalog cleanup](/catalog-cleanup) service deduplicates and standardises handles before upload, with a person reviewing every output and your approval before anything goes live. A [free 10-product sample](/free-sample) is available if your project is a fit.

---
title: "Amazon Flat File Listing: Templates, Columns and Upload Steps"
heading: "Listing products on Amazon with flat files and templates"
description: "How Amazon inventory file templates work: download the right category template, fill required fields, handle variations, upload and read the processing report."
category: feeds
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "To list in bulk on Amazon, download the category-specific inventory file in Seller Central under Catalog, Add Products via Upload, fill the required columns, save it as tab-delimited text and upload it. Check the processing report for row-level errors. Use partial update when you only want to change some fields."
faqs:
  - q: "Where do I find the Amazon inventory file template?"
    a: "In Seller Central, go to Catalog, then Add Products via Upload, then Download an Inventory File. Choose the marketplace, then drill down the category tree to the leaf category that matches your product. Each category has its own template with its own required and optional fields."
  - q: "What file format does Amazon expect for a flat file upload?"
    a: "Save the template sheet as tab-delimited text (.txt) and upload it through the Upload Products and Inventory tool. Amazon shows row-level success, warning and error messages in the Monitor Uploads report. Always save with the original header rows intact."
  - q: "What is the difference between a template and a category listing report?"
    a: "A blank category template is for creating new listings. A category listing report is a pre-filled file of your existing listings, useful as a base for bulk edits. Using the report as a template means you edit real data instead of guessing column values."
  - q: "How do I avoid blanking data when I update listings?"
    a: "Use a partial update mode when you only want to change some fields. A full-update feed with empty cells where live values exist can blank those fields. Test your update on a handful of SKUs first and check the result before running thousands."
  - q: "Are flat files still the right way to list on Amazon?"
    a: "Spreadsheet inventory files remain common, but Amazon has been developing newer tools, including programmatic listing feeds in its Selling Partner API. Check the current Seller Central help for which upload methods your marketplace and category support before building a process around one."
---

For a seller with a few products, Amazon's single-listing form is fine. At a few hundred, it is a week of clicking. The bulk route has long been the inventory file, often called a flat file: a spreadsheet template, one per product category, which you fill in and upload.

Amazon changes its listing tools over time, and categories and marketplaces differ. This guide covers the spreadsheet workflow as it is commonly used and tells you where to check your own Seller Central for current detail.

## What a flat file is

A flat file is a category-specific spreadsheet that holds one row per product (or per variation) and one column per attribute. Amazon publishes a template for each leaf category, so the required fields for shoes differ from those for a kettle. Each template defines required fields, optional fields and controlled fields that only accept certain values.

That last point is the one that takes time. Colour, size, material and department are often controlled by a drop-down or a "valid values" tab. A free-text "Navy Blue" where the template wants "Blue" is rejected, or is accepted and mapped badly.

## Step 1: get the right template

The route in Seller Central is Catalog, then Add Products via Upload, then Download an Inventory File. Pick the marketplace, then follow the category tree down to the leaf node that matches your product.

Two entry points exist, and they suit different jobs:

| Starting point | Use it for |
|---|---|
| Blank category template | Creating new listings |
| Category listing report | Editing existing listings, as it comes pre-filled with your current data |

If you already sell in the category, start from the category listing report. You get your real values, the right column names for that marketplace and a safe base for bulk updates.

Always download the template for the marketplace you sell on. Column names and valid values vary between, say, the UK and the US marketplaces, and a template saved last year may be out of date.

## Step 2: understand the columns

Exact names vary by template, but the core group is consistent:

| Column (typical name) | What it holds |
|---|---|
| seller-sku / item_sku | Your SKU. Unique per variation, stable over time. |
| product-id and product-id-type | GTIN, UPC or EAN, with its type. Required for most listings unless exempt. |
| item-name / title | The product title as shoppers see it. |
| brand | The brand name. |
| bullet_point1 to bullet_point5 | The feature bullets. |
| product_description | The long description. |
| standard_price / price | Your selling price. |
| quantity | Stock for merchant-fulfilled items. |
| main_image_url and other_image_url | Public image links. |
| update-delete | The action for the row. |
| parent-child, parent-sku, relationship-type, variation-theme | How variations connect. |

Read the template's instruction tabs before you fill anything. They describe the field rules for that category, including character limits and image requirements. Use the template's own guidance and Seller Central's category rules over any general guide, including this one. Our [image requirements guide](/guides/product-image-requirements) summarises the common image rules across channels.

### The update-delete column

This column tells Amazon what to do with the row, with values such as Update, PartialUpdate and Delete. Treat it carefully. A full Update with empty cells where live values exist will blank those fields. A PartialUpdate changes only the fields you provide. For a price or stock change, use partial update, and test on a few SKUs first.

## Step 3: fill it in, with a worked example

Here is a simplified shape for a shirt with two colours and two sizes. Real templates have many more columns, and names differ, so use this as a picture of the structure, not a file to upload.

```text
seller-sku   parent-child  parent-sku  variation-theme   item-name                         color   size  standard_price  quantity
LS-PARENT    parent                     SizeColor         Northfield Linen Shirt, Men's
LS-NAT-M     child         LS-PARENT                      Northfield Linen Shirt, Natural   Beige   M     2499            20
LS-NAT-L     child         LS-PARENT                      Northfield Linen Shirt, Natural   Beige   L     2499            12
LS-NAV-M     child         LS-PARENT                      Northfield Linen Shirt, Navy      Blue    M     2499            9
LS-NAV-L     child         LS-PARENT                      Northfield Linen Shirt, Navy      Blue    L     2499            0
```

Points to notice:

- **A parent row** groups the variations and carries no stock or price. Each child holds its own SKU, price and quantity.
- **The variation theme** says which attributes vary (here size and colour). It has to be a theme allowed for that category.
- **Colour is a standard value** (Beige, Blue), while your own marketing colour (Natural, Navy) can stay in the title or a separate colour-name field if the template has one.
- **Each child has its own barcode** in product-id, if the product has GTINs. Our [GTIN guide](/guides/gtin-mpn-brand) covers what to do without them. Some categories and brands allow exemptions; Seller Central's help explains how to request one.

## Step 4: save in the right format

Amazon's guidance is to save the template sheet as tab-delimited text (.txt). Keep the header rows as they are. Common ways to break the file:

- **Deleted or renamed header rows.** Amazon matches columns using them.
- **Spreadsheet auto-formatting.** Barcodes turn into scientific notation and lose leading zeros. Format ID columns as text before pasting.
- **Smart quotes and special characters** in titles and descriptions, from a word processor.
- **Wrong encoding.** If accented characters break, check the encoding you saved with and the template's instructions.
- **Extra sheets.** Save only the template sheet, and confirm you have not shifted columns.

## Step 5: upload, check and read the report

Upload through the Upload Products and Inventory tool. Amazon offers a check-your-file option that tests the template for common listing errors without adding products to the catalog; use it before the real upload, since it is free and quick.

After the live upload, open Monitor Uploads. Amazon returns row-level results: success, warning or error, with a message per row. Work through them in this order:

1. **Errors.** The row did not process. Fix the data and re-upload only those rows.
2. **Warnings.** The row processed, but something is off, such as a missing recommended field. Fix the ones that affect conversion.
3. **Success.** Spot-check three listings on the live page: title, images, price, variations grouped correctly.

A new listing can take time to appear, and other problems show up later in Seller Central's listing quality or suppression views. Keep checking the Manage Inventory page for suppressed products in the first days.

## Common problems and fixes

| Symptom | Likely cause |
|---|---|
| "Invalid value" on a column | Controlled field; use the exact value from the valid-values tab |
| Variations not grouping | Parent and child rows do not match: SKU, parent-sku or variation theme |
| Barcode errors | Lost leading zeros, wrong type, or a number that is not registered to you |
| Images missing | URLs not public, wrong format or too small for the category rule |
| Fields vanish after an update | Full update with blank cells instead of partial update |
| Wrong category | Template chosen too early in the tree; pick the leaf category |

## Spreadsheet or something else

The spreadsheet route is easiest to inspect, review and fix by hand. Amazon also provides programmatic listing feeds through its Selling Partner API, which suit developers and integrations. Our experience is that for catalogs up to a few thousand listings, a well-built spreadsheet and a clean source file are the practical choice. Check Seller Central's current documentation for which methods your category supports, as Amazon has been shifting tooling over time.

If you use Shopify and want channel integration, a connector app can sync products to Amazon. These still depend on good category mapping and identifiers, so the data work does not disappear.

## When to do it yourself and when to hand it off

For 20 or 30 products in one category, filling the template yourself is fine. Download the right file, use the category listing report if you can and test with five SKUs.

It becomes a project when you have several categories (each with its own template), variations, mixed-quality supplier data and barcode gaps. Mapping your catalog to Amazon's controlled values, building parent and child rows and chasing processing errors is the work our [product feed management service](/product-feed-management) covers. An AI engine does the volume, a person reviews every output and you approve before anything is uploaded. The [free sample](/free-sample) shows how ten of your products would look in the template.

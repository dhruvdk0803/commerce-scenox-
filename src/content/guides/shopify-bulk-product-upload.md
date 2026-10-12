---
title: "Shopify Bulk Product Upload with CSV: Complete Guide"
heading: "Shopify bulk product upload with CSV: the complete guide"
description: "How to bulk upload products to Shopify with a CSV: key columns, variant and image rows, metafields, import steps, the 15 MB limit and overwriting by handle."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "To bulk upload to Shopify, download the sample product CSV, fill one row per product or variant, save as UTF-8, then go to Products, Import. Files are limited to 15 MB, so split large catalogues. Tick the overwrite option to update existing products that share a handle."
faqs:
  - q: "How many products can I upload to Shopify at once with a CSV?"
    a: "Shopify does not state a product count limit for CSV import. The practical limit is the 15 MB file size, so large catalogues are split into several files. Each product can have up to 3 options and up to 250 images, and stores have overall variant limits that depend on plan."
  - q: "How do I update existing Shopify products with a CSV?"
    a: "Export your products, edit the file, keep the handle column unchanged, then import with the Overwrite products with matching handles option ticked. Without that option, rows whose handle already exists are ignored. Be careful: blank cells in columns you include overwrite existing values with blank."
  - q: "Can I import metafields with the Shopify CSV?"
    a: "Product metafields can be imported using columns named in the form product.metafields.namespace.key, optionally with a label in front. Variant metafields are not supported in CSV import. For those you need an app such as Matrixify or the API."
  - q: "Do I need Excel to prepare a Shopify CSV?"
    a: "No. Google Sheets or a plain editor is often safer, because Excel can change encoding, strip leading zeros from SKUs and insert curly quotes. Whatever you use, save as CSV in UTF-8 and check the result in a text editor before uploading."
  - q: "Can I upload product images through the CSV?"
    a: "Yes, using public image URLs. Shopify downloads each image during import and stores a copy. The links must be direct, HTTPS and not password protected. Videos and 3D models cannot be imported through CSV."
---

Shopify's CSV import is the standard way to load more than a handful of products, and it works well once you understand how the file is structured. Most failed imports come from the same few causes: a malformed variant row, an unreachable image link or an encoding problem. This guide covers the template, the columns that matter, variants and images, metafields, the import steps and what to do with a large catalogue. The details below are checked against Shopify's help documentation as of October 2026.

## How the Shopify product CSV is built

Each product starts with one full row. Extra rows with the same handle add more variants or more images. Only the first row carries the product-level fields such as title, description and vendor; the extra rows leave those blank and fill the variant or image columns.

The first line must be the header row. Shopify recommends you download the sample CSV from the import screen, delete the example products and fill in your own, rather than writing headers from memory.

One thing to watch: column names have changed over time. Older exports and many tools use headers such as `Handle`, `Body (HTML)`, `Variant SKU`, `Variant Price` and `Image Src`. Shopify's current documentation names the same fields as URL handle, Description, SKU, Price and Product image URL. Use whichever header set is in the sample you downloaded, and do not mix the two styles in one file.

## The key columns

| Purpose | Classic header | Notes |
|---|---|---|
| Unique ID | Handle | Lowercase letters, numbers and hyphens. Identifies the product. |
| Name | Title | Required on the first row of each product. |
| Description | Body (HTML) | HTML allowed. |
| Brand | Vendor | Free text. |
| Taxonomy | Product Category | Full breadcrumb or category ID from Shopify's standard taxonomy. |
| Your label | Type | Free text, for your own organisation. |
| Keywords | Tags | Comma separated, up to 250. |
| Visibility | Published | `true` or `false`. |
| Option | Option1 Name, Option1 Value (and 2, 3) | Up to three options per product. |
| SKU | Variant SKU | Per variant. |
| Price | Variant Price | Number only, no currency symbol. |
| Stock | Variant Inventory Qty, Variant Inventory Tracker | Leave tracker blank if you do not track stock. |
| Image | Image Src, Image Position, Image Alt Text | One image per row. |
| SEO | SEO Title, SEO Description | Up to 70 and 320 characters respectively. |
| State | Status | `active`, `draft` or `archived`. |

Other columns cover compare-at price, cost per item, weight, tax, shipping and fulfilment. Leave out the ones you do not need; a column you omit keeps its existing value on overwrite, while a column you include but leave blank clears it.

## A filled example

This shows a product with two options and one extra image, using classic headers (shortened for readability).

```csv
Handle,Title,Body (HTML),Vendor,Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Variant SKU,Variant Price,Variant Inventory Qty,Image Src,Image Position,Image Alt Text,Status
linen-shirt,Linen Shirt,<p>Relaxed linen shirt.</p>,Northwind,Shirts,"linen, summer",true,Size,S,Colour,Sand,LS-S-SND,49.00,10,https://cdn.example.com/ls-sand-1.jpg,1,Linen shirt in sand,active
linen-shirt,,,,,,,Size,M,Colour,Sand,LS-M-SND,49.00,14,https://cdn.example.com/ls-sand-2.jpg,2,Sand linen shirt back view,
linen-shirt,,,,,,,Size,S,Colour,Navy,LS-S-NVY,49.00,8,,,,
linen-shirt,,,,,,,Size,M,Colour,Navy,LS-M-NVY,49.00,6,,,,
```

Notice that the later rows repeat the handle and the option names, give each variant a unique combination of option values, and leave the product-level fields empty. The image rows can be separate from the variant rows too; what matters is the repeated handle.

## Variants

Every variant is one row, and every combination of option values must be unique within the product. Shopify allows up to three options per product. If you include SKU or price columns but leave out the option name and value columns, the variant data is dropped, so keep them together. Changing an option value on an existing product during an overwrite deletes the old variant IDs and creates new ones, which affects anything tied to those IDs, such as inventory history or app data.

## Images

Put each image URL in the image column on its own row, with a position number starting at 1 and alt text. Rules to follow:

- URLs must be public, direct, HTTPS and not behind a password.
- Shopify downloads the image during import and re-hosts it, so the URL is only needed during the import.
- Finalise file names first. They cannot be edited afterwards.
- A product can hold up to 250 images. Alt text can run to 512 characters, but aim for about 125.
- Videos and 3D models cannot be imported through CSV.
- If you link to files already in Shopify's Files area, the image is duplicated, so host images elsewhere or add them after import.

## Metafields

Product metafields can be added as extra columns. The header format is the label followed by the definition in brackets, for example `Fabric (product.metafields.shopify.fabric)`. The shorter form `product.metafields.namespace.key` also works. You can find the namespace and key under Settings, Custom data, Products. Variant metafields are not supported in CSV import or export, so those need an app such as Matrixify or an API-based tool. Metafields that reference other products will fail until those products exist, so import products first and add the metafield values in a second pass.

## Import steps

1. In your Shopify admin go to Products and click Import.
2. Click Add file and select your CSV.
3. Optionally untick Publish new products to all sales channels, so new products only reach the online store.
4. Optionally tick Overwrite products with matching handles.
5. Click Upload and continue.
6. Review the summary and click Import products.

Shopify emails the account owner when it finishes. An import cannot be cancelled once it starts and there is no import history, so check the store activity log if you need to review changes. Bulk deletion of products is not possible through CSV.

## Overwriting existing products

To update products you already have, export them first, edit the export and keep the handles unchanged. Import with the overwrite option ticked. Without that option, any row with a handle that already exists is ignored. Three behaviours cause the most surprises:

- A blank cell in a column you include replaces the existing value with blank.
- A column you leave out is not touched.
- Changed option values replace the variants, as covered above.

Test on one or two products before overwriting a whole catalogue, and keep the original export as a backup.

## Large catalogues

The file size limit for import is 15 MB. If an upload fails or times out, split the file and upload the parts one at a time, making sure each variant row stays in the same file as its first row for that handle. Large stores also have daily variant creation limits in some cases, for stores with very large variant counts, which can stop an import part way through. For a big project, test a small slice first, add images in a final pass if they cause timeouts and keep a log of what each file contained. When something does go wrong, see [Shopify CSV import errors and how to fix them](/guides/shopify-csv-import-errors).

## When to do it yourself and when to hand it off

For a catalogue of up to a couple of hundred products with clean data, doing the import yourself is sensible, and the sample CSV plus this guide is enough. When you have thousands of rows, supplier files with inconsistent sizes and categories, or a launch date, the preparation work is the real job, not the import. Our [bulk product upload service](/bulk-product-upload) handles that: we inspect your files, give a fixed quote before starting, review every output and wait for your approval before anything goes live. The [free 10-product sample](/free-sample) is available if the project is a fit. Turnaround starts from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. For cost context see [how much product upload costs](/guides/product-upload-cost).

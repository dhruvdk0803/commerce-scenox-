---
title: "Magento 2 Product Import: CSV, Configurables, Images, Errors"
heading: "Magento 2 and Adobe Commerce product import: CSV format, configurables and validation errors"
description: "Import products into Magento 2 or Adobe Commerce from CSV: required columns, configurable products, image paths and validation error fixes."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Magento 2 imports products from CSV under System > Data Transfer > Import. Each row needs a sku, attribute_set_code, product_type, product_websites, name and price. Configurable products use a configurable_variations column that links simple product SKUs. Images are read from var/import/images or a URL. Validate before importing."
faqs:
  - q: "What are the required columns for a Magento 2 product import?"
    a: "For new products you need sku, attribute_set_code, product_type, product_websites, name and price, and your categories and visibility should be set deliberately. Existing products updated by SKU need far less. Export a sample from your own store, because required attributes can vary with your attribute sets."
  - q: "How do I import configurable products in Magento 2?"
    a: "Import the simple child products first or in the same file, then add a row with product_type configurable and a configurable_variations value that lists each child as sku=...,attribute=value pairs, separated by pipes. Add configurable_variation_labels to name the dropdown labels. The attribute must exist and be in the attribute set."
  - q: "Where do product images go for a Magento 2 import?"
    a: "By default in var/import/images under the Magento root, or a subfolder you name in Images File Directory. In the CSV, use the filename or relative path in base_image, small_image, thumbnail_image and additional_images. You can also use full public URLs instead."
  - q: "What is the difference between Add/Update, Replace and Delete?"
    a: "Add/Update merges the file into existing data and creates what is missing. Replace deletes and rebuilds matching products from the file, so omitted data is lost. Delete removes products by SKU and ignores other columns. Use Add/Update unless you are sure."
  - q: "Why does my Magento import fail validation?"
    a: "Common causes are an attribute option value that does not exist, a missing required column, a duplicate url_key, an invalid attribute_set_code, a wrong field separator, or a file Excel has saved with extra header characters. The error report lists the row and the problem, so fix by row number."
---

Magento 2 and Adobe Commerce have a capable importer, and a fussy one. It will accept a sheet of five thousand products in one go, and it will also reject the whole file over one misspelt attribute value. Know the column rules and you save a lot of validation rounds.

The importer lives at System > Data Transfer > Import. Adobe's reference is the [Import data documentation on Experience League](https://experienceleague.adobe.com/en/docs/commerce-admin/systems/data-transfer/import/data-import).

## Start from your own store's export

Export products from System > Data Transfer > Export (entity type: Products) and use that file as your template. It carries the exact headers, attribute sets and values your store uses. Building from a generic template is the usual cause of "attribute not found" errors.

Save as UTF-8 CSV. Adobe's own guidance warns that Excel can add characters to the header row that stop an import; a UTF-8 capable editor or Google Sheets avoids it.

## Required columns for a new product

A minimum viable simple product row:

| Column | Example | Notes |
|---|---|---|
| sku | JKT-210 | Unique, the match key |
| attribute_set_code | Default | Must exist in your store |
| product_type | simple | simple, configurable, virtual, downloadable, grouped, bundle |
| product_websites | base | Website code, not name |
| name | Waxed cotton jacket | |
| price | 129.00 | Numbers only |

Beyond those, set these on purpose: `categories` (path such as `Default Category/Men/Jackets`, several separated by a comma), `product_online` (1 or 0), `visibility` (for example `Catalog, Search`), `tax_class_name`, `weight`, `qty`, `description` and `short_description`.

```
sku,attribute_set_code,product_type,product_websites,name,price,categories,product_online,visibility,qty
JKT-210,Default,simple,base,Waxed cotton jacket,129.00,"Default Category/Men/Jackets",1,"Catalog, Search",40
```

Rows for other store views repeat the SKU with `store_view_code` filled, which is how you add translated names and descriptions.

## additional_attributes

Custom attributes can have their own columns, or go into `additional_attributes` as comma-separated pairs:

```
additional_attributes
"color=Olive,material=Cotton,size=M"
```

The value must match an existing option label for dropdown attributes. "Olive green" will fail if the option is "Olive". For a new option, create it in the attribute first.

## Configurable products

A configurable product is a parent that points at simple children. Each child is its own row with its own SKU, price and stock. The parent row carries two extra columns.

1. Import the simple children (same file is fine, children first).
2. Add the configurable row with product_type `configurable`.
3. Fill `configurable_variations` with one entry per child, separated by a pipe.
4. Fill `configurable_variation_labels` to name the selectors.

```
sku,product_type,name,configurable_variations,configurable_variation_labels
JKT-210-M,simple,Waxed cotton jacket M,,
JKT-210-L,simple,Waxed cotton jacket L,,
JKT-210,configurable,Waxed cotton jacket,"sku=JKT-210-M,size=M|sku=JKT-210-L,size=L","size=Size"
```

Each child's `additional_attributes` should also set `size=M` and so on. The attribute you configure on (size, colour) must be global scope, a dropdown, and included in the attribute set used by the products. Miss any one and the configurable imports without its options.

## Images

Magento reads images in four columns: `base_image`, `small_image`, `thumbnail_image` and `additional_images`. In additional_images, separate several filenames with commas.

Two ways to supply files:

- Local server: upload to `var/import/images` (or a subfolder) in the Magento root. Leave Images File Directory blank for the default, or name the subfolder. Older pages and older versions mention `pub/media/import`; since 2.3.2 the folder you enter is appended to the base images directory, so check your version.
- URL: put the full public image URL in the column.

In the CSV, use the filename only for files in the base folder, or the relative path for a subfolder. Importing does not resize anything; resizing happens at the front end, so confirm image resizing works on the store.

## Import behaviour and validation settings

On the import screen, Behaviour has three options.

| Behaviour | What it does | Risk |
|---|---|---|
| Add/Update | Creates new products and merges changes into existing ones | Multi-value fields left blank are not cleared |
| Replace | Rebuilds matching products from the file | Data not in the file is lost |
| Delete | Removes products by SKU, other columns ignored | Irreversible without a backup |

You also set Validation Strategy (stop on error or skip errors) and Allowed Errors Count. Use Check Data first. It validates without importing, and lists errors with row numbers. Fix, re-check, then Import.

### Batch sizes

Magento does not enforce a fixed row limit, but large files hit PHP limits, queue workers and indexer time. In our experience splitting into files of a few thousand rows, or fewer if every row carries images, is safer. Run the import during low traffic and reindex afterwards.

## Common validation errors

| Error pattern | Cause | Fix |
|---|---|---|
| Value for attribute X contains incorrect value | Option label not found | Match the existing option exactly or create it |
| Invalid value in Attribute Set column | attribute_set_code wrong | Use the code from Stores > Attributes > Attribute Set |
| URL key for specified store already exists | Duplicate url_key | Make url_key unique, or leave blank to auto-generate |
| Please make sure your file is a valid CSV | Wrong separator or encoding | Re-save UTF-8, comma delimited; check the separator in the import screen |
| Product with specified SKU not found (Delete) | SKU absent | Check spelling and spaces |
| Configurable not showing options | Attribute scope, type or set mismatch | Fix the attribute settings, re-import the parent |

## When to do it yourself and when to hand it off

For a few hundred simple products and a developer who knows your attribute sets, the importer is fine and cheap. Test on a staging copy and keep a database backup before Replace or Delete.

Configurables with several attributes, thousands of rows, messy supplier data, or an attribute set that needs cleaning first is where time disappears. Our [bulk product upload](/bulk-product-upload) service handles Magento and Adobe Commerce: an AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff account you can remove, never your password. Pricing starts at ₹6,999 / $149 / £119 / A$229 for up to 250 products, with a fixed quote after we inspect your files. Turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can try the [free 10-product sample](/free-sample) first. If you are moving platforms, see [Magento to Shopify migration](/guides/magento-to-shopify-migration).

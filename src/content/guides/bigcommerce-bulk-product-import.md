---
title: "BigCommerce Bulk Product Import: CSV Template and Fixes"
heading: "BigCommerce bulk product import: the CSV template, variants, images and common errors"
description: "Bulk import products into BigCommerce with the v3 CSV template: Product, Variant and Image rows, required fields, updates and common errors."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "BigCommerce's product import CSV uses an Item column to tell each row what it is: Product, Variant, Image or Video. A product row comes first, followed by its variant and image rows. New products need Item, Type, Name, Price and Weight. Update existing items by supplying their ID. Export a sample first."
faqs:
  - q: "What are the required fields for a BigCommerce product import?"
    a: "For physical products, BigCommerce lists Item, Type, Name, Price and Weight. Digital products need Item, Type, Name and Price. Variants also need a SKU. Optional columns should be removed or filled in, because blank values are generally not accepted unless stated."
  - q: "What is the Item column in the BigCommerce CSV?"
    a: "It sets what each row represents: Product, Variant, Image or Video. The value is case-sensitive and controls which other fields apply to that row. Product rows come first, with their variants and images in the rows beneath."
  - q: "How do I update existing products in BigCommerce by CSV?"
    a: "Export them, edit the file, and import it again. The Product ID column is system-generated and required to update an existing row. Leave it blank for new products. Keep only the columns you want to change to reduce the chance of overwriting other data."
  - q: "How big can a BigCommerce import file be?"
    a: "BigCommerce documents a 20 MB maximum for the CSV and recommends staying around 10,000 products or fewer per import for performance. Split larger catalogs into several files. Always check the current limits in the help centre before a big run."
  - q: "How do I add multiple images to a BigCommerce product by CSV?"
    a: "Add one Image row under the product for each image, each with an Image URL (Import). Set Image is Thumbnail to TRUE for one image only, and use Image Sort Order to control position. Alt text goes in Image Description, up to 255 characters."
---

BigCommerce's bulk importer is more structured than most. One file can carry products, their variants and their images, each on a separate row, linked by position. That is neat once you know it, and confusing if you treat it like a flat spreadsheet. This guide covers the v3 template and the mistakes we see.

BigCommerce keeps the field reference in its help centre under [Supported Product Fields](https://support.bigcommerce.com/articles/en_US/Knowledge/Supported-Product-Fields). Field names there change between the legacy and current importers, so always check against a file exported from your own store.

## Start with an export

Go to Products > Export, choose the Bulk Edit template (the v3 format), and export a few products. That file has the right headers for your store. Build your import from it, and delete the columns you do not use. Blank cells in the wrong places cause errors; absent columns do not.

Only CSV is accepted. Save as UTF-8.

## How the Item column works

The Item column is the first column and tells BigCommerce what each row is. Values are case-sensitive.

| Item value | Meaning |
|---|---|
| Product | The product itself: name, price, description, categories |
| Variant | One purchasable combination of options, with its own SKU |
| Image | One product image |
| Video | A YouTube video |

Rows are grouped by position. A Product row is followed by its Variant rows, then Image rows, and the next Product row starts the next product. Do not interleave products.

```
Item,ID,Name,Type,SKU,Price,Weight,Options,Image URL (Import),Image is Thumbnail,Image Sort Order
Product,,Linen shirt,physical,LS-100,59.00,0.4,,,,
Variant,,,,LS-100-S,,,Size=S,,,
Variant,,,,LS-100-M,,,Size=M,,,
Image,,,,,,,,https://example.com/img/ls-100-front.jpg,TRUE,0
Image,,,,,,,,https://example.com/img/ls-100-back.jpg,FALSE,1
```

This is a simplified layout to show the structure. The Options column follows a fixed format, so copy the pattern from an exported product with variants rather than inventing one. Variant SKUs must be unique, are case-insensitive, cannot contain commas and can run to 255 characters.

## Required fields

For a new physical product BigCommerce lists Item, Type, Name, Price and Weight as required. A digital product drops Weight. A new variant needs a SKU. Certain optional fields, such as Product URL, Is Visible and Tax Class, either need valid values or must be removed from the file.

Set these on purpose even when optional: category assignment, brand, inventory tracking and levels, product condition, and the page title and meta description. Most supplier files leave them blank, and the storefront suffers for it.

## Variants and options

Each variant row is one combination, for example Size=M with Colour=Olive. All variants of a product must use the same set of option names. A variant can have its own price, weight and image through a Variant Image URL (limit 1,024 characters per URL), but only one image per variant.

Mistakes to avoid: spelling an option value two ways across variants ("Olive" and "olive green"), missing SKUs on variant rows, and mixing option names between variants of one product. The importer accepts some of these and creates a messy product; others it rejects whole.

## Images

Each image is its own row. Use Image URL (Import) for a public URL, Image is Thumbnail set to TRUE for exactly one image per product, Image Sort Order with whole numbers (blank counts as 0), and Image Description for alt text up to 255 characters. URLs must be directly reachable. Share links from Drive, Dropbox or a login-protected supplier portal return web pages, not images, and the row fails.

## Custom fields

Custom fields use a JSON array in a single cell:

```
[{"name":"Fabric","value":"Linen"},{"name":"Care","value":"Machine wash cold"}]
```

To update an existing custom field, each object also needs its `id`. Remember to double the quotes inside a CSV cell if your editor does not do it for you.

## Updating existing products

Export the products you want to change, edit, and import again. The ID column is system-generated and required for updating an existing row; it must be blank for new items. Keep the file to the columns you are changing.

Two cautions. Importing columns you did not intend to change can overwrite live data with stale values from an old export. And take a fresh export as a backup before any large update.

## Limits and common errors

BigCommerce documents a 20 MB maximum CSV size and suggests that around 10,000 products can be imported without affecting performance. Split bigger catalogs.

| Error pattern | Likely cause | Fix |
|---|---|---|
| Item type not recognised | "product" or "Variants" in the wrong case or form | Use exactly Product, Variant, Image, Video |
| Required field missing | Name, Price, Type or Weight absent on a Product row | Fill it, or remove optional columns that are blank |
| Duplicate SKU | Same SKU on two rows or an existing product | Make SKUs unique |
| Image not imported | URL not public or not a direct image link | Test the URL in a private window |
| Variant options rejected | Wrong Options format or inconsistent option names | Copy format from an exported product |
| Category not found | Category path typed differently from the store | Match the exact category path, or create it first |

Import a small test batch first and inspect the products in the admin before the full run.

## When to do it yourself and when to hand it off

A hundred or so products, tidy data, a morning to spare: do it yourself. Export a sample, build around it, test with ten, then run the rest.

Hand-offs make sense when supplier data arrives in several shapes, variants run into the thousands, images need sourcing or cleaning, or there is a launch date. Our [bulk product upload](/bulk-product-upload) service covers BigCommerce: an AI engine does the volume, a person reviews every output, and you approve before anything goes live. Catalog listing starts at ₹6,999 / $149 / £119 / A$229 for up to 250 products, with a fixed quote after we inspect your files. Turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. We never ask for store passwords, only a staff account you can remove. Start with the [free 10-product sample](/free-sample) if you want to see the quality first. Related guides: [WooCommerce product CSV import](/guides/woocommerce-product-csv-import) and [fashion catalog upload](/guides/fashion-catalog-upload).

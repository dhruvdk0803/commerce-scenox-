---
title: "WooCommerce Product CSV Import: Columns, Variations, Fixes"
heading: "WooCommerce product CSV import: columns, variable products and the failures to expect"
description: "Import products into WooCommerce with the built-in CSV importer: key columns, simple vs variable rows, updating by SKU and fixing failures."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "WooCommerce's built-in importer reads a CSV with one row per product. Variable products need a parent row (Type = variable) followed by variation rows (Type = variation) whose Parent column holds the parent SKU. Tick Update existing products to match by ID or SKU, and split big files if the server times out."
faqs:
  - q: "How do I import variable products into WooCommerce with a CSV?"
    a: "Add one row with Type set to variable that lists every attribute value, then one row per variation with Type set to variation, a unique SKU, a blank ID and the parent's SKU in the Parent column. Each variation row carries one value per attribute. The parent row should come first in the file."
  - q: "Can the WooCommerce importer update existing products?"
    a: "Yes. Tick Update existing products on the import screen and WooCommerce matches rows by ID or SKU. Rows that match nothing are skipped, and with the box unticked, rows whose ID or SKU already exist are skipped too. Only include the columns you want changed."
  - q: "Why does my WooCommerce import stop halfway or time out?"
    a: "The server ran out of time or memory for that file. Split the CSV into batches of a few hundred rows, especially if images are being downloaded, and test on staging first. If it keeps happening, ask the host to raise PHP memory and execution time."
  - q: "How do I import multiple images in WooCommerce?"
    a: "Put the image URLs in the Images column separated by commas. The first becomes the featured image and the rest go to the gallery. Each URL must be publicly reachable and return an actual image, not a login or error page."
  - q: "When should I use WP All Import instead of the built-in importer?"
    a: "When the supplier file does not match WooCommerce's column layout and you would otherwise reshape it by hand every time, or when you need scheduled imports from a URL or feed. For a one-off upload of a clean, WooCommerce-formatted file, the built-in importer is enough."
---

WooCommerce ships with a product CSV importer, and for a clean file it does the job. The difficulty is rarely the importer. It is the file: columns named wrongly, variations that do not point at their parent, images that cannot be fetched. This guide covers the columns, the two product structures you will use, updates, and the failures we see most.

You will find the importer under Products > Import in the WordPress admin. The official reference is the [WooCommerce product CSV import documentation](https://woocommerce.com/document/product-csv-importer-exporter/).

## Start from an export, not a blank sheet

The quickest way to get the headers right is to export one or two existing products, or download the sample CSV that WooCommerce provides on the import screen. Then paste your data under those headers. Typing headers from memory is how "Regular Price" and "Regular price" end up as different columns.

Keep the file as plain CSV, UTF-8 encoded. If you edit in Excel, save as "CSV UTF-8", otherwise accented characters and rupee or pound signs turn into junk.

## The columns that matter

The importer recognises dozens of columns. For a normal catalogue upload you will use a small set.

| Column | What goes in it |
|---|---|
| ID | Leave blank for new products. Fill it only to update an existing one. |
| Type | simple, variable, variation, grouped or external |
| SKU | Unique per product and per variation |
| Name | The product title |
| Published | 1 to publish, 0 for draft, -1 for private |
| Short description / Description | HTML or plain text |
| Regular price / Sale price | Numbers only, no currency symbols |
| Categories | Comma-separated, with > for hierarchy |
| Tags | Comma-separated |
| Images | Comma-separated URLs |
| Parent | For variations: the parent's SKU, or id: followed by the product ID |
| Attribute 1 name | For example Size |
| Attribute 1 value(s) | For example S, M, L |
| Attribute 1 visible | 1 to show on the product page |
| Attribute 1 global | 1 to use a store-wide attribute, 0 for a product-only one |

Further columns cover stock, weight and dimensions, shipping class, upsells, cross-sells, downloads and custom fields prefixed with `meta:`. Add them only if you have the data.

### Categories

Use > to nest and a comma to separate separate categories:

```
Clothing > Women > Dresses, New Arrivals
```

That assigns the product to Dresses (under Women, under Clothing) and to New Arrivals. Missing categories are created on import. Watch the spelling: "Dresses" and "Dress" will become two categories.

## Simple products

A simple product is one row, Type = simple, with its own price, SKU and images.

```
ID,Type,SKU,Name,Published,Regular price,Categories,Images
,simple,MUG-001,Stoneware mug,1,14.00,Home > Kitchen,https://example.com/img/mug-1.jpg
```

If you are setting up an attribute for filtering on a simple product, fill the Attribute 1 columns on that same row.

## Variable products: parent row plus variation rows

A variable product is a parent row followed by one row per variation. This is where most imports go wrong, so the rules are worth stating plainly.

1. The parent row has Type = variable and lists every option in Attribute 1 value(s), for example `S, M, L`.
2. Each variation row has Type = variation, a blank ID, its own unique SKU, and the parent's SKU in Parent.
3. Each variation row gives one value per attribute. If you list several, WooCommerce takes the first. A blank value means "any".
4. Attribute names and values on a variation must match the parent exactly.
5. The parent row should come before its variations in the file.

```
ID,Type,SKU,Name,Parent,Regular price,Attribute 1 name,Attribute 1 value(s),Attribute 1 visible,Attribute 1 global
,variable,TEE-100,Cotton tee,,,Size,"S, M, L",1,1
,variation,TEE-100-S,Cotton tee - S,TEE-100,19.00,Size,S,,1
,variation,TEE-100-M,Cotton tee - M,TEE-100,19.00,Size,M,,1
,variation,TEE-100-L,Cotton tee - L,TEE-100,21.00,Size,L,,1
```

For two attributes, such as size and colour, add Attribute 2 name and Attribute 2 value(s) columns. Each variation row then carries one size and one colour. If your variations do not appear after import, the usual causes are a duplicate SKU, a wrong Parent value, or an attribute name that differs from the parent by a space or capital letter.

## Updating existing products

Tick Update existing products on the import screen and WooCommerce matches each row by ID or SKU. Include only the columns you want changed, plus the ID or SKU to match on. A price update file can be as small as two columns.

Two behaviours catch people out. A row with an ID that matches nothing is skipped. And with the box unticked, any row whose ID or SKU already exists is skipped, so a re-run of the same file will quietly do nothing. Export a backup before any bulk update. There is no undo.

## Images

Put image URLs in the Images column, comma-separated. The first is the featured image, the rest fill the gallery. The importer downloads each one into the Media Library, so every URL must be public and must return an image file.

Typical failures: a Google Drive or Dropbox share link (which returns an HTML page), a host that blocks requests from your server, hotlink protection, or a filename with spaces left unencoded. The safer route for large sets is to upload images to the Media Library first via FTP or a media plugin and reference those URLs. The core importer also cannot set image alt text, so that needs a separate step.

## Common failures and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| Import stops partway or shows a server error | PHP time or memory limit hit, often while fetching images | Split into batches of a few hundred rows; ask the host to raise limits |
| Everything lands in one column | Wrong delimiter or file saved with semicolons | Re-save as comma-delimited CSV |
| Commas in descriptions break rows | Value not wrapped in quotes | Wrap fields containing commas in double quotes |
| "Invalid file type" or upload refused | File too large, or contains HTML the server blocks | Raise the upload limit, or place the file in the uploads folder and use the advanced options path |
| Variations missing | Duplicate SKU, wrong Parent, attribute mismatch | Check each against the rules above |
| Products imported but images blank | URLs not reachable | Test each URL in a private browser window |

Always run a first import with five to ten products on a staging site or at least as drafts. Fix the pattern, then run the full file.

## When to use WP All Import

The built-in importer expects WooCommerce's own layout. Supplier files rarely look like that. If you receive a differently shaped spreadsheet or XML feed every month, or you need scheduled imports from a URL, a mapping plugin such as WP All Import saves you from reshaping the file each time. It has a learning curve and licence cost, so for a single launch upload it is usually more effort than preparing the CSV.

## When to do it yourself and when to hand it off

If you have under a hundred products, a tidy spreadsheet and some patience, do it yourself with the steps above. A staging test and a batch size of a few hundred will get you through.

It gets harder with thousands of variations, supplier data in four different formats, missing descriptions to write, or a launch date. That is the work we do: our [bulk product upload service](/bulk-product-upload) uses an AI engine for the volume, a person reviews every output, and you approve before anything goes live. Catalog listing starts at ₹6,999 / $149 / £119 / A$229 for up to 250 products, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. We work through a staff account you can remove, never your password. If you want to see the output first, the [free 10-product sample](/free-sample) is the place to start. Related: [Magento 2 product import](/guides/magento-2-product-import) and [fashion catalog upload](/guides/fashion-catalog-upload).

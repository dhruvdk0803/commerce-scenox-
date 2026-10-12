---
title: "Shopify Variants and Options via CSV: How to Structure Them"
heading: "Shopify variants and options via CSV: how to structure the file"
description: "How Shopify reads variants from a product CSV: option columns, repeated rows per handle, variant images and the overwrite behaviour that deletes variant IDs."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "In a Shopify product CSV, one product is a group of rows sharing the same URL handle. The first row carries the product data and the first variant; each extra row adds one variant with its own option values, SKU, price and stock. A product can have up to three options."
faqs:
  - q: "How many options can a Shopify product have in a CSV?"
    a: "Three. Shopify's CSV documentation caps options at three per product, using the Option1, Option2 and Option3 column groups. If your supplier has four attributes, such as size, colour, material and length, combine two into one option or move one into a metafield."
  - q: "Why did my variants disappear after re-importing a CSV?"
    a: "Changing Option values in a file that overwrites matching handles makes Shopify delete the old variant IDs and create new ones. Anything tied to the old IDs, such as inventory history or app data, is lost. Update prices and stock in a file that keeps option values identical."
  - q: "How do I add a different image for each colour variant?"
    a: "Use the Variant image URL column on the variant's row. The Product image URL column is not variant-specific. Put the shared gallery images on their own rows with Product image URL and Image position, and the colour image on the matching variant row."
  - q: "Can I leave the SKU column blank?"
    a: "You can, but variant columns such as SKU depend on Option name and Option value being present. Shopify warns that a column depending on missing data can cause existing data to be deleted. For products with no variants, use Title as the option name and Default Title as the value."
  - q: "What is the difference between Product image URL and Variant image URL?"
    a: "Product image URL adds an image to the product gallery and is not tied to a variant. Variant image URL assigns an image to the variant on that row. Image position sets gallery order, starting at 1, and image URLs must be publicly reachable."
---

Variants are where most Shopify CSV imports go wrong. The structure is simple once you see it, but a supplier spreadsheet almost never arrives in that shape, and a single misplaced row can turn a clean size run into a pile of separate products. This guide shows how Shopify reads variants from a file, how to build one from a flat supplier sheet, and what to check before you import.

One note on column names. Shopify has updated its product CSV template, and older templates used different headers (for example Handle and Variant SKU). Shopify keeps backward compatibility, but the safest habit is to download the current template from your own admin and copy its header row exactly. The examples below use the current names from Shopify's help documentation.

## How Shopify groups rows into a product with variants

Shopify groups rows by the URL handle. Every row with the same handle belongs to the same product, and the first row for a handle carries the product-level fields: title, description, vendor, type, tags, status. Each further row with that handle adds one more variant, and only needs the handle, the option values and the variant fields.

A product with three sizes in one colour therefore takes three rows:

```csv
URL handle,Title,Vendor,Option1 name,Option1 value,SKU,Price,Inventory quantity
linen-shirt,Linen shirt,Northfield,Size,S,LS-NAT-S,2499,12
linen-shirt,,,Size,M,LS-NAT-M,2499,20
linen-shirt,,,Size,L,LS-NAT-L,2499,8
```

The second and third rows leave Title and Vendor blank on purpose. Repeating the title on every row is not harmful on import, but it is a common source of typos that make rows look like different products when you review the file later.

The handle is the join key. If one row says `linen-shirt` and the next says `linen-shirt-` or `Linen-Shirt`, you get two products, one with a single variant each. Most "my variants split into separate products" reports trace back to handle drift of this kind, usually from a spreadsheet formula that was filled down unevenly.

## Options: names, values and the three-option limit

A product can have up to three options, and each is a pair of columns: the option name (Size, Colour) and the option value (M, Navy). The first row defines the option names; later rows repeat the names consistently. Every variant must have a unique combination of option values within its product.

Two colours and three sizes is six variants, and the order of rows is up to you:

```csv
URL handle,Title,Option1 name,Option1 value,Option2 name,Option2 value,SKU,Price
linen-shirt,Linen shirt,Colour,Natural,Size,S,LS-NAT-S,2499
linen-shirt,,Colour,Natural,Size,M,LS-NAT-M,2499
linen-shirt,,Colour,Natural,Size,L,LS-NAT-L,2499
linen-shirt,,Colour,Navy,Size,S,LS-NAV-S,2499
linen-shirt,,Colour,Navy,Size,M,LS-NAV-M,2499
linen-shirt,,Colour,Navy,Size,L,LS-NAV-L,2499
```

Check the Option2 column names against the template you download, because Shopify's help page only spells out the Option1 set and refers to Option2 and Option3 in passing. If a catalog has four attributes, you have to choose. Merge size and length into one value ("32 / 30"), or keep the fourth attribute as a product metafield and a separate product. We cover metafields in the [bulk metafield import guide](/guides/shopify-metafields-import).

### Products with no variants

A simple product still needs a variant under the hood. Shopify's convention is to use `Title` as the option name and `Default Title` as the value. If you leave both blank while filling a variant column such as SKU or price, you risk the dependency problem described below.

## Variant-level columns and what each controls

Everything that differs per variant sits on that variant's row. The ones people use most:

| Column | What it does |
|---|---|
| SKU | Your stock-keeping unit for the variant. Keep it unique across the whole store. |
| Barcodes | GTIN, UPC or EAN. Older files use the singular "Barcode"; a file cannot contain both. |
| Price, Compare-at price | Selling price and the struck-through price. |
| Cost per item | Used for margin reporting, never shown to customers. |
| Inventory tracker, Inventory quantity | Whether Shopify tracks stock, and the on-hand count. |
| Continue selling when out of stock | Controls overselling. |
| Weight value (grams), Weight unit for display | Weight is entered in grams; the unit only changes how it is displayed. |
| Requires shipping | Set to false for digital items. |
| Variant image URL | Assigns an image to that variant. |

Prices are plain numbers: `2499`, not `Rs 2,499` or `$24.99 AUD`. Currency symbols and thousand separators are the single most common reason a price column fails to read. The wider catalog of these failures is in the [CSV import errors guide](/guides/shopify-csv-import-errors).

## Images: gallery versus variant

Shopify downloads images from the URLs in your file and re-uploads them, so each URL must be publicly accessible. File names cannot carry the suffixes `_thumb`, `_small` or `_medium`.

Gallery images go on rows using Product image URL and Image position (starting at 1). Variant images use the separate Variant image URL column. A tidy pattern for a two-colour product is to put the gallery images on their own extra rows, with nothing in the option columns, and assign one colour image to the first variant of each colour:

```csv
URL handle,Option1 name,Option1 value,SKU,Variant image URL,Product image URL,Image position
linen-shirt,Colour,Natural,LS-NAT-S,https://cdn.example.com/ls-natural.jpg,,
linen-shirt,Colour,Navy,LS-NAV-S,https://cdn.example.com/ls-navy.jpg,,
linen-shirt,,,,,https://cdn.example.com/ls-front.jpg,1
linen-shirt,,,,,https://cdn.example.com/ls-back.jpg,2
```

Test this layout on three products before you commit a thousand. Image handling is where a small difference between your template version and the structure above shows up first.

## Build the file from a flat supplier sheet

Most supplier files are one row per colour, with sizes as columns (`S, M, L, XL`) or as a comma-separated string. The conversion is mechanical, and worth doing in a spreadsheet or script rather than by hand.

1. **Decide the handle.** Generate it from the product name plus style code, lowercase, hyphens only. Freeze it; never regenerate it later.
2. **Melt the size columns into rows.** One row per size per colour. In Google Sheets or Excel this is an unpivot; in a script it is a loop.
3. **Build a SKU per row.** Style code, colour code, size: `LS-NAV-M`. Predictable SKUs make later stock updates a lookup instead of a puzzle. See the [SKU naming guide](/guides/sku-naming-conventions).
4. **Blank the product-level fields on every row after the first** in each handle.
5. **Sort by handle, then by option values**, so each product sits together. Shopify does not require this, but you will, when you debug.
6. **Run checks** before importing: no duplicate SKUs, no duplicate option combinations inside a handle, no empty option values, numbers only in price columns.

A duplicate option combination is a classic: two rows both saying Navy / M. Shopify will flag it, but finding it in a 4,000-row file after the fact is slower than a one-line duplicate check before.

## Overwrite behaviour: the part that deletes things

When you import with "Overwrite products with matching handles" ticked, Shopify updates products from the file. Without it, matching products are ignored. That sounds harmless until you read the details in Shopify's documentation:

- A blank cell in a non-required column overwrites the existing value with blank.
- A column you leave out of the file keeps the existing value.
- A column that depends on missing data, such as SKU with no option columns, can delete existing data.
- Changing Option1, Option2 or Option3 values deletes the existing variant IDs and creates new ones.

Two practical rules follow. For stock and price updates, export the current file, edit only those columns and keep option values byte-identical. For a bulk update of one field, import a file containing only the handle, the option columns and that field, rather than the full template with half the columns blank.

## Check the result, then scale

After the import, open three products and verify each by eye: variant count matches the file, option names are right, images land on the right variants, the SKU and price are correct on the last variant, not just the first. Then check the totals: products imported versus unique handles in the file, variants imported versus total rows less the extra image rows.

If you import into a live store, set Status to `draft` in the file, review, and publish after. Status accepts `active`, `draft` and `archived`; if the column is absent, products import as active.

## When to do it yourself and when to hand it off

For a catalog under a couple of hundred products from a single clean supplier sheet, doing this yourself is perfectly reasonable. Build the file with the steps above, test on a handful and import the rest.

It gets slow when supplier data is inconsistent: sizes typed three different ways, colours that are marketing names rather than values, images on a shared drive with no naming logic. That is where our [bulk product upload service](/bulk-product-upload) earns its fee. An AI engine restructures and normalises the file, a person reviews every output, and you approve before anything goes live. If you want to see how it handles your own data, send us ten products through the [free sample](/free-sample).

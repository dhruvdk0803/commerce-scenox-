---
title: "Google Product Category and Product Type: How to Choose"
heading: "Choosing Google product categories and product types"
description: "How google_product_category and product_type differ, where to get the official taxonomy, how to pick the right ID and how to map your own categories to it."
category: feeds
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "google_product_category must come from Google's predefined taxonomy, as a numeric ID or the full path, never both. product_type is your own free-text category, useful for organising campaigns and reporting. Choose the most specific category that fits, then map your store's categories to it once."
faqs:
  - q: "What is the difference between google_product_category and product_type?"
    a: "google_product_category is a value from Google's predefined taxonomy that tells Google what the product is. product_type is your own category text, in whatever structure you use, mainly for organising bidding and reporting. One is Google's vocabulary; the other is yours."
  - q: "Should I use the numeric ID or the category name?"
    a: "Either works, but submit only one. Google's documentation says to use the numeric ID or the full path, not both. IDs are shorter and less error-prone because there is no spelling or ampersand to get wrong. A spreadsheet lookup from your category to the ID keeps it consistent."
  - q: "Where do I download the Google product taxonomy?"
    a: "Google publishes it as a text file and an Excel sheet linked from the Merchant Center help page for google_product_category. Each line holds a numeric ID and the full path with levels separated by greater-than signs. There are versions for several languages; use the English values or IDs if yours is missing."
  - q: "Do I have to set a category for every product?"
    a: "Google can assign one automatically, but setting it yourself gives you control, especially for products where the automatic match is wrong. Clothing, electronics and other regulated categories also carry extra attribute requirements, so a correct category helps you meet them."
  - q: "How specific should the Google category be?"
    a: "As specific as the taxonomy allows while still accurate. A category such as Apparel & Accessories > Clothing > Dresses tells Google more than Apparel & Accessories alone. If no deeper level fits honestly, stop at the level that does and do not stretch into one that does not."
---

A product feed with the wrong category looks fine and performs badly. The product is approved and listed, but compared with the wrong competitors, matched to the wrong queries, or held to the wrong attribute rules. Two attributes handle categorisation, they do different jobs, and merchants regularly mix them up.

## The two attributes and what each does

**google_product_category** uses Google's predefined list. It tells Google what the product is, and Google's documentation instructs merchants to use only a predefined category. You can submit either the numeric ID, such as `2271`, or the full path, such as `Apparel & Accessories > Clothing > Dresses`, but not both.

**product_type** is yours. You define the value, usually the category path from your own store, such as `Women > Dresses > Wrap dresses`. Google's documentation positions it for organising bidding and reporting in Shopping campaigns, and as a fallback if no Google category fits. It is not tied to the Google taxonomy.

| | google_product_category | product_type |
|---|---|---|
| Source of values | Google's taxonomy | You |
| Format | Numeric ID or full path | Free text, usually with `>` separators |
| Purpose | Classifies the product for Google | Organises your campaigns and reports |
| Mistake cost | Wrong comparisons, wrong rules | Messy campaign structure |

## Step 1: get the official taxonomy

Google publishes the taxonomy as a plain text file and an Excel sheet, linked from the google_product_category help page in Merchant Center. Each line is an ID followed by the full path. Version files exist in other languages; Google says to use the English values or the numeric ID if yours is not available.

Download the current file rather than relying on a copy from a blog or an old export, because Google updates the list from time to time. Open it in a spreadsheet, and keep the ID and path columns, with the path split into one column per level so that you can filter.

If you use the text version, set UTF-8 encoding, or ampersands and accents may look garbled.

## Step 2: pick the most specific accurate category

Work top down. Start with the broad family (Apparel & Accessories, Home & Garden, Electronics), then drill down until the next level would be a stretch.

A worked example for a linen wrap dress:

1. Apparel & Accessories
2. Clothing
3. Dresses

Stop at Dresses; the taxonomy has no honest deeper level for wrap dresses specifically. The ID for the path is in the file. Use that ID in the feed.

For a pair of wireless earbuds, the route might be Electronics > Audio > Audio Components > Headphones & Headsets > Headphones, but check the taxonomy, since paths change. The principle holds: pick the leaf that describes what the buyer would call the item.

Where products straddle two categories, choose by the main use. A gift set of soap and a candle belongs where a shopper would expect to find it, not where it is easiest to file.

## Step 3: map your categories once, not per product

Do not choose the category product by product. Build a mapping table from your store's categories or product types to Google IDs, then apply it by lookup.

```csv
store_category,product_type_value,google_product_category_id
Kurtas,Women > Ethnic wear > Kurtas,[ID from taxonomy]
Sarees,Women > Ethnic wear > Sarees,[ID from taxonomy]
Linen shirts,Men > Shirts > Linen,[ID from taxonomy]
Wireless earbuds,Audio > Earbuds,[ID from taxonomy]
```

Fill the ID column from the taxonomy file; do not guess IDs from memory. The mapping table is a living document: when you add a new category, add a row. A new product type with no row is the usual cause of products landing in a feed with a blank or wrong category.

A mapping of 30 store categories to Google IDs takes a couple of hours the first time. After that, it is a VLOOKUP or a rule in your feed tool.

## Step 4: write product_type for yourself

Because product_type is yours, use it to support how you manage campaigns. Fashion stores often group by department, category and sub-category. Stores that segment by margin or season might add that layer.

Two guidelines:

- **Consistent separators and capitalisation.** `Women > Dresses` and `women>dresses` look like different groupings in reporting.
- **Same logic across the whole feed.** If half the products use three levels and half use one, reports become hard to read.

product_type is also the fallback when no Google category fits. If you sell something unusual, you can use your own type to keep the campaign structure sensible, while using the closest honest Google category for classification.

## How Shopify, WooCommerce and others handle it

On Shopify, the product CSV has a "Google Shopping / Google Product Category" column, so you can store the category with the product and feed apps or the Google channel can read it. Shopify also has its own Product category field, which is part of Shopify's taxonomy and distinct from Google's. Check how your feed app maps them before assuming they carry across.

On WooCommerce, Magento and BigCommerce, feed plugins typically provide a mapping screen where you assign store categories to Google categories. Behind it is the same table described above. The details of each plugin differ; read its documentation for how it stores and exports the ID.

If you manage the feed in a spreadsheet, a separate column for the Google ID, filled by lookup, is the simplest route.

## Common mistakes

- **Submitting both ID and path.** Choose one.
- **Using a category from a different taxonomy.** Amazon, Facebook and Shopify have their own category systems. Google's list is its own.
- **Too broad.** "Apparel & Accessories" for everything, because it is easy.
- **Too clever.** Forcing a product into a deeper category it does not honestly belong to, to match a competitor.
- **Stale values.** An old taxonomy copy with IDs that no longer exist. Download a current file at the start of each feed project.
- **Mixing up product_type and category.** Putting Google paths in product_type and your own wording in google_product_category.
- **Blank values after a catalog expansion.** New suppliers bring new categories that are not in the mapping.

Category problems often show up in Merchant Center diagnostics alongside other issues; our [disapprovals guide](/guides/google-merchant-center-disapprovals) covers how to read them. Identifiers are the other half of product identity, covered in the [GTIN, MPN and brand guide](/guides/gtin-mpn-brand).

## Category affects more than matching

A correct category also decides which extra attributes Google expects. Clothing products typically need colour, size, gender and age group; other categories have their own requirements. Setting the category properly is how you find out what the feed still lacks, which is why we set it before filling the other columns. The product data specification in Merchant Center lists the attribute rules by category, and it is the source to trust over any summary.

## A short audit you can run in an hour

1. Export your product feed or the products report from Merchant Center.
2. Pivot by google_product_category. Any blank row, or a category that makes you wince, is a problem.
3. Pivot by product_type. Count distinct values; if there are 200 for a 300-product store, they are free text rather than a hierarchy.
4. Spot-check 20 products: open each and ask whether the category is the one a shopper would use.
5. Fix by mapping table, not by hand, and re-submit.

## When to do it yourself and when to hand it off

A small catalog in a dozen categories is easy: download the taxonomy, build the mapping table and apply it. Do that, and keep the table.

The work grows with catalogs of thousands of SKUs across many categories, or a feed built from messy supplier data where category names are inconsistent. Our [product feed management service](/product-feed-management) builds the mapping, applies it, fixes the product data it depends on and sets up the channel, with a person reviewing every output before you approve it. The [free sample](/free-sample) lets you see how ten of your products would map first.

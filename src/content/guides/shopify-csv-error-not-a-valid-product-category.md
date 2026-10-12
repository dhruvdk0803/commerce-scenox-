---
title: "Shopify 'Not a Valid Product Category' CSV Error"
heading: "Shopify 'Not a valid product category': how to fix the Product Category column"
description: "Fix Shopify's 'Not a valid product category' CSV error. Match the Standard Product Taxonomy breadcrumb or ID exactly, with a broken and fixed row."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "'Not a valid product category' means the Product Category value does not match an entry in Shopify's Standard Product Taxonomy. Use the full breadcrumb or the category ID exactly as Shopify lists it. Shortened names, your own labels and old Google category strings are rejected."
faqs:
  - q: "What can go in the Product Category column?"
    a: "Per Shopify's help page, either the full category breadcrumb or the category ID from its Standard Product Taxonomy. The value has to match exactly. A name that is close but not identical fails."
  - q: "Is Product Category the same as Type?"
    a: "No. Type is a free-text label of your own. Product Category comes from Shopify's fixed taxonomy and drives things like tax and feed settings. Keep your own labels in Type."
  - q: "Can I use my Google Product Category string?"
    a: "Not automatically. The structures overlap but are not identical. Look up each category in Shopify's taxonomy and use its breadcrumb or ID."
  - q: "What if no category fits exactly?"
    a: "Choose the closest parent category that is valid in the taxonomy, or leave the column blank and set it later in the admin. A valid broader category is better than an invalid specific one."
---

If the import stops on the Product Category column with "Not a valid product category", your value is not in Shopify's list. The product itself is probably fine. For other errors, see the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors).

## What it means

Shopify's newer CSV template includes a Product Category column that maps to its Standard Product Taxonomy, a fixed hierarchy of categories. Its help documentation says the value must match either the full category breadcrumb or the category ID. If it does not, the importer rejects it.

## Causes

- **A shortened name.** "Shirts" instead of the full path.
- **Your own category label**, such as "Men's Clothing".
- **A Google Product Category string** pasted from a feed.
- **A breadcrumb with different separators or spacing**, or an edited word.
- **A category that was renamed or moved** since you copied it.
- **An ID with extra characters**, a leading space or a wrong digit.
- **Text from a supplier file** that uses a different taxonomy altogether.

## Broken row and fixed row

The category in the broken row is a label, not a taxonomy entry. The fixed row uses an example breadcrumb in Shopify's format; always copy the exact one from Shopify's category picker, since entries change over time.

Broken:

```csv
Handle,Title,Product Category,Type
linen-shirt,Linen Shirt,Men's Shirts,Shirt
```

Fixed:

```csv
Handle,Title,Product Category,Type
linen-shirt,Linen Shirt,Apparel & Accessories > Clothing > Clothing Tops > Shirts,Shirt
```

The `Type` column still holds your own wording. Only Product Category has to match the taxonomy.

## Step-by-step fix

1. Note which products the error refers to and what is in their Product Category cell.
2. In the Shopify admin, open a product and use the category picker to find the correct category.
3. Copy the full breadcrumb, or note the category ID if you prefer IDs.
4. Replace the value in your file. Do not retype it. Paste it, to avoid spacing and punctuation differences.
5. Build a mapping table from your own categories to taxonomy entries, then apply it to the whole column with a lookup.
6. If a product has no exact match, use the nearest valid parent, or leave the cell blank.
7. Re-import with overwrite ticked.
8. Spot-check a few products to confirm the category shows in the admin.

## Prevention

Keep a single mapping sheet: your internal category in one column, the Shopify breadcrumb and ID in the next two. Use it as a lookup every time you build a file, rather than typing categories. Review it when Shopify updates its taxonomy.

Keep Type and tags for your own organisation, and do not overload Product Category with merchandising labels.

## When to do it yourself and when to hand it off

A store with twenty categories can build the mapping table in an afternoon. A catalog of thousands of products across mixed supplier taxonomies needs mapping, checking and exceptions, and the edge cases take most of the time. Our [catalog cleanup](/catalog-cleanup) service classifies products against the taxonomy, with a person reviewing every output and you approving before upload. You can try the [free 10-product sample](/free-sample) if your project is a fit.

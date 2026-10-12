---
title: "Shopify 'Validation Failed: Options Are Not Unique'"
heading: "Shopify 'Validation failed: options are not unique': causes and fix"
description: "Fix Shopify's 'Validation failed: options are not unique' CSV error. Learn what duplicate option combinations look like, with a broken and fixed example."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "'Validation failed: options are not unique' means two variants of one product have the same combination of option values. Compare every option column per handle, watch for case and spacing differences, and make each combination appear once. Add the missing option or remove the duplicate row."
faqs:
  - q: "Can the same option value appear twice in a product?"
    a: "Yes, as part of different combinations. Size M can appear with Red and with Blue. What must be unique is the whole combination across Option1, Option2 and Option3 within one handle."
  - q: "Why does my file show no duplicates but Shopify disagrees?"
    a: "Look for case and whitespace. 'Medium' and 'medium ' may look different to you but can be treated as the same value. Trim and standardise option values, then check again."
  - q: "How many options can a product have?"
    a: "Shopify's CSV documentation describes up to three options per product: Option1, Option2 and Option3. If your product has more attributes, some belong in tags or metafields instead of options."
  - q: "Could the same handle in two places cause this?"
    a: "Yes. Shopify's help page notes the handle can appear elsewhere in the file with the same options. Search for the handle and combine or separate the groups."
---

You import a file with variants and Shopify rejects products with "Validation failed: options are not unique". The data usually looks right at a glance, which is why this one wastes time. Duplicate variant combinations are rarely obvious in a spreadsheet. For the rest of the common errors, see the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors).

## What it means

Within a single product, every variant must be distinguishable by its option values. If Option1 is Size and Option2 is Colour, then Size M with Colour Blue can occur once. Two rows with identical values for all options under the same handle are duplicates, and Shopify's validation fails. Its help documentation names duplicate option combinations, and the same handle appearing elsewhere with the same options, as the causes.

## Every cause we see

1. **A genuinely duplicated row**, often from a copy and paste or a merge of two supplier files.
2. **Capitalisation or spacing differences** that are removed during validation, so "M" and "m " collide.
3. **A missing option column.** A product has Size and Colour, but only Size is filled, so rows that differ by colour look identical.
4. **Option values that differ only in the SKU**, for example two warehouses listing the same size.
5. **The same handle in two places**, with overlapping options.
6. **A default value left in** such as "Default Title" for one row and a real value for another.
7. **Merged cells** in a spreadsheet that leave later rows blank and repeat nothing.

## Broken row and fixed row

Two rows under the same handle share Size M and no other option.

Broken:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant SKU,Variant Price
tee,Tee,Size,M,TEE-M,20.00
tee,,Size,M ,TEE-M2,20.00
```

Fixed, if the second row was meant to be a different size:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant SKU,Variant Price
tee,Tee,Size,M,TEE-M,20.00
tee,,Size,L,TEE-L,20.00
```

Fixed, if the rows differ by colour and the second option was missing:

```csv
Handle,Title,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Variant SKU,Variant Price
tee,Tee,Size,M,Colour,Blue,TEE-M-BLU,20.00
tee,,Size,M,Colour,Red,TEE-M-RED,20.00
```

## Step-by-step fix

1. Open the file and filter on the handle Shopify reports.
2. List every row for that handle and write out its option combination.
3. Trim spaces and normalise capitalisation in the option value columns.
4. If two rows are the same variant, delete one and keep the right SKU and price.
5. If they are different variants, add or fill the option that distinguishes them. Fill the option name on the first row and the value on each row.
6. Make sure no product uses more than three options.
7. Check for the same handle elsewhere in the file and move its rows together.
8. Re-import with overwrite ticked if parts of the product were already created.

## Prevention

Add a helper column that joins handle, Option1, Option2 and Option3, and run a duplicate check on it before every import. It takes a minute and finds every collision. Trim all option cells as a matter of routine, and keep option values consistent across the catalog: "Medium" everywhere, not a mix of M, Med and Medium.

Decide how each attribute is stored before building files. Colour and size are good options. Material or fit often belong in tags or metafields.

## When to do it yourself and when to hand it off

For a product or two, find the duplicate and fix it. For a fashion or multi-supplier catalog with thousands of variants, option clean-up is a major task: normalising sizes, mapping colours and rebuilding variant grids. Our [catalog cleanup](/catalog-cleanup) service does that work, with a person reviewing every output and you approving before upload. Try the [free 10-product sample](/free-sample) if your project is a fit.

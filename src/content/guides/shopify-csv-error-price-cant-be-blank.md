---
title: "Shopify 'Validation Failed: Price Can't Be Blank'"
heading: "Shopify 'Validation failed: price can't be blank': what to check"
description: "Shopify's 'Validation failed: price can't be blank' CSV error explained: empty cells, currency symbols, comma decimals and column shifts, with a fixed row."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "'Validation failed: price can't be blank' means a variant row has no usable Variant Price. Add a number, or fix what hides it: a currency symbol, a thousands separator, a comma decimal, or a column shifted by a stray comma. Use a plain number with a period."
faqs:
  - q: "Which column holds the price in a Shopify CSV?"
    a: "Variant Price in the classic template. Variant Compare-at Price is a separate, optional column. Check you have not put the selling price only in the compare-at column."
  - q: "Can the price be zero?"
    a: "A zero is a number, so it is valid as a value. If you want a free item, enter 0.00. A blank is what triggers the error, not a zero."
  - q: "Do I need to enter a price on every variant row?"
    a: "Yes. Every variant has its own price, so each variant row needs one even if it matches the first row."
  - q: "Why does the price look filled in my spreadsheet but still fail?"
    a: "It may be text with a symbol or space, or the row may have shifted columns because of an unquoted comma in an earlier field. Open the raw CSV in a text editor to see what Shopify sees."
---

"Validation failed: price can't be blank" tells you that a variant has no price Shopify can use. The cell might be empty, or it might look filled and still be read as nothing. Related errors are in the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors).

## What it means

Every variant needs a price. Shopify's help documentation gives the cause in one line: the line has no price. In practice there are several ways a price ends up blank by the time Shopify reads it.

## Causes

1. **An empty Variant Price cell**, often on variant rows added later.
2. **A currency symbol** such as $, £ or ₹ in the cell.
3. **A thousands separator** in a value like 1,299.00 that is not quoted, so the comma splits the field.
4. **A comma as the decimal mark**, as in 19,99, which also splits or fails to parse.
5. **A shifted column.** A description with an unquoted comma pushes every later value one column to the right, so Variant Price is read from the wrong place.
6. **Text instead of a number**, such as "TBC", "POA" or "see supplier".
7. **A formula** that exported as an empty string or an error value.

## Broken row and fixed row

Broken, with a symbol and a thousands separator:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant SKU,Variant Price
tee,Tee,Size,M,TEE-M,"$1,299.00"
tee,,Size,L,TEE-L,
```

Fixed:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant SKU,Variant Price
tee,Tee,Size,M,TEE-M,1299.00
tee,,Size,L,TEE-L,1299.00
```

Use a plain number with a period as the decimal mark. No symbol, no separator, no spaces. Shopify takes the currency from the store settings, not the file.

## Step-by-step fix

1. Open the CSV in a text editor and go to the lines Shopify reports.
2. Count the columns on that line and compare with the header. If the count is off, find the unquoted comma that shifted the data.
3. If the Variant Price cell is empty, fill in the price from your source data.
4. Remove currency symbols and thousands separators from the whole column using find and replace.
5. Change comma decimals to periods.
6. Replace any text placeholders with numbers, or hold the product back until the price is known.
7. In a spreadsheet, format the price column as a number with two decimals, and export again.
8. Re-import and check a sample product in the admin.

## Prevention

Keep prices as numbers in a single column in your master sheet. Apply a rule that flags any variant row with a blank, zero or text price before export. If prices come from a supplier in another currency, do the conversion and rounding in the sheet so the file contains only final values.

Watch regional settings. A spreadsheet set to a locale with comma decimals will export 19,99 even though it displays fine on screen.

## When to do it yourself and when to hand it off

If one product has a blank price, do it yourself. If prices arrive from suppliers in mixed formats and currencies, with markups and rounding rules to apply, the pricing sheet becomes the project. Our [bulk product upload](/bulk-product-upload) service handles price formatting with a person reviewing every output and you approving before upload. You can try the [free 10-product sample](/free-sample) if your project is a fit.

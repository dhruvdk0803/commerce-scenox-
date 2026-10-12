---
title: "Shopify CSV 'Inventory Quantity Can't Be Blank' Error"
heading: "Shopify 'Inventory quantity can't be blank' and 'is not a number': the fix"
description: "Fix Shopify's 'Inventory quantity can't be blank' and 'Inventory quantity is not a number' CSV errors, plus the related inventory policy and fulfillment errors."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Shopify returns 'Inventory quantity can't be blank' or 'is not a number' when Variant Inventory Tracker is set but the quantity cell is empty or holds text. Enter a whole number, or leave the tracker blank if you do not track stock. Check policy and fulfillment columns too."
faqs:
  - q: "Do I have to track inventory?"
    a: "No. Shopify's help page says to leave the Variant Inventory Tracker column blank if you are not tracking inventory. Then the quantity is not needed."
  - q: "What values does inventory policy accept?"
    a: "Either deny or continue. Deny stops sales when stock hits zero, continue allows overselling. Values like yes, true or in stock are rejected with 'Inventory policy is not included in the list'."
  - q: "What should Variant Fulfillment Service hold?"
    a: "The name of your fulfillment service, or manual if you do not use one. A blank triggers 'Fulfillment service can't be blank' when the tracker is set."
  - q: "Can I leave the quantity as 0?"
    a: "Yes. Zero is a valid number and means no stock. A blank cell and text such as 'out of stock' are the problems."
---

Three small columns cause a cluster of inventory errors: "Inventory quantity can't be blank", "Inventory quantity is not a number" and its neighbours. They all come from the same group of related columns being half-filled. See the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors) for the rest.

## What it means

In the classic template, Variant Inventory Tracker, Variant Inventory Qty, Variant Inventory Policy and Variant Fulfillment Service work as a set. If the tracker names a system, the others must be valid. Shopify's current CSV documentation says the same about related columns: filling some and leaving others blank causes an error, and the message tells you which blanks need values.

## Causes

1. **Tracker set, quantity empty.** Variant Inventory Tracker says `shopify`, Variant Inventory Qty is blank.
2. **Text in the quantity cell**, such as "in stock", "10 pcs" or "N/A".
3. **A decimal or formatted number**, such as 1,000 with a separator.
4. **Wrong policy value**, giving "inventory policy is not included in the list".
5. **Blank fulfillment service** while tracking is on.
6. **A custom fulfillment service** that has not been set up in the admin.
7. **Columns shifted** by an unquoted comma earlier in the row, so a value lands in the wrong column.

## Broken row and fixed row

Broken:

```csv
Handle,Title,Variant SKU,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price
tee,Tee,TEE-M,shopify,in stock,yes,,20.00
```

Fixed, tracking stock:

```csv
Handle,Title,Variant SKU,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price
tee,Tee,TEE-M,shopify,25,deny,manual,20.00
```

Fixed, not tracking stock:

```csv
Handle,Title,Variant SKU,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price
tee,Tee,TEE-M,,,,,20.00
```

## Step-by-step fix

1. Decide whether you want Shopify to track stock for these products.
2. If not, clear the tracker, quantity, policy and fulfillment service cells on those rows.
3. If yes, set the tracker to `shopify`, enter a whole number in the quantity, use `deny` or `continue` for policy, and `manual` for fulfillment unless you use a service.
4. Remove text, symbols and thousands separators from quantities.
5. If you use a custom fulfillment service, create it in the admin first.
6. Check for shifted columns by counting fields on the failing line.
7. Re-import with overwrite ticked.
8. Open a product and confirm the quantity shows against the right location.

## Prevention

Add data validation to the quantity column so only whole numbers can be entered. Keep a lookup of allowed policy values in the sheet. Build the four inventory columns from one source so they cannot drift apart. If stock changes often, plan to update quantities through your inventory system or Shopify's inventory tools, and use the CSV for product data only.

## When to do it yourself and when to hand it off

For a small store with a single warehouse, the checks above are enough. Multi-location stock, supplier feeds that mix units and text, and regular stock refreshes are where things get fiddly. Our [bulk product upload](/bulk-product-upload) service formats inventory columns correctly at launch, and our monthly catalog work covers ongoing updates. A person reviews every output and you approve before anything goes live. You can try the [free 10-product sample](/free-sample) if your project is a fit.

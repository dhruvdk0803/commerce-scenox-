---
title: "Import Shopify Metafields in Bulk: CSV Headers and Setup"
heading: "Importing Shopify metafields in bulk, step by step"
description: "How to define metafields, format the CSV column headers, pick the right type and import values for hundreds of products, with a filled example and checks."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "To import metafields in bulk, define each metafield in Settings, then add a column to your product CSV headed product.metafields.namespace.key. Shopify's CSV import supports product metafields, not variant metafields. Values must match the metafield's type, so test five rows first."
faqs:
  - q: "What should a metafield column header look like in a Shopify CSV?"
    a: "Shopify accepts the form product.metafields.namespace.key, or a label followed by that path in brackets, for example Fabric (product.metafields.shopify.fabric). The namespace and key must match a metafield definition that exists in your store, so create the definition before importing."
  - q: "Can I import variant metafields with the standard CSV importer?"
    a: "No. Shopify's CSV documentation says variant metafields are not supported for CSV import and export. Product-level metafields work. For variant-level data, people use the Admin API, a third-party import app, or they restructure the data into product-level fields."
  - q: "Do I need to create metafield definitions first?"
    a: "Yes, in practice. Defining the metafield in Settings, Custom data fixes its name, namespace, key and type, and lets the theme and admin display it properly. Importing against an undefined or mistyped key is the most common cause of values not appearing."
  - q: "What happens to metafields if I leave the column out of a re-import?"
    a: "A column omitted from the file keeps its existing value. A column that is present but blank overwrites the existing value with blank. When you only want to change other fields, leave the metafield columns out entirely instead of leaving the cells empty."
  - q: "How do I show metafield values on the storefront?"
    a: "Importing only stores the data. Your theme has to display it, either through a theme section that binds to the metafield in the theme editor or through Liquid referencing product.metafields.namespace.key. Shopify's help centre describes both routes under Custom data."
---

Metafields are how a Shopify store holds the product facts that do not fit the standard fields: fabric, care instructions, warranty period, dimensions, compatibility, certifications. Loading them one product at a time is miserable past about twenty items. The CSV importer can do it in one pass, as long as you set things up in the right order and respect a few limits.

## What a metafield is, and when to use one

A metafield is a custom data field attached to a product (or other object), identified by a namespace and a key. The namespace groups fields (`custom`, or your own), and the key names the field (`fabric`). Together they form the path `custom.fabric`.

Use one when the data is structured, repeated across many products and worth displaying or filtering on. Fabric, country of origin, battery life and pack contents are good candidates. Do not use one for anything that belongs in the description as running prose, or for variant choices such as size and colour, which are options (see the [variants CSV guide](/guides/shopify-variants-csv)).

The test we use: if you would want the same field on every product in a category, and want it formatted consistently, it is a metafield.

## Step 1: define the metafields before you import

Create each definition in Shopify admin under Settings, then Custom data, then Products. For each one set a name (what staff see), the namespace and key (what the file uses), and the type.

Types are the part people rush. The common ones:

| Type | Use for | Value in the CSV |
|---|---|---|
| Single line text | Short labels: fabric, origin | `Organic cotton` |
| Multi-line text | Care notes, longer facts | Text, with line breaks inside quotes |
| Integer | Counts: pieces in a set | `12` |
| Decimal | Non-integer numbers | `2.5` |
| Dimension, Weight, Volume | Measurements with units | Check the format Shopify exports |
| True or false | Flags: machine washable | `true` or `false` |
| Date | Launch or expiry date | ISO format, `2026-11-01` |
| List types | Several values for one field | Depends on type; export one to see |
| Product or file reference | Links to other objects | Needs IDs or references, test first |

For anything beyond plain text, numbers and booleans, create the definition, fill one product by hand, export the file and copy the exact value format Shopify writes. That beats guessing, and it is what we do on every new store.

Also decide the storefront access setting. If the theme or a storefront app should read the field, it has to be exposed to the storefront; a field that is only visible in admin will import fine and then show nothing on the product page.

## Step 2: set up the CSV column headers

Shopify's documentation gives the header format as the path itself, `product.metafields.<namespace>.<key>`, or a label followed by the path in brackets. Their own example is `Fabric (product.metafields.shopify.fabric)`. The label is for humans; the path in brackets is what Shopify reads.

Here is a filled example using a custom namespace:

```csv
URL handle,Title,Fabric (product.metafields.custom.fabric),Pieces (product.metafields.custom.pieces),Machine washable (product.metafields.custom.machine_washable)
linen-shirt,Linen shirt,Organic linen,1,true
cotton-tee,Cotton tee,Combed cotton,1,true
wool-scarf,Wool scarf,Merino wool,1,false
```

Rules worth keeping to:

- Keys are lowercase with underscores or hyphens, no spaces.
- The header path must match the definition character for character. `custom.Fabric` and `custom.fabric` are different to a person reading the file even if you hope they are not to the importer.
- Put metafield columns after the standard columns. It does not matter to Shopify, but it keeps the file reviewable.

### The limit that catches people: variants

Shopify states that variant metafields are not supported for CSV import or export. If your data is per size or per colour, such as a different weight per size that you want as a custom field, the standard importer cannot carry it. Options are to roll it up to the product level (a text field such as "Available in 30, 32 and 34 inch inseams"), or to use the Admin API or an import app that supports variant metafields. Check an app's own documentation before assuming it does.

## Step 3: add the columns to the right file

You have two clean ways to do this, and they behave differently on overwrite.

**Adding to an existing catalog.** Export products, keep only the URL handle (and option columns if you have variants) plus your new metafield columns, and import with "Overwrite products with matching handles". Columns you leave out keep their existing values, so you are not touching titles or prices. Do not leave the other columns present but blank: a blank cell in a non-required column overwrites the value with blank.

**Creating products with metafields in one go.** Add the metafield columns to the full product file from the start. This is the better route for a new catalog build, covered in the [bulk upload guide](/guides/shopify-bulk-product-upload).

If a product has variants, repeat the handle on every row as usual, and put the metafield value on the first row only. Putting it on every row is not needed and invites mismatches.

## Step 4: test on five products

Always import five rows before five thousand. After the test:

1. Open one product in admin and scroll to the Metafields section. The values should show under the names you defined.
2. Confirm the type rendered correctly: a boolean shows as a toggle, a date as a date picker, not as raw text.
3. View the product on the storefront. If nothing shows, the data is fine and the theme is not yet displaying it.
4. Export the five products again and compare the exported header and values to what you sent. Any difference tells you how Shopify prefers it written.

## Show the data on the storefront

Importing stores values; it does not display them. In an Online Store 2.0 theme, you can bind a theme block or text element to a metafield from the theme editor, using the dynamic source option. For older themes, a Liquid snippet referencing `product.metafields.custom.fabric.value` does it. Shopify's help centre covers both under its Custom data documentation.

Think about layout before you load the data. A spec table on the product page that reads six metafields works well if every product has all six. If half the products are missing three of the values, the table looks broken. Decide which fields are mandatory per category, and fill them or hide the row when a value is empty.

## Common failures and the fix

| Symptom | Likely cause | Fix |
|---|---|---|
| Column ignored, no values appear | No matching definition, or typo in namespace or key | Create or correct the definition, check the header path |
| Value imported as text where a number was expected | Definition type does not match | Fix the definition type, re-import |
| Value rejected | Format wrong for the type (date, dimension, list) | Copy the format from a manual entry exported back |
| Fields blanked on products you did not mean to touch | Blank cells in a file with overwrite on | Remove unwanted columns instead of leaving blanks |
| Values show in admin, not on the page | Theme not bound to the field, or storefront access off | Bind in the theme editor, check access setting |

## When to do it yourself and when to hand it off

If you have one or two new metafields and a few hundred products, this is a good DIY job: define, add column, test five, import. The risk is low if you leave other columns out of the update file.

It becomes a data project when the values have to be created, not just loaded: extracting fabric, dimensions and care instructions from supplier PDFs and product descriptions, normalising "100% cotton", "Cotton 100" and "pure cotton" into one value. That is the work behind our [catalog cleanup service](/catalog-cleanup): the AI engine extracts and standardises, a person reviews each output, and you approve before anything goes live. You can send ten products through the [free sample](/free-sample) to see what your data looks like once structured.

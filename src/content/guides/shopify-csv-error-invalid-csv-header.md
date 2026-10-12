---
title: "Shopify 'Invalid CSV Header: Missing Headers' Fix"
heading: "Shopify 'Invalid CSV header: missing headers': what to check and how to fix it"
description: "Shopify rejects a product CSV with 'Invalid CSV header: missing headers' when line one is wrong. Learn the causes, the exact header row and how to fix it."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Shopify shows 'Invalid CSV header: missing headers' when the first line of your file does not match the header row it expects. Renamed or deleted columns, a trailing space, the wrong delimiter or a stray blank line are the usual causes. Start from Shopify's template and paste data under it."
faqs:
  - q: "Why does the error name a specific missing header like Title?"
    a: "Shopify lists the header it could not find. If Title is reported but you can see it in your file, the real problem is often the delimiter or a hidden character. The parser read the whole line as one column."
  - q: "What is the 'Choose column headings' window?"
    a: "Shopify's help page says it appears when the CSV headers are incorrect. You can pick the right heading for each column from drop-down menus. It is fine for a one-off, but fixing the file is more reliable for repeat imports."
  - q: "Do the columns have to be in the same order as the template?"
    a: "Use the template order unless you have a reason not to. The safest approach is to download Shopify's sample CSV and paste your data under its headers, so spelling, spacing and order all match."
  - q: "Can Excel cause this error?"
    a: "Yes. Depending on regional settings Excel can save with semicolons, add a byte order mark or a trailing space, or rename a header. Exporting from Google Sheets avoids most of this."
---

You choose a file, click upload and Shopify answers "Invalid CSV header: missing headers", often followed by a column name. The file never reaches the product checks. The problem is on line one, and it is usually small. The rest of the errors are in the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors).

## What it means

The first line of a Shopify product CSV must contain the column headings Shopify recognises. If it cannot find one it requires, or cannot split the line into separate columns at all, it stops. Shopify's help page says the first line has to match its required header row and tells you to check that line for trailing spaces.

## Causes

- **A renamed header.** `Body HTML` instead of `Body (HTML)`, or `Price` instead of `Variant Price`.
- **A deleted column** that the importer requires.
- **A trailing space** after the last header, or a space inside a name.
- **A blank line or a title row above the headers**, common in supplier exports.
- **The wrong delimiter.** Semicolon or tab separated files look like one giant column.
- **A byte order mark or odd encoding** that attaches hidden characters to the first header.
- **Mixed header styles** from an old export and a newer template.

## Broken and fixed

Broken, with a renamed column and a trailing space:

```csv
Handle,Title,Body HTML,Vendor,Variant Price 
linen-shirt,Linen Shirt,<p>Washed linen</p>,Northwind,49.00
```

Fixed:

```csv
Handle,Title,Body (HTML),Vendor,Variant Price
linen-shirt,Linen Shirt,<p>Washed linen</p>,Northwind,49.00
```

Shopify's required first line, as given in its help documentation, starts like this and continues through Image Src and Image Alt Text:

```csv
Handle,Title,Body (HTML),Vendor,Type,Tags,Published,Option1 Name,Option1 Value
```

Use the full line from the sample CSV on the import screen rather than typing it.

## Step-by-step fix

1. Download the sample CSV from the Shopify import screen.
2. Open both files in a text editor, not a spreadsheet.
3. Compare line one of your file with the sample, character by character.
4. Delete any lines above the header row.
5. Remove trailing spaces and check that commas, not semicolons, separate the columns.
6. Save as UTF-8. If the first header looks odd in the editor, remove the byte order mark.
7. If your layout is very different, paste your data into the sample file under its headers.
8. Upload again. If the importer shows the column heading window, map each column carefully.

## Prevention

Treat Shopify's sample as the single template and never edit its header row. Keep one master file with those headers and copy supplier data into it. Export from Google Sheets. If you need extra columns for your own use, keep them in a separate working sheet and delete them before export.

## When to do it yourself and when to hand it off

Fixing line one is quick, and most store owners can manage. It becomes a time sink when supplier files arrive in different layouts every week and each needs mapping to Shopify's columns. That mapping is a regular part of our [bulk product upload](/bulk-product-upload) work, with a person reviewing every output and your approval before upload. If you want to see it on your own files, try the [free 10-product sample](/free-sample) if your project is a fit.

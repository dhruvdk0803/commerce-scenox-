---
title: "Shopify CSV Import Errors and How to Fix Each One"
heading: "Shopify CSV import errors, and how to fix every one"
description: "The Shopify product CSV errors merchants hit most, what causes each and the exact fix, with broken and fixed rows for the main ones."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Most Shopify CSV import errors come from a handful of causes: wrong or missing headers, non-UTF-8 encoding, curly or stray quotes, duplicate handles, duplicate option combinations, blank prices and unreachable image URLs. Open the file in a text editor, find the line named in the message and fix that line."
faqs:
  - q: "Why does Shopify say 'Invalid CSV header: missing headers'?"
    a: "The first line of your file does not match the header row Shopify expects. Usually a column was renamed, deleted or has a trailing space. Download the sample CSV from the import screen and copy your data under its headers instead of editing the header names by hand."
  - q: "Why do line numbers in Shopify's error messages not match my spreadsheet?"
    a: "The numbers refer to lines in the raw text file, not spreadsheet rows. A description with line breaks inside quotes can span several text lines. Open the CSV in a text editor that shows line numbers to find the right place."
  - q: "What does 'Illegal quoting' or 'Missing or stray quote' mean?"
    a: "There is a quote character in the wrong place, often curly quotes inserted by a spreadsheet, or a double quote in a description that was not escaped. Replace curly quotes with straight ones and double any quote inside a quoted field."
  - q: "Why are my product descriptions full of odd characters after import?"
    a: "The file was probably not saved as UTF-8. Excel often saves in a legacy encoding. Open the file in a text editor, save it again as UTF-8 and re-import with overwrite ticked."
  - q: "Can I fix import errors without redoing the whole file?"
    a: "Usually yes. Shopify reports the failing lines, so correct those lines and re-import. If the product was partly created, tick the overwrite option so matching handles update instead of being skipped. Keep a backup of the original file before re-importing."
---

A Shopify CSV import that fails is rarely a mystery once you know where to look. The messages are terse, the line numbers do not match your spreadsheet, and the same few causes produce most of them. This guide lists the errors you are most likely to see, with the wording Shopify uses in its help documentation, the cause and the fix. Wording can vary slightly, so match on the key phrase.

## First, how to read an error

Open the CSV in a plain text editor that shows line numbers, such as VS Code or Notepad++. Shopify's line numbers refer to lines in the text file, not rows in Excel or Google Sheets. A description with line breaks inside quotes can take up several lines, so the text line and the spreadsheet row can differ a lot.

Then work in this order: headers, encoding, quotes, handles, options, prices, images. That sequence catches the problems that stop the whole file before the ones that affect single products.

## Header and file errors

### Invalid CSV header: missing headers

The first line does not match the header row Shopify expects. Causes are a renamed or deleted column, a trailing space on the last header or an extra blank line at the top. Fix it by downloading the sample CSV from the import screen and pasting your data under its headers. If you build headers by hand, make sure there is no trailing space on the first line.

Broken:

```csv
Handle,Title,Body HTML,Vendor,Variant Price 
```

Fixed:

```csv
Handle,Title,Body (HTML),Vendor,Variant Price
```

The broken line renames a column and leaves a trailing space.

### Wrong or mixed header styles

Shopify's older exports use headers like `Handle` and `Image Src`; its current documentation describes URL handle and Product image URL. Mixing them in one file causes missing-header problems. Use the header set from the sample you downloaded.

## Encoding and quote errors

### Odd characters in descriptions

The file is not UTF-8. Shopify's guidance is to open it in a text editor and save it again as UTF-8. Do this before any other fix because later errors can be side effects of bad encoding.

### Illegal quoting on line

### Missing or stray quote on line

These two come from the same place. A quote character is in the wrong position, either because a spreadsheet replaced straight quotes with curly ones or because a double quote inside a field was not escaped. Inside a quoted CSV field, a literal double quote is written as two double quotes.

Broken:

```csv
tall-vase,Tall Vase,"<p>A 12" vase in "matte" glaze</p>",Northwind
```

Fixed:

```csv
tall-vase,Tall Vase,"<p>A 12"" vase in ""matte"" glaze</p>",Northwind
```

Replace curly quotes with straight quotes in a text editor and then check the line Shopify points to for any stray ones.

## Handle and product errors

### Ignored line because handle already exists

Shopify's wording is along the lines of "Ignored line #-## because handle `example` already exists". Either two different products share a handle, or you are importing products that are already in the store without the overwrite option. Give each product a unique handle, or tick Overwrite products with matching handles if you mean to update.

### Ignored line because it did not contain product data

A row has a handle but no title, so Shopify cannot treat it as a product. If the row is meant to be a variant or image row of an earlier product, the handle must match the first row exactly, including case and hyphens. Otherwise add a title.

Broken:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant Price
linen-shirt,Linen Shirt,Size,S,49.00
linen-shirt ,,Size,M,49.00
```

Fixed:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant Price
linen-shirt,Linen Shirt,Size,S,49.00
linen-shirt,,Size,M,49.00
```

The broken second row has a trailing space in the handle, so it is read as a different product with no title.

## Variant and option errors

### Validation failed: options are not unique

Two variants under the same handle have the same combination of option values. This often happens when a size appears twice with different capitalisation or whitespace.

Broken:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant SKU,Variant Price
tee,Tee,Size,M,TEE-M,20.00
tee,,Size,M,TEE-M2,20.00
```

Fixed:

```csv
Handle,Title,Option1 Name,Option1 Value,Variant SKU,Variant Price
tee,Tee,Size,M,TEE-M,20.00
tee,,Size,L,TEE-L,20.00
```

### Missing option values

If you include SKU or price without the option name and value, Shopify may drop or reject the variant data. Every variant row needs Option1 Name and Option1 Value, and every product allows at most three options.

## Price and inventory errors

### Validation failed: price can't be blank

The row has no price. Add a number. People also see price failures when the value contains a currency symbol, a thousands separator or a comma as the decimal mark. Use a plain number with a period.

Broken:

```csv
tee,Tee,Size,M,TEE-M,"$1,299.00"
```

Fixed:

```csv
tee,Tee,Size,M,TEE-M,1299.00
```

### Inventory quantity can't be blank, or is not a number

Enter a number. If you do not track inventory, leave the inventory tracker column blank rather than filling in the quantity with text such as "in stock".

### Inventory policy is not included in the list

The value must be `deny` or `continue`. Anything else, including "Yes" or "true", is rejected.

### Fulfillment service can't be blank

Enter the name of your fulfilment service, or `manual` if you do not use one.

## Category and metafield errors

### Not a valid product category

The Product Category value must match a full breadcrumb or category ID in Shopify's standard taxonomy exactly. A shortened or paraphrased name fails. Copy the breadcrumb from Shopify's category picker.

### Validation failed: Value must be a valid product reference

A metafield points to a product that does not exist yet. Import the products first without the metafield values, then re-import with the values and overwrite on.

## Image errors

### Validation failed: An error occurred while trying to download the image

Shopify could not fetch the file. Open the URL in a private browser window. If it does not display the image directly, it is not public.

### Validation failed: getaddrinfo: nodename nor servname provided, or not known

The image URL is malformed or its host does not resolve, often because of a typo or missing protocol.

Broken:

```csv
Handle,Title,Image Src
tee,Tee,cdn.example.com/tee 1.jpg
```

Fixed:

```csv
Handle,Title,Image Src
tee,Tee,https://cdn.example.com/tee-1.jpg
```

Use a direct HTTPS link with no spaces, with nothing password protected.

### Incorrect header check

Shopify's suggestion is to remove the image from the affected line and import again. If that works, the file is the problem: host it elsewhere and re-add it.

### The uploaded image exceeds the megapixel limit

The image is too large. Shopify's documentation gives a 5000 by 5000 pixel limit, though the error text mentions megapixels. Resize and re-upload.

## A repeatable fix routine

1. Save a copy of the original file.
2. Fix headers against a fresh sample CSV.
3. Re-save as UTF-8.
4. Search for curly quotes and stray double quotes.
5. Check handles for duplicates and trailing spaces.
6. Check every variant row for unique option values.
7. Strip currency symbols from prices.
8. Test 20 image URLs in a private window.
9. Import a 10-row slice. If it works, import the rest.

For the structure behind these rows, read the [Shopify bulk upload guide](/guides/shopify-bulk-product-upload). Also remember Shopify's 15 MB file limit; large files are split in parts.

## When to do it yourself and when to hand it off

Fixing a few lines in a small file is quick, and most merchants can do it alone with a text editor and this list. The picture changes when the file has thousands of rows, inconsistent supplier data or errors that keep reappearing after each fix. At that point the cleaning is the project, not the import. Our [catalog cleanup](/catalog-cleanup) and [bulk product upload](/bulk-product-upload) services work from a fixed quote after we inspect files, and every output is reviewed by a person before you approve it. You can try the [free 10-product sample](/free-sample) if the project is a fit.

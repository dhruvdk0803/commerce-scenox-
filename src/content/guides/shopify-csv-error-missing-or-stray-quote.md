---
title: "Shopify 'Missing or Stray Quote on Line' CSV Error"
heading: "Shopify 'Missing or stray quote on line': causes and the fix"
description: "Fix Shopify's 'Missing or stray quote on line' CSV error. Curly quotes from Excel, unescaped quotes and unclosed fields, with a broken and fixed row."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "'Missing or stray quote on line' means a quote character is in the wrong place on the line Shopify names. Excel's curly quotes are the usual cause, followed by unescaped double quotes and fields that never close. Replace curly quotes with straight ones and double any quote inside a field."
faqs:
  - q: "What is the difference between 'Illegal quoting' and 'Missing or stray quote'?"
    a: "Shopify lists them separately, but they overlap. Illegal quoting points first at an illegal character, so encoding matters. Missing or stray quote points at quote marks, often curly ones from Excel. The checks are the same, so work through both lists."
  - q: "How do I find curly quotes quickly?"
    a: "Open the CSV in a text editor and search for typographic quote characters, the slanted pairs for double and single quotes. Most editors can replace them in one action. Use straight quotes instead, then check the line named in the error for any left over."
  - q: "Can a single stray quote break the whole file?"
    a: "Yes. An unclosed quote makes the parser treat everything up to the next quote as one field, so the damage can show up many lines later than the real mistake. Start from the first reported line and work forward."
  - q: "Should I wrap every field in quotes?"
    a: "It is allowed and safe, as long as inner quotes are doubled. It is only required for fields that contain commas, line breaks or double quotes. Consistency matters more than which style you pick."
---

"Missing or stray quote on line" is the more specific cousin of the illegal quoting error. Shopify has found a quote character where it should not be, or has not found one where it should. The fix takes minutes once you know what to search for. The wider list of errors is in the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors).

## What the message means

In CSV, a field that contains a comma, a line break or a double quote has to be wrapped in straight double quotes. A quote inside such a field has to be doubled. If either rule is broken, the parser loses track of where fields start and end.

Shopify's help page ties this error to spreadsheet programs such as Excel inserting curly quotes, and to extra quote marks in a field. The advice there is to use a text editor, swap curly quotes for straight ones and remove stray ones from the line named.

## Causes

- **Curly quotes** from Excel, Word or a CMS export, either wrapping a field or sitting inside a description.
- **Unescaped inch marks and quoted words** in body text, such as 12" or "limited edition".
- **A field opened with a quote and never closed**, often at a line break in a pasted description.
- **Doubled quotes in the wrong place**, usually after someone "fixed" a file by hand.
- **A trailing quote after the last column** left by a find and replace.
- **Quotes inside tags or option values**, which are easy to miss because they are short fields.

## Broken row and fixed row

The first row uses curly quotes around the description and a stray quote at the end of the tags field.

Broken:

```csv
Handle,Title,Body (HTML),Vendor,Tags
oak-stool,Oak Stool,“<p>Seat height 24" in a "natural" finish</p>”,Northwind,"seating, oak""
```

Fixed:

```csv
Handle,Title,Body (HTML),Vendor,Tags
oak-stool,Oak Stool,"<p>Seat height 24"" in a ""natural"" finish</p>",Northwind,"seating, oak"
```

The fixed row uses straight quotes to wrap the field, doubles the inner quotes and removes the extra quote after the tags.

## Step-by-step fix

1. Copy the original file somewhere safe.
2. Open the CSV in a text editor that shows line numbers and go to the line Shopify names.
3. Replace all curly quotes in the file with straight ones, using find and replace.
4. Read that line field by field. Mark where each field starts and ends.
5. Double any quote that sits inside a field. Remove any quote that sits between fields.
6. If the line looks right, look at the line before it. An unclosed quote earlier on shifts the error downwards.
7. Check that the file is saved as UTF-8 with commas as separators.
8. Re-import a small slice, then the rest.

## Prevention

Edit in Google Sheets and export, rather than re-saving a CSV from Excel. Run a find for curly quotes whenever you paste descriptions from a PDF or a supplier site. If your descriptions contain HTML, prefer HTML entities for quotes inside attributes and body text, so the CSV never has to carry them.

A quick scripted check also helps: parse the file with any CSV library and confirm every record has the same number of columns. That finds unclosed quotes immediately.

## When to do it yourself and when to hand it off

One bad line in a small file is a five-minute job. Do it yourself. If your supplier data is full of pasted text, mixed quoting and long descriptions, cleaning it by hand turns into days. We handle that in our [catalog cleanup](/catalog-cleanup) service: a person reviews every output and you approve before anything is loaded. If you would like to test the process on your own data, there is a [free 10-product sample](/free-sample) when the project is a fit.

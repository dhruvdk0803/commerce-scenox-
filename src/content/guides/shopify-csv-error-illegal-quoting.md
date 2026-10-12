---
title: "Shopify 'Illegal Quoting on Line' CSV Error: Fix"
heading: "Shopify 'Illegal quoting on line' error: what it means and the fix"
description: "Shopify says 'Illegal quoting on line' when a product CSV has a bad character or quote. Here are the causes, a broken and fixed row, and the steps to fix it."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Shopify shows 'Illegal quoting on line' when it hits a character it cannot parse, most often a file that is not UTF-8 or a quote mark in the wrong place. Save the file as UTF-8, replace curly quotes with straight ones, double any quote inside a field, and re-import."
faqs:
  - q: "What does 'Illegal quoting on line' mean in Shopify?"
    a: "Shopify could not parse the line it names. Its help documentation points to an illegal character in the file, so the file must be UTF-8, and notes that a missing or stray quote can cause the same message. Check encoding first, then the quotes on that line."
  - q: "Is the line number in the error a spreadsheet row?"
    a: "No. It counts lines in the raw text file. A description with line breaks inside quotes takes several lines, so the text line is usually higher than the spreadsheet row. Open the CSV in an editor that shows line numbers."
  - q: "Will Google Sheets avoid this error?"
    a: "Often, yes. Sheets exports UTF-8 and escapes inner quotes correctly. It still will not fix curly quotes that are already in your data, so search for them before you export."
  - q: "Do I have to re-import the whole file?"
    a: "Fix the file, then import it again with overwrite ticked if some products were already created. Matching handles will update instead of being skipped. Keep a copy of the original before you change anything."
---

You upload a product CSV and Shopify stops with "Illegal quoting on line" followed by a number. Nothing is imported, and the message gives you almost nothing to work with. The cause is nearly always one of two things: the file is not UTF-8, or there is a quote mark where the parser does not expect one. This page covers both. For the full list of import errors, see the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors).

## What the error means

Shopify reads your CSV as text. When it meets a character or quote it cannot interpret on a given line, it stops and reports that line. Shopify's help page on common import problems gives two reasons: an illegal character in the file, which is why the file must be UTF-8 encoded, and a missing or stray quote.

So the message is a symptom. The job is to find which of the causes is behind it, and you can usually do that in about ten minutes.

## Every cause we see

1. **The file is not UTF-8.** Excel on Windows often saves CSV in a legacy code page. Accented letters, currency signs and trademark symbols then become bytes Shopify cannot read.
2. **Curly quotes.** Spreadsheets and word processors replace straight quotes with typographic ones, either around fields or inside descriptions.
3. **An unescaped double quote inside a field.** Inch marks are the classic case: 12" or 24".
4. **An opening quote with no closing quote.** The parser then swallows the following lines into one field.
5. **A pasted description with hidden characters.** Text copied from a supplier PDF or a web page can carry non-printing characters.
6. **A wrong delimiter.** Excel in some regions exports semicolons. The whole line then looks like one badly quoted field.

## Broken row and fixed row

Here the description contains inch marks and a quoted word, none of them escaped.

Broken:

```csv
Handle,Title,Body (HTML),Vendor
tall-vase,Tall Vase,"<p>A 12" vase in "matte" glaze</p>",Northwind
```

Fixed:

```csv
Handle,Title,Body (HTML),Vendor
tall-vase,Tall Vase,"<p>A 12"" vase in ""matte"" glaze</p>",Northwind
```

Inside a quoted field, one literal double quote is written as two. An alternative that avoids the problem is to use the HTML entity `&quot;` or the word "inch" in the description.

## Step-by-step fix

1. Keep a copy of the original file.
2. Open the CSV in VS Code or Notepad++, not Excel, and jump to the line Shopify names.
3. Check the encoding shown in the status bar. If it says anything other than UTF-8, save it again as UTF-8.
4. Search the whole file for curly quotes (the characters “ ” ‘ ’) and replace them with straight quotes. Do the same for the line in the error.
5. On that line, look at each field. Every field that contains a comma, a line break or a double quote must be wrapped in quotes, and every inner double quote must be doubled.
6. Check that the number of quote characters on the record is even. An odd count means a missing closing quote.
7. Make sure fields are separated by commas, not semicolons.
8. Import a 10-row slice first. If it passes, import the rest.

If the error moves to a later line after a fix, that is progress. Keep going until the import runs.

## How to prevent it

Build the file in Google Sheets and download as CSV, or generate it from a script that uses a proper CSV library. Avoid opening a finished CSV in Excel and saving it again, because that is where encoding and quote changes creep in.

Run a find for curly quotes on every supplier file before it goes near a template. Most supplier files we receive have at least a few. A short validation step, even just counting columns per line, catches most structural problems before Shopify does.

## When to do it yourself and when to hand it off

For a small file, this is a quick fix and you should do it yourself. The cost shows up when a supplier sends thousands of rows with inconsistent quoting, or when you re-import every week and the same problem returns. Then the cleaning is the real project. Our [bulk product upload](/bulk-product-upload) service takes messy files, fixes them and loads them, with a person reviewing every output and your approval before anything goes live. You can try the [free 10-product sample](/free-sample) to see whether your project is a fit.

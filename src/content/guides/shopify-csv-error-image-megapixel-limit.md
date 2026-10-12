---
title: "Shopify 'Uploaded Image Exceeds the 20 Megapixel Limit'"
heading: "Shopify 'The uploaded image exceeds the 20 megapixel limit': how to fix it"
description: "Fix Shopify's 'Validation failed: The uploaded image exceeds the 20 megapixel limit' CSV error. Check dimensions, resize in bulk and re-import."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Shopify shows 'Validation failed: The uploaded image exceeds the 20 megapixel limit' when an image in your CSV is too large in pixel dimensions. Resize the image so width times height is under the limit, keeping it well below 5000 by 5000 pixels, host the new file and re-import."
faqs:
  - q: "What is the actual limit?"
    a: "The error message says 20 megapixels, while Shopify's help page also describes images up to 5000 by 5000 pixels, or 25 megapixels. The figures do not match, so resize to stay safely under both. Most product images need far less."
  - q: "Is this about file size in megabytes?"
    a: "No. Megapixels are pixel dimensions: width times height, divided by a million. A 5000 by 4500 image is 22.5 megapixels regardless of how small the file is after compression."
  - q: "What size should product images be?"
    a: "Around 2048 pixels on the long edge is a common working size that stays well inside the limit and allows zoom. Keep your files consistent across the catalog."
  - q: "Will resizing hurt quality?"
    a: "Resizing a 6000 pixel original to 2048 pixels loses detail you would not see on a product page. Keep the originals in an archive and publish the resized copies."
---

An image-related import error with a number in it is easy to act on: "Validation failed: The uploaded image exceeds the 20 megapixel limit". The photo is simply too big in pixels. See the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors) for the other image messages.

## What it means

A megapixel is a million pixels. A 5472 by 3648 photo from a modern camera is just under 20 megapixels, and many studio cameras and phones in high-resolution mode produce more. Shopify rejects any image over its limit during the import.

One caution on facts. Shopify's help page quotes this error with a 20 megapixel limit, yet its documentation elsewhere gives 5000 by 5000 pixels, or 25 megapixels. The two figures disagree. Resize to be under both and the question disappears.

## Causes

- **Unedited camera originals** uploaded straight from a photographer's folder.
- **Phone photos in high-resolution mode.**
- **Supplier images** supplied as print-quality files.
- **A scan or a stitched panorama** with extreme pixel dimensions.
- **Large banner images** accidentally included in the product image column.
- **A file saved with the wrong canvas size** by an editing tool, with the subject small inside a huge frame.

## Worked example

The row itself looks normal, which is why the error is confusing. The problem is in the file the URL points to.

Broken, where `shirt-front.jpg` is 6000 by 4000 pixels, 24 megapixels:

```csv
Handle,Title,Image Src,Image Position
linen-shirt,Linen Shirt,https://cdn.example.com/linen-shirt/shirt-front.jpg,1
```

Fixed, after resizing to 2048 by 2048 and re-uploading under a new name:

```csv
Handle,Title,Image Src,Image Position
linen-shirt,Linen Shirt,https://cdn.example.com/linen-shirt/shirt-front-2048.jpg,1
```

Using a new file name matters. Caches can serve the old file if the URL stays the same.

## Step-by-step fix

1. Note the products or lines named in the error.
2. Open each image URL and check its pixel dimensions in your image tool or browser.
3. Resize anything over the limit. Target about 2048 pixels on the long edge for most products.
4. Export as JPEG or PNG at sensible quality, so the file is also light for page speed.
5. Upload the new files and update Image Src with the new URLs.
6. Do a batch check. Most image tools, and many command line utilities, can read dimensions for a whole folder.
7. Re-import with overwrite ticked.
8. Check the product pages after import for cropping and quality.

## Prevention

Decide on a standard output size and add resizing as the last step of image preparation, not an afterthought. Keep originals in an archive folder and only host the resized versions. Add a check for dimensions to your pre-import routine, alongside the URL check.

Square images with the subject centred also stop Shopify themes from cropping awkwardly later.

## When to do it yourself and when to hand it off

Resizing a dozen photos takes a few minutes in any image editor. Resizing and renaming thousands of supplier images, then matching them to the right SKUs, is slow work that is easy to get wrong. Our [bulk product upload](/bulk-product-upload) service includes image preparation and linking, and our [AI product photos](/ai-product-photos) service handles imagery that needs more than resizing. A person reviews every output, and you approve before anything goes live. Try the [free 10-product sample](/free-sample) if your project is a fit.

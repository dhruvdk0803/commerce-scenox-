---
title: "Merchant Center Image Too Small: Sizes and Fixes"
heading: "Merchant Center image too small: sizes, causes and fixes"
description: "What Google's minimum image sizes are, why items get flagged as image too small, and how to replace images on Shopify and in your feed."
category: fixes
service: imagery
published: 2026-10-12
updated: 2026-10-12
summary: "Image too small means a product image falls below Google's minimum dimensions. Google's help pages list current minimums of 100 by 100 pixels for non-apparel and 250 by 250 for apparel, with a stricter 500 by 500 requirement announced for enforcement from 31 January 2027. Replace the image with a larger original; do not upscale."
faqs:
  - q: "What size should my product images be?"
    a: "Google recommends images of about 1500 by 1500 pixels or larger, and 500 by 500 is the new announced floor. Files must be under 16MB and 64 megapixels. Larger, sharp images also look better on Shopping surfaces than anything near the minimum."
  - q: "Does upscaling a small image fix it?"
    a: "Not properly. Google's guidance says not to scale up images or submit thumbnails. Even if the pixel count passes, a blurry enlargement is poor quality and may be flagged later. Re-shoot or source the original supplier image at full size."
  - q: "Which image does Google check?"
    a: "The main one in image_link. Additional images can have their own issues, which appear under incorrect value for additional_image_link. Fix the main image first because that is what the listing uses."
  - q: "Why did products flag when I changed nothing?"
    a: "Google is raising the minimum to 500 by 500 pixels. Its help page says warnings begin for images above the old minimum but under 500 by 500, with enforcement from 31 January 2027. Images that passed before can be flagged without any change on your side."
---

Small images look bad in Shopping ads and are one of the more straightforward things to fix. This guide covers the sizes Google lists, how to find the offenders, and how to replace them. For the other image issues, see [promotional overlays](/guides/merchant-center-promotional-overlay-image) and [generic images](/guides/merchant-center-generic-image), and the broader [product image requirements guide](/guides/product-image-requirements).

## How the issue appears

In **Products**, then **Needs attention**, the issue is shown as "Image too small". Google's [help page for the issue](https://support.google.com/merchants/answer/12159030) lists the current minimums as 100 by 100 pixels for non-apparel and 250 by 250 for apparel, a ceiling of 64 megapixels and 16MB, and says not to scale up images or submit thumbnails. The same page and the [image_link specification](https://support.google.com/merchants/answer/6324350) announce a new 500 by 500 pixel minimum for all products, with enforcement from 31 January 2027 and earlier warnings for images between the old and new minimums. Check the pages for the latest dates before relying on these.

## What triggers it

- Thumbnail URLs in the feed, such as a `_small` or `_100x100` version of the image.
- Supplier images supplied at low resolution.
- A feed that points at a resized CDN variant rather than the original.
- A platform that compresses uploads aggressively.
- Placeholder or icon-sized files.

## How to find affected items

1. Filter **Needs attention** by "Image too small" and download the CSV.
2. Open the image URLs from the CSV directly. A URL containing a size suffix is a clue.
3. Check dimensions in a browser or image tool, and see whether the original upload is larger than the URL the feed uses.

## Fix steps for Shopify

1. Open the product in admin and check the uploaded media. If the original is below 500 pixels on the short side, replace it with a larger file. Shopify serves resized versions from the original, so a small upload cannot produce a larger image.
2. Make sure the first image is the one you want Google to use, as that is typically the main image.
3. If an app or theme serves a transformed URL in the feed, check what the Google & YouTube app actually sends and adjust.
4. For many products, export, replace the URLs in the `Image Src` column and re-import. Our [CSV import errors guide](/guides/shopify-csv-import-errors) covers the format.

## Fix steps for other platforms and feeds

- Point `[image_link]` at the full-size original, not a thumbnail.
- WooCommerce and Magento: check which image size the feed plugin uses. It often defaults to a medium or thumbnail size.
- Use JPEG, PNG or WebP with a file extension that matches the format.
- Replace the file or change the URL. Google notes that changing the URL can force a faster fetch.
- Aim above the minimum: the recommendation is 1500 by 1500 pixels or larger.

## Re-review and recrawl expectations

Once the new image URL is live and the item reprocessed, products typically clear within a day or two. Google fetches images with a separate crawler, so make sure robots.txt allows Googlebot-Image.

## Prevention

- Ask suppliers for original-resolution images, not web previews.
- Set an upload standard of at least 1500 pixels on the short side.
- Check what your feed app sends after any theme or plugin change.
- Audit images below 500 pixels now, ahead of the enforcement date.

## When to do it yourself and when to hand it off

Replacing a few low-resolution images with larger originals is straightforward, and Merchant Center picks the change up on the next crawl.

Hand it off when a supplier sent the whole catalog in thumbnail sizes and every image needs replacing or rebuilding. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

---
title: "Merchant Center Promotional Overlay on Image: Fix"
heading: "Merchant Center promotional overlay on image: what counts and how to fix it"
description: "Why Google disapproves product images with text, badges, logos or watermarks, what is allowed, and how to fix it on Shopify and in your feed."
category: fixes
service: imagery
published: 2026-10-12
updated: 2026-10-12
summary: "Google disapproves product images that carry promotional text, badges, price or shipping details, merchant logos or watermarks. Fix it by pointing image_link at a clean product photo, or by turning on Merchant Center's automatic image improvements, which try to remove overlays. Keep the badge versions for your own site and ads."
faqs:
  - q: "What counts as a promotional overlay?"
    a: "Calls to action such as buy now, price or shipping information, warranty claims, promotional adjectives, condition or compatibility text, barcodes and QR codes, and store names or logos. Google also excludes stock watermarks and borders. A logo that is physically part of the product is fine."
  - q: "Can Google fix the image automatically?"
    a: "If you enable automatic image improvements in Merchant Center, Google says it tries to remove text, watermarks, overlays or logos, and approves the product if that works. It does not always succeed, and you should still keep a clean source image as the main one."
  - q: "Can I keep sale badges on my own store?"
    a: "Yes, as long as the image URL in your feed points to a clean version. Many stores keep the badge as an overlay added by the theme, not baked into the file. If the badge is part of the file, upload a separate clean image for the feed."
  - q: "Are lifestyle photos allowed as the main image?"
    a: "Google allows additional images to show the product in context, but the main image should clearly show the product being sold. If a lifestyle shot hides the product or includes items you do not sell with it, use a plain product photo as the main image."
---

Sale badges, "free delivery" stickers and brand logos are common on product images because they work on your own store. Google does not allow them on the image you send to Shopping. This guide explains what is flagged, how to find the images, and how to fix them. For other image issues see [image too small](/guides/merchant-center-image-too-small) and [generic images](/guides/merchant-center-generic-image), and for general sizing the [product image requirements guide](/guides/product-image-requirements).

## How the issue appears

In **Products**, then **Needs attention**, the issue is shown as a promotional overlay or text on image problem. Google's [help page on text on image](https://support.google.com/merchants/answer/6101131) explains the fix, and the [image_link specification](https://support.google.com/merchants/answer/6324350) lists what is not allowed.

## What triggers it

Per the specification, these are not allowed on the main image:

- Calls to action, price or shipping information, warranty claims, promotional adjectives, and condition or compatibility text.
- Barcodes or QR codes.
- Stock watermarks, copyright symbols, and added brand or retailer logos. A logo that is a physical part of the product is acceptable.
- Borders and single-colour squares.
- Names or logos of merchants, even when they do not overlap the product.

## How to find affected items

1. Filter **Needs attention** by the image issue and download the CSV.
2. Open the image URLs. Look at the baked-in elements: corner badges, "SALE" ribbons, price stickers.
3. Check suppliers' images too. Many supplier photos carry a distributor logo or watermark you did not add.
4. Sort by supplier or collection. Overlays are usually applied in batches.

## Fix steps for Shopify

1. Open the product in admin and swap the first image for a clean photo. If the badge was added by a design tool and uploaded, keep that file only as a later image.
2. If your theme or an app draws badges over the image with CSS, the underlying file is typically clean, so the cause is probably elsewhere. Check what URL the Google & YouTube app sends.
3. In Merchant Center, consider enabling automatic image improvements under the product data settings. Google says it tries to remove overlays and re-approves the product if it works.
4. In bulk, export, replace the `Image Src` values with clean file URLs and re-import.

## Fix steps for other platforms and feeds

- Maintain two image sets: a clean master per product for feeds and marketplaces, and a marketing version for your own pages.
- Change the `[image_link]` URL to the clean file. Google notes that changing the URL can force a faster fetch than re-uploading to the same URL.
- Use `[additional_image_link]` for lifestyle or detail shots.
- Ask suppliers for unwatermarked images, and remove distributor logos from the main image.
- Check the extension matches the actual format.

## Re-review and recrawl expectations

After the clean image is live, items typically clear within a day or two once reprocessed. If you turned on automatic image improvements, the status may update without any action from you. Items still flagged after a couple of days usually have a second image issue, so recheck the specification.

## Prevention

- Keep clean masters as the source of truth and generate marketing variants from them.
- Add "clean main image" to your supplier onboarding checklist.
- Keep badge logic in the theme, not the image file.
- Spot-check new supplier batches before they reach the feed.

## When to do it yourself and when to hand it off

Re-exporting a few images without the badge or text overlay is something you can do in any image editor, then wait for the recrawl.

Hand it off when the overlays are baked into every supplier image and the catalog needs clean versions at scale. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

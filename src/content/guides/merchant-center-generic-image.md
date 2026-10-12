---
title: "Merchant Center Generic or Placeholder Image: Fix"
heading: "Merchant Center generic image and placeholder image: how to fix it"
description: "Why products are flagged for generic or placeholder images, which categories are exempt, and how to find and replace the images in Shopify and feeds."
category: fixes
service: imagery
published: 2026-10-12
updated: 2026-10-12
summary: "Google flags images that are generic or placeholders, such as a logo, an illustration, a no image available graphic or one stand-in photo reused across products. Every product needs its own image showing the item itself. Replace the image_link URL, then check Needs attention. A few categories such as hardware and vehicle parts are exempt."
faqs:
  - q: "What is a generic image?"
    a: "An image that does not show the actual product: a logo, a mockup or illustration, a coming-soon graphic, the text no image available, or one stand-in photo used for several different products. Google's help article is titled Image too generic, and lists these as examples of what is not allowed."
  - q: "Are any categories exempt?"
    a: "Yes. Google's specification allows generic graphics for Hardware, Vehicles and Parts, and Computer Software, with software logos or icons allowed for the software category. Check the current image_link page for the exact list before assuming your category qualifies."
  - q: "Can I use a manufacturer's stock photo?"
    a: "Usually yes, if it is a clean photo of the product with no watermark or logo overlay. Check the manufacturer's usage terms. Where suppliers give one hero image for a range of colours, you still need a variant-accurate image for each colour."
  - q: "Why are my variants flagged but not the parent?"
    a: "Variants often inherit the parent image or fall back to a default. If every colour uses the same photo, Google may treat it as a stand-in. Assign a variant-specific image to each variant that differs visibly."
---

Products without a proper photo do get listed on your own store, often with a grey placeholder, but Google will not show them. This guide covers what is flagged, how to find them and how to fix the images. For related image issues see [promotional overlays](/guides/merchant-center-promotional-overlay-image) and [image too small](/guides/merchant-center-image-too-small).

## How the issue appears

In **Products**, then **Needs attention**, the issue is shown under a generic or placeholder image label. Google's [help article](https://support.google.com/merchants/answer/12469645) is titled "Image too generic" and also appears as "Generic placeholder image". It says the image must not be generic or a placeholder, with examples such as logos or the text "No image available".

## What triggers it

The [image_link specification](https://support.google.com/merchants/answer/6324350) rules out:

- "Coming soon" or similar graphics.
- A store logo used instead of a product photo.
- A shared stand-in image used across several products.
- Illustrations or mockups that do not depict the product.
- A single-colour square image.
- Images showing products that are not sold with the main product.

Exceptions exist: generic graphics are allowed for Hardware, Vehicles and Parts, and Software categories, and single-colour images for a few paint categories. Check the page for the current list.

## How to find affected items

1. Filter **Needs attention** by the generic image issue and download the CSV.
2. Count how many rows share the same `image_link`. A URL repeated across many products is almost certainly a placeholder.
3. In your catalog, search for products whose image file name contains words like "placeholder", "default", "noimage" or "coming-soon".
4. Check products created from supplier files, where the image URL column was empty and a default was filled in.

## Fix steps for Shopify

1. Filter products with no image in admin and add a real photo to each.
2. If an app or theme substitutes a default image into the feed when none exists, remove that behaviour, or exclude imageless products from the Google channel until they have one.
3. For variants sharing a parent image, assign each variant its own image in the variant settings.
4. Re-import with a corrected `Image Src` column for many products. Our [CSV import errors guide](/guides/shopify-csv-import-errors) shows the format.

## Fix steps for other platforms and feeds

- Do not send a default image URL for products without a photo. Leave them out of the feed until the image exists.
- Change `[image_link]` to a real product photo. Google notes that changing the URL can force a faster fetch.
- For configurable and variable products in WooCommerce or Magento, check the variant image field, not just the parent.
- If the true photo does not exist yet, hold the product back rather than using a mockup.
- AI-generated product images are an option for gaps, but Google's specification says AI-generated images must keep IPTC DigitalSourceType metadata. Check the image still depicts the actual product accurately.

## Re-review and recrawl expectations

Items are typically re-evaluated within a day or two after the new image is live and the feed reprocessed. If the image URL is unchanged but the file behind it was swapped, a recrawl may take longer, so change the URL.

## Prevention

- Block publishing of products with no image on the sales channel.
- Treat an empty image column as an error at import, not something to fill with a default.
- Give every variant that differs visibly its own photo.
- Audit for repeated image URLs every quarter.

## When to do it yourself and when to hand it off

Swapping a few placeholder or stock images for real product photos is quick work you can do yourself, then let Google recrawl.

Hand it off when hundreds of products only have supplier or stock images and you need a consistent set made from what you already have. Our [feed management service](/product-feed-management) covers setup and clean-up: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff or collaborator account you can remove, never your passwords. Feeds start from ₹7,999 / $199 / £159 / A$299 per channel, with a fixed quote after we inspect your files, and turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. You can ask for the [free 10-product sample](/free-sample) if the project is a fit.

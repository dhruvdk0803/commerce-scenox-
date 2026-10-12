---
title: "GTIN, MPN and Brand: What to Do When You Don't Have Them"
heading: "GTIN, MPN and brand: what to do when you don't have them"
description: "How Google Merchant Center treats GTIN, MPN and brand, what identifier_exists really means, and what to do for handmade, private-label and custom products."
category: feeds
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "Google wants each product to carry either a valid GTIN, or both a brand and an MPN. Never invent a GTIN: an incorrect one gets the product disapproved. Private-label sellers use their own store name as the brand and can register their own barcodes. Use identifier_exists no only when no identifier truly exists."
faqs:
  - q: "Do I need a GTIN to sell on Google Shopping?"
    a: "Not always, but Google requires a valid GTIN for products that have a manufacturer-assigned one. If the product has none, you supply brand and MPN instead. For genuinely custom or handmade items with no identifiers, you can tell Google so with identifier_exists. Never make up a number."
  - q: "What is identifier_exists and when do I use it?"
    a: "It is a Merchant Center attribute that tells Google a product has no unique product identifiers. Accepted values are yes, true, no and false. Use no or false only when you are certain no GTIN, MPN or brand identifier is assigned. If the product does have identifiers, a value of no can lead to disapproval."
  - q: "Can I use my own SKU as the MPN?"
    a: "Only if the SKU is truly the manufacturer's part number. If you make or private-label the product, the SKU you assign can serve as the MPN for your own brand, since you are the manufacturer. If you resell another brand's product, use that manufacturer's part number, not your internal SKU."
  - q: "What brand should I use for handmade or unbranded products?"
    a: "Google's guidance for products you make yourself with no official brand is to use your store name as the brand. For resold products, use the real manufacturer's brand. Do not use words like generic or unbranded as a placeholder if a real brand name exists."
  - q: "Where do I get GTINs for my own products?"
    a: "Barcodes are issued through GS1, the standards body, by joining your national GS1 organisation and registering a company prefix. Some marketplaces have their own rules about third-party barcode resellers. Check the destination's current policy before buying from a reseller, and verify any barcode before you use it."
---

Product identifiers are the part of a feed where a small shortcut, such as a made-up barcode, can get a whole catalog flagged. They are also the part many sellers do not understand, because they sell their own goods and have never seen a GTIN. This guide separates the three attributes, explains the rule, and gives a decision path for each kind of product.

Rules differ by country and category and Google revises its specification periodically. Treat this as the practical shape of the rule, and check the Merchant Center product data specification for your target market before you rely on any detail.

## What each identifier is

**GTIN** (Global Trade Item Number) is the barcode number assigned to a product by its manufacturer. It appears under the barcode as a UPC (12 digits), EAN (13 digits) or ISBN for books. Google accepts only valid GTINs as defined by GS1's validation guide, which means the final check digit has to compute correctly.

**MPN** (Manufacturer Part Number) is the part number the manufacturer uses for the item. It is printed on the product or in the manufacturer's catalog. It is not your SKU unless you are the manufacturer.

**Brand** is the name of the product's maker. Google's specification requires it for products with a clearly associated brand or manufacturer.

These three together are Google's "unique product identifiers", or UPIs.

## The rule in plain terms

Google's guidance is that each product needs either an accurate GTIN, or both a brand and an MPN. If a product has a manufacturer-assigned GTIN, supply it. The MPN is needed when the product has no manufacturer-assigned GTIN. A GTIN you invented is worse than no GTIN: Google's documentation says that submitting an incorrect GTIN gets the product disapproved.

Books and media are stricter. They need brand and GTIN, with the publisher as the brand for media like CDs, and identifier_exists set to true.

## Decision path by product type

Work from what you sell.

### Resold branded products (you buy from a brand or distributor)

Use the manufacturer's GTIN, brand and MPN. Source them from the supplier's data sheet, the packaging, or the manufacturer's website. Do not pull them from a marketplace listing, as these are often wrong.

Where a supplier sheet is missing GTINs, ask for them. A distributor that sells you the product has them. If it is a small brand with no barcodes, treat it as the next case.

### Private label (you commission goods under your own brand)

You are the brand, so use your brand name. You are also the manufacturer from the buyer's point of view, so your own SKU can work as the MPN if it is stable and unique. For the GTIN, the proper route is to register barcodes through GS1, the standards organisation that issues them. Joining your national GS1 organisation gives you a company prefix from which you allocate numbers to each product variant.

This costs money and admin, and it is worth it if you sell on several channels, since Amazon and others ask for barcodes too. Check any marketplace's current barcode policy before buying numbers from a reseller.

### Handmade, custom or one-off goods

Google's guidance on identifier_exists is that you can use `no` or `false` when you are certain the product has no assigned unique product identifiers. A one-off piece of jewellery, a made-to-order print or a hand-poured candle may honestly qualify. Use your store name as the brand, because Google's guidance for products you make yourself is to use the store name when there is no official brand.

Be honest about the "certain". If you could register a barcode and have not, the product still has no identifier, and the attribute is accurate. If the item is someone else's branded product, it has identifiers whether or not your supplier gave them to you, and `no` is wrong.

### Variants

Each variant (size, colour) has its own GTIN if the manufacturer assigned them. Supply the variant's own GTIN on each variant's row, not one GTIN for the whole product. Where the manufacturer assigned them per style only, the feed will be thinner. Check the data with the supplier rather than copying one barcode across sizes.

## A worked example

A fashion store sells four types of product. Here is how the identifier columns come out:

| Product | Brand | GTIN | MPN | identifier_exists |
|---|---|---|---|---|
| Nike running shoe, size 9 | Nike | Supplier's EAN | Nike style code | (leave blank) |
| Own-label linen shirt, M | Northfield (own brand) | GS1-issued barcode if registered | Own SKU `LS-NAT-M` | (blank if GTIN set, else see note) |
| Hand-block-printed scarf, one of a kind | Store name | none | none | no |
| Branded kurta from a small supplier with no barcodes | Supplier brand | none | Supplier style number | (blank, MPN and brand supplied) |

Note on the own-label row: if you have no barcode but supply brand and MPN, the product meets the brand-plus-MPN route and you do not need identifier_exists. If you supply neither, say no.

A feed row for the scarf might look like this:

```csv
id,title,brand,gtin,mpn,identifier_exists
SCARF-001,Hand block printed cotton scarf indigo,Northfield,,,no
```

## Check digits and format

Google only accepts valid GTINs, so a number with a wrong check digit will be flagged. Common problems:

- **Leading zeros stripped.** Spreadsheets turn `012345678905` into `12345678905`. Format the column as text before pasting.
- **Wrong length.** UPC-A is 12 digits, EAN-13 is 13, GTIN-14 is 14. Anything else is invalid.
- **Scientific notation.** A spreadsheet showing `1.23457E+12` has destroyed the number. Re-source it.
- **One GTIN on many variants.** Each variant normally has its own.
- **Reused or placeholder numbers.** `1234567890123` and `0000000000000` are not products.
- **Numbers from a reseller you cannot verify.** If the check digit passes but the prefix belongs to another company, a marketplace can still reject it.

You can validate a GTIN with a check-digit formula or GS1's validation guide. In a spreadsheet, a formula column that flags failures is quick to build and worth having.

## Fixing disapprovals about identifiers

Merchant Center shows issues such as missing or incorrect GTIN, and incorrect product identifier, in diagnostics. The pattern we see most is one of three: a made-up GTIN from a feed tool's default, GTINs with lost leading zeros, or branded products submitted with `identifier_exists` set to no. The fix is to correct the data at source, not to switch the flag. Switching to `no` on a product that has identifiers risks a disapproval, as Google warns.

Our [disapprovals guide](/guides/google-merchant-center-disapprovals) walks through the full diagnostics list, and the [product category guide](/guides/google-product-category) covers the other half of feed classification.

## Maintaining identifiers

Treat identifiers as catalog data and not a feed afterthought:

1. Capture GTIN, MPN and brand when a product is created, as separate fields.
2. Keep them with the variant, not the parent.
3. Validate on import: length, check digit and duplicates.
4. Record the source (supplier sheet, packaging, GS1) so you can trace problems.
5. Review when a supplier changes packaging, because barcodes sometimes change.

For standard CSV workflows, Shopify's product file has a Barcodes column and, under its Google Shopping columns, an MPN column, so the data can live with the product.

## When to do it yourself and when to hand it off

If you sell fewer than a hundred products, most of them private-label or handmade, you can set brand, MPN and identifier_exists yourself in an afternoon. Look up the rule, apply the table above and keep a note of your decisions.

It gets harder when a catalog is mixed: resold brands with partial supplier data, variants missing barcodes and some wrong numbers already in the system. Cleaning that, finding real identifiers and building the feed is part of our [product feed management service](/product-feed-management), and a person checks every output before you approve it. Start with the [free sample](/free-sample) to see what your data returns.

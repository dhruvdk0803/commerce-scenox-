---
title: "Fashion Catalog Upload: Variants, Size Charts, Swatches"
heading: "Fashion catalog upload: variants, size charts, colour swatches and the data that cuts returns"
description: "Structure a fashion catalog for upload: size and colour variants, SKU naming, size charts, Google Shopping apparel attributes and Indian sizing."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Structure fashion products as one parent per style and colour (or per style, with colour as an option), one variant per size, and a SKU pattern like WD-118-SAGE-M. Add fabric, care, fit and size chart data, and fill Google's gender, age_group, color and size fields. Most returns trace back to missing size and fit detail."
faqs:
  - q: "Should each colour be its own product or a variant?"
    a: "On Shopify, WooCommerce and BigCommerce, colour as an option on one product is simplest and keeps reviews together. Separate products per colour give better colour-specific images, titles and feeds, and avoid option limits. Many fashion stores use one product per colour, grouped by a shared style code."
  - q: "What is the Shopify variant limit?"
    a: "Shopify has long capped products at three options. At the time of writing, its developer documentation allows up to 2,048 variants per product, up from the old 100. Check your plan and the current Shopify docs, because limits for apps and APIs can differ."
  - q: "What attributes does Google Shopping require for clothing?"
    a: "Apparel in many countries needs gender, age_group, color and size, and usually size_type and size_system are advised. Variants of one style should share an item_group_id. Missing or mismatched values are a frequent cause of disapprovals or weak performance."
  - q: "How should I list Indian sizing like S, M, L and 38, 40?"
    a: "State one primary size system per product and keep it consistent. For kurtas and sarees-adjacent items, show chest or bust and length in inches or cm on the size chart. For Google, set size_system to the right country code and keep the numeric size clear."
  - q: "How do I list a kurta set with dupatta and bottoms?"
    a: "Decide whether the set is one product or separate pieces. For a set sold together, list one product with the contents in the title and description and one size variant. If pieces can be bought separately, make each its own product and link them in the description."
---

Fashion catalogues break the simple rules other categories get away with. One style comes in six colours and seven sizes, each combination has stock, and every customer wants to know whether it will fit. Get the structure right at upload and the rest of the store works. Get it wrong and you spend months fixing variants, feeds and returns.

This guide covers structure per platform, SKU and title patterns, the attributes that matter, imagery conventions and Google's apparel fields.

## Decide your parent: style, or style and colour

Every fashion catalogue needs one decision up front: is a colourway a variant of a product, or its own product?

| Approach | Good for | Cost |
|---|---|---|
| One product per style, colour and size as options | Few colours, simple stores | Colour images get mixed in a shared gallery; option limits apply |
| One product per style and colour, size as the only option | Many colours, feeds, colour-specific SEO | More products to manage; link them via a shared style code |

For catalogues with more than three or four colours per style, we generally lean to one product per colour. Galleries stay clean, titles can name the colour, feeds map neatly, and size is the only variant. Whichever you choose, apply it to the whole catalogue.

## Variant structure by platform

### Shopify

Shopify allows three options per product, such as Size, Colour and Fabric or Length. At the time of writing, Shopify allows up to 2,048 variants per product, where the old cap was 100. Confirm the current figure in your admin and in the developer documentation, since limits have been changing and some apps or older themes still behave as if the cap were 100. A fourth option, such as inseam length on top of size and colour, needs a different design: separate products, a metafield-driven selector or an app.

Shopify does not give colour swatches by default. Most themes can render swatches from the Colour option if the option name is exactly what the theme expects and a swatch is configured, either as a hex value or an image. Check your theme's documentation.

### WooCommerce

Variable products use a parent plus variations, each with its own SKU, price and stock. Attributes such as Size and Colour can be global (used for filtering across the store) or product-only. For fashion, use global attributes for size, colour and fabric so layered navigation filters work. See the [WooCommerce CSV import guide](/guides/woocommerce-product-csv-import) for the row structure.

### Magento and BigCommerce

Magento uses configurable products with simple children and global dropdown attributes, as in the [Magento 2 import guide](/guides/magento-2-product-import). BigCommerce uses Variant rows with Options values, as in the [BigCommerce import guide](/guides/bigcommerce-bulk-product-import). In both, option values must be spelled identically everywhere.

## SKU and title naming

A SKU pattern should be readable by a warehouse worker and parseable by a spreadsheet. A reliable pattern:

```
STYLE-COLOUR-SIZE
WD-118-SAGE-M
```

WD for the category (women's dress), 118 for the style number, SAGE for the colour code, M for the size. Keep colour codes short but unambiguous (SAGE, NAVY, BLK), use one-letter or two-letter sizes consistently (XS, S, M, L, XL, XXL), and never reuse a SKU. Avoid spaces and slashes, and do not let Excel turn codes like 1E5 into numbers.

Titles should carry what a shopper searches for. A workable pattern:

```
Brand + Style type + Key attribute + Colour
Linen blend midi dress, sage green
```

Put size in the variant, not the title. Keep the same pattern across the catalogue so sorting and feeds behave.

## Attributes that cut returns

Fit and fabric questions drive most apparel returns. Put these on every product in a consistent field, not buried in a paragraph:

- Fabric and composition (for example 100% cotton, or 60% viscose, 40% polyester)
- Care instructions
- Fit (slim, regular, relaxed) and how it runs
- Length, and the model's height and the size they are wearing
- Rise, sleeve length, neckline, closure, lining, pockets
- Country of origin if you display it

In Shopify, use metafields for these so the theme can show them as a consistent spec block and so feeds can read them. In WooCommerce, use global attributes or custom fields; in Magento, attributes in an attribute set for apparel.

## Size charts

Every product should have access to a size chart for its garment type. Do not paste the table into each description.

- Shopify: a page or a metafield (rich text or a reference) linked from the product template, with one chart per garment type.
- WooCommerce: a product tab or a shared block assigned by category.
- Magento and BigCommerce: a CMS block or page linked from the product page.

Give measurements of the garment or the body, and say which. Use both inches and centimetres for Indian and international buyers. A chart for kurtas should list chest, waist or hip, length and sleeve length. Add a note on how to measure.

## Imagery: model, flat lay and ghost mannequin

Mix these deliberately rather than by accident.

| Type | What it shows | Use |
|---|---|---|
| Model shot | Fit, drape, scale | Primary image on most platforms |
| Flat lay | Shape, print detail | Secondary, good for accessories |
| Ghost mannequin | Garment shape without a person | Marketplaces, catalogues without models |
| Detail close-up | Fabric, stitching, embroidery | Secondary, reduces fabric disputes |

Use the same aspect ratio for every product (4:5 portrait is common in fashion), a consistent background, and a consistent order: front, back, side, detail, model. Name image files with the SKU style and colour so they can be matched back to products, for example `WD-118-SAGE-front.jpg`. See the [product image requirements](/guides/product-image-requirements) for platform specifics, and our [AI product imagery](/ai-product-photos) service for volume work.

## Google Shopping apparel attributes

Clothing in Merchant Center needs more than other categories. For each variant, supply:

| Attribute | Notes |
|---|---|
| gender | male, female or unisex |
| age_group | adult, kids, toddler, infant, newborn |
| color | The real colour name; up to three for multicolour, separated by a slash |
| size | The size as shown to the customer |
| size_type | regular, petite, plus, maternity and so on |
| size_system | The country standard, such as US, UK, EU or IN |
| item_group_id | Same value across all variants of one style |
| material, pattern | Strongly advised |

Each variant needs its own id, link and image where possible, and the same item_group_id as its siblings. Check Google's help centre pages for the current requirements by country, as they vary. Our [Google Merchant Center disapprovals](/guides/google-merchant-center-disapprovals) guide covers the common failures.

## Indian sizing and kurta sets

Indian catalogues carry a few specifics.

- Pick one primary size system per product. Many Indian brands use S to XXL for kurtas and numeric chest sizes (36, 38, 40) for menswear. Show the conversion in the size chart rather than mixing systems in the variant names.
- For feeds, set size_system correctly (IN where available, or another system that fits) and keep the numeric size consistent.
- Kurta sets: if the kurta, bottom and dupatta are sold together, make it one product, list the contents ("Kurta, palazzo and dupatta") in the title and in a bulleted contents field, and note which pieces carry the measurements. If pieces can be bought separately, make separate products and link them.
- Sarees and unstitched fabric have no size. Use a length in metres as an attribute and make the blouse piece status explicit.
- Colour names such as "mehendi green" or "rani pink" are valid for the customer, but map them to a base colour in your colour attribute so filters and Google feeds work.

## A pre-upload checklist

1. One structure rule (parent per style, or per style and colour) applied to every product.
2. A SKU pattern with no duplicates, and colour codes agreed.
3. Option names identical across products (Size, Colour, not Sizes and Color mixed).
4. Fabric, care, fit and model info filled in.
5. Size chart assigned by garment type.
6. Images named by SKU, same ratio, same order.
7. Gender, age group, colour and size mapped for feeds.
8. A test batch of ten products imported and checked on mobile.

## When to do it yourself and when to hand it off

A small label with a few dozen styles can do this alone: set the rules, build a spreadsheet, test ten products, repeat. The work is mostly discipline.

It gets heavy when a season drops hundreds of styles, each with colours, sizes, images and size charts, supplier sheets disagree with each other, or the same data must also feed Google and a marketplace. Our [bulk product upload](/bulk-product-upload) service does this with an AI engine for the volume and a person reviewing every output; you approve before anything goes live. Catalog listing starts at ₹6,999 / $149 / £119 / A$229 for up to 250 products, with a fixed quote after we inspect your files. Turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. We work through a staff account you can remove, never your password, and your data is never used to train third-party models. The [free 10-product sample](/free-sample) is a safe way to see how we would handle your styles.

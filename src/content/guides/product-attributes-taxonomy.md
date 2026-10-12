---
title: "Product Attributes and Taxonomy: How to Design Both"
heading: "Designing product attributes and taxonomy for an ecommerce catalog"
description: "How to plan categories, attributes and filters for an online store: controlled values, worked examples for fashion and electronics, and common mistakes."
category: content
service: cleanup
published: 2026-10-12
updated: 2026-10-12
summary: "Taxonomy is the category tree that organises your products. Attributes are the structured facts about each product, such as colour, material or capacity. Design them together: categories should be few and stable, attributes should use controlled values, and every filter shoppers use should map to a real attribute."
faqs:
  - q: "What is the difference between taxonomy and attributes?"
    a: "Taxonomy is how products are grouped, usually a tree of categories. Attributes are the properties of each product, such as colour, size or material. Taxonomy answers where a product lives; attributes describe what it is and power filters, feeds and search."
  - q: "How many category levels should a store have?"
    a: "Two or three is enough for most catalogs. Deeper trees hide products and split small ranges into near-empty pages. Use attributes and filters for finer distinctions instead of more levels."
  - q: "Should colour and size be attributes or variant options?"
    a: "Both, in a sense. If a shopper picks it when buying and it changes stock, it is a variant option. If it describes the product and is used for filtering, it is an attribute. Colour is often both, which is why a separate filter-friendly colour value helps."
  - q: "What are controlled values?"
    a: "A fixed list of allowed entries for an attribute, for example Colour can only be Black, White, Navy and so on. Controlled values stop 'Navy', 'navy blue' and 'Dark Blue' becoming three filters for the same thing."
  - q: "Does Shopify have built-in product attributes?"
    a: "Shopify has a standard product taxonomy with categories and category-specific attributes, and it also supports metafields for custom data. Check Shopify's help centre for the current taxonomy and which attributes your category supports, as it is updated over time."
---

When a shopper clicks "Blue" in a filter and half the blue products are missing, the problem is not the filter. It is that the products were described with five spellings of blue. Taxonomy and attributes are the plumbing that makes browsing, search, feeds and marketplaces work, and they are far easier to design before the catalog is big.

This guide shows how to design both, with controlled values, worked examples and the mistakes that cause the mess.

## Taxonomy and attributes, defined

**Taxonomy** is the tree of categories: Women, Women's Clothing, Dresses. A product sits in one or a few places in the tree.

**Attributes** are structured properties of a product: colour, material, fit, capacity, wattage, pack size. Each has a name and a value.

They do different jobs. Taxonomy decides where a product can be found by browsing. Attributes decide how it can be narrowed down, compared and exported to a feed. A store with a good tree and no attributes is hard to filter. A store with rich attributes and a chaotic tree is hard to browse.

## Start from how shoppers choose

Do not design from your supplier's spreadsheet. Design from how buyers decide.

1. Pick ten bestselling products in a category.
2. Write what a shopper must know to choose between two of them. For kurtas: size, fabric, sleeve length, neckline, occasion. For laptops: screen size, processor, RAM, storage, weight.
3. Those are your attributes for the category.

Competitors' filters are a quick check. If every large store in your niche filters by "Occasion" and you do not, you are missing an attribute buyers expect.

## Designing the category tree

A few principles keep trees healthy.

- **Two or three levels.** Women > Dresses is clear. Women > Dresses > Party Dresses > Short Party Dresses is a maze.
- **Mutually exclusive branches where you can.** A product should have an obvious home. Where it truly belongs in two places, use collections or tags for the second route rather than duplicating the tree.
- **Names shoppers use.** "Kurtas" beats "Ethnic Upper Wear".
- **Avoid "Other" and "Miscellaneous".** They are where products go to disappear.
- **Minimum size.** A category with two products is a page that looks empty. Merge it or promote it into an attribute.
- **Stable.** Every rename or merge has URL and redirect consequences. Plan the tree to last.

On Shopify, the tree you show customers is built from collections and menus, while the platform's own product category field (the standard taxonomy) is what feeds and marketplaces read. Treat them as two layers and keep them consistent. See our guide to [Shopify collections](/guides/shopify-collections) for the shop-front layer, and [Google product categories](/guides/google-product-category) for the feed layer.

## Choosing attributes

Group attributes into three kinds.

| Kind | Purpose | Examples |
| --- | --- | --- |
| Filter attributes | Used by shoppers to narrow lists | Colour family, size, material, brand, price band |
| Descriptive attributes | Shown on the page, not usually filtered | Care instructions, country of origin, model number |
| Feed attributes | Required by Google, Meta or marketplaces | Brand, GTIN, condition, gender, age group, material |

One attribute can be several of these. Material is a filter, a description and a feed field. That is a good sign: the more places it serves, the more it is worth keeping clean.

Keep the list short per category. Eight well-filled attributes beat twenty half-empty ones. An attribute nobody fills in becomes noise.

## Controlled values

This is the single most useful discipline in catalog data. For every filter attribute, define the allowed values in advance.

For Colour, you might need two levels:

| Specific colour (display) | Colour family (filter) |
| --- | --- |
| Navy | Blue |
| Sky Blue | Blue |
| Burgundy | Red |
| Off White | White |
| Charcoal | Grey |

The shopper sees "Navy" on the product, and the filter groups it under "Blue". Without the family, you get 40 colour filters. Without the specific name, the product page tells the buyer nothing.

Rules for controlled values:

- One spelling and one capitalisation.
- Singular or plural, pick one.
- Units in one system with the unit in the attribute name: "Capacity (litres)" with values 0.5, 1, 1.5.
- No combined values. "Cotton/Polyester" in one cell breaks filtering. Use separate fields or a defined list of blends.
- An explicit "Not applicable" or leave blank. Do not write "N/A", "-", "none" and "null" in different rows.

## Worked example: fashion

A women's kurta category.

```
Taxonomy:   Women > Ethnic Wear > Kurtas
Attributes:
  Fabric:        Cotton | Rayon | Linen | Silk Blend
  Sleeve:        Sleeveless | Short | Three-Quarter | Full
  Neckline:      Round | V-Neck | Mandarin | Boat
  Fit:           Straight | A-Line | Anarkali
  Occasion:      Daily | Office | Festive | Wedding
  Colour family: Blue | Red | Green | ...
```

A raw supplier row might read: `"Blue cotton kurti 3/4 slv V neck festival wear"`. Split against the schema it becomes:

```csv
Title,Fabric,Sleeve,Neckline,Fit,Occasion,Colour family
Women's Cotton Straight Kurta,Cotton,Three-Quarter,V-Neck,Straight,Festive,Blue
```

The raw text had all the information, but in a form no filter could use.

## Worked example: electronics

A laptop category.

```
Taxonomy:   Computers > Laptops
Attributes:
  Screen size (inches):   13.3 | 14 | 15.6 | 16
  Processor family:       Intel Core i5 | Intel Core i7 | AMD Ryzen 5 | Apple M-series
  RAM (GB):               8 | 16 | 32
  Storage (GB):           256 | 512 | 1024
  Operating system:       Windows | macOS | ChromeOS
```

Notice the units live in the attribute names and the values are plain numbers. That makes sorting and range filters possible, which a value like "16GB DDR5 RAM (upgradable)" prevents.

## Where attributes live on each platform

Where you store the data depends on the platform.

- **Shopify:** the standard product taxonomy and category attributes cover common ones. Custom attributes go into metafields, which can be used for filtering in the storefront. See [importing metafields in bulk](/guides/shopify-metafields-import).
- **WooCommerce:** product attributes and taxonomies are native. Global attributes are reusable across products and drive layered navigation, local ones are per product.
- **Magento / Adobe Commerce:** attributes and attribute sets are central. Configurable products rely on them.
- **BigCommerce:** product filtering and custom fields, with variant options for choices.

Whatever the platform, the design work is the same and happens in a spreadsheet first.

## Common mistakes

- **Tags as attributes.** Free-text tags drift. Use them for internal grouping, not filtering.
- **Attributes in the title only.** If material appears in the title but nowhere structured, it cannot filter or feed.
- **Too many near-duplicate values.** "Maroon", "Burgundy", "Wine" with no family.
- **Different attribute sets for the same category.** Half the dresses have Fit, half do not.
- **Designing around the supplier's data.** Their spreadsheet reflects their system, not your shoppers.
- **Building the tree before the products are understood.** Pull the real list of products first.

## A short process

1. List categories and count products in each.
2. For each, list the 5-8 attributes buyers use.
3. Define controlled values per attribute.
4. Map existing messy values to the controlled ones in a lookup sheet.
5. Apply the mapping in bulk, then review the exceptions by hand.
6. Lock the lists and give one person ownership of changes.

Step 4 is where most of the effort goes. A sheet with `old value` and `new value` columns, applied with a lookup, turns a day of manual editing into a few minutes plus a review.

## When to do it yourself and when to hand it off

For a small, focused catalog, designing the schema and mapping values in a spreadsheet is manageable and a good way to learn your own range. Do it, and keep the lookup sheet.

When there are thousands of products from several suppliers, free-text attributes buried in titles, and missing values everywhere, the extraction and mapping is the slow part. That is what our [catalog cleanup service](/catalog-cleanup) is for: an AI engine does the volume, a person reviews every output, and you approve before anything goes live. See [catalog management service vs PIM software](/guides/catalog-management-service-vs-pim) if you are weighing tools against a service, and send ten products through the [free sample](/free-sample) to see the structure applied to your own data.

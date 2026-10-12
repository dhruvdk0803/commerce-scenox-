---
title: "SKU Naming Conventions: Formats, Rules and Examples"
heading: "SKU naming conventions that stay readable as your catalog grows"
description: "How to design SKUs for an ecommerce catalog: structure, length, characters to avoid, variant suffixes, with examples for apparel, electronics and home."
category: content
service: cleanup
published: 2026-10-12
updated: 2026-10-12
summary: "A good SKU is unique, short, stable and readable by a person in the warehouse. Build it from segments such as category, product, colour and size, separated by hyphens, in capitals, with no spaces or special characters. Never reuse a SKU or change one once orders exist."
faqs:
  - q: "What is a SKU and how is it different from a barcode?"
    a: "A SKU is your own internal code for a specific sellable variant. A barcode, usually a GTIN such as EAN or UPC, is a global product identifier assigned by GS1 or the manufacturer. A product can have both, and the SKU is yours to design."
  - q: "How long should a SKU be?"
    a: "Short enough to read aloud and type without errors, usually 8 to 16 characters. Past that, people mistype and truncate it, and some systems enforce their own limits. Shopify, for example, accepts SKUs of considerable length, but other tools in your stack may not."
  - q: "Should SKUs include the colour and size?"
    a: "For variants, yes. Each colour and size combination is a different stock-holding unit and needs its own SKU. Put the parent product code first and variant codes as suffixes, so all variants of one product sort together."
  - q: "Can I change SKUs after I have been selling?"
    a: "You can, but it is risky. SKUs appear in orders, inventory systems, feeds, marketplaces and reports. Changing them breaks history and mappings. If you must change, keep a mapping table old to new and update all connected systems in one planned move."
  - q: "Should I use the supplier's SKU as mine?"
    a: "Usually not as your primary SKU. Supplier codes change, collide between suppliers and expose your sourcing. Keep the supplier code in a separate field and issue your own consistent SKU."
---

A SKU is a code you invent so that you, your warehouse, your accountant and your software can all point at exactly the same thing. When it is designed well, nobody notices it. When it is not, you get duplicate stock, mis-picked orders and a feed full of products nobody can match to a record.

This guide covers how to build a SKU scheme that survives growth, with formats you can copy for common catalog types.

## What a SKU is for

A SKU (stock keeping unit) identifies one sellable variant. A T-shirt in blue and size M is one SKU. The same T-shirt in blue and size L is another. It is different from a GTIN (EAN, UPC, ISBN), which is a global identifier allocated by the manufacturer or GS1. The SKU is internal and yours to design.

It does four jobs:

- Stock: inventory is counted per SKU.
- Fulfilment: pick lists and packing slips show it.
- Reporting: sales by SKU shows what actually sells.
- Integration: feeds, marketplaces and accounting software map to it.

Because it has to work in all four, it needs to be stable, unique and understandable at a glance.

## Rules that prevent most problems

1. **Unique.** One SKU, one variant, forever. Never reuse a SKU after discontinuing a product.
2. **Stable.** Do not change a SKU once it has appeared on an order.
3. **Readable.** A person should be able to guess roughly what it is.
4. **Consistent length and order of segments.** Sorting a spreadsheet by SKU should group related products.
5. **Capitals and hyphens only.** Letters A-Z, digits 0-9 and hyphens. Hyphens make it easy to split into segments.
6. **No spaces, no special characters.** Spaces, slashes, ampersands, commas and quotes cause trouble in CSV files, URLs and barcode scanners.
7. **Avoid easily confused characters.** Letter O and zero, letter I and one, letter S and five. Either skip them or use them deliberately and consistently.
8. **No meaning that expires.** Do not put prices, season-specific promotions or the supplier's name in the code, because those change.

One more that is often missed: do not begin a SKU with a zero if the file will ever pass through a spreadsheet. Excel strips leading zeros from numbers unless the column is formatted as text.

## The structure: segments, not strings

Think in segments. Each segment answers one question, and the segments are joined by hyphens.

```
[Category]-[Product]-[Attribute 1]-[Attribute 2]
```

Keep segments short: 2 to 4 characters for category and attributes, a number or short code for the product. The product segment is what makes it unique; the other segments make it readable.

### Choosing segment codes

Create a small lookup table and stick to it. For example:

| Segment | Code | Meaning |
| --- | --- | --- |
| Category | TS | T-shirt |
| Category | JN | Jeans |
| Colour | BLK | Black |
| Colour | NVY | Navy |
| Size | S, M, L, XL | Size |
| Size | 32, 34 | Waist in inches |

The lookup table is the real asset. It lives in a shared sheet, and anyone adding a product uses it instead of improvising.

## Worked examples by catalog type

### Apparel

Pattern: `CATEGORY-PRODUCT NUMBER-COLOUR-SIZE`

```
TS-0142-NVY-M     Crew neck T-shirt, navy, medium
TS-0142-NVY-L     Same shirt, navy, large
TS-0142-WHT-M     Same shirt, white, medium
JN-0057-IND-32    Slim jeans, indigo, waist 32
```

The product number (0142) is the same for every colour and size of that shirt, so filtering on `TS-0142` shows the whole product family. This works when the sheet column is formatted as text, so the leading zero survives.

### Electronics

Pattern: `BRAND-MODEL-VARIANT`

```
SNY-WHCH520-BLK     Sony WH-CH520 headphones, black
SNY-WHCH520-BLU     Same, blue
SAM-BUDS2-GRA       Samsung Galaxy Buds2, graphite
```

For electronics, the manufacturer's model number is often the most useful segment because it is how people and suppliers refer to the product. Strip hyphens and spaces from it so the SKU stays regular.

### Home and kitchen

Pattern: `CATEGORY-PRODUCT-SIZE-MATERIAL`

```
BTL-0031-1L-SS     Water bottle, 1 litre, stainless steel
BTL-0031-750-SS    Same bottle, 750 ml
CVR-0208-16-CTN    Cushion cover, 16 inch, cotton
```

### Bundles and kits

Prefix or suffix bundles so they are obvious.

```
KIT-0007            Skincare starter kit
KIT-0007-CMB        Combination skin version
```

Bundles that consume stock of component SKUs need that relationship set up in your inventory system. The SKU alone does not do it.

## Variants: parent and child

On Shopify, a product has one title and up to three options (for example colour, size and material), and each combination is a variant with its own SKU. Shopify's CSV groups variants by the `Handle` column, so every row for one product shares a handle and each row has its own `Variant SKU`.

A scheme that suits this: the first part of the SKU is the product (parent), the end of the SKU is the variant (child).

```csv
Handle,Title,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Variant SKU
crew-neck-tee,Crew Neck T-Shirt,Colour,Navy,Size,M,TS-0142-NVY-M
crew-neck-tee,,Colour,Navy,Size,L,TS-0142-NVY-L
crew-neck-tee,,Colour,White,Size,M,TS-0142-WHT-M
```

For more on that file format, see [Shopify variants via CSV](/guides/shopify-variants-csv) and [Shopify bulk product upload](/guides/shopify-bulk-product-upload).

## Mistakes we see in supplier files and old stores

Most SKU problems are inherited, not designed. The ones that come up again and again:

- **Duplicates.** Two different products sharing one SKU, usually from a copy-pasted row. Inventory counts become meaningless.
- **Blanks.** Variants with no SKU. Shopify allows it, but stock tracking, feeds and marketplaces get harder.
- **Mixed formats.** `TS-142-NVY-M`, `ts0142navym` and `TS_0142_NAVY_MEDIUM` in the same catalog, because three people uploaded at different times.
- **Meaning in the wrong place.** Prices or supplier names baked into the code.
- **Scientific notation.** A numeric SKU like `1234567890123` turned into `1.23457E+12` by a spreadsheet. Format SKU columns as text before pasting data in.
- **Leading zeros lost.** `0142` becoming `142` after an Excel round trip.
- **Trailing spaces.** The SKU looks right, but a space at the end makes it a different string and breaks matching.

An audit for all of these takes minutes in a spreadsheet: a duplicate check, a blank check, a length check, a regular expression for allowed characters. Our [catalog data quality checklist](/guides/catalog-data-quality-checklist) lists the formulas.

## Changing SKUs on a live store

Sometimes you inherit a mess and a rename is the right move. Do it carefully:

1. Build a mapping table: old SKU, new SKU.
2. Check which systems store the old SKU: Shopify, the warehouse tool, accounting, feeds, marketplaces, third-party logistics.
3. Pick a quiet moment and update inventory and listings together.
4. Keep the mapping table so historical reports can be joined.
5. Re-check feeds and marketplace listings afterwards, because they match on SKU or on a separate item ID you also need to keep stable.

Do not rename SKUs only for neatness. If the current ones are unique, stable and non-blank, leave them alone and apply the new scheme to new products.

## When to do it yourself and when to hand it off

If you are starting a store or have under a few hundred products, write the lookup table and the pattern yourself. An hour of planning avoids a year of inconsistency.

If you have thousands of rows from several suppliers, with duplicates, blanks and mixed formats, the work is mostly mapping and validation, which is the kind of volume where tooling plus review helps. Our [catalog cleanup](/catalog-cleanup) work covers SKU normalisation as part of a wider tidy-up, with a person reviewing every output and you approving before anything is imported. It starts from ₹4,999 / $129 / £99 / A$199 for up to 250 products. You can test it on ten of your products with the [free sample](/free-sample).

## A starting template

Copy this into a sheet and adapt:

| Segment | Length | Allowed characters | Example |
| --- | --- | --- | --- |
| Category | 2-3 | A-Z | TS |
| Product number | 4 | 0-9 (text format) | 0142 |
| Colour | 3 | A-Z | NVY |
| Size | 1-3 | A-Z, 0-9 | M |

Add a column for the full SKU, a duplicate check formula, and a "last used product number" cell so nobody reuses one. That is the whole system.

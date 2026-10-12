---
title: "Shopify Collections: Manual vs Automated, Rules, Bulk Setup"
heading: "Shopify collections: manual vs automated, rules and bulk setup"
description: "When to use manual or automated Shopify collections, how to write condition rules from tags and product data, and how to bulk assign hundreds of products."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Manual collections hold products you pick one by one. Automated collections add products that meet conditions such as tag, type, vendor or price, and you can set up to 60 conditions with all-or-any logic. For large catalogs, build the rules on clean tags and types, not on titles."
faqs:
  - q: "What is the difference between manual and automated collections in Shopify?"
    a: "A manual collection contains exactly the products you add, in the order you choose. An automated collection fills itself from conditions you define, such as product type, tag, vendor or price, and updates as products change. Automated collections suit large catalogs; manual ones suit curated groupings."
  - q: "How many conditions can an automated collection have?"
    a: "Shopify's help documentation says up to 60 selection conditions. You choose whether a product must meet all conditions or any one of them. In practice, three or four well-chosen conditions on clean data outperform a long list of rules."
  - q: "Can I add products to a collection from the product CSV?"
    a: "Shopify's CSV documentation lists a Collection column as optional and addable to an import file, with the note that a product takes one collection that way and collection names are limited to 255 characters. For many-to-many membership, rules or an app are cleaner."
  - q: "Why is my automated collection empty?"
    a: "Usually the condition text does not match the data exactly, for example a tag typed as Summer in the rule and summer-2026 on products, or the products are in draft status. Check the product data first, then the rule, then the collection's availability on the sales channel."
  - q: "Should I create collections before or after importing products?"
    a: "Import products first if the rules depend on tags, type or vendor, then create the automated collections and confirm counts. If you plan manual collections, create the empty collections first so you can assign products as you go. Either way, plan the structure before you import."
---

A Shopify store with 500 products and no collection structure is a shelf of unlabelled boxes. Customers browse by category, search engines rank collection pages for broad queries, and your navigation, filters and feeds all lean on how products are grouped. Collections are cheap to create and hard to fix later if the product data underneath is inconsistent, which is why this guide starts with the data.

Shopify has been moving to a newer collections model, and its help pages flag that manual and smart collections are being replaced. The ideas below still apply, but confirm the exact admin labels in your own store.

## Manual vs automated: pick by how the group changes

A manual collection holds the products you add to it, in the order you set. An automated collection (called a smart collection in older documentation) holds every product that meets the conditions you define, and updates itself as products are added, edited or removed.

| | Manual | Automated |
|---|---|---|
| Membership | You choose each product | Rules choose |
| Best for | Curated edits, homepage features, gift guides | Categories, brands, price bands, sale items |
| Effort at scale | High: each product added by hand | Low once data is clean |
| New products | Must be added by hand | Join automatically if they match |
| Risk | Gets stale | Silent wrong matches if the data is messy |

A sensible store uses both. Category and brand collections are automated, because they are defined by data. Campaign and editorial collections are manual, because a person decides.

## Writing automated collection rules

You choose whether a product must meet all conditions or any one condition, and you can add up to 60 conditions. Rules compare a product field with a value, using tests such as equals, contains, starts with, greater than or less than, depending on the field. The fields available are those shown in your admin's condition drop-down; common ones are product type, vendor, tag, title, price and compare-at price.

A few patterns that work well:

- **Category collection.** Product type is equal to `Kurtas`. One condition, no ambiguity.
- **Brand collection.** Vendor is equal to `Northfield`.
- **Gender and category.** Tag is equal to `women` AND product type is equal to `Shirts`. Use "all conditions".
- **Sale collection.** Compare-at price is greater than 0. Quiet, and always right when you maintain compare-at prices properly.
- **Seasonal edit.** Tag is equal to `ss26`, with a manual curation on top if you need an ordering.

Avoid rules on title text. "Title contains shirt" catches "T-shirt dress" and misses "Tunic". Titles are written for customers and change; types and tags are fields you control.

## Fix the data the rules depend on

Automated collections are only as accurate as the fields behind them. Before you build any rules, audit three columns in the product export:

1. **Type.** Pick a controlled list. `Kurta`, `Kurtas` and `kurta set` are three values to a rule, not one. A short, agreed list of 15 to 40 product types is typical for a mid-size store.
2. **Tags.** Decide a tag convention: lowercase, hyphens, prefix by purpose. `gender:women`, `season:ss26`, `occasion:wedding` is easier to rule on than a free-for-all. Prefixed tags also help Shopify's storefront filtering.
3. **Vendor.** One spelling per brand. "Northfield", "Northfield Co" and "NORTHFIELD" create three brand pages.

Our approach on messy catalogs is to normalise these three columns first, then build rules. It is dull, and it is where nearly all the wrong-collection problems come from. For a fuller treatment of the schema, see the [taxonomy guide](/guides/product-attributes-taxonomy).

## Bulk setup: three routes

**Route 1: rules only.** If your type, tag and vendor columns are clean, create each automated collection in admin from the rule. Twenty collections take an hour or two. Check the product count against what you expect from a pivot of the export.

**Route 2: the Collection column in the product CSV.** Shopify's CSV documentation lists Collection as an optional column you can add to an import file, notes that a product takes one collection that way, and gives a 255-character cap on collection names. That suits a simple one-product-one-category structure, and it is also a quick way to seed manual collections. It does not suit a product that belongs in six collections.

**Route 3: app or API.** For many-to-many assignment at scale, such as a product in "Women", "Summer", "Under 2,000" and "New in", rules on tags are cleaner than assigning memberships directly. Where you do need direct control, a bulk-editing app or the Admin API will do it; check the app's own documentation for what it supports.

A practical combined plan for a 800-product fashion store:

1. Normalise type, vendor and tags in the spreadsheet.
2. Import products.
3. Create automated collections for each type, each brand, "Sale" and "New".
4. Create three or four manual collections for campaigns.
5. Compare each collection's count with a count from the spreadsheet.

## Collection pages that rank and sell

A collection is also a landing page. Each one has a title, a description, a handle and an image, and the SEO title and description. A collection called "Kurtas" with no description is a thin page. Two or three sentences of useful copy above the grid, covering what is in it, materials, sizing notes or how to choose, give a search engine and a visitor something to read.

Keep handles short and stable: `/collections/kurtas`, not `/collections/womens-cotton-kurtas-summer-2026`. A seasonal handle becomes a dead page next year. If you must change a handle later, Shopify offers to create a redirect; accept it. If the collection structure is changing as part of a platform move, the [301 redirect guide](/guides/migration-301-redirects) covers mapping old category URLs.

Set the sort order deliberately. Automated collections can sort by options such as best selling, price, title or date, and manual collections can be ordered by hand. Best selling suits a mature category; "newest" suits fashion.

## Check, publish and maintain

Before you publish, verify each collection:

- The product count matches the expectation from the data.
- Draft or archived products are excluded as you intend (a draft product does not show to customers).
- The collection is available on the sales channels you use, including Online Store and any feed-linked channels.
- The first twelve products on the page look good; that is what a shopper and a screenshot show.

Then maintain it. Every time a new supplier delivers products, check the type, tag and vendor fields against your list. A single new type spelled differently produces a hole in a collection, with no error to tell you.

## A worked example: 12 collections for a small fashion store

Take a store selling women's ethnic wear from three brands. A workable structure is: five automated category collections (Kurtas, Sarees, Dupattas, Co-ord sets, Lehengas), three automated brand collections, one automated Sale collection on compare-at price, one automated New collection on a `new` tag that staff remove after 30 days, and two manual campaign collections for festive edits. That is twelve collections, ten of them maintained by data.

The point of the exercise is the count check. If the spreadsheet says 140 products have type Kurtas and the collection shows 131, nine products have a stray spelling, a draft status or a missing sales channel. Finding those nine before launch is the whole value of doing it carefully.

## When to do it yourself and when to hand it off

A store with under 100 products and a handful of categories can do this alone in an afternoon. The work is small, and you know the products.

Past a few hundred products, or when the tags and types arrive inconsistent from several suppliers, the standardising is the job. Our [catalog cleanup service](/catalog-cleanup) normalises type, vendor and tags, proposes a collection structure and writes the collection copy. A person reviews every output and you approve before anything goes live. The [free sample](/free-sample) shows how your own ten products would come back.

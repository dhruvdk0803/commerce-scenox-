---
title: "Magento to Shopify Migration Checklist and Data Map"
heading: "Magento to Shopify migration: the checklist we work from"
description: "A practical Magento (Adobe Commerce) to Shopify migration checklist: data mapping, tools, 301 redirect CSV, SEO checks and launch-day QA."
category: migration
service: migration
published: 2026-10-12
updated: 2026-10-12
summary: "Migrating Magento to Shopify means mapping configurable products to variants, categories to collections and attribute sets to metafields, importing products, then customers, then orders, and 301-redirecting every old .html URL. Customer passwords cannot be carried over. Most stores take one to twelve weeks, depending on catalog complexity and custom functionality."
faqs:
  - q: "Can I move customer passwords from Magento to Shopify?"
    a: "No. Magento stores passwords as hashes that Shopify cannot import. Customers are migrated as records, then invited to activate their account or reset a password by email. Plan a short message to tell them before launch so the invitation does not look like spam."
  - q: "How many variants and options does a Shopify product allow?"
    a: "Shopify allows up to 2,048 variants and three options per product. A Magento configurable with four attributes, such as size, colour, material and length, does not fit as it stands. You merge one attribute into another, split the product, or move one value into a metafield."
  - q: "Do I need 301 redirects after migrating from Magento?"
    a: "Yes. Magento product and category URLs usually end in .html and sit at the root, while Shopify uses /products/handle and /collections/handle. Without redirects, every old link, bookmark and search result returns a 404 and the rankings those pages earned are lost."
  - q: "How long does a Magento to Shopify migration take?"
    a: "A clean catalog of a few hundred products can move in one to three weeks. Stores with thousands of configurables, custom modules, multiple store views or B2B pricing more often take four to twelve weeks, mostly because of the decisions around the data rather than the transfer itself."
  - q: "Should I migrate old orders into Shopify?"
    a: "Usually yes, for customer service and repeat-purchase reporting, but imported orders are historical records. They do not trigger fulfilment or payment. Turn off staff order notifications before importing, or each imported order sends an email."
---

Moving from Magento (Adobe Commerce) to Shopify is less about copying data and more about translating a flexible, developer-built data model into a fixed, simpler one. The data transfer is the easy part. The work is in the mapping decisions, the redirects and the launch-day checks. This is the checklist we use, with the tables and files you need.

## Plan before you export anything

Start by listing what the Magento store actually does, not what it is supposed to do. Open the admin and note every extension, custom module, cron job and integration (ERP, shipping, tax, reviews, loyalty). Each one needs a Shopify answer: a native feature, an app, or a deliberate decision to drop it.

Then fix the data you are taking with you. Magento stores accumulate disabled products, duplicate SKUs, orphaned images and attribute values nobody uses. Migrating them just moves the mess. Decide which products, customers and orders are in scope, and delete or archive the rest before export.

A minimal planning list:

1. Count products, configurable parents, simple children, categories, customers and orders.
2. List attribute sets and which attributes drive variants versus display only.
3. Export the full URL list from the sitemap and from Search Console for the redirect map.
4. Note multiple store views, currencies and languages. Shopify handles these through Markets rather than store views.
5. Choose a launch date away from your peak trading period, and a freeze window for Magento edits.

## How Magento data maps to Shopify

The mapping table below covers the entities that cause most of the rework.

| Magento | Shopify | Watch out for |
|---|---|---|
| Configurable product + simple children | One product with variants | Limit of three options and 2,048 variants per product |
| Simple product (standalone) | Product with a single default variant | SKU becomes the variant SKU |
| Attribute set | No direct equivalent; use options, tags or metafields | Attributes that filter in Magento should become metafields or tags |
| Swatch attributes | Product options with theme swatches | Needs theme support or an app |
| Category tree | Collections (manual or automated), plus menus for the hierarchy | Collections are flat; nesting lives in navigation |
| Bundle and grouped products | Bundle app or a separate product with notes | No direct native equivalent |
| Customer groups and tier prices | Customer tags, B2B features or an app | Pricing rules rarely map one to one |
| Customer accounts | Customer records | Passwords cannot be migrated |
| Orders | Historical orders | Imported as records, no fulfilment triggers |
| CMS pages and blocks | Pages and theme sections | Rebuild; do not paste Magento HTML |
| URL rewrites | URL redirects | Only 404ing URLs can be redirected |

Shopify's own documentation confirms the limits: [up to 2,048 variants and three options per product](https://help.shopify.com/en/manual/products/variants/add-variants). If a Magento configurable uses four attributes, pick the three that matter for purchase and move the fourth to a metafield, or split the product into two.

### Configurable products in practice

A Magento configurable is a parent plus child simples, each with its own SKU, price and stock. On Shopify the children become variants of one product. The parent's name, description and images move to the product. Child-specific images need to be assigned to variants, which is where most exports lose data.

### Categories and attributes

Do not recreate the Magento category tree one to one. Shopify collections work best as shallow, intentional groupings. Use automated collections driven by tags or product type for groupings such as men's shirts, and build the visible hierarchy in the navigation menu.

Attributes such as material, fit or country of origin should go into metafields, defined with a type, so the theme and filters can use them. Decide the metafield list once, before import, from the attribute set export.

## Tools and approaches

There are three realistic routes.

- **Shopify's migration apps and importers.** Shopify recommends importing products first, then customers, then historical orders, so that records link correctly. It also says some data cannot be migrated through CSV, so check what each route covers against your data. [Shopify's migration guide](https://help.shopify.com/en/manual/migrating-to-shopify) lists the options.
- **Matrixify.** An app that imports and exports products, collections, customers, orders, redirects and metafields from Excel, Google Sheets or CSV. It suits stores where the data needs reshaping in a spreadsheet before it goes in, and it covers redirects and metafields that basic importers skip.
- **Custom scripts.** A script reading Magento's database or API and writing through Shopify's Admin API. Worth it for complex logic (merging attributes, generating handles, mapping customer groups) or very large catalogs. It also needs someone to maintain it for the length of the project.

In our experience the best result is a hybrid: Matrixify or CSV for the bulk, a script for the transformations a spreadsheet cannot do cleanly, and manual work for CMS content.

## URL structure and the 301 redirect map

Magento and Shopify build URLs differently, which is why redirects are the part of a migration that most affects search traffic.

| Page type | Typical Magento URL | Shopify URL |
|---|---|---|
| Product | /blue-linen-shirt.html | /products/blue-linen-shirt |
| Category | /men/shirts.html | /collections/shirts |
| CMS page | /about-us | /pages/about-us |
| Blog | /blog/post-title | /blogs/news/post-title |

Magento URL suffixes and paths are configurable, so confirm yours from a crawl. Build the map from a full crawl of the live site plus the URLs Search Console shows receiving impressions. Map each old URL to its closest equivalent on Shopify, not to the homepage. Import them under **Content > Menus > URL redirects > Import**. The file uses two columns:

```csv
Redirect from,Redirect to
/blue-linen-shirt.html,/products/blue-linen-shirt
/men/shirts.html,/collections/shirts
/men/shirts/linen.html,/collections/linen-shirts
/about-us,/pages/about-us
/blog/how-to-style-linen,/blogs/news/how-to-style-linen
```

Rules from [Shopify's redirect documentation](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect) worth knowing: redirects only work for URLs that return a 404, so a path that still resolves on Shopify cannot be redirected. Paths beginning /apps, /cart, /orders and a few others are reserved. A standard store can hold up to 100,000 redirects, which covers most catalogs but not the very largest. URLs with query strings may not behave as expected.

If a category and a product share a slug, create the handle list first, then generate the CSV from it.

## SEO checklist

- Keep product handles as close to the old slugs as possible, minus the .html.
- Carry over page titles and meta descriptions into the SEO fields.
- Keep image alt text from Magento, then improve it where it is empty.
- Check structured data: most Shopify themes output product schema, but confirm price, availability and review markup after launch.
- Resubmit the sitemap in Search Console once the domain points at Shopify (Shopify generates /sitemap.xml).
- Keep language targeting if you run several languages, through Markets.
- Re-verify Google Merchant Center, analytics and ad pixels, and check the feed still matches the new product URLs.

## Launch day and post-launch QA

Launch order matters. Disconnect the domain from the old platform ahead of time, as Shopify notes this helps avoid SSL certificate errors on the new store.

On launch day:

1. Freeze Magento orders and note the final order number.
2. Run a delta import for products, stock and orders created since the main migration.
3. Switch DNS, confirm SSL is active, and set the Shopify domain as primary.
4. Upload the redirect CSV, if not already done, and test a sample of fifty old URLs.
5. Place a real test order on each payment method and refund it.
6. Check shipping rates, tax, discount codes and email notifications.

For the first two weeks after launch, watch Search Console for 404 and coverage errors, add redirects for any missed URLs, compare daily orders against your previous baseline, and check customer service for login complaints. Expect some: no password migration means a wave of reset requests.

### Timeline ranges

| Store profile | Typical range |
|---|---|
| Under 500 products, one store view, few extensions | 1 to 3 weeks |
| 500 to 5,000 products, some custom logic | 3 to 6 weeks |
| 5,000+ products, multiple store views, B2B or ERP integration | 6 to 12 weeks |

These are working ranges from our experience, not guarantees. The theme build and any custom functionality usually set the pace, not the data.

## When to do it yourself and when to hand it off

Doing it yourself is reasonable when the catalog is small, the data is clean, there are no custom modules, and you can afford a few days of trial imports. Matrixify's documentation and Shopify's guide are enough for that.

Hand it off when you have thousands of configurables to reshape, multiple store views, messy attributes, or a hard deadline. That is where [our store migration service](/store-migration) fits: the AI engine does the volume, a person reviews every output, and you approve before anything goes live. We never ask for store passwords; we work through a staff account you can remove. Turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. Migration starts from ₹19,999 / $499 / £399 / A$749 per store, with a fixed quote after we inspect your files. To see the quality first, request the [free 10-product sample](/free-sample) if your project is a fit. Pricing is on the [pricing page](/pricing).

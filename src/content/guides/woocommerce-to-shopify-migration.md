---
title: "WooCommerce to Shopify Migration Checklist"
heading: "WooCommerce to Shopify migration: checklist, data map and redirects"
description: "Move WooCommerce to Shopify without losing rankings: variable product mapping, reviews, customers, orders, /product/ redirects, gateways by market."
category: migration
service: migration
published: 2026-10-12
updated: 2026-10-12
summary: "To migrate WooCommerce to Shopify, map variable products to variants (three options, 2,048 variants), categories to collections, and import products, then customers, then orders. Passwords cannot move, reviews need an app, and every /product/ URL needs a 301 to /products/. Replace plugins with apps or native features before launch."
faqs:
  - q: "Can customer passwords be migrated from WooCommerce to Shopify?"
    a: "No. WordPress password hashes cannot be imported into Shopify. Customer records come across, and each customer receives an invitation to set a new password. Tell customers in advance, and keep a guest checkout path open so nobody is blocked from ordering at launch."
  - q: "What happens to my WooCommerce product reviews?"
    a: "Shopify has no built-in review import for WordPress comments. Export reviews to CSV and import them through your review app, such as the one you plan to use for storefront reviews. Check the app supports import and keeps the original dates and star ratings."
  - q: "Do WooCommerce variable products fit in Shopify?"
    a: "Mostly. A variable product becomes one Shopify product with variants. Shopify allows three options and 2,048 variants per product, so products with four or more attributes need one attribute moved to a metafield or the product split. Attributes used only for display become metafields."
  - q: "What are the WooCommerce and Shopify URL differences?"
    a: "WooCommerce typically uses /product/slug/ and /product-category/slug/, with a trailing slash. Shopify uses /products/handle and /collections/handle. Each old URL needs a 301 redirect to its closest Shopify equivalent, imported through Content, Menus, URL redirects."
  - q: "How long does a WooCommerce to Shopify migration take?"
    a: "A clean store with a few hundred products can move in one to three weeks including theme setup. Stores with thousands of variable products, subscriptions, memberships or custom plugins more often need four to ten weeks. Replacing plugin functionality usually takes longer than moving the data."
---

WooCommerce stores usually carry years of plugin decisions, and that is the real subject of a migration to Shopify. The product data moves cleanly enough. What takes planning is everything a plugin was quietly doing: bundles, deposits, memberships, custom checkout fields. This checklist covers the data, the redirects, the payment setup by market and the plugins that need a replacement.

## Audit the store before you export

Open Plugins in WordPress and list every active one. Next to each, write what it does for customers and what Shopify will use instead: a native feature, an app, or nothing. Do this first, because it drives the budget and the timeline more than the product count does.

Then clean the data:

1. Delete drafts, trashed products and test orders.
2. Check SKUs are unique and present on every variation.
3. Remove unused product attributes and tags.
4. Export products, customers and orders from WooCommerce as CSV, and open them. If the files look chaotic here, they will be chaotic in Shopify.
5. Crawl the live site and export the URL list for the redirect map.

## How WooCommerce data maps to Shopify

| WooCommerce | Shopify | Watch out for |
|---|---|---|
| Simple product | Product with one default variant | SKU becomes the variant SKU |
| Variable product + variations | One product with variants | Three options and 2,048 variants maximum |
| Global attributes | Options (if they drive variants) or metafields | Display-only attributes should not become options |
| Product categories | Collections | Nested categories become flat collections plus navigation |
| Product tags | Product tags | Direct match |
| Grouped products | Separate products with a related-products setup | No native grouped type |
| Customers | Customer records | Passwords cannot be migrated |
| Orders | Historical orders | Records only, no fulfilment triggered |
| Coupons | Discount codes | Rules such as per-user limits need checking |
| Reviews | Review app import | Not part of the core product import |
| Pages and posts | Pages and blog posts | Rebuild layout; page-builder shortcodes will not transfer |

Shopify allows [up to 2,048 variants and three options per product](https://help.shopify.com/en/manual/products/variants/add-variants). A WooCommerce variable product with size, colour, material and finish has four attributes, so one has to go. Usually the least purchase-relevant attribute becomes a metafield, or the product is split by finish.

### Categories to collections

WooCommerce categories are a tree and products can sit in several. Shopify collections are flat. Keep the top-level shopping groups as collections, use automated rules (by tag, type or vendor) for the long tail, and rebuild the tree in the navigation menu rather than in the collection structure.

### Reviews, customers and orders

Reviews are the item most often forgotten. Export them from WooCommerce, then use the import function of whichever review app you install on Shopify. Confirm it retains reviewer name, rating, date and the product link before you commit to an app.

For customers and orders, [Shopify advises importing products first, then customers, then historical orders](https://help.shopify.com/en/manual/migrating-to-shopify), so records connect properly. Turn off staff new-order notifications before importing orders, or every historical order sends an email.

## Tools and approaches

You have the same three choices as most migrations. Shopify's importer and migration apps handle the straightforward cases. Matrixify, an app that imports and exports products, customers, orders, redirects and metafields from spreadsheet or CSV files, is the usual choice when you want to reshape data first. Custom scripts through the Admin API are worth it for large catalogs or heavy transformations, such as merging attributes or generating handles in bulk.

A caution on WooCommerce exports: variable product CSVs put parent and variation rows in the same file, with attributes in numbered columns. Check each variation row carries its own price, SKU and stock figure before importing. A variation with a blank price is the most common cause of a product that arrives with the wrong price or fails to import.

## URL redirects: /product/ to /products/

WooCommerce permalinks are configurable, but the defaults are /product/ for products and /product-category/ for categories. Shopify uses /products/ and /collections/. Build the redirect file from your crawl, mapping each old URL to the closest new page.

```csv
Redirect from,Redirect to
/product/linen-shirt/,/products/linen-shirt
/product/linen-shirt,/products/linen-shirt
/product-category/mens/shirts/,/collections/shirts
/product-category/mens/,/collections/mens
/shop/,/collections/all
/about-us/,/pages/about-us
/2025/03/styling-linen/,/blogs/news/styling-linen
```

Import under **Content > Menus > URL redirects > Import**. Include both the trailing-slash and no-slash versions of each product URL, as WooCommerce answers both. [Shopify's rules](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect): redirects work only from URLs that return a 404, paths such as /apps and /cart are reserved, bare /collections/all cannot itself be redirected, and a standard store can hold up to 100,000 redirects. For /shop/, point to a collection you have built rather than relying on the default.

## Plugins without a direct Shopify equivalent

| WooCommerce plugin function | On Shopify |
|---|---|
| Yoast or Rank Math SEO fields | Native title and meta fields; schema from theme |
| Subscriptions | Subscription app |
| Memberships and gated content | Customer tags plus an app |
| Product add-ons and custom fields | Metafields plus an app for customer inputs |
| Bundles and composites | Bundle app |
| Advanced shipping rules | Shipping profiles, then an app if needed |
| Wholesale pricing | B2B features on eligible plans, or an app |
| Page builders (Elementor and similar) | Theme sections; rebuild pages |

This is the right moment to challenge each one. Plugins installed for a campaign two years ago rarely need a replacement.

## Payment gateways by market

Gateway availability changes, so confirm in your Shopify admin under Settings > Payments before committing.

| Market | Commonly used on Shopify |
|---|---|
| India | Third-party gateways such as Razorpay, PayU or Cashfree, plus cash on delivery, UPI and wallets through them |
| United States | Shopify Payments, PayPal |
| United Kingdom | Shopify Payments, PayPal, buy now pay later providers such as Klarna |
| Australia | Shopify Payments, PayPal, buy now pay later providers such as Afterpay |

Note that Shopify Payments is not available in every country, and third-party gateways can add a transaction fee on top of the gateway's own charges. For Indian stores using COD, plan the confirmation flow too; see our notes on [WhatsApp automation](/whatsapp-automation).

## SEO and launch checklist

- Keep handles as close to the old slugs as possible.
- Copy SEO titles and meta descriptions from Yoast or Rank Math fields into Shopify's.
- Carry over image alt text and file names where sensible.
- Redirect everything from the crawl, including blog posts and pages.
- Disconnect the domain from the old host before pointing it at Shopify, to avoid SSL certificate errors.
- Resubmit the sitemap in Search Console, and re-verify Merchant Center and analytics.
- Test orders on every payment method, check tax, shipping and emails.
- For two weeks after launch, monitor 404s in Search Console and add redirects for anything missed.

Typical timelines: one to three weeks for a clean small store, three to six for a mid-size catalog with a few plugins, six to ten for large or plugin-heavy stores. These are working ranges, not promises.

## When to do it yourself and when to hand it off

Do it yourself when the catalog is small, variations are tidy, and your plugin list is short. A weekend of trial imports into a development store will tell you quickly whether the data is clean.

Hand it off when variable products are messy, attributes exceed Shopify's option limit, you have thousands of SKUs, or a launch date is fixed. That is what [our store migration service](/store-migration) is for. The AI engine does the volume, a person reviews every output, and you approve before anything goes live. We work through a staff account you can remove and never ask for store passwords. Turnaround is from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. Migration starts from ₹19,999 / $499 / £399 / A$749 per store, with a fixed quote after we inspect your files. If your project is a fit, ask for the [free 10-product sample](/free-sample) first.

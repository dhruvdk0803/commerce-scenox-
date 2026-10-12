---
title: "Facebook Catalog Setup: Data Feed, Fields and Common Errors"
heading: "Facebook catalog setup: feed or integration, required fields and errors"
description: "Set up a Facebook catalog in Meta Commerce Manager: partner integration vs data feed, required fields, common errors and keeping stock and prices in sync."
category: feeds
service: feeds
published: 2026-10-12
updated: 2026-10-12
summary: "A Facebook catalog is a product list in Meta Commerce Manager used for Instagram and Facebook shops and catalog ads. You add products through a partner integration such as Shopify's Facebook and Instagram app, a scheduled data feed, or manually. Nine fields are required, and most rejections come from price, availability or image problems."
faqs:
  - q: "What is a Facebook catalog?"
    a: "A container of your products inside Meta's Commerce Manager. It powers shops on Facebook and Instagram and catalog-based ads. Each item carries an ID, title, price, image, link and other fields. Meta uses the data to show products and match them to shoppers."
  - q: "Should I use a data feed or the Shopify integration?"
    a: "If you run Shopify, the Facebook and Instagram app is the simplest start, because it creates the catalog and keeps it synced. Use a data feed when you need control over fields, run a non-Shopify platform or want one feed shared across channels."
  - q: "Which fields are required in a Facebook catalog?"
    a: "Meta's developer documentation lists id, title, description, availability, condition, price, link, image_link and brand. Missing or badly formatted values can stop items uploading. Variants also need an item_group_id so Meta treats them as one product."
  - q: "Why are my products rejected from the catalog?"
    a: "The usual causes are a price without a currency code, a broken or too small image, a product link not on your domain, duplicate IDs and policy problems with the product or text. Commerce Manager's diagnostics list the cause per item."
  - q: "How often does the catalog update?"
    a: "With the Shopify app, changes sync from the store. With a feed, you choose a schedule, and daily or more often is common for stores whose stock or prices change. Check Meta's current options. An out-of-date feed causes price and availability mismatches."
---

A catalog is the foundation under Instagram and Facebook shops, product tags and dynamic product ads. If it is wrong, none of those work well. If it is right, it mostly looks after itself. This guide covers the set-up routes, the fields you must fill, the errors we see most, and how to keep the catalog current.

## What a Facebook catalog is

A catalog is a product list that lives in Meta's Commerce Manager. Each item has an ID, a title, a price, an image and a link, plus optional detail. Meta reads this data to show items in shops, tag products in posts and build catalog ads. Meta now calls the wider product Meta Commerce, and some screens and names change, so use the terms below as search keys rather than fixed labels.

## Three ways to add products

Meta's documentation describes several routes. These are the three that matter for most stores.

| Method | Best for | Trade-off |
|---|---|---|
| Partner integration (Shopify, WooCommerce and others) | Stores on a supported platform | Less control over the data sent |
| Data feed (CSV, TSV, XLSX, Google Sheets or XML, uploaded or fetched on a schedule) | Custom platforms, multi-channel feeds | You own the data quality and schedule |
| Manual entry | A handful of products | Slow, and does not scale |

### Shopify's Facebook and Instagram app

Shopify stores can install the Facebook and Instagram app built by Meta, connect their Page, Business account and Pixel, and let it create and sync the catalog. You can choose which products or collections sync. Remove any older Facebook sales channel first to avoid conflicts. Details are on Shopify's help centre at help.shopify.com.

One limit worth knowing: the app owns the sync. If you want to hand-edit fields through a feed, you will end up running a second catalog, or disconnecting the app. Decide before you start.

### Data feed

A feed is a file Meta reads from an upload or a URL on a schedule. Scheduled fetch from a hosted file is the usual set-up, because it keeps the catalog current without manual work. If you already have a Google Merchant Center feed, the fields are similar, and you can often adapt it. See our guides on [Google product category](/guides/google-product-category) and [GTIN, MPN and brand](/guides/gtin-mpn-brand).

## Required fields

Meta's developer documentation lists these as required. Missing or wrongly formatted fields can prevent products from uploading.

| Field | Rule |
|---|---|
| id | Unique string, up to 100 characters. Duplicates are ignored |
| title | Up to 200 characters; Meta recommends 65 or fewer |
| description | Plain text, no HTML, up to 9,999 characters |
| availability | in stock or out of stock |
| condition | new, refurbished or used |
| price | Number, a space, then ISO currency code, such as 9.99 USD |
| link | Product page URL on your own domain |
| image_link | JPEG or PNG, at least 500 x 500 pixels, up to 8 MB |
| brand | Up to 100 characters |

Optional fields that help: item_group_id, which ties variants together (same value across all sizes and colours of a product), google_product_category, GTIN and MPN, sale price, and additional images.

A single feed row for a variant looks like this:

```
id,title,description,availability,condition,price,link,image_link,brand,item_group_id,color,size
TS-100-BLK-M,Cotton Crew Tee Black M,Soft 180gsm cotton crew neck tee,in stock,new,24.00 USD,https://example.com/p/crew-tee?v=BLK-M,https://example.com/img/crew-tee-blk.jpg,Ridgeway,TS-100,Black,M
```

## Common errors and fixes

Commerce Manager's diagnostics tab lists issues per item. The ones we meet most often:

- **Price missing a currency code or using a symbol.** Write 24.00 USD, not $24.
- **Price mismatch between feed and landing page.** Meta compares; keep them in step.
- **Image too small, broken or blocked.** Use a JPEG or PNG at 500 x 500 or larger, served over a working URL that Meta can fetch.
- **Link not on your domain, or redirecting.** Use the final canonical URL.
- **Duplicate IDs.** Meta ignores all instances, so both products disappear.
- **Missing item_group_id on variants.** Variants show as separate unrelated products.
- **Policy rejections.** Meta restricts some product types and claims. Read its commerce policies before you list regulated goods.
- **Availability out of date.** Shoppers click through to sold-out items, and Meta may limit delivery.

## Keeping the catalog in sync

Stock and prices change, and the catalog does not know unless you tell it. With the Shopify app, changes carry over from the store. With a feed, set a scheduled fetch at least daily, and more often if stock turns fast. After each large catalog change, check diagnostics the same day, not next month.

Other habits that save time: keep one unique, stable ID per variant (the SKU is the obvious choice), match the ID to what your Pixel or Conversions API reports as the content ID so catalog ads can connect events to products, and keep titles clean and specific.

## Is the catalog worth it?

If you sell physical products and use Instagram or Facebook for discovery, yes. Creating a catalog in Commerce Manager is free to start, and it supports shops, product tags and dynamic ads from the same data.

## Instagram and Facebook shops: what the catalog feeds

Once products are in the catalog, you connect it to a shop and to ads. Availability of shops, checkout and product tags varies by country and by Meta's current programme, and Meta has changed these features more than once, so check Commerce Manager for what is open to your business and region. The catalog itself stays the same either way.

Product tags in posts and stories need the products to be approved and the account connected. Dynamic product ads use the catalog to show the right items to people who viewed them on your site, which depends on the Pixel or Conversions API sending events with IDs that match the catalog. If the IDs differ, ads cannot connect a viewed item with a catalog item, and you lose the main benefit.

## Collections and product sets

Product sets are filtered groups of catalog items, such as everything under a price, one category or one brand. Ads and shops use them to focus on a subset. Good titles, a consistent product type and complete attributes make sets easy to build. If your catalog has blank categories or inconsistent brand values, you will end up making sets by hand.

## A pre-launch checklist

1. Business verified and Page, Instagram account and Commerce Manager connected.
2. Unique, stable ID per variant, matching the ID your events send.
3. Required fields complete for every item.
4. Prices with currency codes, matching your product pages.
5. Images square or near-square, clean, at least 500 x 500 pixels, with working URLs.
6. Variants tied together with item_group_id.
7. Titles clean and under 65 characters where possible, with no promotional text.
8. Feed schedule set, or Shopify sync on, and diagnostics checked after the first fetch.
9. A sample of items opened on the live shop or ad preview, not just in the diagnostics.

Run the checklist after any platform change, theme change or bulk edit, because those are when products drop out.

## Feed versus integration: a rule of thumb

Pick the route by who needs control. If your merchandising team never touches Meta-specific fields and you sell on Shopify, take the integration and spend the time elsewhere. If your titles for Meta need to differ from your site titles, if you sell through several channels from one source of truth, or if your platform lacks a maintained connector, build a feed. The extra control is real, and so is the maintenance, because someone has to watch the schedule and the diagnostics.

A mixed approach is possible but needs care. Two sources writing to one catalog can overwrite each other, and two catalogs can split your ad data. Decide on one owner per catalog and write it down.

## When to do it yourself and when to hand it off

For a Shopify store with clean data, the integration takes under an hour. Install it, choose collections, review the diagnostics. Do that yourself.

Hand it off when you run a custom platform, have thousands of SKUs with messy variants, need a feed that serves Meta and Google together, or want errors cleared fast. Our [product feed management](/product-feed-management) service builds and maintains feeds for Meta, Google and marketplaces, with a person checking every output. Try the [free 10-product sample](/free-sample), and see [pricing](/pricing) for feed setup costs.

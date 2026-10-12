---
title: "301 Redirect Mapping for a Shopify Migration, With Templates"
heading: "301 redirect mapping for a platform migration, with templates"
description: "How to map old URLs to new ones when moving to Shopify: crawl, match, build the redirect CSV, import and test. Includes URL patterns for five platforms."
category: migration
service: migration
published: 2026-10-12
updated: 2026-10-12
summary: "Before you switch platforms, export every old URL, match each to its new Shopify equivalent, and import the pairs as 301 redirects through Content, Menus, URL redirects. Shopify allows 100,000 redirects (20 million on Plus), and redirects work immediately. Test a sample before and after launch."
faqs:
  - q: "How do I bulk import 301 redirects into Shopify?"
    a: "In Shopify admin go to Content, then Menus, then URL redirects, and choose Import. Add your CSV, upload, review the preview and click Import redirects. Shopify provides a sample CSV on that page; copy its header row exactly, as it lists the From and To columns."
  - q: "How many redirects can a Shopify store have?"
    a: "Shopify's documentation sets the maximum at 100,000 URL redirects, or 20,000,000 on the Plus plan. For most migrations that is generous. If you are near the limit, redirect category and product URLs that carry traffic or backlinks first, and let long-dead URLs return 404."
  - q: "Do I redirect every old URL or only the important ones?"
    a: "Redirect every URL that had traffic, backlinks or an indexed page, and every product that still exists. Old URLs for discontinued items can point to the nearest category. Redirecting everything to the homepage is treated by search engines as a soft 404 more often than a useful signal."
  - q: "Can Shopify redirect URLs that still work?"
    a: "No. Shopify's documentation says only broken URLs, those that would return a 404, can be redirected. Paths such as /products and /collections, and prefixes such as /cart and /orders, are restricted. If an old URL clashes with a live Shopify path, you need a different strategy."
  - q: "Should I redirect query-string URLs like ?p=123?"
    a: "Shopify warns that query strings might not work as expected in URL redirects. For WooCommerce ?p=123 style URLs, test a sample after import. Where they fail, rely on the canonical pretty URLs instead, since those are what search engines indexed."
---

A migration without a redirect map is a deletion. Every old product and category URL that has a ranking, a backlink or a bookmark either lands on the right new page or returns a 404. This guide walks through building the map, formatting the file, importing it into Shopify and proving it works, with templates and the old-URL patterns for the common source platforms.

## What a redirect map is and what it protects

A redirect map is a two-column list: the old URL path and the new URL path. A 301 tells browsers and search engines that the page has moved permanently, so visitors arrive on the new page and ranking signals attached to the old one transfer across. Shopify notes that 301 redirects are cached by browsers and search engines, which is useful for speed and a nuisance if you later need to undo one.

What it protects: organic traffic to old product and category pages, link equity from other sites, and customers following old emails, ads and bookmarks. For the wider migration plan, see the [guide to migrating without losing rankings](/guides/migrate-without-losing-seo).

## Step 1: collect every old URL

You want a list of URLs that matter, from several sources, before the old site goes away.

1. **Sitemap.** The old platform's XML sitemap lists products, categories and pages. Export it to a spreadsheet.
2. **Crawl.** Crawl the live site with a crawler of your choice to catch URLs the sitemap omits, such as paginated or filtered pages.
3. **Search Console.** Export pages with impressions or clicks over the last 12 months. These are the URLs that must not break.
4. **Backlinks.** Pull linked pages from your backlink tool or Search Console's links report. Linked URLs may be old and missing from the sitemap.
5. **Analytics.** Landing pages by sessions, to catch URLs that get traffic from email and ads.

Merge the lists, remove duplicates and sort by traffic or links. The top 200 URLs get manual attention; the long tail gets rules.

## Step 2: understand how Shopify's URLs differ

Shopify fixes its URL structure. Products live at `/products/<handle>`, collections at `/collections/<handle>`, pages at `/pages/<handle>` and blog posts under `/blogs/<blog>/<handle>`. You cannot recreate an old `/shoes/running/air-max.html` path as a live URL, so each old path needs a redirect to the new Shopify path.

Shopify's documentation also lists paths you cannot redirect, including prefixes such as `/apps`, `/cart`, `/orders` and `/services`, and fixed paths such as `/products` and `/collections`. Tag-filter collection URLs cannot be redirected either. Only URLs that would otherwise 404 can be redirected, so an old path that happens to match a live Shopify page will not redirect.

## Old URL patterns by platform

Use this as a starting point and confirm against your own sitemap, because every store can customise its patterns.

| Source platform | Typical product URL | Typical category URL | Other patterns to check |
|---|---|---|---|
| Magento 2 / Adobe Commerce | `/product-name.html` (URL suffix is configurable) | `/women/dresses.html` | `/catalog/product/view/id/123`, layered nav params, store-view prefixes |
| WooCommerce | `/product/product-name/` | `/product-category/clothing/dresses/` | `/shop/`, `?p=123`, `?product_cat=`, `/tag/` |
| BigCommerce | `/product-name/` | `/category-name/` | `/product.php?productid=123`, brand pages, `/brands/` |
| Wix | `/product-page/product-name` | `/category/category-name` | Language prefixes, `/blog/` posts |
| Squarespace | `/shop/p/product-name` or `/store/p/product-name` | `/shop/c/category` or a store page slug | Blog posts under the blog page slug |

The pattern a platform uses is usually obvious from ten URLs in the sitemap. Read ten, then write the rule.

## Step 3: build the redirect CSV

Shopify supplies a sample CSV on the URL redirects import screen; download it and match its header row exactly. The fields are an old path and a new path, and the usual headers are `Redirect from` and `Redirect to`, but copy what your sample shows. Use relative paths for redirects within your own domain, starting with `/`.

A filled template, from a Magento store moving to Shopify:

```csv
Redirect from,Redirect to
/women/dresses.html,/collections/dresses
/women/dresses/linen-wrap-dress.html,/products/linen-wrap-dress
/men/shirts.html,/collections/shirts
/men/shirts/oxford-shirt-blue.html,/products/oxford-shirt-blue
/about-us.html,/pages/about-us
/blog/how-to-care-for-linen,/blogs/journal/how-to-care-for-linen
/discontinued-item.html,/collections/dresses
```

Rules that keep the file clean:

- **One hop only.** Point old URLs straight at the final destination, never at another redirect.
- **No loops.** A path should never redirect to itself or back to a URL that redirects onward.
- **Relative paths** for the same domain; a full URL only when going to a different domain.
- **Lowercase and consistent trailing slashes.** Decide your convention and match what the old site served.
- **Match intent.** Product to the same product, category to the closest collection. A discontinued product goes to its category, not the homepage.

If a Shopify market uses subfolders, note that a redirect applies to all market subfolders; a different destination per market needs a separate redirect for each subfolder.

## Step 4: match old URLs to new ones at scale

Handles usually change during migration, so you need a join key. The best one is the SKU or the product ID, present in both the old export and the new Shopify export.

1. Export old products with URL, SKU and title.
2. Export the new Shopify products with handle and SKU (after the product import is complete).
3. Join on SKU. Old URL becomes `Redirect from`; `/products/` plus the new handle becomes `Redirect to`.
4. For rows with no SKU match, fall back to a title match and review each by eye.
5. For categories, map manually. There are rarely more than a few dozen, and they carry the most value.

Parameterised variants, such as WooCommerce `?p=123` URLs, are a special case. Shopify warns that query strings might not work as expected, so test a few and rely on pretty URLs as the primary indexed addresses.

## Step 5: import and test

Go to Content, then Menus, then URL redirects, and choose Import. Add the file, upload, review the preview and click Import redirects. Redirects start working immediately, which means you can test before the DNS cut-over by visiting the old path on your `.myshopify.com` address, as long as the path is not live on Shopify.

The limit is 100,000 redirects, or 20,000,000 on Plus. A test routine:

1. Check 30 URLs by hand across products, categories, blog posts and pages.
2. Run the full list of old URLs through a bulk status checker and confirm each returns a 301 and then a 200 on the destination.
3. Look for chains (301 to 301) and for 404s in the results.
4. After launch, watch Search Console's Pages report and Shopify's own 404 reports for unredirected URLs, and add redirects for those that matter.

## Edge cases that need a decision

A few situations do not fit a simple one-to-one rule, and it is better to decide them in advance than during launch week.

- **Merged products.** Two old products become one Shopify product with variants. Point both old URLs at the new product.
- **Split products.** One old product becomes several. Redirect to the nearest match, or to the collection that contains them.
- **Discontinued products with backlinks.** Redirect to the closest category, and keep the redirect even if the page had little traffic, because the links still carry value.
- **Old URLs with no equivalent.** Let them return a 404 or, for truly retired content, a 410 if your setup supports it. Do not send everything to the homepage.
- **Tag and filter pages.** Shopify cannot redirect collection tag-filter URLs, so decide whether a dedicated collection should replace the most valuable ones.
- **HTTP to HTTPS and www to non-www.** Shopify handles the primary domain settings; confirm which version is primary before you write the file, so you are not redirecting into a redirect.

## When to do it yourself and when to hand it off

Under a few hundred URLs, the manual route works: one spreadsheet, one SKU join, one import. Do it carefully and test.

Big catalogs, several old URL patterns, multilingual stores and categories that were restructured are where mapping goes wrong. Our [store migration service](/store-migration) builds the redirect map from your sitemap, analytics and Search Console data, imports it through a staff account you can remove (we never ask for store passwords), and a person checks every output before you approve. If you want to see how we would structure it, start with the [free sample](/free-sample), or read the [Magento to Shopify checklist](/guides/magento-to-shopify-migration) and [WooCommerce to Shopify checklist](/guides/woocommerce-to-shopify-migration).

# Writing landing pages for Scenox Commerce

Landing pages target buyers ready to hire: "shopify product upload service", "product upload services UK", "fashion catalog upload", "magento to shopify migration service". They live in `src/content/landing/<slug>.md` and render at `/<slug>`.

Read `docs/guide-writing.md` first: the **Voice**, **banned phrases**, **no invented stats/stories**, **48-hour qualifier** and **facts about us / prices** sections apply here too.

## Frontmatter

```yaml
---
kind: platform          # platform | marketplace | country | migration | industry | audience | service | choose
title: "Shopify Product Upload Service: Bulk Listing, Fixed Price"   # max 60 chars
description: "140-160 chars, includes the primary keyword and a reason to click (fixed price, free sample, human-checked)."
eyebrow: "SHOPIFY PRODUCT UPLOAD"      # short, uppercase
heading: "Shopify product upload, done for you."   # H1, under ~8 words, keyword in it
lead: "One or two sentences: who it is for, what they get, the outcome. Max ~35 words."
service: upload         # upload | cleanup | migration | imagery | feeds | email | whatsapp | support | voice
market: us              # ONLY on country pages: in | us | uk | au
art: mosaic             # mosaic | row | cleanup | migration | imagery | feeds | email | whatsapp | support | voice | storefront (fashion)
cta: "Get a Shopify Quote"   # button label, 2-4 words
facts:                  # 1-2 extra facts shown under the hero (price and delivery are added automatically)
  - k: "Platforms"
    v: "Shopify and Shopify Plus"
related: ["shopify-bulk-product-upload", "shopify-csv-import-errors"]   # guide slugs or landing slugs, 2-3
updated: 2026-10-12
faqs:                   # 4-6, buyer questions (price, turnaround, access, what you need from me, edge cases)
  - q: "..."
    a: "40-60 words."
---
```

## Body (Markdown, 700-1,200 words)

Structure that converts:
1. `## What you get` — concrete deliverables as a short list (fields filled, variants built, images matched, SEO fields, QA report). Specific to this page's platform/industry/country.
2. `## How it works` — 4-5 numbered steps: send files → fixed quote → we build (AI engine, person reviews) → you approve on a staging/draft state → publish. Mention the collaborator/staff account, never passwords.
3. A section that proves we understand THIS niche: platform quirks (Shopify 3 options per product, metafields, handles; WooCommerce attributes and variations; Magento configurables and attribute sets; BigCommerce option sets), or industry specifics (fashion size runs and swatches, jewellery metal/stone/carat attributes, electronics spec tables and compatibility, beauty ingredients and regulatory text, furniture dimensions and materials, auto parts fitment), or country specifics (currency, GST/VAT/sales tax fields, local marketplaces such as Amazon.in/Flipkart/Meesho, eBay UK, Catch/Kogan AU, local spelling, timezone overlap). This is what makes the page unique. Use a table where it helps.
4. `## Pricing` — the relevant starting prices (country pages: that market only; others: a 4-market table). Say the fixed quote comes after we inspect files. Link `/pricing`.
5. `## Is this a fit?` — honest: who it suits and who should DIY (small clean catalogs) or look elsewhere. Builds trust.
6. Close with one line linking `/free-sample` and the quote (`/get-started`).

Rules:
- Every page must be substantively different from its siblings. Do not reuse paragraphs across pages; write each niche section from scratch with real details.
- No competitor names in a negative light. No fake client logos, counts, reviews or results. "250+ companies and enterprises worldwide" is our approved client claim; use it at most once.
- Internal links: service pages (`/bulk-product-upload`, `/catalog-cleanup`, `/store-migration`, `/ai-product-photos`, `/product-feed-management`, `/ecommerce-email-marketing`, `/whatsapp-automation`, `/ai-customer-support`, `/wholesale-catalog`, `/pricing`, `/free-sample`, `/get-started`), guides in `/guides/<slug>` (see the list in guide-writing.md), and landing slugs from the plan below.

## Planned landing pages (link between them freely)

Platform: shopify-product-upload-service, woocommerce-product-upload-service, magento-product-upload-service, bigcommerce-product-upload-service, wix-product-upload-service
Marketplace: amazon-product-listing-service, flipkart-meesho-listing-service
Country: product-upload-services-india, product-upload-services-usa, product-upload-services-uk, product-upload-services-australia
Migration: magento-to-shopify-migration-service, woocommerce-to-shopify-migration-service, bigcommerce-to-shopify-migration-service, wix-to-shopify-migration-service, squarespace-to-shopify-migration-service
Service intent: ecommerce-catalog-management-services, product-data-entry-services, ecommerce-product-listing-services, product-description-writing-service, google-merchant-center-fix-service, shopify-store-setup-products
Industry: fashion-catalog-upload-service, jewellery-catalog-upload-service, electronics-catalog-upload-service, beauty-catalog-upload-service, furniture-catalog-upload-service, auto-parts-catalog-upload-service
Audience: white-label-catalog-services-for-agencies, catalog-services-for-d2c-brands, catalog-services-for-marketplace-sellers
Choose: how-to-choose-ecommerce-listing-agency

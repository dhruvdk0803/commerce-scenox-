# Writing guides for Scenox Commerce

Guides live in `src/content/guides/<slug>.md`. Each file is one page at `/guides/<slug>`.
The slug is the filename: lowercase, hyphens, keyword-first (`shopify-csv-import-errors`).

## Frontmatter (YAML, all required unless marked optional)

```yaml
---
title: "Shopify CSV Import Errors: What Each One Means and How to Fix It"   # <title>, max ~60 chars before " | Scenox Commerce"
heading: "Shopify CSV import errors, and how to fix every one"            # optional H1 if it should differ
description: "The Shopify product CSV errors merchants hit most, what causes each and the exact fix, with before and after rows."   # 140-160 chars
category: catalog        # costs | catalog | migration | content | feeds | imagery | retention
service: upload          # CTA target: upload | cleanup | migration | imagery | feeds | email | whatsapp | support | voice
published: 2026-10-12
updated: 2026-10-12
summary: "40-60 word direct answer to the main query. Plain sentences. This is what answer engines quote."
faqs:
  - q: "Question phrased the way people search?"
    a: "40-60 word direct answer."
  # 4-6 FAQs, not repeating H2s word for word
---
```

## Body

- Markdown only. Start with a short intro paragraph (no H1; the page renders it).
- `##` for main sections (they build the table of contents), `###` inside them. 5-9 `##` sections.
- Lead each section with the answer, then the detail. Short paragraphs (2-4 sentences).
- Use numbered steps for procedures, tables for comparisons/specs, fenced code blocks for CSV rows and redirects.
- Worked examples beat advice: show a broken CSV row and the fixed row, a filled template, a real checklist.
- 1,400-2,400 words. Long enough to be the best answer, no padding.
- One section near the end named like "When to do it yourself and when to hand it off": honest. DIY is fine for small, clean catalogs; we make sense for volume, messy data, deadlines. Link the relevant service page and `/free-sample` once each, in plain markdown links. Do not write a sales pitch.
- Internal links: use site paths (`/bulk-product-upload`, `/store-migration`, `/catalog-cleanup`, `/ai-product-photos`, `/product-feed-management`, `/ecommerce-email-marketing`, `/whatsapp-automation`, `/ai-customer-support`, `/pricing`, `/free-sample`, `/get-started`) and other guides `/guides/<slug>` only if that guide is in the planned list.
- External links: only to official docs (help.shopify.com, woocommerce.com docs, experienceleague.adobe.com, support.bigcommerce.com, support.google.com/merchants, developers.facebook.com, sellercentral) when they help the reader.

## Voice (this is what makes it read as written by a person)

- Write like a senior catalog operator explaining to a store owner: direct, specific, a little dry. British-neutral spelling is fine; be consistent within a page.
- Concrete nouns and numbers from the real platforms (column names, limits, error messages). If unsure of a fact, check the official docs with web search; if still unsure, leave it out.
- Vary sentence length. No throat-clearing intros ("In today's fast-paced world"), no "In conclusion", no "delve", "unlock", "elevate", "seamless", "robust", "game-changer", "landscape", "navigate the complexities", "it's important to note". No emoji. No exclamation marks. Avoid em dashes; use commas, colons or full stops.
- Don't invent statistics, studies, client stories or testimonials. Do not claim results we cannot show. Opinions are fine when framed as experience ("most supplier files we receive...").

## Facts about us you may use

- Scenox Commerce: AI engine does the volume, a person reviews every output; client approves before anything goes live.
- Platforms: Shopify, WooCommerce, Magento (Adobe Commerce), BigCommerce, Wix, custom.
- Turnaround: "from 48 hours" ALWAYS followed by: "for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive."
- We never ask for store passwords: we work through a staff/collaborator account the client can remove.
- Free 10-product sample if the project is a fit. Fixed quote after we inspect files, before work starts.
- Data is never used to train third-party models.
- Starting prices (INR / USD / GBP / AUD):
  - Catalog listing: Starter up to 250 products ₹6,999 / $149 / £119 / A$229; Growth up to 500 ₹9,999 / $249 / £199 / A$379; Catalog Launch up to 1,000 ₹14,999 / $399 / £319 / A$599; 1,000+ custom quote.
  - Catalog cleanup from ₹4,999 / $129 / £99 / A$199 (up to 250 products)
  - Platform migration from ₹19,999 / $499 / £399 / A$749 per store
  - AI product imagery from ₹2,999 / $79 / £65 / A$119 per 50 products
  - Feeds & marketplaces from ₹7,999 / $199 / £159 / A$299 per channel setup
  - Email & abandoned cart from ₹12,999 / $349 / £279 / A$529 (8 flows)
  - WhatsApp automation from ₹9,999 / $279 / £229 / A$429 setup
  - AI customer support from ₹9,999 / $279 / £229 / A$429 setup
  - Monthly Catalog Ops from ₹7,999 / $199 / £159 / A$299 per month

## Planned guides (wave 1) — you may link between these

- /guides/product-upload-cost — How much does ecommerce product upload cost (costs, upload)
- /guides/outsource-product-upload — Outsourcing vs in-house vs freelancers vs apps (costs, upload)
- /guides/catalog-management-service-vs-pim — Catalog management service vs PIM software (costs, cleanup)
- /guides/shopify-bulk-product-upload — Shopify bulk upload with CSV, complete guide (catalog, upload)
- /guides/shopify-csv-import-errors — Shopify CSV import errors and fixes (catalog, upload)
- /guides/woocommerce-product-csv-import — WooCommerce product CSV import incl. variable products (catalog, upload)
- /guides/magento-2-product-import — Magento 2 / Adobe Commerce product import incl. configurables (catalog, upload)
- /guides/bigcommerce-bulk-product-import — BigCommerce bulk product import (catalog, upload)
- /guides/fashion-catalog-upload — Fashion catalogs: variants, size charts, colour swatches (catalog, upload)
- /guides/magento-to-shopify-migration — Magento to Shopify migration checklist (migration, migration)
- /guides/woocommerce-to-shopify-migration — WooCommerce to Shopify migration checklist (migration, migration)
- /guides/google-merchant-center-disapprovals — Merchant Center disapproved products: causes and fixes (feeds, feeds)
- /guides/product-description-templates — Product description templates by category (content, cleanup)
- /guides/product-image-requirements — Image requirements for Shopify, Google, Amazon, Meta, Flipkart (imagery, imagery)
- /guides/whatsapp-cod-confirmation — Confirm COD orders on WhatsApp and cut RTO (retention, whatsapp)
- /guides/abandoned-cart-email-sequence — Abandoned cart email sequence with templates (retention, email)

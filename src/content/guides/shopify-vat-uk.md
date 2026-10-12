---
title: "Shopify for the UK: VAT, Pricing, Shipping and Duties"
heading: "Setting up Shopify for the UK: VAT, prices including VAT, shipping and duties"
description: "UK Shopify setup: when VAT registration applies, VAT-inclusive pricing, product VAT rates in your catalogue, and delivery and import duty basics."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "UK shoppers expect prices that include VAT. Check whether you must register using the HMRC threshold, set Shopify to show tax-inclusive prices, make sure each product carries the right VAT treatment, and plan delivery and import duty for orders crossing the border. Confirm the specifics with your accountant."
faqs:
  - q: "Do I need to register for VAT to sell on Shopify in the UK?"
    a: "You must register if your taxable turnover goes over the VAT registration threshold, which HMRC sets, currently £90,000 over a rolling 12 months, or you expect to within 30 days. You can register voluntarily earlier. Overseas sellers to the UK have different rules, so check on GOV.UK."
  - q: "Should UK prices on my store include VAT?"
    a: "For consumers, yes. UK shoppers expect to see the VAT-inclusive price, and consumer-facing prices are generally shown inclusive. Shopify has a setting to include tax in prices. If you sell mainly to businesses, you might show prices without VAT, but check with your accountant."
  - q: "Are all products charged VAT at 20 per cent?"
    a: "No. The standard rate is 20 per cent, but some goods are reduced-rated or zero-rated, such as certain children's clothing. Which rate applies depends on the product, so check HMRC's guidance for each category and store the result against the product."
  - q: "How does VAT work when I sell to customers outside the UK?"
    a: "Rules vary by destination. Exports from Great Britain are often zero-rated for VAT with proof of export, but the destination country may charge import VAT and duty on arrival. Shopify can show duties and import taxes at checkout in some setups. Confirm details with an adviser."
  - q: "What happens with orders from overseas into the UK?"
    a: "VAT and customs duty can apply on goods imported into the UK, and for low-value consignments VAT is typically collected at the point of sale by the seller. Rules and thresholds change, so read the current HMRC guidance or ask an adviser before selling into the UK from abroad."
---

Setting up a Shopify store for UK customers is straightforward for the storefront and fiddly for the tax. Prices should include VAT, products can have different VAT treatments, and anything crossing a border brings duties and import VAT into play.

This guide covers the catalogue and store-setup decisions. It is not tax advice. VAT rules and thresholds are set by HMRC and change, so confirm the details on GOV.UK and with your accountant.

## VAT in one paragraph

VAT (value added tax) is charged on most goods and services in the UK. The standard rate is 20 per cent. Some goods carry a reduced rate or are zero-rated, which still counts as a taxable supply but at 0 per cent. If you are VAT registered, you charge VAT on taxable sales and reclaim the VAT you pay on business purchases, and you file returns. Registration is compulsory above a turnover threshold and optional below it.

## Step 1: Do you need to register?

You must register for VAT if your taxable turnover goes over the registration threshold in a rolling 12-month period, or if you expect it to go over in the next 30 days alone. GOV.UK states the threshold, currently £90,000, and the deadlines for registering. Below that you may register voluntarily, which some businesses do to reclaim VAT on stock and set-up costs.

Things to check with your accountant:

- Whether you need to register now or soon, based on your sales so far and forecast.
- Whether voluntary registration makes sense.
- Whether you will sell mostly to consumers or businesses.
- If you are based outside the UK and sell to UK customers, the separate rules for overseas sellers.

Do this before you set prices, because registration changes how you price. A registered business pays out roughly one-sixth of every VAT-inclusive 20 per cent sale to HMRC.

## Step 2: Prices that include VAT

UK consumers expect to see the price they will pay. In Shopify, the tax settings (Settings, then Taxes and duties) include an option to include tax in prices. For consumer sales, turning it on is the common choice.

The decision to make early is whether your price column is VAT-inclusive or exclusive, and then stick to it across the whole catalogue.

A worked example with the standard 20 per cent rate:

```
Shelf price (inclusive):   £48.00
Net (excluding VAT):       48.00 / 1.20 = £40.00
VAT:                       £8.00
```

If you instead store £40.00 as an exclusive price and Shopify adds VAT, the customer sees £48.00. Both routes can work, but a CSV where some rows are inclusive and some exclusive produces prices that are quietly wrong by 20 per cent.

Pricing psychology matters here as well. Many UK stores want endpoints like £48.00 or £49.99, so it is usually easier to set the inclusive price you want and let the net figure fall where it falls.

## Step 3: VAT treatment per product

Not everything is 20 per cent. Examples in broad terms: most goods are standard-rated, some items such as certain children's clothing and some books are zero-rated, and a few categories are reduced-rated. The details are in HMRC's VAT rates guidance, and edge cases exist, such as how children's clothing is defined.

Practical steps for the catalogue:

1. List your product categories.
2. For each, record the VAT treatment from HMRC guidance, and confirm any doubtful ones with your accountant.
3. In Shopify, use tax overrides or product-level tax settings where a product differs from the default.
4. Add a column in your master sheet, `VAT treatment`, so the decision lives next to the product.

A short example of how it can look in a working sheet:

| Category | VAT treatment | Source to check |
| --- | --- | --- |
| Adult clothing | Standard 20% | HMRC VAT rates |
| Children's clothing | Check carefully | HMRC guidance on clothing and footwear |
| Printed books | Check | HMRC VAT rates |
| Candles | Standard 20% | HMRC VAT rates |

Do not assume. The "check" rows should be resolved by a person who has looked at the actual product.

## Step 4: Delivery, and what it does to your catalogue data

Delivery fields drive checkout accuracy. For UK shipping, fill in:

- **Weight** for every variant, in grams or kilograms consistently. Carriers charge by weight and size bands.
- **Dimensions** if your carrier bills by volume.
- **Country of origin and HS code** if you ship internationally. Shopify has fields for these, and they are used for customs paperwork.

Set shipping rates by weight or price in the Shopify shipping settings. Make delivery times visible on product pages, because UK shoppers compare them. If a CSV import leaves weight at zero, rates will be wrong, so check that column after import. See our [Shopify bulk upload guide](/guides/shopify-bulk-product-upload) and [CSV import errors](/guides/shopify-csv-import-errors) for the format.

## Step 5: Duties and import VAT basics

Since the UK left the EU, goods crossing the border involve customs.

- **Selling from the UK to other countries:** the destination country may charge import VAT or GST and customs duty. Shopify can calculate duties and import taxes at checkout in some setups, which gives the customer a final price and avoids a surprise bill at the door. Check the current availability in Shopify's help centre. Exports from Great Britain are often zero-rated for VAT with proof of export, but confirm the conditions.
- **Selling into the UK from abroad:** import VAT and, for some goods, customs duty can apply. For low-value consignments, VAT is generally collected at the point of sale by the seller instead of at the border. The thresholds and rules have changed in the past, so read the current HMRC guidance.
- **Northern Ireland** has its own arrangements for goods, so check GOV.UK if you ship there.

To make this workable at the product level, you need an accurate HS code, country of origin and a customs description for each product. Those are catalogue fields and they are cheapest to fill in during the upload.

## Step 6: Test before you launch

Place test orders to check what the customer sees.

1. An order to a UK address: is the total what you expect, and is VAT shown as included?
2. An order for a zero-rated product, if you have one.
3. An order to an overseas address, if you ship abroad: does it show duties, or tell the customer what to expect?
4. A returned order, so you know how the refund shows tax.

Keep the screenshots. When your accountant asks how the store handles VAT, you can show them.

## Common mistakes

- **Mixed inclusive and exclusive prices** in one upload.
- **Applying 20 per cent to everything** without checking products that differ.
- **Registering late.** The threshold is a rolling test, so check regularly as sales grow.
- **Missing weights and HS codes**, causing wrong shipping and customs forms.
- **Not testing checkout** in the way a UK customer sees it.

## When to do it yourself and when to hand it off

If you have a small range, one VAT treatment and a clear accountant, the setup is a morning's work: tax settings, shipping rates, a few test orders. Do it yourself.

When there are hundreds or thousands of products, with mixed VAT treatments, weights to fill in and HS codes to add, the catalogue work is the heavy part. Our [bulk product upload service](/bulk-product-upload) handles the data: an AI engine does the volume, a person reviews every output, and you approve before anything goes live. Listing starts at £119 for up to 250 products with a fixed quote after we inspect your files. We work through a collaborator account you can remove, and never ask for passwords. Try ten products with the [free sample](/free-sample). We prepare the catalogue; VAT decisions stay with you and your accountant.

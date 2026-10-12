---
title: "Shopify for India: GST, HSN Codes, Invoices and COD"
heading: "Setting up a Shopify store in India: GST, HSN codes, invoices, COD and payments"
description: "What an Indian Shopify store owner needs to set up: GST registration basics, HSN codes in your catalog, tax-inclusive pricing, invoices, COD and payments."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "For an Indian Shopify store, set prices as GST-inclusive, store an HSN code and tax class for every product, make sure invoices show the details GST requires, and add COD and local payment methods. Rates and thresholds depend on your product and turnover, so confirm them with your chartered accountant."
faqs:
  - q: "Do I need GST registration to sell on Shopify in India?"
    a: "It depends on your turnover, what you sell, where you sell and whether you sell through other platforms. Some situations, such as certain interstate or e-commerce operator supplies, can require registration regardless of turnover. Check the current rules on the GST portal with your accountant."
  - q: "What is an HSN code and why does my catalog need it?"
    a: "HSN is the Harmonised System of Nomenclature, a standard numeric code that classifies goods. It decides the GST rate and appears on invoices. Storing it per product, ideally in the product's customs or a metafield, saves you looking it up every time you invoice or file returns."
  - q: "Should Shopify prices include GST for Indian customers?"
    a: "Indian consumers expect to see the final price. Most Indian stores show tax-inclusive prices, and Shopify lets you set prices to include tax in the taxes settings. Your accountant should confirm how this fits your registration and invoicing."
  - q: "Can I offer Cash on Delivery on Shopify?"
    a: "Yes. Shopify supports manual payment methods, and COD can be set up as one, usually with a courier or an app that handles collection and remittance. Many Indian stores add rules, such as order value limits and phone confirmation, because COD has high return risk."
  - q: "Where do I put the HSN code in a Shopify CSV?"
    a: "The standard Shopify product CSV has a column for Harmonized System Code (the HS code field), which is the same family of codes. If your invoicing app needs HSN in a different place, store it in a metafield. Confirm which field your invoicing tool reads."
---

Running a Shopify store in India is mostly the same as anywhere else until tax and payments enter the picture. Then four things need to be right: your GST position, the HSN code on each product, prices and invoices that show tax correctly, and a payment mix that includes what Indian customers actually use.

This guide covers the catalog and store-setup side. It is not tax advice. Rates, thresholds and rules are set by the government and change, so confirm every figure with a chartered accountant and the official GST portal (gst.gov.in).

## What GST means for an online store

GST (Goods and Services Tax) is charged on most goods and services in India. For a Shopify merchant, the working points are these:

- You charge GST on sales if you are registered, and the rate depends on the product, identified by its HSN code.
- For a sale within your state, tax is split into CGST and SGST. For a sale to another state, it is charged as IGST. The split depends on your registered state and the customer's delivery state, called the place of supply.
- Registration is required once turnover crosses a threshold, and in certain situations regardless of turnover. Thresholds differ by type of supplier and by state, and selling through e-commerce operators can change the picture.

Because the rules turn on facts about your business, ask your accountant two questions before you launch: do I need to register now, and what rate applies to each of my product types.

## Step 1: Know your GST position

Before touching Shopify, get these from your accountant:

1. Whether you are registered, and your GSTIN.
2. The GST rate for each product category you sell.
3. The HSN code for each category, and how many digits you must show on invoices.
4. How you will handle interstate sales and returns.
5. Whether you also sell on marketplaces, because that affects registration and reporting.

The number of HSN digits required on invoices depends on your turnover and whether the sale is to a business or a consumer. The GST Council has set this out in notifications, so ask your accountant what applies to you rather than assuming.

## Step 2: HSN codes in your catalog

An HSN code classifies a product, and it drives the rate. Store it against every product from the start, not at invoicing time.

Where it goes:

- **Shopify product CSV:** there is a `Variant HS Code` style field in the Shopify product data (Harmonized System code, used mainly for customs). The HS system and the Indian HSN share their first six digits. Check Shopify's help centre for exactly which columns your export uses.
- **Metafield:** if your invoicing app expects a separate HSN field, create a product metafield and fill it in bulk. See [importing metafields in bulk](/guides/shopify-metafields-import).
- **Spreadsheet master:** keep a lookup of category to HSN to GST rate. Apply it by category rather than typing per product.

A simple lookup (illustrative only, rates and codes must come from your accountant):

| Product type | HSN code | GST rate |
| --- | --- | --- |
| Cotton T-shirts | to confirm | to confirm |
| Stainless steel bottles | to confirm | to confirm |
| Packaged tea | to confirm | to confirm |

We leave the cells blank on purpose. Rates can depend on details like price slab, composition or packaging, so this has to come from a person who can see your products.

## Step 3: Prices and tax settings in Shopify

Indian shoppers expect the displayed price to be the price paid. In Shopify, the tax settings (Settings, then Taxes and duties) include an option to include tax in prices. For an Indian store that sells to consumers, setting prices as tax-inclusive is the usual choice, but have your accountant confirm.

Practical points:

- Decide once whether product prices in your CSV are inclusive or exclusive, and be consistent. Mixing them in one file produces wrong totals that you will not notice until reconciliation.
- Round prices sensibly. A tax-inclusive price of ₹1,499 looks right; a back-calculated pre-tax figure of ₹1,427.62 does not matter to the customer but will matter in the accounts.
- Check that shipping is taxed as your accountant advises.
- Test with real addresses: one in your state, one in another state. Look at how the order shows tax.

A worked example of the arithmetic, using a hypothetical 12 per cent rate to show the mechanics (not a rate to use):

```
Displayed price (inclusive):  ₹1,120
Rate (hypothetical):          12%
Pre-tax value:                1,120 / 1.12 = ₹1,000
Tax amount:                   ₹120
  Same state:  CGST ₹60 + SGST ₹60
  Other state: IGST ₹120
```

The customer pays ₹1,120 either way. The split matters for your returns and accounts.

## Step 4: Invoices

A GST invoice carries specific details. In general terms, expect to show: your name, address and GSTIN, an invoice number and date, the customer's name and delivery address, the product description, HSN code, quantity, value, tax rate and tax amount split into CGST and SGST or IGST, and the place of supply.

Shopify's default order documents may not cover all of this for Indian requirements. Merchants commonly use an invoicing app or a custom template to produce compliant invoices and credit notes. Whichever you choose, check it against your accountant's requirements and confirm which fields it reads: HSN, GSTIN, tax-inclusive handling. Missing HSN data in the catalog is the most common reason invoices come out incomplete.

## Step 5: COD and payments

Cash on delivery remains widely used in India. Shopify supports manual payment methods, which is how COD is normally added, and couriers or apps handle cash collection and remittance.

COD brings a cost: higher return-to-origin (RTO) rates than prepaid orders. Common controls:

- Confirm COD orders by phone or WhatsApp before dispatch. See [confirming COD orders on WhatsApp](/guides/whatsapp-cod-confirmation).
- Set an order value cap for COD.
- Offer a small prepaid discount or a COD fee, keeping it transparent.
- Block pin codes your courier does not serve.

For online payments, the gateways available to Indian merchants on Shopify differ from other countries, so check Shopify's current list in its help centre when you set up. Offer UPI, cards and net banking at the least, as that is what customers expect.

## Step 6: Shipping and the catalog fields behind it

Shipping inside India is usually weight and pin-code based. Fill product weights accurately in the CSV, because couriers bill on them and mismatches create disputes. Include accurate dimensions if your courier uses volumetric weight. For deeper catalog preparation, see our [Shopify bulk upload guide](/guides/shopify-bulk-product-upload), and [Shopify CSV import errors](/guides/shopify-csv-import-errors) if an upload fails.

## Common mistakes

- **No HSN codes at launch.** Adding them to 800 products afterwards is slow.
- **Mixed tax-inclusive and exclusive prices** in the same import.
- **Wrong rate for a product variant.** Different sizes or price points can sometimes fall in different slabs, so check with your accountant instead of applying one rate to a whole range.
- **Weights left at zero**, so shipping rates come out wrong.
- **COD enabled with no controls**, then surprise at RTO costs.
- **Test orders skipped.** Place orders for same-state and other-state addresses before launch.

## When to do it yourself and when to hand it off

If you have a small range, one or two tax rates and a clear accountant, set up the tax settings, HSN lookup and COD yourself. The configuration is not hard, the thinking is.

The catalog side is where volume bites. A few thousand products from suppliers who give names but no codes need HSN mapping, weights, clean titles and consistent prices, all in the right columns. Our [bulk product upload service](/bulk-product-upload) takes that off you: an AI engine does the volume, a person reviews every output and you approve before anything goes live. Listing starts at ₹6,999 for up to 250 products, with a fixed quote after we inspect your files. You do not need to share store passwords; we work through a collaborator account you can remove. Try it on ten products with the [free sample](/free-sample), and see [pricing](/pricing) for the full list. We prepare the data and catalog; tax decisions stay with your accountant.

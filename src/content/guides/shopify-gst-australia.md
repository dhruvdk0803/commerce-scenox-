---
title: "Shopify for Australia: GST, Tax Invoices, Shipping, Payments"
heading: "Setting up Shopify for Australia: GST, buy now pay later, shipping and tax invoices"
description: "A practical Shopify guide for Australian stores: GST registration basics, GST-inclusive pricing, tax invoices, shipping, and payment options like Afterpay."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "Australian shoppers expect GST-inclusive prices. Check whether you need to register for GST, set Shopify to show tax-inclusive prices, make sure your catalogue data supports shipping and tax invoices, and offer local payment options such as buy now pay later. Confirm the details with your accountant or the ATO."
faqs:
  - q: "Do I have to register for GST to run a Shopify store in Australia?"
    a: "You must register for GST if your GST turnover is at or above the ATO threshold, currently A$75,000 for most businesses, or if you expect it to be. You can register earlier voluntarily. Check the ATO website or ask your accountant for your own situation."
  - q: "Should my Shopify prices include GST?"
    a: "For consumers in Australia, yes. Prices shown to consumers are normally GST-inclusive, and Shopify has a setting to include tax in prices. Set it once and keep the price column in your product import consistent with it."
  - q: "How much GST is there on a sale?"
    a: "GST is 10 per cent of the price excluding GST. On a GST-inclusive price, the GST is one-eleventh of the total. For example, on A$110 the GST is A$10. Some items are GST-free, such as certain basic foods, so check with the ATO."
  - q: "Do I need to issue tax invoices?"
    a: "If you are registered for GST, you generally need to provide a tax invoice when a customer asks for one on sales above a set amount, which the ATO states at A$82.50 including GST for the simplified rules. Confirm the current requirements with the ATO."
  - q: "Can I offer Afterpay or Zip on Shopify?"
    a: "Yes. Buy now pay later providers such as Afterpay and Zip are widely used in Australia and are available as payment options for Shopify stores, either through your payment provider or as separate apps. Check Shopify's current payments information for availability and fees."
---

Australia is an easy market to sell into from Shopify. GST is a single flat rate, prices are shown inclusive, and shoppers are comfortable buying online. The things that catch merchants out are registration timing, inconsistent GST handling in the catalogue, and shipping data that is wrong at checkout.

This guide covers the store-setup and catalogue side. It is not tax advice. GST rules and thresholds are set by the Australian Taxation Office (ATO) and change, so confirm the details on ato.gov.au or with your accountant.

## GST in brief

GST is a 10 per cent tax on most goods and services sold in Australia. A GST-registered business charges GST on its taxable sales and claims credits for GST paid on business purchases. Some items are GST-free, such as certain basic foods and some health items, and some are input-taxed. Which category a product falls into is a question for the ATO guidance or your accountant.

A useful relationship: on a GST-inclusive price, the GST is one-eleventh of the total. On A$110, GST is A$10 and the pre-GST price is A$100.

## Step 1: Do you need to register?

Most businesses must register for GST when their GST turnover reaches the registration threshold, currently A$75,000 over a 12-month period, or when they expect it to. You can register voluntarily below that. Different thresholds apply to non-profits and some other cases.

If you sell from overseas to Australian consumers, the rules differ. For low-value goods (A$1,000 or less) the overseas seller is generally responsible for charging GST at the point of sale once their Australian sales reach the threshold, while for higher-value goods GST is typically collected at the border. These rules have been updated over time, so check the ATO's pages on GST and low-value imported goods before relying on this.

Questions for your accountant:

1. Do I need to register now, or when will I?
2. Which of my products are taxable, and which, if any, are GST-free?
3. How do I treat shipping and handling?
4. If I sell overseas, how does GST apply to export sales?

You also need an ABN to register, and registration is done through the ATO.

## Step 2: GST-inclusive pricing in Shopify

Australian consumers expect to see one price, GST included. In Shopify, the tax settings (Settings, then Taxes and duties) let you include tax in your prices. For a consumer store, that is the usual configuration.

Decide whether your product price column is GST-inclusive, and stay consistent. A mixed file is the classic error: half of the rows are entered as retail prices and half as ex-GST wholesale prices, and the store ends up selling some products 10 per cent under what you intended.

A worked example:

```
Retail price (GST inclusive):   A$74.90
GST (one-eleventh):             A$6.81
Price excluding GST:            A$68.09
```

If a supplier sends ex-GST cost prices, convert them in your spreadsheet before import:

```
Supplier cost ex-GST:      A$40.00
Margin target:             100% markup -> A$80.00 ex-GST
Retail price incl. GST:    80.00 x 1.10 = A$88.00
```

Round to a price point you like, such as A$89.00 or A$87.95, after the GST calculation, not before.

## Step 3: GST-free and mixed catalogues

If every product is taxable, the default settings work. If you sell some GST-free items (for example certain food products), flag them:

- Add a column in your master sheet called `GST status` with values like Taxable, GST-free.
- Use Shopify's tax overrides or product tax settings so the right items are not taxed.
- Confirm each case with the ATO guidance, because definitions can be narrow. Whether a food counts as basic or prepared, for instance, has specific rules.

Bundles that mix taxable and GST-free items need care, so ask your accountant how to split them.

## Step 4: Tax invoices

A registered business must be able to give customers a tax invoice. Requirements depend on the value of the sale. For sales below a stated amount (A$82.50 including GST at the time of writing), the requirements are simpler, and above it, a full tax invoice with specific details is needed on request. These details include your ABN, the date, a description of what was sold, the GST amount and the total.

Shopify's default order confirmation and invoice may not meet every requirement on its own, so many stores add an invoice template or app. Have your accountant check the output with a test order. The catalogue contributes through accurate product descriptions and prices on every line.

## Step 5: Shipping

Shipping is where Australian geography shows. Distances are long and carrier pricing depends on zones, weight and size.

Catalogue data to get right:

- **Weight** for every variant in grams or kilograms, consistently.
- **Dimensions**, because carriers apply cubic weight rules.
- **Origin location**, so rates calculate from where goods actually ship.
- **Product type**, if you restrict some items by region or carrier.

Use the Shopify shipping settings to create rates by weight or price, or connect carriers. Domestic carriers such as Australia Post and Sendle are commonly used, so check which carrier rate integrations are currently available in Shopify. Set expectations about delivery times on the product page and at checkout, particularly for Western Australia, Tasmania and remote areas.

If an import leaves weights at zero, your rates will be wrong. Check after every upload. See [Shopify bulk product upload](/guides/shopify-bulk-product-upload) and [CSV import errors](/guides/shopify-csv-import-errors) for how the columns behave.

## Step 6: Payments, including buy now pay later

Australian shoppers use cards and digital wallets, and buy now pay later (BNPL) services such as Afterpay and Zip are popular. They are available to Shopify stores through payment providers or apps. Check Shopify's current payment pages for which providers work with your setup, and compare fees, which are normally higher than card fees, before offering them.

Practical points:

- Show BNPL messaging on product and cart pages only if the provider is enabled, because a promise you cannot fulfil at checkout costs trust.
- Test a BNPL checkout from start to finish.
- Check how refunds and returns are handled with each provider.

## Step 7: Test before you launch

1. Place an order to an Australian address and check that GST shows as included.
2. If you have GST-free items, place an order that includes one.
3. Test shipping to a metro postcode and a remote one.
4. Request a tax invoice and compare it to the ATO requirements with your accountant.
5. Test a return and a refund.

## Common mistakes

- **Uploading ex-GST prices** as retail prices.
- **Not registering in time.** The threshold is a rolling 12-month measure, so check as sales grow.
- **Applying GST to GST-free items** or the reverse.
- **Weights and dimensions missing**, so shipping quotes are wrong.
- **BNPL badges without BNPL enabled.**
- **Not testing the invoice**, then finding it lacks details during an audit.

## When to do it yourself and when to hand it off

For a small range with one tax treatment, you can do the whole setup yourself in a day: tax settings, shipping rates, payments, test orders. The decisions are few.

For a catalogue of hundreds or thousands of products with supplier price lists, mixed tax statuses, missing weights and inconsistent titles, the data work takes longer than the configuration. Our [bulk product upload service](/bulk-product-upload) covers it: an AI engine does the volume, a person reviews every output, and you approve before anything goes live. Listing starts from A$229 for up to 250 products, with a fixed quote after we inspect your files. We use a collaborator account you can remove and never ask for passwords. Try ten products first with the [free sample](/free-sample). We prepare the catalogue; GST decisions stay with you and your accountant.

---
title: "How to Set Up a Shopify Store: Launch Checklist"
heading: "How to set up a Shopify store: a step-by-step launch checklist"
description: "Set up a Shopify store in the right order: plan, theme, products, collections, payments, shipping, taxes, policies, domain, markets, a test order and launch."
category: catalog
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "To set up a Shopify store: create the account, choose a plan, pick a theme, add products and collections, turn on payments, set shipping and taxes, write your policies, connect a domain, configure markets, place a test order, then remove the password and launch. Products take the longest, so start them early."
faqs:
  - q: "How long does it take to set up a Shopify store?"
    a: "A store with a few dozen products can be ready in a few days of part-time work. The slow part is almost always product data: titles, descriptions, images and variants. Payment verification and domain changes can also add waiting time outside your control."
  - q: "What do I need before I start a Shopify store?"
    a: "Have your business details, a bank account for payouts, product photos and specifications, a list of variants and prices, shipping rates you can honestly offer, and draft policies. Missing product data causes more delay than anything else, so collect it first."
  - q: "Which Shopify plan should I start on?"
    a: "Most new stores start on the entry plan and move up when order volume or staff needs justify it. Higher plans reduce the extra fee on third-party payment gateways and add staff accounts. Check Shopify's live pricing page, since plans, prices and trial terms vary by region."
  - q: "Should I add products manually or by CSV?"
    a: "Add products manually for a handful. Switch to a CSV import once you have dozens, because it is faster and more consistent. The risk with CSV is formatting errors, so import a small test file first and check the result before the full file."
  - q: "How do I test a Shopify order before launch?"
    a: "Place a real test order through your own checkout, using a bogus gateway or a cheap product you cancel and refund yourself, and check emails, tax, shipping and fulfilment. Shopify's help centre describes how to test orders. Do this on each payment method you offer."
---

A Shopify store is quick to start and slow to finish properly. Creating the account takes minutes. Getting products, shipping, tax and policies right is the work, and it is where most delays happen. This checklist puts the steps in a sensible order so you are not redoing things halfway.

Plans, trial terms and some settings vary by country and change over time. Where a detail depends on your region, check Shopify's help centre at help.shopify.com.

## Before you start: gather what you need

Collect these before you open the admin, because every step below uses them.

- Legal business name, address and a business bank account for payouts.
- Product photos, titles, descriptions, specifications and costs.
- A list of variants per product (sizes, colours) with a price and SKU for each.
- Shipping facts: where you ship, carriers, packaging weights, and what you can honestly promise on delivery times.
- Draft policies for returns, shipping and privacy.
- A domain name, or a decision to buy one through Shopify.

If your product data lives in a supplier spreadsheet in poor shape, fix that first. Product data is the longest task on this list, and it is easier to clean once than to correct product by product in the admin.

## Step 1: Create your account and choose a plan

Sign up with the email you want to use as the store owner login and give the store a name. You can change the name later; the temporary `myshopify.com` address is separate and you will connect a real domain in a later step.

Shopify's pricing page, at the time of writing, lists Basic, Grow and Advanced, plus an enterprise Plus plan. Products are unlimited on all of them. The practical differences are staff accounts (none beyond the base account on Basic, 5 on Grow, 15 on Advanced, unlimited on Plus, per the pricing page) and the extra fee Shopify charges on orders if you use a third-party payment provider instead of Shopify Payments: 2% on Basic, 1% on Grow, 0.6% on Advanced and 0.2% on Plus at the time of writing.

Start on the entry plan unless you already know you need staff accounts or lower gateway fees. Trial offers and prices differ by region and change, so read the live page rather than relying on any article, this one included.

## Step 2: Choose and set up a theme

Pick a theme that matches your catalog, not your mood. A store with 600 products needs strong filtering and collection pages. A store with eight products can use a single-page design. Shopify's free themes are enough to launch; paid themes add features rather than quality.

Do the basics early:

1. Upload your logo and set brand colours and fonts.
2. Set up the main navigation: your top-level collections, plus pages like About and Contact.
3. Configure the footer with policy links and contact details.
4. Check the mobile view. Most of your traffic will use it.

Resist polishing the homepage now. Build the structure, then return once products are in, because real products reveal what the layout needs.

## Step 3: Add your products

This is the main task. Every product needs a title, description, images, price, SKU and, if relevant, options and variants. Treat these fields as data, not decoration: consistency across the catalog helps customers, search and any feeds you add later.

Shopify allows up to three options per product (for example Size, Colour, Material) and, per its developer changelog from October 2025, up to 2,048 variants per product. If a product needs more than three dimensions, you will combine options or split it into separate products.

Set these on each product while you are there:

- **Title** in a consistent pattern, for example brand, product type, key attribute.
- **Description** that answers real questions: size, material, care, what is in the box.
- **Images** at a consistent size and background, with alt text.
- **SKU and inventory** with tracking on if you carry stock.
- **Weight**, which shipping rates will use.
- **Product category and type**, which help filtering and Google.

For more than a couple of dozen products, use the CSV import instead of typing. Shopify's product CSV has fixed column names and a handle that groups variant rows together. Import five products first, check the result in the admin, then run the full file. Our [Shopify bulk product upload guide](/guides/shopify-bulk-product-upload) covers the format and the common mistakes in detail, and [Shopify variants via CSV](/guides/shopify-variants-csv) covers option and variant rows.

## Step 4: Build collections

Collections group products so customers can browse. Shopify offers manual collections, where you pick the products, and automated collections, where products join based on rules such as tag, type, vendor or price.

For most stores, automated collections are less work to maintain. Decide your tagging or product type scheme before you import products, so the rules have something consistent to match. Aim for a navigation that a first-time visitor understands without reading: a short list of top-level categories, each with a clear name. Our [Shopify collections guide](/guides/shopify-collections) explains the rules and bulk setup.

## Step 5: Turn on payments

In the payments settings, activate Shopify Payments where it is available in your country, or choose a supported third-party provider. Shopify Payments needs identity and bank details for verification, which can take time, so start this early.

Check which methods your customers expect. In some markets that means local methods, wallets or cash on delivery rather than cards alone. Remember that using a third-party gateway adds the extra Shopify fee noted in step 1 on top of the provider's own charges.

## Step 6: Set up shipping

Shipping settings decide what customers see at checkout, so get them right before testing.

1. Set your shipping origin address.
2. Create shipping zones for the places you sell.
3. Choose rates: flat, weight-based, price-based, free over a threshold, or carrier-calculated where your plan supports it.
4. Add product weights so weight-based rates work.
5. Set up local delivery or pickup if you offer it.

Set rates you can sustain. A free-shipping promise that costs you money on every order is a common first-month mistake. If you ship internationally, check duties and import taxes and decide who pays.

## Step 7: Configure taxes

Tax rules depend on where you are and where you sell. Shopify can calculate taxes for many regions, and you choose whether prices include tax. Both choices matter: in some countries prices are expected to be tax-inclusive, and getting it wrong shows the wrong total at checkout.

Register for tax where you are required to and enter your tax details in settings. Country-specific rules are beyond a single checklist, and we have guides for [India](/guides/shopify-gst-india), the [UK](/guides/shopify-vat-uk) and [Australia](/guides/shopify-gst-australia). If you are unsure about your obligations, ask an accountant. Do not guess.

## Step 8: Write your policies

Add refund, shipping, privacy and terms policies. Shopify provides policy templates you can generate and edit from the settings area. Treat them as a starting point and adapt them to what you really do. A policy that promises a 30-day return and a store that handles returns in two weeks is a customer service problem waiting to happen.

Link the policies in the footer and mention shipping and returns on product pages or the checkout flow, since these are what hesitant buyers look for.

## Step 9: Connect your domain

You can buy a domain through Shopify or connect one you already own. Connecting means updating DNS records at your registrar, and changes can take time to take effect. Set the primary domain, and make sure the `www` and non-`www` versions go to one place.

If you are moving from another platform, do not switch the domain until your products, redirects and checkout are ready. Mapping old URLs to new ones before the switch protects the rankings you already have; our guide to [301 redirect mapping](/guides/migration-301-redirects) explains how.

## Step 10: Configure markets and currencies

If you sell to more than one country, use Shopify's markets settings to decide which countries you serve, in what currency, and with what pricing and shipping. Start with one or two markets you can fulfil well rather than turning on the world.

For each market, check taxes, duties, shipping rates, language and payment methods. Selling to a country you cannot ship to cheaply or reliably just produces refunds.

## Step 11: Place a test order

Before launch, buy something from your own store. Shopify's help centre describes how to place test orders, including using a test gateway where your payment setup allows it.

Check each of these:

- The product page, cart and checkout display correctly on mobile.
- The total includes the right tax and shipping.
- The order confirmation and shipping emails arrive and read properly.
- The order appears correctly in the admin and inventory decrements.
- You can fulfil, refund and cancel it.

Repeat for each payment method you offer. Fix what you find, then test again.

## Step 12: Launch

Final checks: look through every collection, click every navigation link, read each policy, and check that titles and meta descriptions on the homepage and top collections say something sensible. Install your analytics and any ad or feed tags you need. Then remove the storefront password in your online store preferences, and you are live.

After launch, watch the first orders closely, check search and analytics, and keep a list of fixes for the following week. A launch is the start of the work, not the end.

## When to do it yourself and when to hand it off

Setting up a store with a few dozen clean products is a sensible DIY project, and learning the admin yourself pays off later. Hand off the product work when the catalog is large or the data is messy: hundreds of products, supplier files with inconsistent columns, variants that need restructuring, or a launch date that cannot slip. Our [Shopify store setup and product upload service](/shopify-store-setup-products) does that part: an AI engine handles the volume, a person reviews every output, and you approve before anything goes live. Turnaround starts from 48 hours for eligible projects; turnaround depends on scope, catalog complexity and the quality of the data and access we receive. We never ask for store passwords and work through a staff account you can remove. If you want to see the quality first, request a [free 10-product sample](/free-sample), and see [pricing](/pricing) for starting prices.

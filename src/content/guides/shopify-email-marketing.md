---
title: "Shopify Email Marketing: Setup, Flows and When to Upgrade"
heading: "Shopify Email marketing: what it does, which flows to build, when to outgrow it"
description: "How Shopify Email works: free monthly allowance, automations, the essential flows, deliverability basics and when to move to a dedicated email platform."
category: retention
service: email
published: 2026-10-12
updated: 2026-10-12
summary: "Shopify's built-in email tool lets you send campaigns and automations from the Shopify admin, with 10,000 free emails a month on eligible plans and a per-thousand charge above that. It suits small lists and simple flows. Stores that need segmentation, flow branching or detailed reporting usually move to a dedicated platform."
faqs:
  - q: "Is Shopify Email free?"
    a: "Partly. Shopify's help centre lists 10,000 free emails per calendar month on eligible plans, shared across campaigns and automations, with overage billed per thousand. Abandoned checkout automations are listed as free and do not count towards the allowance. Check the current page, as pricing can change."
  - q: "Can Shopify Email send abandoned cart emails?"
    a: "Yes. Shopify's help centre describes abandoned checkout automations as always free and not counted against your monthly allowance. You can customise the template, though branching and testing options are limited compared with dedicated email platforms."
  - q: "What flows does a Shopify store need first?"
    a: "Start with a welcome series, abandoned checkout, post-purchase and win-back. These four cover the moments where a buyer is most likely to respond. Add browse abandonment and replenishment reminders once the basics are running cleanly."
  - q: "When should I move from Shopify Email to Klaviyo or similar?"
    a: "When you need segmentation beyond simple lists, conditional branches, A/B tests inside flows, SMS in the same flow or revenue attribution you can trust. Usually that arrives with a few thousand subscribers and a real retention target."
  - q: "How do I stop my emails going to spam?"
    a: "Authenticate your sending domain, send only to people who agreed to hear from you, keep lists clean and avoid sudden jumps in volume. Watch bounces and complaint rates. Content matters less than consent, authentication and engagement."
---

Most stores start email with whatever is already in the Shopify admin. That is a sound choice. A lot of owners never need more, and the ones who do usually find out because a specific thing stops working, not because a blog told them to upgrade.

This guide covers what the built-in tool does, the flows worth building first, the deliverability basics that apply wherever you send from, and the signs it is time to move.

## What Shopify Email is today

Shopify Email lets you design and send email campaigns from inside the Shopify admin, using your products and store branding. Shopify's help pages now describe it as part of a messaging product that also covers SMS and WhatsApp campaigns, and the naming has shifted over time. Look for the current name in your admin and in help.shopify.com.

It covers the basics: templates, product blocks, a subscriber list synced from your customers, campaign sending and automations. It does not try to be a full lifecycle platform. That is the trade-off.

## What it costs

Shopify's help centre states a free allowance of 10,000 emails per calendar month on eligible plans (Basic, Grow, Advanced and Plus at the time of writing). It is shared across campaigns and automations, counts each recipient as one email, and unused sends do not roll over. Above the allowance, Shopify lists overage at US$1.00 per 1,000 emails up to 300,000, then lower rates at higher volumes. Abandoned checkout automations are listed as free and are not counted against the allowance.

Treat these as the figures on the day we checked. Shopify changes plan names and pricing, so confirm on [Shopify's pricing page for the tool](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-email/shopify-email-cost) before you budget.

## Automations you can run

Shopify supports automations triggered by customer actions, including welcome emails for new subscribers and abandoned checkout emails. Which templates and triggers exist can differ by account and by version, so open the Automations area in your admin and read what is offered before you plan around it.

The common limits we see are:

- Little or no branching. You send one path to everyone.
- Basic segmentation. Lists and simple customer filters, not behaviour-based rules.
- Light reporting. Opens and clicks, with limited revenue attribution.
- Few ways to test subject lines or timing.

For a store sending a monthly campaign and three automations, none of this hurts.

## The essential flows

Build these in order. Each is a short sequence, not a long drip.

1. **Welcome.** Two or three emails across the first week after sign-up. Introduce the brand, show best sellers, answer the questions new buyers have, and give any sign-up offer once.
2. **Abandoned checkout.** Two or three emails across a day or so. Remind, address doubts such as delivery and returns, and keep any incentive for the last email or skip it. We cover timing and copy in our [abandoned cart email sequence guide](/guides/abandoned-cart-email-sequence).
3. **Post-purchase.** Order confirmation is transactional and sent by Shopify. A follow-up marketing email with usage tips, care instructions or a review request builds the second order.
4. **Win-back.** For customers who have not bought in a period that fits your reorder cycle. One or two emails, then stop.
5. **Browse abandonment and replenishment.** Later additions. Browse abandonment needs tracking support, and replenishment only suits consumables.

Keep marketing messages and transactional messages separate. Order confirmations and shipping notices are service emails, and should not be loaded with promotions.

## Deliverability basics

Whichever tool you use, inbox placement comes down to a few things you control.

- **Consent.** Email only people who agreed to hear from you. Make sign-up clear and the unsubscribe link easy to find.
- **Authentication.** Set up SPF and DKIM for your sending domain, and a DMARC policy. Mailbox providers use them to decide whether to trust you. If you send from a free webmail address, change that first.
- **List hygiene.** Remove hard bounces, and stop sending to people who have not opened in a long time.
- **Steady volume.** A sudden jump from a few hundred emails to tens of thousands looks like abuse.
- **Relevance.** Send fewer, better emails. Complaints hurt more than low open rates.

Mailbox providers publish sender requirements, and they have tightened over the years. Check the current guidelines from Google and Yahoo if you send in volume.

## Signs you have outgrown it

Move when a specific need is blocked, not before. The usual ones:

- You want flows that split on behaviour, such as different paths for first-time and repeat buyers.
- You need segments built from purchase history, product interest or engagement.
- You want to A/B test inside flows.
- You need revenue attributed to each flow and campaign.
- You run SMS or WhatsApp alongside email and want one flow logic.

At that point, dedicated platforms such as Klaviyo, Omnisend and others are worth the cost. They charge by contact count, so clean the list first.

## Writing emails that get read

Subject lines and the first line do most of the work. Say what is inside, plainly. "Your cart is waiting" is fine; four exclamation marks is not. Keep the sender name consistent so people recognise you, and give each email one job and one button.

Design matters less than people think. Plain layouts with a clear product image and short copy outperform busy templates in our experience, because they load on any phone. Check every email on a mobile screen before it goes live, and send a test to a Gmail and an Outlook address.

### A short example: welcome email 1

```
Subject: Welcome to Ridgeway, here is what to start with
Preview: Three bestsellers and how delivery works

Hi {first name},

Thanks for joining. Our three most-ordered bottles are below.
Delivery takes 3 to 5 working days and returns are free within 30 days.

[Shop bestsellers]
```

That is the whole email. It tells the reader what to do and answers the two questions new buyers ask. The brand and policy details here are placeholders; use your own.

## Measuring results

Opens and clicks are noisy. Since mail apps began preloading images, open rates overstate real reading and are a weak guide. Look at clicks, orders attributed to the email, unsubscribe rate and complaint rate. Judge each flow by revenue per recipient over a few weeks, not by one campaign day.

Run campaigns monthly or fortnightly to begin with, and compare against flows. In most stores the automations earn more per email than the campaigns do, which is why they come first.

## Moving to a dedicated platform without losing your list

If you do move, export your subscriber list with consent status and the sign-up source, and import it with consent preserved. Do not re-import people who unsubscribed or never opted in. Rebuild the four essential flows before switching the old ones off, run both in parallel for a few days with overlapping triggers disabled on one side, and re-authenticate your sending domain for the new platform. Warm up volume over a couple of weeks instead of sending to everyone on day one.

## Segments worth having even on a basic tool

You do not need a complex setup to send relevant mail. Three simple groups cover most of the value: people who have never bought, people who bought once, and repeat buyers. Send each a different message. First-time subscribers need reassurance about delivery, returns and quality. One-time buyers need a reason to come back, often a restock or a related product. Repeat buyers want early access and news, not a discount they would have used anyway.

Be careful with discounts. A permanent sign-up code trains buyers to wait for it. Many stores do better offering it once, to new subscribers only, and leaving it out of recovery emails until the final one.

## When to do it yourself and when to hand it off

If you have a small list and fewer than five flows, set them up in Shopify yourself. It is free or close to it, and the copy is the work that matters.

Hand it off when you want eight or more flows built properly, a migration from one platform to another, segmentation rules designed, or templates written and tested across devices. Our [ecommerce email marketing](/ecommerce-email-marketing) service sets up flows on Shopify Email or a dedicated platform, writes the copy, and a person reviews every email before it goes live. Ask for the [free 10-product sample](/free-sample) if you want to see our work first. Prices are on the [pricing](/pricing) page.

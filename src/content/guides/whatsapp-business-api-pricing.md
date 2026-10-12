---
title: "WhatsApp Business API Pricing Explained for Online Stores"
heading: "WhatsApp Business Platform pricing explained for online stores"
description: "How WhatsApp Business Platform pricing works: per-message billing, the four categories, free service windows, what providers add, and a worked cost model."
category: retention
service: whatsapp
published: 2026-10-12
updated: 2026-10-12
summary: "Since 1 July 2025, WhatsApp Business Platform charges per delivered template message instead of per 24-hour conversation. The price depends on the message category (marketing, utility, authentication) and the recipient's country. Replies inside the customer service window are free, and your provider may add its own fees."
faqs:
  - q: "How does WhatsApp Business API pricing work now?"
    a: "Meta charges per delivered template message, with the rate set by the message category and the recipient's country calling code. This replaced conversation-based pricing on 1 July 2025. Free-form replies within the 24-hour customer service window are free."
  - q: "Are WhatsApp utility messages free?"
    a: "Utility templates sent inside an open customer service window are free. Outside the window they are charged, at a lower rate than marketing. Meta also offers volume-based discounts for utility and authentication. Check Meta's current rate card for your market."
  - q: "What is the customer service window?"
    a: "A 24-hour period that opens when a customer messages your business and refreshes with each new customer message. While it is open, you can send free-form messages without charge. Outside it, you must use approved templates, which are billed."
  - q: "Do I pay extra to a provider for the WhatsApp API?"
    a: "Usually yes. Meta's message fees are separate from what a business solution provider charges for the platform, such as a monthly fee, a markup per message or both. Ask any provider to list Meta's pass-through charges and their own fees separately."
  - q: "Can I send marketing messages to anyone on WhatsApp?"
    a: "No. Customers must have opted in to receive messages from your business, and marketing templates need Meta approval. Sending without consent risks complaints, quality rating drops and restrictions on your number. Collect opt-in clearly at checkout or sign-up."
---

WhatsApp is the channel many shoppers read first, which is why stores want it for order updates, COD confirmations and cart recovery. The pricing is simple in principle and easy to misjudge in practice, because the cost depends on what kind of message you send, where it goes and when.

This guide explains how Meta charges for the WhatsApp Business Platform, what you may pay on top, and how to estimate a monthly bill. Rates change and differ by country, so the numbers in the examples are placeholders. Always take current figures from Meta's pricing page and your provider.

## What changed in July 2025

Until mid-2025, Meta billed by conversation: a 24-hour window opened by a message, and everything within it was one charge. From 1 July 2025, Meta moved to per-message pricing. Each delivered template message is billed on its own, based on its category and the recipient's country.

Two practical results. First, the number of messages now matters more than the number of conversations. Second, message category is the main lever on cost, so labelling templates correctly is both a compliance matter and a budgeting one.

## The four message types

Meta groups messages into categories.

| Type | What it is | Example | Billing |
| --- | --- | --- | --- |
| Marketing | Promotions, offers, product recommendations, re-engagement | "New arrivals are in" | Charged per message, highest rate |
| Utility | Messages about an order or account the customer already has | Order confirmation, shipping update | Charged per message outside the service window; free inside it |
| Authentication | One-time passcodes | Login or COD verification code | Charged per message |
| Service | Free-form replies to a customer's own message | Answering "Where is my order?" | Free within the open window |

Meta decides how a template is categorised when you submit it, and mixing promotional content into a utility message can get it reclassified as marketing. Keep utility templates about the order and nothing else.

## The customer service window

When a customer messages your business, a 24-hour customer service window opens. Each new customer message refreshes it. While it is open, you can send non-template messages for free, and, since the July 2025 change, utility templates are also free inside the window.

Outside the window, you can only start a conversation with an approved template, and it is billed per message by category.

There is also a free entry point window. If a customer starts a chat by clicking a WhatsApp ad or the Send Message button on a Facebook Page, a 72-hour window opens in which messages, including templates, are free. This can help when you run click-to-WhatsApp ads.

## What drives the price

Per message, Meta's rate depends on:

- **Category.** Marketing costs most. Utility and authentication are lower.
- **Recipient country.** Rates are set by the country calling code of the customer's number, not where your business is based. A message to a customer in India costs differently from one to the UK or Australia.
- **Volume.** Meta offers tiered discounts on utility and authentication templates as monthly volume grows. Check the current terms on Meta's pricing page.
- **Currency.** Rates are published in several currencies, and Meta updates the rate card periodically.

Meta's pricing documentation, linked from [developers.facebook.com/docs/whatsapp/pricing](https://developers.facebook.com/docs/whatsapp/pricing), lists the current rates and effective dates. Treat any blog post, including this one, as secondary.

## What you pay on top of Meta

Meta's charges are one part of the bill. A business solution provider (BSP), which gives you the dashboard, inbox, automation builder and API access, charges separately. Common structures:

- A monthly platform fee, often tiered by plan.
- A per-message markup on Meta's rate.
- A flat per-message fee in place of a markup.
- Extra charges for add-ons: agents' seats, chatbot features, broadcasts or integrations.

Ask any provider to break their quote into Meta's pass-through charges and their own. Without that split you cannot compare two quotes honestly, and you cannot tell whether a lower headline price hides a higher markup.

## A worked cost model

Here is how to estimate a month. The rates below are invented placeholders, used to show the arithmetic. Replace them with Meta's real rates for your market, plus your provider's fees.

Assumptions for a hypothetical store: 3,000 orders a month, customers in one country.

| Message | Count | Category | Placeholder rate | Cost |
| --- | --- | --- | --- | --- |
| Order confirmation | 3,000 | Utility | 0.20 | 600 |
| Shipping update | 3,000 | Utility | 0.20 | 600 |
| COD confirmation request | 1,200 | Utility | 0.20 | 240 |
| Abandoned cart reminder | 2,000 | Marketing | 0.80 | 1,600 |
| Post-purchase promotion | 1,500 | Marketing | 0.80 | 1,200 |
| Customer replies (service) | 1,000 | Service | 0.00 | 0 |

Total in this example: 4,240 in placeholder units, plus the provider fee. Two things stand out. Utility messages are cheap per message but the volume is high. Marketing is a minority of messages and a large part of the cost. That is the usual shape, and it points to the right levers.

## Ways to control the bill

1. **Keep utility templates clean.** An order update that sneaks in a discount code may be billed as marketing.
2. **Segment marketing.** Send to people who bought recently or abandoned a cart, not the whole list.
3. **Use the free windows.** If a customer replies to a COD confirmation, the answer opens a service window, in which you can respond for free.
4. **Cap frequency.** Set a rule for how many marketing messages a person gets per week.
5. **Collect opt-in properly.** Messages to people who did not agree cost money and damage your quality rating.
6. **Watch template quality.** Poorly rated templates can be limited, and blocks by customers reduce your sending capacity.
7. **Review the rate card each quarter.** Meta adjusts rates, and your market may change.

## Consent and quality

WhatsApp requires that customers opt in before you message them, and marketing templates must be approved. Put the opt-in at checkout with clear wording, say what you will send and how often, and make stopping easy. Sending to purchased lists is a fast route to blocks, a lower quality rating and restricted sending, which costs more than any message fee.

## Which messages are worth it for a store

The strongest returns usually come from utility-type flows, because customers want them: order confirmation, dispatch and delivery updates, and COD confirmation. See [how to confirm COD orders on WhatsApp](/guides/whatsapp-cod-confirmation) for that flow. Marketing and cart recovery work as well, but are priced higher, so measure them against what a recovered order is worth. If you are comparing channels, our [abandoned cart email sequence](/guides/abandoned-cart-email-sequence) guide covers email, which is usually cheaper per message.

## When to do it yourself and when to hand it off

If you have low volume, a single flow and time to read Meta's documentation, apply for API access through a provider, build the templates and test. The pricing is manageable once you know the categories.

It gets complicated when you need several flows, template approvals, store integration, COD logic and cost control across markets. Our [WhatsApp automation service](/whatsapp-automation) sets up the flows and templates, connects them to your store and documents how the billing works for your setup. It starts from ₹9,999 / $279 / £229 / A$429 for setup, and you approve everything before it goes live. Meta's message fees and any provider fees are paid separately to them. The [free sample](/free-sample) is for catalogue work, so for WhatsApp start with [pricing](/pricing) or [get started](/get-started).

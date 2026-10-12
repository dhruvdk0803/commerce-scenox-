---
title: "Abandoned Cart Email Sequence: Timing, Copy and Compliance"
heading: "Abandoned cart email sequence: timing, subject lines and compliance"
description: "A three-email abandoned cart sequence with timing, subject lines, discount rules, WhatsApp and SMS follow-ups, and compliance basics by market."
category: retention
service: email
published: 2026-10-12
updated: 2026-10-12
summary: "Send three emails: a plain reminder about an hour after abandonment, a help-and-objections email around 24 hours, and a final nudge at 48 to 72 hours. Hold any discount for the last email or skip it. Only email people you have permission to contact, and follow the rules of each market."
faqs:
  - q: "How many abandoned cart emails should I send?"
    a: "Three is a sound default: a reminder within hours, a follow-up the next day and a last nudge two to three days later. More than that tends to irritate. Test your own audience and stop the sequence immediately once the customer buys."
  - q: "When should the first abandoned cart email go out?"
    a: "Around one hour after abandonment suits most stores, because the shopper still remembers what they were looking at. Shorter can feel intrusive and may catch people who are about to return. Test timing against your own recovery and unsubscribe numbers."
  - q: "Should I offer a discount in abandoned cart emails?"
    a: "Not in the first email. Many stores hold a discount for the final email, or skip it for products with thin margins. A blanket discount trains shoppers to abandon carts on purpose. Use it where price is the real barrier."
  - q: "What is the difference between cart and checkout abandonment?"
    a: "Cart abandonment means items were added but checkout was not started. Checkout abandonment means the shopper started checkout, usually entering an email, then left. Checkout abandoners are more advanced and identifiable, so they usually get a more direct message."
  - q: "Can I email abandoned carts without consent?"
    a: "It depends on the market and your lawful basis, and consent rules differ between the US, UK, Australia and India. As a rule, only send to people who gave their email in a way that allows it, include an unsubscribe link, and take legal advice for your situation."
---

An abandoned cart email is a reminder sent to someone who showed clear buying intent and left. It is usually the highest-value automated email a store can run, because the audience is small, warm and already chose the product.

This guide sets out the sequence, the reasoning behind each message, when to use a discount, how Shopify's built-in emails compare to a dedicated email platform, and the compliance basics by market. We have not quoted recovery-rate statistics, since figures vary by store and published numbers are not comparable.

## Browse, cart and checkout abandonment are different

Treat these as three separate triggers, because the shopper's intent differs.

- **Browse abandonment:** a known visitor viewed products but did not add to cart. Intent is low, so keep the message soft, such as "still looking at this?" with the viewed product.
- **Cart abandonment:** the shopper added items to the cart and left. Intent is medium. Remind them of the items.
- **Checkout abandonment:** the shopper started checkout and gave an email address, then left. Intent is high, and the problem is usually a barrier such as shipping cost, a payment issue or a question.

Shopify counts a checkout as abandoned when it stays incomplete for more than ten minutes after the customer has given their email. See [Shopify's help page on abandoned checkouts](https://help.shopify.com/en/manual/orders/abandoned-checkouts). A shopper who never gives an email cannot be reached by email at all, which is one reason to capture the address early.

## The three-email timing

A common structure is one hour, 24 hours and 48 to 72 hours. Stop the sequence as soon as the customer completes a purchase.

| Email | Timing | Job |
|---|---|---|
| 1. Reminder | About 1 hour | Return the shopper to the cart with no pressure |
| 2. Help | About 24 hours | Remove doubts: delivery, returns, sizing, payment options |
| 3. Last nudge | 48 to 72 hours | Create a reason to decide now, with a deadline or an incentive if appropriate |

These timings are a starting point, not a rule. Test them against your own purchase cycle: a store selling furniture will see longer consideration than one selling phone cases.

## What each email does

### Email 1: the reminder

Keep it short and functional. Show the product image, name, size or variant, price, and one button that goes back to the cart. Avoid discount language. Most abandoners were interrupted, not undecided, and a plain reminder is enough for them.

### Email 2: the objection handler

This is the email people overlook. Use it to answer the questions that stop purchases: delivery times and cost, return policy, payment options, sizing help, and a way to reach a human. If you have reviews you can show, add a verified one. If you do not, leave it out rather than invent one.

### Email 3: the last nudge

State plainly that the cart will not be held, if that is true. Consider a deadline, and a discount only where it is justified (see below). Keep the tone matter-of-fact and make the cart link prominent.

## Subject line examples

Use clear, specific subject lines and avoid tricks. Examples you can adapt:

**Email 1**
- "You left something in your cart"
- "Your cart is saved, {{ first_name }}"
- "Still thinking about the {{ product }}?"

**Email 2**
- "Questions about your order? Here are the answers"
- "Delivery, returns and sizing, in one place"
- "Need help choosing?"

**Email 3**
- "Last reminder about your cart"
- "Your cart expires soon"
- "Before you go: your items are still here"

Do not claim scarcity or deadlines that are not real, and do not use fake urgency. Both erode trust, and some markets treat misleading claims as a legal problem.

## When to use a discount, and when not to

Use a discount only when price is the actual barrier. If shoppers leave because of shipping cost, a percentage off will not fix it, but free or cheaper shipping might. If they leave because they have questions, a discount is an expensive answer to the wrong problem.

Some guidelines from experience:

- Do not put a discount in email 1.
- Hold any incentive for email 3, or test it for new customers only.
- Skip discounts on low-margin products where the maths does not work.
- Beware of conditioning: if every abandoned cart gets a code, regular customers learn to abandon on purpose.
- Test no-discount against discount on a split, and measure profit per recipient, not only conversion.

## Shopify built-in emails vs Klaviyo-style flows

Shopify includes an abandoned checkout email that you enable in settings and set to send after a chosen delay. It covers checkouts where the customer gave an email, through the Online Store and Buy Button channels. It is a good starting point for a small store.

A dedicated email platform such as Klaviyo, or similar tools, adds more control:

| | Shopify built-in | Dedicated flow tool |
|---|---|---|
| Triggers | Abandoned checkout | Cart, checkout, browse and more |
| Sequence | Basic, limited steps | Multi-step with delays and branching |
| Segmentation | Limited | By customer, value, product, history |
| Testing | Limited | A/B tests on subject, timing, content |
| Reporting | Basic | Revenue attribution and flow-level reporting |
| Cost | Included with Shopify | Subscription, often priced by contact count |

Check the current feature sets and pricing on each vendor's site before you decide, since both change. A reasonable path is to begin with Shopify's emails, then move to a dedicated tool once you have enough traffic to justify testing.

## Combining email with WhatsApp and SMS

Email is slow and often unread, so some stores add a second channel. WhatsApp or SMS can carry a short reminder to customers who opted in to that channel. In India, WhatsApp is a natural fit, and the same logic that works for [COD confirmation on WhatsApp](/guides/whatsapp-cod-confirmation) applies: use approved templates and get explicit opt-in.

Keep the channels coordinated. If a customer buys, stop all of them. Do not send the same message on three channels within the same hour. A sensible order is email first, WhatsApp or SMS as the second touch if the customer opted in, and a cap on total messages per cart.

## Compliance basics by market

This is a summary of well-established rules, not legal advice. Check the current law and ask a qualified adviser for your situation.

- **United States (CAN-SPAM):** commercial emails must not use misleading headers or subject lines, must identify the message as an ad where relevant, include a valid physical postal address, and offer a clear way to opt out that you honour promptly. SMS marketing is subject to separate consent rules.
- **United Kingdom (PECR and UK GDPR):** marketing email generally needs consent, with a limited exception for existing customers marketing similar products, and an opt-out in every message. You need a lawful basis for processing personal data and must be transparent about it. Whether an abandoned cart reminder counts as marketing is a question to put to a specialist.
- **Australia (Spam Act 2003):** commercial electronic messages need consent (express or inferred), must identify the sender and include a working unsubscribe facility.
- **India (DPDP Act):** the Digital Personal Data Protection Act, 2023 requires a lawful basis, usually consent, for processing personal data and clear notice about the purpose. Rules and implementation details have been phased in, so check the current status. For WhatsApp, Meta's own opt-in and template rules also apply.

In every market: record where and when each address was collected, include an unsubscribe link, honour opt-outs, and do not buy lists.

## Metrics to track

Judge the sequence on money, not opens alone. Apple's mail privacy features have made open rates unreliable, so rely more on clicks and orders.

- **Recovered revenue:** orders attributed to the flow, and the share of abandoned carts that convert.
- **Click rate and click-to-order rate** per email.
- **Revenue per recipient,** for each email and for the whole flow.
- **Unsubscribe and spam complaint rates:** a rise means you are sending too much.
- **Discount cost:** margin given away on recovered orders.
- **Incremental effect:** where you can, hold out a small group that receives no emails and compare.

## When to do it yourself and when to hand it off

If you have one store, a few hundred orders a month and basic needs, turn on Shopify's abandoned checkout email, write the three messages above, and review the results monthly. That is enough to learn how your customers behave.

Handing it off makes sense when you want a full set of flows (welcome, browse, cart, post-purchase, win-back), clean templates, segmentation and testing without building them yourself. Scenox Commerce builds these through [ecommerce email marketing](/ecommerce-email-marketing), starting from ₹12,999 / $349 / £279 / A$529 for 8 flows, with a fixed quote after we inspect your store. Every output is reviewed by a person and approved by you before anything goes live. See [pricing](/pricing), or ask for the [free sample](/free-sample) if the project is a fit.

---
title: "How Products Show Up in ChatGPT, AI Overviews and Perplexity"
heading: "How products show up in ChatGPT, Google AI Overviews and Perplexity"
description: "What ChatGPT, Google AI Overviews and Perplexity document about showing products, which data they read, crawler names, a store checklist, and what is hype."
category: content
service: cleanup
published: 2026-10-12
updated: 2026-10-12
summary: "No platform publishes a way to buy a place in AI answers. Google says AI Overviews need no special optimization beyond normal Search eligibility. ChatGPT and Perplexity have product feed programs and search crawlers. What you control is accurate product data, a clean Merchant Center feed, matching markup and crawler access."
faqs:
  - q: "Do I need special markup or an llms.txt file for Google AI Overviews?"
    a: "No. Google's documentation says there are no additional requirements for AI Overviews or AI Mode, and that you do not need new machine-readable files, AI text files or special schema. Your pages need to be indexed and eligible to show with a snippet."
  - q: "Which crawler lets my site appear in ChatGPT search?"
    a: "OAI-SearchBot. OpenAI says to allow it in robots.txt if you want to appear in ChatGPT search results. GPTBot is a separate crawler tied to model training, and ChatGPT-User handles user-initiated visits, so blocking one does not control the others."
  - q: "Is Perplexity's merchant program open to every store?"
    a: "Not clearly. Perplexity describes a free program for sharing product data, but the launch material pointed to large retailers and a sign-up form. Check its current merchant page for eligibility before planning around it. PerplexityBot access in robots.txt is a separate, simpler step."
  - q: "Does Shopify put my products into ChatGPT automatically?"
    a: "Shopify's help centre says ChatGPT is active by default for eligible stores that sell to US customers, with products eligible for Shopify Catalog and store policies filled in. It also says eligibility does not guarantee placement, because each AI channel decides what to show."
  - q: "Can I measure traffic from AI answers?"
    a: "Partly. Google says AI feature traffic is counted in the Search Console Performance report under the Web search type, not separated out. Merchant Center has an AI performance report for AI Mode and AI Overviews in some countries. For ChatGPT and Perplexity, use referrer data in your analytics."
  - q: "Will fixing my product data guarantee I appear?"
    a: "No. It removes reasons to be skipped or described wrongly: missing identifiers, mismatched prices, thin descriptions, blocked crawlers. Each system decides what to show for each question, and none of them publishes a guarantee. Anyone who sells placement is selling something they do not control."
---

Shoppers have started asking AI tools what to buy. The tools answer with a handful of products, a few links and a short explanation. If your store is not among them, it is tempting to buy whatever service promises a fix.

Before you do, it helps to know what the three main systems actually document. This guide covers ChatGPT, Google's AI Overviews and AI Mode, and Perplexity, based on their own help and developer pages as of October 2026. Where documentation is thin, we say so.

## The short version

Nobody publishes a way to pay for, or guarantee, a place in an AI answer. Google states that AI features have no extra requirements beyond normal Search eligibility. OpenAI documents a product feed specification and a search crawler, and says eligibility does not guarantee display. Perplexity documents a crawler and a merchant program with limited detail.

So the work is the unglamorous kind: complete product data, a clean feed, markup that matches the page, and crawlers that can reach you. That is catalog work, and it is also what good SEO already asks for.

## Google AI Overviews and AI Mode

Google is the most clearly documented. Its Search Central page on AI features says a page can appear as a supporting link if it is indexed and eligible to show in Search with a snippet. There are no additional requirements to appear in AI Overviews or AI Mode, and Google says you do not need new markup, special schema or AI-specific files.

It also gives practical advice, which reads like ordinary good housekeeping:

- Allow crawling in robots.txt and at your CDN or host.
- Link pages internally and keep important content in text, not only in images.
- Keep structured data consistent with the visible text.
- Keep Merchant Center information current.

For products, the second half of that matters. Google's Product structured data documentation says that providing both page markup and a Merchant Center feed maximises eligibility, and that some experiences combine data from both. Google's shopping experiences are fed by Merchant Center, so a feed with disapprovals or missing identifiers is a real handicap.

Controls exist too. `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex` limit what Search shows, and Google-Extended addresses use in AI training and grounding in other Google systems. If you added `nosnippet` for an old reason, check it: it can keep a page out of AI features.

Merchant Center now has an AI performance report for AI Mode and AI Overviews. It is limited to English-language queries and accounts in a short list of countries (Australia, Canada, India, New Zealand and the United States at the time of writing) and counts organic traffic such as free listings, not paid ads.

## ChatGPT shopping

OpenAI's help centre describes ChatGPT showing product options when a query looks like shopping, with images, details and links to merchant sites. It says these results are chosen for relevance to the question, are not ads and are not influenced by partnerships. For some eligible products it can show Instant Checkout.

How products get in depends on your platform.

### Shopify stores

Shopify's help centre says its agentic storefronts put products in front of shoppers in AI tools, and that the ChatGPT channel is on by default for eligible stores. The listed requirements are:

- You sell to customers in the United States (the store itself can be elsewhere).
- Your products are eligible for Shopify Catalog.
- You accept Shopify's supplemental terms.
- Your terms of service, privacy policy and refund policy are filled in under Settings > Policies.

Shopify adds that there are no ChatGPT-specific fees beyond normal payment processing, that B2B-only products are not supported, and that required legal disclosures should sit within the first 6,000 characters of a description. Customers pay on your own checkout.

### Other platforms

OpenAI publishes a product feed specification for merchants. It lists nine required fields: item_id, title, description, url, brand, seller_name, image_url, availability and price. Prices carry an uppercase currency code, variants get their own rows with a shared group_id, and malformed rows are rejected while valid ones still process. The spec notes that `is_eligible_search` defaults to true and that "eligibility does not guarantee display". It also says feeds are delivered through a separate upload process agreed during onboarding.

We could not confirm from OpenAI's own pages an open, self-serve application route for every merchant. The help centre points to an application form for direct feed access. Treat third-party tutorials that describe SFTP endpoints and push intervals as unconfirmed until you see them in OpenAI's documentation or onboarding.

### Crawlers

OpenAI documents three. OAI-SearchBot surfaces sites in ChatGPT search, and you should allow it if you want to appear. GPTBot crawls content that may be used to train models, and disallowing it opts out of that training. ChatGPT-User fetches pages for user-initiated actions and does not decide search inclusion. OpenAI says robots.txt changes take about 24 hours to take effect for search.

## Perplexity

Perplexity documents two crawlers. PerplexityBot is designed to surface and link sites in Perplexity search results, and Perplexity says it is not used to crawl content for foundation model training. Allow it if you want to be listed. Perplexity-User supports user-initiated visits and, because a person asked for the fetch, generally ignores robots.txt. If you use a firewall, Perplexity advises matching both the user agent and its published IP ranges.

On shopping, Perplexity has described a free merchant program that lets retailers share product data. Its launch material said richer details such as availability, reviews, pricing and specifications make products more likely to be recommended, and pointed large retailers to a sign-up form. We did not find current, detailed eligibility terms on Perplexity's own pages, so treat it as a program to ask about, not one to assume.

## What data they read

Across all three, the inputs are the same few things.

| Input | Why it matters |
|---|---|
| Title and description | Tells a system what the product is and who it suits. Thin supplier copy gives it little to match |
| Attributes (size, material, colour, dimensions, compatibility) | Lets a question like "waterproof, under 500 g" be matched to your product |
| Identifiers (GTIN, MPN, brand) | Separates your product from lookalikes. OpenAI's spec lists brand as required and accepts GTIN or MPN |
| Price and availability | Must match the page. Mismatches are a classic feed disapproval |
| Images | Clear, product-only images in a public URL |
| Reviews and policies | Shipping, returns and review data support merchant listings |
| Structured data | Product and Offer markup consistent with visible content |

If you want to go deeper on the identifier and category side, read our guides on [GTIN, MPN and brand](/guides/gtin-mpn-brand), [product attributes and taxonomy](/guides/product-attributes-taxonomy) and [Google product categories](/guides/google-product-category).

## A practical checklist

1. **Check robots.txt and your firewall.** Allow Googlebot, OAI-SearchBot and PerplexityBot unless you have a reason to block them. A bot-protection rule that blocks unknown crawlers can quietly shut out all three.
2. **Check indexing and snippets.** Use Search Console's URL Inspection on key product pages, and remove any stray `nosnippet` or `noindex`.
3. **Fill every attribute you can.** Material, dimensions, colour, size, compatibility, age group. Write them the same way every time.
4. **Rewrite thin titles and descriptions.** State what it is, who it is for and what it is made of in the first lines. Answer the questions customers email you about.
5. **Add visible FAQs** to product and collection pages, in plain text, from real questions.
6. **Match structured data to the page.** Price, currency, availability and identifiers in Product and Offer markup must equal what the shopper sees.
7. **Clean your Merchant Center feed.** Fix disapprovals first. Our [Merchant Center disapprovals guide](/guides/google-merchant-center-disapprovals) lists the usual causes.
8. **Fill in store policies.** Shipping, returns and privacy pages are required by Shopify for ChatGPT and used by Google for merchant listings.
9. **Join the programs you are eligible for.** Shopify's agentic channel if you qualify, a feed to OpenAI or Perplexity where they accept you.
10. **Measure.** Search Console, Merchant Center's AI performance report, and referrer data for chat tools.

## Documented versus hype

**Documented:** Google says no special optimization is required for AI Overviews. OpenAI and Perplexity publish crawler names and say which to allow for search. OpenAI publishes a feed spec. Shopify documents its ChatGPT channel and its requirements. All of them say eligibility is not a guarantee.

**Not documented, or only claimed by vendors:** that llms.txt changes what any major system shows (Google says AI-specific files are unnecessary); that a particular schema type triggers AI citations; that any service can secure placement; precise ranking factors for AI answers; and claims about traffic uplift. If a vendor cites a percentage, ask for the source.

Be wary too of advice to block crawlers wholesale. GPTBot and OAI-SearchBot are separate crawlers, so blocking training does not need to cost you search visibility, but blocking the wrong one can.

## When to do it yourself and when to hand it off

If your catalog is under a few hundred products and mostly clean, you can work through the checklist above in a weekend. Start with crawler access, attributes and your best sellers, and use Search Console and Merchant Center to see what is broken.

It gets harder with volume: thousands of products with inconsistent attributes, a feed full of warnings, supplier copy pasted in, or several platforms. That is catalog cleanup, and it is what we do. Our [AI search optimization for ecommerce](/ai-search-optimization-ecommerce) service covers attributes, descriptions, structured data fields, feed fixes and crawler checks, quoted after an audit. We cannot promise placement in any AI answer, only better data. For wider SEO work see [ecommerce SEO services](/ecommerce-seo-services), and for feed work alone see [product feed management](/product-feed-management). You can also try a [free 10-product sample](/free-sample).

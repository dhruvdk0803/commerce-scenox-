import type { PriceSet } from "@/lib/markets";
import type { StatusKind } from "@/components/ui/Status";
import type { FAQ } from "./faqs";

/**
 * The productised service menu. Every service is a named product with a
 * fixed scope, a delivery time and a starting price per market.
 * PROPOSED prices, pending sign-off (see also content/pricing.ts).
 */

export type ProductGroup = "catalog" | "channels" | "retention";

export const groups: Record<ProductGroup, { label: string; stage: string; desc: string }> = {
  catalog: { label: "Catalog", stage: "01 / LIST", desc: "Get every product live, clean and complete." },
  channels: { label: "Channels", stage: "02 / SELL EVERYWHERE", desc: "Push the same clean catalog to every place people shop." },
  retention: { label: "Retention", stage: "03 / RECOVER & RETAIN", desc: "Win back carts and turn first orders into repeat buyers." },
};

export type ProductSummary = {
  id: string;
  name: string;
  href: string;
  group: ProductGroup;
  desc: string;
  price: PriceSet;
  unit: string;
  turnaround: string; // always shown with site.qualifier
  isNew?: boolean;
};

export type LedgerRow = { label: string; meta: string; status: StatusKind; statusLabel?: string };

export type ProductPage = ProductSummary & {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: [string, string];
  lead: string;
  facts: { k: string; v: string }[];
  ledger: { heading: string; title: string; note: string; rows: LedgerRow[] };
  /** What happens at hour 0, 12, 24 and 48. */
  timeline: [string, string, string, string];
  deliverables: { title: string; items: string[] };
  edges: { title: string; body: string }[];
  faqs: FAQ[];
  cta: string;
  need: string;
  finalHeading: [string, string];
};

/* ------------------------------------------------------------------ */
/* Existing catalog services (bespoke pages)                           */
/* ------------------------------------------------------------------ */

const existing: ProductSummary[] = [
  {
    id: "upload",
    name: "Catalog Upload",
    href: "/catalog",
    group: "catalog",
    desc: "Spreadsheets and supplier data, live on your store.",
    price: { in: 6999, us: 149, uk: 119, au: 229 },
    unit: "up to 250 products",
    turnaround: "From 48 hours",
  },
  {
    id: "cleanup",
    name: "Catalog Cleanup & Enrichment",
    href: "/catalog-cleanup",
    group: "catalog",
    desc: "Fix what is already online, in bulk.",
    price: { in: 4999, us: 129, uk: 99, au: 199 },
    unit: "up to 250 products",
    turnaround: "From 48 hours",
  },
  {
    id: "migration",
    name: "Platform Migration",
    href: "/migration",
    group: "catalog",
    desc: "Move the store. Not the mess.",
    price: { in: 19999, us: 499, uk: 399, au: 749 },
    unit: "per store",
    turnaround: "From 48 hours",
  },
];

/* ------------------------------------------------------------------ */
/* New products (data-driven pages)                                    */
/* ------------------------------------------------------------------ */

export const productPages: ProductPage[] = [
  {
    id: "imagery",
    name: "AI Product Imagery",
    href: "/product-imagery",
    group: "catalog",
    isNew: true,
    desc: "Clean, consistent product photos from the images you already have.",
    price: { in: 2999, us: 79, uk: 65, au: 119 },
    unit: "per 50 products",
    turnaround: "From 48 hours",
    metaTitle: "AI Product Photo Editing for Ecommerce",
    metaDescription:
      "Background removal, consistent white-background sets, lifestyle scenes and marketplace-ready sizes from your existing product photos. Reviewed by a person before delivery.",
    eyebrow: "AI PRODUCT IMAGERY",
    headline: ["Same products.", "Better photos."],
    lead: "Supplier photos arrive in every size, background and lighting. Our image models cut them out, square them up and produce one consistent set, plus lifestyle scenes where you want them. A person checks every image before it reaches your store.",
    facts: [
      { k: "INPUT", v: "Your existing photos, supplier images or phone shots" },
      { k: "OUTPUT", v: "White-background, lifestyle and marketplace-sized sets" },
      { k: "FORMATS", v: "JPG · PNG · WebP, named by SKU" },
      { k: "CHECKED", v: "Every image reviewed for accuracy to the real product" },
    ],
    ledger: {
      heading: "Every image tracked. Nothing left loose.",
      title: "IMAGE SET · AX-442",
      note: "ILLUSTRATIVE",
      rows: [
        { label: "DSC0041 (2).JPG → ax-442-black-01.jpg", meta: "BG REMOVED", status: "ready" },
        { label: "IMG_99283.jpg → ax-442-black-02.jpg", meta: "SQUARED 2048PX", status: "ready" },
        { label: "Lifestyle: home office scene", meta: "GENERATED", status: "validating", statusLabel: "IN REVIEW" },
        { label: "Amazon main image (pure white)", meta: "1:1 · 2000PX", status: "ready" },
        { label: "Colour check against source", meta: "PASS", status: "published", statusLabel: "PASSED" },
        { label: "ax-442-blue: no source photo", meta: "FLAGGED", status: "missing" },
      ],
    },
    timeline: [
      "You send whatever photos you have.",
      "Backgrounds removed, sets built at every size.",
      "Every image checked against the real product.",
      "Uploaded to your store, named by SKU, with alt text.",
    ],
    deliverables: {
      title: "Every set includes",
      items: [
        "Background removal and clean white backgrounds",
        "Consistent crop, padding, shadow and size across the catalog",
        "Colour and shape checked against the original product",
        "Marketplace-compliant main images (Amazon, Flipkart, Google)",
        "Optional lifestyle and in-context scenes",
        "Files renamed by SKU, alt text written, uploaded to your store",
      ],
    },
    edges: [
      { title: "No invented details.", body: "Models are told to keep the product exactly as photographed: colour, shape, logos, stitching. Anything that drifts is rejected in review, not shipped." },
      { title: "Matched to the catalog.", body: "Images arrive already tied to the right SKU and variant, with alt text, so they drop straight into the store and feeds." },
      { title: "Missing photos flagged.", body: "Products with no usable source image are listed for you, instead of going live with a placeholder." },
    ],
    faqs: [
      { q: "Will the AI change how my product looks?", a: "No. The product itself is kept as photographed. Only the background, framing, lighting and scene change. Every image is compared against the source by a person, and anything inaccurate is redone." },
      { q: "What do you need from me?", a: "Whatever photos you have: supplier images, old shoots or clear phone photos. One clear photo per product is enough for a white-background set; two or three angles give better results." },
      { q: "Can you make lifestyle photos without a photoshoot?", a: "Yes, for most product types. We generate in-context scenes from your product photo. For products where fit or texture matters (apparel on body, for example), we tell you upfront what is realistic." },
      { q: "Are the images marketplace compliant?", a: "Yes. We produce main images that meet Amazon, Flipkart and Google Merchant Center requirements, alongside your store set." },
    ],
    cta: "Fix My Product Photos",
    need: "imagery",
    finalHeading: ["SEND THE PHOTOS.", "GET BACK A CATALOG THAT MATCHES."],
  },
  {
    id: "feeds",
    name: "Feeds & Marketplaces",
    href: "/feeds-marketplaces",
    group: "channels",
    isNew: true,
    desc: "Google Shopping, Meta, Amazon and Flipkart from one clean catalog.",
    price: { in: 7999, us: 199, uk: 159, au: 299 },
    unit: "per channel, one-time setup",
    turnaround: "From 48 hours",
    metaTitle: "Google Shopping, Meta & Marketplace Feed Management",
    metaDescription:
      "Google Merchant Center, Meta catalog, Amazon, Flipkart and eBay listings built from your store catalog. Feed errors and disapprovals fixed, kept in sync as products change.",
    eyebrow: "FEEDS & MARKETPLACES",
    headline: ["One catalog.", "Every channel."],
    lead: "Your store, Google Shopping, Meta ads and marketplaces all need the same products in different formats. We build each feed from your cleaned catalog, fix the errors that get products disapproved, and keep every channel in sync when prices and stock change.",
    facts: [
      { k: "CHANNELS", v: "Google Merchant Center · Meta · Amazon · Flipkart · eBay" },
      { k: "SOURCE", v: "Your Shopify, WooCommerce or custom catalog" },
      { k: "FIXES", v: "Disapprovals, missing GTINs, attribute and policy errors" },
      { k: "SYNC", v: "Price and stock kept matched across channels" },
    ],
    ledger: {
      heading: "Every channel checked. Every error chased.",
      title: "CHANNEL STATUS",
      note: "ILLUSTRATIVE",
      rows: [
        { label: "Google Merchant Center", meta: "1,204 ITEMS", status: "published", statusLabel: "APPROVED" },
        { label: "Meta catalog (Facebook & Instagram)", meta: "1,204 ITEMS", status: "published", statusLabel: "SYNCED" },
        { label: "Amazon: missing GTIN on 38 items", meta: "FIXING", status: "processing" },
        { label: "Flipkart: category attribute mapping", meta: "212 ITEMS", status: "validating" },
        { label: "Out-of-stock items still in ads", meta: "0 FOUND", status: "ready", statusLabel: "CLEAR" },
        { label: "Price mismatch: store vs feed", meta: "0 FOUND", status: "ready", statusLabel: "CLEAR" },
      ],
    },
    timeline: [
      "You connect the store and channel accounts.",
      "Products mapped to each channel’s required fields.",
      "Feeds submitted, errors and disapprovals fixed.",
      "Products approved and syncing on every channel.",
    ],
    deliverables: {
      title: "Every channel setup includes",
      items: [
        "Channel account and catalog connection checked",
        "Product data mapped to that channel's required attributes",
        "Titles and descriptions adapted to channel rules",
        "Errors and disapprovals fixed until items are approved",
        "Price and stock sync rules set up",
        "A handover report of what is live and what needs your input",
      ],
    },
    edges: [
      { title: "Fixed at the source.", body: "Most feed tools patch errors inside the feed. We fix them in the catalog, so the same correction reaches your store, ads and marketplaces at once." },
      { title: "Ready for AI shopping.", body: "Typed attributes, clear titles and complete specs are what Google's AI results and shopping assistants read. We structure your products so they can be found there too." },
      { title: "No ads for products you can't sell.", body: "Stock and price rules stop out-of-stock or mispriced items from being advertised, a common and costly feed leak." },
    ],
    faqs: [
      { q: "Do I need a feed app?", a: "Not necessarily. Many stores can feed Google and Meta directly from Shopify or WooCommerce once the data is right. Where an app or our sync is the better route, we set it up and tell you why." },
      { q: "My products keep getting disapproved on Google. Can you fix that?", a: "Yes. Disapprovals usually come from missing identifiers, policy wording, image problems or price mismatches. We find the cause per item, fix it in the catalog and resubmit." },
      { q: "Can you list my products on Amazon and Flipkart?", a: "Yes. We map your catalog to each marketplace's category templates and attributes and prepare the listings. Seller account approval and brand registration stay with you; we tell you exactly what's needed." },
      { q: "What happens when my prices or stock change?", a: "With the Catalog Ops or Growth Stack plan, we keep every channel in sync. Without a plan, the setup includes the sync rules your platform supports natively." },
    ],
    cta: "Set Up My Channels",
    need: "feeds",
    finalHeading: ["FIX THE CATALOG ONCE.", "SELL IT EVERYWHERE."],
  },
  {
    id: "email",
    name: "Email Marketing & Abandoned Cart",
    href: "/email-marketing",
    group: "retention",
    isNew: true,
    desc: "Cart recovery, welcome, post-purchase and win-back flows that run on their own.",
    price: { in: 12999, us: 349, uk: 279, au: 529 },
    unit: "one-time setup, 8 core flows",
    turnaround: "From 48 hours",
    metaTitle: "Ecommerce Email Marketing & Abandoned Cart Recovery",
    metaDescription:
      "Abandoned cart, checkout, welcome, post-purchase, back-in-stock and win-back email flows for Shopify and WooCommerce stores. Built and run on Scenox infrastructure, or in Klaviyo.",
    eyebrow: "EMAIL & ABANDONED CART",
    headline: ["Most carts don't buy.", "Most can be brought back."],
    lead: "Every store loses carts, and most first-time buyers never order again. We write, design and switch on the email flows that follow up automatically: cart and checkout recovery, welcome, post-purchase, reviews, back-in-stock and win-back. They run on our own sending infrastructure, so there's no separate email platform for you to buy.",
    facts: [
      { k: "FLOWS", v: "8 core flows written, designed and live" },
      { k: "INFRASTRUCTURE", v: "Scenox sending, or your Klaviyo / Shopify Email" },
      { k: "DELIVERABILITY", v: "SPF, DKIM and DMARC set up on your domain" },
      { k: "REPORTING", v: "Revenue recovered, per flow" },
    ],
    ledger: {
      heading: "Set up once. Running every day.",
      title: "FLOWS · LIVE",
      note: "ILLUSTRATIVE",
      rows: [
        { label: "Abandoned checkout · 1h · 24h · 72h", meta: "3 EMAILS", status: "published", statusLabel: "LIVE" },
        { label: "Abandoned cart · 4h · 48h", meta: "2 EMAILS", status: "published", statusLabel: "LIVE" },
        { label: "Browse abandonment", meta: "1 EMAIL", status: "published", statusLabel: "LIVE" },
        { label: "Welcome series", meta: "3 EMAILS", status: "published", statusLabel: "LIVE" },
        { label: "Post-purchase + review request", meta: "2 EMAILS", status: "published", statusLabel: "LIVE" },
        { label: "Back-in-stock & price drop", meta: "TRIGGERED", status: "validating", statusLabel: "TESTING" },
        { label: "Win-back · 60 / 90 days", meta: "2 EMAILS", status: "queued" },
      ],
    },
    timeline: [
      "Store connected, brand assets shared.",
      "All 8 flows drafted: copy, design, timing.",
      "You review and approve every flow.",
      "Domain authenticated and flows switched on.",
    ],
    deliverables: {
      title: "The 8 core flows",
      items: [
        "Abandoned checkout recovery",
        "Abandoned cart recovery",
        "Browse abandonment",
        "Welcome series for new subscribers",
        "Post-purchase and review request",
        "Back-in-stock alerts",
        "Price-drop alerts",
        "Win-back for lapsed customers",
      ],
    },
    edges: [
      { title: "Product data that's actually right.", body: "Recovery emails pull product names, images and prices from the catalog we cleaned. No broken images, no wrong prices, no 'Untitled product'." },
      { title: "No extra platform bill.", body: "Flows run on Scenox sending infrastructure with your domain authenticated. Already on Klaviyo? We build there instead." },
      { title: "Email and WhatsApp together.", body: "If you also use our WhatsApp automation, the two are coordinated so a customer gets one well-timed nudge, not five." },
    ],
    faqs: [
      { q: "Do I have to use Klaviyo?", a: "No. Flows run on our own sending infrastructure by default, connected to your Shopify or WooCommerce store. If you already use Klaviyo or Shopify Email, we build the flows there instead." },
      { q: "Will my emails land in spam?", a: "We set up SPF, DKIM and DMARC on your sending domain, warm up sending gradually and follow consent rules, which is what inbox providers check. No one can promise 100% inbox placement, but these steps are what make the difference." },
      { q: "Who writes the emails?", a: "We do. Copy is drafted with AI from your brand, products and tone, then edited by a person. You approve every flow before it goes live." },
      { q: "How do I know it's working?", a: "You get reporting per flow: sends, clicks, orders and revenue attributed to each flow. With the Retention plan we review and improve the flows every month." },
      { q: "Is it compliant with GDPR and Australian and US email law?", a: "Flows only go to customers who are eligible to receive them, every email has an unsubscribe link, and consent settings follow your market's rules. We'll flag anything in your current setup that needs fixing." },
    ],
    cta: "Recover My Carts",
    need: "email",
    finalHeading: ["STOP LOSING CARTS.", "START KEEPING CUSTOMERS."],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Automation",
    href: "/whatsapp-automation",
    group: "retention",
    isNew: true,
    desc: "Cart recovery, COD confirmation, order updates and broadcasts on WhatsApp.",
    price: { in: 9999, us: 279, uk: 229, au: 429 },
    unit: "one-time setup",
    turnaround: "From 48 hours",
    metaTitle: "WhatsApp Automation for Ecommerce Stores",
    metaDescription:
      "Abandoned cart recovery, COD order confirmation, shipping updates, broadcasts and customer nurture on the official WhatsApp Business API. Built for Shopify and WooCommerce.",
    eyebrow: "WHATSAPP AUTOMATION",
    headline: ["Your customers read WhatsApp.", "Your store should be there."],
    lead: "Messages on WhatsApp get read. We set up the official WhatsApp Business API for your store and switch on the messages that matter: cart recovery, cash-on-delivery confirmation, order and shipping updates, back-in-stock alerts and broadcasts. All on our own messaging infrastructure, with a person ready to take over any conversation.",
    facts: [
      { k: "API", v: "Official WhatsApp Business Platform, verified sender" },
      { k: "INFRASTRUCTURE", v: "Runs on Scenox messaging infrastructure" },
      { k: "COSTS", v: "Meta conversation fees passed through at cost" },
      { k: "HANDOFF", v: "Any chat can be taken over by your team" },
    ],
    ledger: {
      heading: "The right message at the right moment.",
      title: "MESSAGE FLOWS",
      note: "ILLUSTRATIVE",
      rows: [
        { label: "Cart recovery · 30 min after exit", meta: "WITH CART LINK", status: "published", statusLabel: "LIVE" },
        { label: "COD order confirmation · Confirm / Cancel", meta: "BEFORE DISPATCH", status: "published", statusLabel: "LIVE" },
        { label: "COD → prepaid nudge", meta: "OPTIONAL OFFER", status: "published", statusLabel: "LIVE" },
        { label: "Shipped · out for delivery · delivered", meta: "3 UPDATES", status: "published", statusLabel: "LIVE" },
        { label: "Review request after delivery", meta: "+5 DAYS", status: "validating", statusLabel: "TESTING" },
        { label: "Back-in-stock alert", meta: "TRIGGERED", status: "queued" },
      ],
    },
    timeline: [
      "Your business number and Meta account linked.",
      "Message templates written and submitted.",
      "Store events connected and tested end to end.",
      "Cart recovery, COD and order updates live.",
    ],
    deliverables: {
      title: "Every setup includes",
      items: [
        "WhatsApp Business API account and sender verification",
        "Message templates written and submitted for approval",
        "Abandoned cart and checkout recovery",
        "COD order confirmation and COD-to-prepaid nudges",
        "Order, shipping and delivery updates",
        "Opt-in collection on your store, plus broadcast setup",
      ],
    },
    edges: [
      { title: "Fewer fake COD orders.", body: "Cash-on-delivery orders are confirmed on WhatsApp before dispatch, so unconfirmed orders can be held instead of shipped and returned." },
      { title: "Our infrastructure, your number.", body: "Messages go out from your verified business number on our messaging stack. No third-party chat tool subscription to manage." },
      { title: "Automation that knows when to stop.", body: "Replies that need a person, like complaints, sizing questions or order problems, are routed to your team instead of answered by a bot." },
    ],
    faqs: [
      { q: "Is this the official WhatsApp API?", a: "Yes. We use the official WhatsApp Business Platform from Meta, with a verified sender. That's what keeps your number safe from bans that come with unofficial tools." },
      { q: "What does it cost per message?", a: "Meta charges per conversation, and the rate depends on the country and message type. Those fees are passed through at cost, with no markup, and shown in your reporting." },
      { q: "Can I use my existing WhatsApp number?", a: "Usually, yes. A number already on the regular WhatsApp Business app can be moved to the API. We'll walk you through it, and we'll tell you if a new number is the better option." },
      { q: "Will customers get spammed?", a: "No. Messages only go to customers who opted in, marketing broadcasts are capped, and recovery messages stop as soon as an order is placed." },
      { q: "Does this only make sense in India?", a: "COD confirmation is most useful in India, but cart recovery, order updates and broadcasts work in the UK, Australia and the US too, wherever your customers use WhatsApp." },
    ],
    cta: "Set Up WhatsApp",
    need: "whatsapp",
    finalHeading: ["MEET CUSTOMERS", "WHERE THEY ALREADY ARE."],
  },
  {
    id: "support",
    name: "AI Customer Support",
    href: "/ai-customer-support",
    group: "retention",
    isNew: true,
    desc: "Answers order, product and shipping questions 24/7. Hands the rest to your team.",
    price: { in: 9999, us: 279, uk: 229, au: 429 },
    unit: "one-time setup",
    turnaround: "From 48 hours",
    metaTitle: "AI Customer Support for Ecommerce Stores",
    metaDescription:
      "An AI support agent for Shopify and WooCommerce stores that answers order status, product, sizing, shipping and returns questions on web chat and WhatsApp, and hands everything else to your team.",
    eyebrow: "AI CUSTOMER SUPPORT",
    headline: ["Most questions are the same ten.", "Let AI answer them. Instantly."],
    lead: "Where is my order. Does it come in XL. Is COD available. Can I return it. We set up an AI support agent that answers these on your site chat and WhatsApp in seconds, any hour, using your real catalog, policies and order data. Anything sensitive or unusual goes straight to your team with the conversation summarised.",
    facts: [
      { k: "CHANNELS", v: "Website chat · WhatsApp · email" },
      { k: "KNOWS", v: "Your catalog, policies and live order status" },
      { k: "HANDOFF", v: "To your team, with a summary of the conversation" },
      { k: "INFRASTRUCTURE", v: "Runs on Scenox infrastructure, no helpdesk to buy" },
    ],
    ledger: {
      heading: "Answered in seconds. Escalated when it matters.",
      title: "CONVERSATIONS · TODAY",
      note: "ILLUSTRATIVE",
      rows: [
        { label: "“Where is my order #1042?”", meta: "ORDER DATA", status: "published", statusLabel: "ANSWERED" },
        { label: "“Does the AX-442 chair come in blue?”", meta: "CATALOG", status: "published", statusLabel: "ANSWERED" },
        { label: "“Is COD available for 560001?”", meta: "SHIPPING RULES", status: "published", statusLabel: "ANSWERED" },
        { label: "“What is your return window?”", meta: "POLICY", status: "published", statusLabel: "ANSWERED" },
        { label: "“My parcel arrived damaged”", meta: "TO YOUR TEAM", status: "missing", statusLabel: "HANDED OFF" },
        { label: "“Can I get a bulk discount on 40 units?”", meta: "SALES LEAD", status: "validating", statusLabel: "ROUTED" },
      ],
    },
    timeline: [
      "Catalog, policies and store connected.",
      "Agent trained on your data, tone of voice set.",
      "You test it with your real customer questions.",
      "Live on your site chat and WhatsApp.",
    ],
    deliverables: {
      title: "Every setup includes",
      items: [
        "AI agent trained on your catalog, FAQs and policies",
        "Live order-status lookups from your store",
        "Website chat widget and WhatsApp connected",
        "Handoff rules for refunds, complaints and sales leads",
        "Tone of voice matched to your brand",
        "Weekly report of top questions and unanswered gaps",
      ],
    },
    edges: [
      { title: "Answers from a catalog that's actually right.", body: "Support bots fail when product data is wrong. Ours reads the catalog we cleaned, so sizes, colours, materials and stock are accurate." },
      { title: "It doesn't make things up.", body: "The agent only answers from your data and policies. If it isn't sure, it says so and passes the conversation to a person instead of guessing." },
      { title: "Every gap becomes a fix.", body: "Questions it couldn't answer are reported weekly and added to its knowledge, and often point to missing details on the product page too." },
    ],
    faqs: [
      { q: "Will the AI give customers wrong answers?", a: "It answers only from your catalog, policies and order data. When a question falls outside that, or the customer is upset, it hands the conversation to your team with a summary. You approve its knowledge and tone before it goes live." },
      { q: "Can it check order status?", a: "Yes. It connects to your Shopify or WooCommerce store to look up an order by number, email or phone and reply with the current status and tracking." },
      { q: "What happens when it can't answer?", a: "The conversation is routed to your team on WhatsApp, email or your helpdesk, with the customer's question and the conversation so far, so nobody has to start over." },
      { q: "Do I need Gorgias, Zendesk or another helpdesk?", a: "No. It runs on our infrastructure. If you already use a helpdesk, we can hand conversations into it instead." },
      { q: "Can it answer in languages other than English?", a: "Yes. It replies in the language the customer writes in. We test your most common languages during setup." },
    ],
    cta: "Set Up AI Support",
    need: "support",
    finalHeading: ["ANSWER EVERY CUSTOMER.", "IN SECONDS. AT 3 AM."],
  },
];

/** Full menu in display order. */
export const products: ProductSummary[] = [
  ...existing,
  productPages.find((p) => p.id === "imagery")!,
  ...productPages.filter((p) => p.id !== "imagery"),
];

export const productsByGroup = (g: ProductGroup) => products.filter((p) => p.group === g);

/** Things the full stack does that point solutions don't. Used on home, how-it-works, pricing. */
export const advantages: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "One source of truth.",
    body: "The catalog we clean feeds your store, Google, Meta, marketplaces, emails and WhatsApp. Fix a price or a title once and every channel matches.",
  },
  {
    n: "02",
    title: "AI does the volume. People check it.",
    body: "Models do the repetitive work at machine speed. A person reviews every flagged row and approves every flow. That's why we're fast, accurate and priced well below a manual team.",
  },
  {
    n: "03",
    title: "Built for AI shopping.",
    body: "Shoppers increasingly ask Google's AI results and assistants what to buy. Structured attributes and complete specs are what those systems read, so every product we touch is prepared for that.",
  },
  {
    n: "04",
    title: "Problems found before customers find them.",
    body: "Our weekly health scan looks for broken images, missing fields, out-of-stock items still in ads and price mismatches between channels, and fixes them rather than just reporting them.",
  },
  {
    n: "05",
    title: "Our own infrastructure.",
    body: "Email and WhatsApp run on Scenox sending and messaging infrastructure. No stack of separate subscriptions for you to buy, connect and maintain.",
  },
  {
    n: "06",
    title: "Fixed scope. Public prices.",
    body: "Every service is a product with a set scope, delivery time and starting price in your currency. No hourly billing, no 'contact sales' to find out the cost.",
  },
];

---
title: "Shopify 'getaddrinfo: nodename nor servname' Image Error"
heading: "Shopify 'getaddrinfo: nodename nor servname provided, or not known': the fix"
description: "What Shopify's 'getaddrinfo: nodename nor servname provided, or not known' CSV image error means, the URL mistakes behind it, and a broken and fixed row."
category: fixes
service: upload
published: 2026-10-12
updated: 2026-10-12
summary: "'Validation failed: getaddrinfo: nodename nor servname provided, or not known' means the host in an Image Src URL could not be found. The URL is malformed: a missing protocol, a typo in the domain, spaces, or a local path. Use a full public https link to the image."
faqs:
  - q: "What does getaddrinfo mean?"
    a: "It is the system call that looks up a host name. The message says the name in your URL does not resolve, so the problem is in the host part of the link, not the image file itself."
  - q: "Is this the same as the download error?"
    a: "They are related but different. The download error means a fetch failed, often for a missing file. This one means Shopify could not even find the server, which points to a malformed or misspelled URL."
  - q: "Can I use a file path from my computer?"
    a: "No. A path such as C:\\images\\tee.jpg or a file name alone cannot be fetched by Shopify. Images must be at public web addresses."
  - q: "Does the link need http or https?"
    a: "Shopify's help page says to include the protocol at the start. Its CSV guide asks for https links, so use https."
---

Some imports fail with a long, technical message: "Validation failed: getaddrinfo: nodename nor servname provided, or not known". It reads like a server fault, but the cause is almost always in your Image Src column. See the [Shopify CSV import errors guide](/guides/shopify-csv-import-errors) for the other image errors.

## What it means

Before Shopify can download an image it must translate the host name in the URL, such as `cdn.example.com`, into an address. This message says that step failed. Shopify's documentation attributes it to a wrong image URL and recommends including the protocol and using a publicly accessible direct link.

## Causes

1. **No protocol.** The cell contains `cdn.example.com/tee.jpg` with no `https://`.
2. **A typo in the domain**, such as `cdn.exmaple.com`.
3. **Spaces in the URL**, or a line break pasted into the cell.
4. **A local file path or bare file name** such as `tee.jpg` or `C:\photos\tee.jpg`.
5. **A private or internal host**, such as a staging site, an intranet address or `localhost`.
6. **Two URLs in one cell**, separated by a comma or space.
7. **A host that no longer exists**, for example an expired domain or retired CDN.
8. **A placeholder** left in the column, such as `TBD` or `image url here`.

## Broken row and fixed row

Broken:

```csv
Handle,Title,Image Src
tee,Tee,cdn.example.com/tee 1.jpg
mug,Mug,mug-front.jpg
```

Fixed:

```csv
Handle,Title,Image Src
tee,Tee,https://cdn.example.com/tee-1.jpg
mug,Mug,https://cdn.example.com/mug-front.jpg
```

The first row lacks a protocol and has a space. The second only holds a file name, so the importer has no host to look up.

## Step-by-step fix

1. Find the lines the error names, and read the Image Src value on each.
2. Check that it starts with `https://` followed by a real domain.
3. Look for spaces, line breaks and trailing characters. Trim them.
4. Paste the URL into a private browser window. If the image does not load, the host or path is wrong.
5. If the file only exists on your machine or a staging site, upload it to a public host, a CDN or Shopify Files first.
6. Make sure each cell contains one URL. Extra images go on their own rows with the same handle.
7. Remove placeholders and re-import.
8. For the lines that still fail, import without images and add them afterwards.

## Prevention

Build Image Src from two columns: a base URL and a file name. Join them with a formula and the protocol can never be missing. Run a script that requests every URL and logs failures. And keep file names without spaces so no URL needs encoding.

Treat staging hosts with caution. Images that load for you on a company network may be invisible to Shopify.

## When to do it yourself and when to hand it off

If a few URLs are wrong, fix them and import. If you have thousands of images across folders with inconsistent names, getting each one hosted and linked correctly is the larger task. Our [bulk product upload](/bulk-product-upload) service takes images, names them, hosts them and builds the file, and a person reviews every output before you approve it. You can ask for a [free 10-product sample](/free-sample) if your project is a fit.

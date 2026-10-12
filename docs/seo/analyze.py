"""Score Keyword Planner data and map keywords to site pages. Run: python docs/seo/analyze.py"""
import re, os, glob, json
from collections import defaultdict

ROOT = os.path.dirname(os.path.abspath(__file__))
BANDS = {"0": 5, "1": 50, "2": 500, "3": 5000, "4": 50000, "5": 500000, "6": 5000000}
MARKETS = ["US", "UK", "AU", "CA", "IN", "AE"]
WEIGHT = {"US": 1.0, "UK": 0.8, "AU": 0.7, "CA": 0.7, "IN": 0.5, "AE": 0.3}

CORE = re.compile(r"shopify|woocommerce|woo commerce|magento|adobe commerce|bigcommerce|big commerce|wix|squarespace|e-?commerce|product|catalog|catalogue|listing|merchant|feed|amazon|flipkart|meesho|ebay|etsy|walmart|abandon|cart|klaviyo|whatsapp|\bcod\b|cash on delivery|chatbot|chat bot|customer (support|service)|voice|data entry|migrat|replatform|photo|image|background|description|copywrit|seo|online store|store setup|virtual assistant|conversational|sms marketing|email marketing|email automation|gtin|upc|pim|sku")
COMMERCIAL = re.compile(r"\b(service|services|agency|agencies|company|companies|outsourc\w*|hire|hiring an?|expert|experts|consultant|freelanc\w*|virtual assistant|setup service|management|cost|price|pricing|provider|providers|partner|done for you|specialist)\b")
PROBLEM = re.compile(r"\b(how to|csv|import|export|error|errors|disapproved|disapproval|fix|requirements|template|checklist|guide|best practices|bulk|upload|migrate|migration|setup|set up)\b")
TOOLY = re.compile(r"\b(free|app|apps|tool|tools|generator|online|software|plugin|extension|download|ai photo editor|remove bg|photoroom|canva|chatgpt)\b")
OFFTOPIC = re.compile(r"\b(jira|wedding|bridal|registry|crypto|stock photo|wallpaper|resume|tiktok shop|roblox|minecraft|course|courses|certification|jobs?)\b")

def score(row):
    vals = row["bands"]
    vol = sum(BANDS[v] * WEIGHT[m] for m, v in zip(MARKETS, vals) if v != "-")
    kw = row["kw"]
    mult = 1.0
    if COMMERCIAL.search(kw): mult *= 3
    elif PROBLEM.search(kw): mult *= 1.5
    if TOOLY.search(kw): mult *= 0.35
    return vol * mult

def load():
    rows = []
    with open(os.path.join(ROOT, "keywords.tsv"), encoding="utf-8") as f:
        next(f)
        for line in f:
            p = line.rstrip("\n").split("\t")
            if len(p) < 5: continue
            kw, bands, comp, bid, groups = p[0], p[1], p[2], p[3], p[4]
            if len(bands) != 6: continue
            if not CORE.search(kw) or OFFTOPIC.search(kw): continue
            r = {"kw": kw, "bands": list(bands), "comp": comp, "bid": float(bid) if bid else 0, "groups": groups}
            r["score"] = score(r)
            r["intent"] = "commercial" if COMMERCIAL.search(kw) else ("problem" if PROBLEM.search(kw) else "info")
            r["tool"] = bool(TOOLY.search(kw))
            rows.append(r)
    return rows

STOP = set("the a an of for to and in on with your my is are how what best top service services online free".split())
def toks(s): return {w for w in re.findall(r"[a-z0-9]+", s.lower()) if w not in STOP and len(w) > 1}


def load_pages():
    res = []
    for kind, pat, prefix in [("landing", "src/content/landing/*.md", "/"), ("guide", "src/content/guides/*.md", "/guides/")]:
        for fp in glob.glob(os.path.join(ROOT, "..", "..", pat)):
            slug = os.path.basename(fp)[:-3]
            txt = open(fp, encoding="utf-8").read()
            m = re.search(r'^title:\s*"?(.*?)"?\s*$', txt, re.M)
            h = re.search(r'^heading:\s*"?(.*?)"?\s*$', txt, re.M)
            res.append({"path": prefix + slug, "kind": kind, "title": (m.group(1) if m else slug), "t": toks(slug.replace("-", " ") + " " + (m.group(1) if m else "") + " " + (h.group(1) if h else ""))})
    core = {
        "/bulk-product-upload": "bulk product upload catalog listing shopify woocommerce magento bigcommerce",
        "/catalog-cleanup": "catalog cleanup enrichment product data",
        "/store-migration": "store platform migration shopify replatform",
        "/ai-product-photos": "ai product photos imagery photography background white",
        "/product-feed-management": "product feed management google shopping merchant center meta marketplaces",
        "/ecommerce-email-marketing": "ecommerce email marketing abandoned cart klaviyo flows",
        "/whatsapp-automation": "whatsapp automation cod confirmation cart recovery business api",
        "/ai-customer-support": "ai customer support chatbot helpdesk",
        "/ai-voice-shopping-assistant": "ai voice chat shopping assistant agent conversational commerce",
        "/wholesale-catalog": "wholesale distributor catalog b2b",
        "/pricing": "pricing cost price",
    }
    for p, words in core.items():
        res.append({"path": p, "kind": "core", "title": p, "t": toks(words)})
    return res

def best_page(kw, pgs):
    kt = toks(kw)
    if not kt: return None, 0
    best, bs = None, 0
    for p in pgs:
        inter = kt & p["t"]
        if not inter: continue
        s = len(inter) / len(kt)
        if s > bs: best, bs = p, s
    return best, bs

if __name__ == "__main__":
    rows = load()
    pgs = load_pages()
    rows.sort(key=lambda r: -r["score"])
    for r in rows:
        p, s = best_page(r["kw"], pgs)
        r["page"], r["match"] = (p["path"] if p else ""), round(s, 2)
    json.dump(rows, open(os.path.join(ROOT, "scored.json"), "w", encoding="utf-8"))
    print("relevant keywords:", len(rows), "| pages:", len(pgs))
    print("\nTOP 60 (score, bands US UK AU CA IN AE, intent, best page, match)")
    for r in [x for x in rows if not x["tool"]][:60]:
        print(f'{r["score"]:>9.0f}  {"".join(r["bands"])}  {r["intent"][:4]}  {r["kw"][:46]:<46} {r["page"]} {r["match"]}')
    gaps = [r for r in rows if not r["tool"] and r["match"] < 0.67 and r["intent"] in ("commercial", "problem")]
    print("\nTOP 80 GAPS (no strong page match)")
    for r in gaps[:80]:
        print(f'{r["score"]:>9.0f}  {"".join(r["bands"])}  {r["intent"][:4]}  {r["kw"][:50]:<50} ~{r["page"]} {r["match"]}')

OFFSCOPE = re.compile(r"develop|developer|design|ppc|advertis|digital marketing|off page|link building|solidworks|lifecycle|\bpdm\b|opencart|web ?site build|build shopify|theme|jira|consulting compan|plm\b")

def report_scoped():
    rows = json.load(open(os.path.join(ROOT, "scored.json"), encoding="utf-8"))
    scoped = [r for r in rows if not r["tool"] and not OFFSCOPE.search(r["kw"])]
    print("\nIN-SCOPE GAPS: commercial/problem, best page match < 0.67")
    for r in [x for x in scoped if x["match"] < 0.67 and x["intent"] in ("commercial", "problem")][:70]:
        print(f'{r["score"]:>8.0f}  {"".join(r["bands"])}  {r["intent"][:4]}  {r["kw"][:52]:<52} ~{r["page"]}')
    by = defaultdict(list)
    for r in scoped:
        if r["match"] >= 0.67: by[r["page"]].append(r)
    print("\nPAGE -> top 4 keywords it should target (covered)")
    for p, lst in sorted(by.items(), key=lambda kv: -sum(x["score"] for x in kv[1]))[:45]:
        print(p, "|", "; ".join(f'{x["kw"]} ({"".join(x["bands"][:4])})' for x in lst[:4]))

if __name__ == "__main__":
    report_scoped()

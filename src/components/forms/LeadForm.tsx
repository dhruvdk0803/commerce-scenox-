"use client";

import { site } from "@/lib/site";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { track, trackConversion } from "@/lib/analytics";
import { isValidEmail, isValidPhone, isWorkEmail } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { useMarket } from "@/components/market/MarketProvider";
import { ChipGroup, Field, FileDrop, PhoneInput, Select, TextArea, TextInput, fileToBase64, readUtm, focusFirstInvalid } from "./fields";
import { COUNTRIES, MARKET_ISO, NEEDS, NEED_QUERY_MAP, PLATFORMS, PRODUCT_COUNTS, TIER_COUNT_MAP, TIMELINES } from "./options";

const STORAGE_KEY = "scenox.lead.v2";

type Data = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  country: string;
  platform: string;
  productCount: string;
  needs: string[];
  timeline: string;
  notes: string;
};

const empty: Data = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  country: "",
  platform: "",
  productCount: "",
  needs: [],
  timeline: "",
  notes: "",
};

type Errors = Partial<Record<keyof Data | "file", string>>;

function validate(d: Data): Errors {
  const e: Errors = {};
  if (d.fullName.trim().length < 2) e.fullName = "Enter your name.";
  if (!isValidEmail(d.email)) e.email = "Enter a valid email.";
  if (!isValidPhone(d.phone)) e.phone = "Enter your phone or WhatsApp number.";
  if (d.company.trim().length < 2) e.company = "Enter your company or store name.";
  if (d.needs.length === 0) e.needs = "Pick at least one.";
  if (!d.platform) e.platform = "Select your platform.";
  if (!d.productCount) e.productCount = "Pick a rough range.";
  return e;
}

/**
 * One-step quote request. Only what we need to reply with a quote is
 * required; everything else sits behind "Add details".
 */
export function LeadForm() {
  const market = useMarket();
  const params = useSearchParams();
  const reduce = useReducedMotion();
  // Client-only component (see LeadFormLoader): safe to read storage + params lazily.
  const [initial] = useState(() => {
    let saved: Partial<Data> = {};
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw) as Partial<Data>;
    } catch {
      /* ignore */
    }
    const tier = params.get("tier");
    const platform = params.get("platform");
    const needs = [...(saved.needs ?? [])];
    // ?need=imagery,feeds from the estimator, or a single value from a service page
    for (const n of params.get("need")?.split(",") ?? []) {
      if (NEED_QUERY_MAP[n] && !needs.includes(NEED_QUERY_MAP[n])) needs.push(NEED_QUERY_MAP[n]);
    }
    if ((params.get("plan") || params.get("bundle")) && !needs.includes("Monthly plan")) needs.push("Monthly plan");
    const est = params.get("est");
    return {
      ...empty,
      ...saved,
      needs,
      country: saved.country || (COUNTRIES as readonly string[]).find((c) => c === market.label) || "",
      productCount: saved.productCount || (tier && TIER_COUNT_MAP[tier]) || "",
      platform: saved.platform || (platform && PLATFORMS.find((p) => p.toLowerCase() === platform.toLowerCase())) || "",
      notes: saved.notes || (est ? `Estimator: ${est.slice(0, 200)}` : ""),
    } satisfies Data;
  });
  const [data, setData] = useState<Data>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [more, setMore] = useState(() => !!(initial.notes || initial.timeline));
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (status === "success") {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data, status]);

  const set = useCallback(<K extends keyof Data>(k: K, v: Data[K]) => {
    if (!started.current) {
      started.current = true;
      track("form_started", { form: "lead" });
    }
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  }, []);

  const submit = async () => {
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirstInvalid();
      return;
    }
    setStatus("submitting");
    setServerError(null);
    try {
      const body: Record<string, unknown> = {
        kind: "lead",
        ...data,
        country: data.country || market.label,
        sources: [],
        website_confirm: (document.getElementById("website_confirm") as HTMLInputElement | null)?.value ?? "",
        utm: readUtm(),
      };
      if (file) {
        body.sampleFileName = file.name;
        body.sampleFile = { name: file.name, type: file.type, size: file.size, base64: await fileToBase64(file) };
      }
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => ({
        ok: false,
        error:
          res.status === 413
            ? "That file is too large. Keep it under 3 MB, or share a link in the notes."
            : `Something went wrong sending this. Please try again, or email ${site.email}.`,
      }))) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      track("form_submitted", { form: "lead", productCount: data.productCount, platform: data.platform });
      trackConversion("lead", { productCount: data.productCount, platform: data.platform });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        role="status"
      >
        <span className="mono-label flex items-center gap-2 text-success">
          <span className="grid size-5 place-items-center rounded-full bg-success text-white">
            <Check className="size-3" strokeWidth={3} />
          </span>
          RECEIVED
        </span>
        <h2 className="mt-5 text-h2 text-ink">Thanks, {data.fullName.split(" ")[0]}.</h2>
        <p className="mt-4 max-w-[46ch] text-lead text-ink-2">
          We&apos;ll reply by email with a fixed quote and a realistic timeline.
        </p>
        <p className="mt-6 text-[0.9rem] text-ink-2">
          Want it faster?{" "}
          <Link href="/free-sample" className="font-medium text-ink underline underline-offset-2">
            Send 10 products
          </Link>{" "}
          and we&apos;ll quote from your real data.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="grid gap-6"
    >
      {/* honeypot */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website_confirm">Leave this empty</label>
        <input id="website_confirm" name="website_confirm" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.fullName}>
          {(p) => <TextInput {...p} name="fullName" autoComplete="name" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} />}
        </Field>
        <Field
          label="Email"
          error={errors.email}
          hint={data.email && isValidEmail(data.email) && !isWorkEmail(data.email) ? "A work address helps us reply faster." : undefined}
        >
          {(p) => (
            <TextInput {...p} type="email" name="email" inputMode="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
          )}
        </Field>
        <Field label="Phone / WhatsApp" error={errors.phone}>
          {(p) => (
            <PhoneInput
              {...p}
              value={data.phone}
              onChange={(v) => set("phone", v)}
              defaultIso={MARKET_ISO[market.id]}
              onCountry={(c) => set("country", (COUNTRIES as readonly string[]).includes(c) ? c : "Other")}
            />
          )}
        </Field>
        <Field label="Company or store" error={errors.company}>
          {(p) => <TextInput {...p} name="company" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} />}
        </Field>
      </div>

      <Field label="What do you need?" error={errors.needs}>
        {(p) => (
          <ChipGroup
            id={p.id}
            name="needs"
            multiple
            options={NEEDS}
            value={data.needs as (typeof NEEDS)[number][]}
            onChange={(v) => set("needs", v as string[])}
            invalid={p.invalid}
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Platform" error={errors.platform}>
          {(p) => (
            <Select {...p} name="platform" value={data.platform} onChange={(e) => set("platform", e.target.value)}>
              <option value="">Select…</option>
              {PLATFORMS.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field label="Products in your catalog" error={errors.productCount}>
          {(p) => (
            <Select {...p} name="productCount" value={data.productCount} onChange={(e) => set("productCount", e.target.value)}>
              <option value="">Select…</option>
              {PRODUCT_COUNTS.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </div>

      {/* optional extras */}
      <div className="rounded-[10px] border border-line">
        <button
          type="button"
          aria-expanded={more}
          onClick={() => setMore((m) => !m)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
        >
          <span className="text-[0.95rem] font-medium text-ink">
            Add details <span className="font-normal text-ink-3">· website, timeline, notes, sample file</span>
          </span>
          <ChevronDown className={cn("size-4 shrink-0 text-ink-2 transition-transform duration-[200ms]", more && "rotate-180")} strokeWidth={2} aria-hidden />
        </button>
        <AnimatePresence initial={false}>
          {more && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-5 border-t border-line p-4">
                <Field label="Website" optional>
                  {(p) => (
                    <TextInput {...p} name="website" inputMode="url" autoComplete="url" value={data.website} onChange={(e) => set("website", e.target.value)} placeholder="yourstore.com" />
                  )}
                </Field>
                <Field label="Timeline" optional>
                  {(p) => (
                    <ChipGroup
                      id={p.id}
                      name="timeline"
                      options={TIMELINES}
                      value={data.timeline as (typeof TIMELINES)[number]["value"] | ""}
                      onChange={(v) => set("timeline", v as string)}
                      columns={4}
                    />
                  )}
                </Field>
                <Field label="Notes" optional hint="No passwords, please. We arrange access securely after approval.">
                  {(p) => (
                    <TextArea {...p} name="notes" value={data.notes} onChange={(e) => set("notes", e.target.value)} placeholder="e.g. 3 supplier files, images named by SKU, launch on the 20th." />
                  )}
                </Field>
                <Field label="Sample file" optional error={errors.file}>
                  {(p) => (
                    <FileDrop
                      id={p.id}
                      file={file}
                      error={errors.file}
                      onChange={(f, err) => {
                        setFile(f);
                        setErrors((e) => ({ ...e, file: err }));
                      }}
                    />
                  )}
                </Field>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] leading-relaxed text-ink-3">
          No store passwords. We reply with a fixed quote.{" "}
          <Link href="/data-handling" className="underline underline-offset-2 hover:text-ink">
            How we handle data
          </Link>
        </p>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {serverError && (
            <p role="alert" className="text-[0.875rem] text-danger">
              {serverError}
            </p>
          )}
          <Button type="submit" size="lg" arrow loading={status === "submitting"} className="w-full sm:w-auto">
            Get my fixed quote
          </Button>
        </div>
      </div>
    </form>
  );
}

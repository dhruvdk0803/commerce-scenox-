"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { track, trackConversion } from "@/lib/analytics";
import { isValidEmail, isValidPhone, isWorkEmail } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { useMarket } from "@/components/market/MarketProvider";
import {
  ChipGroup,
  Field,
  FileDrop,
  Select,
  StepProgress,
  TextArea,
  TextInput,
  fileToBase64,
  readUtm,
} from "./fields";
import {
  COUNTRIES,
  NEEDS,
  NEED_QUERY_MAP,
  PLATFORMS,
  PRODUCT_COUNTS,
  SOURCES,
  TIER_COUNT_MAP,
  TIMELINES,
} from "./options";

const STEPS = ["Your business", "Your catalog", "What you need", "Upload & submit"] as const;
const STORAGE_KEY = "scenox.lead.v1";

type Data = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  country: string;
  platform: string;
  productCount: string;
  sources: string[];
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
  sources: [],
  needs: [],
  timeline: "",
  notes: "",
};

type Errors = Partial<Record<keyof Data | "file", string>>;

function validateStep(step: number, d: Data): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (d.fullName.trim().length < 2) e.fullName = "Enter your full name.";
    if (!isValidEmail(d.email)) e.email = "Enter a valid work email.";
    if (!isValidPhone(d.phone)) e.phone = "Enter a valid phone number, with country code if outside India.";
    if (d.company.trim().length < 2) e.company = "Enter your company name.";
    if (!d.country) e.country = "Select your country.";
  }
  if (step === 1) {
    if (!d.platform) e.platform = "Select the platform your store runs on.";
    if (!d.productCount) e.productCount = "Roughly how many products?";
    if (d.sources.length === 0) e.sources = "Pick at least one source format.";
  }
  if (step === 2) {
    if (d.needs.length === 0) e.needs = "Select what you need help with.";
    if (!d.timeline) e.timeline = "Select a timeline.";
  }
  return e;
}

export function LeadForm() {
  const market = useMarket();
  const params = useSearchParams();
  const reduce = useReducedMotion();
  // Client-only component (see LeadFormLoader): safe to read storage + params lazily.
  const [initial] = useState(() => {
    let saved: Partial<Data> & { step?: number } = {};
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw) as Partial<Data> & { step?: number };
    } catch {
      /* ignore */
    }
    const need = params.get("need");
    const tier = params.get("tier");
    const platform = params.get("platform");
    const plan = params.get("plan");
    const needs = [...(saved.needs ?? [])];
    if (need && NEED_QUERY_MAP[need] && !needs.includes(NEED_QUERY_MAP[need])) needs.push(NEED_QUERY_MAP[need]);
    if (plan && !needs.includes("Monthly plan")) needs.push("Monthly plan");
    const d: Data = {
      ...empty,
      ...saved,
      needs,
      country: saved.country || (COUNTRIES as readonly string[]).find((c) => c === market.label) || "",
      productCount: saved.productCount || (tier && TIER_COUNT_MAP[tier]) || "",
      platform:
        saved.platform || (platform && PLATFORMS.find((p) => p.toLowerCase() === platform.toLowerCase())) || "",
    };
    return { data: d, step: Math.min(saved.step ?? 0, STEPS.length - 1) };
  });
  const [step, setStep] = useState(initial.step);
  const [dir, setDir] = useState<1 | -1>(1);
  const [data, setData] = useState<Data>(initial.data);
  const [errors, setErrors] = useState<Errors>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  // persist
  useEffect(() => {
    if (status === "success") {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, step }));
    } catch {
      /* ignore */
    }
  }, [data, step, status]);

  const set = useCallback(<K extends keyof Data>(k: K, v: Data[K]) => {
    if (!started.current) {
      started.current = true;
      track("form_started", { form: "lead" });
    }
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  }, []);

  const next = () => {
    const e = validateStep(step, data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    track("form_step_completed", { form: "lead", step: step + 1 });
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    topRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async () => {
    for (let i = 0; i < 3; i++) {
      const e = validateStep(i, data);
      if (Object.keys(e).length) {
        setErrors(e);
        setDir(-1);
        setStep(i);
        return;
      }
    }
    setStatus("submitting");
    setServerError(null);
    try {
      const body: Record<string, unknown> = {
        kind: "lead",
        ...data,
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
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      track("form_submitted", { form: "lead", productCount: data.productCount, platform: data.platform });
      trackConversion("lead", { productCount: data.productCount, platform: data.platform });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const variants = useMemo(
    () => ({
      enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, transform: `translateX(${d * 16}px)` }),
      center: { opacity: 1, transform: "translateX(0px)" },
      exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, transform: `translateX(${d * -16}px)` }),
    }),
    [reduce],
  );

  if (status === "success") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="rounded-[12px] border border-line bg-bg-elevated p-8 md:p-10"
        role="status"
      >
        <span className="mono-label flex items-center gap-2 text-success">
          <span className="grid size-5 place-items-center rounded-full bg-success text-white">
            <Check className="size-3" strokeWidth={3} />
          </span>
          RECEIVED
        </span>
        <h2 className="mt-5 text-h2 text-ink">Catalog received.</h2>
        <p className="mt-4 max-w-[46ch] text-lead text-ink-2">
          We&apos;ll review the information and get back to you with the next step.
        </p>
        <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-line pt-6 text-[0.95rem] sm:grid-cols-2">
          {[
            ["Company", data.company],
            ["Platform", data.platform],
            ["Products", data.productCount],
            ["Timeline", data.timeline],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-line pb-2">
              <dt className="text-ink-3">{k}</dt>
              <dd className="text-right font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[0.85rem] text-ink-3">
          A copy of what you sent is not emailed automatically yet. Reply to our first message if anything changes.
        </p>
      </motion.div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      <StepProgress steps={STEPS} current={step} />

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length - 1) next();
          else void submit();
        }}
        className="mt-8"
      >
        {/* honeypot */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="website_confirm">Leave this empty</label>
          <input id="website_confirm" name="website_confirm" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
            >
              {step === 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full name" error={errors.fullName}>
                    {(p) => (
                      <TextInput
                        {...p}
                        name="fullName"
                        autoComplete="name"
                        value={data.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        aria-describedby={p.describedBy}
                        placeholder="Priya Sharma"
                      />
                    )}
                  </Field>
                  <Field
                    label="Business email"
                    error={errors.email}
                    hint={data.email && isValidEmail(data.email) && !isWorkEmail(data.email) ? "A work address helps us verify the company faster." : undefined}
                  >
                    {(p) => (
                      <TextInput
                        {...p}
                        type="email"
                        name="email"
                        inputMode="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-describedby={p.describedBy}
                        placeholder="you@company.com"
                      />
                    )}
                  </Field>
                  <Field label="Phone / WhatsApp" error={errors.phone}>
                    {(p) => (
                      <TextInput
                        {...p}
                        type="tel"
                        name="phone"
                        inputMode="tel"
                        autoComplete="tel"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+91 …"
                      />
                    )}
                  </Field>
                  <Field label="Company" error={errors.company}>
                    {(p) => (
                      <TextInput
                        {...p}
                        name="company"
                        autoComplete="organization"
                        value={data.company}
                        onChange={(e) => set("company", e.target.value)}
                        aria-describedby={p.describedBy}
                        placeholder="Company name"
                      />
                    )}
                  </Field>
                  <Field label="Website" optional>
                    {(p) => (
                      <TextInput
                        {...p}
                        name="website"
                        inputMode="url"
                        autoComplete="url"
                        value={data.website}
                        onChange={(e) => set("website", e.target.value)}
                        placeholder="yourstore.com"
                      />
                    )}
                  </Field>
                  <Field label="Country" error={errors.country}>
                    {(p) => (
                      <Select
                        {...p}
                        name="country"
                        autoComplete="country-name"
                        value={data.country}
                        onChange={(e) => set("country", e.target.value)}
                        aria-describedby={p.describedBy}
                      >
                        <option value="">Select…</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-8">
                  <Field label="Which platform?" error={errors.platform}>
                    {(p) => (
                      <ChipGroup
                        id={p.id}
                        name="platform"
                        options={PLATFORMS}
                        value={data.platform as (typeof PLATFORMS)[number] | ""}
                        onChange={(v) => set("platform", v as string)}
                        invalid={p.invalid}
                      />
                    )}
                  </Field>
                  <Field label="How many products?" error={errors.productCount} hint="A rough range is fine. We confirm the exact count from your files.">
                    {(p) => (
                      <ChipGroup
                        id={p.id}
                        name="productCount"
                        options={PRODUCT_COUNTS}
                        value={data.productCount as (typeof PRODUCT_COUNTS)[number] | ""}
                        onChange={(v) => set("productCount", v as string)}
                        invalid={p.invalid}
                        columns={4}
                      />
                    )}
                  </Field>
                  <Field label="What does the data look like today?" error={errors.sources} hint="Select everything that applies.">
                    {(p) => (
                      <ChipGroup
                        id={p.id}
                        name="sources"
                        multiple
                        options={SOURCES}
                        value={data.sources as (typeof SOURCES)[number][]}
                        onChange={(v) => set("sources", v as string[])}
                        invalid={p.invalid}
                        columns={4}
                      />
                    )}
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-8">
                  <Field label="What do you need?" error={errors.needs} hint="Select everything that applies.">
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
                  <Field label="Timeline" error={errors.timeline}>
                    {(p) => (
                      <ChipGroup
                        id={p.id}
                        name="timeline"
                        options={TIMELINES}
                        value={data.timeline as (typeof TIMELINES)[number]["value"] | ""}
                        onChange={(v) => set("timeline", v as string)}
                        invalid={p.invalid}
                        columns={4}
                      />
                    )}
                  </Field>
                  <Field label="Anything else we should know?" optional hint="Category depth, image situation, deadlines. No passwords, please.">
                    {(p) => (
                      <TextArea
                        {...p}
                        name="notes"
                        value={data.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="e.g. 3 supplier files with overlapping SKUs, images named by SKU, launch on the 20th."
                      />
                    )}
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
                  <div className="grid gap-8">
                    <Field
                      label="Sample catalog"
                      optional
                      error={errors.file}
                      hint="A few rows are enough. We use it to confirm structure and give an accurate quote."
                    >
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
                    <div className="rounded-[8px] border border-line bg-bg-muted/50 p-4 text-[0.875rem] leading-relaxed text-ink-2">
                      <p className="mono-micro mb-2 text-ink-3">ACCESS & DATA</p>
                      We never ask for store passwords. Publishing access is arranged after project approval using scoped
                      collaborator or staff accounts where supported. Files are used only for your project. Read our{" "}
                      <Link href="/data-handling" className="text-ink underline underline-offset-2">
                        data-handling policy
                      </Link>
                      .
                    </div>
                  </div>

                  {/* summary */}
                  <aside className="rounded-[10px] border border-line bg-bg-elevated p-5">
                    <p className="mono-label text-ink-2">SUMMARY</p>
                    <dl className="mt-4 flex flex-col gap-3 text-[0.875rem]">
                      {[
                        ["Company", data.company],
                        ["Platform", data.platform],
                        ["Products", data.productCount],
                        ["Sources", data.sources.join(", ")],
                        ["Needs", data.needs.join(", ")],
                        ["Timeline", data.timeline],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="mono-micro text-ink-3">{k}</dt>
                          <dd className="mt-1 text-ink">{v || "—"}</dd>
                        </div>
                      ))}
                    </dl>
                  </aside>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="inline-flex h-11 items-center gap-1.5 rounded-[8px] px-3 text-[0.925rem] font-medium text-ink-2 transition-colors hover:bg-bg-muted hover:text-ink"
              >
                <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
                Back
              </button>
            )}
            {serverError && (
              <p role="alert" className="text-[0.875rem] text-danger">
                {serverError}
              </p>
            )}
          </div>
          {step < STEPS.length - 1 ? (
            <Button type="submit" size="lg" arrow className="w-full sm:w-auto">
              Continue
            </Button>
          ) : (
            <Button type="submit" size="lg" arrow loading={status === "submitting"} className={cn("w-full sm:w-auto")}>
              Get My Catalog Reviewed
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

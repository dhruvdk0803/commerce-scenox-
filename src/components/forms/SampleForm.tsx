"use client";

import { useMarket } from "@/components/market/MarketProvider";
import { site } from "@/lib/site";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { track, trackConversion } from "@/lib/analytics";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { ChipGroup, Field, FileDrop, Select, TextArea, TextInput, fileToBase64, readUtm, focusFirstInvalid } from "./fields";
import { PLATFORMS, PRODUCT_COUNTS, SOURCES } from "./options";

type Data = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  platform: string;
  productCount: string;
  sourceFormat: string;
  notes: string;
};

const empty: Data = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  platform: "",
  productCount: "",
  sourceFormat: "",
  notes: "",
};

type Errors = Partial<Record<keyof Data | "file", string>>;

export function SampleForm() {
  const market = useMarket();
  const reduce = useReducedMotion();
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    if (!started.current) {
      started.current = true;
      track("sample_started");
    }
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (data.fullName.trim().length < 2) e.fullName = "Enter your name.";
    if (!isValidEmail(data.email)) e.email = "Enter a valid work email.";
    if (!isValidPhone(data.phone)) e.phone = "Enter a valid phone number, including the country code.";
    if (data.company.trim().length < 2) e.company = "Enter your company name.";
    if (!data.platform) e.platform = "Select a platform.";
    if (!data.productCount) e.productCount = "Roughly how many products in the full catalog?";
    if (!data.sourceFormat) e.sourceFormat = "Select your current source format.";
    return e;
  };

  const submit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirstInvalid();
      return;
    }
    setStatus("submitting");
    setServerError(null);
    try {
      const body: Record<string, unknown> = {
        kind: "sample",
        ...data,
        website_confirm: (document.getElementById("website_confirm_s") as HTMLInputElement | null)?.value ?? "",
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
      track("sample_submitted", { platform: data.platform, productCount: data.productCount });
      trackConversion("sample", { platform: data.platform });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="rounded-[12px] border border-line bg-bg-elevated p-8"
      >
        <span className="mono-label flex items-center gap-2 text-success">
          <span className="grid size-5 place-items-center rounded-full bg-success text-white">
            <Check className="size-3" strokeWidth={3} />
          </span>
          SAMPLE RECEIVED
        </span>
        <h2 className="mt-5 text-h3 text-ink">We&apos;ll take a look.</h2>
        <p className="mt-3 max-w-[44ch] text-[1rem] leading-relaxed text-ink-2">
          We review the structure of every sample by hand. If it&apos;s a fit, you&apos;ll get back a small processed
          set and a note on how we&apos;d approach the full catalog.
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
      className="grid gap-8"
    >
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website_confirm_s">Leave this empty</label>
        <input id="website_confirm_s" name="website_confirm" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="grid gap-5">
        <legend className="mono-label mb-4 text-ink-2">01 · YOU</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" error={errors.fullName}>
            {(p) => (
              <TextInput {...p} name="fullName" autoComplete="name" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} aria-describedby={p.describedBy} />
            )}
          </Field>
          <Field label="Work email" error={errors.email}>
            {(p) => (
              <TextInput {...p} type="email" name="email" inputMode="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} aria-describedby={p.describedBy} />
            )}
          </Field>
          <Field label="Phone / WhatsApp" error={errors.phone}>
            {(p) => (
              <TextInput {...p} type="tel" name="phone" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder={`${market.dial} …`} />
            )}
          </Field>
          <Field label="Company" error={errors.company}>
            {(p) => (
              <TextInput {...p} name="company" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} aria-describedby={p.describedBy} />
            )}
          </Field>
          <Field label="Website" optional>
            {(p) => (
              <TextInput {...p} name="website" inputMode="url" autoComplete="url" value={data.website} onChange={(e) => set("website", e.target.value)} placeholder="yourstore.com" />
            )}
          </Field>
        </div>
      </fieldset>

      <fieldset className="grid gap-6 border-t border-line pt-8">
        <legend className="mono-label float-left mb-4 text-ink-2">02 · THE CATALOG</legend>
        <div className="clear-both grid gap-6">
          <Field label="Platform" error={errors.platform}>
            {(p) => (
              <ChipGroup id={p.id} name="platform" options={PLATFORMS} value={data.platform as (typeof PLATFORMS)[number] | ""} onChange={(v) => set("platform", v as string)} invalid={p.invalid} />
            )}
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Products in the full catalog" error={errors.productCount}>
              {(p) => (
                <Select {...p} name="productCount" value={data.productCount} onChange={(e) => set("productCount", e.target.value)} aria-describedby={p.describedBy}>
                  <option value="">Select…</option>
                  {PRODUCT_COUNTS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
            <Field label="Current source format" error={errors.sourceFormat}>
              {(p) => (
                <Select {...p} name="sourceFormat" value={data.sourceFormat} onChange={(e) => set("sourceFormat", e.target.value)} aria-describedby={p.describedBy}>
                  <option value="">Select…</option>
                  {SOURCES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
          </div>
        </div>
      </fieldset>

      <fieldset className="grid gap-6 border-t border-line pt-8">
        <legend className="mono-label float-left mb-4 text-ink-2">03 · THE SAMPLE</legend>
        <div className="clear-both grid gap-6">
          <Field label="Sample file" optional error={errors.file} hint="10 rows is plenty. CSV or Excel is ideal, but send what you have.">
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
          <Field label="Notes" optional>
            {(p) => (
              <TextArea {...p} name="notes" value={data.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Where the data comes from, what the store should look like, anything unusual." />
            )}
          </Field>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[0.8rem] leading-relaxed text-ink-3">
          <p>No store passwords required.</p>
          <p>Sample eligibility depends on project fit.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {serverError && (
            <p role="alert" className="text-[0.875rem] text-danger">
              {serverError}
            </p>
          )}
          <Button type="submit" size="lg" arrow loading={status === "submitting"} className="w-full sm:w-auto">
            Process My Sample
          </Button>
        </div>
      </div>
    </form>
  );
}

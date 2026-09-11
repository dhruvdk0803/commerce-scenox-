"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { track, trackConversion } from "@/lib/analytics";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { ChipGroup, Field, TextArea, TextInput, readUtm } from "./fields";

const TOPICS = ["New catalog upload", "Catalog cleanup", "Migration", "Ongoing operations", "Partnership / agency", "Something else"] as const;

type Data = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  topic: string;
  message: string;
};

const empty: Data = { fullName: "", email: "", phone: "", company: "", website: "", topic: "", message: "" };
type Errors = Partial<Record<keyof Data, string>>;

export function ContactForm() {
  const reduce = useReducedMotion();
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    if (!started.current) {
      started.current = true;
      track("form_started", { form: "contact" });
    }
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (data.fullName.trim().length < 2) e.fullName = "Enter your name.";
    if (!isValidEmail(data.email)) e.email = "Enter a valid work email.";
    if (!isValidPhone(data.phone)) e.phone = "Enter a valid phone number, with country code if outside India.";
    if (data.company.trim().length < 2) e.company = "Enter your company name.";
    if (!data.topic) e.topic = "Pick the closest topic.";
    if (data.message.trim().length < 10) e.message = "Tell us a little more about what you need.";
    return e;
  };

  const submit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          ...data,
          website_confirm: (document.getElementById("website_confirm_c") as HTMLInputElement | null)?.value ?? "",
          utm: readUtm(),
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      track("form_submitted", { form: "contact", topic: data.topic });
      trackConversion("lead", { form: "contact", topic: data.topic });
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
          MESSAGE RECEIVED
        </span>
        <h2 className="mt-5 text-h3 text-ink">Thanks, {data.fullName.split(" ")[0]}.</h2>
        <p className="mt-3 max-w-[44ch] text-[1rem] leading-relaxed text-ink-2">
          We reply to every enquiry. Expect a reply by email, or a call on the number you gave us if that is quicker.
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
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website_confirm_c">Leave this empty</label>
        <input id="website_confirm_c" name="website_confirm" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName}>
          {(p) => <TextInput {...p} name="fullName" autoComplete="name" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} />}
        </Field>
        <Field label="Work email" error={errors.email}>
          {(p) => <TextInput {...p} type="email" name="email" inputMode="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} />}
        </Field>
        <Field label="Phone / WhatsApp" error={errors.phone}>
          {(p) => <TextInput {...p} type="tel" name="phone" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 …" />}
        </Field>
        <Field label="Company" error={errors.company}>
          {(p) => <TextInput {...p} name="company" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} />}
        </Field>
        <Field label="Website" optional className="sm:col-span-2">
          {(p) => <TextInput {...p} name="website" inputMode="url" autoComplete="url" value={data.website} onChange={(e) => set("website", e.target.value)} placeholder="yourstore.com" />}
        </Field>
      </div>

      <Field label="What is it about?" error={errors.topic}>
        {(p) => (
          <ChipGroup id={p.id} name="topic" options={TOPICS} value={data.topic as (typeof TOPICS)[number] | ""} onChange={(v) => set("topic", v as string)} invalid={p.invalid} />
        )}
      </Field>

      <Field label="Message" error={errors.message} hint="Catalog size, platform, timing, anything unusual. No passwords, please.">
        {(p) => <TextArea {...p} name="message" value={data.message} onChange={(e) => set("message", e.target.value)} placeholder="e.g. 3,000 SKUs on WooCommerce, supplier sends Excel monthly, want to move to Shopify before November." />}
      </Field>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] leading-relaxed text-ink-3">No store passwords required. We reply to every enquiry.</p>
        <div className="flex flex-col items-end gap-2">
          {serverError && (
            <p role="alert" className="text-[0.875rem] text-danger">
              {serverError}
            </p>
          )}
          <Button type="submit" size="lg" arrow loading={status === "submitting"} className="w-full sm:w-auto">
            Send Message
          </Button>
        </div>
      </div>
    </form>
  );
}

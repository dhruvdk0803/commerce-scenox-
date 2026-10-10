"use client";

import { useId, useRef, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { Check, ChevronDown, FileUp, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DIAL_CODES, type DialIso } from "./options";

/* ------------------------------------------------------------------ */
/* wrapper                                                              */
/* ------------------------------------------------------------------ */

export function Field({
  label,
  hint,
  error,
  optional,
  children,
  id,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
  id?: string;
  className?: string;
}) {
  const auto = useId();
  const fid = id ?? auto;
  const hintId = hint ? `${fid}-hint` : undefined;
  const errId = error ? `${fid}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={fid} className="text-[0.9rem] font-medium tracking-[-0.01em] text-ink">
          {label}
        </label>
        {optional && <span className="mono-micro text-ink-3">OPTIONAL</span>}
      </div>
      {children({ id: fid, describedBy, invalid: !!error })}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key="err"
            id={errId}
            role="alert"
            initial={{ opacity: 0, transform: "translateY(-2px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="text-[0.85rem] text-danger"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p key="hint" id={hintId} className="text-[0.85rem] text-ink-3">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* inputs                                                               */
/* ------------------------------------------------------------------ */

const inputBase =
  "h-12 w-full rounded-[8px] border bg-bg-elevated px-3.5 text-[1rem] text-ink placeholder:text-ink-3 transition-[border-color,box-shadow] duration-[160ms] outline-none focus:border-ink focus:ring-2 focus:ring-ink/10 disabled:opacity-50";

type FieldBits = { invalid?: boolean; describedBy?: string };

export function TextInput({
  invalid,
  describedBy,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & FieldBits) {
  return (
    <input
      className={cn(inputBase, invalid ? "border-danger focus:border-danger focus:ring-danger/10" : "border-line", className)}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      {...rest}
    />
  );
}

export function TextArea({
  invalid,
  describedBy,
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldBits) {
  return (
    <textarea
      className={cn(
        inputBase,
        "h-auto min-h-[7rem] resize-y py-3 leading-relaxed",
        invalid ? "border-danger" : "border-line",
        className,
      )}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      {...rest}
    />
  );
}

export function Select({
  invalid,
  describedBy,
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & FieldBits) {
  return (
    <div className="relative">
      <select
        className={cn(inputBase, "appearance-none pr-10", invalid ? "border-danger" : "border-line", className)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-2"
        strokeWidth={2}
        aria-hidden
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* phone with country code                                              */
/* ------------------------------------------------------------------ */

/** Longest matching dial prefix wins (+353 before +35…); on a tie (+1 for US and Canada) prefer `hint`. */
function matchDial(v: string, hint: DialIso) {
  const sorted = [...DIAL_CODES].sort((a, b) => b.dial.length - a.dial.length);
  const hit = sorted.filter((d) => v.startsWith(d.dial));
  if (!hit.length) return null;
  const best = hit.filter((d) => d.dial === hit[0].dial);
  return best.find((d) => d.iso === hint) ?? best[0];
}

/**
 * Country-code picker + number. Emits one string, e.g. "+44 7700 900123", so
 * the server and validators keep working with a single `phone` field.
 */
export function PhoneInput({
  value,
  onChange,
  defaultIso,
  onCountry,
  id,
  invalid,
  describedBy,
  name = "phone",
}: {
  value: string;
  onChange: (v: string) => void;
  defaultIso: DialIso;
  /** Called with the country name when the visitor picks a code. */
  onCountry?: (name: string) => void;
  id?: string;
  invalid?: boolean;
  describedBy?: string;
  name?: string;
}) {
  const [iso, setIso] = useState<DialIso>(() => matchDial(value, defaultIso)?.iso ?? defaultIso);
  const entry = DIAL_CODES.find((d) => d.iso === iso) ?? DIAL_CODES[0];
  const local = value.startsWith(entry.dial) ? value.slice(entry.dial.length).trimStart() : value.replace(/^\+\d*\s?/, "");

  const emit = (dial: string, num: string) => onChange(num.trim() ? `${dial} ${num.trimStart()}` : "");

  return (
    <div
      className={cn(
        "flex h-12 w-full overflow-hidden rounded-[8px] border bg-bg-elevated transition-[border-color,box-shadow] duration-[160ms] focus-within:ring-2",
        invalid ? "border-danger focus-within:ring-danger/10" : "border-line focus-within:border-ink focus-within:ring-ink/10",
      )}
    >
      <div className="relative w-[6.75rem] shrink-0 border-r border-line">
        <select
          aria-label="Country code"
          value={iso}
          onChange={(e) => {
            const next = DIAL_CODES.find((d) => d.iso === e.target.value)!;
            setIso(next.iso);
            emit(next.dial, local);
            onCountry?.(next.name);
          }}
          className="h-full w-[6.75rem] appearance-none bg-transparent pl-3 pr-7 font-mono text-[0.9rem] text-transparent outline-none"
        >
          {DIAL_CODES.map((d) => (
            <option key={d.iso} value={d.iso}>
              {d.iso} {d.dial} · {d.name}
            </option>
          ))}
        </select>
        {/* the closed select shows only "IN +91"; the full name lives in the list */}
        <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center gap-1 bg-bg-elevated pl-3 pr-7 font-mono text-[0.9rem] text-ink">
          <span className="text-ink-3">{entry.iso}</span> {entry.dial}
        </span>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-ink-2" strokeWidth={2} aria-hidden />
      </div>
      <input
        id={id}
        type="tel"
        name={name}
        inputMode="tel"
        autoComplete="tel-national"
        value={local}
        onChange={(e) => {
          const raw = e.target.value;
          // pasted a full international number: switch the code to match
          if (raw.trim().startsWith("+")) {
            const m = matchDial(raw.trim(), iso);
            if (m) {
              setIso(m.iso);
              emit(m.dial, raw.trim().slice(m.dial.length));
              if (m.iso !== iso) onCountry?.(m.name);
              return;
            }
          }
          emit(entry.dial, raw);
        }}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        placeholder="Phone number"
        className="h-full w-0 min-w-0 flex-1 bg-transparent px-3.5 text-[1rem] text-ink outline-none placeholder:text-ink-3"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* chip group (single or multi)                                         */
/* ------------------------------------------------------------------ */

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  multiple,
  name,
  id,
  invalid,
  columns = "auto",
}: {
  options: readonly T[] | readonly { value: T; label: string; meta?: string }[];
  value: T | T[] | "";
  onChange: (v: T | T[]) => void;
  multiple?: boolean;
  name: string;
  id?: string;
  invalid?: boolean;
  columns?: "auto" | 2 | 3 | 4;
}) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o)) as {
    value: T;
    label: string;
    meta?: string;
  }[];
  const selected = (v: T) => (Array.isArray(value) ? value.includes(v) : value === v);

  const toggle = (v: T) => {
    if (multiple) {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    } else {
      onChange(v);
    }
  };

  return (
    <div
      id={id}
      role={multiple ? "group" : "radiogroup"}
      aria-invalid={invalid || undefined}
      className={cn(
        "grid gap-2",
        columns === "auto" && "grid-cols-2 sm:grid-cols-3",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-2 sm:grid-cols-3",
        columns === 4 && "grid-cols-2 sm:grid-cols-4",
      )}
    >
      {opts.map((o) => {
        const on = selected(o.value);
        return (
          <button
            key={o.value}
            type="button"
            role={multiple ? "checkbox" : "radio"}
            aria-checked={on}
            name={name}
            onClick={() => toggle(o.value)}
            className={cn(
              "group flex min-h-[44px] items-center justify-between gap-3 rounded-[8px] border px-3 py-2.5 text-left text-[0.925rem] leading-tight transition-[border-color,background-color,transform] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.985]",
              on
                ? "border-ink bg-ink text-paper"
                : invalid
                  ? "border-danger/50 bg-bg-elevated text-ink hover:border-ink"
                  : "border-line bg-bg-elevated text-ink hover:border-line-strong",
            )}
          >
            <span className="flex flex-col">
              <span className="font-medium tracking-[-0.01em]">{o.label}</span>
              {o.meta && (
                <span className={cn("mono-micro mt-1", on ? "text-paper-2" : "text-ink-3")}>{o.meta}</span>
              )}
            </span>
            <span
              aria-hidden
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-[4px] border transition-colors duration-[160ms]",
                on ? "border-paper/40 bg-paper text-ink" : "border-line-strong",
                !multiple && "rounded-full",
              )}
            >
              <Check className={cn("size-3", on ? "opacity-100" : "opacity-0")} strokeWidth={3} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* file drop (optional sample)                                          */
/* ------------------------------------------------------------------ */

/**
 * Focus the first invalid field after React has rendered the error state.
 * Chip groups mark a wrapper div invalid, so focus its first button instead.
 */
export function focusFirstInvalid() {
  requestAnimationFrame(() => {
    const el = document.querySelector<HTMLElement>("[aria-invalid='true']");
    if (!el) return;
    const target = el.matches("input, select, textarea, button") ? el : el.querySelector<HTMLElement>("button, input, select, textarea");
    target?.focus();
  });
}

export const MAX_FILE_BYTES = 3 * 1024 * 1024; // base64 inflates ~33%; keeps requests under Vercel's 4.5 MB body limit
export const ACCEPTED = ".csv,.xlsx,.xls,.pdf,.zip,.json,.txt";

export function FileDrop({
  file,
  onChange,
  id,
  error,
}: {
  file: File | null;
  onChange: (f: File | null, err?: string) => void;
  id?: string;
  error?: string;
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  const accept = (f: File | undefined) => {
    if (!f) return;
    if (f.size > MAX_FILE_BYTES) {
      onChange(null, "That file is over 3 MB. Send a smaller sample, or share a link in the notes.");
      return;
    }
    onChange(f);
  };

  const fmt = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`);

  return (
    <div>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPTED}
        className="sr-only"
        onChange={(e) => accept(e.target.files?.[0])}
      />
      <AnimatePresence mode="wait" initial={false}>
        {file ? (
          <motion.div
            key="file"
            initial={reduce ? false : { opacity: 0, transform: "translateY(4px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-[8px] border border-line bg-bg-elevated px-3.5 py-3"
          >
            <span className="mono-micro grid h-6 w-11 shrink-0 place-items-center rounded-[4px] border border-line bg-bg-muted text-ink-2">
              {file.name.split(".").pop()?.toUpperCase().slice(0, 4) ?? "FILE"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[0.85rem] text-ink">{file.name}</p>
              <p className="mono-micro mt-1 text-ink-3 tabular">{fmt(file.size)} · ATTACHED</p>
            </div>
            <button
              type="button"
              aria-label="Remove file"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="grid size-8 place-items-center rounded-[6px] text-ink-2 hover:bg-bg-muted hover:text-ink"
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="drop"
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              accept(e.dataTransfer.files?.[0]);
            }}
            initial={false}
            className={cn(
              "flex w-full items-center gap-3 rounded-[8px] border border-dashed px-3.5 py-4 text-left transition-[border-color,background-color] duration-[160ms]",
              drag ? "border-accent bg-accent-soft" : error ? "border-danger" : "border-line-strong bg-bg-elevated hover:border-ink",
            )}
          >
            <FileUp className="size-5 shrink-0 text-ink-2" strokeWidth={1.75} aria-hidden />
            <span className="flex flex-col">
              <span className="text-[0.925rem] font-medium text-ink">
                Drop a sample file, or <span className="underline underline-offset-2">browse</span>
              </span>
              <span className="mono-micro mt-1.5 text-ink-3">CSV · XLSX · PDF · ZIP · UP TO 3 MB</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* progress                                                             */
/* ------------------------------------------------------------------ */

export function StepProgress({
  steps,
  current,
}: {
  steps: readonly string[];
  current: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="mono-label text-ink-2">
          STEP <span className="text-ink tabular">{String(current + 1).padStart(2, "0")}</span>
          <span className="text-ink-3"> / {String(steps.length).padStart(2, "0")}</span>
        </span>
        <span className="mono-label text-ink-3">{steps[current].toUpperCase()}</span>
      </div>
      <ol className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((s, i) => (
          <li key={s} className="relative h-[3px] overflow-hidden rounded-full bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-accent"
              initial={false}
              animate={{ width: i < current ? "100%" : i === current ? "100%" : "0%", opacity: i <= current ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* helpers                                                              */
/* ------------------------------------------------------------------ */

export async function fileToBase64(f: File): Promise<string> {
  const buf = await f.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function readUtm(): Record<string, string> | undefined {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref", "need", "tier"].forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v;
  });
  return Object.keys(out).length ? out : undefined;
}

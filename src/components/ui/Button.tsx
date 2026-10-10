"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "dark" | "outline" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  event?: AnalyticsEvent;
  eventParams?: Record<string, string | number | boolean | undefined>;
  loading?: boolean;
};

type AsLink = Common & { href: string; onClick?: () => void };
type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = AsLink | AsButton;

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] font-medium tracking-[-0.01em] select-none arrow-nudge transition-[background-color,color,border-color,transform] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover",
  dark:
    "bg-ink text-paper hover:bg-[#232527]",
  outline:
    "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-white/40",
  ghost:
    "bg-transparent text-ink hover:bg-bg-muted",
  inverse:
    "bg-paper text-ink hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.9rem]",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[52px] px-6 text-[1rem]",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      arrow = false,
      className,
      children,
      event,
      eventParams,
      loading,
      ...rest
    } = props as ButtonProps & { [k: string]: unknown };

    const classes = cn(base, variants[variant], sizes[size], className);

    const content = (
      <>
        <span
          className={cn(
            "inline-flex items-center gap-2 transition-opacity duration-200",
            loading && "opacity-0",
          )}
        >
          {children}
          {arrow && (
            <ArrowRight
              className="arrow size-[1.05em] shrink-0"
              strokeWidth={2}
              aria-hidden
            />
          )}
        </span>
        {loading && (
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center"
          >
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-current anim-pulse-dot" />
              <span className="size-1.5 rounded-full bg-current anim-pulse-dot [animation-delay:150ms]" />
              <span className="size-1.5 rounded-full bg-current anim-pulse-dot [animation-delay:300ms]" />
            </span>
          </span>
        )}
      </>
    );

    const fire = () => {
      if (event) track(event, eventParams);
    };

    if ("href" in props && typeof props.href === "string") {
      const { href, onClick } = props as AsLink;
      const isExternal = href.startsWith("http");
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          onClick={() => {
            fire();
            onClick?.();
          }}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </Link>
      );
    }

    const { onClick, type = "button", ...buttonRest } =
      rest as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        aria-busy={loading || undefined}
        onClick={(e) => {
          fire();
          onClick?.(e);
        }}
        {...buttonRest}
      >
        {content}
      </button>
    );
  },
);

/** Understated text CTA with directional arrow. */
export function TextLink({
  href,
  children,
  className,
  inverse,
  event,
  eventParams,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  inverse?: boolean;
  event?: AnalyticsEvent;
  eventParams?: Record<string, string | number | boolean | undefined>;
}) {
  return (
    <Link
      href={href}
      onClick={() => event && track(event, eventParams)}
      className={cn(
        "group inline-flex items-center gap-1.5 font-medium tracking-[-0.01em] arrow-nudge",
        inverse ? "text-paper" : "text-ink",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight className="arrow size-4" strokeWidth={2} aria-hidden />
    </Link>
  );
}

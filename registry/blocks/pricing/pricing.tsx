import type { ComponentProps, ReactNode } from "react";

import { Badge } from "../../components/badge/badge";
import { cn } from "../../lib/cn";

export function Pricing({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      data-slot="pricing"
      className={cn("mx-auto w-full max-w-5xl px-4 py-16 sm:py-24", className)}
      {...props}
    />
  );
}

export function PricingHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="pricing-header"
      className={cn(
        "mx-auto mb-8 flex max-w-2xl flex-col items-center gap-3 text-center",
        className,
      )}
      {...props}
    />
  );
}

export function PricingTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    // The heading is the caller's own text, passed in as children.
    // oxlint-disable-next-line jsx-a11y/heading-has-content
    <h2
      data-slot="pricing-title"
      className={cn("text-3xl font-semibold tracking-tight text-balance sm:text-4xl", className)}
      {...props}
    />
  );
}

export function PricingDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="pricing-description"
      className={cn("text-base text-pretty text-muted-foreground", className)}
      {...props}
    />
  );
}

export interface PricingToggleProps {
  annual: boolean;
  onAnnualChange: (annual: boolean) => void;
  monthlyLabel?: string;
  annualLabel?: string;
  /** Small note on the annual option, e.g. "Save 20%". */
  annualNote?: string;
}

/**
 * Controlled on purpose: the prices are the caller's to compute, so the toggle
 * never has to know what a tier costs.
 */
export function PricingToggle({
  annual,
  onAnnualChange,
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  annualNote,
}: PricingToggleProps) {
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 p-1"
    >
      <button
        type="button"
        aria-pressed={!annual}
        onClick={() => onAnnualChange(false)}
        className={cn(
          "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
          !annual
            ? "bg-background text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {monthlyLabel}
      </button>
      <button
        type="button"
        aria-pressed={annual}
        onClick={() => onAnnualChange(true)}
        className={cn(
          "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
          annual
            ? "bg-background text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {annualLabel}
        {annualNote ? <span className="text-xs text-brand">{annualNote}</span> : null}
      </button>
    </div>
  );
}

export function PricingGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="pricing-grid"
      className={cn("mt-10 grid gap-4 md:grid-cols-3", className)}
      {...props}
    />
  );
}

export interface PricingTierProps extends Omit<ComponentProps<"div">, "children"> {
  name: string;
  /** What the period costs, e.g. "$24". */
  price: string;
  /** What that price is measured in, e.g. "per seat, per month". */
  period?: string;
  description?: ReactNode;
  features: string[];
  /** A stronger border and a label. Deliberately not a coloured card. */
  featured?: boolean;
  /** The call to action, usually a `Button`. */
  children?: ReactNode;
}

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        d="m3.5 8.5 3 3 6-6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function PricingTier({
  name,
  price,
  period,
  description,
  features,
  featured = false,
  className,
  children,
  ...props
}: PricingTierProps) {
  return (
    <div
      data-slot="pricing-tier"
      className={cn(
        "flex flex-col gap-5 rounded-xl border bg-card p-6",
        featured ? "border-foreground/20 shadow-md" : "border-border shadow-xs",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">{name}</h3>
        {featured ? <Badge variant="brand">Most popular</Badge> : null}
      </div>

      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}

      <p className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight">{price}</span>
        {period ? <span className="text-sm text-muted-foreground">{period}</span> : null}
      </p>

      <ul className="grid gap-2.5 border-t border-border pt-5 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">{children}</div>
    </div>
  );
}

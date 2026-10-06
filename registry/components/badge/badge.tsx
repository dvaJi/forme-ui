import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

export type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "destructive";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

// Chromatic badges are a tint with ink text rather than a coloured label: at
// eleven pixels a saturated chip reads as decoration, not information. Put a
// dot or an icon inside the badge when the state has to be obvious at a glance.
const variants = {
  neutral: "border-transparent bg-secondary text-secondary-foreground",
  brand: "border-transparent bg-brand-subtle text-brand-strong",
  success: "border-success/25 bg-success/10 text-foreground",
  warning: "border-warning/25 bg-warning/10 text-foreground",
  destructive: "border-destructive/25 bg-destructive/10 text-foreground",
} satisfies Record<BadgeVariant, string>;

const sizes = {
  sm: "h-5 gap-1 px-1.5 text-[0.6875rem] leading-none",
  md: "h-6 gap-1.5 px-2 text-xs leading-none",
} satisfies Record<BadgeSize, string>;

export function Badge({ className, variant = "neutral", size = "md", ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full border font-medium whitespace-nowrap transition-colors [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

"use client";

import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

export function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("relative inline-flex items-center gap-1 border-b border-border", className)}
      {...props}
    />
  );
}

/**
 * The underline.
 *
 * Base UI measures the selected tab and writes the result into CSS custom
 * properties — `--active-tab-left`, `--active-tab-width` and four more — so the
 * indicator positions itself from those. The previous version of this component
 * did that measurement itself: a `MutationObserver` watching `data-state` on the
 * triggers, because the list does not re-render when the selection moves. That
 * observer is the whole reason this file used to need `"use client"`, a `ref`, a
 * `ResizeObserver` and `motion`.
 *
 * Now the primitive owns the measurement and this is a positioned span with a
 * transition on `left` and `width`. Those two properties are animatable, so the
 * underline glides; the custom properties they read from are not animatable
 * themselves, and do not need to be.
 *
 * `renderBeforeHydration` so the underline is present on a server-rendered page
 * rather than appearing a frame late.
 */
export function TabsIndicator({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Indicator>) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      renderBeforeHydration
      className={cn(
        "pointer-events-none absolute bottom-0 left-(--active-tab-left) h-0.5 w-(--active-tab-width) rounded-full bg-brand transition-[left,width] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      // `data-active`, not `data-[state=active]`. Base UI publishes the selection
      // as a boolean attribute rather than a state string, so the selector is
      // both shorter and the thing the primitive actually guarantees.
      className={cn(
        "rounded-sm px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground data-active:text-foreground disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Panel>) {
  // `outline-none` because focus lands on the panel after a click, and a ring
  // around the entire panel is not a useful focus indicator.
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

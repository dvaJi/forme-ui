import { Tooltip as TooltipPrimitive } from "@base-ui-components/react/tooltip";
import type { ComponentProps } from "react";

import { renderAsChild } from "../../lib/as-child";
import { cn } from "../../lib/cn";

export type TooltipProviderProps = ComponentProps<typeof TooltipPrimitive.Provider>;

/**
 * The shared delay.
 *
 * 200ms to open, and Base UI's own close and grouping timeouts. A tooltip that
 * waits three quarters of a second has already failed: the pointer has moved on,
 * and the thing it was going to explain is now underneath the cursor.
 *
 * The grouping is what makes a toolbar of tooltips feel considered rather than
 * twitchy — once one has shown, its neighbours open instantly while the pointer
 * travels between them.
 */
export function TooltipProvider({
  delay = 200,
  closeDelay = 0,
  timeout = 400,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider delay={delay} closeDelay={closeDelay} timeout={timeout} {...props} />
  );
}

export function Tooltip({ ...props }: ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />;
}

export interface TooltipTriggerProps extends ComponentProps<typeof TooltipPrimitive.Trigger> {
  /** Render as the single child element instead of a `<button>`, keeping the trigger behaviour. */
  asChild?: boolean;
}

export function TooltipTrigger({ className, asChild, children, ...props }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn("inline-flex", className)}
      {...renderAsChild(asChild, children)}
      {...props}
    >
      {children}
    </TooltipPrimitive.Trigger>
  );
}

/**
 * The tooltip body.
 *
 * Base UI splits positioning from content: a `Positioner` does the placement and
 * a `Popup` does the rendering. Both are here so the consumer writes neither, and
 * so the popup is portalled — a tooltip is usually describing something inside a
 * toolbar or a table row, and both of those clip their overflow.
 *
 * `side` and `sideOffset` are taken from the caller's props but handed to the
 * Positioner, which is the part that owns placement. Spelled out as explicit
 * props rather than spread through, because Base UI's `Popup` type does not
 * include them and passing them there would be a type error worth avoiding
 * rather than a runtime one.
 */
export interface TooltipContentProps
  extends
    ComponentProps<typeof TooltipPrimitive.Popup>,
    Pick<ComponentProps<typeof TooltipPrimitive.Positioner>, "side" | "sideOffset" | "align"> {}

export function TooltipContent({
  className,
  children,
  side = "top",
  sideOffset = 6,
  align,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner side={side} sideOffset={sideOffset} align={align}>
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            // `data-starting-style` / `data-ending-style`, not `data-[state=...]`.
            // The scale comes from a transition on `transform` rather than a
            // keyframe, because the popup is positioned by Base UI and a keyframe
            // writing `transform` would overwrite the position it just computed.
            // `origin-(--transform-origin)` is Base UI's variable for which side
            // it ended up on, so the tooltip grows away from its trigger.
            "z-50 max-w-64 origin-(--transform-origin) rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md transition-[opacity,scale] duration-fast data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export function TooltipArrow({
  className,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Arrow>) {
  return (
    // Base UI sizes the arrow and positions it. Only the fill is ours.
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      className={cn("fill-popover", className)}
      {...props}
    />
  );
}

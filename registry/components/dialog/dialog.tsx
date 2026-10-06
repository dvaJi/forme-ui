import { Dialog as DialogPrimitive } from "@base-ui-components/react/dialog";
import type { ComponentProps } from "react";

import { renderAsChild } from "../../lib/as-child";
import { cn } from "../../lib/cn";

export function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

export interface DialogTriggerProps extends ComponentProps<typeof DialogPrimitive.Trigger> {
  /** Render as the single child element instead of a `<button>`, keeping the open behaviour. */
  asChild?: boolean;
}

export function DialogTrigger({ asChild, children, ...props }: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger {...renderAsChild(asChild, children)} {...props}>
      {children}
    </DialogPrimitive.Trigger>
  );
}

export function DialogPortal({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

export interface DialogCloseProps extends ComponentProps<typeof DialogPrimitive.Close> {
  /** Render as the single child element instead of a `<button>`, keeping the close behaviour. */
  asChild?: boolean;
}

export function DialogClose({ asChild, children, ...props }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close {...renderAsChild(asChild, children)} {...props}>
      {children}
    </DialogPrimitive.Close>
  );
}

/**
 * The scrim.
 *
 * Base UI calls this a Backdrop rather than an Overlay, and the name is the
 * better one: it is painted behind the popup and it is what a pointer press lands
 * on, which is exactly what a backdrop is for.
 */
export function DialogBackdrop({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        // `data-starting-style` / `data-ending-style`, not `data-[state=open]`.
        // Base UI exposes the pre-animation state rather than the open state,
        // which is what lets an enter animation start *from* a style instead of
        // only running once the element is already visible.
        "fixed inset-0 z-50 bg-foreground/30 transition-opacity duration-standard data-[ending-style]:animate-fade-out data-[starting-style]:animate-fade-in",
        className,
      )}
      {...props}
    />
  );
}

/** Kept under the old name so existing call sites keep working. */
export const DialogOverlay = DialogBackdrop;

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Popup>) {
  return (
    // The portal, the backdrop and the viewport are all inside `DialogContent`, so
    // a dialog cannot be clipped by an ancestor's overflow and the consumer only
    // ever writes the panel. The exit animation works because Base UI keeps the
    // popup mounted while `data-ending-style` is present.
    <DialogPrimitive.Portal>
      <DialogBackdrop />
      {/* The viewport is the scroll container and the positioning frame. Without it
          a tall dialog on a short window is unscrollable, which is the case that
          breaks first on a laptop. */}
      <DialogPrimitive.Viewport
        data-slot="dialog-viewport"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
      >
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(
            "grid w-full max-w-md gap-5 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-xl outline-none transition-[opacity,transform] duration-standard data-[ending-style]:animate-pop-out data-[starting-style]:animate-pop-in",
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="dialog-header" className={cn("grid gap-1.5 pr-8", className)} {...props} />
  );
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base leading-tight font-semibold", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

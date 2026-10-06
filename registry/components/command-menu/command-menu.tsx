"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import type { ComponentProps, ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "../../lib/cn";

export interface CommandMenuProps {
  /** Names the palette for screen readers. */
  label?: string;
  children: ReactNode;
  /**
   * Pass these when the items need to close the palette on select. Left out,
   * the menu keeps its own state and closes on Esc or a click outside.
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandMenu({
  label = "Command menu",
  open,
  onOpenChange,
  children,
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isPaletteKey = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      if (!isPaletteKey || event.altKey || event.repeat) return;
      event.preventDefault();
      setOpen(!isOpen);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setOpen]);

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={setOpen}
      label={label}
      overlayClassName="fixed inset-0 z-50 bg-foreground/25 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
      contentClassName="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in"
    >
      {children}
    </CommandDialog>
  );
}

export function CommandMenuInput({
  className,
  children,
  ...props
}: ComponentProps<typeof CommandInput>) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border px-3.5">
      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 shrink-0 text-muted-foreground">
        <circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="m10.5 10.5 3 3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
      <CommandInput
        data-slot="command-menu-input"
        className={cn(
          "flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground",
          className,
        )}
        {...props}
      />
      {children ?? (
        <kbd className="hidden shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground sm:block">
          Esc
        </kbd>
      )}
    </div>
  );
}

export function CommandMenuList({ className, ...props }: ComponentProps<typeof CommandList>) {
  return (
    <CommandList
      data-slot="command-menu-list"
      className={cn("max-h-80 overflow-x-hidden overflow-y-auto p-2", className)}
      {...props}
    />
  );
}

export function CommandMenuEmpty({ className, ...props }: ComponentProps<typeof CommandEmpty>) {
  return (
    <CommandEmpty
      data-slot="command-menu-empty"
      className={cn("py-8 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CommandMenuGroup({ className, ...props }: ComponentProps<typeof CommandGroup>) {
  return (
    <CommandGroup
      data-slot="command-menu-group"
      className={cn(
        "overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CommandMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof CommandSeparator>) {
  return (
    <CommandSeparator
      data-slot="command-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export function CommandMenuItem({ className, ...props }: ComponentProps<typeof CommandItem>) {
  return (
    <CommandItem
      data-slot="command-menu-item"
      className={cn(
        "flex cursor-default items-center gap-2.5 rounded-md px-2 py-2 text-sm outline-none select-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

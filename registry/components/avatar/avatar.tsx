import { Avatar as AvatarPrimitive } from "@base-ui-components/react/avatar";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends ComponentProps<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
}

/**
 * 28 / 36 / 48. Three steps rather than a continuous scale: these are the sizes an
 * avatar appears at in a list row, a header and a profile card, and a fourth step
 * is a size nothing in a real product uses.
 */
const sizes = {
  sm: "size-7 text-[0.625rem]",
  md: "size-9 text-xs",
  lg: "size-12 text-sm",
} satisfies Record<AvatarSize, string>;

export function Avatar({ className, size = "md", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex shrink-0 overflow-hidden rounded-full", sizes[size], className)}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  delay,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      // Base UI's own default delay. Spelled out because it is load-bearing: with
      // no delay the initials flash for every avatar on a page whose images are
      // cached, which reads as a flicker rather than as a placeholder.
      delay={delay ?? 0}
      className={cn(
        "grid size-full place-items-center bg-accent font-semibold uppercase text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** `"Francesca Rossi"` becomes `"FR"`, so a fallback needs no per-person JSX. */
export function avatarInitials(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase());

  return letters.join("") || "?";
}

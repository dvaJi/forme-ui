import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

export function Hero({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      data-slot="hero"
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-24",
        className,
      )}
      {...props}
    />
  );
}

export function HeroEyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="hero-eyebrow"
      className={cn(
        "text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function HeroTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    // The headline is the caller's own text, passed in as children.
    // oxlint-disable-next-line jsx-a11y/heading-has-content
    <h1
      data-slot="hero-title"
      className={cn(
        "max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

export function HeroDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="hero-description"
      className={cn(
        "max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}

export function HeroActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="hero-actions"
      className={cn(
        "mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row",
        className,
      )}
      {...props}
    />
  );
}

export function HeroVisual({ className, ...props }: ComponentProps<"div">) {
  // The frame, not the artwork: put whatever is really shipping inside it. A
  // hero without a picture is a paragraph, and a fake dashboard is worse.
  return (
    <div
      data-slot="hero-visual"
      className={cn(
        "mt-6 w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card text-left shadow-md",
        className,
      )}
      {...props}
    />
  );
}

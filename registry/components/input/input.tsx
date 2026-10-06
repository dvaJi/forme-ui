"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

import { cn } from "../../lib/cn";

export type InputSize = "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Visible label. Required rather than optional: an unlabelled field is a
   * mystery to anyone using a screen reader, and a placeholder is not a label.
   */
  label: string;
  /** Help text under the field. Replaced by `error` when there is one. */
  description?: ReactNode;
  /** Marks the field invalid and is announced as soon as it appears. */
  error?: string;
  /**
   * Sits inside the field before the text. Decorative and unclickable, so it is
   * hidden from assistive technology; use `trailing` for anything a person has
   * to reach.
   */
  leading?: ReactNode;
  /** Sits inside the field after the text. Buttons are allowed. */
  trailing?: ReactNode;
  size?: InputSize;
}

const controls = {
  md: "h-9 px-3 text-sm",
  lg: "h-11 px-3.5 text-[0.9375rem]",
} satisfies Record<InputSize, string>;

const adornment = "absolute top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4";

export function Input({
  label,
  description,
  error,
  leading,
  trailing,
  size = "md",
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  // The error is the description once it exists: reading both would only say the
  // same thing twice, and the invalid state is what the person needs to hear.
  const describedBy = error ? errorId : description ? descriptionId : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium leading-none">
        {label}
      </label>

      <div className="relative flex items-center">
        {leading ? (
          <span aria-hidden="true" className={cn(adornment, "pointer-events-none left-2.5")}>
            {leading}
          </span>
        ) : null}

        <input
          id={inputId}
          data-slot="input"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full rounded-md border border-input bg-background text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
            controls[size],
            leading && "pl-9",
            trailing && "pr-9",
            className,
          )}
          {...props}
        />

        {trailing ? <span className={cn(adornment, "right-2.5")}>{trailing}</span> : null}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : description ? (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default Input;

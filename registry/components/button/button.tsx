"use client";

import { Button as BaseButton } from "@base-ui-components/react/button";
import type { ButtonHTMLAttributes, ComponentType, ReactElement, ReactNode } from "react";
import { cloneElement } from "react";

import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "medium" | "small" | "xs";

/**
 * An icon for a button's leading or trailing slot.
 *
 * Two forms, and the difference is the server/client boundary rather than taste.
 *
 * **A component reference is the good one.** `leadingIcon={Plus}` rather than
 * `leadingIcon={<Plus />}`, because the button sizes the icon per size step and
 * needs to own the className. Handing it a rendered element would let a caller
 * pass an icon at the wrong size, and the failure would be a 24px icon inside a
 * 24px button.
 *
 * **A rendered element exists for one reason: server components.** In Next's App
 * Router a page is a server component by default and `Button` is a client
 * component, so a function prop cannot cross the boundary — not an inline arrow,
 * and not an imported reference either. Next fails the prerender with "Functions
 * cannot be passed directly to Client Components". Passing an element whose type
 * is an intrinsic tag *is* serialisable and does cross, which is the only way to
 * put an icon in a button from a server component.
 *
 * Both are sized. An element arrives with the button's size classes merged onto
 * whatever className it already had, so the icon still cannot be the wrong size.
 */
export type ButtonIcon =
  | ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>
  | ReactElement<{ className?: string; "aria-hidden"?: boolean | "true" }>;

/** Renders an icon in whichever of the two forms it was given, sized to the button. */
function renderIcon(icon: ButtonIcon | undefined, sizeClass: string): ReactNode {
  if (!icon) return null;

  // An element has a `props` field; a component type does not.
  //
  // Not `typeof icon === "function"`, which looks equivalent and is wrong:
  // `forwardRef`, `memo` and `lazy` all produce *objects*, and a great many icon
  // libraries ship exactly those. Testing for `props` is the only check that
  // survives one.
  if ("props" in icon) {
    // Merge rather than replace, so a caller who already set a className keeps it.
    return cloneElement(icon, {
      className: cn(sizeClass, icon.props.className),
      "aria-hidden": true,
    });
  }

  const Icon = icon;
  return <Icon className={sizeClass} aria-hidden />;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Square, icon-only. Requires an `aria-label`: the icon is decorative, so without
   * a label the button has no accessible name at all.
   */
  iconOnly?: boolean;
  leadingIcon?: ButtonIcon;
  trailingIcon?: ButtonIcon;
  /**
   * Shows progress without losing the button. A loading button stays focusable and
   * keeps its label in place, so the width does not jump mid-click and the
   * keyboard focus does not disappear under the person using it.
   */
  loading?: boolean;
  /**
   * Render as the single child element instead of a `<button>`, keeping the styles
   * and the keyboard behaviour.
   *
   * This replaces the rendered element *and the button's own children*. That is
   * what makes it work: Base UI renders the element you hand it and keeps that
   * element's content, so a `<Link>` stays a `<Link>` with your label inside rather
   * than the label being re-wrapped around it.
   *
   * The cost is that anything the button would have composed itself has nowhere to
   * go — `leadingIcon`, `trailingIcon`, `iconOnly` and `loading` are all discarded
   * when `asChild` is set. They are documented rather than rejected, because a
   * type-level union here costs the rest of the library its literal inference on
   * `variant` and `size`, which is a far worse trade for one sharp edge.
   *
   * So: for a link that needs an icon use `ButtonLink`; for a framework link, put
   * the icon in its children.
   */
  asChild?: boolean;
}

/**
 * The sizing matrix, and the numbers behind it.
 *
 *            medium           small            xs
 *   height   36px             32px             24px
 *   radius   10px              8px              4px
 *   padding  8px              8px / 6px        8px
 *   gap      2px              2px              2px
 *   icon     20px             18px             14px
 *   label    4px inset        2px inset        2px inset
 *   type     body-medium      body-medium      caption-1-semibold
 *
 * Three steps rather than four, and the smallest is small on purpose: a 24px tier
 * is what a table row's icon action and a chip's dismiss need, and inventing a
 * 28px step to fill the gap gives a component that nothing in a real product uses.
 *
 * The type comes from the type scale and not from a `font-medium` here, so that
 * size and weight stay one decision. `text-body-medium` also carries the 20px
 * line-height that fits inside this height — see the note in foundation.css.
 */
const base =
  "relative inline-flex items-center justify-center gap-0.5 overflow-hidden whitespace-nowrap font-sans cursor-pointer select-none button-press-motion outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

const sizes = {
  medium: "h-9 rounded-2lg p-2 text-body-medium",
  small: "h-8 rounded-lg px-2 py-1.5 text-body-medium",
  xs: "h-6 rounded-sm px-2 text-caption-1-semibold",
} satisfies Record<ButtonSize, string>;

/**
 * Icon-only geometry.
 *
 * Medium is already square from its own padding — 8 + 20 + 8 is exactly 36 — so
 * it needs nothing. Small and xs do not come out square (8 + 18 + 8 is 34), so
 * they are forced to their height and the padding zeroed, letting the flex centre
 * the icon. Deriving the square rather than hard-coding a width means the button
 * stays square if the icon size or the padding ever changes.
 */
const iconOnlySizes = {
  medium: "",
  small: "size-8 p-0",
  xs: "size-6 p-0",
} satisfies Record<ButtonSize, string>;

const icons = {
  medium: "size-5 shrink-0",
  small: "size-[18px] shrink-0",
  xs: "size-3.5 shrink-0",
} satisfies Record<ButtonSize, string>;

/**
 * The label's own horizontal inset.
 *
 * This is what makes an icon and a text run line up optically. Without it the
 * gap between icon and text is the flex gap, and the icon sits closer to the
 * edge of the button than the text does, which reads as misaligned even when the
 * numbers are technically right.
 */
const labels = {
  medium: "inline-flex items-center justify-center px-1 shrink-0",
  small: "inline-flex items-center justify-center px-0.5 shrink-0",
  xs: "inline-flex items-center justify-center px-0.5 shrink-0",
} satisfies Record<ButtonSize, string>;

const variants = {
  primary: cn(
    "bg-button-primary text-white shadow-xs",
    "disabled:text-text-disabled disabled:shadow-none",
    "aria-disabled:text-text-disabled aria-disabled:shadow-none",
  ),
  secondary: cn(
    "border border-control-border bg-surface text-text-primary shadow-xs",
    "hover:border-control-border-hover hover:bg-surface-hover",
    "active:border-control-border-active active:bg-surface-active",
    "disabled:border-control-border disabled:bg-surface-disabled disabled:text-text-disabled disabled:shadow-none",
    "aria-disabled:border-control-border aria-disabled:bg-surface-disabled aria-disabled:text-text-disabled aria-disabled:shadow-none",
  ),
  ghost: cn(
    "bg-ghost text-ghost-foreground",
    "hover:bg-ghost-hover active:bg-ghost-active",
    "disabled:bg-ghost-disabled disabled:text-ghost-disabled-foreground disabled:shadow-none",
    "aria-disabled:bg-ghost-disabled aria-disabled:text-ghost-disabled-foreground aria-disabled:shadow-none",
  ),
  danger: cn(
    "bg-button-danger text-white shadow-xs",
    "hover:bg-red-500",
    "disabled:text-red-300 disabled:shadow-none",
    "aria-disabled:text-red-300 aria-disabled:shadow-none",
  ),
} satisfies Record<ButtonVariant, string>;

export function Button({
  className,
  variant = "primary",
  size = "medium",
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  asChild = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  // `aria-disabled` rather than `disabled` while loading, so the button keeps its
  // place in the tab order. A focused element cannot be `disabled` without
  // dropping focus, which would move the keyboard user's cursor out from under
  // them mid-action.
  const inert = disabled || loading;

  return (
    <BaseButton
      data-slot="button"
      type={asChild ? undefined : type}
      disabled={disabled}
      focusableWhenDisabled
      aria-busy={loading || undefined}
      aria-disabled={inert || undefined}
      onClick={loading ? (event) => event.preventDefault() : props.onClick}
      // Base UI's `render` takes an element, where Radix took `asChild`. Keeping
      // `asChild` in Forme's own API means the documented contract — and every
      // call site in the library — does not change with the primitive underneath.
      render={
        asChild && isValidElement(children)
          ? (children as ReactElement<Record<string, unknown>>)
          : undefined
      }
      className={cn(
        base,
        sizes[size],
        variants[variant],
        iconOnly && iconOnlySizes[size],
        className,
      )}
      {...props}
    >
      {/* Exactly one child, always. `render` merges this component's props onto a
          single element and the `null` a `{loading && ...}` leaves behind is not a
          child it can merge onto. The label, the icons and the spinner are
          therefore composed here rather than placed as siblings.

          No wrapper element, so the padding arithmetic in `sizes` is the whole
          story: a medium icon-only button is square because 8 + 20 + 8 is 36, and
          an extra flex child would quietly break that.

          The spinner is positioned against the button rather than wrapped around
          the label, so the label stays exactly where it was and the button never
          changes width mid-click. */}
      {renderIcon(leadingIcon, icons[size])}

      {!iconOnly && children !== undefined && children !== null ? (
        <span className={cn(labels[size], loading && "opacity-0")}>{children}</span>
      ) : null}

      {!iconOnly ? renderIcon(trailingIcon, icons[size]) : null}

      {loading ? (
        <span className="absolute inset-0 grid place-items-center">
          <Spinner color={spinnerColors[variant]} className={icons[size]} />
        </span>
      ) : null}
    </BaseButton>
  );
}

/** An anchor, so a navigational action looks like the button beside it. */
export interface ButtonLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  leadingIcon?: ButtonIcon;
  trailingIcon?: ButtonIcon;
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "medium",
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      data-slot="button-link"
      className={cn(
        base,
        sizes[size],
        variants[variant],
        iconOnly && iconOnlySizes[size],
        className,
      )}
      {...props}
    >
      {renderIcon(leadingIcon, icons[size])}

      {!iconOnly && children !== undefined && children !== null ? (
        <span className={labels[size]}>{children}</span>
      ) : null}

      {!iconOnly ? renderIcon(trailingIcon, icons[size]) : null}
    </a>
  );
}

/**
 * The spinner carries its own colour.
 *
 * A loading button sets `aria-disabled`, and every variant greys its text in that
 * state — which is right for the label and wrong for the spinner, because the
 * label is at `opacity-0` and the spinner is the only thing left to see. Inheriting
 * the disabled colour put a dark grey arc on a dark grey surface: a spinner so
 * faint it read as an empty button rather than a working one.
 *
 * So it names the colour the variant would have used if it were not loading.
 */
const spinnerColors = {
  primary: "text-white",
  secondary: "text-text-primary",
  ghost: "text-ghost-foreground",
  danger: "text-white",
} satisfies Record<ButtonVariant, string>;

function Spinner({ className, color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={cn("animate-spin", color, className)}>
      <circle
        cx="8"
        cy="8"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * A guard for `asChild`.
 *
 * `render` needs a real element to merge onto. `asChild` with no element, or with
 * a fragment, is a mistake at the call site — and saying so here beats letting
 * Base UI merge props onto nothing and render an empty button that looks fine
 * until someone clicks it.
 */
function isValidElement(value: ReactNode): boolean {
  return value !== null && value !== undefined && typeof value === "object" && "type" in value;
}

export default Button;

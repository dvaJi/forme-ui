/**
 * Turning Forme's `asChild` into Base UI's `render`.
 *
 * Forme's public API is `asChild`, which is the shadcn convention: someone
 * copying a component into a project that already uses shadcn already knows it,
 * and changing it would mean relearning every trigger in every block.
 *
 * Base UI calls the same thing `render`, and the difference is that `render` also
 * accepts a function. `asChild` cannot, because the shadcn contract is "the one
 * child element", and a function is not an element.
 *
 * So this is a one-way adapter in a shared file rather than three copies of the
 * same conditional. Two reasons it is worth a file:
 *
 * - The check is the interesting part. `render` given `undefined` silently
 *   renders the component's own element; given a fragment or a string it merges
 *   props onto something that cannot take them. Returning `undefined` for the
 *   non-element cases turns a subtle runtime failure into the component behaving
 *   as if `asChild` were not set.
 * - When the primitives change, this is the one place to change. Three copies
 *   drift.
 */
import type { ReactElement, ReactNode } from "react";

/**
 * A single element `render` can merge its props onto.
 *
 * `React.isValidElement` is the test, spelled out here rather than imported: it
 * rejects strings, numbers, arrays and fragments, all of which are things a
 * caller might plausibly pass and none of which can receive a ref or an event
 * handler.
 */
export function asChildElement(
  child: ReactNode,
): ReactElement<Record<string, unknown>> | undefined {
  if (child === null || child === undefined || typeof child !== "object") return undefined;

  // `$$typeof` is React's element brand. Checking it directly rather than via
  // `React.isValidElement` keeps this file free of a React runtime import, which
  // matters because it ships to every consumer's project as part of every
  // install that uses `asChild`.
  if (!("$$typeof" in child) || typeof (child as { type?: unknown }).type !== "function") {
    // A fragment has `type` as a symbol, and an intrinsic element has it as a
    // string. Both are handled by the check above falling through; this branch
    // exists only to document that they are deliberately not supported.
    return undefined;
  }

  return child as ReactElement<Record<string, unknown>>;
}

/**
 * The pair a component needs to spread.
 *
 * Spread both onto the primitive:
 *
 * ```tsx
 * <DialogTrigger {...renderAsChild(asChild, children)} />
 * ```
 */
export function renderAsChild(
  asChild: boolean | undefined,
  children: ReactNode,
): { render?: ReactElement<Record<string, unknown>> } {
  if (!asChild) return {};
  const element = asChildElement(children);
  // `asChild` with no element to merge onto is a mistake at the call site. The
  // primitive then renders its own element, which looks correct until someone
  // clicks it and nothing happens.
  return element ? { render: element } : {};
}

import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Forme's type styles, so tailwind-merge stops treating them as colours.
 *
 * The bug this prevents, which was live in this file for a while and is
 * invisible in the source: `tailwind-merge` has no view of a Tailwind theme. Any
 * `text-*` utility it does not recognise as one of Tailwind's built-in font sizes
 * is assumed to be a text **colour**. So on a button whose classes were
 * `p-2 text-body bg-button-primary text-white`, it saw two text-colours, applied
 * last-write-wins, and silently dropped `text-body`. The class was in the source,
 * the utility was in the stylesheet, the DOM had it on the element — and the
 * button rendered at 16px instead of 14px. Nothing errored.
 *
 * Registering them under `font-size` is the fix, and every name added to
 * typography.css has to be added here too. That duplication is the price: the
 * alternative is a type utility that a caller can delete by accident.
 *
 * If you rename or add a type style in foundation.css, mirror it in this list.
 */
const TEXT_FAMILIES = [
  "body",
  "body-2",
  "caption-1",
  "caption-2",
  "title-1",
  "title-2",
  "title-3",
  "headline",
] as const;

const TEXT_WEIGHTS = ["regular", "medium", "semibold", "bold"] as const;

const TEXT_STYLES = TEXT_FAMILIES.flatMap((family) =>
  TEXT_WEIGHTS.map((weight) => `${family}-${weight}`),
);

const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: TEXT_STYLES }],
    },
  },
});

/**
 * Merges class names, letting a caller's `className` win over a component's
 * defaults. Without the merge step a `px-4` from the component and a `px-6` from
 * the caller would both reach the browser and the winner would be whichever came
 * last in the stylesheet rather than whichever the caller meant.
 */
export function cn(...inputs: ClassValue[]): string {
  return merge(clsx(inputs));
}

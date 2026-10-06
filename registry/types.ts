/**
 * The shape of every `metadata.ts` in this repository.
 *
 * Emitted by `pnpm registry:sync`. In the canonical source this type is imported
 * from `@forme/registry/types`; it lives here because this repository publishes
 * components rather than a package, and a consumer's project will never have that
 * dependency installed.
 *
 * `satisfies FormeMetadata` is what stops a metadata file and the registry entry
 * built from it from disagreeing — the compiler rejects a missing `title` or a
 * `category` that is not in the list, rather than the site failing at runtime.
 */

/** The category decides what an item is. Never declare the kind separately. */
export type FormeCategory =
  | "buttons"
  | "inputs"
  | "forms"
  | "navigation"
  | "overlays"
  | "data-display"
  | "feedback"
  | "layout"
  | "motion"
  | "marketing"
  | "application"
  | "dashboard"
  | "authentication"
  | "commerce"
  | "ai"
  | "saas"
  | "ai-app"
  | "portfolio"
;

/** Free source is public. Pro source ships only to an authenticated, entitled customer. */
export type FormeTier = "free" | "pro";

export interface FormeMetadata {
  /** Registry name and URL slug. Must match the folder name. */
  name: string;
  title: string;
  /** One or two plain sentences. This is the copy the site and the CLI both show. */
  description: string;
  category: FormeCategory;
  tier: FormeTier;
  /** Extra words search should match on, beyond the title and description. */
  keywords?: string[];
  /** Entry file relative to this folder, e.g. `"./button.tsx"`. */
  entry: string;
  /**
   * Extra entry files a user expects to be able to install on their own, e.g.
   * `"./index.tsx"` for a folder component. Files reached from these by relative
   * import are always included automatically.
   */
  files?: string[];
  /**
   * npm packages to add. Packages imported by the source are detected
   * automatically; declare a dependency here only when it is needed but never
   * imported (a peer, a font, a polyfill).
   */
  dependencies?: string[];
  /** Other registry items this one builds on. Usually `["forme-foundation"]`. */
  registryDependencies?: string[];
  /** CSS files this item needs pasted into the project, relative to this folder. */
  css?: string[];
  /**
   * Named export of the demo component, in `<entry basename>.demo.tsx` next to the
   * entry. Derived from the name when omitted.
   */
  demoExport?: string;
  /**
   * A screenshot of the item, relative to its folder, for items the public site
   * cannot run itself.
   */
  previewImage?: string;
  /** Hide an item from the site and the CLI while it is still being built. */
  hidden?: boolean;
}

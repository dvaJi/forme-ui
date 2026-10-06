import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "tooltip",
  title: "Tooltip",
  description:
    "A short description of a control, shown on hover and on keyboard focus, with an optional arrow. Built on the Base UI primitive and portalled so a tooltip is never clipped by the toolbar or table it belongs to.",
  category: "overlays",
  tier: "free",
  keywords: ["tooltip", "hint", "popover", "aria-describedby", "shadcn tooltip"],
  entry: "./tooltip.tsx",
  registryDependencies: ["forme-foundation"],
  dependencies: ["@base-ui-components/react"],
} satisfies FormeMetadata;

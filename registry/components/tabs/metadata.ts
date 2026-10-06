import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "tabs",
  title: "Tabs",
  description:
    "Tabs built on the Base UI primitive, so arrow keys, Home and End and the roving tab order come for free. The primitive measures the selected tab and publishes it as a CSS variable, so the underline glides without this component holding a single ref.",
  category: "navigation",
  tier: "free",
  keywords: [
    "tabs",
    "tab bar",
    "segmented control",
    "animated underline",
    "indicator",
    "shadcn tabs",
  ],
  entry: "./tabs.tsx",
  registryDependencies: ["forme-foundation"],
  dependencies: ["@base-ui-components/react"],
} satisfies FormeMetadata;

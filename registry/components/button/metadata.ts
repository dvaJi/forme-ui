import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "button",
  title: "Button",
  description:
    "The primary action element. Four variants and three sizes, gradient primaries that crossfade on hover rather than snap, and an icon contract where the button owns the icon size.",
  category: "buttons",
  tier: "free",
  keywords: [
    "cta",
    "action",
    "submit",
    "loading",
    "asChild",
    "gradient",
    "icon",
    "danger",
    "link button",
    "shadcn button",
  ],
  entry: "./button.tsx",
  registryDependencies: ["forme-foundation"],
  dependencies: ["@base-ui-components/react"],
} satisfies FormeMetadata;

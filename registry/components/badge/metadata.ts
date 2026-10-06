import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "badge",
  title: "Badge",
  description:
    "A small label for status, counts and metadata, in five quiet variants and two sizes. The colour lives in the tint so the text stays readable at eleven pixels, and an icon or a dot inside the badge carries the state at a glance.",
  category: "data-display",
  tier: "free",
  keywords: ["badge", "chip", "pill", "status label", "tag", "shadcn badge"],
  entry: "./badge.tsx",
  registryDependencies: ["forme-foundation"],
} satisfies FormeMetadata;

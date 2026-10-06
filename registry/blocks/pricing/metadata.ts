import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "pricing",
  title: "Pricing",
  description:
    "A pricing section with three tiers, a monthly and annual toggle the caller controls, and a featured tier marked by a stronger border and a small label rather than a coloured card. Each tier takes its own price, so the toggle is a few lines of your own state.",
  category: "commerce",
  tier: "free",
  keywords: ["pricing", "plans", "pricing table", "billing toggle", "subscription", "checkout"],
  entry: "./pricing.tsx",
  registryDependencies: ["forme-foundation"],
} satisfies FormeMetadata;

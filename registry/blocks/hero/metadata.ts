import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "hero",
  title: "Hero",
  description:
    "A marketing hero with an eyebrow, a headline, a supporting paragraph, two calls to action and a frame for a real product screenshot. Every part is composed by you, so the section carries your copy instead of a placeholder.",
  category: "marketing",
  tier: "free",
  keywords: ["hero", "landing page", "marketing header", "above the fold", "cta"],
  entry: "./hero.tsx",
  registryDependencies: ["forme-foundation"],
} satisfies FormeMetadata;

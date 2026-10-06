import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "card",
  title: "Card",
  description:
    "A bordered surface with a header, title, description, content and footer you compose yourself, so a card is never more structure than the content inside it needs. Everything reads from the foundation tokens, which makes it retheme with the rest of the library.",
  category: "layout",
  tier: "free",
  keywords: ["card", "panel", "surface", "container", "section", "shadcn card"],
  entry: "./card.tsx",
  registryDependencies: ["forme-foundation"],
} satisfies FormeMetadata;

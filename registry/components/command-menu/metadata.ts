import type { FormeMetadata } from "../../types";

export const metadata = {
  name: "command-menu",
  title: "Command menu",
  description:
    "A command palette opened with ⌘K or Ctrl K, with a search field, grouped items, keyword matching and an empty state. Built on cmdk for the filtering and the keyboard path, inside a Radix dialog for the focus trap.",
  category: "navigation",
  tier: "free",
  keywords: [
    "command menu",
    "command palette",
    "cmdk",
    "search dialog",
    "keyboard shortcut",
    "spotlight",
    "shadcn command",
  ],
  entry: "./command-menu.tsx",
  registryDependencies: ["forme-foundation"],
} satisfies FormeMetadata;
